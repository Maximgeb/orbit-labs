# Règles du jeu — Automatisation n8n · Orbit Labs

> **Document de référence** : contrat de collaboration + standard de production.
> Toute intervention sur les workflows n8n d'Orbit Labs suit ces règles sans exception.

---

## 0. Infrastructure & Outils IA (setup actuel)

### 0.1 MCP Server — Accès direct à n8n cloud

**Statut :** configuré et actif dans `~/.claude/settings.json`

| Paramètre | Valeur |
|---|---|
| Instance n8n | `https://orbitlabs.app.n8n.cloud/` |
| Endpoint MCP | `https://orbitlabs.app.n8n.cloud/mcp-server/http` |
| Transport | Streamable HTTP via `supergateway` |
| Exécutable | `/opt/homebrew/bin/npx -y supergateway` |
| Auth | Bearer JWT (configuré dans settings.json) |

**Ce que le MCP permet (outils disponibles dans Claude Code) :**
- Lire, créer, modifier, activer/désactiver des workflows directement
- Accéder à l'historique des exécutions
- Tester un workflow en direct
- Gérer les credentials (lecture des IDs, pas des secrets)

**Règle d'or avec le MCP :** toute écriture via MCP = action réelle sur l'instance prod. Appliquer les règles de sécurité section 2 sans exception.

**Si le JWT expire :** le renouveler dans n8n cloud → Settings → API → MCP → Regenerate token → mettre à jour `~/.claude/settings.json`.

---

### 0.2 n8n-skills — 7 skills expert installés

**Statut :** installés dans `~/.claude/skills/` (actifs automatiquement dans Claude Code)

**Source :** https://github.com/czlonkowski/n8n-skills

Les skills s'activent **automatiquement** selon le contexte de la question. Pas besoin de les appeler explicitement.

| Skill | Rôle | S'active quand... |
|---|---|---|
| `n8n-mcp-tools-expert` | Guide l'utilisation des outils MCP (**priorité max**) | Recherche de nodes, gestion workflow |
| `n8n-workflow-patterns` | 5 patterns architecturaux prouvés (webhook, HTTP, DB, AI, scheduled) | Construction d'un workflow |
| `n8n-node-configuration` | Configuration des nodes, dépendances entre propriétés | Paramétrage d'un node |
| `n8n-expression-syntax` | Patterns `{{ }}`, variables `$json`, `$node`, pièges courants | Écriture d'expressions |
| `n8n-validation-expert` | Interprétation erreurs, boucles de validation, auto-fix | Erreur de validation |
| `n8n-code-javascript` | Patterns JS pour Code nodes, `$helpers`, DateTime | Écriture de code JS |
| `n8n-code-python` | Python dans Code nodes, limitations (pas de libs externes) | Écriture de code Python |

**Les skills fonctionnent en cascade.** Exemple pour "construire un webhook vers Notion" :
```
n8n-workflow-patterns (structure)
  → n8n-mcp-tools-expert (chercher les nodes)
    → n8n-node-configuration (paramétrer chaque node)
      → n8n-expression-syntax (mapper les données)
        → n8n-validation-expert (valider le résultat)
```

---

### 0.3 Flux de travail recommandé avec les outils

Pour **créer un nouveau workflow** :
1. Décrire le besoin → les skills s'activent automatiquement
2. Claude cherche les nodes via MCP (`search_nodes`, `get_node`)
3. Claude propose une structure (pattern + liste nodes + paramètres)
4. **Valider le plan avant toute écriture MCP**
5. Claude crée le workflow draft via MCP (`n8n_create_workflow`)
6. Test + validation (`n8n_validate_workflow`, `n8n_test_workflow`)
7. Bascule en prod uniquement après ta validation explicite

Pour **débugger un workflow existant** :
1. Claude lit le workflow via MCP
2. Identifie le node en erreur + cause probable
3. Propose correction + risques
4. **Valider avant modification**
5. Modification incrémentale (`n8n_update_partial_workflow`)
6. Re-test immédiat

---

## 1. Mission & Objectifs

### Objectif business
Automatiser intégralement la production de créas publicitaires à partir d'un brief client reçu via Notion ou Tally :

- **Entrée** : brief client (texte structuré — offre, cible, angles, format, contraintes)
- **Traitement** : génération de hooks, scripts, scènes, prompts vidéo, éléments QA
- **Sortie** : livrables nommés et stockés, pipeline de production alimenté, équipe notifiée

### Objectif technique
- Workflows **fiables** : pas de silent failure, chaque étape loggée
- Workflows **versionnés** : historique des modifications, rollback possible
- Workflows **maintenables** : un développeur externe doit pouvoir reprendre en 30 min
- Workflows **scalables** : ajouter un pack ou un client ne casse rien

---

