import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useStudio } from '../../context/StudioContext.jsx'
import WhyTag from './WhyTag.jsx'
import { whyNotes } from '../../data/content.js'

// Shared modal chrome: warm paper card, anticipation-then-reveal motion,
// focus trap entry, Escape to close, scrollable body.
export default function ModalShell({ title, accent = 'coral', onClose, children, wide = false }) {
  const shellRef = useRef(null)
  const reduce = useReducedMotion()
  const { modalOrigin } = useStudio()
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
          wide ? 'max-w-4xl' : 'max-w-2xl'
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
      </motion.div>
    </motion.div>
  )
}
