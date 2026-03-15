---
name: orbit-labs-operator
description: "Operates the Orbit Labs UGC production pipeline: brief validation, prompt review, client communication, quality control, delivery tracking, and workflow troubleshooting. Use when user says: validate this brief, review these prompts, check orbit labs pipeline, client brief is ready, prompts need review, orbit labs status, validate UGC output, client delivery, check n8n workflow, brief has an issue, regenerate prompts. Do NOT use for general content creation, Shopify, or SEO tasks."
compatibility: Requires access to Orbit Labs Notion workspace and n8n instance.
metadata:
  author: Maxime Gebhart
  version: 1.0.0
  category: agency-ops
  tags: [orbit-labs, ugc, production, n8n, notion]
---

## Overview
This skill operates the Orbit Labs UGC production system. It covers the full pipeline from
client brief intake to final video delivery, including brief validation, prompt QA,
workflow troubleshooting, and client communication.

Read references/orbit-labs-context.md before any task.

## System Architecture
```
Tally Form → Notion (Formulaire UGC IA) → n8n Workflow 1 → Claude generates prompts
→ Google Drive (.md file) → Human review → Statut = Validé → n8n Workflow 2 → Livré
```

Statuses: 🟡 Nouveau → 🔵 En génération → 🟠 En attente assets → 🟣 À review → 🟢 Validé → ✅ Livré → ❌ Erreur

## Workflow — Brief Validation
When a new brief arrives (Statut = Nouveau), verify before the workflow runs:

### Required fields check
- Client name + brand name
- Product name + URL
- Pack size (4, 8, or 12 videos)
- Content angle (problème→solution, testimonial, lifestyle, démonstration)
- Target audience (age, gender, pain point)
- Hooks provided? (Yes/No — if No → workflow generates them)
- Angles provided? (Yes/No — if No → workflow generates them)
- Assets required? (Oui/Non)
- If Assets required = Oui → are assets received? If not → set Statut = En attente assets

### Brief quality scoring
Rate each field 1-3:
- 3: Complete, specific, actionable
- 2: Present but vague, needs clarification
- 1: Missing or unusable

If any field scores 1 → flag for client clarification before proceeding.
If all fields score 2+ → brief is ready to process.

## Workflow — Prompt Quality Review (À review status)
When prompts are generated and Statut = À review:

1. Open the Google Drive .md file linked in the brief
2. For each prompt, verify:
   - Hooks: pattern interrupt in first 3 seconds, matches content angle
   - Script: natural spoken language, not written/formal
   - Scenes: specific actions described, not vague directions
   - CTA: clear single action, matches pack goal
   - Copy Bible compliance: no forbidden words/claims from Orbit Copy Bible
   - Claims Policy: no unverifiable health/performance claims

3. Rate overall quality:
   - PASS: Prompts are strong → instruct: set Statut = Validé
   - PASS WITH EDITS: Minor fixes needed → list specific edits → apply → set Statut = Validé
   - FAIL: Major issues → identify root cause → set Statut = Nouveau to regenerate

### Common QA failure reasons
- Hooks too generic ("Ce produit est incroyable") → needs specificity and pattern interrupt
- Script too formal/written → rewrite in spoken conversational French/English
- Claims not compliant (guaranteed results, medical claims) → check Copy Bible forbidden words
- Wrong pack format → verify prompt count matches pack size (4/8/12)

## Workflow — Client Communication
Standard messages in French:

**Brief received:**
```
Bonjour [Prénom], nous avons bien reçu votre brief pour [Produit].
Notre équipe commence la production. Vous recevrez une notification dès que vos prompts sont prêts pour validation.
Délai estimé : 24-48h.
```

**Assets needed:**
```
Bonjour [Prénom], pour finaliser votre pack [Produit], nous avons besoin de :
[liste des assets manquants]
Merci de nous les envoyer à cette adresse : [lien Drive upload]
La production reprend dès réception.
```

**Prompts ready for review:**
```
Bonjour [Prénom], vos [X] prompts vidéo sont prêts !
Consultez-les ici : [lien Drive]
Pour valider : répondez simplement "Validé" ou indiquez les modifications souhaitées.
```

**Delivery:**
```
Bonjour [Prénom], vos [X] vidéos sont livrées !
Téléchargez-les ici : [lien Drive]
N'hésitez pas à nous faire un retour sur la qualité. À très bientôt !
```

## Workflow — Error Troubleshooting
When Statut = Erreur, read the "Erreur message" field and diagnose:

| Error | Cause | Fix |
|-------|-------|-----|
| Anthropic API timeout | Rate limit or key issue | Verify API key, check usage limits, retry |
| Drive folder not created | Google Drive credential expired | Re-authenticate in n8n (ID: z1sCW7DWcXVYf9jV) |
| Prompt generation incomplete | Brief missing required fields | Complete the brief, reset Statut = Nouveau |
| Workflow not triggering | Polling interval missed | Check n8n Workflow 1 trigger node, verify polling = 1 min |
| Anti-doublon blocked | Job ID already exists | Check if brief was already processed, clear Job ID field if needed |

## Workflow — Pipeline Status Check
To get current pipeline status:
1. Open Notion → Formulaire UGC IA database
2. Count entries by status:
   - 🟡 Nouveau: waiting to process
   - 🔵 En génération: currently processing
   - 🟠 En attente assets: blocked on client
   - 🟣 À review: needs your validation now
   - ✅ Livré: completed this week
3. Priority: handle all "À review" first, then check for errors

## Pricing Reference (for client quotes)
| Pack | Vidéos | Modèle | Prix indicatif |
|------|--------|--------|----------------|
| Starter | 4 | Claude Sonnet | — |
| Standard | 8 | Claude Opus | — |
| Pro | 12 | Claude Opus | — |

Note: Fill in your actual pricing. Opus is used for 8+ video packs for higher quality output.

## Edge Cases
- Brief in English and French: process in the language the brief is written in
- Client requests reshoots: create a new brief entry, reference original brief ID
- Workflow 1 stuck in "En génération" for >10 min: check n8n execution logs, likely API timeout
- Google Drive file not appearing: check Drive folder ID in n8n (1PVyC17jBSiGKTQxEvN6axCQ0HOJVsSWT)

## Examples

### Example 1 — Brief validation
Input: "Validate this brief: [client name], product: Sérum Vitamine C, pack 8 vidéos, angle testimonial, no assets needed, hooks not provided"
Expected: Field-by-field scoring, confirmation brief is ready or list of missing info.

### Example 2 — Prompt QA
Input: "Review the prompts for [client] — Drive link: [URL]"
Expected: Per-prompt rating, PASS/FAIL decision, specific edits if needed, instruction to set status.
