import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useStudio, DISCOVERABLES } from '../../context/StudioContext.jsx'
import { identity, whyNotes } from '../../data/content.js'
import { getPuneSeason } from '../../data/season.js'
import WhyTag from '../shared/WhyTag.jsx'
import JourneyGuide from '../JourneyGuide.jsx'
import {
  LaptopSvg,
  NotebookSvg,
  MugSvg,
  TrophyShelfSvg,
  BookshelfSvg,
  CatSvg,
  PassportSvg,
  PlantSvg,
  LampSvg,
  PaperPlaneSvg,
  DrawerSvg,
  CalendarSvg,
} from './objectSvgs.jsx'

const NUDGE_LABELS = {
  laptop: 'the laptop',
  notebook: 'the notebook',
  trophy: 'the trophy shelf',
  mug: 'the coffee mug',
  passport: 'the passport',
  bookshelf: 'the bookshelf',
  drawer: 'the desk drawer',
  calendar: 'the desk calendar',
  contact: 'the paper plane',
}

/* One interactive object in the room. The object IS the navigation. */
function StudioObject({ id, label, why, style, onOpen, children, labelSide = 'top', settleDelay = 0, peek = false }) {
  const [active, setActive] = useState(false)
  const [peeking, setPeeking] = useState(false)
  const { discovered, night } = useStudio()
  const seen = discovered.has(id)
  const reduce = useReducedMotion()
  const lit = night && active // the torch found this object — it steps out of the dusk

  // First-visit only: once the room has settled, each object introduces itself
  // by flashing its label — so a newcomer sees these are named doors, not decor.
  // Staggered off settleDelay so the room doesn't shout every name at once.
  useEffect(() => {
    if (!peek) return
    const show = setTimeout(() => setPeeking(true), settleDelay * 1000 + 500)
    const hide = setTimeout(() => setPeeking(false), settleDelay * 1000 + 3000)
    return () => {
      clearTimeout(show)
      clearTimeout(hide)
    }
  }, [peek, settleDelay])

  const labelShown = active || peeking

  return (
    <motion.div
      className={`absolute ${lit ? 'z-[21]' : ''}`}
      style={style}
      data-tour-id={id}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: settleDelay, type: 'spring', stiffness: 120, damping: 14 }}
    >
      {lit && (
        <div
          className="pointer-events-none absolute -inset-8 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,233,179,0.55), rgba(255,233,179,0.18) 55%, transparent 75%)', filter: 'blur(6px)' }}
          aria-hidden="true"
        />
      )}
      <WhyTag className={`absolute -top-2 left-1/2 w-max -translate-x-1/2 -translate-y-full`}>{why}</WhyTag>
      <motion.button
        type="button"
        aria-label={`${label}${seen ? ' (explored)' : ''}`}
        onClick={onOpen}
        onHoverStart={() => setActive(true)}
        onHoverEnd={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        className="relative block w-full cursor-pointer border-none bg-transparent p-0"
        whileHover={reduce ? {} : { y: -6, scale: 1.03 }}
        whileTap={reduce ? {} : { scale: 0.97, y: -2 }}
        transition={{ type: 'spring', stiffness: 320, damping: 18 }}
      >
        {/* resting breathe — desynced per object via a negative start delay */}
        <div className="breathe" style={{ animationDelay: `${-settleDelay}s` }}>
          {children(active, seen)}
        </div>
        {/* floating label */}
        <AnimatePresence>
          {labelShown && (
            <motion.span
              initial={{ opacity: 0, y: labelSide === 'top' ? 6 : -6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 24 }}
              className={`pointer-events-none absolute left-1/2 z-30 -translate-x-1/2 rounded-full bg-ink px-3.5 py-1.5 text-xs font-bold whitespace-nowrap text-cream shadow-lg ${
                labelSide === 'top' ? '-top-3 -translate-y-full' : '-bottom-3 translate-y-full'
              }`}
            >
              {label}
              {!seen && <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-coral align-middle" />}
            </motion.span>
          )}
        </AnimatePresence>
        {/* unexplored dot */}
        {!seen && !labelShown && (
          <span className="absolute -top-1 right-0 block h-2.5 w-2.5 rounded-full bg-coral shadow-[0_0_0_3px_rgba(255,246,234,0.9)]" aria-hidden="true" />
        )}
      </motion.button>
    </motion.div>
  )
}

