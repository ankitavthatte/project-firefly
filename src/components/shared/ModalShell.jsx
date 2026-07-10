import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useStudio, GUIDED_PATH } from '../../context/StudioContext.jsx'
import WhyTag from './WhyTag.jsx'
import { whyNotes } from '../../data/content.js'

// The visit has an arc: the guided path is the spine of the story, ending at
// "Say hello". Every modal points to the next beat so closing one is never a
// dead end. On-path modals advance to the following stop; a wandered-into
// bonus room rejoins the arc at the first stop not yet seen. `contact` is the
// ending (it has its own goodbye) and `speedrun` is a shortcut, so neither
// carries a forward foot.
function nextStopFor(activeModal, discovered) {
  if (activeModal === 'contact' || activeModal === 'speedrun') return null
  const arcIdx = GUIDED_PATH.findIndex((s) => s.id === activeModal)
  if (arcIdx !== -1) {
    const next = GUIDED_PATH[arcIdx + 1] || null
    return next ? { ...next, onArc: true } : null
  }
  const rejoin = GUIDED_PATH.find((s) => !discovered.has(s.id)) || GUIDED_PATH[GUIDED_PATH.length - 1]
  return { ...rejoin, onArc: false }
}

// Shared modal chrome: warm paper card, anticipation-then-reveal motion,
// focus trap entry, Escape to close, scrollable body.
// wide → max-w-4xl; xl → max-w-6xl (case-study reading needs the room).
export default function ModalShell({ title, accent = 'coral', onClose, children, wide = false, xl = false }) {
  const shellRef = useRef(null)
  const reduce = useReducedMotion()
  const { modalOrigin, activeModal, discovered, openModal } = useStudio()
  const nextStop = nextStopFor(activeModal, discovered)
  // Lean in toward the object that was clicked, instead of popping from nowhere.
  const from = modalOrigin
    ? { x: (modalOrigin.x - window.innerWidth / 2) * 0.85, y: (modalOrigin.y - window.innerHeight / 2) * 0.85 }
    : { x: 0, y: 40 }

  useEffect(() => {
    const prev = document.activeElement
    shellRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      prev?.focus?.()
    }
  }, [onClose])

  const accentBg = {
    coral: 'bg-coral',
    sun: 'bg-sun',
    mint: 'bg-mint',
    sky: 'bg-sky',
    lavender: 'bg-lavender',
    wood: 'bg-wood',
  }[accent]

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* dimmer */}
      <button
        aria-label="Close and return to the studio"
        className="absolute inset-0 cursor-pointer bg-ink/35 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <motion.div
        ref={shellRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-3xl bg-paper shadow-[0_30px_80px_-20px_rgba(53,50,45,0.45)] ${
          xl ? 'max-w-6xl' : wide ? 'max-w-4xl' : 'max-w-2xl'
        }`}
        initial={reduce ? { opacity: 0 } : { opacity: 0, x: from.x, y: from.y, scale: 0.35 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, x: 0, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, x: from.x * 0.5, y: from.y * 0.5, scale: 0.6 }}
        transition={{ type: 'spring', stiffness: 240, damping: 25, mass: 0.9 }}
      >
        <div className={`h-2 w-full shrink-0 ${accentBg}`} />
        <header className="flex shrink-0 items-start justify-between gap-4 px-6 pt-5 pb-3 sm:px-8">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">{title}</h2>
            <WhyTag className="mt-2">{whyNotes.modal}</WhyTag>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full bg-cream-deep text-lg font-bold text-ink transition hover:rotate-90 hover:bg-coral hover:text-white"
          >
            ✕
          </button>
        </header>
        <div className="nice-scroll min-h-0 grow overflow-y-auto px-6 pb-8 sm:px-8">{children}</div>

        {/* the onward beat — pinned so the story continues even without a scroll */}
        {nextStop && (
          <button
            type="button"
            onClick={(e) => openModal(nextStop.id, e)}
            aria-label={`${nextStop.onArc ? 'Next' : 'Back to the tour'}: ${nextStop.label} — ${nextStop.hint}`}
            className="group flex shrink-0 items-center gap-3 border-t border-ink/10 bg-cream/70 px-6 py-3.5 text-left transition hover:bg-cream-deep sm:px-8"
          >
            <span className="text-[10px] font-bold tracking-wider text-coral-deep uppercase">
              {nextStop.onArc ? 'Up next' : 'Back to the tour'}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-extrabold leading-tight text-ink">{nextStop.label}</span>
              <span className="block truncate text-xs font-semibold text-ink-soft">{nextStop.hint}</span>
            </span>
            <span
              aria-hidden="true"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-coral text-white transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </button>
        )}
      </motion.div>
    </motion.div>
  )
}
