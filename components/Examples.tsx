'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Reveal from './Reveal'

type Tile = {
  src: string
  tag: string
  title: string
  sub: string
}

const tiles: Tile[] = [
  {
    src: 'https://cdn.shopify.com/videos/c/o/v/3237bd1fa2af4d638920b3e9c36c2adb.mp4',
    tag: 'Skincare',
    title: 'Skincare',
    sub: 'Hook + cuts multi-scènes',
  },
  {
    src: 'https://cdn.shopify.com/videos/c/o/v/6db5dda78c3b419aa56808dd46526248.mp4',
    tag: 'Médical',
    title: 'Éducation',
    sub: 'Explication produit',
  },
  {
    src: '',
    tag: 'Maison',
    title: 'Maison',
    sub: 'Démo + cuts dynamiques',
  },
  {
    src: '',
    tag: 'Mode',
    title: 'Mode',
    sub: 'Talking head + hook',
  },
  {
    src: '',
    tag: 'Pet',
    title: 'Pet',
    sub: 'Problème → solution',
  },
  {
    src: '',
    tag: 'Tech',
    title: 'Tech',
    sub: 'Feature highlight + CTA',
  },
]

export default function Examples() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [muted, setMuted] = useState(true)
  const playerRef = useRef<HTMLVideoElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  // Intersection observer for preview autoplay
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const vid = entry.target as HTMLVideoElement
          if (entry.isIntersecting) {
            vid.play().catch(() => {})
          } else {
            vid.pause()
          }
        })
      },
      { threshold: 0.2 }
    )
    videoRefs.current.forEach((v) => { if (v) observer.observe(v) })
    return () => observer.disconnect()
  }, [])

  // Modal keyboard close
  const closeModal = useCallback(() => {
    setActiveVideo(null)
    setMuted(true)
    document.body.style.overflow = ''
  }, [])

  useEffect(() => {
    if (!activeVideo) return
    document.body.style.overflow = 'hidden'
    if (playerRef.current) {
      playerRef.current.muted = true
      playerRef.current.load()
      playerRef.current.play().catch(() => {})
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeVideo, closeModal])

  const toggleMute = () => {
    setMuted((prev) => {
      if (playerRef.current) playerRef.current.muted = !prev
      return !prev
    })
  }

  return (
    <>
      <section className="orbit-previews" id="examples">
        <div className="fade" aria-hidden="true" />
        <div className="orbit-tlines" aria-hidden="true">
          <span className="orbit-tl v l"/><span className="orbit-tl v r"/>
          <span className="orbit-tl h t"/><span className="orbit-tl h b"/>
        </div>

        <div className="wrap">
          <Reveal className="head">
            <div className="pill">EXEMPLES</div>
            <h2>
              <span className="s-dim">Preview UGC —</span>{' '}
              <span className="s-bright">rendu réel</span>
            </h2>
            <p className="sub">
              Une preuve visuelle, sinon personne n&apos;achète.
              Clique sur une vignette pour voir la vidéo.
            </p>
          </Reveal>

          <div className="grid">
            {tiles.map((tile, i) => (
              <div
                key={i}
                className="tile"
                onClick={() => tile.src && setActiveVideo(tile.src)}
                role={tile.src ? 'button' : undefined}
                tabIndex={tile.src ? 0 : undefined}
                onKeyDown={(e) => { if (e.key === 'Enter' && tile.src) setActiveVideo(tile.src) }}
                aria-label={tile.src ? `Voir ${tile.title}` : undefined}
              >
                <div className="play-btn" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M9 7l10 5-10 5V7z" />
                  </svg>
                </div>

                <div className="tag">{tile.tag}</div>

                {tile.src ? (
                  <video
                    ref={(el) => { videoRefs.current[i] = el }}
                    playsInline
                    muted
                    loop
                    preload="metadata"
                  >
                    <source src={tile.src} type="video/mp4" />
                  </video>
                ) : (
                  // Placeholder when no video yet
                  <div style={{
                    width: '100%', height: '100%',
                    background: 'rgba(255,255,255,0.03)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ color: 'rgba(255,255,255,0.22)', fontSize: 13 }}>
                      Bientôt
                    </span>
                  </div>
                )}

                <div className="cap">
                  <strong>{tile.title}</strong>
                  <span>{tile.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {activeVideo && (
        <div
          className="orbit-modal-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
          role="dialog"
          aria-modal="true"
          aria-label="Lecture vidéo"
        >
          <div className="orbit-modal-box">
            <div className="orbit-modal-topbar">
              <button
                className="orbit-modal-btn"
                onClick={closeModal}
                aria-label="Fermer"
                type="button"
              >
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
                  <path d="M6 6l12 12"/><path d="M18 6l-12 12"/>
                </svg>
              </button>

              <button
                className="orbit-modal-btn"
                onClick={toggleMute}
                aria-label={muted ? 'Activer le son' : 'Couper le son'}
                type="button"
              >
                {muted ? (
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
                    <path d="M11 5l-5 4H3v6h3l5 4V5z"/>
                    <path d="M23 9l-6 6"/><path d="M17 9l6 6"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
                    <path d="M11 5l-5 4H3v6h3l5 4V5z"/>
                    <path d="M15 9a4 4 0 0 1 0 6"/>
                    <path d="M17.5 7a7 7 0 0 1 0 10"/>
                  </svg>
                )}
              </button>
            </div>

            <video
              ref={playerRef}
              playsInline
              controls
              preload="metadata"
              muted={muted}
            >
              <source src={activeVideo} type="video/mp4" />
            </video>

            <div className="orbit-modal-hint">
              {muted ? 'Clique "Son" pour activer l\'audio.' : 'Son activé.'}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
