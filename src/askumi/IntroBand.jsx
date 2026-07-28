import { useEffect, useRef, useState } from 'react'
import { identity, atAGlance } from '../data/content.js'
import { TechLabel, Asterisk } from './bits.jsx'

// Per-card accents, cycling the site palette (orange · blue · green).
const ACCENTS = [
  'var(--color-orange)',
  'var(--color-pop)',
  'var(--color-green)',
  'var(--color-orange)',
  'var(--color-pop)',
]

const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// The recruiter substance that used to sit in the hero: the one-line pitch,
// the differentiator, and the five at-a-glance facts. Sits just below the
// landing card so the first scroll lands on the promise.
export default function IntroBand() {
  return (
    <section id="about" className="wrap scroll-mt-6 pt-20 pb-10">
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <div>
          <TechLabel index="00">the promise</TechLabel>
          <h2 className="display mt-3 text-[2.4rem] leading-[0.98] sm:text-[3.2rem]">
            {identity.heroLine}
          </h2>
        </div>
        <p className="mono text-[0.9rem] leading-relaxed text-[color:var(--color-ink-soft)]">
          {identity.heroSub}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {atAGlance.map((item, i) => (
          <StatCard key={item.label} item={item} accent={ACCENTS[i % ACCENTS.length]} />
        ))}
      </div>

      <div className="mt-8 flex items-center gap-3">
        <Asterisk size={14} className="text-[color:var(--color-orange)]" />
        <div className="rule flex-1" />
      </div>
    </section>
  )
}

// A card that reacts on desktop (tilts toward the cursor, lifts) and on mobile
// (the accent bar sweeps in and it lifts as it scrolls into view, plus a tap
// press). `active` drives the accent bar + shadow so it works with touch too.
function StatCard({ item, accent }) {
  const ref = useRef(null)
  const [active, setActive] = useState(false)

  // On touch/coarse-pointer devices, reveal the interaction on scroll-in.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const coarse = window.matchMedia('(hover: none)').matches
    if (!coarse || !ref.current) return
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.6 },
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  const tiltTo = (clientX, clientY) => {
    if (reduceMotion || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const px = (clientX - r.left) / r.width - 0.5
    const py = (clientY - r.top) / r.height - 0.5
    ref.current.style.transform = `perspective(620px) rotateX(${(-py * 9).toFixed(2)}deg) rotateY(${(px * 9).toFixed(2)}deg) translateY(-4px)`
  }
  const clearTilt = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <div
      ref={ref}
      onMouseEnter={() => setActive(true)}
      onMouseMove={(e) => tiltTo(e.clientX, e.clientY)}
      onMouseLeave={() => {
        setActive(false)
        clearTilt()
      }}
      onTouchStart={(e) => {
        setActive(true)
        const t = e.touches[0]
        if (t) tiltTo(t.clientX, t.clientY)
      }}
      onTouchEnd={clearTilt}
      className="card card-hi relative overflow-hidden rounded-2xl p-3.5 transition-[transform,box-shadow] duration-200 ease-out will-change-transform"
      style={{
        boxShadow: active ? '0 18px 34px -18px rgba(0,0,0,0.45)' : undefined,
      }}
    >
      {/* accent bar sweeps in when active */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 origin-left transition-transform duration-300 ease-out"
        style={{ background: accent, transform: active ? 'scaleX(1)' : 'scaleX(0)' }}
      />
      <div className="tech" style={{ color: accent }}>
        {item.label}
      </div>
      <div
        className="mt-1.5 text-[0.82rem] font-semibold leading-snug transition-transform duration-200"
        style={{ transform: active ? 'translateX(2px)' : undefined }}
      >
        {item.value}
      </div>
    </div>
  )
}