/* Monsoon rain streaking down the window glass. */
export function WindowRain({ heavy = false }) {
  const drops = Array.from({ length: heavy ? 16 : 11 }, (_, i) => ({
    left: `${(i * 9 + 4) % 100}%`,
    delay: `${((i * 0.43) % 1.9).toFixed(2)}s`,
    dur: `${(1.5 + (i % 5) * 0.22).toFixed(2)}s`,
  }))
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {drops.map((d, i) => (
        <span
          key={i}
          className="raindrop absolute top-0 h-[18%] w-[2px]"
          style={{ left: d.left, animationDelay: d.delay, animationDuration: d.dur }}
        />
      ))}
    </div>
  )
}

/* The window: Pune's real season by day, a firefly dusk after the lamp clicks.
   The sun and moon actually rise and set behind the hills on each switch. */
const SEASON_SKY = {
  monsoon: 'from-[#8ba7b7] via-[#a7bfc9] to-[#c6d6da]',
  summer: 'from-[#79aad9] to-[#e2ecf7]',
  winter: 'from-[#cbdcf0] to-[#eaf2f5]',
  clear: 'from-sky to-[#e2ecf7]',
}

function StudioWindow({ night, season }) {
  const reduce = useReducedMotion()
  // CSS transitions (not JS tweens) so the rise runs on the compositor,
  // stays 60fps, and survives background-tab throttling.
  const rise = (up, setOffset) => ({
    transform: up ? 'translate(0px, 0px)' : setOffset,
    transition: reduce ? 'none' : 'transform 1.9s cubic-bezier(0.3, 0.6, 0.3, 1)',
  })
  const monsoon = season === 'monsoon'
  return (
    <div
      className="absolute z-[21] overflow-hidden rounded-2xl border-[10px] border-wood-deep shadow-[inset_0_0_30px_rgba(53,50,45,0.15),0_14px_30px_-12px_rgba(53,50,45,0.3)]"
      style={{ left: '41%', top: '14%', width: '25%', aspectRatio: '1.45' }}
    >
      {/* day layer — sky, clouds and light follow Pune's season */}
      <div className={`absolute inset-0 bg-gradient-to-b ${SEASON_SKY[season]} transition-opacity duration-1000 ${night ? 'pointer-events-none opacity-0' : 'opacity-100'}`}>
        {/* the sun rises at dawn, sets at dusk — bolder in summer, hiding in monsoon */}
        <div
          className={`absolute top-[12%] right-[14%] h-[18%] w-[13%] rounded-full ${
            monsoon
              ? 'bg-[#f3e9cf] opacity-40 shadow-[0_0_16px_4px_rgba(243,233,207,0.3)]'
              : season === 'summer'
                ? 'bg-sun shadow-[0_0_38px_16px_rgba(255,201,77,0.7)]'
                : season === 'winter'
                  ? 'bg-[#f6e2a4] shadow-[0_0_20px_8px_rgba(255,233,179,0.45)]'
                  : 'bg-sun shadow-[0_0_28px_10px_rgba(255,201,77,0.55)]'
          }`}
          style={rise(!night, 'translate(-26px, 230px)')}
        />
        <div className={`cloud absolute top-[16%] left-0 h-[14%] w-[26%] rounded-full ${monsoon ? 'bg-[#6e8494]/90' : 'bg-white/90'}`} style={{ animationDuration: monsoon ? '26s' : '38s' }} />
        <div className={`cloud absolute top-[36%] left-0 h-[10%] w-[18%] rounded-full ${monsoon ? 'bg-[#7d93a1]/80' : 'bg-white/70'}`} style={{ animationDuration: monsoon ? '34s' : '52s', animationDelay: '-18s' }} />
        <div className={`cloud absolute top-[8%] left-0 h-[9%] w-[15%] rounded-full ${monsoon ? 'bg-[#657c8c]/90' : 'bg-white/80'}`} style={{ animationDuration: monsoon ? '30s' : '46s', animationDelay: '-32s' }} />
        {monsoon && (
          <div className="cloud absolute top-[24%] left-0 h-[12%] w-[22%] rounded-full bg-[#5f7686]/80" style={{ animationDuration: '28s', animationDelay: '-10s' }} />
        )}
        {/* no paper planes in the rain */}
        {!monsoon && (
          <svg className="planefly absolute top-[30%] left-0 h-[12%]" viewBox="0 0 40 24">
            <path d="M2 14 L38 4 L20 22 Z" fill="#ffffff" stroke="#c9c2b4" strokeWidth="1" />
          </svg>
        )}
        <div className={`absolute bottom-0 left-[-10%] h-[34%] w-[70%] rounded-t-full ${monsoon ? 'bg-[#2f6e57]/90' : 'bg-mint-deep/70'}`} />
        <div className={`absolute right-[-14%] bottom-0 h-[42%] w-[74%] rounded-t-full ${monsoon ? 'bg-[#3c8a6e]/90' : 'bg-mint/80'}`} />
        {/* winter haze over the hills */}
        {season === 'winter' && (
          <div className="mist absolute bottom-[16%] left-[-6%] h-[16%] w-[112%] rounded-full bg-white/50 blur-[6px]" aria-hidden="true" />
        )}
        {monsoon && <WindowRain heavy />}
      </div>

      {/* night layer — fireflies over dark hills */}
      <div className={`absolute inset-0 bg-gradient-to-b from-[#2b2850] via-[#4a3b6b] to-[#8a5a7a] transition-opacity duration-1000 ${night ? 'opacity-100' : 'opacity-0'} ${night ? '' : 'pointer-events-none'}`}>
        {/* the moon rises at dusk, sets at dawn */}
        <div
          className="absolute top-[14%] right-[16%] h-[15%] w-[11%] rounded-full bg-[#faf0d9] shadow-[0_0_22px_8px_rgba(255,243,214,0.4)]"
          style={rise(night, 'translate(24px, 230px)')}
        />
        {/* stars */}
        {[
          ['18%', '12%', '0s'], ['32%', '24%', '1.1s'], ['55%', '10%', '2.2s'],
          ['70%', '28%', '0.6s'], ['10%', '34%', '1.7s'], ['46%', '30%', '2.8s'],
        ].map(([l, t, d], i) => (
          <span key={i} className="twinkle absolute h-1 w-1 rounded-full bg-white/90" style={{ left: l, top: t, animationDelay: d }} />
        ))}
        {/* shooting stars — brief streaks with long quiet gaps between them */}
        {night &&
          [
            ['12%', '10%', '1.5s', '11s'],
            ['48%', '6%', '5.8s', '15s'],
            ['30%', '20%', '10.2s', '19s'],
          ].map(([l, t, d, dur], i) => (
            <span
              key={i}
              className="shoot absolute h-[2px] w-12"
              style={{ left: l, top: t, animationDelay: d, animationDuration: dur }}
            />
          ))}
        <div className="absolute bottom-0 left-[-10%] h-[34%] w-[70%] rounded-t-full bg-[#1f3a33]" />
        <div className="absolute right-[-14%] bottom-0 h-[42%] w-[74%] rounded-t-full bg-[#28473d]" />
        {/* fireflies — the studio's namesake */}
        {night &&
          [
            ['24%', '58%', '0s', '7s'], ['48%', '66%', '1.4s', '9s'], ['66%', '54%', '2.6s', '8s'],
            ['36%', '74%', '0.8s', '10s'], ['78%', '70%', '2s', '7.5s'], ['14%', '70%', '3.2s', '8.5s'],
          ].map(([l, t, d, dur], i) => (
            <span key={i} className="firefly absolute h-1.5 w-1.5" style={{ left: l, top: t, animationDelay: d, animationDuration: dur }} />
          ))}
        {/* monsoon nights are rainy too — fireflies love them */}
        {monsoon && night && <WindowRain />}
      </div>

      {/* frame cross bars */}
      <div className="absolute top-0 left-1/2 h-full w-[7px] -translate-x-1/2 bg-wood-deep" />
      <div className="absolute top-1/2 left-0 h-[7px] w-full -translate-y-1/2 bg-wood-deep" />
    </div>
  )
}

