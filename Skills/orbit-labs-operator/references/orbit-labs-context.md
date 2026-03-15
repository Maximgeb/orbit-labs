# Orbit Labs — Quick Reference

## System IDs
- Formulaire UGC IA (Notion DB): 9998faaa-f9df-4d0b-89ab-421bddb7830a
- Prompt Library (Notion DB): c91ff558-b750-40cf-b7a8-8e92c0f22b5d
- Orbit Copy Bible (Notion DB): ecc398d9-4bb8-44b7-86e0-2a13ccfb1f3e
- Google Drive folder: 1PVyC17jBSiGKTQxEvN6axCQ0HOJVsSWT
- n8n Workflow 1 (Génération): 2gGEZIbhE31dFmyU — 34 nodes
- n8n Workflow 2 (Finalisation): s6h1DBwaJs01w6Vu — 6 nodes
- n8n Notion credential: I73fb9oK6DCBgDcR
- n8n Google Drive credential: z1sCW7DWcXVYf9jV

## Active Prompt Templates
- PLETOR_v1: génère les prompts vidéo Pletor (scènes + actions)
- BLUEPRINT_v1: génère le blueprint créatif (angle + structure narrative)

## Prompt Library Schema
Stages: Hooks | Script | Scenes | VideoPrompt | QA | Pletor | Blueprint
Models: Claude Sonnet (4 vidéos) | Claude Opus (8-12 vidéos)
Languages: FR | EN

## Copy Bible — P0 Rules (non-négociables)
Categories actives: Claims Policy + UGC Rules
- Claims Policy: liste des mots/claims interdits (vérifier avant validation)
- UGC Rules: règles de format et d'authenticité pour les vidéos

## Tally Webhook (configuré 2026-03-13)
- Webhook ID: mZ2A0V · Statut: ACTIVE ✅
- URL n8n: https://orbitlabs.app.n8n.cloud/webhook/orbit-labs-brief
- Event: FORM_RESPONSE (déclenché à chaque soumission — 0 polling)

## Files location
- Process & ops: /Orbit Labs/ORBIT_LABS_PROCESS.md
- n8n rebuild guide: /Orbit Labs/ORBIT_LABS_N8N_REBUILD.md
- Skill source: /Orbit Labs/Skills/orbit-labs-operator/

## Pipeline Flow
```
Tally Form submission
  → Tally Webhook → n8n Webhook Trigger (INSTANTANÉ — 0 crédit passif)
  → Statut = En génération
  → Claude (HTTP nodes n11a, n13, n15a) generates prompts
  → .md file created in Google Drive
  → Discord notification #prod-n8n
  → Statut = À review (or En attente assets if assets needed)

Human validates in Google Drive
  → Set Statut = Validé in Notion

  → n8n Workflow 2 triggers
  → Statut = Livré
  → Discord notification #prod-n8n
```

## Anti-Doublon System
If Job ID field OR Drive Folder field already filled → Workflow 1 stops silently.
To reprocess a brief: clear both fields, reset Statut = Nouveau.

## Current Production Blockers (as of 2026-03-13)
- [ ] Anthropic API key not set in n8n nodes n11a, n13, n15a
- [ ] Manual statuses missing in Formulaire UGC IA: Validé, Erreur, En attente assets
- [ ] Both workflows still in DRAFT mode (not PROD)
