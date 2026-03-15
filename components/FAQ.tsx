'use client'

import { useState } from 'react'
import Reveal from './Reveal'

const faqs = [
  {
    q: 'C\'est vraiment 2× moins cher qu\'une agence UGC ?',
    a: (
      <>
        <p>
          Une agence UGC classique facture <span className="strong">500€ à 2000€</span> par créa,
          sans compter les délais de 3 à 6 semaines.
        </p>
        <p>
          Chez Orbit : <span className="strong">72€/vidéo</span> (Pack 4) à <span className="strong">57€/vidéo</span> (Pack 12).
          Livraison en 24 à 72h. Pas de contrat.
        </p>
        <p>
          Inclus dans tous les packs : script (hook + angle), montage multi-scènes + overlays, MP4 prêts pub, 1 round de retouches.
        </p>
      </>
    ),
    defaultOpen: true,
  },
  {
    q: 'Quelle différence avec Arcads ou d\'autres outils IA DIY ?',
    a: (
      <>
        <p>
          Avec Arcads ou des outils similaires : tu génères une vidéo brute, puis tu dois encore{' '}
          <span className="strong">scripter, monter, ajouter des overlays, gérer les sous-titres, optimiser pour le feed.</span>{' '}
          Script dans l&apos;outil A, avatar dans l&apos;outil B, montage dans l&apos;outil C. C&apos;est un vrai métier.
        </p>
        <p>
          Orbit : tu remplis le brief, on s&apos;occupe de tout. Scripts hooks-first rédigés, montage dynamique,
          overlays et sous-titres inclus. Tu reçois des MP4 <span className="strong">prêts à uploader</span> — zéro workflow de montage.
        </p>
      </>
    ),
  },
  {
    q: 'Ça passe vraiment en pub ? Pas de rendu "IA cheap" ?',
    a: (
      <>
        <p>
          On ne fait pas de la génération IA basique. On produit des créas <span className="strong">testables en pub</span> :
          hook propre, rythme, cuts dynamiques, overlays lisibles sur mobile.
        </p>
        <p>
          L&apos;objectif : valider tes angles rapidement — puis investir sur du contenu humain
          seulement quand c&apos;est prouvé gagnant.
        </p>
      </>
    ),
  },
  {
    q: 'Je dois envoyer mon produit / avoir du stock ?',
    a: (
      <>
        <p><span className="strong">Non.</span> Zéro logistique. Tu peux lancer même en dropshipping, même sans stock.</p>
        <p>Si tu as des assets ou du B-roll, on les intègre. Sinon, on produit 100% IA.</p>
      </>
    ),
  },
  {
    q: 'Quels sont les délais exacts ?',
    a: (
      <>
        <p>Livraison garantie selon pack :</p>
        <p>
          <span className="strong">Pack 4 : 72h</span> ·{' '}
          <span className="strong">Pack 8 : 48h</span> ·{' '}
          <span className="strong">Pack 12 : 24h</span>.
        </p>
        <p>Le chrono démarre dès que ton brief est validé.</p>
      </>
    ),
  },
  {
    q: 'Je peux mixer les avatars sur un même pack ?',
    a: (
      <>
        <p>
          Oui. Tu choisis librement parmi <span className="strong">12 avatars</span> et tu peux en mixer
          plusieurs sur le même pack, y compris dans un Pack 4.
        </p>
        <p>C&apos;est fait pour tester &quot;quel avatar convertit&quot; en même temps que ton angle.</p>
      </>
    ),
  },
  {
    q: 'Est-ce que ça remplace complètement l\'UGC humain ?',
    a: (
      <>
        <p>
          Non — et c&apos;est voulu. Orbit Labs est un <span className="strong">outil de testing</span>, pas un remplacement.
        </p>
        <p>
          Le bon workflow : utilise Orbit pour valider tes angles, tes hooks et tes messages à faible coût.
          Quand tu as un winner prouvé, <span className="strong">alors</span> tu investis sur du contenu humain pour scaler.
          Tu évites de brûler 2000€ sur une créa qui ne convertit pas.
        </p>
      </>
    ),
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section className="orbit-faq" id="faq">
      <div className="fade" aria-hidden="true" />
      <div className="orbit-tlines" aria-hidden="true">
        <span className="orbit-tl v l"/><span className="orbit-tl v r"/>
        <span className="orbit-tl h t"/><span className="orbit-tl h b"/>
      </div>

      <div className="wrap">
        <Reveal className="head">
          <h2 className="head-title">
            <span className="s-bright">Les vraies questions</span>{' '}
            <span className="s-dim">qu&apos;on nous pose.</span>
          </h2>
          <p className="head-sub">Pas de jargon. Réponses directes.</p>
        </Reveal>

        <Reveal className="frame" delay={0.1}>
          <div className="list">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`faq-item ${openIndex === i ? 'open' : ''}`}
              >
                <button
                  className="faq-btn"
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                >
                  <div className="q">
                    <span className="dot" />
                    <span className="qtext">{faq.q}</span>
                  </div>
                  <span className="icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
                      <path d="M12 5v14"/><path d="M5 12h14"/>
                    </svg>
                  </span>
                </button>

                {openIndex === i && (
                  <div className="answer">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
