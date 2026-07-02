import { motion } from 'framer-motion'
import { useStudio } from '../../context/StudioContext.jsx'
import { catFacts } from '../../data/content.js'

// A tiny cat silhouette hidden somewhere. id: 1..11.
export default function HiddenCat({ id, className = '', size = 26, color = 'var(--color-ink)' }) {
  const { catsFound, findCat } = useStudio()
  const found = catsFound.has(id)

  return (
    <motion.button
      type="button"
      aria-label={found ? `Rescue cat ${id} — already found` : `A tiny hidden cat`}
      title={found ? 'Found!' : undefined}
      onClick={() => findCat(id, catFacts[id - 1])}
      className={`inline-flex cursor-pointer border-none bg-transparent p-0 ${className}`}
      whileHover={{ scale: 1.25, rotate: -6 }}
      whileTap={{ scale: 0.9 }}
      animate={found ? { opacity: 1 } : { opacity: 0.55 }}
      style={{ lineHeight: 0 }}
    >
      <svg width={size} height={size * 0.8} viewBox="0 0 40 32" aria-hidden="true">
        {/* sitting cat silhouette */}
        <path
          d="M10 30c-3-6-3-13 1-17l-2-7 6 4c2-1 5-1 7 0l6-4-2 7c4 4 4 11 1 17"
          fill={found ? 'var(--color-coral)' : color}
          opacity={found ? 1 : 0.8}
        />
        <path d="M8 30 h22" stroke={found ? 'var(--color-coral)' : color} strokeWidth="3" strokeLinecap="round" />
        <path d="M29 26c5-1 8-5 7-9" stroke={found ? 'var(--color-coral)' : color} strokeWidth="3" fill="none" strokeLinecap="round" />
        {found && (
          <>
            <circle cx="15" cy="16" r="1.6" fill="var(--color-cream)" />
            <circle cx="24" cy="16" r="1.6" fill="var(--color-cream)" />
          </>
        )}
      </svg>
    </motion.button>
  )
}
