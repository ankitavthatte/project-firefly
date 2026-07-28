import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { identity, chapters, travel } from '../data/content.js'
import { TechLabel } from './bits.jsx'
import Masthead from './Masthead.jsx'

const asset = (p) => `${import.meta.env.BASE_URL}${p}`

const TABS = ['Basics', 'Work', 'Life']

const EASE = [0.2, 0.7, 0.2, 1]

// Page-level stagger: header, tabs and panel drift up in sequence on mount.
const pageStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
}
const rise = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

// Tab-body swap: the outgoing tab slides/fades out, the incoming one slides in
// and staggers its own lines.
const panelSwap = {
  hidden: { opacity: 0, x: 26 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: EASE, staggerChildren: 0.06, delayChildren: 0.05 },
  },
  exit: { opacity: 0, x: -22, transition: { duration: 0.22, ease: 'easeIn' } },
}
const line = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
}

// The "About" page — opens on its own route (#/about) with the tabbed
// dossier layout: a holographic AR portrait on the left, a Basics / Work /
// Life tab set on the right, technical registration marks down the edge.
export default function AboutPage() {
  const [tab, setTab] = useState('Basics')
  const reduce = useReducedMotion()

  return (
    <div className="grain relative z-10 min-h-full">
      <Masthead active="about" />

      <motion.div
        className="wrap pb-24 pt-8"
        variants={reduce ? undefined : pageStagger}
        initial={reduce ? false : 'hidden'}
        animate="show"
      >
        {/* header strip */}
        <motion.div
          className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2"
          variants={reduce ? undefined : rise}
        >
          <div className="flex items-baseline gap-5">
            <h1 className="mono text-lg font-bold tracking-[0.15em]">ABOUT ME</h1>
            <TechLabel className="!text-[color:var(--color-orange)]">ankita.exe</TechLabel>
          </div>
          <TechLabel className="!text-[color:var(--color-orange)]">
            my life story, condensed into a few tabs
          </TechLabel>
        </motion.div>
        <motion.hr
          className="mt-4 border-[color:var(--color-line)]"
          variants={reduce ? undefined : rise}
        />

        {/* folder tabs */}
        <motion.div className="mt-8 flex gap-2" variants={reduce ? undefined : rise}>
          {TABS.map((t) => {
            const active = t === tab
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`mono relative -mb-px rounded-t-2xl border border-b-0 px-6 py-3 text-[0.8rem] font-bold tracking-[0.12em] transition-colors ${
                  active
                    ? 'z-10 border-[color:var(--color-line)] bg-[color:var(--color-ink)] text-[color:var(--color-orange)]'
                    : 'border-[color:var(--color-line)] bg-[color:var(--color-card-hi)] text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]'
                }`}
              >
                {t.toUpperCase()}
                {active && !reduce && (
                  <motion.span
                    layoutId="about-tab-underline"
                    className="absolute inset-x-3 -bottom-px h-[2px] rounded-full bg-[color:var(--color-orange)]"
                    transition={{ type: 'spring', stiffness: 500, damping: 34 }}
                  />
                )}
              </button>
            )
          })}
        </motion.div>

        {/* dossier panel */}
        <motion.div
          className="relative overflow-hidden rounded-2xl rounded-tl-none border border-[color:var(--color-line)] bg-[color:var(--color-card)] p-5 sm:p-8"
          variants={reduce ? undefined : rise}
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,15rem)_1fr] lg:gap-12">
            {/* portrait column */}
            <div className="relative">
              <HoloPortrait reduce={reduce} />
            </div>

            {/* tab body + registration marks */}
            <div className="relative min-h-[18rem]">
              <div className="pr-0 lg:pr-14">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={tab}
                    variants={reduce ? undefined : panelSwap}
                    initial={reduce ? false : 'hidden'}
                    animate="show"
                    exit={reduce ? undefined : 'exit'}
                  >
                    {tab === 'Basics' && <Basics />}
                    {tab === 'Work' && <Work />}
                    {tab === 'Life' && <Life reduce={reduce} />}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* vertical technical registration marks down the right edge */}
              <RegistrationMarks />
            </div>
          </div>
        </motion.div>

        {/* footer nav */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-between gap-4"
          variants={reduce ? undefined : rise}
        >
          <a href="#/works" className="pill pill-ghost">
            See selected work →
          </a>
          <a href={`mailto:${identity.email}`} className="pill pill-orange">
            Say hello ↗
          </a>
        </motion.div>
      </motion.div>
    </div>
  )
}

