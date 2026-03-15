# Orbit Labs — Claude Code · Contexte de session

> Référence complète : [Regles du jeu - automatisation n8n.md](Regles%20du%20jeu%20-%20automatisation%20n8n.md)

---

# FRONTEND RULES — Orbit Labs Design System

## Always Do First
- **Never skip this:** Before writing or editing any frontend code, invoke the `frontend-design` skill at the start of every session. No exceptions.
- Then proceed with code generation.

---

## Project Context

**Orbit Labs** is a **premium AI UGC creative agency**.

- **Core offer:** Help brands test and produce UGC-style ad creatives powered by AI — fast and at scale
- **Tone:** Premium, sharp, conversion-first, modern, slightly futuristic
- **Service promise:** Fast creative testing, scalable production, polished outputs
- **Target audience:** E-commerce brands, performance marketers, founders, media buyers
- **Main use case:** Generate ad creatives fast before spending more on human creators
- **Business model:** Service-first agency with high automation and productized offers
- **Stack:** Next.js 14 + Tailwind CSS + Framer Motion
- **Deployment:** Vercel

**Never frame the service as:** cheap, low-end, gimmicky, generic AI content

---

## Artistic Direction

### Global Design Intent

The website must feel: **premium · sharp · minimal · high-trust · modern · slightly futuristic · conversion-oriented**

It should feel like a serious premium AI creative studio — not a SaaS dashboard, not a generic agency, not a loud startup landing page.

### Visual Style
- Dark foundation
- Precise spacing
- Strong typography hierarchy
- Orange accent used with restraint
- Soft glow effects, not cheesy neon
- Clean card systems
- Elegant gradients
- Controlled motion
- Structured sections with strong visual rhythm

### Brand Feel
- Premium, not flashy
- Technical, not cold
- Modern, not trendy
- Sharp, not cluttered
- Trustworthy, not hype-only
- Conversion-first, not overdesigned

---

## Reference & Inspiration

### Reference Sites (3 benchmarks)

| Site | URL | What to study |
|---|---|---|
| **8lab Ecosystem** | https://www.8lab-ecosystem.com/ | Section rhythm, headline hierarchy, premium dark layout, dense but readable, visual credibility |
| **Kryve Studio** | https://www.kryve.studio/ | Agency premium feel, motion language, how a creative studio positions itself, type treatment |
| **Open Scale Agency** | https://openscale.agency/ | Performance agency structure, CTA strategy, how to frame an ROI-focused service, conversion flow |

### How to Use These References
- Use as **directional benchmarks only**, never clones
- Extract: energy · density · hierarchy · premium feel · conversion flow
- Do NOT copy branding, content, or exact layouts

### What Orbit Labs Must Feel Compared to These References
- More minimal than 8lab (less info-product energy)
- More design-led than Open Scale (less performance agency cold)
- More conversion-focused than Kryve (less pure portfolio)
- The intersection: **premium creative agency + performance system**

---

## Existing Site Context

Before every frontend session:
1. Read the existing codebase and current sections
2. Understand the current visual direction already started
3. Preserve what is already strong
4. Improve what feels weak, generic, too bulky, or inconsistent
5. Align everything under one premium artistic direction

**Do not rebuild blindly. Understand before touching.**

---

## Landing Page — Full Structure & Psychological Funnel

Each section has a precise psychological role in the visitor journey. Respect this order and intent.

| # | Section | Component | Psychological role |
|---|---|---|---|
| 1 | **Hero** | `Hero.tsx` | Immediate comprehension — stop the scroll, understand the offer |
| 2 | **Why UGC humain ralentit** | `Problem.tsx` | Create tension — make the visitor feel the problem |
| 3 | **Pourquoi Orbit Labs gagne** | `Why.tsx` | Transform pain into concrete benefits |
| 4 | **Process simple** | `Process.tsx` | Remove friction — show it's easy |
| 5 | **Pas de hasard. Un système.** | `System.tsx` | Build strategic credibility |
| 6 | **Exemples / Previews UGC** | `Examples.tsx` | Visual proof — reduce doubt |
| 7 | **Packs / Pricing** | `Packs.tsx` | Enable decision |
| 8 | **FAQ** | `FAQ.tsx` | Remove final objections |
| 9 | **Trust / Réassurance** | `Trust.tsx` | Final security layer |
| 10 | **CTA Final** | `CTAFinal.tsx` | Convert — no ambiguity |

