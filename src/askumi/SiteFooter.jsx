import { identity, contact } from '../data/content.js'
import { Marquee, Asterisk } from './bits.jsx'

const asset = (p) => `${import.meta.env.BASE_URL}${p}`

const ICONS = {
  Email: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  ),
  LinkedIn: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.07 1.4-2.07 2.85V21H9z" />
    </svg>
  ),
  Behance: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8.1 6.5c1.9 0 3 .9 3 2.6 0 1-.5 1.7-1.3 2.1 1.1.3 1.7 1.2 1.7 2.4 0 1.9-1.4 2.9-3.4 2.9H2V6.5zm-.3 4.1c.8 0 1.2-.4 1.2-1s-.4-.9-1.2-.9H4.2v1.9zm.1 4.2c.9 0 1.4-.4 1.4-1.1s-.5-1.1-1.4-1.1H4.2v2.2zM19.7 13.9c0 .2 0 .3-.02.5h-4.6c.1 1 .7 1.5 1.6 1.5.6 0 1.1-.25 1.35-.75h1.55c-.4 1.4-1.5 2.1-2.95 2.1-2 0-3.25-1.35-3.25-3.35 0-2 1.3-3.4 3.2-3.4 2 0 3.15 1.55 3.15 3.4zM15 9.2h3.4V8.2H15z" />
    </svg>
  ),
}

const TICKER = ['And… that was my portfolio', '✳', 'And… that was my portfolio', '✳']

export default function SiteFooter() {
  const socials = identity.links.filter((l) => ICONS[l.label])
  return (
    <footer id="say-hey" className="wrap pt-24 pb-16">
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.5fr_1fr]">
        {/* THE END */}
        <div className="order-2 lg:order-1">
          <div className="display text-[3rem] leading-[0.9] sm:text-[3.8rem]">THE END</div>
          <p className="mono mt-4 max-w-xs text-[0.82rem] leading-relaxed text-[color:var(--color-orange)]">
            [ or the beginning of us working together? ]
          </p>
        </div>

        {/* center marquee card */}
        <div className="order-1 overflow-hidden rounded-[20px] border border-[color:var(--color-line)] lg:order-2">
          <div className="marquee bg-[color:var(--color-ink)] py-2 text-[color:var(--color-paper)]">
            <div className="marquee__track">
              {[...TICKER, ...TICKER].map((t, i) => (
                <span key={i} className="mono text-[0.78rem]">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="relative flex min-h-[220px] flex-col items-center justify-center bg-[color:var(--color-orange)] px-6 py-10 text-center text-white">
            <div className="text-5xl" aria-hidden>
              🤝
            </div>
            <p className="mono mt-4 max-w-sm text-[0.9rem] leading-relaxed">
              {contact.goodbye}
            </p>
            <span className="mono absolute bottom-3 right-4 text-[0.66rem] text-white/85">
              © {identity.name.toUpperCase()}
            </span>
          </div>
        </div>

        {/* SAY HEY */}
        <div className="order-3 lg:text-right">
          <div className="display text-[3rem] leading-[0.9] sm:text-[3.8rem]">SAY HEY</div>
          <p className="mono mt-4 text-[0.82rem] leading-relaxed text-[color:var(--color-orange)] lg:ml-auto lg:max-w-xs">
            [ available for roles, chats, or a really long debate about UX ]
          </p>
          <div className="mt-5 flex gap-2.5 lg:justify-end">
            {socials.map((l) => (
              <a
                key={l.label}
                href={l.href}
                aria-label={l.label}
                {...(l.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="grid h-11 w-11 place-items-center rounded-full border border-[color:var(--color-ink)] text-[color:var(--color-ink)] transition hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-paper)]"
              >
                {ICONS[l.label]}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* baseline */}
      <div className="mt-14 flex flex-col items-center gap-3 border-t border-dashed border-[color:var(--color-line)] pt-6 sm:flex-row sm:justify-between">
        <a href="#top" className="flex items-center gap-2 font-extrabold tracking-tight">
          <Asterisk size={14} className="text-[color:var(--color-orange)]" />
          <span className="text-sm">ANKITA THATTE</span>
        </a>
        <div className="mono text-[0.72rem] text-[color:var(--color-ink-soft)]">
          Made with love, curiosity & 11 cats ♥ · {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  )
}
