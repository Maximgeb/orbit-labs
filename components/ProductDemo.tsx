'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

/* ─── Timings ──────────────────────────────────────────────── */
const T_BRIEF      = 4200   // ms before moving to processing
const T_PROCESSING = 5000   // ms before moving to delivered
const T_DELIVERED  = 3800   // ms before looping to brief

type Scene = 'brief' | 'processing' | 'delivered'

/* ─── Typing hook ───────────────────────────────────────────── */
function useTypedText(target: string, delay = 0, speed = 38) {
  const [text, setText] = useState('')
  useEffect(() => {
    setText('')
    let i = 0
    const t0 = setTimeout(() => {
      const id = setInterval(() => {
        i++
        setText(target.slice(0, i))
        if (i >= target.length) clearInterval(id)
      }, speed)
      return () => clearInterval(id)
    }, delay)
    return () => clearTimeout(t0)
  }, [target, delay, speed])
  return text
}

/* ─── Scene: Brief ──────────────────────────────────────────── */
function SceneBrief({ onDone }: { onDone: () => void }) {
  const [sent, setSent] = useState(false)
  const produit = useTypedText('Crème anti-âge · Skincare', 120)
  const cible   = useTypedText('Femmes 30–50 ans', 900)
  const angle   = useTypedText('Résultats visibles en 14j', 1700)

  useEffect(() => {
    const t = setTimeout(() => {
      setSent(true)
      setTimeout(onDone, 700)
    }, T_BRIEF - 700)
    return () => clearTimeout(t)
  }, [onDone])

  const fields = [
    { label: 'Produit',  val: produit },
    { label: 'Cible',    val: cible },
    { label: 'Angle',    val: angle },
  ]

  return (
    <motion.div
      key="brief"
      className="pdemo-scene"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      {/* Window bar */}
      <div className="pdemo-winbar">
        <span className="pdemo-dot r" /><span className="pdemo-dot y" /><span className="pdemo-dot g" />
        <span className="pdemo-wintitle">Brief · Orbit Labs</span>
        <span className="pdemo-live"><span className="pdemo-live-dot" />Live</span>
      </div>

      {/* Form fields */}
      <div className="pdemo-fields">
        {fields.map((f, i) => (
          <motion.div
            key={f.label}
            className="pdemo-field"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 + 0.1, duration: 0.4, ease: EASE }}
          >
            <span className="pdemo-flabel">{f.label}</span>
            <span className="pdemo-fval">
              {f.val}
              {f.val.length > 0 && f.val.length < [25, 16, 25][i] && (
                <span className="pdemo-cursor" />
              )}
              {f.val.length === 0 && <span className="pdemo-fplaceholder">—</span>}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Separator */}
      <div className="pdemo-sep" />

      {/* Submit */}
      <motion.button
        className={`pdemo-submit ${sent ? 'pdemo-submit--sent' : ''}`}
        animate={sent
          ? { backgroundColor: '#16a34a', scale: [1, 0.97, 1] }
          : { backgroundColor: '#FF5A1F' }
        }
        transition={{ duration: 0.28 }}
        disabled
      >
        {sent
          ? <><CheckIcon />Brief envoyé</>
          : <>Envoyer le brief <ArrowIcon /></>
        }
      </motion.button>
    </motion.div>
  )
}

/* ─── Scene: Processing ─────────────────────────────────────── */
const STEPS = [
  { label: 'Brief analysé',             delay: 0.05 },
  { label: 'Génération hooks × 4',      delay: 0.55 },
  { label: 'Scripts + angles',          delay: 1.15 },
  { label: 'Sélection avatar',          delay: 1.80 },
  { label: 'Montage multi-scènes',      delay: 2.55 },
  { label: 'Export MP4 pub-ready',      delay: 3.40 },
]

