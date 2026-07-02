import { motion } from 'framer-motion'
import { identity, projects, awards, chapters, contact } from '../data/content.js'

const accent = {
  lavender: 'from-lavender/40 to-lavender/10 border-lavender/50',
  sun: 'from-sun/40 to-sun/10 border-sun/60',
  mint: 'from-mint/40 to-mint/10 border-mint/60',
}
const accentText = { lavender: 'text-lavender-deep', sun: 'text-sun-deep', mint: 'text-mint-deep' }

function Section({ title, children }) {
  return (
    <section className="mt-10">
      <h2 className="text-xs font-extrabold tracking-[0.2em] text-ink-soft uppercase">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  )
}

// Recruiter Mode: everything important, skimmable in one scroll, still warm.
export default function RecruiterView() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-3xl px-5 pt-20 pb-16 sm:px-8"
    >
      {/* header */}
      <header className="rounded-3xl bg-paper p-6 shadow-sm sm:p-8">
        <p className="font-hand text-2xl text-coral-deep">Hello, busy person. Here’s the short version.</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">{identity.name}</h1>
        <p className="mt-1.5 text-sm font-bold text-ink-soft">{identity.role} · {identity.location}</p>
        <p className="mt-4 text-lg leading-relaxed font-semibold text-ink">“{identity.positioning}”</p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          <a
            href={`mailto:${identity.email}`}
            className="rounded-full bg-coral px-5 py-2.5 text-sm font-extrabold text-white shadow-md transition hover:bg-coral-deep"
          >
            {contact.cta} ✈
          </a>
          {identity.links
            .filter((l) => l.label !== 'Email')
            .map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="rounded-full border border-ink/15 bg-cream px-5 py-2.5 text-sm font-extrabold text-ink transition hover:border-ink/40"
              >
                {l.label}
              </a>
            ))}
        </div>
      </header>

      <Section title="Selected Work">
        <div className="space-y-4">
          {projects.map((p) => (
            <article key={p.id} className={`rounded-2xl border bg-gradient-to-br p-5 sm:p-6 ${accent[p.color]}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-xl font-extrabold">{p.name}</h3>
                {p.flagship && (
                  <span className="rounded-full bg-ink px-3 py-1 text-[10px] font-extrabold tracking-wider text-cream uppercase">
                    Flagship
                  </span>
                )}
              </div>
              <p className={`text-sm font-bold ${accentText[p.color]}`}>{p.tagline}</p>
              <p className="mt-2.5 text-[15px] leading-relaxed text-ink">{p.summary}</p>
              <div className="mt-3.5 flex flex-wrap gap-x-5 gap-y-1.5">
                {p.stats.map((s) => (
                  <span key={s.label} className="text-xs font-semibold text-ink-soft">
                    <strong className="text-ink">{s.value}</strong> {s.label}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Experience & Journey">
        <ol className="space-y-2.5">
          {chapters.map((c, i) => (
            <li key={c.title} className="flex gap-3.5 rounded-xl bg-paper p-4">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cream-deep text-xs font-extrabold">{i + 1}</span>
              <div>
                <h3 className="text-sm font-extrabold">{c.title}</h3>
                <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">{c.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Achievements">
        <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {awards.map((a) => (
            <li key={a.id} className="flex items-center gap-3 rounded-xl bg-paper p-4">
              <span className="text-xl" aria-hidden="true">🏆</span>
              <div>
                <div className="text-sm font-extrabold">{a.title}</div>
                <div className="text-xs font-semibold text-ink-soft">{a.detail}</div>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Toolkit">
        <div className="flex flex-wrap gap-2">
          {identity.tools.map((t) => (
            <span key={t} className="rounded-lg border border-ink/10 bg-paper px-3 py-1.5 text-xs font-semibold">
              {t}
            </span>
          ))}
        </div>
      </Section>

      <footer className="mt-12 rounded-3xl bg-ink p-6 text-center text-cream sm:p-8">
        <p className="text-lg font-extrabold sm:text-xl">{contact.headline}</p>
        <a
          href={`mailto:${identity.email}`}
          className="mt-4 inline-block rounded-full bg-coral px-7 py-3 text-sm font-extrabold text-white shadow-lg transition hover:bg-coral-deep"
        >
          {identity.email}
        </a>
        <p className="mt-4 font-hand text-xl text-cream/80">
          Prefer the fun way? Switch back to Explore mode — the cat misses you already.
        </p>
      </footer>
    </motion.main>
  )
}
