import { projects, experiments, identity } from '../data/content.js'

const asset = (p) => `${import.meta.env.BASE_URL}${p}`

// Per-project presentation: a descriptive title, a category pill, and the
// media that fronts the card.
const WORK = {
  evalix: { title: 'REDESIGNING EVALIX AI, END TO END', category: 'Enterprise AI · UX' },
  moneyminds: {
    title: 'GAMIFYING FINANCIAL LITERACY',
    category: 'Gamified product design',
    img: 'projects/moneyminds/intro.jpg',
  },
  shiftcare: {
    title: 'SCHEDULING HEALTHCARE WITHOUT THE CHAOS',
    category: 'Healthcare UX',
    img: 'projects/shiftcare/slide-17.jpg',
  },
}

const behance = identity.links.find((l) => l.label === 'Behance')?.href

export default function SelectedWorks() {
  const count = projects.length + 1
  return (
    <section id="work" className="relative pt-6 pb-8">
      <SideStickers />

      <div className="wrap relative z-10">
        {/* header */}
        <div className="mx-auto mb-7 flex max-w-4xl flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 className="display flex items-baseline gap-3 text-3xl sm:text-4xl">
            SELECTED WORKS
            <span className="mono text-base text-[color:var(--color-orange)]">[ {count} ]</span>
          </h2>
          <span className="mono text-[0.8rem] text-[color:var(--color-orange)]">
            [ the “i swear i know what i’m doing” archive ]
          </span>
        </div>

        {/* stacked cards */}
        <div className="mx-auto flex max-w-4xl flex-col">
          {projects.map((p, i) => (
            <WorkCard key={p.id} project={p} index={i + 1} orange={i % 2 === 0} stackIndex={i} />
          ))}
          <MoreWorkCard index={count} orange={projects.length % 2 === 0} stackIndex={projects.length} />
        </div>
      </div>
    </section>
  )
}

