import { AnimatePresence, motion } from 'framer-motion'
import { useStudio } from '../context/StudioContext.jsx'
import WhyTag from './shared/WhyTag.jsx'
import { whyNotes } from '../data/content.js'

function Toggle({ pressed, onToggle, label, children }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-label={label}
      onClick={onToggle}
      className={`flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-bold transition-all ${
        pressed
          ? 'border-ink bg-ink text-cream shadow-sm'
          : 'border-ink/10 bg-paper/70 text-ink-soft backdrop-blur-sm hover:border-ink/30 hover:text-ink'
      }`}
    >
      {children}
    </button>
  )
}

export default function ControlDock() {
  const { recruiterMode, setRecruiterMode, whyMode, setWhyMode, openModal, finale, setFinale } = useStudio()

  return (
    <>
      {/* top-right controls — one clear primary (the 2-minute tour), then a
          plain-language format switch and a quiet design-notes toggle. The
          coral is spent on the single best action, so it can't read as decor. */}
      <div className="fixed top-4 right-4 z-40 flex flex-wrap items-center justify-end gap-2">
        {/* PRIMARY — the fastest way through the whole portfolio */}
        <button
          type="button"
          onClick={(e) => openModal('speedrun', e)}
          className="flex cursor-pointer items-center gap-1.5 rounded-full bg-coral px-4 py-2 text-xs font-bold text-white shadow-md transition hover:bg-coral-deep"
        >
          <span aria-hidden="true">⚡</span> See it in 2 minutes
        </button>

        {/* SECONDARY — how you'd rather read it; no self-identification required */}
        <div
          className="flex items-center rounded-full border border-ink/15 bg-paper/90 p-1 shadow-sm backdrop-blur-sm"
          role="group"
          aria-label="How to view the portfolio"
        >
          <button
            type="button"
            onClick={() => setRecruiterMode(false)}
            aria-pressed={!recruiterMode}
            className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
              !recruiterMode ? 'bg-ink text-cream shadow' : 'text-ink-soft hover:text-ink'
            }`}
          >
            Explore
          </button>
          <button
            type="button"
            onClick={() => setRecruiterMode(true)}
            aria-pressed={recruiterMode}
            title="A plain, one-page version — everything important in a single scroll"
            className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
              recruiterMode ? 'bg-ink text-cream shadow' : 'text-ink-soft hover:text-ink'
            }`}
          >
            Summary
          </button>
        </div>

        {/* TERTIARY — reveal the reasoning behind each choice */}
        <Toggle pressed={whyMode} onToggle={() => setWhyMode(!whyMode)} label="Toggle design notes — annotations explaining the thinking behind each design choice">
          <span aria-hidden="true">✎</span> Design notes
        </Toggle>
      </div>
      <WhyTag className="fixed top-16 right-4 z-40">{whyNotes.recruiter}</WhyTag>

      {/* the finale — fires once, when the whole room has been explored */}
      <AnimatePresence>
        {finale && !recruiterMode && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 160, damping: 18 }}
            role="status"
            className="fixed top-20 left-1/2 z-[55] w-[min(94vw,460px)] -translate-x-1/2 rounded-3xl border border-sun/50 bg-paper p-6 text-center shadow-[0_24px_60px_-16px_rgba(53,50,45,0.45)]"
          >
            <div className="text-2xl" aria-hidden="true">✦ 🐈 ✦</div>
            <p className="mt-2 text-lg font-extrabold tracking-tight">You explored the whole studio.</p>
            <p className="mt-1.5 font-hand text-2xl leading-snug text-coral-deep">
              “Thanks for exploring my little corner of the internet.”
            </p>
            <p className="mt-2 text-xs leading-relaxed font-semibold text-ink-soft">
              People who look this closely at things tend to build great products.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={(e) => {
                  setFinale(false)
                  openModal('contact', e)
                }}
                className="cursor-pointer rounded-full bg-coral px-6 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-coral-deep"
              >
                Let’s talk ✈
              </button>
              <button
                type="button"
                onClick={() => setFinale(false)}
                className="cursor-pointer rounded-full border border-ink/15 bg-cream px-5 py-2.5 text-sm font-bold text-ink transition hover:border-ink/40"
              >
                Keep wandering
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
