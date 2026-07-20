import { identity } from '../data/content.js'
import { Asterisk } from './bits.jsx'

const asset = (p) => `${import.meta.env.BASE_URL}${p}`

// Transparent top nav that floats over the sky. Text links on the right,
// a pill-framed wordmark on the left — matching the reference landing.
export default function Masthead() {
  const links = [
    { label: 'About', href: '#about' },
    { label: 'Works', href: '#work' },
    { label: 'Fun Stuff', href: '#fun' },
    { label: 'Resume', href: asset(identity.resumeFile), external: true },
  ]
  return (
    <nav className="wrap flex items-center justify-between pt-6">
      <a
        href="#top"
        className="inline-flex items-center gap-2 rounded-full border-2 border-[color:var(--color-ink)] bg-[color:var(--color-card-hi)] px-4 py-2 font-extrabold tracking-tight"
      >
        <Asterisk size={18} />
        <span className="text-base">ANKITA</span>
      </a>

      <div className="flex items-center gap-6 sm:gap-9">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            {...(l.external ? { target: '_blank', rel: 'noreferrer' } : {})}
            className="mono text-[0.9rem] text-[color:var(--color-ink)] transition hover:text-[color:var(--color-orange)]"
          >
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