/* A small placard on the window: it's Pune out there. The window quietly
   follows Pune's real season (and rains in monsoon); this just names the place. */
function PuneClimateTag() {
  return (
    <div
      className="pointer-events-none absolute left-[53.5%] top-[32.5%] z-[24] -translate-x-1/2"
      aria-label="The window shows Pune, India"
    >
      <span className="flex items-center gap-1.5 rounded-full border border-ink/10 bg-paper/85 px-3 py-1 font-hand text-lg whitespace-nowrap text-ink-soft shadow-sm backdrop-blur-sm">
        <span aria-hidden="true">📍</span>
        Pune
      </span>
    </div>
  )
}

/* Dust motes drifting in the light (day only). */
function DustMotes() {
  const motes = [
    { left: '46%', top: '46%', d: '0s', dur: '9s' },
    { left: '52%', top: '52%', d: '2.4s', dur: '11s' },
    { left: '58%', top: '44%', d: '4.8s', dur: '8s' },
    { left: '43%', top: '55%', d: '6.2s', dur: '10s' },
    { left: '62%', top: '50%', d: '1.2s', dur: '12s' },
  ]
  return (
    <div aria-hidden="true">
      {motes.map((m, i) => (
        <span
          key={i}
          className="mote absolute h-1 w-1 rounded-full bg-sun/80"
          style={{ left: m.left, top: m.top, animationDelay: m.d, animationDuration: m.dur }}
        />
      ))}
    </div>
  )
}

