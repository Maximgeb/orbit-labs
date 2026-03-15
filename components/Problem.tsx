'use client'

import Reveal from './Reveal'

const problems = [
  {
    kicker: 'Délai',
    title: '3 à 6 semaines d\'attente.',
    desc: 'Casting, contrats, envoi produit, tournage, montage, validation… Pendant ce temps, ton concurrent a déjà testé 15 angles et trouvé ses winners.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 7v5l3 3"/>
      </svg>
    ),
  },
  {
    kicker: 'Budget',
    title: '500€ à 2000€ par créa — avant de savoir si ça marche.',
    desc: 'Tu brûles ton budget sur des angles non testés. Résultat : 2-3 créas max, pas de données, pas de winner identifié.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    kicker: 'Logistique',
    title: '16h par semaine à gérer des créateurs. Pour rien.',
    desc: 'Relances, envois produit, ghosting, retouches infinies. Les marketers perdent en moyenne 16h/semaine à coordonner des créateurs. C\'est 16h à ne pas scaler.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 12h18M3 6h18M3 18h12"/>
      </svg>
    ),
  },
  {
    kicker: 'Volume',
    title: '1 créateur = 1 angle. Pas 10.',
    desc: 'Pour tester 8 hooks, il faut 8 créateurs, 8 contrats, 8× le délai. L\'apprentissage est trop lent pour un compte pub performant.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    ),
  },
]

export default function Problem() {
  return (
    <section className="orbit-problem" id="problem">
      <div className="fade" aria-hidden="true" />
      <div className="orbit-tlines" aria-hidden="true">
        <span className="orbit-tl v l"/><span className="orbit-tl v r"/>
        <span className="orbit-tl h t"/><span className="orbit-tl h b"/>
      </div>

      <div className="wrap">
        <Reveal className="head">
          <div className="pill">
            <span className="dot" />
            Le problème
          </div>
          <h2>
            <span className="s-bright">L&apos;UGC humain</span>{' '}
            <span className="s-dim">est trop lent,</span><br />
            <span className="s-dim">trop cher,</span>{' '}
            <span className="s-bright">et trop risqué</span>{' '}
            <span className="s-dim">pour tester.</span>
          </h2>
          <p className="sub">
            Tu passes plus de temps à gérer des créateurs qu&apos;à analyser des résultats.
            Pendant ce temps, ton concurrent itère. Et toi, tu attends.
          </p>
        </Reveal>

        <div className="problem-grid">
          {problems.map((p, i) => (
            <Reveal className="problem-card" key={i} delay={i * 0.08}>
              <div className="problem-icon">{p.icon}</div>
              <div className="problem-body">
                <div className="kicker"><span className="dot" />{p.kicker}</div>
                <h3 className="problem-title">{p.title}</h3>
                <p className="problem-desc">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Transition line toward Why */}
        <div className="problem-bottom">
          <div className="problem-arrow" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,90,31,0.6)" strokeWidth="2">
              <path d="M12 5v14"/><path d="M7 15l5 5 5-5"/>
            </svg>
          </div>
          <p className="problem-cta-text">
            Il y a une façon de tester 10× plus vite, 2× moins cher.
          </p>
        </div>
      </div>
    </section>
  )
}
