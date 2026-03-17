'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Orbit Labs — Animated Hero Headline
 * Rotating benefit words in the H1, adapted to the existing .oh-h1 design system.
 * Drop-in replacement for the static <h1> in Hero.tsx
 */
export function AnimatedHeroHeadline() {
  const [idx, setIdx] = useState(0)

  const benefits = useMemo(() => [
    '72h',
    '57€/vidéo',
    'zéro logistique',
    'hooks-first',
    '10× plus vite',
  ], [])

  useEffect(() => {
    const id = setTimeout(() => {
      setIdx((prev) => (prev + 1) % benefits.length)
    }, 2200)
    return () => clearTimeout(id)
  }, [idx, benefits])

  return (
    <motion.h1
      className="oh-h1"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
    >
      {/* Line 1 — static contrast hook */}
      <span className="oh-dim">Ton agence UGC :</span>{' '}
      <span className="oh-bright">3 semaines.</span>
      <br />

      {/* Line 2 — rotating animated benefit */}
      <span className="oh-dim">Orbit Labs :</span>{' '}
      <span className="oh-h1-rotate-wrap" aria-live="polite">
        {benefits.map((word, i) => (
          <motion.span
            key={i}
            className="oh-h1-rotate-word oh-bright"
            initial={false}
            animate={
              idx === i
                ? { y: 0, opacity: 1 }
                : { y: idx > i ? -56 : 56, opacity: 0 }
            }
            transition={{ type: 'spring', stiffness: 55, damping: 16 }}
            aria-hidden={idx !== i}
          >
            {word}
          </motion.span>
        ))}
      </span>
      <br />

      {/* Line 3 — closing punch */}
      <span className="oh-dim">Pour</span>{' '}
      <span className="oh-bright">2× moins cher.</span>
    </motion.h1>
  )
}