/* A few fireflies wander INTO the room at night. */
function RoomFireflies() {
  const flies = [
    ['30%', '40%', '0.5s', '9s'], ['70%', '35%', '2s', '8s'], ['55%', '48%', '3.5s', '10s'], ['22%', '52%', '1.2s', '7.5s'],
  ]
  return (
    <div className="pointer-events-none absolute inset-0 z-[22]" aria-hidden="true">
      {flies.map(([l, t, d, dur], i) => (
        <span key={i} className="firefly absolute h-1.5 w-1.5" style={{ left: l, top: t, animationDelay: d, animationDuration: dur }} />
      ))}
    </div>
  )
}

/* The resident cat: opens an eye when you come close, sometimes stretches,
   sometimes wanders — and gently points out what you haven't explored yet. */
function DeskCat() {
  const { discovered, progress, night, afterHours } = useStudio()
  const reduce = useReducedMotion()
  const [eyeOpen, setEyeOpen] = useState(false)
  const [stretching, setStretching] = useState(false)
  const [offset, setOffset] = useState(0)
  const [prints, setPrints] = useState([])
  const [nudge, setNudge] = useState(null)
  const printId = useRef(0)

  // Late visitors get a sleepy welcome: the studio already matched their hour.
  useEffect(() => {
    if (!afterHours) return
    const show = setTimeout(() => setNudge('psst… it’s evening in Pune. flip the desk lamp for the night studio 🌙'), 1800)
    const hide = setTimeout(() => setNudge(null), 11000)
    return () => {
      clearTimeout(show)
      clearTimeout(hide)
    }
  }, [afterHours])

  // Ambient behavior loop
  useEffect(() => {
    if (reduce) return
    let alive = true
    const tick = () => {
      if (!alive) return
      const roll = Math.random()
      if (roll < 0.4) {
        setStretching(true)
        setTimeout(() => alive && setStretching(false), 1400)
      } else if (roll < 0.75) {
        setOffset((prev) => {
          const next = Math.max(-30, Math.min(70, prev + (Math.random() > 0.5 ? 55 : -55)))
          const base = printId.current
          const trail = [0, 1, 2].map((i) => ({ id: base + i, x: prev + (next - prev) * (i / 3) }))
          printId.current += 3
          setPrints((p) => [...p.slice(-6), ...trail])
          setTimeout(() => alive && setPrints((p) => p.filter((pr) => pr.id >= base + 3)), 5000)
          return next
        })
      }
      schedule()
    }
    let t
    const schedule = () => {
      t = setTimeout(tick, 14000 + Math.random() * 14000)
    }
    schedule()
    return () => {
      alive = false
      clearTimeout(t)
    }
  }, [reduce])

  // Idle nudge: after 25s of stillness, the cat wakes and suggests a door.
  useEffect(() => {
    let timer
    let hide
    const arm = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        const remaining = DISCOVERABLES.filter((d) => !discovered.has(d))
        if (remaining.length > 0) {
          setNudge(`psst… you haven’t opened ${NUDGE_LABELS[remaining[0]]} yet.`)
        } else {
          return
        }
        setEyeOpen(true)
        hide = setTimeout(() => {
          setNudge(null)
          setEyeOpen(false)
        }, 7000)
      }, 25000)
    }
    const reset = () => {
      setNudge(null)
      clearTimeout(hide)
      arm()
    }
    arm()
    window.addEventListener('pointerdown', reset)
    window.addEventListener('keydown', reset)
    return () => {
      clearTimeout(timer)
      clearTimeout(hide)
      window.removeEventListener('pointerdown', reset)
      window.removeEventListener('keydown', reset)
    }
  }, [discovered, progress])

  return (
    <div className="absolute" style={{ left: '80.5%', top: '56.5%', width: '12.5%' }}>
      <WhyTag className="absolute -top-3 left-1/2 w-max -translate-x-1/2 -translate-y-full">{whyNotes.cat}</WhyTag>
      {/* idle whisper */}
      <AnimatePresence>
        {nudge && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="absolute -top-4 left-1/2 z-30 w-max max-w-52 -translate-x-1/2 -translate-y-full rounded-2xl rounded-br-sm bg-paper px-4 py-2.5 font-hand text-lg leading-tight text-ink shadow-[0_10px_28px_-10px_rgba(53,50,45,0.5)]"
            role="status"
          >
            {nudge}
          </motion.div>
        )}
      </AnimatePresence>
      {/* paw prints */}
      <AnimatePresence>
        {prints.map((p) => (
          <motion.span
            key={p.id}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6 }}
            className="absolute bottom-1 text-[10px]"
            style={{ left: `calc(50% + ${p.x}px)` }}
            aria-hidden="true"
          >
            🐾
          </motion.span>
        ))}
      </AnimatePresence>
      <motion.button
        type="button"
        aria-label="Miso, the studio cat — one of Ankita’s 11 rescues. Say hello."
        onClick={() => {
          setNudge('meow.')
          setTimeout(() => setNudge((n) => (n === 'meow.' ? null : n)), 2400)
        }}
        onHoverStart={() => setEyeOpen(true)}
        onHoverEnd={() => setEyeOpen(false)}
        onFocus={() => setEyeOpen(true)}
        onBlur={() => setEyeOpen(false)}
        className="block w-full cursor-pointer border-none bg-transparent p-0"
        animate={{ x: offset }}
        transition={{ type: 'spring', stiffness: 40, damping: 14 }}
        whileTap={{ scale: 0.96 }}
      >
        <CatSvg eyeOpen={eyeOpen} stretching={stretching} night={night} />
      </motion.button>
    </div>
  )
}

