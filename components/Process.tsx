'use client'

import Image from 'next/image'
import Reveal from './Reveal'

export default function Process() {
  return (
    <section className="orbit-process" id="process">
      <div className="fade" aria-hidden="true" />
      <div className="orbit-tlines" aria-hidden="true">
        <span className="orbit-tl v l"/><span className="orbit-tl v r"/>
        <span className="orbit-tl h t"/><span className="orbit-tl h b"/>
      </div>

      <div className="wrap">
        <Reveal className="head">
          <h2>
            <span className="s-bright">3 étapes.</span>{' '}
            <span className="s-dim">Zéro friction.</span>
          </h2>
          <p className="sub">
            Tu commandes, tu remplis le brief en 2 minutes, on produit.
            Tu reçois tes MP4 prêts à uploader.
          </p>
        </Reveal>

        <div className="grid">

          {/* ÉTAPE 1 */}
          <Reveal className="card" delay={0}>
            <div className="inner">
              <div className="step-pill"><span className="dot" />Étape 1</div>
              <h3 className="title">Tu commandes un pack</h3>
              <p className="desc">
                Choisis Pack 4 / 8 / 12 selon ton niveau (launch, hook sprint, scale).
                Paiement simple, lancement immédiat.
              </p>

              <div className="module">
                <div className="preview">
                  <div className="radar-wrap">
                    <div className="radar" aria-hidden="true">
                      <div className="beam" />
                      <div className="pulse" />
                    </div>
                    <div className="radar-label">Analyse rapide du besoin</div>
                  </div>
                </div>

                <div className="list">
                  <div className="item">
                    <div className="ico">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
                        <path d="M12 3v18"/><path d="M3 12h18"/>
                      </svg>
                    </div>
                    <span>Choix du pack + délai</span>
                  </div>
                  <div className="item">
                    <div className="ico">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
                        <path d="M4 4h16v16H4z"/><path d="M8 10h8"/><path d="M8 14h6"/>
                      </svg>
                    </div>
                    <span>Kickoff immédiat</span>
                  </div>
                  <div className="item">
                    <div className="ico">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
                        <path d="M20 7l-8 10-4-4"/>
                      </svg>
                    </div>
                    <span>Go production</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ÉTAPE 2 */}
          <Reveal className="card" delay={0.12}>
            <div className="inner">
              <div className="step-pill"><span className="dot" />Étape 2</div>
              <h3 className="title">Tu remplis le brief (2 minutes)</h3>
              <p className="desc">
                Produit, cible, bénéfices, objections, angle, offre + assets/B-roll si tu en as.
                C&apos;est tout.
              </p>

              <div className="module">
                <div className="preview">
                  <div className="window" aria-hidden="true">
                    <div className="bar"><span /></div>
                    <div className="body">
                      <div><span className="hl">brief</span> = {'{'}</div>
                      <div>&nbsp;&nbsp;produit: &quot;…&quot;,</div>
                      <div>&nbsp;&nbsp;cible: &quot;…&quot;,</div>
                      <div>&nbsp;&nbsp;angle: &quot;…&quot;,</div>
                      <div>&nbsp;&nbsp;offre: &quot;…&quot;<span className="cursor" /></div>
                      <div>{'}'}</div>
                    </div>
                  </div>
                </div>

                <div className="list">
                  <div className="item">
                    <div className="ico">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
                        <path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h10"/>
                      </svg>
                    </div>
                    <span>Promesse + CTA</span>
                  </div>
                  <div className="item">
                    <div className="ico">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
                        <path d="M12 20l9-16H3l9 16z"/>
                      </svg>
                    </div>
                    <span>Objections + angles</span>
                  </div>
                  <div className="item">
                    <div className="ico">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
                        <path d="M12 5v14"/><path d="M5 12h14"/>
                      </svg>
                    </div>
                    <span>Assets (si dispo)</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ÉTAPE 3 */}
          <Reveal className="card" delay={0.24}>
            <div className="inner">
              <div className="step-pill"><span className="dot" />Étape 3</div>
              <h3 className="title">On produit + tu reçois</h3>
              <p className="desc">
                Créa multi-scènes + hooks + overlays + sous-titres.
                Livraison Drive : MP4 prêts pub.
              </p>

              <div className="module">
                <div className="preview">
                  <div className="pipeline" aria-hidden="true">
                    <div className="node">
                      <div className="orb-logo">
                        <Image
                          src="https://cdn.shopify.com/s/files/1/0948/6162/3624/files/Design_sans_titre_-_2026-01-31T220608.363.png?v=1769893591"
                          alt=""
                          width={42}
                          height={42}
                        />
                      </div>
                      <div className="label">Orbit Labs</div>
                    </div>

                    <div className="pipe"><div className="flow" /></div>

                    <div className="node assets">
                      <div className="phone">
                        <svg viewBox="0 0 64 64" fill="none">
                          <rect x="20" y="10" width="24" height="44" rx="6" stroke="rgba(255,255,255,0.85)" strokeWidth="2"/>
                          <rect x="23.5" y="15" width="17" height="32" rx="3" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.10)" strokeWidth="1"/>
                          <circle cx="32" cy="50" r="1.6" fill="rgba(255,255,255,0.7)"/>
                          <circle className="playPulse" cx="32" cy="31" r="9" fill="rgba(255,90,31,0.22)" stroke="rgba(255,90,31,0.9)" strokeWidth="1.6"/>
                          <path className="playPulse" d="M30.3 27.6L38 31.0L30.3 34.4Z" fill="#FF5A1F"/>
                        </svg>
                      </div>
                      <div className="label">MP4 prêts pub</div>
                    </div>
                  </div>
                </div>

                <div className="list">
                  <div className="item">
                    <div className="ico">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
                        <path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 21h14"/>
                      </svg>
                    </div>
                    <span>Drive livré (MP4)</span>
                  </div>
                  <div className="item">
                    <div className="ico">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>
                      </svg>
                    </div>
                    <span>Hooks + overlays inclus</span>
                  </div>
                  <div className="item">
                    <div className="ico">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
                        <path d="M20 7l-8 10-4-4"/>
                      </svg>
                    </div>
                    <span>Ready to launch</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

        </div>

        <div className="note">
          <strong>1 round de retouches inclus</strong> (si besoin, on ajuste rapidement avant lancement).
        </div>
      </div>
    </section>
  )
}
