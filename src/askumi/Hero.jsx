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
    <div className="relative w-full max-w-3xl">
      <div className="overflow-hidden rounded-[20px] border border-[color:var(--color-line)] bg-[color:var(--color-card)] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.45)]">
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

        {/* card body */}
        <div className="grid gap-4 p-6 sm:grid-cols-[minmax(180px,0.8fr)_1.2fr] sm:gap-8 sm:p-9">
          {/* photo + sunburst */}
          <div className="relative flex min-h-[15rem] items-end justify-center overflow-hidden">
            <div className="sunburst pointer-events-none absolute left-1/2 top-[38%] h-64 w-64 -translate-x-1/2 -translate-y-1/2" />
            <Portrait />
          </div>

          {/* details */}
          <div className="flex flex-col justify-center">
            <h1 className="mono text-2xl font-bold tracking-tight text-[color:var(--color-orange)] sm:text-[1.9rem]">
              {identity.name.toUpperCase()}
            </h1>
            <p className="mono mt-1 text-[1rem] text-[color:var(--color-ink)]">{identity.role}</p>

            <hr className="my-5 border-[color:var(--color-line)]" />

            <p className="mono text-[0.95rem] leading-relaxed text-[color:var(--color-ink)]">
              Hostin Services · Cloud.in
              <br />
              <span className="text-[color:var(--color-ink-soft)]">[Currently designing Evalix AI]</span>
            </p>

            <div className="mt-6 max-w-xs">
              <div className="barcode" />
              <div className="mono mt-1 text-[0.6rem] tracking-[0.3em] text-[color:var(--color-ink-soft)]">
                AT · 2016 — {new Date().getFullYear()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* green sticker overlapping the card */}
      <Paw className="absolute -bottom-4 right-6 h-16 w-16 rotate-[18deg]" />
    </div>
  )
}

// A B&W profile placeholder that reads as an intentional cutout. Swap for a
// real headshot by dropping one in /public and pointing an <img> here.
function Portrait() {
  return (
    <svg
      viewBox="0 0 200 250"
      className="relative z-10 h-[15rem] w-auto"
      aria-label="Ankita Thatte"
      role="img"
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <linearGradient id="bw" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a4a47" />
          <stop offset="1" stopColor="#0e0e0d" />
        </linearGradient>
      </defs>
      {/* shoulders — bleed to the bottom edge */}
      <path d="M18 250c0-52 36-80 82-80s82 28 82 80z" fill="url(#bw)" />
      {/* neck */}
      <rect x="84" y="120" width="32" height="46" rx="14" fill="url(#bw)" />
      {/* head */}
      <ellipse cx="100" cy="92" rx="42" ry="50" fill="url(#bw)" />
      {/* hair */}
      <path
        d="M56 96c-8-42 20-70 44-70s54 24 46 68c-3-10-8-18-15-24 3 8 3 16 1 24-6-20-20-32-40-32-22 0-36 16-40 40-1-6-1-12 0-18-2 4-2 8-1 12z"
        fill="#060605"
      />
      {/* soft cheek highlight so it reads as a photo, not an icon */}
      <ellipse cx="116" cy="104" rx="9" ry="14" fill="#e8e4db" opacity="0.12" />
    </svg>
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