/* The laptop: magnetic pull, then a real boot ON the object before the modal. */
function MagneticLaptop({ onOpen, peek = false }) {
  const { discovered, night } = useStudio()
  const reduce = useReducedMotion()
  const [active, setActive] = useState(false)
  const [peeking, setPeeking] = useState(false)
  const [booting, setBooting] = useState(false)
  const lit = night && active
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 140, damping: 16 })
  const sy = useSpring(my, { stiffness: 140, damping: 16 })
  const ref = useRef(null)
  const seen = discovered.has('laptop')

  // First-visit label flash (see StudioObject) — the laptop leads the stagger.
  useEffect(() => {
    if (!peek) return
    const show = setTimeout(() => setPeeking(true), 900)
    const hide = setTimeout(() => setPeeking(false), 3400)
    return () => {
      clearTimeout(show)
      clearTimeout(hide)
    }
  }, [peek])
  const labelShown = active && !booting ? true : peeking && !booting

  const onMove = (e) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 12)
    my.set(((e.clientY - r.top) / r.height - 0.5) * 8)
  }
  const reset = () => {
    mx.set(0)
    my.set(0)
    setActive(false)
  }
  const handleClick = (e) => {
    if (reduce || booting) {
      onOpen(e)
      return
    }
    // Anticipation: the screen wakes before the world opens.
    const point = { clientX: e.clientX, clientY: e.clientY }
    setBooting(true)
    setTimeout(() => {
      setBooting(false)
      onOpen(point)
    }, 430)
  }

  return (
    <motion.div
      className="absolute z-[22]"
      style={{ left: '38.5%', top: '45%', width: '21%', transformOrigin: 'center' }}
      data-tour-id="laptop"
      initial={reduce ? { scale: 1.9 } : { opacity: 0, y: 16, scale: 1.9 }}
      animate={{ opacity: 1, y: 0, scale: 1.9 }}
      transition={{ delay: 0.55, type: 'spring', stiffness: 120, damping: 14 }}
    >
      {lit && (
        <div
          className="pointer-events-none absolute -inset-8 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,233,179,0.55), rgba(255,233,179,0.18) 55%, transparent 75%)', filter: 'blur(6px)' }}
          aria-hidden="true"
        />
      )}
      <WhyTag className="absolute -top-2 left-1/2 w-max -translate-x-1/2 -translate-y-full">{whyNotes.laptop}</WhyTag>
      <motion.button
        ref={ref}
        type="button"
        aria-label={`Laptop — open Ankita’s projects and case studies${seen ? ' (explored)' : ''}`}
        onClick={handleClick}
        onMouseMove={onMove}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={reset}
        onFocus={() => setActive(true)}
        onBlur={reset}
        style={{ x: sx, y: sy }}
        whileTap={{ scale: 0.97 }}
        className="relative block w-full cursor-pointer border-none bg-transparent p-0"
      >
        <div className="breathe" style={{ animationDelay: '-0.55s' }}>
          <LaptopSvg active={active} seen={seen} booting={booting} />
        </div>
        <AnimatePresence>
          {labelShown && (
            <motion.span
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="pointer-events-none absolute -top-2 left-1/2 z-30 -translate-x-1/2 -translate-y-full rounded-full bg-ink px-4 py-1.5 text-xs font-bold whitespace-nowrap text-cream shadow-lg"
            >
              Projects & Case Studies
              {!seen && <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-coral align-middle" />}
            </motion.span>
          )}
        </AnimatePresence>
        {!seen && !labelShown && (
          <span className="absolute top-0 right-2 block h-2.5 w-2.5 rounded-full bg-coral shadow-[0_0_0_3px_rgba(255,246,234,0.9)]" aria-hidden="true" />
        )}
      </motion.button>
    </motion.div>
  )
}