## 2. Règles de Sécurité (non négociables)

### 2.1 Avant toute modification

| Situation | Action obligatoire |
|---|---|
| Modifier un workflow actif | Dupliquer → travailler sur le duplicata → tester → basculer |
| Modifier un credential | Valider avec le propriétaire → noter le changement dans le changelog |
| Supprimer quoi que ce soit | Backup JSON exporté localement + confirmation explicite demandée |
| Action irréversible (DELETE, OVERWRITE) | Pause + demande de validation avant exécution |

### 2.2 Credentials & secrets

- **Jamais** de clés API, tokens, mots de passe dans les nœuds en clair
- Utiliser exclusivement les **Credentials** n8n (stockage chiffré)
- Jamais de données sensibles dans les messages de log publics ou les notifications Discord
- Principe du **moindre privilège** : chaque integration utilise un compte/token avec les seules permissions nécessaires

### 2.3 Environnements

- Travailler sur un **workflow dupliqué** (`[DRAFT] Nom_du_workflow`) tant que non validé
- Basculer en prod uniquement après validation complète
- Le suffixe `[PROD]` indique le workflow actif — on ne le touche pas directement

---

## 3. Méthode de Travail

Chaque intervention suit ce cycle sans exception :

### Étape 1 — Diagnostic
- État actuel : qu'est-ce qui tourne ? qu'est-ce qui est cassé ?
- Problème précis : message d'erreur, nœud en échec, comportement inattendu
- Cause probable : API flaky, mapping incorrect, race condition, etc.

### Étape 2 — Plan d'action
- Présenter **2 options minimum** : quick fix vs refacto propre
- Indiquer la recommandation et pourquoi
- Lister les risques de chaque option
- **Attendre validation** si l'action touche la prod ou un credential

### Étape 3 — Implémentation
- Petites itérations testables (un nœud à la fois si possible)
- Commit intermédiaire (export JSON) avant chaque changement significatif
- Jamais de "big bang" — modifier 10 nœuds d'un coup sans test intermédiaire

### Étape 4 — Validation
- Test sur cas nominal (happy path)
- Test sur cas limites : payload vide, champ manquant, API timeout, doublon
- Vérification des logs : chaque étape produit une entrée de log exploitable
- Monitoring : vérifier que les exécutions passées ne sont pas impactées

### Étape 5 — Documentation
- Mettre à jour le changelog du workflow (dans les notes du nœud Sticky Note `[META]`)
- Documenter : ce que fait le workflow, les inputs attendus, les outputs produits, comment rollback

---

## 4. Standards n8n (Style Guide)

### 4.1 Naming conventions

**Workflows :**
```
[STATUT] Domaine - Action - Version
Exemples :
  [PROD] Brief → Génération Créas - v2
  [DRAFT] Brief → Génération Créas - v3-hooks-refacto
  [ARCHIVE] Brief → Génération Créas - v1
```

**Nœuds :**
```
TYPE: Description courte
Exemples :
  TRIGGER: Réception brief Tally
  VALIDATE: Champs obligatoires présents
  ENRICH: Récupération prompts Notion
  GENERATE: Claude - Hooks x5
  QA: Vérification longueur hooks
  OUTPUT: Écriture Google Drive
  NOTIFY: Discord - Brief traité
  ERROR: Logging échec + alerte
```

**Variables / expressions :**
```
{{ $json.brief_id }}         → identifiant unique du brief
{{ $json.client_name }}      → nom du client (slug)
{{ $json.pack_type }}        → type de pack (ugc, static, video)
{{ $json.job_id }}           → ID unique de l'exécution (généré en début de workflow)
```

### 4.2 Structure recommandée

```
TRIGGER
  └── VALIDATE (champs obligatoires, format, déduplication)
        └── ENRICH (lecture Notion briefs, Prompt Library)
              └── GENERATE (appels LLM Claude — par bloc : hooks, scripts, scènes, prompts)
                    └── QA (vérification format, longueur, cohérence)
                          └── OUTPUTS (écriture Drive, Notion)
                                └── NOTIFY (Discord)
                                      └── LOG (statut final : success / partial / error)
```

Chaque branche principale a une **branche error** parallèle :
```
[Nœud principal]
  ├── [Succès] → suite du workflow
  └── [Erreur] → ERROR: Log détaillé → NOTIFY: Discord alerte → STOP
```

### 4.3 Gestion des erreurs

- **Try/Catch** : activer "Continue On Fail" uniquement quand l'erreur est récupérable et gérée
- **Branche error** : chaque nœud critique a une sortie d'erreur explicite
- **Retries** : 3 tentatives max, délai exponentiel (1s → 5s → 15s), sur les appels API uniquement
- **Dead letter** : les exécutions en échec définitif sont loggées dans une base Notion `[LOG] Erreurs`
- **Alertes** : toute erreur non récupérée déclenche une notification Discord `#alerts-n8n`

