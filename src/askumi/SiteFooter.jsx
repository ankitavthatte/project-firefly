import { identity, contact } from '../data/content.js'
import { Marquee, Asterisk } from './bits.jsx'

const asset = (p) => `${import.meta.env.BASE_URL}${p}`

const TICKER = [
  'LET’S BUILD SOMETHING CLEAR',
  'SENIOR PRODUCT DESIGNER',
  'PUNE · OPEN TO REMOTE',
  'ARCHITECT → PRODUCT',
  'SAY HEY 👋',
]

export default function SiteFooter() {
  return (
    <footer id="say-hey" className="relative mt-10">
      {/* orange marquee bar */}
      <div className="bg-[color:var(--color-orange)] py-3 text-white">
        <Marquee items={TICKER} />
      </div>

      <div className="wrap py-14">
        <div className="grid gap-10 sm:grid-cols-2">
          {/* THE END */}
          <div>
            <div className="display text-[3.4rem] leading-none sm:text-[4.5rem]">THE END</div>
            <p className="mono mt-4 max-w-xs text-[0.82rem] leading-relaxed text-[color:var(--color-ink-soft)]">
              {contact.goodbye}
            </p>
          </div>

          {/* SAY HEY */}
          <div className="sm:text-right">
            <div className="display text-[3.4rem] leading-none sm:text-[4.5rem]">SAY HEY</div>
            <p className="mono mt-4 text-[0.85rem] text-[color:var(--color-ink-soft)]">
              {contact.headline}
            </p>
            <div className="mt-5 flex flex-wrap gap-2 sm:justify-end">
              {identity.links.map((l) => (
                <a
                  key={l.label}
                  className="pill pill-ghost"
                  href={l.file ? asset(l.file) : l.href}
                  {...(l.external || l.file ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* baseline */}
        <div className="mt-12 flex flex-col items-center gap-3 border-t border-dashed border-[color:var(--color-line)] pt-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2 font-extrabold tracking-tight">
            <Asterisk size={14} className="text-[color:var(--color-orange)]" />
            <span className="text-sm">ANKITA THATTE</span>
          </div>
          <div className="mono text-[0.72rem] text-[color:var(--color-ink-soft)]">
            Made with love, curiosity & 11 cats ♥ · {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  )
}
