import { identity } from '../data/content.js'
import { Asterisk } from './bits.jsx'

// Top of the page: a sky strip with drifting clouds, then a sticky-ish
// toolbar row — logo left, tiny status readout center, chrome right.
export default function Masthead() {
  return (
    <header className="relative">
      {/* sky strip */}
      <div className="relative h-16 overflow-hidden bg-[color:var(--color-sky)]">
        <div
          className="cloud absolute top-3 h-6 w-24 rounded-full bg-white/80 blur-[2px]"
          style={{ animationDuration: '38s' }}
        />
        <div
          className="cloud absolute top-7 h-4 w-16 rounded-full bg-white/70 blur-[2px]"
          style={{ animationDuration: '52s', animationDelay: '-12s' }}
        />
        <div
          className="cloud absolute top-2 h-5 w-20 rounded-full bg-white/60 blur-[2px]"
          style={{ animationDuration: '46s', animationDelay: '-26s' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[color:var(--color-paper)] to-transparent" />
      </div>

      {/* toolbar */}
      <div className="wrap">
        <div className="card card-hi -mt-6 flex items-center justify-between gap-4 rounded-full px-4 py-2.5">
          <a href="#top" className="flex items-center gap-2 font-extrabold tracking-tight">
            <Asterisk size={16} className="text-[color:var(--color-orange)]" />
            <span className="text-sm">ANKITA</span>
          </a>

          <div className="tech hidden items-center gap-3 sm:flex">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--color-green)]" />
            PORTFOLIO · V2 · {identity.location.toUpperCase()}
          </div>

          <nav className="flex items-center gap-2">
            <a className="pill pill-ghost hidden md:inline-flex" href="#work">
              Work
            </a>
            <a className="pill pill-ghost hidden md:inline-flex" href="#say-hey">
              Say hey
            </a>
            <a
              className="pill"
              href={`mailto:${identity.email}`}
            >
              Hire me →
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
