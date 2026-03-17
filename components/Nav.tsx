'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '#problem', label: 'Pourquoi' },
  { href: '#process', label: 'Process' },
  { href: '#packs', label: 'Packs' },
  { href: '#faq', label: 'FAQ' },
]

const EASE = [0.22, 1, 0.36, 1] as const

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change / resize
  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  const closeMenu = () => setOpen(false)

  return (
    <>
      <nav className={`orbit-nav ${scrolled ? 'scrolled' : ''}`}>
        <Link href="/" className="logo" onClick={closeMenu}>
          <Image
            src="/logos/logo-header.png"
            alt="Orbit Labs"
            width={130}
            height={26}
            priority
          />
        </Link>

        <div className="links">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
        </div>

        <div className="nav-right">
          <div className="nav-status">
            <span className="nav-status-dot" aria-hidden="true" />
            <span className="nav-status-text">Livraison ouverte</span>
          </div>
          <Link href="#packs" className="cta-nav" onClick={closeMenu}>
            Démarrer
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>
            </svg>
          </Link>

          {/* Hamburger — mobile only */}
          <button
            className={`nav-burger ${open ? 'open' : ''}`}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              aria-hidden="true"
            />

            {/* Slide-down panel */}
            <motion.div
              className="nav-mobile-panel"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <nav className="nav-mobile-links">
                {links.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, ease: EASE }}
                  >
                    <Link
                      href={l.href}
                      className="nav-mobile-link"
                      onClick={closeMenu}
                    >
                      {l.label}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>
                      </svg>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="nav-mobile-cta">
                <Link href="#packs" className="nav-mobile-btn" onClick={closeMenu}>
                  <span className="nav-status-dot" style={{ width: 7, height: 7 }} />
                  Démarrer maintenant
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
