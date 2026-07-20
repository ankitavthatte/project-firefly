import { identity, atAGlance } from '../data/content.js'
import { TechLabel, Asterisk } from './bits.jsx'

// The recruiter substance that used to sit in the hero: the one-line pitch,
// the differentiator, and the five at-a-glance facts. Sits just below the
// landing card so the first scroll lands on the promise.
export default function IntroBand() {
  return (
    <section id="about" className="wrap scroll-mt-6 pt-14 pb-6">
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
        {atAGlance.map((item) => (
          <div key={item.label} className="card card-hi rounded-2xl p-3.5">
            <div className="tech text-[color:var(--color-orange)]">{item.label}</div>
            <div className="mt-1.5 text-[0.82rem] font-semibold leading-snug">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-3">
        <Asterisk size={14} className="text-[color:var(--color-orange)]" />
        <div className="rule flex-1" />
      </div>
    </section>
  )
}
