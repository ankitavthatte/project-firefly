import { identity } from '../data/content.js'
import Masthead from './Masthead.jsx'

// The landing: a minimal full-screen scene — sky fading to a dotted-grid
// canvas, a centered "studio ID card" as the hero object, and a technical
// toolbar pinned along the bottom.
export default function Hero() {
  return (
    <section id="top" className="sky relative min-h-screen overflow-hidden">
      <div className="dotgrid pointer-events-none absolute inset-0 opacity-70" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Masthead />

        {/* centered card */}
        <div className="flex flex-1 items-center justify-center px-4 py-10">
          <IdCard />
        </div>

        <BottomBar />
      </div>
    </section>
  )
}

function CircleArrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden className="inline-block">
      <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 12h8m-3.5-3.5L16 12l-3.5 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IdCard() {
  const strip = Array.from({ length: 6 })
  return (
    <div className="relative mx-auto w-full max-w-[38rem]">
      {/* `group` + focusable so the reveal opens on hover, keyboard focus,
          or tap (touch devices get it open via CSS below). */}
      <div
        tabIndex={0}
        className="id-card group overflow-hidden rounded-[20px] border border-[color:var(--color-line)] bg-[color:var(--color-card)] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.45)] outline-none transition-shadow duration-300 hover:shadow-[0_40px_90px_-30px_rgba(0,0,0,0.55)]"
      >
        {/* orange marquee strip */}
        <div className="marquee bg-[color:var(--color-orange)] py-2.5 text-[color:var(--color-ink)]">
          <div className="marquee__track">
            {strip.map((_, i) => (
              <span key={i} className="mono inline-flex items-center gap-4 text-[0.8rem]">
                this is the portfolio of
                <CircleArrow />
              </span>
            ))}
          </div>
        </div>

        {/* card body — name centred, no portrait */}
        <div className="relative flex flex-col items-center px-8 py-4 text-center sm:px-12">
          {/* green sticker sits at the body's bottom-right, overlapping the reveal */}
          <Paw className="absolute -bottom-6 right-5 z-20 h-12 w-12 rotate-[18deg]" />

          <h1 className="mono text-xl font-bold tracking-tight text-[color:var(--color-orange)]">
            {identity.name.toUpperCase()}
          </h1>
          <p className="mono mt-0.5 text-[0.85rem] text-[color:var(--color-ink)]">{identity.role}</p>

          <hr className="my-2.5 w-16 border-[color:var(--color-line)]" />

          <p className="mono text-[0.88rem] leading-relaxed text-[color:var(--color-ink)]">
            Hostin Services · Cloud.in
            <span className="text-[color:var(--color-ink-soft)]"> · [Currently designing Evalix AI]</span>
          </p>

          <div className="mt-3 w-full max-w-sm">
            <div className="barcode" />
            <div className="mono mt-1 flex items-center justify-between text-[0.6rem] tracking-[0.3em] text-[color:var(--color-ink-soft)]">
              <span>AT · 2016 — {new Date().getFullYear()}</span>
              <span className="id-card__hint tracking-normal">hover ▾</span>
            </div>
          </div>
        </div>

        {/* reveal panel — collapsed until hover/focus/tap */}
        <div className="id-card__reveal">
          <div className="bg-[color:var(--color-orange)] px-6 py-8 text-center text-white sm:px-10">
            <p className="mono mx-auto max-w-xl text-[0.95rem] leading-relaxed">
              A Senior Product Designer who makes complex enterprise systems feel
              obvious — architect-trained, sole designer behind Evalix AI’s 300+
              screens. Off the clock: traveler, gamer, painter and cat mom to 11
              rescues. Equal parts systems thinker and curious maker.
            </p>
            <a
              href="#about"
              className="pill mt-6 bg-[color:var(--color-ink)] border-[color:var(--color-ink)] hover:bg-white hover:text-[color:var(--color-orange)]"
            >
              more about me ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function Paw({ className = '' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <g fill="var(--color-green)" stroke="var(--color-ink)" strokeWidth="2">
        <ellipse cx="32" cy="42" rx="15" ry="12" />
        <ellipse cx="15" cy="30" rx="6" ry="8" />
        <ellipse cx="27" cy="21" rx="6" ry="8" />
        <ellipse cx="41" cy="21" rx="6" ry="8" />
        <ellipse cx="52" cy="30" rx="6" ry="8" />
      </g>
    </svg>
  )
}

function BottomBar() {
  const linkedin = identity.links.find((l) => l.label === 'LinkedIn')?.href
  return (
    <div className="wrap flex items-center justify-between pb-6">
      <CircleX />

      <div className="flex items-center gap-4 text-[color:var(--color-ink-soft)] sm:gap-6">
        <a href={linkedin} target="_blank" rel="noreferrer" className="hover:text-[color:var(--color-orange)]" aria-label="LinkedIn">
          <IconGlobe />
        </a>
        <a href={`mailto:${identity.email}`} className="hover:text-[color:var(--color-orange)]" aria-label="Email">
          <IconChat />
        </a>
        <span className="mono text-[0.8rem] font-bold">CE</span>
        <div className="mono hidden text-[0.62rem] leading-tight text-[color:var(--color-ink-soft)] sm:block">
          <div>DIGITAL_DESIGN_ARTIFACTS</div>
          <div>18.5204° N&nbsp;&nbsp;&nbsp;73.8567° E</div>
        </div>
      </div>

      <CircleX />
    </div>
  )
}

function CircleX() {
  return (
    <a
      href="#work"
      aria-label="Scroll to work"
      className="grid h-11 w-11 place-items-center rounded-full border border-[color:var(--color-ink)] text-[color:var(--color-ink)] transition hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-paper)]"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </a>
  )
}

function IconGlobe() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </svg>
  )
}

function IconChat() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M4 5h16v11H9l-4 3v-3H4z" strokeLinejoin="round" />
    </svg>
  )
}