export default function StudioScene() {
  const { openModal, night, setNight, finale } = useStudio()
  const reduce = useReducedMotion()
  const [season] = useState(() => getPuneSeason())
  // The room feels freshly left for the first few seconds: steam still rising.
  const [justArrived, setJustArrived] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setJustArrived(false), 9000)
    return () => clearTimeout(t)
  }, [])

  // On the very first visit, the room introduces its doors: each object flashes
  // its label once, in a stagger, so nothing has to be hovered to be found.
  // One-time — returning visitors already know the objects open.
  const [peek, setPeek] = useState(false)
  useEffect(() => {
    let hinted = false
    try {
      hinted = localStorage.getItem('ff-labels-hinted') === '1'
    } catch {
      /* private mode — the hint simply plays again next time */
    }
    if (hinted) return
    setPeek(true)
    try {
      localStorage.setItem('ff-labels-hinted', '1')
    } catch { /* ignore */ }
    const t = setTimeout(() => setPeek(false), 6000)
    return () => clearTimeout(t)
  }, [])

  // After dark the pointer carries a torch. Position rides on CSS variables so
  // mousemove never re-renders React — the mask and glow read them directly.
  const sceneRef = useRef(null)
  const [torchOn, setTorchOn] = useState(false)

  // The scene is one fixed viewport — scrolling does nothing, silently. The
  // first wheel attempt gets a gentle answer instead of dead air. Once per
  // visit; wheel over an open modal never reaches this handler (siblings).
  const [scrollNudge, setScrollNudge] = useState(false)
  const scrollNudged = useRef(false)
  const onScrollAttempt = (e) => {
    if (scrollNudged.current || Math.abs(e.deltaY) < 15) return
    scrollNudged.current = true
    setScrollNudge(true)
    setTimeout(() => setScrollNudge(false), 4500)
  }
  const onTorchMove = (e) => {
    const el = sceneRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--torch-x', `${e.clientX - r.left}px`)
    el.style.setProperty('--torch-y', `${e.clientY - r.top}px`)
    // Relight on movement, not just on entry: closing a modal steals the
    // pointerenter/leave pair, so entry alone would leave the torch off.
    setTorchOn(true)
  }
  const torch = night && torchOn

  return (
    <motion.div
      ref={sceneRef}
      // cursor hides only while the torch is actually rendered — never strand
      // the visitor pointer-less (e.g. arriving after hours, mouse at rest)
      className={`relative h-full min-h-[640px] w-full overflow-hidden ${torch ? 'torch-zone' : ''}`}
      role="region"
      aria-label="Ankita’s interactive studio. Every object opens a part of the portfolio."
      animate={finale && !reduce ? { scale: [1, 1.015, 1] } : {}}
      transition={{ duration: 1.4, ease: 'easeInOut' }}
      onPointerMove={onTorchMove}
      onPointerEnter={() => setTorchOn(true)}
      onPointerLeave={() => setTorchOn(false)}
      onWheel={onScrollAttempt}
    >
      {/* wall */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-cream" aria-hidden="true" />
      {/* sunbeam from the window (day only) */}
      <div
        className={`absolute transition-opacity duration-1000 ${night ? 'opacity-0' : 'opacity-40'}`}
        style={{
          left: '38%',
          top: '18%',
          width: '32%',
          height: '55%',
          background: 'linear-gradient(195deg, rgba(255,201,77,0.35), rgba(255,201,77,0))',
          filter: 'blur(18px)',
          transform: 'skewX(-8deg)',
        }}
        aria-hidden="true"
      />
      {/* desk — a warm wood surface seen slightly from above */}
      <div className="absolute right-0 bottom-0 left-0 h-[38%]" aria-hidden="true">
        <div className="h-[6%] bg-[#a8763f]" />
        <div className="h-[94%] bg-gradient-to-b from-[#e8b478] via-wood to-[#c08a4e]" />
        <div className="absolute top-[24%] right-0 left-0 h-px bg-[#a87137]/40" />
        <div className="absolute top-[52%] right-0 left-0 h-px bg-[#a87137]/30" />
        <div className="absolute top-[78%] right-0 left-0 h-px bg-[#a87137]/40" />
        <div className="absolute top-[12%] left-[36%] h-[48%] w-[27%] rounded-[50%/40%] bg-[#8f6335]/12 blur-[3px]" />
      </div>

      {/* hero copy */}
      <div className="absolute left-[5%] top-[11%] z-10 w-[33%] max-w-xl">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="font-hand text-2xl text-coral-deep"
        >
          Ankita Thatte · Senior Product Designer · Pune
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="mt-1 text-[clamp(1.5rem,2.5vw,2.3rem)] leading-tight font-extrabold tracking-tight text-ink"
        >
          {identity.heroLine}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-3 max-w-sm text-base leading-relaxed text-ink-soft"
        >
          {identity.heroSub}
        </motion.p>
        <JourneyGuide className="mt-4" />
        <WhyTag className="mt-3">{whyNotes.studio}</WhyTag>
      </div>

      <DustMotes />

      {/* wall pieces */}
      <StudioObject
        id="bookshelf"
        label="My Journey, in Chapters"
        why={whyNotes.bookshelf}
        style={{ right: '5%', top: '6%', width: '13.5%' }}
        onOpen={(e) => openModal('bookshelf', e)}
        labelSide="bottom"
        settleDelay={0.7}
      >
        {() => <BookshelfSvg />}
      </StudioObject>

      <StudioObject
        id="trophy"
        label="Awards & Recognition"
        why={whyNotes.trophy}
        style={{ right: '4.5%', top: '27%', width: '16.5%' }}
        onOpen={(e) => openModal('trophy', e)}
        labelSide="bottom"
        settleDelay={0.8}
      >
        {(a, s) => <TrophyShelfSvg active={a} seen={s} />}
      </StudioObject>

      {/* desk decor */}
      <motion.div
        className="absolute sway"
        style={{ left: '0.5%', top: '38%', width: '9.5%' }}
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 120, damping: 14 }}
      >
        <PlantSvg />
      </motion.div>

      {/* the lamp is a real light switch — Project Firefly's signature moment.
          It sits above the dusk overlay so it stays lit when everything else dims. */}
      <motion.div
        className="absolute z-[23]"
        style={{ right: '0.5%', top: '38%', width: '10%' }}
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, type: 'spring', stiffness: 120, damping: 14 }}
      >
        <WhyTag className="absolute -top-2 left-1/2 w-max -translate-x-1/2 -translate-y-full">{whyNotes.lamp}</WhyTag>
        <motion.button
          type="button"
          aria-pressed={night}
          aria-label={night ? 'Desk lamp — switch the studio back to daytime' : 'Desk lamp — dim the studio to evening'}
          onClick={() => setNight(!night)}
          whileHover={reduce ? {} : { rotate: -3 }}
          whileTap={{ scale: 0.95 }}
          className="group relative block w-full cursor-pointer border-none bg-transparent p-0"
        >
          <LampSvg night={night} />
          <span className="pointer-events-none absolute -top-1 left-1/2 z-30 -translate-x-1/2 -translate-y-full rounded-full bg-ink px-3.5 py-1.5 text-xs font-bold whitespace-nowrap text-cream opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            {night ? 'Lights on' : 'Try the lamp'}
          </span>
        </motion.button>
      </motion.div>

      <StudioObject
        id="notebook"
        label="Design Process"
        why={whyNotes.notebook}
        style={{ left: '12%', top: '58%', width: '13.5%' }}
        onOpen={(e) => openModal('notebook', e)}
        settleDelay={0.65}
      >
        {(a, s) => <NotebookSvg active={a} seen={s} />}
      </StudioObject>

      <StudioObject
        id="passport"
        label="Travel & Inspiration"
        why={whyNotes.passport}
        style={{ left: '12%', top: '81%', width: '11%' }}
        onOpen={(e) => openModal('passport', e)}
        settleDelay={0.85}
      >
        {(a) => <PassportSvg active={a} />}
      </StudioObject>

      <MagneticLaptop onOpen={(e) => openModal('laptop', e)} peek={peek} />

      <StudioObject
        id="mug"
        label="About Ankita"
        why={whyNotes.mug}
        style={{ left: '73%', top: '73%', width: '6.5%' }}
        onOpen={(e) => openModal('mug', e)}
        settleDelay={0.75}
      >
        {(a, s) => <MugSvg active={a || justArrived} seen={s} />}
      </StudioObject>

      {/* the desk calendar — always on this month's page */}
      <StudioObject
        id="calendar"
        label="This Month in the Studio"
        why={whyNotes.calendar}
        style={{ left: '74%', top: '60%', width: '5.5%' }}
        onOpen={(e) => openModal('calendar', e)}
        settleDelay={1.0}
      >
        {(a) => <CalendarSvg active={a} />}
      </StudioObject>

      <StudioObject
        id="contact"
        label="Send a Message"
        why={whyNotes.plane}
        style={{ left: '80%', top: '82%', width: '10%' }}
        onOpen={(e) => openModal('contact', e)}
        settleDelay={1.1}
        peek={peek}
      >
        {(a) => <PaperPlaneSvg active={a} />}
      </StudioObject>

      {/* the drawer — half-visible at the desk edge, impossible to ignore */}
      <StudioObject
        id="drawer"
        label="What’s in the drawer?"
        why={whyNotes.drawer}
        style={{ left: '58%', bottom: '-1.5%', width: '9%' }}
        onOpen={(e) => openModal('drawer', e)}
        settleDelay={1.2}
        peek={peek}
      >
        {(a, s) => <DrawerSvg active={a} seen={s} />}
      </StudioObject>

      <DeskCat />

      {/* dusk falls over everything below this line — the torch burns a hole in it */}
      <div
        className={`pointer-events-none absolute inset-0 z-20 bg-[#2b2547] mix-blend-multiply transition-opacity duration-1000 ${
          night ? 'opacity-60' : 'opacity-0'
        }`}
        style={
          torch
            ? {
                WebkitMaskImage:
                  'radial-gradient(circle 170px at var(--torch-x, 50%) var(--torch-y, 45%), rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,1) 100%)',
                maskImage:
                  'radial-gradient(circle 170px at var(--torch-x, 50%) var(--torch-y, 45%), rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,1) 100%)',
              }
            : undefined
        }
        aria-hidden="true"
      />
      {/* the torch itself: a warm pool of light, and the little light that casts it */}
      {torch && (
        <>
          <div
            className="pointer-events-none absolute inset-0 z-[22]"
            style={{
              background:
                'radial-gradient(circle 170px at var(--torch-x, 50%) var(--torch-y, 45%), rgba(255,233,179,0.22), rgba(255,233,179,0.07) 55%, transparent 75%)',
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute z-[40] w-12"
            style={{ left: 'var(--torch-x, 50%)', top: 'var(--torch-y, 45%)', transform: 'translate(-10px, -10px)' }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 48 48" className="w-full overflow-visible">
              {/* body, held from the bottom-right corner of the screen-verse */}
              <g transform="rotate(45 10 10)">
                <rect x="3.5" y="10" width="13" height="9.5" rx="2.5" fill="#e0583a" />
                <rect x="6.5" y="19.5" width="7" height="17" rx="3.2" fill="#524e47" />
                <rect x="6.5" y="23" width="7" height="2.4" fill="#2c2823" />
              </g>
              {/* lens, glowing right at the pointer tip */}
              <circle cx="10" cy="10" r="6" fill="#f6e2a4" />
              <circle cx="10" cy="10" r="9" fill="none" stroke="#f6e2a4" strokeOpacity="0.45" strokeWidth="2" />
            </svg>
          </div>
        </>
      )}
      <StudioWindow night={night} season={season} />
      {/* always-on: names the place the window looks out on */}
      <PuneClimateTag />
      {/* the window's why-note lives just below the placard */}
      <WhyTag className="absolute left-[53.5%] top-[38%] z-[24] w-max max-w-56 -translate-x-1/2">{whyNotes.window}</WhyTag>
      {night && <RoomFireflies />}

      {/* answer the first scroll attempt — the page isn't broken, it's a room.
          Plain CSS fade (not framer): always mounted so the transition runs
          both ways, and -translate-x-1/2 stays intact for true centering. */}
      <p
        role="status"
        aria-hidden={!scrollNudge}
        className={`pointer-events-none absolute bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full bg-ink/90 px-5 py-2.5 font-hand text-xl text-cream shadow-lg transition-opacity duration-300 ${
          scrollNudge ? 'opacity-100' : 'opacity-0'
        }`}
      >
        no scrolling needed — the whole portfolio fits on this desk
      </p>
    </motion.div>
  )
}
