'use client'

import Reveal from './Reveal'

export default function System() {
  return (
    <section className="orbit-system" id="system">
      <div className="fade" aria-hidden="true" />
      <div className="orbit-tlines" aria-hidden="true">
        <span className="orbit-tl v l"/><span className="orbit-tl v r"/>
        <span className="orbit-tl h t"/><span className="orbit-tl h b"/>
      </div>

      <div className="wrap">

        <Reveal className="head">
          <h2 className="heading">
            <span className="s-dim">Pas de la génération IA.</span>{' '}
            <span className="s-bright">Un système de testing.</span>
          </h2>
          <p className="sub">
            Chaque créa est construite pour apprendre : hook, angle, message, rythme.
            Tu sors avec des données — pas juste des vidéos.
          </p>
        </Reveal>

        <div className="frame">
          <div className="grid">

            {/* BIG CARD */}
            <Reveal className="card big" delay={0}>
              <div className="kicker"><span className="dot" />Hook-first</div>
              <h3 className="title">On construit l&apos;accroche avant tout.</h3>
              <p className="p">
                Le hook = 70% du résultat. Chaque vidéo démarre pour stopper le scroll,
                créer l&apos;intérêt, puis amener le clic / l&apos;action.
              </p>
            </Reveal>

            {/* CARD 2 */}
            <Reveal className="card" delay={0.1}>
              <div className="kicker"><span className="dot" />Angles + copy</div>
              <h3 className="title">Scripts qui vendent.</h3>
              <p className="p">
                Douleurs, objections, verbatim : on transforme ça en scripts + overlays
                lisibles, conversion-first.
              </p>
            </Reveal>

            {/* CARD 3 */}
            <Reveal className="card" delay={0.2}>
              <div className="kicker"><span className="dot" />Multi-scènes</div>
              <h3 className="title">Rythme + cuts.</h3>
              <p className="p">
                On évite le rendu IA statique : scènes, transitions, montage dynamique
                pour un rendu UGC crédible.
              </p>
            </Reveal>

            {/* CARD 4 */}
            <Reveal className="card" delay={0.3}>
              <div className="kicker"><span className="dot" />Batch testable</div>
              <h3 className="title">Variations prêtes à itérer.</h3>
              <p className="p">
                Plusieurs hooks + variations d&apos;angles. Tu testes vite, tu gardes les winners,
                tu scales proprement.
              </p>
            </Reveal>

          </div>
        </div>

      </div>
    </section>
  )
}
