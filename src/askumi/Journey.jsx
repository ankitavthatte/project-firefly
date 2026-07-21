import { chapters } from '../data/content.js'

// "My Journey" — the career chapters as a hand of scattered, tilted cards.
// Each card straightens and lifts on hover; data comes from chapters in
// content.js (title, employer · dates, body).
const TILTS = [-7, 4, -3, 6, -5]
const LIFTS = [24, 0, 40, 8, 32]

export default function Journey() {
  return (
    <section id="journey" className="relative overflow-hidden py-16">
      <div className="wrap">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mono text-4xl font-bold tracking-tight sm:text-5xl">My Journey</h2>
          <p className="mono mx-auto mt-4 max-w-xl text-[0.9rem] leading-relaxed text-[color:var(--color-ink-soft)]">
            Ten years spent learning the same craft in two mediums — first
            buildings, now enterprise software. The medium changed; the mission
            didn’t:{' '}
            <span className="font-bold text-[color:var(--color-ink)]">
              making complex systems feel obvious.
            </span>
          </p>
        </div>

        {/* the hand of cards */}
        <div className="mt-12 flex flex-wrap items-start justify-center gap-2 sm:-space-x-6">
          {chapters.map((c, i) => (
            <article
              key={c.title}
              className="journey-card relative w-64 max-w-full rounded-[20px] border border-[color:var(--color-line)] bg-[color:var(--color-card-hi)] p-5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.65)] transition-transform duration-300 hover:z-10"
              style={{
                '--r': `${TILTS[i % TILTS.length]}deg`,
                transform: `rotate(${TILTS[i % TILTS.length]}deg)`,
                marginTop: `${LIFTS[i % LIFTS.length]}px`,
              }}
            >
              {c.detail && (
                <div className="flex items-baseline justify-between gap-2">
                  <span className="display text-[1.05rem] leading-tight">
                    {c.detail.split('·')[0].trim()}
                  </span>
                  {c.detail.includes('·') && (
                    <span className="mono shrink-0 text-[0.62rem] text-[color:var(--color-ink-soft)]">
                      {c.detail.split('·').slice(1).join('·').trim()}
                    </span>
                  )}
                </div>
              )}

              <h3
                className={`mono text-[0.95rem] font-bold text-[color:var(--color-orange)] ${
                  c.detail ? 'mt-2' : ''
                }`}
              >
                {c.title}
              </h3>

              <p className="mono mt-2 text-[0.76rem] leading-relaxed text-[color:var(--color-ink-soft)]">
                {c.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
