import { useState } from 'react'
import { identity } from '../data/content.js'
import { Asterisk } from './bits.jsx'

const asset = (p) => `${import.meta.env.BASE_URL}${p}`

function currentTheme() {
  return typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark'
    ? 'dark'
    : 'light'
}

// Light/dark toggle — flips the data-theme on <html>, persists the choice, and
// broadcasts a themechange event (the canvas background listens for it).
function ThemeToggle() {
  const [theme, setTheme] = useState(currentTheme)
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('ankita-theme', next)
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new CustomEvent('themechange', { detail: next }))
  }
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--color-ink)] text-[color:var(--color-ink)] transition hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-paper)]"
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  )
}

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
                  ? 'mono inline-flex items-center gap-1.5 rounded-full bg-[color:var(--color-ink)] px-4 py-1.5 text-[0.9rem] text-[color:var(--color-paper)]'
                  : 'mono text-[0.9rem] text-[color:var(--color-ink)] transition hover:text-[color:var(--color-orange)]'
              }
            >
              {on && <span className="text-[color:var(--color-orange)]">•</span>}
              {l.label}
            </a>
          )
        })}
        <ThemeToggle />
      </div>
    </nav>
  )
}
