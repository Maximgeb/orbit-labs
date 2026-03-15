'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

const testimonials = [
  {
    name: 'Thomas R.',
    role: 'E-com owner · Skincare',
    initials: 'TR',
    color: '#FF5A1F',
    quote: "J'ai reçu 8 vidéos en 36h. J'ai cru qu'il y avait une erreur. Non. C'était juste livré. Les créas tournent depuis 3 semaines, mon ROAS a pris +0.4 sur le meilleur angle.",
    stars: 5,
  },
  {
    name: 'Léa M.',
    role: 'Media Buyer · Agence',
    initials: 'LM',
    color: '#7C5CFC',
    quote: "Avant je passais 2 semaines à briéfer des créateurs, relancer, attendre. Là j'envoie un brief le lundi, j'ai les MP4 le mercredi. Aucune logistique. Aucune excuse. Ça change tout.",
    stars: 5,
  },
  {
    name: 'Karim B.',
    role: 'Fondateur · Compléments alimentaires',
    initials: 'KB',
    color: '#00C9A7',
    quote: "J'avais payé 380€ pour 4 UGC le mois dernier. Qualité moyenne, délai 10 jours, 2 allers-retours. Là j'ai eu 8 créas pour 490€ en 48h. Je suis passé directement au Pack 12.",
    stars: 5,
  },
  {
    name: 'Sarah T.',
    role: 'Growth · D2C Fashion',
    initials: 'ST',
    color: '#FF5A1F',
    quote: "Ce qui m'a convaincu c'est la variation d'angles. Sur les 8 vidéos, 3 hooks complètement différents. J'ai pu tester en 1 semaine ce qui m'aurait pris un mois avec des vrais créateurs.",
    stars: 5,
  },
  {
    name: 'Nicolas F.',
    role: 'Dropshipper · Home & Deco',
    initials: 'NF',
    color: '#7C5CFC',
    quote: "J'étais sceptique sur les avatars IA. Premier test → 1.8% CTR. Deuxième batch → 2.3%. Je scalais déjà dessus avant même de recevoir la confirmation de livraison.",
    stars: 5,
  },
  {
    name: 'Julie H.',
    role: 'E-com owner · Accessoires',
    initials: 'JH',
    color: '#00C9A7',
    quote: "Drive organisé, MP4 prêts à upload, sous-titres inclus. J'ai literalement tout balancé dans Meta Ads Manager en 20 minutes. Zéro retouche. C'est ça le vrai gain de temps.",
    stars: 5,
  },
]

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#FF5A1F">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  )
}

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const CARD_W = 320
  const GAP = 16

  const scrollTo = (idx: number) => {
    const el = trackRef.current
    if (!el) return
    const clamped = Math.max(0, Math.min(idx, testimonials.length - 1))
    el.scrollTo({ left: clamped * (CARD_W + GAP), behavior: 'smooth' })
    setActiveIdx(clamped)
  }

  const onScroll = () => {
    const el = trackRef.current
    if (!el) return
    const idx = Math.round(el.scrollLeft / (CARD_W + GAP))
    setActiveIdx(idx)
    setCanPrev(el.scrollLeft > 8)
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
  }

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="orbit-testimonials">
      <div className="fade" aria-hidden="true" />

      <div className="wrap">
        {/* Header */}
        <motion.div
          className="head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <div className="pill">
            <span className="dot" />
            Ils ont testé
          </div>
          <h2 className="heading">
            <span className="s-bright">Ce qu&apos;ils disent</span><br />
            <span className="s-dim">après leur première commande.</span>
          </h2>
          <p className="sub">
            Pas de témoignage générique. Des retours de media buyers et e-com owners qui ont lancé, testé, et scalé.
          </p>
        </motion.div>

        {/* Slider */}
        <div className="testi-outer">
          <div className="testi-track" ref={trackRef}>
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="testi-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, ease: EASE, delay: Math.min(i * 0.06, 0.24) }}
              >
                {/* Stars */}
                <div className="testi-stars">
                  {Array.from({ length: t.stars }).map((_, s) => <StarIcon key={s} />)}
                </div>

                {/* Quote */}
                <p className="testi-quote">&ldquo;{t.quote}&rdquo;</p>

                {/* Author */}
                <div className="testi-author">
                  <div className="testi-avatar" style={{ background: t.color + '22', borderColor: t.color + '44' }}>
                    <span style={{ color: t.color }}>{t.initials}</span>
                  </div>
                  <div className="testi-meta">
                    <span className="testi-name">{t.name}</span>
                    <span className="testi-role">{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Arrows */}
          <button
            className={`testi-arrow testi-arrow--prev ${!canPrev ? 'disabled' : ''}`}
            onClick={() => scrollTo(activeIdx - 1)}
            aria-label="Précédent"
            disabled={!canPrev}
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 5l-5 5 5 5"/>
            </svg>
          </button>
          <button
            className={`testi-arrow testi-arrow--next ${!canNext ? 'disabled' : ''}`}
            onClick={() => scrollTo(activeIdx + 1)}
            aria-label="Suivant"
            disabled={!canNext}
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M8 5l5 5-5 5"/>
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="testi-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`testi-dot ${i === activeIdx ? 'active' : ''}`}
              onClick={() => scrollTo(i)}
              aria-label={`Avis ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
