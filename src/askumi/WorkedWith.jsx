import { awards, identity } from '../data/content.js'

// Where the work happened + the receipts. A translucent green "console"
// holds the roster; real award mentions arrive as comment bubbles.
const ROSTER = ['Cloud.in', 'Hostin Services', 'Evalix AI', 'Tamarind Studio', 'Venkatramanan Assoc.']
const AVATAR = ['bg-[#e0583a]', 'bg-[#7a6ff0]', 'bg-[#2f9c63]', 'bg-[#c79f4f]']

export default function WorkedWith() {
  const left = awards.slice(0, 2)
  const right = awards.slice(2)
  return (
    <section className="relative overflow-hidden py-14">
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
          {/* left comments */}
          <div className="flex flex-col gap-4 lg:items-end">
            {left.map((a, i) => (
              <Comment key={a.id} award={a} avatar={AVATAR[i % AVATAR.length]} side="left" />
            ))}
          </div>

          {/* console */}
          <div className="relative mx-auto w-full max-w-md">
            <span aria-hidden className="float-a absolute -left-6 top-6 text-3xl">🦋</span>
            <span aria-hidden className="float-b absolute -right-5 bottom-10 text-3xl">🌊</span>

            <div className="relative rounded-[30px] bg-gradient-to-b from-[color:var(--color-green)] to-[color:var(--color-green-deep)] p-3.5 shadow-[0_22px_50px_-18px_rgba(47,156,99,0.7)]">
              {/* translucent shine */}
              <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-white/10" />
              <div className="absolute -left-2 top-1/2 h-20 w-4 -translate-y-1/2 rounded-full bg-[color:var(--color-green-deep)]" />
              <div className="absolute -right-2 top-1/2 h-20 w-4 -translate-y-1/2 rounded-full bg-[color:var(--color-green-deep)]" />

              <div className="relative rounded-[20px] bg-[color:var(--color-ink)] p-5">
                <div className="mono mb-4 flex items-center justify-between text-[0.6rem] tracking-[0.2em] text-white/45">
                  <span>ROSTER.EXE</span>
                  <span className="text-[color:var(--color-green)]">● ● ●</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {ROSTER.map((r, i) => (
                    <div
                      key={r}
                      className={`flex min-h-[54px] items-center justify-center rounded-lg bg-white/5 px-2 text-center ${
                        i === 0 ? 'col-span-2' : ''
                      }`}
                    >
                      <span className="display text-[0.95rem] leading-tight text-[color:var(--color-paper)]">
                        {r}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mono mt-4 text-center text-[0.6rem] text-white/40">
                  10+ YEARS · ARCHITECTURE → PRODUCT
                </div>
              </div>
            </div>
          </div>

          {/* right comments */}
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

function Comment({ award, avatar, side }) {
  return (
    <div
      className={`w-full max-w-xs rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-card-hi)] p-3.5 shadow-[0_10px_26px_-14px_rgba(0,0,0,0.35)] ${
        side === 'left' ? 'rounded-bl-sm' : 'rounded-br-sm'
      }`}
    >
      <div className="flex items-center gap-2.5">
        <span className={`grid h-7 w-7 place-items-center rounded-full text-[0.7rem] font-bold text-white ${avatar}`}>
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