function SceneProcessing({ onDone }: { onDone: () => void }) {
  const [done, setDone] = useState<number[]>([])
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    STEPS.forEach((s, i) => {
      timers.push(setTimeout(() => {
        setDone(prev => [...prev, i])
        setProgress(Math.round(((i + 1) / STEPS.length) * 100))
      }, s.delay * 1000 + 200))
    })

    timers.push(setTimeout(onDone, T_PROCESSING - 400))
    return () => timers.forEach(clearTimeout)
  }, [onDone])

  return (
    <motion.div
      key="processing"
      className="pdemo-scene"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      <div className="pdemo-winbar">
        <span className="pdemo-dot r" /><span className="pdemo-dot y" /><span className="pdemo-dot g" />
        <span className="pdemo-wintitle">Production · En cours</span>
        <span className="pdemo-live pdemo-live--orange"><span className="pdemo-live-dot pdemo-live-dot--orange" />Processing</span>
      </div>

      <div className="pdemo-steps">
        {STEPS.map((s, i) => {
          const active = done.includes(i)
          const current = !active && done.length === i
          return (
            <motion.div
              key={s.label}
              className={`pdemo-step ${active ? 'pdemo-step--done' : ''} ${current ? 'pdemo-step--active' : ''}`}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: s.delay * 0.4 + 0.1, duration: 0.35, ease: EASE }}
            >
              <span className="pdemo-step-ico">
                {active
                  ? <CheckIcon />
                  : current
                    ? <SpinnerIcon />
                    : <DotIcon />
                }
              </span>
              <span className="pdemo-step-label">{s.label}</span>
              {active && (
                <motion.span
                  className="pdemo-step-time"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  ✓
                </motion.span>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Progress bar */}
      <div className="pdemo-progress-wrap">
        <div className="pdemo-progress-track">
          <motion.div
            className="pdemo-progress-fill"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: EASE }}
          />
        </div>
        <span className="pdemo-progress-pct">{progress}%</span>
      </div>
    </motion.div>
  )
}

/* ─── Scene: Delivered ──────────────────────────────────────── */
const VIDEOS = [
  { label: 'Hook #1', tag: 'Pain point', color: '#FF5A1F' },
  { label: 'Hook #2', tag: 'Bénéfice',  color: '#7C5CFC' },
  { label: 'Hook #3', tag: 'Social proof', color: '#00C9A7' },
]

function SceneDelivered({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, T_DELIVERED)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      key="delivered"
      className="pdemo-scene"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      <div className="pdemo-winbar">
        <span className="pdemo-dot r" /><span className="pdemo-dot y" /><span className="pdemo-dot g" />
        <span className="pdemo-wintitle">Livraison · Drive</span>
        <motion.span
          className="pdemo-live pdemo-live--green"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.3 }}
        >
          <span className="pdemo-live-dot pdemo-live-dot--green" />Livré 48h
        </motion.span>
      </div>

      {/* Video cards */}
      <div className="pdemo-videos">
        {VIDEOS.map((v, i) => (
          <motion.div
            key={v.label}
            className="pdemo-video-card"
            initial={{ opacity: 0, scale: 0.88, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 20, delay: 0.2 + i * 0.14 }}
          >
            {/* Phone screen */}
            <div className="pdemo-phone-screen" style={{ borderColor: v.color + '33' }}>
              <div className="pdemo-phone-glow" style={{ background: v.color + '22' }} />
              {/* Play icon */}
              <div className="pdemo-play-ico" style={{ borderColor: v.color + '66' }}>
                <svg viewBox="0 0 24 24" fill={v.color} width="14" height="14">
                  <path d="M8 5.14v14l11-7-11-7z"/>
                </svg>
              </div>
              {/* Label overlay */}
              <div className="pdemo-video-tag" style={{ color: v.color }}>{v.tag}</div>
            </div>
            <span className="pdemo-video-label">{v.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Stats row */}
      <motion.div
        className="pdemo-stats"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4, ease: EASE }}
      >
        {[
          { val: '8', lbl: 'MP4 livrés' },
          { val: '48h', lbl: 'Délai' },
          { val: '57€', lbl: 'Par vidéo' },
        ].map((s) => (
          <div key={s.lbl} className="pdemo-stat">
            <span className="pdemo-stat-val">{s.val}</span>
            <span className="pdemo-stat-lbl">{s.lbl}</span>
          </div>
        ))}
      </motion.div>

      {/* Footer badge */}
      <motion.div
        className="pdemo-delivered-badge"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0, type: 'spring', stiffness: 200, damping: 20 }}
      >
        <CheckIcon />
        Meta & TikTok ready · Drive organisé
      </motion.div>
    </motion.div>
  )
}

