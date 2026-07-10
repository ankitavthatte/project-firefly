import { AnimatePresence, motion } from 'framer-motion'
import { useStudio, TOTAL_CATS, GUIDED_PATH } from '../context/StudioContext.jsx'
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

/* Eleven paw slots — empty outlines beg to be filled. */
function PawSlots({ found }) {
  return (
    <span className="flex items-center gap-[3px]" aria-label={`${found} of ${TOTAL_CATS} hidden cats found`}>
      {Array.from({ length: TOTAL_CATS }, (_, i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
            i < found ? 'bg-coral' : 'border border-ink/25 bg-transparent'
          }`}
        />
      ))}
    </span>
  )
}

export default function ControlDock() {
  const { recruiterMode, setRecruiterMode, whyMode, setWhyMode, openModal, progress, discovered, catsFound, catToast, finale, setFinale } = useStudio()

  // The meter's job is direction, not a completion score: always surface the
  // next stop worth visiting (in the recommended order) and the reason to open
  // it. Once the whole path is seen we stop nudging and just acknowledge it.
  const nextStopIndex = GUIDED_PATH.findIndex((s) => !discovered.has(s.id))
  const nextStop = nextStopIndex === -1 ? null : GUIDED_PATH[nextStopIndex]

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

      {/* bottom-left: a directional nudge on small screens — the next stop to
          tap, not a bare completion score */}
      {!recruiterMode && nextStop && (
        <button
          type="button"
          onClick={(e) => openModal(nextStop.id, e)}
          className="fixed bottom-4 left-4 z-40 flex cursor-pointer items-center gap-2 rounded-full border border-coral/30 bg-paper/90 py-1.5 pl-1.5 pr-3 shadow-sm backdrop-blur-sm lg:hidden"
          aria-label={`Suggested next stop: ${nextStop.label} — ${nextStop.hint}`}
        >
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-coral text-[11px] font-extrabold text-white">
            {nextStopIndex + 1}
          </span>
          <span className="text-[11px] font-bold text-ink">Next: {nextStop.label}</span>
          <span aria-hidden="true" className="text-coral-deep">→</span>
        </button>
      )}
      {!recruiterMode && (
        <div className="fixed bottom-4 left-4 z-40 hidden w-60 rounded-2xl border border-ink/10 bg-paper/90 p-3 shadow-sm backdrop-blur-sm lg:block">
          {nextStop ? (
            <button
              type="button"
              onClick={(e) => openModal(nextStop.id, e)}
              className="group flex w-full cursor-pointer items-center gap-2.5 rounded-xl border border-coral/30 bg-coral/10 px-2.5 py-2 text-left transition hover:border-coral hover:bg-coral/20"
              aria-label={`Suggested next stop: ${nextStop.label} — ${nextStop.hint}`}
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-coral text-[11px] font-extrabold text-white">
                {nextStopIndex + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[9px] font-bold uppercase tracking-wide text-coral-deep">Next stop</span>
                <span className="block truncate text-[12px] font-extrabold leading-tight text-ink">{nextStop.label}</span>
                <span className="block truncate text-[10px] font-semibold text-ink-soft">{nextStop.hint}</span>
              </span>
              <span aria-hidden="true" className="shrink-0 text-coral-deep transition group-hover:translate-x-0.5">→</span>
            </button>
          ) : (
            <p className="px-0.5 text-[11px] font-bold text-ink">
              You’ve seen the whole path. {progress >= 100 ? 'And every corner — she likes that.' : 'Wander for the hidden bits.'}
            </p>
          )}
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-cream-deep" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="How much of the studio you’ve explored">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-coral via-sun to-mint"
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', stiffness: 60, damping: 16 }}
            />
          </div>
          <div className="mt-1 text-[10px] font-semibold text-ink-soft">
            {GUIDED_PATH.filter((s) => discovered.has(s.id)).length} of {GUIDED_PATH.length} key stops seen
          </div>
          {catsFound.size > 0 && (
            <div className="mt-1.5 flex items-center justify-between">
              <span className="text-[10px] font-bold text-coral-deep">🐾 rescue squad</span>
              <PawSlots found={catsFound.size} />
            </div>
          )}
          <WhyTag className="mt-2">{whyNotes.progress}</WhyTag>
        </div>
      )}

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

      {/* cat found toast */}
      <AnimatePresence>
        {catToast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            role="status"
            className="fixed bottom-6 left-1/2 z-[60] w-[min(92vw,380px)] -translate-x-1/2 rounded-2xl border border-coral/30 bg-paper p-4 shadow-[0_16px_40px_-12px_rgba(53,50,45,0.4)]"
          >
            {catToast.all ? (
              <div className="text-center">
                <div className="text-2xl" aria-hidden="true">🐈🐈‍⬛🐈🐈‍⬛🐈</div>
                <p className="mt-1 font-hand text-2xl font-bold text-coral-deep">You met the whole rescue squad.</p>
                <p className="mt-1 text-xs font-semibold text-ink-soft">
                  All 11 cats found — that’s the kind of thoroughness this studio was built for.
                </p>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-coral/15 text-xl" aria-hidden="true">🐾</span>
                <div>
                  <p className="text-sm font-bold text-ink">Cat found {catToast.index}/{TOTAL_CATS}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-ink-soft">{catToast.fact}</p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
