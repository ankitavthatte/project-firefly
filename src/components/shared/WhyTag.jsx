import { AnimatePresence, motion } from 'framer-motion'
import { useStudio } from '../../context/StudioContext.jsx'

// A small annotation that appears only in Why Mode, explaining a design decision.
export default function WhyTag({ children, className = '' }) {
  const { whyMode } = useStudio()
  return (
    <AnimatePresence>
      {whyMode && (
        <motion.span
          initial={{ opacity: 0, y: 6, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className={`pointer-events-none z-40 block max-w-52 rounded-lg border border-lavender-deep/40 bg-lavender/25 px-2.5 py-1.5 text-[11px] leading-snug font-medium text-ink backdrop-blur-sm ${className}`}
        >
          <span className="mr-1 font-bold text-lavender-deep">why:</span>
          {children}
        </motion.span>
      )}
    </AnimatePresence>
  )
}
