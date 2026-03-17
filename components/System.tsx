'use client'

import { motion } from 'framer-motion'
import GlowCard from './ui/GlowCard'

const EASE = [0.22, 1, 0.36, 1] as const

const pillars = [
  {
    step: '01',
    kicker: 'Hook-first',
    title: 'On construit l\'accroche avant tout.',
    p: 'Le hook = 70% du résultat. Chaque vidéo démarre pour stopper le scroll, créer l\'intérêt, puis amener le clic / l\'action.',
  },
  {
    step: '02',
    kicker: 'Angles + copy',
    title: 'Scripts qui vendent.',
    p: 'Douleurs, objections, verbatim : on transforme ça en scripts + overlays lisibles, conversion-first.',
  },
  {
    step: '03',
    kicker: 'Multi-scènes',
    title: 'Rythme + cuts.',
    p: 'On évite le rendu IA statique : scènes, transitions, montage dynamique pour un rendu UGC crédible.',
  },
  {
    step: '04',
    kicker: 'Batch testable',
    title: 'Variations prêtes à itérer.',
    p: 'Plusieurs hooks + variations d\'angles. Tu testes vite, tu gardes les winners, tu scales proprement.',
  },
]

export default function System() {
  return (
    <section className="orbit-system" id="system">
      <div className="fade" aria-hidden="true" />
      <div className="orbit-tlines" aria-hidden="true">
        <span className="orbit-tl v l"/><span className="orbit-tl v r"/>
        <span className="orbit-tl h t"/><span className="orbit-tl h b"/>
      </div>

      <div className="wrap">

        <motion.div
          className="head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <h2 className="heading">
            <span className="s-dim">Pas de la génération IA.</span>{' '}
            <span className="s-bright">Un système de testing.</span>
          </h2>
          <p className="sub">
            Chaque créa est construite pour apprendre : hook, angle, message, rythme.
            Tu sors avec des données — pas juste des vidéos.
          </p>
        </motion.div>

        <div className="frame">
          <div className="sys-grid">
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, ease: EASE, delay: i * 0.09 }}
              >
                <GlowCard className="sys-card">
                  <div className="sys-step-num" aria-hidden="true">{p.step}</div>
                  <div className="sys-body">
                    <div className="kicker"><span className="dot" />{p.kicker}</div>
                    <h3 className="title">{p.title}</h3>
                    <p className="p">{p.p}</p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
