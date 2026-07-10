import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStudio, GUIDED_PATH } from '../context/StudioContext.jsx'

const steps = GUIDED_PATH

/* First-visit wayfinding. The studio invites wandering, but nobody should
   have to wander to find the work — five numbered doors, in reading order,
   each one the same modal the scene object opens. Checks itself off via the
   shared `discovered` set, always points at the next unopened door, and
   retires once every door has been opened (or on dismiss). */
export default function JourneyGuide({ className = '' }) {
  const { openModal, discovered } = useStudio()
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem('ff-journey-done') === '1'
    } catch {
      return false
    }
  })

  const allSeen = steps.every((s) => discovered.has(s.id))
  if (dismissed || allSeen) return null

  const nextId = steps.find((s) => !discovered.has(s.id))?.id

  const dismiss = () => {
    setDismissed(true)
    try {
      localStorage.setItem('ff-journey-done', '1')
    } catch {
      /* private mode — the guide just returns next visit */
    }
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6 }}
      aria-label="Suggested path through the portfolio"
      className={`relative rounded-2xl bg-paper/90 p-3.5 shadow-sm backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="font-hand text-lg leading-none text-ink-soft">New here? Follow the desk →</p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Hide the suggested path — I’d rather explore"
          className="grid h-6 w-6 shrink-0 cursor-pointer place-items-center rounded-full text-xs font-bold text-ink-soft transition hover:bg-cream-deep"
        >
          ✕
        </button>
      </div>
      <ol className="mt-2.5 flex flex-wrap gap-1.5">
        {steps.map(({ id, label }, i) => {
          const seen = discovered.has(id)
          const isNext = id === nextId
          return (
            <li key={id}>
              <button
                type="button"
                onClick={(e) => openModal(id, e)}
                className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                  seen
                    ? 'bg-cream-deep text-ink-soft'
                    : isNext
                      ? 'bg-coral text-white shadow-md hover:bg-coral-deep'
                      : 'border border-ink/15 bg-paper text-ink hover:border-ink/40'
                }`}
                aria-label={`${i + 1}. ${label}${seen ? ' (visited)' : isNext ? ' (up next)' : ''}`}
              >
                <span aria-hidden="true">{seen ? '✓' : `${i + 1}`}</span>
                {label}
              </button>
            </li>
          )
        })}
      </ol>
    </motion.nav>
  )
}
