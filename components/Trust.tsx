'use client'

import Reveal from './Reveal'

const signals = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Process cadré',
    desc: 'Brief → prod → review → livraison. Aucune case oubliée.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 7v5l3 3"/>
      </svg>
    ),
    title: 'Délai garanti',
    desc: 'Pack 12 → 24h · Pack 8 → 48h · Pack 4 → 72h. Chrono dès le brief validé.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="1.8">
        <path d="M20 7l-8 10-4-4"/>
      </svg>
    ),
    title: '1 round de retouches',
    desc: 'Si quelque chose bloque le test, on ajuste. Inclus dans tous les packs.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="1.8">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>
      </svg>
    ),
    title: 'Livraison Drive',
    desc: 'MP4 organisés par vidéo. Prêts à uploader directement sur ton compte pub.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="1.8">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <path d="M9 22V12h6v10"/>
      </svg>
    ),
    title: 'Zéro logistique',
    desc: 'Pas de produit à envoyer. Pas de casting. Pas d\'attente. Tu commandes, on produit.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="1.8">
        <path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-6"/>
      </svg>
    ),
    title: 'Pensé pour le testing',
    desc: 'Hooks variés, angles multiples. Tu valides vite, tu scales sur les winners.',
  },
]

export default function Trust() {
  return (
    <section className="orbit-trust" id="trust">
      <div className="fade" aria-hidden="true" />
      <div className="orbit-tlines" aria-hidden="true">
        <span className="orbit-tl v l"/><span className="orbit-tl v r"/>
        <span className="orbit-tl h t"/><span className="orbit-tl h b"/>
      </div>

      <div className="wrap">
        <Reveal className="head">
          <div className="pill">
            <span className="dot" />
            Garanti
          </div>
          <h2 className="heading">
            <span className="s-bright">Tu sais exactement</span><br />
            <span className="s-dim">ce que tu reçois. Et quand.</span>
          </h2>
          <p className="sub">
            Pas de surprise. Pas de relance. Pas de ping-pong.
            Process cadré, délai garanti, livraison Drive propre.
          </p>
        </Reveal>

        <div className="trust-grid">
          {signals.map((s, i) => (
            <Reveal className="trust-card" key={i} delay={i * 0.07}>
              <div className="trust-icon">{s.icon}</div>
              <h3 className="trust-title">{s.title}</h3>
              <p className="trust-desc">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
