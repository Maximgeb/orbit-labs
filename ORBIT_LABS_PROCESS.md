# ORBIT LABS — PROCESS OPÉRATIONNEL COMPLET
> Guide de référence pour faire tourner Orbit Labs au quotidien.

---

## MISE EN PRODUCTION (À FAIRE EN PRIORITÉ)

### Étape 1 — Configurer la clé Anthropic API (20 min)
1. Ouvrir n8n → Workflows → Workflow 1 (ID: `2gGEZIbhE31dFmyU`)
2. Trouver les 3 nodes HTTP Request : **n11a**, **n13**, **n15a**
3. Dans chaque node : Header → `x-api-key` → remplacer par ta clé `sk-ant-...`
4. Sauvegarder

### Étape 2 — Ajouter les statuts manquants dans Notion (5 min)
1. Ouvrir Notion → Formulaire UGC IA
2. Cliquer sur la propriété **Statut** → Edit property
3. Ajouter ces options :
   - `Validé` (couleur verte)
   - `Erreur` (couleur rouge)
   - `En attente assets` (couleur orange)
4. Sauvegarder

### Étape 3 — Test end-to-end (30 min)
1. Créer une entrée test dans Formulaire UGC IA avec tous les champs remplis
2. Mettre Statut = **Nouveau**
3. Attendre 60 secondes → vérifier que Statut passe à **En génération**
4. Attendre la fin → vérifier que le fichier .md apparaît dans Google Drive
5. Vérifier la notif Discord #prod-n8n
6. Ouvrir le Drive → lire les prompts → si OK → Statut = **Validé**
7. Vérifier que Statut passe à **Livré** automatiquement

### Étape 4 — Passer en PROD (2 min)
1. n8n → Workflow 1 → toggle DRAFT → **PROD** (ACTIVE)
2. n8n → Workflow 2 → toggle DRAFT → **PROD** (ACTIVE)

---

## OPÉRATIONS QUOTIDIENNES

### Matin (10 min)
1. Ouvrir Notion → Formulaire UGC IA
2. Vérifier les briefs en **🟣 À review** → valider ou demander regen
3. Vérifier les **❌ Erreurs** → lire le champ "Erreur message" → corriger
4. Vérifier les **🟠 En attente assets** → relancer le client si > 48h

### Pipeline de validation des prompts
Quand Statut = **À review** :
1. Cliquer sur le brief → ouvrir le lien Drive
2. Lire chaque prompt avec cette grille :

| Critère | Bon | Mauvais |
|---------|-----|---------|
| Hook | Pattern interrupt, spécifique, < 5 mots | "Ce produit est super..." |
| Script | Langage oral, naturel | Phrases formelles, lues |
| Scènes | Actions précises décrites | "La personne sourit" |
| CTA | Une seule action claire | Plusieurs options ou vague |
| Claims | Aucune allégation non vérifiable | "Résultats garantis en 7 jours" |

3. Si PASS → mettre Statut = **Validé** dans Notion
4. Si EDITS MINEURS → éditer directement le fichier Drive → puis Validé
5. Si FAIL → mettre Statut = **Nouveau** → ajouter une note dans le champ commentaire

---

## STRUCTURE DU PACK VIDÉO

| Pack | Vidéos | Modèle Claude | Ce que contient le Drive |
|------|--------|---------------|--------------------------|
| Starter | 4 | Sonnet | 4 prompts Pletor + 1 Blueprint |
| Standard | 8 | Opus | 8 prompts Pletor + 1 Blueprint |
| Pro | 12 | Opus | 12 prompts Pletor + 1 Blueprint |

**Pletor** = prompt vidéo avec scènes et actions détaillées (pour le générateur vidéo IA)
**Blueprint** = document de cadrage créatif (angle narratif, structure, tone of voice)

---

## PROCESS BRIEF CLIENT

### Ce dont tu as besoin pour traiter un brief
```
[ ] Nom du client + marque
[ ] Produit + URL
[ ] Pack choisi (4 / 8 / 12 vidéos)
[ ] Angle de contenu (testimonial / problème→solution / lifestyle / démo)
[ ] Audience cible (âge, genre, pain point principal)
[ ] Hooks fournis par le client? (Oui/Non)
[ ] Angles fournis par le client? (Oui/Non)
[ ] Assets nécessaires? (Oui/Non)
[ ] Si Oui: assets reçus? (Oui/Non)
```

### Si assets manquants → message client
```
Bonjour [Prénom],

Pour lancer la production de vos [X] vidéos, nous avons besoin de :
• [asset 1 — ex: images produit HD]
• [asset 2 — ex: logo en transparent]
• [asset 3 — ex: vidéos de référence]

Merci de nous envoyer tout ça ici : [lien Drive upload]

La production démarre dans les 24h après réception.

L'équipe Orbit Labs
```

---

## TROUBLESHOOTING RAPIDE

| Symptôme | Cause probable | Fix |
|----------|---------------|-----|
| Workflow 1 ne se déclenche pas | Statut "Nouveau" non reconnu | Vérifier l'orthographe exacte du statut dans Notion |
| Statut bloqué en "En génération" > 10 min | API Anthropic timeout | Ouvrir n8n → executions → voir l'erreur exacte |
| Fichier Drive pas créé | Google Drive credential expiré | n8n → Credentials → ID z1sCW7DWcXVYf9jV → re-auth |
| Brief retraité deux fois | Anti-doublon non déclenché | Vérifier que les champs Job ID et Drive Folder sont vides |
| Workflow 2 ne se déclenche pas | Statut "Validé" mal orthographié | Vérifier la casse exacte dans Notion |
| Prompts en mauvaise langue | Brief en langue mixte | Préciser la langue dans le champ brief |

---

## SCALE ORBIT LABS : ÉTAPES SUIVANTES

### Quand tu as les premiers clients (mois 1)
- [ ] Créer un formulaire Tally propre et branded
- [ ] Définir tes prix (remplir le tableau dans le skill `orbit-labs-operator`)
- [ ] Créer une page de vente simple (utiliser le skill `shopify-operator` ou Notion public)
- [ ] Mettre en place un onboarding client (email auto post-paiement)

### Quand tu as 5+ clients actifs (mois 2-3)
- [ ] Ajouter un CRM léger (Notion pipeline client ou Airtable)
- [ ] Créer des templates de briefs par niche (beauty, wellness, food, tech)
- [ ] Automatiser les notifications clients via n8n → email/SMS
- [ ] Tester des créateurs IA différents selon les niches (Arcads, HeyGen, Pika)

### Pour scaler à 20+ clients (mois 4+)
- [ ] Recruter un ops manager junior (brief validation + client comms)
- [ ] Documenter chaque niche dans le Copy Bible (règles spécifiques beauté, santé, etc.)
- [ ] Construire un système de notation des prompts (track le % de validation)
- [ ] Mettre en place des retours créatifs post-livraison (performance des vidéos)

---

## UTILISER LE SKILL ORBIT LABS DANS CLAUDE

Le skill `orbit-labs-operator` est déployé dans `~/.claude/skills/`.

**Exemples d'utilisation :**
- "Validate this brief: [coller le contenu du brief]"
- "Review the prompts for [client] — here's the Drive content: [coller le contenu]"
- "Check Orbit Labs pipeline status"
- "Brief has an issue — error message: [coller l'erreur n8n]"
- "Write a delivery message for [client] — [X] vidéos pack"

*Le skill connaît l'architecture complète, les IDs, les règles Copy Bible et les messages clients.*

---

*Process créé le 2026-03-13 — À mettre à jour après chaque client livré*