function WorkCard({ project, index, orange, stackIndex }) {
  const meta = WORK[project.id] || { title: project.name.toUpperCase(), category: project.kind }
  return (
    <a
      href={`#/work/${project.id}`}
      aria-label={`Open ${project.name} case study`}
      className={`stack-card cursor-hand-lg mb-5 block p-3 shadow-[0_-8px_30px_-18px_rgba(0,0,0,0.4)] transition-transform hover:-translate-y-0.5 sm:p-4 ${
        orange
          ? 'bg-[color:var(--color-orange)]'
          : 'border border-[color:var(--color-line)] bg-[color:var(--color-card-hi)]'
      }`}
      style={{ top: `${20 + stackIndex * 58}px` }}
    >
      {/* title bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-2 pb-3 pt-2 sm:px-3">
        <h3
          className={`mono text-[0.95rem] font-bold tracking-tight sm:text-[1.15rem] ${
            orange ? 'text-white' : 'text-[color:var(--color-ink)]'
          }`}
        >
          <span>{index}.</span>
          {meta.title}
        </h3>
        <span
          className={`mono rounded-full px-3.5 py-1.5 text-[0.72rem] text-[color:var(--color-ink)] ${
            orange
              ? 'border border-[color:var(--color-ink)]/25 bg-[color:var(--color-card-hi)]'
              : 'border border-[color:var(--color-line)] bg-[color:var(--color-paper)]'
          }`}
        >
          {meta.category}
        </span>
      </div>

      {/* media */}
      <div className="relative overflow-hidden rounded-[16px]">
        {meta.img ? (
          <img
            src={asset(meta.img)}
            alt={`${project.name} — ${project.tagline}`}
            loading="lazy"
            className="h-[clamp(170px,26vw,300px)] w-full object-cover"
          />
        ) : (
          <SystemMap />
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-2 bg-gradient-to-t from-black/60 to-transparent px-4 pb-3 pt-10">
          <span className="mono text-[0.78rem] text-white/95">{project.tagline}</span>
          <span className="mono hidden text-[0.66rem] text-white/70 sm:block">
            {project.chips.slice(0, 3).join(' · ')}
          </span>
        </div>

        {project.flagship && (
          <span className="mono absolute right-3 top-3 rounded-full bg-[color:var(--color-ink)] px-3 py-1 text-[0.62rem] text-[color:var(--color-paper)]">
            NDA · flagship
          </span>
        )}

        {/* open affordance */}
        <span className="mono absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-[0.62rem] text-[#161116]">
          Open case study ↗
        </span>
      </div>
    </a>
  )
}

function SystemMap() {
  const nodes = Array.from({ length: 26 })
  return (
    <div className="relative h-[clamp(170px,26vw,300px)] w-full overflow-hidden bg-[color:var(--color-card-hi)]">
      <svg viewBox="0 0 200 130" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <g stroke="var(--color-line)" strokeWidth="0.4">
          <path d="M100 65 L40 25 M100 65 L160 25 M100 65 L28 100 M100 65 L172 100 M100 65 L100 15 M100 65 L100 118" />
        </g>
        {nodes.map((_, i) => {
          const a = (i / nodes.length) * Math.PI * 2
          const r = 34 + (i % 4) * 11
          const x = 100 + Math.cos(a) * r
          const y = 65 + Math.sin(a) * (r * 0.6)
          return <circle key={i} cx={x} cy={y} r="2.8" fill="var(--color-ink)" opacity="0.5" />
        })}
        <circle cx="100" cy="65" r="8" fill="var(--color-orange)" />
      </svg>
      <div className="mono absolute left-4 top-4 text-[0.66rem] text-[color:var(--color-ink-soft)]">
        SYSTEM MAP · 300+ SCREENS · 2 PORTALS · 8 REPORTS
      </div>
    </div>
  )
}

function MoreWorkCard({ index, orange, stackIndex }) {
  const named = experiments.filter((e) => e.note).slice(0, 6)
  return (
    <article
      className={`stack-card mb-5 p-6 shadow-[0_-8px_30px_-18px_rgba(0,0,0,0.4)] sm:p-8 ${
        orange
          ? 'bg-[color:var(--color-orange)]'
          : 'border border-[color:var(--color-line)] bg-[color:var(--color-card-hi)]'
      }`}
      style={{ top: `${20 + stackIndex * 58}px` }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3
          className={`mono text-[0.95rem] font-bold tracking-tight sm:text-[1.15rem] ${
            orange ? 'text-white' : 'text-[color:var(--color-ink)]'
          }`}
        >
          <span>{index}.</span>COLLECTION OF SIDE PROJECTS
        </h3>
        {behance && (
          <a
            className="mono rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-paper)] px-3.5 py-1.5 text-[0.72rem] text-[color:var(--color-ink)] transition hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-paper)]"
            href={behance}
            target="_blank"
            rel="noreferrer"
          >
            Full archive ↗
          </a>
        )}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {named.map((e) => {
          const tile = (
            <>
              <div className="display text-lg">{e.name}</div>
              <div className="mono mt-1 text-[0.72rem] text-[color:var(--color-ink-soft)]">
                {e.note}
              </div>
              {e.id && (
                <div className="mono mt-2 text-[0.62rem] text-[color:var(--color-orange)]">
                  Open ↗
                </div>
              )}
            </>
          )
          const cls =
            'rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-paper)] p-4 transition hover:border-[color:var(--color-orange)]'
          return e.id ? (
            <a key={e.name} href={`#/work/${e.id}`} className={`cursor-hand-lg block ${cls}`}>
              {tile}
            </a>
          ) : (
            <div key={e.name} className={cls}>
              {tile}
            </div>
          )
        })}
      </div>
    </article>
  )
}

// Decorative cut-outs down both margins (desktop only).
function SideStickers() {
  const L = [
    { e: '👻', top: '8%' },
    { e: '🌐', top: '34%' },
    { e: '🚧', top: '58%' },
    { e: '✦', top: '82%' },
  ]
  const R = [
    { e: '👀', top: '10%' },
    { e: '🌀', top: '40%' },
    { e: '💀', top: '64%' },
    { e: '💎', top: '86%' },
  ]
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden xl:block">
      {L.map((s, i) => (
        <span
          key={i}
          className={`float-${i % 2 ? 'b' : 'a'} absolute text-4xl`}
          style={{ left: 'max(12px, calc(50% - 640px))', top: s.top, '--r': `${(i - 1) * 10}deg`, transform: `rotate(${(i - 1) * 10}deg)` }}
        >
          {s.e}
        </span>
      ))}
      {R.map((s, i) => (
        <span
          key={i}
          className={`float-${i % 2 ? 'a' : 'b'} absolute text-4xl`}
          style={{ right: 'max(12px, calc(50% - 640px))', top: s.top, '--r': `${(1 - i) * 10}deg`, transform: `rotate(${(1 - i) * 10}deg)` }}
        >
          {s.e}
        </span>
      ))}
    </div>
  )
}
