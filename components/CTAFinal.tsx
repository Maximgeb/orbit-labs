'use client'

import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

const guarantees = [
  { icon: '🔒', label: 'Paiement sécurisé' },
  { icon: '⚡', label: 'Livraison 24–72h' },
  { icon: '↩️', label: '1 retouche incluse' },
  { icon: '🚫', label: 'Sans engagement' },
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

        {/* Guarantee bar */}
        <motion.div
          className="cta-guarantees"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.28 }}
        >
          {guarantees.map((g, i) => (
            <div className="cta-guarantee" key={i}>
              <span className="cta-g-icon">{g.icon}</span>
              <span className="cta-g-label">{g.label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
