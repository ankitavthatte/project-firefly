import { AnimatePresence, motion } from 'framer-motion'
import { useStudio, TOTAL_CATS } from '../context/StudioContext.jsx'
import WhyTag from './shared/WhyTag.jsx'
import { whyNotes } from '../data/content.js'

function Toggle({ pressed, onToggle, label, children }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-label={label}
      onClick={onToggle}
      className={`flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-bold shadow-sm transition-all ${
        pressed
          ? 'border-ink bg-ink text-cream'
          : 'border-ink/15 bg-paper/90 text-ink backdrop-blur-sm hover:border-ink/40'
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
  const { recruiterMode, setRecruiterMode, whyMode, setWhyMode, openModal, progress, catsFound, catToast, finale, setFinale } = useStudio()

  return (
    <>
      {/* top-right controls */}
      <div className="fixed top-4 right-4 z-40 flex flex-wrap items-center justify-end gap-2">
        <div
          className="flex items-center rounded-full border border-ink/15 bg-paper/90 p-1 shadow-sm backdrop-blur-sm"
          role="group"
          aria-label="Viewing mode"
        >
          <button
            type="button"
            onClick={() => setRecruiterMode(false)}
            aria-pressed={!recruiterMode}
            className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
              !recruiterMode ? 'bg-coral text-white shadow' : 'text-ink-soft hover:text-ink'
            }`}
          >
            Explore
          </button>
          <button
            type="button"
            onClick={() => setRecruiterMode(true)}
            aria-pressed={recruiterMode}
            className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
              recruiterMode ? 'bg-ink text-cream shadow' : 'text-ink-soft hover:text-ink'
            }`}
          >
            Recruiter Mode
          </button>
        </div>

        <Toggle pressed={whyMode} onToggle={() => setWhyMode(!whyMode)} label="Toggle Why Mode — annotations explaining design decisions">
          <span aria-hidden="true">?</span> Why Mode
        </Toggle>

        <button
          type="button"
          onClick={(e) => openModal('speedrun', e)}
          className="cursor-pointer rounded-full border border-ink/15 bg-paper/90 px-3.5 py-2 text-xs font-bold text-ink shadow-sm backdrop-blur-sm transition hover:border-sun-deep hover:bg-sun/30"
        >
          ⚡ View in 2 minutes
        </button>
      </div>
      <WhyTag className="fixed top-16 right-4 z-40">{whyNotes.recruiter}</WhyTag>

      {/* bottom-left: exploration progress — compact pill on small screens */}
      {!recruiterMode && (
        <div
          className="fixed bottom-4 left-4 z-40 flex items-center gap-2 rounded-full border border-ink/10 bg-paper/90 px-3.5 py-2 shadow-sm backdrop-blur-sm lg:hidden"
          role="status"
          aria-label={`You’ve discovered ${progress}% of Ankita’s world`}
        >
          <span className="h-1.5 w-16 overflow-hidden rounded-full bg-cream-deep">
            <span
              className="block h-full rounded-full bg-gradient-to-r from-coral via-sun to-mint transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </span>
          <span className="text-[11px] font-bold text-ink">{progress}%</span>
          {catsFound.size > 0 && (
            <span className="text-[11px] font-bold text-coral-deep">🐾 {catsFound.size}/{TOTAL_CATS}</span>
          )}
        </div>
      )}
      {!recruiterMode && (
        <div className="fixed bottom-4 left-4 z-40 hidden w-56 rounded-2xl border border-ink/10 bg-paper/90 p-3 shadow-sm backdrop-blur-sm lg:block">
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] font-bold text-ink">
              You’ve discovered {progress}% of Ankita’s world
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-cream-deep" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Studio exploration progress">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-coral via-sun to-mint"
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', stiffness: 60, damping: 16 }}
            />
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[10px] font-semibold text-ink-soft">
            <span>{progress >= 100 ? 'Everything found. You’re thorough — she likes that.' : 'Click objects to explore'}</span>
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
