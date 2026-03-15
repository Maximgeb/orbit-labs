'use client'

import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="orbit-footer">
      <div className="wrap">
        <div className="logo">
          <Image
            src="/logos/logo-header.png"
            alt="Orbit Labs"
            width={120}
            height={24}
          />
        </div>

        <nav className="links" aria-label="Footer navigation">
          <a href="#process">Process</a>
          <a href="#system">Système</a>
          <a href="#packs">Packs</a>
          <a href="#faq">FAQ</a>
          <a href="mailto:hello@orbitlabs.co">Contact</a>
        </nav>

        <p className="copy">
          © {new Date().getFullYear()} Orbit Labs. Tous droits réservés.{' '}
          Produit par <span>Orbit Labs</span>.
        </p>
      </div>
    </footer>
  )
}
