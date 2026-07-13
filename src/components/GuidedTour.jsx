import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useStudio } from '../context/StudioContext.jsx'
import { tour } from '../data/content.js'

/* The spotlight tour — the room dims, one door at a time steps into the light.
   Finds each stop by [data-tour-id]; works on the desktop scene (fixed layout)
   and the mobile card stack (scrolls the card into view first). Ends on Escape,
   on Skip, on finishing, or the moment any modal opens — the modals' own
   "up next" arc takes over from there. */

const PAD = 14 // breathing room around the spotlit object, in px

function measure(id) {
  const el = document.querySelector(`[data-tour-id="${id}"]`)
  if (!el) return null
  const r = el.getBoundingClientRect()
  return {
    top: r.top - PAD,
    left: r.left - PAD,
    width: r.width + PAD * 2,
    height: r.height + PAD * 2,
  }
}

export default function GuidedTour() {
  const { tourStep, setTourStep, endTour, activeModal, openModal } = useStudio()
  const reduce = useReducedMotion()
  const [rect, setRect] = useState(null)
  const step = tourStep != null ? tour.steps[tourStep] : null
  const last = tourStep === tour.steps.length - 1

  // A modal opening means the visitor dove in — the tour's job is done.
  useEffect(() => {
    if (activeModal && tourStep != null) endTour()
  }, [activeModal, tourStep, endTour])

  const remeasure = useCallback(() => {
    if (!step) return
    setRect(measure(step.id))
  }, [step])

  // On each step: scroll the target into view (mobile), then track its rect
  // through any scrolling and resizing.
  useEffect(() => {
    if (!step) return
    const el = document.querySelector(`[data-tour-id="${step.id}"]`)
    el?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' })
    remeasure()
    const settle = setTimeout(remeasure, reduce ? 50 : 450) // after smooth scroll
    window.addEventListener('resize', remeasure)
    window.addEventListener('scroll', remeasure, true)
    return () => {
      clearTimeout(settle)
      window.removeEventListener('resize', remeasure)
      window.removeEventListener('scroll', remeasure, true)
    }
  }, [step, remeasure, reduce])

  // Keyboard: arrows walk, Escape leaves.
  useEffect(() => {
    if (tourStep == null) return
    const onKey = (e) => {
      if (e.key === 'Escape') endTour()
      if (e.key === 'ArrowRight' && !last) setTourStep(tourStep + 1)
      if (e.key === 'ArrowLeft' && tourStep > 0) setTourStep(tourStep - 1)
      if (e.key === 'Enter' && last) endTour()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [tourStep, last, setTourStep, endTour])

  if (!step || !rect) return null

  // The caption sits under the spotlight when there's room, above it otherwise.
  const below = rect.top + rect.height + 190 < window.innerHeight
  const cardTop = below ? rect.top + rect.height + 12 : undefined
  const cardBottom = below ? undefined : window.innerHeight - rect.top + 12
  // Keep the card on-screen horizontally.
  const cardLeft = Math.max(12, Math.min(rect.left + rect.width / 2 - 160, window.innerWidth - 332))

  return (
    <div className="fixed inset-0 z-[45]" role="dialog" aria-label={`Guided tour — step ${tourStep + 1} of ${tour.steps.length}: ${step.title}`}>
      {/* the spotlight: one hole, everything else dims. pointer-events stay off
          so the spotlit object underneath remains clickable. */}
      <motion.div
        className="pointer-events-none absolute rounded-3xl"
        initial={false}
        animate={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height }}
        transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 200, damping: 24 }}
        style={{ boxShadow: '0 0 0 9999px rgba(43, 37, 71, 0.55)' }}
        aria-hidden="true"
      />

      {/* the caption card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0, y: below ? 10 : -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="pointer-events-auto absolute w-80 rounded-2xl bg-paper p-4 shadow-[0_18px_44px_-12px_rgba(53,50,45,0.5)]"
          style={{ top: cardTop, bottom: cardBottom, left: cardLeft }}
        >
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-sm font-extrabold text-ink">{step.title}</h3>
            <span className="text-[11px] font-bold text-ink-soft">{tourStep + 1} / {tour.steps.length}</span>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-ink-soft">{step.body}</p>
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                endTour()
                openModal(step.id, e)
              }}
              className="cursor-pointer rounded-full border border-ink/15 bg-cream px-3.5 py-1.5 text-xs font-bold text-ink transition hover:border-ink/40"
            >
              {tour.open}
            </button>
            <div className="ml-auto flex items-center gap-2">
              {tourStep > 0 && (
                <button
                  type="button"
                  onClick={() => setTourStep(tourStep - 1)}
                  aria-label="Previous stop"
                  className="cursor-pointer rounded-full px-2.5 py-1.5 text-xs font-bold text-ink-soft transition hover:text-ink"
                >
                  ←
                </button>
              )}
              <button
                type="button"
                onClick={() => (last ? endTour() : setTourStep(tourStep + 1))}
                className="cursor-pointer rounded-full bg-coral px-4 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-coral-deep"
              >
                {last ? tour.done : 'Next →'}
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={endTour}
            className="mt-2 cursor-pointer text-[11px] font-semibold text-ink-soft underline-offset-2 transition hover:text-ink hover:underline"
          >
            Skip the tour
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