### Mental journey the visitor must follow
1. I immediately understand what Orbit Labs is
2. I feel why the current model (human UGC) is slow and expensive for testing
3. I understand why Orbit Labs is smarter for fast testing
4. I see the process is simple
5. I understand there's a real system behind, not just "AI videos"
6. I see examples / proof / outputs
7. I understand the offers and pricing
8. My objections are answered
9. I click

### Section-by-section intent

**Hero** — Understand the offer immediately, want to continue. H1 extremely clear. Minimal text. Premium CTA. Note of reassurance.

**Problem (Why human UGC slows you down)** — Create logical frustration. Make visitor say "yes, that's exactly it." Prepare Orbit Labs as the obvious solution. Angles: time, cost, difficulty iterating.

**Why Orbit Labs wins** — Credible output, directly usable format, zero logistics, multiple testable variations, no physical product needed, faster execution, better iteration capacity.

**Process** — 3 steps: order → brief (2 min) → receive. Remove fear of complexity.

**System** — Hook-first, angles + copy, multi-scenes, batch testable. Show the creative framework. Sell the system behind the output.

**Examples/Previews** — Proof that output exists and is usable. Multiple styles. Keep premium, not cluttered.

**Packs** — 3 levels: Launch Test (4 vidéos / 290€) · Hook Sprint (8 vidéos / 490€) · Phase de Scaling (12 vidéos / 690€). Clear inclusions. Simple CTAs. Natural upsell toward featured pack.

**FAQ** — Cost, delays, quality in ads, no stock needed, avatar mixing, retouches process. Single open at a time.

**Trust** — Clean process, clear delay, retouches included, structured delivery, testing-oriented. Compact block.

**CTA Final** — Next step obvious. Available now. Clear process. No friction. Mirror Hero's energy.

---

## Project File Structure

```
/app
  layout.tsx      — meta, fonts, globals
  page.tsx        — assembles all sections in funnel order
  globals.css     — all keyframes + section CSS

/components
  Nav.tsx         — fixed header, scroll-aware
  Hero.tsx        — ✅ built
  Problem.tsx     — 🔲 to build
  Why.tsx         — 🔲 to build
  Process.tsx     — ✅ built
  System.tsx      — ✅ built
  Examples.tsx    — 🔲 to build
  Packs.tsx       — ✅ built
  FAQ.tsx         — ✅ built
  Trust.tsx       — 🔲 to build
  CTAFinal.tsx    — ✅ built
  Footer.tsx      — ✅ built

/public/logos
  logo-header.png — Orbit Labs header logo
  favicon.png     — Orbit Labs favicon
```

---

## Brand System

### Typography

**Headings**
- Strong, sharp, modern
- Tight tracking (`-0.03em` to `-0.04em`)
- Large but controlled — never bulky or cartoonish
- Premium visual rhythm across sections

**Body**
- Clean, highly readable
- Slightly compact but breathable
- Designed for conversion and fast scanning

**Typography Rules**
- ❌ No oversized cheap startup headings
- ✅ Subheadings must be scannable
- ✅ Consistent heading scale across all sections is mandatory
- ✅ Body text must support the hierarchy, never compete with it

---

### Color System

| Role | Value | Usage |
|---|---|---|
| **Primary background** | Deep black / near-black | Base layer |
| **Secondary surfaces** | Dark charcoal / graphite | Cards, sections |
| **Primary text** | Soft white / off-white | All body + headings |
| **Accent** | `#FF5A1F` (Orbit orange) | CTAs, pills, glows, highlights |
| **Supporting grays** | Subtle, premium, layered | Borders, dividers, muted text |

**Color Rules**
- ✅ Orange for: CTA emphasis · pills / tags · active highlights · subtle glow accents · micro-details
- ❌ Do not overuse orange — it must stay an accent
- ❌ No flat or oversaturated UI colors
- ❌ No default Tailwind palette colors unless remapped into the brand system

---

## UI Language

### Key Components

