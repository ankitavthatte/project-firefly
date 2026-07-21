import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { awards, identity } from '../data/content.js'

const asset = (p) => `${import.meta.env.BASE_URL}${p}`

// Where the work happened + the receipts. A translucent green "console"
// holds interchangeable "cartridges"; award mentions arrive as comments.
const ROSTER = ['Cloud.in', 'Hostin Services', 'Evalix AI', 'Tamarind Studio', 'Venkatramanan Assoc.']
const TOOLS = identity.tools
const STATS = [
  { v: '10+', l: 'years' },
  { v: '300+', l: 'screens' },
  { v: '8', l: 'reports' },
  { v: '4', l: 'awards' },
]
const SCREENS = [
  { app: 'ROSTER.EXE', foot: '10+ YEARS · ARCHITECTURE → PRODUCT' },
  { app: 'TOOLKIT.EXE', foot: 'DESIGNS AI-FIRST, EVERY DAY' },
  { app: 'STATS.EXE', foot: 'THE RECEIPTS' },
]
const AVATAR = ['bg-[#e0583a]', 'bg-[#7a6ff0]', 'bg-[#2f9c63]', 'bg-[#c79f4f]']

const REDUCE =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function WorkedWith() {
  const left = awards.slice(0, 2)
  const right = awards.slice(2)
  return (
    <section className="relative overflow-hidden py-24">
      <div className="wrap relative">
        <div className="text-center">
          <div className="mono text-[0.9rem] text-[color:var(--color-ink-soft)]">
            proof that i play well with others
          </div>
          <h2 className="mono mt-1 text-xl font-bold text-[color:var(--color-orange)]">
            WORKED WITH · WON WITH
          </h2>
        </div>

        <div className="mt-10 grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
          <div className="flex flex-col gap-4 lg:items-end">
            {left.map((a, i) => (
              <Comment key={a.id} award={a} avatar={AVATAR[i % AVATAR.length]} side="left" />
            ))}
          </div>

          <Console />

          <div className="flex flex-col gap-4">
            {right.map((a, i) => (
              <Comment key={a.id} award={a} avatar={AVATAR[(i + 2) % AVATAR.length]} side="right" />
            ))}
          </div>
        </div>

        {/* technical toolbar */}
        <div className="mt-12 flex justify-center">
          <div className="mono flex items-center gap-4 rounded-full border border-dashed border-[color:var(--color-line)] px-5 py-2 text-[0.6rem] tracking-[0.15em] text-[color:var(--color-ink-soft)]">
            <IconGlobe />
            <span>DSGN·DEPT</span>
            <span>XIV</span>
            <span className="font-bold">CE</span>
            <span className="hidden sm:inline">DIGITAL_DESIGN_ARTIFACTS</span>
            <span className="text-[color:var(--color-orange)]">MAKE MORE · CRY LESS</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Console() {
  const [screen, setScreen] = useState(0)
  const [height, setHeight] = useState('auto')
  const pausedRef = useRef(false)
  const contentRef = useRef(null)
  const reduce = useReducedMotion()

  // Auto-cycle the cartridges, pausing on hover/focus and for reduced motion.
  useEffect(() => {
    if (REDUCE) return
    const id = setInterval(() => {
      if (!pausedRef.current) setScreen((s) => (s + 1) % SCREENS.length)
    }, 4200)
    return () => clearInterval(id)
  }, [])

  // Track the active cartridge's natural height so the screen morphs to it.
  useLayoutEffect(() => {
    const el = contentRef.current
    if (!el) return
    const measure = () => setHeight(el.offsetHeight)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const go = (i) => setScreen(((i % SCREENS.length) + SCREENS.length) % SCREENS.length)
  const pause = () => (pausedRef.current = true)
  const resume = () => (pausedRef.current = false)
  const fade = { duration: reduce ? 0 : 0.3, ease: [0.4, 0, 0.2, 1] }

  return (
    <div
      className="relative mx-auto w-full max-w-md"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={resume}
    >
      <span aria-hidden className="float-a absolute -left-6 top-6 text-3xl">
        🦋
      </span>
      <span aria-hidden className="float-b absolute -right-5 bottom-10 text-3xl">
        🌊
      </span>

      <div className="relative rounded-[30px] bg-gradient-to-b from-[color:var(--color-green)] to-[color:var(--color-green-deep)] p-3.5 shadow-[0_22px_50px_-18px_rgba(47,156,99,0.7)]">
        <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-white/10" />
        <div className="absolute -left-2 top-1/2 h-20 w-4 -translate-y-1/2 rounded-full bg-[color:var(--color-green-deep)]" />
        <div className="absolute -right-2 top-1/2 h-20 w-4 -translate-y-1/2 rounded-full bg-[color:var(--color-green-deep)]" />

        {/* screen — click / arrow keys switch cartridge */}
        <div
          role="button"
          tabIndex={0}
          aria-label={`Console — showing ${SCREENS[screen].app}. Activate to switch.`}
          onClick={() => go(screen + 1)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') {
              e.preventDefault()
              go(screen - 1)
            } else if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              go(screen + 1)
            }
          }}
          className="relative cursor-pointer select-none rounded-[20px] bg-[#14161f] p-5 outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-[color:var(--color-green)]"
        >
          {/* screen header */}
          <div className="mono mb-4 flex items-center justify-between text-[0.6rem] tracking-[0.2em] text-white/45">
            <motion.span key={screen} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={fade}>
              {SCREENS[screen].app}
            </motion.span>
            <span className="flex items-center gap-1.5">
              {SCREENS.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Show ${SCREENS[i].app}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    go(i)
                  }}
                  className={`h-1.5 w-1.5 rounded-full transition ${
                    i === screen ? 'bg-[color:var(--color-green)]' : 'bg-white/25 hover:bg-white/50'
                  }`}
                />
              ))}
            </span>
          </div>

          {/* cartridge content — the screen morphs to each layout's height
              while the content cross-fades and scrolls between cartridges */}
          <motion.div
            animate={{ height }}
            transition={reduce ? { duration: 0 } : { duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden"
          >
            <div ref={contentRef}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={screen}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={reduce ? { duration: 0 } : { duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                >
                  {screen === 0 && (
                    <div className="grid grid-cols-2 gap-2.5">
                      {ROSTER.map((r, i) => (
                        <div
                          key={r}
                          className={`flex min-h-[54px] items-center justify-center rounded-lg bg-white/5 px-2 text-center ${
                            i === 0 ? 'col-span-2' : ''
                          }`}
                        >
                          <span className="display text-[0.95rem] leading-tight text-[#f4f1ea]">
                            {r}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  {screen === 1 && (
                    <div className="grid grid-cols-2 gap-2">
                      {TOOLS.map((t) => (
                        <div
                          key={t}
                          className="flex min-h-[42px] items-center justify-center rounded-lg bg-white/5 px-2 text-center"
                        >
                          <span className="mono text-[0.72rem] leading-tight text-[#f4f1ea]">
                            {t}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  {screen === 2 && (
                    <div className="grid grid-cols-2 gap-2.5">
                      {STATS.map((s) => (
                        <div
                          key={s.l}
                          className="flex min-h-[78px] flex-col items-center justify-center rounded-lg bg-white/5"
                        >
                          <span className="display text-2xl text-[color:var(--color-pop)]">{s.v}</span>
                          <span className="mono mt-0.5 text-[0.6rem] uppercase tracking-[0.15em] text-white/50">
                            {s.l}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* footer */}
          <div className="mono mt-4 flex items-center justify-between text-[0.6rem] text-white/40">
            <motion.span key={screen} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={fade}>
              {SCREENS[screen].foot}
            </motion.span>
            <span className="text-[color:var(--color-green)]">tap ▸</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Comment({ award, avatar, side }) {
  return (
    <div
      className={`group w-full max-w-xs rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-card-hi)] p-3.5 shadow-[0_10px_26px_-14px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_18px_36px_-16px_rgba(0,0,0,0.45)] ${
        side === 'left' ? 'rounded-bl-sm' : 'rounded-br-sm'
      }`}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={`grid h-7 w-7 place-items-center rounded-full text-[0.7rem] font-bold text-white ${avatar}`}
        >
          {award.detail.split(' ')[0].slice(0, 1)}
        </span>
        <div className="min-w-0">
          <div className="mono truncate text-[0.72rem] font-bold text-[color:var(--color-ink)]">
            {award.title}
          </div>
          <div className="mono text-[0.62rem] text-[color:var(--color-ink-soft)]">{award.detail}</div>
        </div>
      </div>
      <p className="mono mt-2 text-[0.72rem] leading-snug text-[color:var(--color-ink)]">{award.note}</p>
      {award.photo && (
        <div className="mt-2.5 overflow-hidden rounded-xl border border-[color:var(--color-line)]">
          <img
            src={asset(award.photo)}
            alt={award.title}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.parentElement.style.display = 'none'
            }}
            className="h-28 w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
        </div>
      )}
    </div>
  )
}

function IconGlobe() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </svg>
  )
}
