'use client'

import Reveal from './Reveal'

export default function CTAFinal() {
  return (
    <section className="orbit-cta" id="order">
      <div className="fade" aria-hidden="true" />
      <div className="orbit-tlines" aria-hidden="true">
        <span className="orbit-tl v l"/><span className="orbit-tl v r"/>
        <span className="orbit-tl h t"/><span className="orbit-tl h b"/>
      </div>

      <Reveal className="wrap">
        <h2>
          <span className="s-dim">Pendant que tu lis ça,</span><br />
          <span className="s-bright">ton concurrent teste.</span>
        </h2>
        <p className="sub">
          Brief en 2 minutes. MP4 hooks-first livrés en 24 à 72h.
          Zéro logistique. Zéro contrat. Tu testes — tu scales sur les winners.
        </p>

        <div className="btn-row">
          <a className="btn btn-primary" href="#packs">
            Voir les packs
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M5 12h12"/><path d="M13 6l6 6-6 6"/>
            </svg>
          </a>
        </div>

        <p className="note">
          Paiement sécurisé · Livraison Drive · 1 round de retouches inclus · sans engagement
        </p>
      </Reveal>
    </section>
  )
}