| Component | Style |
|---|---|
| **Pills / labels** | Subtle, compact, premium |
| **Cards** | Soft dark surfaces, clean borders, controlled depth |
| **Buttons** | Compact, premium, direct — no chunky cheap styling |
| **Inputs** | Refined, clean, slightly futuristic, high-trust |
| **FAQ / Process / Pricing** | Highly structured, highly readable |

### Visual Effects

**Allowed:**
- Subtle glow
- Soft gradients
- Glassmorphism — only if very restrained
- Dot grids / tech lines — only if elegant and not noisy
- Mild hover transforms
- Clean fade/slide motion

**Not allowed:**
- Too much blur
- Cheap glass effects
- Oversized shadows
- Random gradients
- Over-animated UI
- Loud neon cyberpunk look

### Shadows

```css
/* Premium layered shadow — use this pattern */
box-shadow:
  0 4px 8px rgba(0, 0, 0, 0.12),
  0 12px 32px rgba(255, 90, 31, 0.06),
  inset 0 1px 0 rgba(255, 255, 255, 0.04);
```

---

## Motion Rules

- Use Framer Motion carefully — motion supports perceived quality, never distracts
- ✅ Prefer: fade-in · slide-up · subtle stagger · small scale hover
- ❌ Never use `transition-all`
- ✅ Animate only: `opacity` + `transform`
- ✅ Prefer spring physics: `type: "spring", stiffness: 80, damping: 20`

---

## Conversion Rules

This site is not just beautiful. **It must convert.**

Always optimize for:
- Clarity of offer
- Trust signals
- CTA visibility
- Section progression logic
- Readability on mobile
- Speed of scanning

The Orbit Labs landing must make immediately clear:
1. What the service is
2. Who it is for
3. Why it is better/faster than alternatives
4. How the process works
5. What the offers are
6. What the next step is

---

## Responsive Rules

- Mobile-first always
- Desktop must feel cleaner and more premium — never oversized
- Avoid bulky blocks on desktop
- Buttons, cards, type must scale intelligently between breakpoints
- Nothing cramped on mobile, nothing inflated on desktop

---

## Component Architecture

```
app/
├── page.tsx             # Main landing
├── layout.tsx           # Meta, fonts, globals
└── globals.css          # Tailwind directives

components/
├── Hero.tsx             # Full-height, bold headline, CTA
├── Problem.tsx          # Why current solutions fail
├── Solution.tsx         # Orbit Labs offer overview
├── Process.tsx          # How it works (3-4 steps)
├── Offers.tsx           # Pack pricing / productized offers
├── Results.tsx          # Social proof / outputs showcase
├── FAQ.tsx              # Structured, clean, readable
├── CTA.tsx              # Final conversion block
├── Footer.tsx           # Links, legal, contact
└── ui/                  # Reusable atoms (Button, Badge, Card, Input)

public/
├── images/              # Brand assets, hero images
└── logos/               # Orbit Labs logo

tailwind.config.ts       # Custom colors, fonts, spacing tokens
```

---

## Anti-Generic Guardrails

### Colors
- ❌ Never use default Tailwind palette (indigo-500, blue-600, emerald-400)
- ✅ Use only the Orbit Labs brand palette
- ✅ Derive orange tints from `#FF5A1F` (e.g., `#FF7A47` lighter, `#CC4818` darker)
- ✅ Test contrast ratios (WCAG AA minimum: 4.5:1 for text)

### Typography
- ❌ Never use same font weight for headings and body
- ✅ Large headings: tight tracking, heavy weight, controlled size
- ✅ Body: regular weight, generous line-height

### Gradients
- ❌ Never use single-color flat gradients
- ✅ Layer radial + linear gradients for depth
- ✅ Example: `bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#0A0A0A]`

### Interactive States
- ❌ Never skip hover/focus/active states
- ✅ Every clickable element must have:
  - `hover` state (opacity or scale change)
  - `focus-visible` state (orange ring)
  - `active` state (pressed feel with `scale: 0.98`)

---

## Design Review Checklist