### 4.4 Rate limits & Timeouts

- Claude API : max 1 appel toutes les 2s si batch → utiliser un nœud `Wait` entre les itérations
- Notion API : max 3 requêtes/seconde → throttle explicite si loop
- Google Drive : pas de limite critique, mais timeout à 30s sur les uploads volumineux
- Timeout global sur les appels LLM : 60s (configurer dans le nœud HTTP si pas natif)

### 4.5 Webhooks & Payloads

- Chaque webhook entrant est **validé** (champs obligatoires, types) avant traitement
- Utiliser un nœud `Set` en entrée pour **normaliser** le payload (clés en snake_case, trim des strings)
- En cas de payload invalide : répondre `400 Bad Request` avec message explicite, logguer, ne pas continuer

### 4.6 Idempotence

- Générer un `job_id` unique dès le début (`{{ $now.toISO() }}-{{ $json.brief_id }}`)
- Vérifier en base (Notion ou variable) si le `brief_id` a déjà été traité → skip si oui
- Les nœuds d'écriture (Drive, Notion) utilisent des noms de fichiers/entrées incluant le `job_id` → pas d'écrasement silencieux

---

## 5. Intégrations Clés du Projet

### 5.1 Notion — Briefs clients
- **Base** : `Orbit Labs / Briefs`
- **Trigger** : nouvelle entrée avec statut `À traiter`
- **Champs lus** : `brief_id`, `client_name`, `offre`, `cible`, `angles`, `format`, `pack_type`, `contraintes`
- **Mise à jour** : statut → `En cours` au démarrage, `Terminé` ou `Erreur` à la fin
- **Credential** : `Notion - Orbit Labs (read/write Briefs)`

### 5.2 Notion — Prompt Library
- **Base** : `Orbit Labs / Prompt Library`
- **Usage** : récupérer les prompts système et utilisateur selon le `pack_type` et l'étape (hooks, scripts, scènes...)
- **Filtres** : `pack_type = {{ $json.pack_type }}` ET `actif = true`
- **Credential** : `Notion - Orbit Labs (read Prompts)` — lecture seule

### 5.3 Claude (LLM)
- **Usage** : génération de tous les contenus textuels
- **Modèle par défaut** : `claude-opus-4-6` (qualité max) — basculer sur `claude-haiku-4-5` pour les tâches rapides/bon marché
- **Format de prompt** : system + user séparés, variables injectées via `{{ $json.* }}`
- **Format de sortie** : JSON structuré (imposer via instructions système + parsing dans le nœud suivant)
- **Gestion des refus** : si Claude refuse ou sort du format → erreur explicite + log
- **Credential** : `Anthropic - Orbit Labs`

### 5.4 Google Drive — Stockage exports
- **Structure de dossiers** :
  ```
  Drive/
  └── Orbit Labs/
      └── Productions/
          └── {{ client_name }}/
              └── {{ date_YYYY-MM }}/
                  └── {{ job_id }}_{{ pack_type }}/
                      ├── hooks.md
                      ├── scripts.md
                      ├── scenes.md
                      ├── prompts_video.md
                      └── qa_report.md
  ```
- **Naming des fichiers** : `{{ job_id }}_{{ pack_type }}_{{ etape }}.md`
- **Credential** : `Google Drive - Orbit Labs`

### 5.5 Discord — Notifications
- **Channel prod** : `#prod-n8n` (succès, résumés)
- **Channel alertes** : `#alerts-n8n` (erreurs, anomalies)
- **Format message succès** :
  ```
  ✅ [{{ client_name }}] Pack {{ pack_type }} généré
  Job ID : {{ job_id }}
  Durée : {{ duration }}s
  Fichiers : {{ nb_fichiers }} créés dans Drive
  ```
- **Format message erreur** :
  ```
  🚨 ERREUR — {{ workflow_name }}
  Job ID : {{ job_id }}
  Étape : {{ etape_en_echec }}
  Erreur : {{ error_message }}
  ```
- **Credential** : `Discord Webhook - Orbit Labs`

---

## 6. Qualité & QA

### 6.1 Checklist livraison (obligatoire avant passage en prod)

**Validation MCP (via Claude Code) :**
- [ ] `n8n_validate_workflow` passé sans erreur critique
- [ ] `n8n_autofix_workflow` appliqué si erreurs mineures détectées
- [ ] `n8n_test_workflow` exécuté avec payload de test réel

**Tests fonctionnels :**
- [ ] Workflow testé sur cas nominal (brief complet et valide)
- [ ] Testé sur cas limites : brief incomplet, champ vide, API timeout simulé
- [ ] Branche error présente et fonctionnelle sur chaque nœud critique
- [ ] Idempotence vérifiée (relance sur même brief → pas de doublon)

