'use client'

import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useEffect } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

function Counter({ from, to, suffix = '' }: { from: number; to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const count = useMotionValue(from)
  const spring = useSpring(count, { stiffness: 75, damping: 22 })
  const display = useTransform(spring, (v) => Math.round(v) + suffix)

  useEffect(() => {
    if (inView) count.set(to)
  }, [inView, count, to])

  return <motion.span ref={ref}>{display}</motion.span>
}

function SparkGraph() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const LINE = 'M0 150 C90 155,120 90,190 110 C260 130,300 40,360 70 C430 105,470 60,520 45 C560 35,585 55,600 20'
  const AREA = LINE + ' L600 200 L0 200Z'

  return (
    <div ref={ref} className="spark" aria-hidden="true">
      <svg viewBox="0 0 600 200" fill="none" preserveAspectRatio="none">
        <line x1="0" y1="50"  x2="600" y2="50"  stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
        <line x1="0" y1="100" x2="600" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
        <line x1="0" y1="150" x2="600" y2="150" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>

        {/* Animated area fill */}
        <motion.path
          d={AREA}
          fill="rgba(255,90,31,0.07)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.0, delay: 0.8 }}
        />

        {/* Animated line draw */}
        <motion.path
          d={LINE}
          stroke="rgba(255,255,255,0.70)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{
            pathLength: { duration: 1.8, ease: 'easeOut', delay: 0.3 },
            opacity: { duration: 0.2, delay: 0.3 },
          }}
        />

        {/* Winner dot */}
        <motion.circle
          cx="360" cy="70" r="10"
          fill="rgba(255,90,31,0.22)"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        />
        <motion.circle
          cx="360" cy="70" r="5.5"
          fill="#FF5A1F"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.4, delay: 1.5, type: 'spring', stiffness: 220 }}
        />

        {/* Label */}
        <motion.text
          x="372" y="64"
          fill="rgba(255,255,255,0.68)"
          fontSize="11"
          fontFamily="system-ui, sans-serif"
          initial={{ opacity: 0, x: -6 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
          transition={{ duration: 0.4, delay: 1.9 }}
        >
          → scale ici
        </motion.text>
      </svg>
    </div>
  )
}

function AvatarGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div ref={ref} className="avatar-grid" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="av-dot"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.32, delay: 0.05 + i * 0.055, type: 'spring', stiffness: 280 }}
        />
      ))}
    </motion.div>
  )
}

const CARDS = [
  {
    kicker: 'Rendu pub-ready',
    h: 'Crédible en feed. Pas "IA cheap".',
    p: 'Hooks propres, rythme, cuts, overlays lisibles mobile. Le rendu passe les reviews Meta sans friction.',
  },
  {
    kicker: '2× moins cher',
    counter: true,
    h: <><Counter from={0} to={57} />€/vidéo vs 500–2000€ en agence.</>,
    p: 'Tu testes 12 angles pour le prix d\'une seule créa humaine. Tu scales sur les winners, pas des intuitions.',
  },
  {
    kicker: 'Zéro logistique',
    h: 'Pas de produit à envoyer. Pas de créateur à relancer.',
    p: 'Brief → prod → Drive. Même sans stock, en dropshipping. Tu commandes, on livre.',
  },
  {
    kicker: '12 avatars inclus',
    h: 'L\'avatar qui colle à ta cible.',
    p: 'Homme, femme, âge, style — 12 profils IA calibrés pour ton marché.',
    avatar: true,
  },
]

export default function Why() {
  return (
    <section className="orbit-why3" id="why-orbit">
      <div className="fade" aria-hidden="true" />
      <div className="orbit-tlines" aria-hidden="true">
        <span className="orbit-tl v l"/><span className="orbit-tl v r"/>
        <span className="orbit-tl h t"/><span className="orbit-tl h b"/>
      </div>

      <div className="wrap">

        {/* Header */}
        <motion.div
          className="head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <div className="pill"><span className="dot" />La solution</div>
          <h2 className="heading">
            <span className="s-bright">Teste 10× plus vite.</span><br />
            <span className="s-dim">Dépense sur ce qui</span>{' '}
            <span className="s-bright">convertit déjà.</span>
          </h2>
          <p className="sub">
            Orbit Labs te donne la vitesse de l&apos;IA avec la crédibilité UGC.
            Tu valides tes angles avant d&apos;investir sur l&apos;humain.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid">

          {/* BIG CARD — Vitesse + animated spark */}
          <motion.div
            className="card big"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <div className="kicker"><span className="dot" />Vitesse · 10× plus vite qu&apos;une agence</div>
            <h3 className="h">
              Ton agence attend encore la réponse du créateur.<br />
              Toi, tu as déjà ton premier winner.
            </h3>
            <p className="p">
              Variations de hooks, angles, messages — produits en batch.
              Tu identifies ce qui convertit avant d&apos;investir un seul euro sur du contenu humain.
            </p>
            <SparkGraph />
          </motion.div>

          {/* Small cards */}
          {CARDS.map((card, i) => (
            <motion.div
              key={i}
              className="card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, ease: EASE, delay: (i % 2) * 0.1 + 0.05 }}
            >
              <div className="kicker"><span className="dot" />{card.kicker}</div>
              <h3 className="h">{card.h}</h3>
              <p className="p">{card.p}</p>
              {card.avatar && <AvatarGrid />}
            </motion.div>
          ))}

          {/* WIDE CARD — Delivery times */}
          <motion.div
            className="card wide"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
          >
            <div className="kicker"><span className="dot" />Livraison garantie</div>
            <h3 className="h">24h à 72h. Sans surprise, sans attente.</h3>
            <div className="stat-row">
              <div className="stat-item">
                <span className="stat-num"><Counter from={0} to={24} suffix="h" /></span>
                <span className="stat-lbl">Pack 12 vidéos</span>
              </div>
              <div className="stat-sep" aria-hidden="true" />
              <div className="stat-item">
                <span className="stat-num"><Counter from={0} to={48} suffix="h" /></span>
                <span className="stat-lbl">Pack 8 vidéos</span>
              </div>
              <div className="stat-sep" aria-hidden="true" />
              <div className="stat-item">
                <span className="stat-num"><Counter from={0} to={72} suffix="h" /></span>
                <span className="stat-lbl">Pack 4 vidéos</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