/* ---------- tab bodies ---------- */

function Basics() {
  return (
    <div className="max-w-2xl">
      <motion.p
        variants={line}
        className="mono text-[0.82rem] leading-relaxed text-[color:var(--color-ink-soft)]"
      >
        Hey there, I’m <B>Ankita</B> — a{' '}
        <B>Senior Product Designer with 10+ years</B> of experience. I’m{' '}
        <B>based in Pune, India</B>, and right now I’m the sole designer behind{' '}
        <B>Evalix AI, a live enterprise platform</B> at Cloud.in.
      </motion.p>

      <motion.hr variants={line} className="my-6 border-[color:var(--color-line)]" />

      <motion.p
        variants={line}
        className="mono text-[0.82rem] leading-relaxed text-[color:var(--color-ink-soft)]"
      >
        I started out as an <B>architect</B> — a decade spent learning how
        structure makes complex things usable, first in buildings, now in
        enterprise software. My current obsession: <B>AI-first design workflows</B>.
        I love building experimental things where a designer’s judgment and a
        machine’s speed finally shake hands.
      </motion.p>
    </div>
  )
}

function Work() {
  return (
    <div className="max-w-2xl space-y-6">
      {chapters
        .filter((c) => c.detail)
        .map((c) => (
          <motion.div
            key={c.title}
            variants={line}
            className="border-l-2 border-[color:var(--color-line)] pl-4"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h3 className="mono text-[0.95rem] font-bold text-[color:var(--color-orange)]">
                {c.title}
              </h3>
              <span className="mono text-[0.66rem] text-[color:var(--color-ink-soft)]">
                {c.detail}
              </span>
            </div>
            <p className="mono mt-2 text-[0.82rem] leading-relaxed text-[color:var(--color-ink-soft)]">
              {c.body}
            </p>
          </motion.div>
        ))}
    </div>
  )
}

function Life({ reduce }) {
  return (
    <div className="max-w-2xl">
      <motion.p variants={line} className="text-[1.15rem] leading-relaxed sm:text-[1.2rem]">
        {identity.personality}
      </motion.p>

      <motion.div variants={line} className="mt-6 flex flex-wrap gap-2.5">
        {identity.tags.map((t, i) => (
          <motion.span
            key={t}
            className="mono inline-flex cursor-default items-center gap-1.5 rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-card-hi)] px-3.5 py-2 text-[0.74rem]"
            style={{ rotate: (i % 2 ? 1 : -1) * (2 + (i % 3)) }}
            whileHover={
              reduce
                ? undefined
                : {
                    rotate: 0,
                    scale: 1.08,
                    y: -3,
                    borderColor: 'var(--color-orange)',
                    color: 'var(--color-orange)',
                  }
            }
            transition={{ type: 'spring', stiffness: 420, damping: 18 }}
          >
            {t}
          </motion.span>
        ))}
      </motion.div>

      <motion.hr variants={line} className="my-6 border-[color:var(--color-line)]" />

      <motion.p
        variants={line}
        className="mono text-[0.9rem] leading-relaxed text-[color:var(--color-ink-soft)]"
      >
        {identity.craft}
      </motion.p>
      <motion.p
        variants={line}
        className="mono mt-4 text-[0.9rem] leading-relaxed text-[color:var(--color-ink-soft)]"
      >
        {travel.intro}
      </motion.p>
    </div>
  )
}

/* ---------- pieces ---------- */

function B({ children }) {
  return <span className="font-bold text-[color:var(--color-ink)]">{children}</span>
}