**Standards & documentation :**
- [ ] Logs complets sur toutes les étapes (voir 6.2)
- [ ] Pas de credential en clair dans les nœuds
- [ ] Naming des nœuds conforme au style guide (section 4.1)
- [ ] Notification Discord testée (succès + erreur)
- [ ] Export JSON du workflow sauvegardé localement
- [ ] Sticky Note `[META]` à jour (description, version, changelog)

### 6.2 Logs obligatoires

Chaque exécution doit produire (minimum) :

| Champ | Valeur exemple |
|---|---|
| `job_id` | `2026-03-03T14:32:00Z-brief_042` |
| `client` | `marque-x` |
| `pack_type` | `ugc` |
| `etape` | `generate_hooks` |
| `statut` | `success` / `error` |
| `duree_ms` | `3420` |
| `error_message` | `null` ou message d'erreur |

Stocker dans : Notion `[LOG] Exécutions` OU fichier Google Drive `logs/{{ date }}.json`

### 6.3 Critères "ready to ship"

Un workflow est prêt à passer en `[PROD]` si et seulement si :
- Checklist 6.1 complète à 100%
- 0 erreur sur 3 exécutions consécutives de test
- Temps d'exécution documenté et dans les limites acceptables (< 3 min pour un pack complet)
- Validation explicite du propriétaire (toi) avant bascule

---

## 7. Ce que Tu Dois Me Demander Avant d'Agir

### Toujours demander (pause obligatoire)
- Toute action sur un workflow `[PROD]` actif
- Modification ou rotation d'un credential
- Suppression d'un workflow, nœud, fichier, ou entrée Notion
- Action qui génère des coûts significatifs (run LLM en masse, upload Drive volumineux)
- Si le résultat attendu est ambigu et que deux interprétations donnent des comportements très différents

### Faire une hypothèse et avancer (documenter l'hypothèse)
- Choix de structure interne d'un nœud (ordre des champs, format intermédiaire)
- Naming d'un nœud ou d'une variable si le style guide le couvre
- Choix du modèle Claude si non spécifié (défaut : `claude-opus-4-6`)
- Petites décisions de formatage (markdown, JSON, indentation)

### Validation explicite requise (ne jamais skip)
- Passage d'un workflow `[DRAFT]` → `[PROD]`
- Modification des prompts système dans la Prompt Library
- Changement de structure des dossiers Drive
- Ajout d'une nouvelle intégration externe (nouveau credential, nouveau service)

---

## 8. Format des Réponses

### Structure standard (toujours suivre cet ordre)

**(a) Ce que j'ai compris**
> Reformuler brièvement le problème ou la demande pour confirmer l'alignement.

**(b) Ce que je propose**
> Plan d'action clair, options si pertinent, recommandation justifiée.

**(c) Ce que je change**
> Liste des modifications précises : quel workflow, quel nœud, quel paramètre.

**(d) Comment tester**
> Étapes de test concrètes : payload de test, résultat attendu, comment vérifier.

**(e) Risques & rollback**
> Ce qui peut mal tourner. Comment revenir en arrière si ça casse.

---

### Pour chaque workflow livré

**Mini schéma :**
```
[TRIGGER: Source] → [VALIDATE: Champs] → [ENRICH: Notion prompts]
  → [GENERATE: Claude hooks] → [GENERATE: Claude scripts]
  → [QA: Format check] → [OUTPUT: Drive] → [NOTIFY: Discord]
  → [LOG: Statut final]
         ↓ (sur erreur)
  [ERROR: Log détaillé] → [NOTIFY: Discord #alerts]
```

**Liste des nœuds :**
| Nœud | Type | Paramètres critiques |
|---|---|---|
| `TRIGGER: Réception brief` | Notion Trigger | Base ID, filtre statut = "À traiter" |
| `VALIDATE: Champs obligatoires` | IF | brief_id, client_name, pack_type non vides |
| `ENRICH: Prompts Notion` | Notion | Filter: pack_type = {{ $json.pack_type }}, actif = true |
| `GENERATE: Claude hooks` | HTTP Request | Model: claude-opus-4-6, max_tokens: 1500 |
| `OUTPUT: Drive` | Google Drive | Folder ID, filename: {{ job_id }}_hooks.md |
| `NOTIFY: Discord` | HTTP Request | Webhook URL, JSON body formaté |

---

*Document créé le 2026-03-03 — Orbit Labs · Automatisation n8n*
*Maintenu par : assistant technique Claude (claude-sonnet-4-6)*
*MCP Server : n8n cloud built-in via supergateway · Skills : n8n-skills v1.1.0 (czlonkowski)*
