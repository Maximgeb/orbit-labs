'use client'

import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

const guarantees = [
  {
    label: 'Paiement sécurisé',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 1.5L2.5 5v5c0 4.14 3.2 8.02 7.5 9 4.3-.98 7.5-4.86 7.5-9V5L10 1.5z"/>
        <path d="M7 10l2 2 4-4"/>
      </svg>
    ),
  },
  {
    label: 'Livraison 24–72h',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="7.5"/>
        <path d="M10 5.5v4.5l3 2"/>
      </svg>
    ),
  },
  {
    label: '1 retouche incluse',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10a7 7 0 1 0 7-7A7 7 0 0 0 3.5 5"/>
        <path d="M3 3v4h4"/>
      </svg>
    ),
  },
  {
    label: 'Sans engagement',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 15L15 5M5 5l10 10"/>
        <rect x="1.5" y="1.5" width="17" height="17" rx="4"/>
      </svg>
    ),
  },
]

export default function CTAFinal() {
  return (
    <section className="orbit-cta" id="order">
      <div className="cta-glow" aria-hidden="true" />
      <div className="orbit-tlines" aria-hidden="true">
        <span className="orbit-tl v l"/><span className="orbit-tl v r"/>
        <span className="orbit-tl h t"/><span className="orbit-tl h b"/>
      </div>

      <div className="cta-wrap">

        {/* Urgency badge */}
        <motion.div
          className="cta-urgency"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span className="urgency-dot" aria-hidden="true" />
          Livraisons ouvertes cette semaine
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="cta-h2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.05 }}
        >
          <span className="s-dim">Pendant que tu lis ça,</span><br />
          <span className="s-bright">ton concurrent teste.</span>
        </motion.h2>

        <motion.p
          className="cta-sub"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
        >
          Brief en 2 minutes. MP4 hooks-first livrés en 24 à 72h.
          Zéro logistique. Zéro contrat. Tu testes — tu scales sur les winners.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="cta-btns"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
        >
          <a className="cta-btn-primary" href="#packs">
            <span className="cta-btn-dot" aria-hidden="true" />
            Démarrer maintenant
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
              <path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>
            </svg>
          </a>
          <a className="cta-btn-ghost" href="#examples">
            Voir des exemples
          </a>
        </motion.div>

        {/* Guarantee bar — SVG icons, no emojis */}
        <motion.div
          className="cta-guarantees"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.28 }}
        >
          {guarantees.map((g, i) => (
            <div className="cta-guarantee" key={i}>
              <span className="cta-g-icon" aria-hidden="true">{g.icon}</span>
              <span className="cta-g-label">{g.label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
