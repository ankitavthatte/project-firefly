import { projects, experiments, identity } from '../data/content.js'
import { TechLabel } from './bits.jsx'

const asset = (p) => `${import.meta.env.BASE_URL}${p}`

// Per-project presentation: a descriptive title, a category pill, and the
// media that fronts the card.
const WORK = {
  evalix: {
    title: 'REDESIGNING EVALIX AI, END TO END',
    category: 'Enterprise AI · UX',
  },
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
    <section id="work" className="relative overflow-hidden pt-6 pb-8">
      <div className="wrap">
        {/* header */}
        <div className="mb-7 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 className="display flex items-baseline gap-3 text-3xl sm:text-4xl">
            SELECTED WORKS
            <span className="mono text-base text-[color:var(--color-orange)]">[ {count} ]</span>
          </h2>
          <span className="mono text-[0.8rem] text-[color:var(--color-orange)]">
            [ the “i swear i know what i’m doing” archive ]
          </span>
        </div>

        <div className="flex flex-col gap-10">
          {projects.map((p, i) => (
            <WorkCard key={p.id} project={p} index={i + 1} side={i % 2 === 0 ? 'a' : 'b'} />
          ))}
          <MoreWorkCard index={count} />
        </div>
      </div>
    </section>
  )
}

function WorkCard({ project, index, side }) {
  const meta = WORK[project.id] || { title: project.name.toUpperCase(), category: project.kind }
  return (
    <div className="relative">
      <StickerCluster side={side} />

      <article className="relative z-10 rounded-[22px] bg-[color:var(--color-orange)] p-3 sm:p-4">
        {/* title bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-2 pb-3 pt-2 sm:px-3">
          <h3 className="mono text-[1.05rem] font-bold tracking-tight text-[color:var(--color-ink)] sm:text-[1.35rem]">
            <span>{index}.</span>
            {meta.title}
          </h3>
          <span className="mono rounded-full border border-[color:var(--color-ink)]/25 bg-[color:var(--color-card-hi)] px-3.5 py-1.5 text-[0.72rem] text-[color:var(--color-ink)]">
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
              className="h-[clamp(240px,42vw,460px)] w-full object-cover"
            />
          ) : (
            <SystemMap />
          )}

          {/* caption bar over the media bottom */}
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
        </div>
      </article>
    </div>
  )
}

// A stand-in "300+ screens" system diagram for the NDA flagship.
function SystemMap() {
  const nodes = Array.from({ length: 26 })
  return (
    <div className="relative h-[clamp(240px,42vw,460px)] w-full overflow-hidden bg-[color:var(--color-card-hi)]">
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

// The dark "more from the archive" card — the fourth entry.
function MoreWorkCard({ index }) {
  const named = experiments.filter((e) => e.note).slice(0, 6)
  return (
    <div className="relative">
      <article className="relative z-10 rounded-[22px] bg-[color:var(--color-ink)] p-6 text-[color:var(--color-paper)] sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="mono text-[1.05rem] font-bold tracking-tight sm:text-[1.35rem]">
            <span>{index}.</span>MORE FROM THE ARCHIVE
          </h3>
          {behance && (
            <a
              className="mono rounded-full border border-white/30 px-3.5 py-1.5 text-[0.72rem] transition hover:bg-white hover:text-[color:var(--color-ink)]"
              href={behance}
              target="_blank"
              rel="noreferrer"
            >
              Full archive ↗
            </a>
          )}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {named.map((e) => (
            <div
              key={e.name}
              className="rounded-2xl border border-white/15 bg-white/5 p-4 transition hover:border-[color:var(--color-orange)]"
            >
              <div className="display text-lg">{e.name}</div>
              <div className="mono mt-1 text-[0.72rem] text-[color:var(--color-paper)]/70">{e.note}</div>
            </div>
          ))}
        </div>
      </article>
    </div>
  )
}

// Playful cut-outs scattered in the card margins (desktop only, decorative).
function StickerCluster({ side }) {
  const left =
    side === 'a'
      ? ['👻', '🚧', '✦']
      : ['🌐', '💀', '✦']
  const right =
    side === 'a'
      ? ['🌐', '💎', '💀']
      : ['👻', '💎', '🚧']
  return (
    <>
      <div className="pointer-events-none absolute -left-16 top-1/2 z-0 hidden -translate-y-1/2 flex-col gap-10 xl:flex">
        {left.map((s, i) => (
          <span
            key={i}
            className={`float-${i % 2 === 0 ? 'a' : 'b'} text-3xl`}
            style={{ '--r': `${(i - 1) * 12}deg`, transform: `rotate(${(i - 1) * 12}deg)` }}
          >
            {s}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute -right-16 top-1/2 z-0 hidden -translate-y-1/2 flex-col items-end gap-10 xl:flex">
        {right.map((s, i) => (
          <span
            key={i}
            className={`float-${i % 2 === 0 ? 'b' : 'a'} text-3xl`}
            style={{ '--r': `${(1 - i) * 12}deg`, transform: `rotate(${(1 - i) * 12}deg)` }}
          >
            {s}
          </span>
        ))}
      </div>
    </>
  )
}
