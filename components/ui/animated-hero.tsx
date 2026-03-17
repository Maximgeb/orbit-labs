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
    'qui convertissent.',
    'livrées en 72h.',
    'hooks-first.',
    'prêtes à scaler.',
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
      {/* Line 1 — what it is, instantly */}
      <span className="oh-bright">Des créas UGC IA</span>
      <br />

      {/* Line 2 — rotating qualitative benefit */}
      <span className="oh-h1-rotate-wrap" aria-live="polite">
        {benefits.map((word, i) => (
          <motion.span
            key={i}
            className="oh-h1-rotate-word oh-dim"
            initial={false}
            animate={
              idx === i
                ? { y: 0, opacity: 1 }
                : { y: idx > i ? -48 : 48, opacity: 0 }
            }
            transition={{ type: 'spring', stiffness: 60, damping: 18 }}
            aria-hidden={idx !== i}
          >
            {word}
          </motion.span>
        ))}
      </span>
    </motion.h1>
  )
}
