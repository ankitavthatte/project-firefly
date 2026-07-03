import { useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const base = import.meta.env.BASE_URL

/* A small polaroid pinned with washi tape. Click to enlarge. */
export function Polaroid({ art, onZoom, className = '' }) {
  const reduce = useReducedMotion()
  return (
    <motion.button
      type="button"
      onClick={() => onZoom(art)}
      whileHover={reduce ? {} : { y: -5, rotate: 0, scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      style={{ rotate: art.rotate }}
      className={`block cursor-pointer border-none bg-transparent p-0 ${className}`}
      aria-label={`Artwork: ${art.caption}. Activate to enlarge.`}
    >
      <span className="relative block bg-[#fffdf8] p-[7%] pb-[18%] shadow-[0_10px_22px_-8px_rgba(53,50,45,0.4)]">
        <span
          className="absolute -top-2 left-1/2 z-10 h-3.5 w-9 -translate-x-1/2 rotate-3 bg-sun/70 shadow-sm"
          aria-hidden="true"
        />
        <img src={`${base}${art.src}`} alt="" loading="lazy" className="block aspect-square w-full object-cover" />
      </span>
    </motion.button>
  )
}

/* The enlarged polaroid, floating over everything. Escape or click away to close. */
export function ArtLightbox({ art, onClose }) {
  const reduce = useReducedMotion()
  useEffect(() => {
    if (!art) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [art, onClose])

  return (
    <AnimatePresence>
      {art && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            aria-label="Close artwork"
            className="absolute inset-0 cursor-pointer bg-ink/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.figure
            role="dialog"
            aria-modal="true"
            aria-label={art.caption}
            initial={reduce ? { opacity: 0 } : { scale: 0.75, rotate: art.rotate, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { scale: 1, rotate: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            className="relative w-[min(92vw,30rem)] bg-[#fffdf8] p-4 pb-5 shadow-[0_30px_80px_-20px_rgba(53,50,45,0.6)]"
          >
            <img src={`${base}${art.src}`} alt={art.caption} className="max-h-[68vh] w-full object-contain" />
            <figcaption className="mt-3 text-center font-hand text-2xl leading-snug text-ink">{art.caption}</figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
