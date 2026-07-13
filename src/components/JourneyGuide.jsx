import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStudio } from '../context/StudioContext.jsx'
import { tour } from '../data/content.js'

/* First-visit wayfinding: a single, small invitation to the spotlight tour.
   The tour replaced the old numbered checklist — one guide, not a committee
   (the modals' own "up next" arc handles everything after the first click).
   Retires forever once the tour is started, skipped, or was dismissed under
   the old key. */
export default function JourneyGuide({ className = '' }) {
  const { startTour, tourStep } = useStudio()
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem('ff-tour-done') === '1' || localStorage.getItem('ff-journey-done') === '1'
    } catch {
      return false
    }
  })

  if (dismissed || tourStep != null) return null

  const skip = () => {
    setDismissed(true)
    try {
      localStorage.setItem('ff-tour-done', '1')
    } catch {
      /* private mode — the invite just returns next visit */
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6 }}
      className={`relative flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl bg-paper/90 p-3.5 shadow-sm backdrop-blur-sm ${className}`}
    >
      <p className="font-hand text-lg leading-none text-ink-soft">{tour.invite}</p>
      <button
        type="button"
        onClick={() => {
          setDismissed(true)
          startTour()
        }}
        className="cursor-pointer rounded-full bg-coral px-4 py-1.5 text-xs font-bold text-white shadow-md transition hover:bg-coral-deep"
      >
        {tour.start}
      </button>
      <button
        type="button"
        onClick={skip}
        className="cursor-pointer rounded-full px-2 py-1.5 text-xs font-bold text-ink-soft transition hover:text-ink"
      >
        {tour.skip}
      </button>
    </motion.div>
  )
}
