import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { faqs, contact, identity } from '../data/content.js'

const asset = (p) => `${import.meta.env.BASE_URL}${p}`

// "Start a Conversation" — the recruiter FAQ as tappable chat bubbles, with
// a direct-line contact card alongside.
export default function Conversation() {
  const [open, setOpen] = useState(() => new Set())
  const toggle = (i) =>
    setOpen((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })

  return (
    <section id="talk" className="wrap py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mono text-4xl font-bold tracking-tight sm:text-5xl">Start a Conversation</h2>
        <p className="mono mx-auto mt-4 max-w-xl text-[0.9rem] leading-relaxed text-[color:var(--color-ink-soft)]">
          No gatekeepers, just open channels — whether you want to talk enterprise
          UX, a design-systems deep-dive, or argue about the best way to onboard a
          nervous first-time user. Tap a question, or say hi directly.
        </p>
      </div>

      <div className="mt-10 grid items-start gap-6 lg:grid-cols-[1.25fr_0.9fr]">
        {/* chat bubbles */}
        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => {
            const isOpen = open.has(i)
            const accent = i % 3 === 1
            return (
              <div key={f.q} className="relative flex items-start gap-3">
                {i === 0 && (
                  <span aria-hidden className="float-a absolute -right-2 -top-3 text-2xl">
                    💗
                  </span>
                )}
                {i === faqs.length - 1 && (
                  <span aria-hidden className="float-b absolute -left-3 top-3 text-xl">
                    ⭐
                  </span>
                )}

                <div
                  className={`flex-1 overflow-hidden rounded-[20px] rounded-bl-md border p-4 transition-colors ${
                    accent
                      ? 'border-[#4f7bff]/45 bg-[#4f7bff]/12'
                      : 'border-[color:var(--color-line)] bg-[color:var(--color-card-hi)]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-3 text-left outline-none"
                  >
                    <span className="text-[0.95rem] font-medium leading-snug text-[color:var(--color-ink)]">
                      {f.q}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="mono mt-3 border-t border-[color:var(--color-line)] pt-3 text-[0.82rem] leading-relaxed text-[color:var(--color-ink-soft)]">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* +/× toggle */}
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-label={isOpen ? 'Collapse answer' : 'Expand answer'}
                  className={`mt-2 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition ${
                    accent
                      ? 'border-[#4f7bff] bg-[#4f7bff] text-white'
                      : 'border-[color:var(--color-line)] text-[color:var(--color-ink-soft)] hover:border-[color:var(--color-orange)] hover:text-[color:var(--color-orange)]'
                  }`}
                >
                  <span className={`text-lg leading-none transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
              </div>
            )
          })}
        </div>

        {/* contact card */}
        <div className="card card-hi brackets relative rounded-[22px] p-6 sm:p-7">
          <div className="tech text-[color:var(--color-orange)]">Direct line</div>
          <p className="mt-3 text-[1.05rem] leading-snug">{contact.headline}</p>

          <a href={`mailto:${identity.email}`} className="pill pill-orange mt-5">
            {contact.cta} →
          </a>

          <div className="mt-6 flex flex-wrap gap-2">
            {identity.links.map((l) => (
              <a
                key={l.label}
                className="pill pill-ghost"
                href={l.file ? asset(l.file) : l.href}
                {...(l.external || l.file ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                {l.label}
              </a>
            ))}
          </div>

          <p className="mono mt-6 border-t border-dashed border-[color:var(--color-line)] pt-4 text-[0.72rem] leading-relaxed text-[color:var(--color-ink-soft)]">
            {contact.goodbye}
          </p>
        </div>
      </div>
    </section>
  )
}