Before finalizing any frontend work:
- [ ] Compare against Orbit Labs artistic direction
- [ ] Verify consistency across all sections
- [ ] Typography harmony — heading scale uniform
- [ ] CTA hierarchy — clear at every fold
- [ ] Desktop vs mobile scaling — nothing bloated, nothing cramped
- [ ] Remove anything generic, bulky, or visually cheap

Internal check questions:
- Does this feel premium enough for a serious AI creative agency?
- Is it sharper and cleaner than a generic agency site?
- Does it match 8lab-level perceived seriousness, but more minimal and more design-led?
- Does orange feel intentional and restrained?

---

## Hard Rules (Non-Negotiable)

1. Do not generate generic agency design
2. Do not use default Tailwind colors directly
3. Do not use oversized headings or bulky UI
4. Do not add sections not explicitly requested
5. Do not drift from the Orbit Labs dark premium direction
6. Do not ignore the existing codebase and current design direction
7. Do not rebuild from scratch without first understanding what exists
8. Do not use flashy SaaS clichés
9. Do not use cheap gradients, default shadows, or noisy glow
10. Do not finalize after one pass if visual harmony is not there
11. Do not deploy to production without explicit user approval

---

---

## Infrastructure active

### MCP Server — n8n cloud (accès direct)
- **Instance** : `https://orbitlabs.app.n8n.cloud/`
- **Transport** : Streamable HTTP via `supergateway` (`/opt/homebrew/bin/npx -y supergateway`)
- **Auth** : Bearer JWT configuré dans `~/.claude/settings.json`
- **Outils disponibles** : lire/créer/modifier/activer workflows, historique exécutions, tester en live, credentials (IDs seulement)
- **Attention** : toute action MCP est réelle sur l'instance prod — appliquer les règles de sécurité sans exception
- **Si JWT expiré** : n8n cloud → Settings → API → MCP → Regenerate token → mettre à jour `~/.claude/settings.json`

### Skills n8n (7 installés dans `~/.claude/skills/`)
S'activent automatiquement selon le contexte — pas besoin de les appeler explicitement.

| Skill | Rôle |
|---|---|
| `n8n-mcp-tools-expert` | Guide MCP — priorité max pour toute recherche de node ou gestion workflow |
| `n8n-workflow-patterns` | 5 patterns prouvés : webhook, HTTP API, DB, AI agent, scheduled |
| `n8n-node-configuration` | Config nodes, dépendances entre propriétés |
| `n8n-expression-syntax` | Patterns `{{ }}`, variables `$json`/`$node`, pièges courants |
| `n8n-validation-expert` | Erreurs de validation, boucles auto-fix |
| `n8n-code-javascript` | JS dans Code nodes, `$helpers`, DateTime |
| `n8n-code-python` | Python dans Code nodes, limitations |

---

## Règles absolues (résumé)

1. **Jamais de modification directe sur un workflow `[PROD]`** — toujours dupliquer → `[DRAFT]` → tester → basculer
2. **Valider le plan avant toute écriture MCP** — écriture MCP = action réelle en prod
3. **Credentials** : jamais en clair dans les nœuds, toujours via le stockage chiffré n8n
4. **Actions irréversibles** (DELETE, OVERWRITE) : pause + confirmation explicite avant exécution
5. **Passage DRAFT → PROD** : validation explicite du propriétaire obligatoire

## Flux standard (nouveau workflow)

```
1. Décrire le besoin → skills s'activent
2. Recherche nodes via MCP (search_nodes, get_node)
3. Proposer structure + plan → ATTENDRE VALIDATION
4. Créer [DRAFT] via MCP (n8n_create_workflow)
5. Valider (n8n_validate_workflow, n8n_test_workflow)
6. Bascule [PROD] après validation explicite uniquement
```

## Naming conventions

- **Workflows** : `[STATUT] Domaine - Action - Version` (ex: `[DRAFT] Brief → Hooks - v3`)
- **Nœuds** : `TYPE: Description courte` (ex: `GENERATE: Claude - Hooks x5`)
- **Modèle Claude par défaut** : `claude-opus-4-6` (basculer sur `claude-haiku-4-5` pour tâches légères)

## Format de réponse attendu

**(a) Ce que j'ai compris** → **(b) Ce que je propose** → **(c) Ce que je change** → **(d) Comment tester** → **(e) Risques & rollback**
