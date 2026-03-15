# ORBIT LABS — REBUILD WORKFLOW N8N
> Remplacement du polling Notion (coûteux) par un Tally Webhook (gratuit + instantané).
> Basé sur le pattern officiel : Webhook → Validate → Transform → Action → Error Handler

---

## POURQUOI CE CHANGEMENT

| Ancienne config | Nouvelle config |
|----------------|-----------------|
| Polling Notion toutes les 60 sec | Webhook Tally = déclenché UNIQUEMENT à la soumission |
| ~43 200 executions/mois (Workflow 1) | 0 executions passives — seulement quand un client soumet |
| ~43 200 executions/mois (Workflow 2) | ~2 880 executions/mois (polling 15 min, business hours) |
| Délai 0-60 sec | Instantané |

---

## ARCHITECTURE FINALE

```
WORKFLOW 1 — Tally Webhook (remplace le polling)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tally Form Submit
  → Webhook Trigger (n8n)
  → Code: Parse Tally Payload
  → IF: Anti-doublon check (responseId déjà traité ?)
      └─ OUI → Stop silencieux
      └─ NON → Continue
  → Notion: Créer page dans Formulaire UGC IA (Statut = En génération)
  → IF: Assets required & not received ?
      └─ OUI → Notion: Update Statut = En attente assets
               Discord: Notify #prod-n8n
      └─ NON → HTTP Request: Claude API (generate prompts)
               Code: Format prompts as .md
               Google Drive: Create file
               Notion: Update page (Drive link + Statut = À review)
               Discord: Notify #prod-n8n ✅

WORKFLOW 2 — Polling optimisé (15 min, business hours)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Schedule: toutes les 15 min (9h-22h seulement)
  → Notion: Query Formulaire UGC IA (Statut = Validé)
  → IF: Résultats trouvés ?
      └─ NON → Stop
      └─ OUI → Notion: Update Statut = Livré
               Discord: Notify #prod-n8n ✅ Livré
```

---

## ÉTAPE 1 — SETUP DU WEBHOOK TALLY → N8N

### Dans n8n — Configurer le Webhook Trigger

1. Ouvrir Workflow 1 → supprimer le node "Notion Trigger" (celui qui pollingait)
2. Ajouter un node **Webhook**
3. Configuration :
   - **HTTP Method** : POST
   - **Path** : `orbit-labs-brief` (ou ce que tu veux)
   - **Response Mode** : Respond Immediately (important — ne pas faire attendre Tally)
   - **Response Code** : 200
4. Cliquer sur **"Copy Webhook URL"** → copier l'URL (format : `https://ton-instance.n8n.io/webhook/orbit-labs-brief`)

### Dans Tally — Connecter le webhook

1. Aller sur ton formulaire Tally → **Integrations**
2. Cliquer sur **Webhooks**
3. **Add webhook** → coller l'URL n8n
4. **Event** : Form response (on submission)
5. Sauvegarder → tester avec "Send test"

---

## ÉTAPE 2 — NODE "Parse Tally Payload" (Code Node)

Ajouter un **Code** node après le Webhook. JavaScript :

```javascript
// Parse Tally Webhook Payload → Orbit Labs Brief
const body = $input.first().json.body || $input.first().json;
const fields = body.data?.fields || [];

const getField = (labels) => {
  const labelList = Array.isArray(labels) ? labels : [labels];
  for (const label of labelList) {
    const field = fields.find(f =>
      f.label?.toLowerCase().includes(label.toLowerCase())
    );
    if (field && field.value !== null && field.value !== undefined && field.value !== '') {
      return Array.isArray(field.value) ? field.value.join(', ') : String(field.value);
    }
  }
  return '';
};

const packSize    = getField(['pack', 'vidéos', 'nombre de vidéos']);
const assetsReq   = getField(['assets requis', 'assets nécessaires']);
const assetsRecvd = getField(['assets reçus', 'assets fournis']);

return [{
  // IDs
  responseId:    body.data?.responseId || `manual-${Date.now()}`,
  submittedAt:   body.data?.submittedAt || new Date().toISOString(),

  // Client
  clientName:    getField(['nom du client', 'client', 'prénom', 'nom']),
  brandName:     getField(['marque', 'brand', 'nom de la marque']),
  productName:   getField(['produit', 'nom du produit']),
  productUrl:    getField(['url', 'lien produit', 'site web']),

  // Brief
  packSize:      packSize,
  contentAngle:  getField(['angle', 'type de contenu', 'format vidéo']),
  targetAudience:getField(['audience', 'cible', 'persona']),
  hooksProvided: getField(['hooks fournis', 'hooks']) || 'Non',
  anglesProvided:getField(['angles fournis', 'angles créatifs']) || 'Non',
  assetsRequired:assetsReq || 'Non',
  assetsReceived:assetsRecvd || 'Non',
  additionalInfo:getField(['informations', 'notes', 'commentaires']),

  // Computed flags
  needsAssets: assetsReq.toLowerCase().includes('oui') && !assetsRecvd.toLowerCase().includes('oui'),
  useOpusModel: ['8', '12'].some(n => packSize.includes(n)),
  promptCount:  packSize.includes('12') ? 12 : packSize.includes('8') ? 8 : 4,
}];
```

