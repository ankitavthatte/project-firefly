import { awards } from '../data/content.js'
import { TechLabel } from './bits.jsx'

// The places the work happened + the receipts. A green handheld "console"
// holds the roster; award mentions arrive as chat bubbles either side.
const ROSTER = [
  'Cloud.in / Hostin',
  'Evalix AI',
  'Tamarind Design Studio',
  'Venkatramanan Associates',
]

export default function WorkedWith() {
  const left = awards.slice(0, 2)
  const right = awards.slice(2)

  return (
    <section className="wrap py-10">
      <div className="text-center">
        <div className="mono text-[0.85rem] text-[color:var(--color-ink-soft)]">
          turns out i play well with others
        </div>
        <h2 className="mono mt-1 text-xl font-bold text-[color:var(--color-orange)]">
          WORKED WITH · WON WITH:
        </h2>
      </div>

      <div className="mt-8 grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
        {/* left bubbles */}
        <div className="flex flex-col gap-3 lg:items-end">
          {left.map((a) => (
            <Bubble key={a.id} award={a} side="left" />
          ))}
        </div>

        {/* console */}
        <div className="mx-auto w-full max-w-sm">
          <div className="relative rounded-[26px] bg-[color:var(--color-green)] p-3 shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
            {/* side grips */}
            <div className="absolute -left-2 top-1/2 h-16 w-4 -translate-y-1/2 rounded-full bg-[color:var(--color-green-deep)]" />
            <div className="absolute -right-2 top-1/2 h-16 w-4 -translate-y-1/2 rounded-full bg-[color:var(--color-green-deep)]" />
            <div className="rounded-[18px] bg-[color:var(--color-ink)] p-5">
              <div className="tech flex items-center justify-between !text-white/50">
                <span>ROSTER.APP</span>
                <span className="text-[color:var(--color-green)]">●●●</span>
              </div>
              <ul className="mt-4 space-y-2">
                {ROSTER.map((r, i) => (
                  <li
                    key={r}
                    className="mono flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-[0.78rem] text-[color:var(--color-paper)]"
                  >
                    <span>{r}</span>
                    <span className="text-[color:var(--color-green)]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mono mt-4 text-center text-[0.62rem] text-white/40">
                10+ YEARS · ARCHITECTURE → PRODUCT
              </div>
            </div>
          </div>
          <div className="mt-3 flex justify-center gap-1.5">
            {ROSTER.map((_, i) => (
              <span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-line)] first:bg-[color:var(--color-orange)]"
              />
            ))}
          </div>
        </div>

        {/* right bubbles */}
        <div className="flex flex-col gap-3">
          {right.map((a) => (
            <Bubble key={a.id} award={a} side="right" />
          ))}
        </div>
      </div>
    </section>
  )
}

function Bubble({ award, side }) {
  return (
    <div
      className={`card card-hi max-w-xs rounded-2xl p-3.5 ${
        side === 'left' ? 'rounded-br-sm' : 'rounded-bl-sm'
      }`}
    >
      <TechLabel>{award.detail}</TechLabel>
      <div className="mt-1.5 text-[0.9rem] font-bold leading-tight">{award.title}</div>
      <div className="mono mt-1 text-[0.72rem] leading-snug text-[color:var(--color-ink-soft)]">
        {award.note}
      </div>
    </div>
  )
}
