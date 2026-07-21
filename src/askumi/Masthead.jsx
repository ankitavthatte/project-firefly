import { identity } from '../data/content.js'
import { Asterisk } from './bits.jsx'

const asset = (p) => `${import.meta.env.BASE_URL}${p}`

// The shared top nav, used on the landing and every routed page. Pass `active`
// (about | works | fun) to light up the current section as a pill.
export default function Masthead({ active }) {
  const links = [
    { id: 'about', label: 'About', href: '#/about' },
    { id: 'works', label: 'Works', href: '#/works' },
    { id: 'fun', label: 'Fun Stuff', href: '#/fun' },
    { id: 'resume', label: 'Resume', href: asset(identity.resumeFile), external: true },
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

      <div className="flex items-center gap-4 sm:gap-6">
        {links.map((l) => {
          const on = l.id === active
          return (
            <a
              key={l.label}
              href={l.href}
              {...(l.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              className={
                on
                  ? 'mono inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-card-hi)] px-4 py-1.5 text-[0.9rem] text-[color:var(--color-ink)]'
                  : 'mono text-[0.9rem] text-[color:var(--color-ink)] transition hover:text-[color:var(--color-orange)]'
              }
            >
              {on && <span className="text-[color:var(--color-orange)]">•</span>}
              {l.label}
            </a>
          )
        })}
      </div>
    </nav>
  )
}