// A holographic, AR-viewfinder-styled portrait: the whole card tilts in 3D
// toward the cursor with spring physics, a light sheen tracks the pointer,
// scanlines drift over the image, and a set of "tracking" HUD marks plus
// floating location/version chips parallax at different depths — an
// AR/VR-flavoured take on a headshot. Falls back to a still card when the
// visitor prefers reduced motion.
function HoloPortrait({ reduce }) {
  const [failed, setFailed] = useState(false)

  // Pointer offset from the card centre, in the range roughly -0.5..0.5.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const spring = { stiffness: 150, damping: 18, mass: 0.4 }
  const sx = useSpring(mx, spring)
  const sy = useSpring(my, spring)

  // Card tilt.
  const rotateY = useTransform(sx, (v) => v * 16)
  const rotateX = useTransform(sy, (v) => -v * 16)

  // Parallax translations at three depths (px).
  const nearX = useTransform(sx, (v) => v * 34)
  const nearY = useTransform(sy, (v) => v * 34)
  const midX = useTransform(sx, (v) => v * 20)
  const midY = useTransform(sy, (v) => v * 20)
  const farX = useTransform(sx, (v) => v * 10)
  const farY = useTransform(sy, (v) => v * 10)

  // Pointer-tracked holographic sheen.
  const shineX = useTransform(sx, (v) => 50 + v * 90)
  const shineY = useTransform(sy, (v) => 50 + v * 90)
  const sheen = useMotionTemplate`radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.42), rgba(140,190,255,0.12) 32%, rgba(255,255,255,0) 60%)`

  const onMove = (e) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  // --- Mobile: drive the same tilt from the device gyroscope ---------------
  // On touch devices there's no cursor, so we map the phone's orientation
  // (gamma = left/right, beta = front/back) onto the same motion values. iOS
  // 13+ gates the sensor behind a permission prompt that must come from a
  // user gesture, so there we surface a small "Enable AR tilt" button.
  const [needsMotionPerm, setNeedsMotionPerm] = useState(false)
  const [tiltOn, setTiltOn] = useState(false)
  const cleanupRef = useRef(null)

  const startGyro = () => {
    const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))
    const handler = (e) => {
      if (e.gamma == null || e.beta == null) return
      // gamma ~ -90..90 left/right; beta ~ -180..180 front/back. 42° is a
      // comfortable neutral holding tilt, so we centre around it.
      mx.set(clamp(e.gamma / 28, -0.5, 0.5))
      my.set(clamp((e.beta - 42) / 32, -0.5, 0.5))
    }
    window.addEventListener('deviceorientation', handler)
    cleanupRef.current = () => window.removeEventListener('deviceorientation', handler)
    setTiltOn(true)
  }

  const enableTilt = async () => {
    try {
      const res = await DeviceOrientationEvent.requestPermission()
      if (res === 'granted') {
        startGyro()
        setNeedsMotionPerm(false)
      }
    } catch {
      /* permission denied or unavailable — the static card still works */
    }
  }

  useEffect(() => {
    if (reduce || typeof window === 'undefined') return undefined
    const coarse = window.matchMedia?.('(pointer: coarse)').matches
    if (!coarse) return undefined
    const needsPerm =
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function'
    if (needsPerm) {
      setNeedsMotionPerm(true)
      return undefined
    }
    startGyro()
    return () => cleanupRef.current?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce])

  // Always detach the sensor listener on unmount, even if it was started
  // later from the permission button.
  useEffect(() => () => cleanupRef.current?.(), [])

  const image =
    identity.photo && !failed ? (
      <img
        src={asset(identity.photo)}
        alt={identity.name}
        onError={() => setFailed(true)}
        className="photo-bw h-72 w-full object-cover sm:h-80"
      />
    ) : (
      <svg
        viewBox="0 0 200 240"
        className="h-72 w-full sm:h-80"
        role="img"
        aria-label={identity.name}
        preserveAspectRatio="xMidYMax meet"
      >
        <path d="M22 240c0-50 34-78 78-78s78 28 78 78z" fill="#0d0d0c" />
        <rect x="85" y="118" width="30" height="44" rx="13" fill="#0d0d0c" />
        <ellipse cx="100" cy="90" rx="40" ry="48" fill="#0d0d0c" />
      </svg>
    )

  return (
    <div className="holo-stage" style={{ perspective: 900 }}>
      <motion.div
        className="holo-card group relative rounded-2xl"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        {/* the portrait itself */}
        <div className="relative overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-card-hi)]">
          {image}

          {/* holographic sheen tracking the pointer */}
          {!reduce && (
            <motion.div
              className="pointer-events-none absolute inset-0 mix-blend-soft-light"
              style={{ background: sheen }}
              aria-hidden
            />
          )}

          {/* drifting scanlines + faint HUD grid */}
          <div className="holo-scan pointer-events-none absolute inset-0" aria-hidden />
          <div className="holo-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />

          {/* a sweeping "acquiring" bar on hover */}
          {!reduce && <div className="holo-sweep pointer-events-none absolute inset-0" aria-hidden />}

          {/* AR viewfinder brackets (parallax, mid depth) */}
          <motion.div
            className="pointer-events-none absolute inset-3"
            style={reduce ? undefined : { x: midX, y: midY, translateZ: 40 }}
            aria-hidden
          >
            <Bracket className="absolute left-0 top-0" />
            <Bracket className="absolute right-0 top-0 rotate-90" />
            <Bracket className="absolute bottom-0 right-0 rotate-180" />
            <Bracket className="absolute bottom-0 left-0 -rotate-90" />
          </motion.div>

          {/* pulsing tracking readout, bottom-left */}
          <motion.div
            className="pointer-events-none absolute bottom-2 left-2 flex items-center gap-1.5"
            style={reduce ? undefined : { x: nearX, y: nearY, translateZ: 60 }}
            aria-hidden
          >
            <span className="holo-dot h-1.5 w-1.5 rounded-full bg-[color:var(--color-orange)]" />
            <span className="mono text-[0.5rem] tracking-[0.2em] text-white/85 [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
              SUBJECT · LOCKED
            </span>
          </motion.div>

          {/* coordinate readout, top-right */}
          <motion.div
            className="pointer-events-none absolute right-2 top-2 text-right"
            style={reduce ? undefined : { x: farX, y: farY, translateZ: 30 }}
            aria-hidden
          >
            <div className="mono text-[0.48rem] leading-tight tracking-[0.15em] text-white/80 [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
              18.52°N
              <br />
              73.85°E
            </div>
          </motion.div>
        </div>

        {/* floating chips that hover above the card (nearest depth) */}
        <motion.span
          className="mono absolute -left-2 -top-2 rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-card-hi)] px-2.5 py-1 text-[0.55rem] font-bold tracking-[0.12em] text-[color:var(--color-orange)] shadow-[0_10px_24px_-12px_rgba(0,0,0,0.6)]"
          style={reduce ? undefined : { x: nearX, y: nearY, translateZ: 80 }}
        >
          PUNE · IN
        </motion.span>
        <motion.span
          className="mono absolute -bottom-2.5 right-3 rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-ink)] px-2.5 py-1 text-[0.55rem] font-bold tracking-[0.12em] text-[color:var(--color-paper)] shadow-[0_10px_24px_-12px_rgba(0,0,0,0.6)]"
          style={reduce ? undefined : { x: midX, y: midY, translateZ: 70 }}
        >
          ankita.v10 ✦
        </motion.span>
      </motion.div>

      <p className="mono mt-4 text-center text-[0.55rem] tracking-[0.22em] text-[color:var(--color-ink-soft)]">
        {reduce ? 'PORTRAIT' : tiltOn ? 'TILT TO ROTATE ◇ AR MODE' : 'MOVE TO ROTATE ◇ AR MODE'}
      </p>

      {needsMotionPerm && (
        <div className="mt-2 text-center">
          <button
            type="button"
            onClick={enableTilt}
            className="mono inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-orange)] bg-[color:var(--color-card-hi)] px-3.5 py-1.5 text-[0.6rem] font-bold tracking-[0.12em] text-[color:var(--color-orange)]"
          >
            ✦ ENABLE AR TILT
          </button>
        </div>
      )}
    </div>
  )
}

// A single corner bracket for the AR viewfinder.
function Bracket({ className = '' }) {
  return (
    <span
      className={`block h-4 w-4 border-l-2 border-t-2 border-[color:var(--color-orange)]/85 ${className}`}
    />
  )
}

// Decorative vertical technical marks echoing the reference's right rail.
function RegistrationMarks() {
  return (
    <div className="pointer-events-none absolute right-0 top-2 hidden select-none flex-col items-center gap-4 lg:flex">
      <svg width="26" height="26" viewBox="0 0 24 24" className="text-[color:var(--color-ink-soft)]" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
      </svg>
      <span className="mono text-[0.55rem] tracking-[0.25em] text-[color:var(--color-ink-soft)] [writing-mode:vertical-rl]">
        DIGITAL DESIGN ARTIFACTS
      </span>
      <span className="mono text-[0.55rem] tracking-[0.25em] text-[color:var(--color-orange)] [writing-mode:vertical-rl]">
        MAKE MORE · CRY LESS
      </span>
      <div className="h-16 w-[3px] rounded bg-[repeating-linear-gradient(180deg,var(--color-ink-soft)_0_2px,transparent_2px_5px)]" />
    </div>
  )
}
