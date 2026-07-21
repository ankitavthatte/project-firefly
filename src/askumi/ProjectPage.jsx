import { projects, experiments, identity } from '../data/content.js'
import { Asterisk, TechLabel } from './bits.jsx'

const asset = (p) => `${import.meta.env.BASE_URL}${p}`
const behance = identity.links.find((l) => l.label === 'Behance')?.href

// Resolve a work id to its data — case studies first, then experiments.
export function findWork(id) {
  return (
    projects.find((p) => p.id === id && !p.hidden) || experiments.find((e) => e.id === id) || null
  )
}

export default function ProjectPage({ item }) {
  const subtitle = item.tagline || item.note
  const intro = item.summary || item.intro
  return (
    <div className="grain relative z-10 min-h-full">
      {/* nav */}
      <nav className="wrap flex items-center justify-between pt-6">
        <a
          href="#top"
          className="inline-flex items-center gap-2 rounded-full border-2 border-[color:var(--color-ink)] bg-[color:var(--color-card-hi)] px-4 py-2 font-extrabold tracking-tight"
        >
          <Asterisk size={18} />
          <span className="text-base">ANKITA</span>
        </a>
        <a href="#/works" className="pill pill-ghost">
          ← All work
        </a>
      </nav>

      <article className="wrap max-w-3xl pb-20 pt-10">
        {/* title block */}
        <TechLabel>{item.kind || 'Selected work'}</TechLabel>
        <h1 className="display mt-3 text-[2.6rem] leading-[0.98] sm:text-[3.6rem]">{item.name}</h1>
        {subtitle && (
          <p className="mono mt-3 text-[1rem] text-[color:var(--color-ink-soft)]">{subtitle}</p>
        )}

        {item.role && (
          <p className="mt-5 max-w-2xl leading-relaxed">
            <span className="mono text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--color-orange)]">
              My role —{' '}
            </span>
            {item.role}
          </p>
        )}

        {/* stats */}
        {item.stats?.length > 0 && (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {item.stats.map((s) => (
              <div key={s.label} className="card card-hi rounded-2xl p-4">
                <div className="display text-2xl text-[color:var(--color-orange)]">{s.value}</div>
                <div className="tech mt-1 normal-case tracking-normal leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* intro / summary */}
        {intro && <p className="mt-8 text-[1.1rem] leading-relaxed">{intro}</p>}

        {/* metaphor flavour */}
        {item.metaphor && (
          <p className="mono mt-3 text-[0.9rem] italic text-[color:var(--color-ink-soft)]">
            “{item.metaphor}”
          </p>
        )}

        {/* outcomes */}
        {item.outcomes?.length > 0 && (
          <div className="mt-8">
            <SectionLabel>Outcomes</SectionLabel>
            <ul className="mt-3 space-y-2">
              {item.outcomes.map((o, i) => (
                <li key={i} className="flex gap-3 leading-relaxed">
                  <span className="mt-1 text-[color:var(--color-orange)]">▸</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* chips */}
        {item.chips?.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-1.5">
            {item.chips.map((c) => (
              <span
                key={c}
                className="mono rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-card-hi)] px-2.5 py-1 text-[0.66rem]"
              >
                {c}
              </span>
            ))}
          </div>
        )}

        {/* story */}
        {item.story?.length > 0 && (
          <div className="mt-12 space-y-8">
            {item.story.map((s, i) => (
              <section key={i}>
                <SectionLabel index={String(i + 1).padStart(2, '0')}>{s.title}</SectionLabel>
                <p className="mt-3 max-w-2xl leading-relaxed">{s.body}</p>
              </section>
            ))}
          </div>
        )}

        {/* highlight */}
        {item.highlight && (
          <div className="mt-10 rounded-2xl bg-[color:var(--color-orange)] p-6 text-white">
            <div className="tech !text-white/80">Highlight</div>
            <p className="display mt-2 text-2xl leading-tight">{item.highlight}</p>
          </div>
        )}

        {/* NDA note */}
        {item.nda && (
          <div className="mt-10 rounded-2xl border border-dashed border-[color:var(--color-line)] p-6">
            <div className="tech text-[color:var(--color-orange)]">Under NDA</div>
            <p className="mt-2 leading-relaxed">{item.nda}</p>
            <a href={`mailto:${identity.email}`} className="pill mt-4">
              Ask for a walkthrough →
            </a>
          </div>
        )}

        {/* media */}
        {item.media?.length > 0 && (
          <div className="mt-12 space-y-10">
            <SectionLabel>The work</SectionLabel>
            {item.media.map((m, i) => (
              <Media key={i} media={m} name={item.name} />
            ))}
          </div>
        )}

        {/* pdf */}
        {item.pdfHref && (
          <a href={asset(item.pdfHref)} target="_blank" rel="noreferrer" className="pill mt-8">
            Read the full case study (PDF) ↗
          </a>
        )}

        {/* footer nav */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-[color:var(--color-line)] pt-8">
          <a href="#/works" className="pill pill-ghost">
            ← Back to all work
          </a>
          {behance && (
            <a href={behance} target="_blank" rel="noreferrer" className="pill">
              See more on Behance ↗
            </a>
          )}
        </div>
      </article>
    </div>
  )
}

function SectionLabel({ index, children }) {
  return (
    <h2 className="mono flex items-baseline gap-2 text-[1.1rem] font-bold">
      {index && <span className="text-[color:var(--color-orange)]">{index}</span>}
      {children}
    </h2>
  )
}

function Media({ media, name }) {
  if (media.type === 'video') {
    return (
      <figure>
        <video
          src={asset(media.src)}
          controls
          playsInline
          className="w-full rounded-2xl border border-[color:var(--color-line)]"
        />
        {media.caption && (
          <figcaption className="mono mt-2 text-[0.72rem] text-[color:var(--color-ink-soft)]">
            {media.caption}
          </figcaption>
        )}
      </figure>
    )
  }
  if (media.type === 'image') {
    return (
      <img
        src={asset(media.src)}
        alt={name}
        loading="lazy"
        className="w-full rounded-2xl border border-[color:var(--color-line)]"
      />
    )
  }
  // board — a stack of image slices (deck adds gaps between separate slides)
  return (
    <figure>
      {media.label && (
        <figcaption className="mono mb-3 text-[0.72rem] uppercase tracking-[0.15em] text-[color:var(--color-ink-soft)]">
          {media.label}
        </figcaption>
      )}
      <div
        className={`overflow-hidden rounded-2xl border border-[color:var(--color-line)] ${
          media.deck ? 'flex flex-col gap-3 border-0' : ''
        }`}
      >
        {media.srcs.map((src, i) => (
          <img
            key={i}
            src={asset(src)}
            alt={`${name} — ${i + 1}`}
            loading="lazy"
            className={`block w-full ${media.deck ? 'rounded-xl border border-[color:var(--color-line)]' : ''}`}
          />
        ))}
      </div>
    </figure>
  )
}