/* ─── Icons ─────────────────────────────────────────────────── */
function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function SpinnerIcon() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" className="pdemo-spinner">
      <circle cx="8" cy="8" r="6" fill="none" stroke="rgba(255,90,31,0.3)" strokeWidth="2"/>
      <path d="M8 2a6 6 0 0 1 6 6" fill="none" stroke="#FF5A1F" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}
function DotIcon() {
  return <span className="pdemo-step-dot" />
}

/* ─── Scene label pills ─────────────────────────────────────── */
const SCENE_META: Record<Scene, { step: string; label: string }> = {
  brief:      { step: '01', label: 'Brief' },
  processing: { step: '02', label: 'Production IA' },
  delivered:  { step: '03', label: 'Livraison Drive' },
}

/* ─── Main component ────────────────────────────────────────── */
export default function ProductDemo() {
  const [scene, setScene] = useState<Scene>('brief')
  const [running, setRunning] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, margin: '-80px' })

  // Start loop when section enters viewport
  useEffect(() => {
    if (inView) setRunning(true)
    else setRunning(false)
  }, [inView])

  const advance = (current: Scene) => {
    if (current === 'brief')      setScene('processing')
    if (current === 'processing') setScene('delivered')
    if (current === 'delivered')  setScene('brief')
  }

  const stepOrder: Scene[] = ['brief', 'processing', 'delivered']
  const currentIdx = stepOrder.indexOf(scene)

  return (
    <section className="orbit-pdemo" id="demo" ref={ref}>
      <div className="fade" aria-hidden="true" />
      <div className="orbit-tlines" aria-hidden="true">
        <span className="orbit-tl v l"/><span className="orbit-tl v r"/>
      </div>

      <div className="wrap">

        {/* Header */}
        <motion.div
          className="pdemo-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <div className="pill">
            <span className="dot" />
            En live
          </div>
          <h2 className="heading">
            <span className="s-dim">Brief → Production → Drive.</span><br />
            <span className="s-bright">Tu vois exactement ce qui se passe.</span>
          </h2>
          <p className="sub">
            Chaque commande passe par ce pipeline. Brief 2 min, production IA,
            livraison MP4 dans ton Drive — sans que tu aies à gérer quoi que ce soit.
          </p>
        </motion.div>

        {/* Step indicators */}
        <div className="pdemo-steps-nav">
          {stepOrder.map((s, i) => (
            <div key={s} className={`pdemo-nav-step ${i === currentIdx ? 'active' : ''} ${i < currentIdx ? 'done' : ''}`}>
              <span className="pdemo-nav-num">{SCENE_META[s].step}</span>
              <span className="pdemo-nav-label">{SCENE_META[s].label}</span>
            </div>
          ))}
        </div>

        {/* Animated card */}
        <div className="pdemo-card-wrap">
          <div className="pdemo-card">
            <AnimatePresence mode="wait">
              {running && scene === 'brief' && (
                <SceneBrief key="brief" onDone={() => advance('brief')} />
              )}
              {running && scene === 'processing' && (
                <SceneProcessing key="processing" onDone={() => advance('processing')} />
              )}
              {running && scene === 'delivered' && (
                <SceneDelivered key="delivered" onDone={() => advance('delivered')} />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Progress dots */}
        <div className="pdemo-dots-nav">
          {stepOrder.map((s) => (
            <button
              key={s}
              className={`pdemo-dot-btn ${s === scene ? 'active' : ''}`}
              onClick={() => setScene(s)}
              aria-label={SCENE_META[s].label}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