**Pourquoi ce node :** Tally envoie les champs sous forme de tableau `fields[]` avec `label` + `value`. Ce code les transforme en un objet propre utilisable par la suite du workflow.

---

## ÉTAPE 3 — NODE "Anti-Doublon Check" (IF Node)

Ajouter un **IF** node après le Code node.

**Condition :**
- Check si le `responseId` existe déjà dans Notion (query la DB sur le champ Job ID)
- **Vrai (doublon)** → connecter à un **Stop and Error** node ou simplement ne pas connecter (flow s'arrête)
- **Faux (nouveau)** → continuer

**Alternative simplifiée** (si query Notion est compliqué) :
- Utiliser le **Set** node pour stocker le `responseId` comme Job ID
- Le anti-doublon natif du workflow (si Drive Folder déjà rempli → stop) reste en place

---

## ÉTAPE 4 — NODE "Créer Brief dans Notion" (Notion Node)

**Operation** : Create Page
**Database ID** : `9998faaa-f9df-4d0b-89ab-421bddb7830a`

Mapping des champs :
```
Title (Name)        → {{ $json.clientName }} — {{ $json.productName }}
Client              → {{ $json.clientName }}
Marque              → {{ $json.brandName }}
Produit             → {{ $json.productName }}
URL Produit         → {{ $json.productUrl }}
Pack                → {{ $json.packSize }}
Angle               → {{ $json.contentAngle }}
Audience            → {{ $json.targetAudience }}
Hooks fournis       → {{ $json.hooksProvided }}
Angles fournis      → {{ $json.anglesProvided }}
Assets requis       → {{ $json.assetsRequired }}
Assets reçus        → {{ $json.assetsReceived }}
Notes               → {{ $json.additionalInfo }}
Job ID              → {{ $json.responseId }}
Statut              → En génération
```

---

## ÉTAPE 5 — NODE "IF Assets Needed" (IF Node)

**Condition** : `{{ $json.needsAssets }}` égal à `true`

**Branche OUI — Assets manquants :**
- Notion Update : Statut = `En attente assets`
- Discord : message `"⏳ Assets requis pour {{ $json.clientName }} — {{ $json.productName }}. En attente client."`
- FIN du flow (pas de génération)

**Branche NON — Continuer :**
- Passer à la génération des prompts (Étape 6)

---

## ÉTAPE 6 — NODE "Claude API" (HTTP Request Node)

**Method** : POST
**URL** : `https://api.anthropic.com/v1/messages`

**Headers** :
```
x-api-key: sk-ant-VOTRE_CLÉ
anthropic-version: 2023-06-01
content-type: application/json
```

**Body** (JSON) :
```json
{
  "model": "{{ $json.useOpusModel ? 'claude-opus-4-6' : 'claude-sonnet-4-6' }}",
  "max_tokens": 4096,
  "messages": [
    {
      "role": "user",
      "content": "Tu es un expert en création de contenu UGC pour la publicité Meta et TikTok.\n\nCrée {{ $json.promptCount }} prompts vidéo PLETOR pour :\n\nMarque : {{ $json.brandName }}\nProduit : {{ $json.productName }}\nURL : {{ $json.productUrl }}\nAngle créatif : {{ $json.contentAngle }}\nAudience cible : {{ $json.targetAudience }}\nHooks fournis par le client : {{ $json.hooksProvided }}\nAngles fournis : {{ $json.anglesProvided }}\nNotes : {{ $json.additionalInfo }}\n\nPour chaque prompt, inclure :\n1. HOOK (0-3 sec) : accroche percutante\n2. SCRIPT (15-60 sec) : déroulé scène par scène\n3. CTA (5 sec) : appel à l'action clair\n4. NOTES RÉALISATEUR : ton, émotion, style\n\nFormat de sortie : Markdown structuré, un prompt par section ##"
    }
  ]
}
```

---

## ÉTAPE 7 — NODE "Format Prompts" (Code Node)

```javascript
// Extraire et formater la réponse Claude
const claudeResponse = $input.first().json;
const content = claudeResponse.content?.[0]?.text || '';
const brief = $node["Parse Tally Payload"].json;

const today = new Date().toISOString().split('T')[0];
const filename = `prompts-${brief.brandName.toLowerCase().replace(/\s+/g, '-')}-${today}.md`;

const mdContent = `# Orbit Labs — Prompts UGC
**Client :** ${brief.clientName}
**Marque :** ${brief.brandName}
**Produit :** ${brief.productName}
**Pack :** ${brief.packSize} vidéos
**Angle :** ${brief.contentAngle}
**Audience :** ${brief.targetAudience}
**Généré le :** ${today}
**Modèle :** ${brief.useOpusModel ? 'Claude Opus' : 'Claude Sonnet'}

---

${content}

---
*Généré par Orbit Labs AI — Valider et mettre Statut = Validé dans Notion pour lancer la livraison*
`;

return [{ filename, mdContent, brief }];
```

---

## ÉTAPE 8 — NODE "Google Drive — Create File"

**Operation** : Create File (ou Upload)
**Folder ID** : `1PVyC17jBSiGKTQxEvN6axCQ0HOJVsSWT`
**File Name** : `{{ $json.filename }}`
**File Content** : `{{ $json.mdContent }}`
**MIME Type** : `text/plain`

Récupérer le **File ID** et construire le lien Drive :
```
https://drive.google.com/file/d/{{ $json.id }}/view
```

---

## ÉTAPE 9 — NODE "Notion Update — À review"

**Operation** : Update Page
**Page ID** : récupérer depuis le node "Créer Brief dans Notion" → `{{ $node["Créer Brief"].json.id }}`

Champs à update :
```
Statut       → À review
Drive Folder → {{ lien du fichier Drive }}
Drive File   → {{ $json.id }}
```

---

## ÉTAPE 10 — NODE "Discord — Notification"

**Webhook URL** : ton webhook Discord #prod-n8n

**Message :**
```
✅ **Prompts prêts pour validation**
**Client :** {{ $json.brief.clientName }}
**Produit :** {{ $json.brief.productName }}
**Pack :** {{ $json.brief.packSize }} vidéos
**Drive :** https://drive.google.com/file/d/{{ $json.driveFileId }}/view

→ Ouvrir Notion, relire les prompts, mettre Statut = **Validé**
```

---

## WORKFLOW 2 — POLLING OPTIMISÉ (Statut Validé → Livré)

### Changer le trigger : Schedule Node

Remplacer le polling 1-min par un **Schedule Trigger** :
- **Interval** : toutes les 15 minutes
- **Heure de début** : 9h00
- **Heure de fin** : 22h00
- **Jours** : Lundi–Dimanche

**Pourquoi 15 min :** tu valides toi-même → le délai 15 min est acceptable. Passe de 43 200 à 2 880 executions/mois.

### Ajouter un IF "Si résultats vides → Stop"

Après le Notion Query node :
```
IF: {{ $items().length }} > 0
  OUI → continuer (Update Statut = Livré + Discord)
  NON → Stop (ne rien faire)
```

Cela évite d'exécuter le reste du workflow pour rien quand il n'y a pas de briefs validés.

---

## RÉCAPITULATIF DES ÉCONOMIES

| Workflow | Avant | Après | Réduction |
|----------|-------|-------|-----------|
| Workflow 1 | 43 200 exec/mois | 0 passif + N briefs | ~99% |
| Workflow 2 | 43 200 exec/mois | 2 016 exec/mois (15min, 9h-22h) | 95% |
| **Total** | **~86 400 exec/mois** | **~2 016 + briefs** | **~97%** |

---

## ORDRE DE MISE EN PLACE

```
[ ] 1. Dans n8n : créer le Webhook node → copier l'URL
[ ] 2. Dans Tally : ajouter le webhook → tester avec "Send test"
[ ] 3. Vérifier que le payload arrive bien dans n8n (onglet Executions)
[ ] 4. Créer le Code node "Parse Tally Payload" → coller le JS
[ ] 5. Reconstruire les nodes Notion, Claude API, Drive, Discord
[ ] 6. Tester end-to-end avec un faux brief
[ ] 7. Modifier Workflow 2 : Schedule 15 min + IF guard + horaires business
[ ] 8. Activer les deux workflows (DRAFT → PROD)
```

---

*Créé le 2026-03-13 — Basé sur n8n Webhook Processing pattern officiel*
