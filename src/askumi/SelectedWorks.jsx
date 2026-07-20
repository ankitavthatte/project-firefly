import { projects, experiments, identity } from '../data/content.js'
import { TechLabel, Sticker } from './bits.jsx'

const asset = (p) => `${import.meta.env.BASE_URL}${p}`

// Which preview image (if any) fronts each case study.
const PREVIEW = {
  moneyminds: 'projects/moneyminds/intro.jpg',
  shiftcare: 'projects/shiftcare/slide-17.jpg',
}

// A behance link is the honest "see more" for the public case studies.
const behance = identity.links.find((l) => l.label === 'Behance')?.href

export default function SelectedWorks() {
  return (
    <section id="work" className="wrap relative pt-12 pb-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <h2 className="display text-3xl sm:text-4xl">SELECTED WORKS</h2>
        <TechLabel>how i’ve spent a decade in the design mines</TechLabel>
      </div>

      <div className="flex flex-col gap-5">
        {projects.map((p, i) => (
          <WorkCard key={p.id} project={p} index={i + 1} />
        ))}
        <MoreWorkCard index={projects.length + 1} />
      </div>
    </section>
  )
}

function WorkCard({ project, index }) {
  const flagship = project.flagship
  const preview = PREVIEW[project.id]

  return (
    <article
      className={`brackets relative overflow-hidden rounded-[22px] p-5 sm:p-7 ${
        flagship
          ? 'bg-[color:var(--color-card-hi)] border-[3px] border-[color:var(--color-orange)]'
          : 'card card-hi'
      }`}
    >
      {flagship && (
        <Sticker rot={-16} className="right-6 top-3" size="1.5rem">
          🏆
        </Sticker>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        {/* text column */}
        <div>
          <div className="flex items-center justify-between">
            <TechLabel index={String(index).padStart(2, '0')}>{project.kind}</TechLabel>
            {flagship ? (
              <span className="pill pill-orange pointer-events-none">Flagship</span>
            ) : behance ? (
              <a className="pill pill-ghost" href={behance} target="_blank" rel="noreferrer">
                View more ↗
              </a>
            ) : null}
          </div>

          <h3 className="display mt-3 text-[1.9rem] sm:text-[2.3rem]">{project.name}</h3>
          <p className="mono mt-2 text-[0.9rem] text-[color:var(--color-ink-soft)]">
            {project.tagline}
          </p>

          <p className="mt-4 text-[0.92rem] leading-relaxed">{project.summary}</p>

          {/* stats */}
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {project.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-dashed border-[color:var(--color-line)] px-3 py-2"
              >
                <div className="display text-lg text-[color:var(--color-orange)]">{s.value}</div>
                <div className="tech mt-0.5 leading-tight normal-case tracking-normal">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* chips */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.chips.slice(0, 6).map((c) => (
              <span
                key={c}
                className="mono rounded-full border border-[color:var(--color-line)] px-2.5 py-1 text-[0.66rem]"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* preview column */}
        <div className="relative">
          {preview ? (
            <img
              src={asset(preview)}
              alt={`${project.name} preview`}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-2xl border border-[color:var(--color-line)] object-cover"
            />
          ) : (
            <SystemMap />
          )}
          {flagship && (
            <span className="mono absolute bottom-3 left-3 rounded-full bg-[color:var(--color-ink)] px-3 py-1 text-[0.62rem] text-[color:var(--color-paper)]">
              NDA · walked through in a call
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

// A stand-in "300+ screens" system diagram for the NDA flagship.
function SystemMap() {
  const nodes = Array.from({ length: 24 })
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-paper-deep)]">
      <svg viewBox="0 0 200 150" className="absolute inset-0 h-full w-full">
        <g stroke="var(--color-line)" strokeWidth="0.5">
          <path d="M100 75 L40 30 M100 75 L160 30 M100 75 L30 110 M100 75 L170 110 M100 75 L100 20 M100 75 L100 130" />
        </g>
        <circle cx="100" cy="75" r="9" fill="var(--color-orange)" />
        {nodes.map((_, i) => {
          const a = (i / nodes.length) * Math.PI * 2
          const r = 42 + (i % 3) * 12
          const x = 100 + Math.cos(a) * r
          const y = 75 + Math.sin(a) * (r * 0.62)
          return <circle key={i} cx={x} cy={y} r="3.4" fill="var(--color-ink)" opacity="0.55" />
        })}
      </svg>
      <div className="mono absolute left-3 top-3 text-[0.62rem] text-[color:var(--color-ink-soft)]">
        SYSTEM MAP · 300+ SCREENS · 2 PORTALS
      </div>
    </div>
  )
}

// The dark "more experiments" card, echoing the reference's showreel panel.
function MoreWorkCard({ index }) {
  const named = experiments.filter((e) => e.note).slice(0, 6)
  return (
    <article className="brackets relative overflow-hidden rounded-[22px] bg-[color:var(--color-ink)] p-6 text-[color:var(--color-paper)] sm:p-8">
      <Sticker rot={10} className="right-8 top-5" size="1.4rem">
        ✨
      </Sticker>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <TechLabel index={String(index).padStart(2, '0')} className="!text-[color:var(--color-paper)]/70">
          more from the archive
        </TechLabel>
        {behance && (
          <a
            className="pill pill-ghost border-white text-white hover:bg-white hover:text-[color:var(--color-ink)]"
            href={behance}
            target="_blank"
            rel="noreferrer"
          >
            Full archive ↗
          </a>
        )}
      </div>

      <h3 className="display mt-4 text-[2.2rem] sm:text-[3rem]">MORE EXPERIMENTS</h3>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {named.map((e) => (
          <div
            key={e.name}
            className="rounded-2xl border border-white/15 bg-white/5 p-4 transition hover:border-[color:var(--color-orange)]"
          >
            <div className="display text-lg">{e.name}</div>
            <div className="mono mt-1 text-[0.72rem] text-[color:var(--color-paper)]/70">
              {e.note}
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}
