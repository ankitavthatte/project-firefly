import { motion } from 'framer-motion'
import ModalShell from '../shared/ModalShell.jsx'
import { identity, speedRun, contact } from '../../data/content.js'

// The whole portfolio, compressed for people between meetings.
export default function SpeedRunModal({ onClose }) {
  return (
    <ModalShell title="Ankita in 2 minutes" accent="sun" onClose={onClose}>
      <p className="text-sm font-semibold text-ink-soft">
        No exploring required. Here’s everything the studio would have told you:
      </p>
      <ul className="mt-4 space-y-2.5">
        {speedRun.map((line, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 + i * 0.07 }}
            className="flex items-start gap-3 rounded-xl bg-cream px-4 py-3"
          >
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-coral" aria-hidden="true" />
            <span className="text-sm leading-relaxed text-ink">{line}</span>
          </motion.li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${identity.email}`}
          className="rounded-full bg-coral px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-coral-deep"
        >
          {contact.cta} ✈
        </a>
        <a
          href={`${import.meta.env.BASE_URL}${identity.resumeFile}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-ink bg-paper px-6 py-3 text-sm font-bold text-ink transition hover:bg-cream-deep"
        >
          Resume ↗
        </a>
        <span className="text-xs font-semibold text-ink-soft">{identity.email}</span>
      </div>
    </ModalShell>
  )
}
