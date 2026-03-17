'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { AnimatedHeroHeadline } from './ui/animated-hero'

const EASE = [0.22, 1, 0.36, 1] as const

const avatars = [
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=60',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=60',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=80&q=60',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=80&q=60',
]

function HeroVisual() {
  return (
    <motion.div
      className="oh-visual-wrap"
      initial={{ opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
    >
      {/* Glow behind card */}
      <div className="oh-visual-glow" aria-hidden="true" />

      {/* Delivery card */}
      <motion.div
        className="oh-visual-card"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Top bar: status */}
        <div className="oh-vc-top">
          <span className="oh-vc-status">
            <span className="oh-vc-status-dot" />
            Livré
          </span>
          <span className="oh-vc-time">48h</span>
        </div>

        {/* Phone + video preview */}
        <div className="oh-vc-phone">
          <div className="oh-vc-screen">
            {/* Video gradient placeholder */}
            <div className="oh-vc-video">
              <div className="oh-vc-video-bg" />
              {/* Play button */}
              <div className="oh-vc-play" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                  <path d="M8 5.14v14l11-7-11-7z"/>
                </svg>
              </div>
              {/* UGC label overlay */}
              <div className="oh-vc-label">UGC #04</div>
            </div>
          </div>
          {/* Phone notch */}
          <div className="oh-vc-notch" aria-hidden="true" />
        </div>

        {/* Meta row */}
        <div className="oh-vc-meta">
          <div className="oh-vc-pack">Hook Sprint · 8 vidéos</div>
          <div className="oh-vc-count">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13">
              <rect x="2" y="6" width="14" height="12" rx="2"/><path d="M22 8.5l-4 3 4 3V8.5z"/>
            </svg>
            MP4 prêts pub
          </div>
        </div>

        {/* Bottom: watermark */}
        <div className="oh-vc-footer">
          <span className="oh-vc-brand">Orbit Labs</span>
          <span className="oh-vc-check">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            Meta & TikTok ready
          </span>
        </div>
      </motion.div>

      {/* Floating badge — top right */}
      <motion.div
        className="oh-visual-badge"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.65 }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="14" height="14">
          <path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="10"/>
        </svg>
        Brief → MP4 en 72h
      </motion.div>

      {/* Floating badge — bottom left */}
      <motion.div
        className="oh-visual-badge oh-visual-badge--br"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.80 }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="2.2" width="14" height="14">
          <path d="M12 17.3l-6.18 3.6 1.64-7.03L2 9.24l7.19-.62L12 2l2.81 6.62 7.19.62-5.46 4.63 1.64 7.03z" fill="#FF5A1F" stroke="none"/>
        </svg>
        <span style={{ color: '#FF5A1F', fontWeight: 700 }}>+200</span> e-commerçants
      </motion.div>
    </motion.div>
  )
}

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    label: 'Brief 2 min · zéro logistique',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <rect x="2" y="6" width="14" height="12" rx="2"/><path d="M22 8.5l-4 3 4 3V8.5z"/>
      </svg>
    ),
    label: 'Multi-scènes + overlays',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
      </svg>
    ),
    label: 'Hooks variés · angles testés',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
    label: 'Livraison 24–72h garantie',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
      </svg>
    ),
    label: '1 round retouches inclus',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <rect x="7" y="2" width="10" height="20" rx="3"/><circle cx="12" cy="18" r="1" fill="currentColor"/>
      </svg>
    ),
    label: '9:16 natif · Meta & TikTok ready',
  },
]

export default function Hero() {
  return (
    <section className="oh" id="top">
      <div className="oh-bg" aria-hidden="true" />

      {/* Aurora — animated ambient glow orbs */}
      <div className="oh-aurora" aria-hidden="true">
        <div className="oh-aurora-orb oh-aurora-orb--1" />
        <div className="oh-aurora-orb oh-aurora-orb--2" />
        <div className="oh-aurora-orb oh-aurora-orb--3" />
      </div>

      {/* Tech lines — primary structural element, in foreground */}
      <div className="orbit-tlines oh-tlines" aria-hidden="true">
        <span className="orbit-tl v l"/><span className="orbit-tl v r"/>
        <span className="orbit-tl h t"/><span className="orbit-tl h b"/>
      </div>

      <div className="oh-split">
      <div className="oh-wrap">

        {/* Badge */}
        <motion.div
          className="oh-badge"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span className="oh-badge-dot" aria-hidden="true" />
          UGC IA prêts pub · dès 57€/vidéo · livraison 24–72h
        </motion.div>

        {/* H1 — animated rotating benefit word */}
        <AnimatedHeroHeadline />

        {/* Sub */}
        <motion.p
          className="oh-sub"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.18 }}
        >
          Brief en 2 min · MP4 prêts <strong>Meta &amp; TikTok</strong> · Livraison Drive.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="oh-cta-wrap"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.26 }}
        >
          <a className="oh-cta" href="#packs">
            <span className="oh-cta-dot" aria-hidden="true" />
            Voir les packs
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>
            </svg>
          </a>
          <a className="oh-ghost" href="#process">
            Comment ça marche
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.div
          className="oh-proof"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.38 }}
        >
          <div className="oh-avatars">
            {avatars.map((src, i) => (
              <span className="oh-av" key={i}>
                <Image src={src} alt="" width={32} height={32} />
              </span>
            ))}
          </div>
          <div className="oh-stars" aria-label="5 étoiles">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="14" height="14" viewBox="0 0 24 24">
                <path d="M12 17.3l-6.18 3.6 1.64-7.03L2 9.24l7.19-.62L12 2l2.81 6.62 7.19.62-5.46 4.63 1.64 7.03z"
                  fill="#FF5A1F"/>
              </svg>
            ))}
          </div>
          <span className="oh-proof-text">
            <strong>+200</strong> e-commerçants ont déjà testé
          </span>
        </motion.div>

      </div>

        {/* Visual — desktop right column */}
        <div className="oh-right">
          <HeroVisual />
        </div>
      </div>{/* /oh-split */}

      {/* Feature grid */}
      <div className="oh-feats">
        <div className="oh-feats-inner">
          {features.map((f, i) => (
            <motion.div
              className="oh-feat"
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE, delay: 0.42 + i * 0.06 }}
            >
              <span className="oh-feat-icon">{f.icon}</span>
              <span>{f.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
