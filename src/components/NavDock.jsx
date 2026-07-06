import { useStudio } from '../context/StudioContext.jsx'
import { identity } from '../data/content.js'

const base = import.meta.env.BASE_URL

// The conventional front door. The studio is the fun way in; this is the
// fast one — the labels a recruiter's eye scans for, always in reach, each
// opening the same modal its desk object does. Desktop only: the mobile
// layout already lists these as labelled cards.
const links = [
  { id: 'laptop', label: 'Work' },
  { id: 'bookshelf', label: 'Experience' },
  { id: 'mug', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

export default function NavDock() {
  const { openModal, recruiterMode } = useStudio()
  if (recruiterMode) return null

  return (
    <nav
      aria-label="Portfolio sections"
      className="fixed top-4 left-4 z-40 hidden items-center gap-0.5 rounded-full border border-ink/15 bg-paper/90 p-1 shadow-sm backdrop-blur-sm lg:flex"
    >
      <span className="px-2.5 font-hand text-lg leading-none text-coral-deep" aria-hidden="true">
        AT
      </span>
      {links.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={(e) => openModal(id, e)}
          className="cursor-pointer rounded-full px-3 py-1.5 text-xs font-bold text-ink-soft transition hover:bg-cream-deep hover:text-ink"
        >
          {label}
        </button>
      ))}
      <a
        href={`${base}${identity.resumeFile}`}
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer rounded-full bg-coral px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-coral-deep"
      >
        Résumé ↗
      </a>
    </nav>
  )
}
