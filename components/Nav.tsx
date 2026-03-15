'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`orbit-nav ${scrolled ? 'scrolled' : ''}`}>
      <Link href="/" className="logo">
        <Image
          src="/logos/logo-header.png"
          alt="Orbit Labs"
          width={130}
          height={26}
          priority
        />
      </Link>

      <div className="links">
        <Link href="#problem">Pourquoi</Link>
        <Link href="#process">Process</Link>
        <Link href="#packs">Packs</Link>
        <Link href="#faq">FAQ</Link>
      </div>

      <div className="nav-right">
        <div className="nav-status">
          <span className="nav-status-dot" aria-hidden="true" />
          <span className="nav-status-text">Livraison ouverte</span>
        </div>
        <Link href="#packs" className="cta-nav">
          Démarrer
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>
          </svg>
        </Link>
      </div>
    </nav>
  )
}
