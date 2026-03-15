'use client'

import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useEffect } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

function PriceCounter({ target, suffix = '€' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const count = useMotionValue(0)
  const spring = useSpring(count, { stiffness: 60, damping: 20 })
  const display = useTransform(spring, (v) => Math.round(v) + suffix)

  useEffect(() => {
    if (inView) count.set(target)
  }, [inView, count, target])

  return <motion.span ref={ref}>{display}</motion.span>
}

function CheckIcon() {
  return (
    <svg className="check-ico" viewBox="0 0 16 16" fill="none">
      <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

type PackData = {
  tag: string
  delivery: string
  title: string
  subtitle: string
  priceNum: number
  priceUnit: string
  perUnit: string
  badge?: string
  features: string[]
  cta: string
  ctaStyle: 'primary' | 'secondary' | 'white'
  featured?: boolean
  href: string
}

const packs: PackData[] = [
  {
    tag: 'Premier test',
    delivery: '72h',
    title: 'Pack 4',
    subtitle: 'Valide ton concept. Teste tes premiers angles sans risquer ton budget.',
    priceNum: 290,
    priceUnit: '/ 4 vidéos',
    perUnit: '≈ 72€/vidéo',
    features: [
      '4 créas hooks-first · 12 avatars au choix',
      'Script · angle · message optimisé conversion',
      'Montage multi-scènes + overlays + sous-titres',
      'MP4 prêts Meta & TikTok · livraison Drive',
      '1 round de retouches inclus',
    ],
    cta: 'Lancer mon premier test',
    ctaStyle: 'secondary',
    href: '#brief',
  },
  {
    tag: 'Hook Sprint',
    delivery: '48h',
    title: 'Pack 8',
    subtitle: 'Identifie tes winners rapidement. Plus d\'angles, moins cher par vidéo.',
    priceNum: 490,
    priceUnit: '/ 8 vidéos',
    perUnit: '≈ 61€/vidéo · meilleur ratio',
    badge: 'Populaire',
    features: [
      '8 créas · variations hooks + angles + messages',
      'Mix d\'avatars libre sur tout le pack',
      'Motion design léger pensé pub performance',
      'Drive organisé · MP4 prêts à lancer direct',
      'Idéal TOF/MOF · données claires à la sortie',
    ],
    cta: 'Identifier mes winners',
    ctaStyle: 'white',
    featured: true,
    href: '#brief',
  },
  {
    tag: 'Scaling',
    delivery: '24h',
    title: 'Pack 12',
    subtitle: 'Nourris ton compte pub en continu. Volume, diversité, vitesse max.',
    priceNum: 690,
    priceUnit: '/ 12 vidéos',
    perUnit: '≈ 57€/vidéo · prix le plus bas',
    features: [
      '12 créas · maximum d\'angles et hooks testés',
      'Rotation libre d\'avatars sur tout le batch',
      'Multi-scènes · overlays · variations de rythme',
      'Livraison 24h · Drive propre et organisé',
      'MOF/BOF/scaling · nourrit ton compte en continu',
    ],
    cta: 'Passer en mode scaling',
    ctaStyle: 'secondary',
    href: '#brief',
  },
]

export default function Packs() {
  return (
    <section className="orbit-packs" id="packs">
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
          <div className="pill">Pricing</div>
          <h2 className="heading">
            <span className="s-bright">57€/vidéo.</span>{' '}
            <span className="s-dim">Livré en</span>{' '}
            <span className="s-bright">24 à 72h.</span><br />
            <span className="s-dim">Pas de surprise, pas de contrat.</span>
          </h2>
          <p className="sub">
            Tu choisis ton volume selon ton objectif — testing, hook sprint ou scaling.
            Brief → prod → Drive. C&apos;est tout.
          </p>
        </motion.div>

        <div className="grid">
          {packs.map((pack, i) => (
            <motion.article
              key={i}
              className={`card ${pack.featured ? 'featured' : ''}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, ease: EASE, delay: i * 0.08 }}
            >
              <div className="inner">

                {/* Top row */}
                <div className="topline">
                  <div className="plan-tag">
                    <span className="dot" />
                    {pack.tag}
                  </div>
                  <div className="delivery-badge">⚡ {pack.delivery}</div>
                </div>

                {/* Title + badge */}
                <div className="title-row">
                  <h3 className="title">{pack.title}</h3>
                  {pack.badge && (
                    <span className="popular-badge">{pack.badge}</span>
                  )}
                </div>

                <p className="subtitle">{pack.subtitle}</p>

                {/* Price */}
                <div className="price-block">
                  <div className="price-row">
                    <span className="price"><PriceCounter target={pack.priceNum} /></span>
                    <span className="unit">{pack.priceUnit}</span>
                  </div>
                  <p className="per-unit">{pack.perUnit}</p>
                </div>

                {/* Separator */}
                <div className="sep" aria-hidden="true" />

                {/* Features */}
                <ul className="features">
                  {pack.features.map((f, j) => (
                    <li key={j} className="feat-item">
                      <CheckIcon />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="cta-wrap">
                  <a className={`btn btn-${pack.ctaStyle}`} href={pack.href}>
                    {pack.cta} →
                  </a>
                </div>

              </div>
            </motion.article>
          ))}
        </div>

        <motion.p
          className="note"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <strong>Pas de contrat. Pas d&apos;abonnement.</strong>{' '}
          Tu commandes au coup par coup ou en récurrent selon tes besoins.
          Paiement sécurisé · livraison Drive · 1 round de retouches inclus.
        </motion.p>
      </div>
    </section>
  )
}
