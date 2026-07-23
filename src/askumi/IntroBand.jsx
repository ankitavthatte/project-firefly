import { useRef } from 'react'
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

// A card that tilts toward the cursor in 3D, lifts, and reveals a coloured
// accent bar. Static on touch / reduced-motion.
function StatCard({ item, accent }) {
  const ref = useRef(null)

  const onMove = (e) => {
    if (reduceMotion || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ref.current.style.transform = `perspective(620px) rotateX(${(-py * 9).toFixed(2)}deg) rotateY(${(px * 9).toFixed(2)}deg) translateY(-4px)`
  }
  const reset = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="card card-hi group relative overflow-hidden rounded-2xl p-3.5 transition-[transform,box-shadow] duration-200 ease-out will-change-transform hover:shadow-[0_18px_34px_-18px_rgba(0,0,0,0.45)]"
    >
      {/* accent bar sweeps in from the left on hover */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
        style={{ background: accent }}
      />
      <div className="tech" style={{ color: accent }}>
        {item.label}
      </div>
      <div className="mt-1.5 text-[0.82rem] font-semibold leading-snug transition-transform duration-200 group-hover:translate-x-0.5">
        {item.value}
      </div>
    </div>
  )
}
