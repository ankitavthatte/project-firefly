// ─────────────────────────────────────────────────────────────────────────
// VERSION 3 — "DESIGN ARTIFACTS"
// A standalone, monospace "spec-sheet / scrapbook" portfolio, reachable at /#v3.
// Style borrowed from the boarding-pass / technical-artifact school of playful
// portfolios (dotted grid, registration marks, GPS coordinates, a barcode,
// one loud accent, big image-forward project cards, and doodle stickers
// scattered in the margins) — retuned to Ankita's palette (coral + mint on
// cream) and her real brand (firefly, cats, doodles, games). It reuses the
// same copy from src/data/content.js, so words live in exactly one place.
//
// It shares nothing with the interactive studio (App.jsx); the two coexist and
// are switched between in main.jsx by the URL hash.
// ─────────────────────────────────────────────────────────────────────────
import { motion } from 'framer-motion'
import {
  identity,
  projects,
  chapters,
  awards,
  principles,
  contact,
  atAGlance,
  faqs,
  nowBoard,
} from '../data/content.js'

const base = import.meta.env.BASE_URL

// Pune, India — the studio's real coordinates, used as an "artifact" datum.
const COORDS = { lat: '18.5204° N', lng: '73.8567° E' }

// Per-project presentation for the big image cards. Evalix ships no screens by
// design (live enterprise product), so it gets a system-map treatment instead.
const projectMeta = {
  evalix: { category: 'Enterprise AI · UX', thumb: null },
  moneyminds: { category: 'Gamified EdTech', thumb: 'projects/moneyminds/intro.jpg' },
  shiftcare: { category: 'Healthcare UX', thumb: 'projects/shiftcare/slide-01.jpg' },
}

// Smooth in-page scroll without touching the URL hash (the hash drives the
// v3⇄studio router in main.jsx, so nav must never write to it).
const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

// ── Doodle stickers ──────────────────────────────────────────────────────
// Brand-appropriate cutouts scattered down the page's outer margins (desktop
// only, decorative). Positioned relative to the page edges — never over the
// centered content column — so they read as scrapbook stickers, not overlaps.
function Sticker({ name, className = '' }) {
  const common = { className: `pointer-events-none absolute hidden select-none lg:block ${className}`, 'aria-hidden': true }
  switch (name) {
    case 'firefly':
      return (
        <svg viewBox="0 0 100 100" {...common}>
          <circle cx="50" cy="55" r="26" fill="var(--color-coral)" stroke="var(--color-ink)" strokeWidth="3" />
          <circle cx="50" cy="48" r="11" fill="var(--color-cream)" />
          <path d="M41 40l-6-11 13 5zM59 40l6-11-13 5z" fill="var(--color-cream)" stroke="var(--color-ink)" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="50" cy="86" r="4" fill="var(--color-sun)" />
        </svg>
      )
    case 'cat':
      return (
        <svg viewBox="0 0 100 100" {...common}>
          <path d="M25 45c0-14 11-22 25-22s25 8 25 22v22c0 6-5 11-11 11H36c-6 0-11-5-11-11z" fill="var(--color-ink)" />
          <path d="M25 45l-6-16 16 8zM75 45l6-16-16 8z" fill="var(--color-ink)" />
          <circle cx="40" cy="52" r="3.2" fill="var(--color-mint)" />
          <circle cx="60" cy="52" r="3.2" fill="var(--color-mint)" />
          <path d="M50 60l-3 4h6z" fill="var(--color-coral)" />
        </svg>
      )
    case 'controller':
      return (
        <svg viewBox="0 0 100 70" {...common}>
          <rect x="8" y="18" width="84" height="40" rx="20" fill="var(--color-lavender)" stroke="var(--color-ink)" strokeWidth="3" />
          <path d="M25 30v14M18 37h14" stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="70" cy="33" r="4" fill="var(--color-ink)" />
          <circle cx="80" cy="43" r="4" fill="var(--color-ink)" />
        </svg>
      )
    case 'paint':
      return (
        <svg viewBox="0 0 100 100" {...common}>
          <path d="M50 12c14 0 24 8 24 22 0 10-8 12-8 20s10 8 10 18-12 16-26 16-30-12-30-30S30 12 50 12z" fill="var(--color-mint)" stroke="var(--color-ink)" strokeWidth="3" />
          <circle cx="42" cy="40" r="5" fill="var(--color-coral)" />
          <circle cx="60" cy="52" r="4" fill="var(--color-sun)" />
        </svg>
      )
    case 'star':
      return (
        <svg viewBox="0 0 100 100" {...common}>
          <path d="M50 6l9 32 32 9-32 9-9 32-9-32-32-9 32-9z" fill="var(--color-sun)" stroke="var(--color-ink)" strokeWidth="3" strokeLinejoin="round" />
        </svg>
      )
    case 'plane':
      return (
        <svg viewBox="0 0 100 100" {...common}>
          <path d="M8 50L92 14 66 90 48 62z" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="3" strokeLinejoin="round" />
          <path d="M48 62L92 14" stroke="var(--color-ink)" strokeWidth="2.5" />
        </svg>
      )
    case 'squiggle':
      return (
        <svg viewBox="0 0 120 40" {...common}>
          <path d="M4 20c12-22 22 22 34 0s22 22 34 0 22 22 34 0" fill="none" stroke="var(--color-coral)" strokeWidth="4" strokeLinecap="round" />
        </svg>
      )
    default:
      return null
  }
}

// ── Small building blocks ────────────────────────────────────────────────

// The circled "+" crop/registration marks that frame the page like a print
// artifact. Purely decorative.
function Mark({ className = '' }) {
  return (
    <span aria-hidden="true" className={`pointer-events-none grid place-items-center rounded-full border border-ink/40 ${className}`}>
      <svg viewBox="0 0 24 24" className="h-1/2 w-1/2 text-ink/50">
        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    </span>
  )
}

// A deterministic barcode — decoration that sells the ID-card metaphor.
function Barcode({ className = '' }) {
  const widths = [3, 1, 2, 1, 1, 3, 2, 1, 1, 2, 3, 1, 2, 2, 1, 1, 3, 1, 2, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 1, 2, 1]
  let x = 0
  return (
    <svg viewBox="0 0 120 34" preserveAspectRatio="none" aria-hidden="true" className={className} role="presentation">
      {widths.map((w, i) => {
        const rect = i % 2 === 0 ? <rect key={i} x={x} y="0" width={w} height="34" fill="currentColor" /> : null
        x += w
        return rect
      })}
    </svg>
  )
}

// The scrolling "this is the portfolio of ⟶" ticker on the card header.
function Marquee() {
  const unit = (
    <span className="flex shrink-0 items-center">
      <span className="px-6 text-sm font-bold tracking-tight text-ink">this is the portfolio of</span>
      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-ink" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 12h7m0 0-3-3m3 3-3 3" stroke="currentColor" strokeWidth="1.6" fill="none" />
      </svg>
    </span>
  )
  return (
    <div className="flex overflow-hidden rounded-t-2xl bg-coral py-2.5" aria-hidden="true">
      <div className="v3-marquee flex whitespace-nowrap">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="flex">{unit}</span>
        ))}
      </div>
    </div>
  )
}

// The photo-free left panel of the ID card: the Project Firefly mark, haloed by
// radiating rays (the reference's "sun-ray" motif). Drop a real portrait at
// public/portrait.jpg and swap this block for an <img> when one exists.
function Emblem() {
  const rays = Array.from({ length: 20 })
  return (
    <div className="relative grid aspect-square place-items-center bg-cream sm:aspect-auto">
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
        {rays.map((_, i) => {
          const a = (i / rays.length) * Math.PI * 2
          const r1 = 62
          const r2 = i % 2 === 0 ? 92 : 80
          return (
            <line
              key={i}
              x1={100 + Math.cos(a) * r1}
              y1={100 + Math.sin(a) * r1}
              x2={100 + Math.cos(a) * r2}
              y2={100 + Math.sin(a) * r2}
              stroke="var(--color-ink)"
              strokeOpacity="0.22"
              strokeWidth="3"
              strokeLinecap="round"
            />
          )
        })}
      </svg>
      <div className="relative grid h-24 w-24 place-items-center rounded-full border-2 border-ink bg-paper">
        {/* firefly mark, matching the favicon */}
        <svg viewBox="0 0 100 100" className="h-14 w-14">
          <circle cx="50" cy="52" r="30" fill="var(--color-coral)" />
          <circle cx="50" cy="46" r="12" fill="var(--color-cream)" />
          <path d="M40 36l-5-9 11 4zM60 36l5-9-11 4z" fill="var(--color-cream)" />
        </svg>
      </div>
    </div>
  )
}

// A section header styled like a spec-sheet field: [index] LABEL ───────────
function SectionHead({ index, label, note, id }) {
  return (
    <div id={id} className="scroll-mt-24">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <span className="text-xs font-bold text-coral-deep">[{index}]</span>
        <h2 className="text-lg font-bold tracking-[0.15em] text-ink uppercase sm:text-xl">{label}</h2>
        <span className="hidden h-px flex-1 bg-ink/20 sm:block" />
        {note && <span className="text-[11px] tracking-wide text-coral-deep lowercase">{note}</span>}
      </div>
    </div>
  )
}

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Chrome: nav, corner marks ────────────────────────────────────────────

function Nav() {
  const links = [
    { label: 'About', id: 'v3-about' },
    { label: 'Works', id: 'v3-works' },
    { label: 'Journey', id: 'v3-journey' },
    { label: 'Fun Stuff', id: 'v3-fun' },
  ]
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 rounded-full border-2 border-ink bg-paper px-4 py-2 shadow-sm transition hover:bg-cream-deep"
          aria-label="Ankita Thatte — back to top"
        >
          <span className="text-coral" aria-hidden="true">✳</span>
          <span className="text-sm font-bold tracking-widest text-ink">ANKITA</span>
        </button>
        <nav className="flex items-center gap-1 sm:gap-2">
          <div className="hidden items-center gap-1 sm:flex sm:gap-2">
            {links.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => scrollTo(l.id)}
                className="rounded-full px-2.5 py-1.5 text-xs font-bold tracking-wide text-ink transition hover:bg-ink hover:text-cream sm:px-3 sm:text-sm"
              >
                {l.label}
              </button>
            ))}
          </div>
          <a
            href={`${base}${identity.resumeFile}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border-2 border-ink bg-coral px-3 py-1.5 text-xs font-bold tracking-wide text-paper transition hover:bg-coral-deep sm:px-4 sm:text-sm"
          >
            Résumé
          </a>
        </nav>
      </div>
    </header>
  )
}

// Fixed registration marks that frame the page like a print artifact.
function CornerChrome() {
  return (
    <div className="pointer-events-none fixed inset-0 z-30 hidden lg:block">
      <Mark className="absolute bottom-6 left-6 h-12 w-12" />
      <Mark className="absolute bottom-6 right-6 h-12 w-12" />
    </div>
  )
}

// Scrapbook stickers scattered down the OUTER margins of the page. Positioned
// against the page edges at spread-out vertical stops, well clear of the
// centered max-w-6xl content column.
function Doodles() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      <Sticker name="star" className="top-[9%] right-[3%] h-12 w-12 rotate-12" />
      <Sticker name="squiggle" className="top-[15%] left-[2.5%] h-9 w-24 -rotate-6" />
      <Sticker name="paint" className="top-[27%] right-[2.5%] h-16 w-16 rotate-6" />
      <Sticker name="controller" className="top-[40%] left-[2%] h-12 w-20 -rotate-12" />
      <Sticker name="cat" className="top-[55%] right-[2.5%] h-16 w-16 rotate-6" />
      <Sticker name="firefly" className="top-[68%] left-[2.5%] h-14 w-14 -rotate-6" />
      <Sticker name="star" className="top-[80%] right-[3%] h-10 w-10 -rotate-12" />
      <Sticker name="plane" className="top-[90%] left-[3%] h-14 w-14 -rotate-6" />
    </div>
  )
}

// ── Hero: the ID card ────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative px-4 pt-28 pb-16 sm:px-6 sm:pt-36">
      {/* sky banner strip behind the top of the page */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-40"
        style={{ background: 'linear-gradient(180deg, #bcd8f0 0%, #d8e8f5 40%, rgba(216,232,245,0) 100%)' }}
      >
        <div className="cloud-soft absolute top-6 left-[8%] h-10 w-40 rounded-full bg-white/70 blur-xl" />
        <div className="cloud-soft absolute top-3 right-[12%] h-12 w-52 rounded-full bg-white/60 blur-2xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="group relative mx-auto max-w-3xl overflow-hidden rounded-2xl border-2 border-ink bg-cream-deep shadow-[6px_6px_0_0_var(--color-ink)]"
      >
        <Marquee />

        {/* card body: emblem + credentials */}
        <div className="grid gap-0 sm:grid-cols-[1fr_1.4fr]">
          <Emblem />
          <div className="relative p-6 sm:p-8">
            <p className="text-xl font-bold tracking-tight text-coral-deep sm:text-2xl">{identity.name.toUpperCase()}</p>
            <p className="mt-1 text-sm font-bold text-ink">{identity.role}</p>
            <div className="my-4 h-px w-full bg-ink/25" />
            <p className="text-sm leading-relaxed text-ink">
              Hostin Services · Cloud.in
              <br />
              <span className="text-ink-soft">[ Sole designer — Evalix AI ]</span>
            </p>
            <Barcode className="mt-5 h-9 w-48 max-w-full text-ink" />
            {/* the playful hand-drawn sticker, in mint */}
            <svg viewBox="0 0 60 60" className="absolute right-5 bottom-5 h-12 w-12 rotate-6" aria-hidden="true">
              <path d="M14 40c-4-2-6-8-3-13s10-6 14-3 4 5 9 5 9 3 9 9-5 10-11 9-13-4-18-6z" fill="var(--color-mint)" stroke="var(--color-ink)" strokeWidth="2" />
              <circle cx="24" cy="32" r="2" fill="var(--color-ink)" />
              <circle cx="34" cy="33" r="2" fill="var(--color-ink)" />
              <path d="M23 40c3 2 7 2 10 0" fill="none" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* the coral intro panel + CTA — collapsed until the card is hovered
            (or keyboard-focused), like the reference. On touch devices, where
            hover doesn't exist, it stays open so the intro is never lost. */}
        <div className="v3-reveal">
          <div className="overflow-hidden">
            <div className="border-t-2 border-ink bg-coral px-6 py-8 text-center sm:px-10 sm:py-10">
              <p className="mx-auto max-w-xl text-sm leading-relaxed font-bold text-paper sm:text-base">
                {identity.positioning} An architect turned Senior Product Designer who makes complex
                enterprise systems feel obvious — most recently 300+ screens of Evalix AI, end to end.
              </p>
              <button
                type="button"
                onClick={() => scrollTo('v3-about')}
                className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-ink px-6 py-3 text-sm font-bold text-paper transition hover:bg-paper hover:text-ink"
              >
                more about me
                <span aria-hidden="true">↗</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* the five recruiter facts, as an artifact spec strip under the card */}
      <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-xl border-2 border-ink bg-ink sm:grid-cols-5">
        {atAGlance.map((f) => (
          <div key={f.label} className="bg-paper p-3">
            <div className="text-[9px] font-bold tracking-widest text-ink-soft uppercase">{f.label}</div>
            <div className="mt-1 text-[11px] leading-snug font-bold text-ink">{f.value}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── About ────────────────────────────────────────────────────────────────

function About() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHead index="00" label="About" note="the person behind the desk" id="v3-about" />
      <Reveal className="mt-8 grid gap-8 md:grid-cols-[1.3fr_1fr]">
        <div className="rounded-2xl border-2 border-ink bg-paper p-6 shadow-[4px_4px_0_0_var(--color-ink)] sm:p-8">
          <p className="text-lg leading-relaxed font-bold text-ink sm:text-xl">{identity.about}</p>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">{identity.aboutExtra}</p>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">{identity.craft}</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border-2 border-ink bg-mint/25 p-6">
            <div className="text-[10px] font-bold tracking-widest text-mint-deep uppercase">Off the clock</div>
            <p className="mt-2 text-sm leading-relaxed text-ink">{identity.personality}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {identity.tags.map((t) => (
                <span key={t} className="rounded-full border border-ink/40 bg-paper px-2.5 py-1 text-[11px] font-bold text-ink">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border-2 border-ink bg-paper p-6">
            <div className="text-[10px] font-bold tracking-widest text-ink-soft uppercase">Toolkit</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {identity.tools.map((t) => (
                <span key={t} className="rounded-md border border-ink/25 bg-cream px-2 py-1 text-[11px] font-bold text-ink">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

// ── Works ────────────────────────────────────────────────────────────────

const dot = { lavender: 'bg-lavender', sun: 'bg-sun', mint: 'bg-mint', coral: 'bg-coral' }

// The Evalix "screens under NDA" placeholder: a stylised system map, honest
// about why there is no screenshot.
function SystemMap() {
  const nodes = [
    [30, 40], [90, 30], [150, 55], [55, 90], [120, 95], [175, 100], [40, 130], [100, 140], [160, 150],
  ]
  const links = [[0, 1], [1, 2], [0, 3], [1, 4], [2, 5], [3, 6], [4, 7], [5, 8], [3, 4], [6, 7], [7, 8], [4, 8]]
  return (
    <div className="relative grid aspect-video place-items-center overflow-hidden rounded-2xl border-2 border-ink bg-lavender/25">
      <svg viewBox="0 0 200 180" className="h-full w-full opacity-90">
        {links.map(([a, b], i) => (
          <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="var(--color-lavender-deep)" strokeWidth="1.2" />
        ))}
        {nodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i === 1 ? 7 : 4.5} fill={i === 1 ? 'var(--color-coral)' : 'var(--color-lavender-deep)'} stroke="var(--color-ink)" strokeWidth="1.5" />
        ))}
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="rounded-full border-2 border-ink bg-paper/90 px-4 py-2 text-[11px] font-bold tracking-wide text-ink">
          🔒 300+ screens · under NDA
        </span>
      </div>
    </div>
  )
}

function ProjectCard({ p, i }) {
  const num = i + 1
  const meta = projectMeta[p.id] || {}
  const orange = i % 2 === 0
  const hasBoards = Array.isArray(p.media)
  return (
    <Reveal
      className={`relative rounded-3xl border-2 border-ink p-5 shadow-[6px_6px_0_0_var(--color-ink)] sm:p-7 ${
        orange ? 'bg-coral' : 'bg-cream-deep'
      }`}
    >
      {/* header: numbered title + category pill */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className={`text-lg font-bold tracking-tight uppercase sm:text-2xl ${orange ? 'text-ink' : 'text-ink'}`}>
          {num}. {p.name}
          {p.flagship && <span className="ml-2 align-middle text-xs text-coral-deep">★ flagship</span>}
        </h3>
        <span className="rounded-full border-2 border-ink bg-paper px-4 py-1.5 text-xs font-bold text-ink">{meta.category || p.kind}</span>
      </div>

      {/* the big thumbnail (or the NDA system map for Evalix) */}
      <div className="mt-5">
        {meta.thumb ? (
          <img
            src={`${base}${meta.thumb}`}
            alt={`${p.name} — ${p.tagline}`}
            loading="lazy"
            className="aspect-video w-full rounded-2xl border-2 border-ink object-cover object-top"
          />
        ) : (
          <SystemMap />
        )}
      </div>

      {/* details on a paper panel so the coral cards stay readable */}
      <div className="mt-5 rounded-2xl border-2 border-ink bg-paper p-5 sm:p-6">
        <div className="flex items-baseline gap-3">
          <span className={`h-3 w-3 shrink-0 rounded-full ${dot[p.color] || 'bg-coral'}`} aria-hidden="true" />
          <p className="text-sm font-bold text-coral-deep">{p.tagline}</p>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-ink">{p.summary}</p>
        {p.role && (
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            <span className="font-bold text-ink">ROLE — </span>
            {p.role}
          </p>
        )}

        <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border-2 border-ink bg-ink sm:grid-cols-4">
          {p.stats.map((s) => (
            <div key={s.label} className="bg-cream p-3">
              <div className="text-base font-bold text-ink">{s.value}</div>
              <div className="text-[10px] leading-tight tracking-wide text-ink-soft uppercase">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {p.chips.map((c) => (
            <span key={c} className="rounded-full border border-ink/25 bg-cream px-2.5 py-1 text-[11px] font-bold text-ink-soft">
              {c}
            </span>
          ))}
        </div>

        {p.story && (
          <details className="group mt-5 rounded-xl border-2 border-ink/15 bg-cream/60 p-4 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-ink">
              <span>Read the full case →</span>
              <span aria-hidden="true" className="text-lg text-ink-soft transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {p.story.map((s) => (
                <div key={s.title} className="rounded-lg border border-ink/15 bg-paper p-4">
                  <div className="text-[10px] font-bold tracking-widest text-coral-deep uppercase">{s.title}</div>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{s.body}</p>
                </div>
              ))}
            </div>
            {p.highlight && <p className="mt-4 rounded-lg bg-sun/25 px-4 py-2.5 text-sm font-bold text-ink">★ {p.highlight}</p>}
            {p.nda && <p className="mt-4 text-xs leading-relaxed font-bold text-ink-soft">🔒 {p.nda}</p>}
          </details>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-4 border-t-2 border-ink/10 pt-4">
          {p.pdfHref && (
            <a href={`${base}${p.pdfHref}`} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-coral-deep underline-offset-4 hover:underline">
              Open the case study PDF ↗
            </a>
          )}
          {hasBoards && !p.pdfHref && <span className="text-sm font-bold text-ink-soft">Full boards available on request</span>}
          {p.nda && !p.pdfHref && !hasBoards && <span className="text-sm font-bold text-ink-soft">Walkthrough available in a call</span>}
        </div>
      </div>
    </Reveal>
  )
}

function Works() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHead index="01" label="Selected Works" note={`[ ${projects.length} ] the “i swear it all shipped” archive`} id="v3-works" />
      <div className="mt-8 space-y-10">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} p={p} i={i} />
        ))}
      </div>
    </section>
  )
}

// ── Journey ──────────────────────────────────────────────────────────────

const chapterDot = { wood: 'bg-wood', coral: 'bg-coral', sky: 'bg-sky', lavender: 'bg-lavender', mint: 'bg-mint' }

function Journey() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHead index="02" label="Journey" note="architecture → enterprise product" id="v3-journey" />
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {chapters.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.04} className="flex gap-4 rounded-2xl border-2 border-ink bg-paper p-5 sm:p-6">
            <div className="flex flex-col items-center">
              <span className={`h-4 w-4 shrink-0 rounded-full border-2 border-ink ${chapterDot[c.color] || 'bg-coral'}`} />
              <span className="mt-2 flex-1 text-[10px] font-bold text-ink-soft">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-ink">{c.title}</h3>
              {c.detail && <p className="text-[11px] font-bold tracking-wide text-ink-soft uppercase">{c.detail}</p>}
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{c.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* recognition strip */}
      <div className="mt-10">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-[10px] font-bold tracking-[0.25em] text-ink uppercase">Recognition</span>
          <span className="h-px flex-1 bg-ink/15" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {awards.map((a) => (
            <Reveal key={a.id} className="rounded-xl border-2 border-ink bg-cream-deep p-4">
              <div className="flex items-start justify-between">
                <span className="text-lg" aria-hidden="true">{a.id === 'summit' ? '🎤' : '🏆'}</span>
                <span className={`h-2.5 w-2.5 rounded-full ${dot[a.color] || 'bg-coral'}`} aria-hidden="true" />
              </div>
              <div className="mt-3 text-sm font-bold text-ink">{a.title}</div>
              <div className="text-[11px] font-bold text-ink-soft">{a.detail}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Fun stuff: principles + now + FAQ, scrapbook energy ──────────────────

function FunStuff() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div id="v3-fun" className="scroll-mt-24 text-center">
        <p className="text-xs font-bold text-coral-deep">[03]</p>
        <h2 className="mt-2 text-2xl font-bold text-coral sm:text-3xl">٩(^ᴗ^)۶ fun stuff (๑&gt;ᴗ&lt;)๑</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
          What happens between the screens — the principles I design by, and what’s on the desk right now.
        </p>
      </div>

      {/* principles as sticky-ish tiles */}
      <Reveal className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {principles.map((p, i) => (
          <div
            key={p.text}
            className="rounded-2xl border-2 border-ink bg-paper p-5 shadow-[3px_3px_0_0_var(--color-ink)]"
            style={{ transform: `rotate(${(i % 2 ? 1 : -1) * 1.2}deg)` }}
          >
            <span className={`inline-block h-2.5 w-2.5 rounded-full ${dot[p.color] || 'bg-coral'}`} aria-hidden="true" />
            <p className="mt-3 text-sm leading-snug font-bold text-ink">{p.text}</p>
          </div>
        ))}
      </Reveal>

      {/* what's on the desk now */}
      <Reveal className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {nowBoard.items.map((n) => (
          <div key={n.label} className="rounded-2xl border-2 border-ink bg-cream-deep p-4">
            <div className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-ink uppercase ${dot[n.color] || 'bg-coral'}`}>
              {n.label}
            </div>
            {n.href ? (
              <a href={n.href} target="_blank" rel="noopener noreferrer" className="mt-2 block text-sm leading-relaxed text-ink underline-offset-2 hover:underline">
                {n.text}
              </a>
            ) : (
              <p className="mt-2 text-sm leading-relaxed text-ink">{n.text}</p>
            )}
          </div>
        ))}
      </Reveal>

      {/* recruiter FAQ */}
      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {faqs.map((f) => (
          <details key={f.q} className="group rounded-2xl border-2 border-ink bg-paper p-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold text-ink">
              {f.q}
              <span aria-hidden="true" className="shrink-0 text-lg text-ink-soft transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

// ── Contact / footer ─────────────────────────────────────────────────────

function Contact() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 pt-16 pb-8 sm:px-6">
      <Reveal className="overflow-hidden rounded-2xl border-2 border-ink bg-ink shadow-[6px_6px_0_0_var(--color-coral)]">
        <div className="border-b-2 border-cream/20 bg-coral px-6 py-2.5">
          <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-ink uppercase">
            <span>Transmission_Open</span>
            <span className="tabular-nums">{COORDS.lat} · {COORDS.lng}</span>
          </div>
        </div>
        <div className="px-6 py-12 text-center sm:px-10 sm:py-16">
          <p className="mx-auto max-w-2xl text-2xl leading-tight font-bold text-cream sm:text-4xl">{contact.headline}</p>
          <a
            href={`mailto:${identity.email}`}
            className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-cream bg-coral px-7 py-3.5 text-sm font-bold text-paper transition hover:bg-cream hover:text-ink"
          >
            {identity.email} ✈
          </a>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {identity.links
              .filter((l) => l.label !== 'Email')
              .map((l) => (
                <a
                  key={l.label}
                  href={l.file ? `${base}${l.file}` : l.href}
                  target={l.external || l.file ? '_blank' : undefined}
                  rel={l.external || l.file ? 'noopener noreferrer' : undefined}
                  className="text-sm font-bold text-cream/80 underline-offset-4 transition hover:text-cream hover:underline"
                >
                  {l.label} ↗
                </a>
              ))}
          </div>
          <p className="mt-8 text-xs leading-relaxed text-cream/50">{contact.goodbye}</p>
        </div>
      </Reveal>

      {/* footer: artifact metadata + link back to the interactive studio */}
      <footer className="mt-8 flex flex-col items-center justify-between gap-4 border-t-2 border-ink/15 pt-6 text-[10px] tracking-wider text-ink-soft uppercase sm:flex-row">
        <span>© {new Date().getFullYear()} {identity.name} · Digital_Design_Artifacts · v3</span>
        <a href="./" className="font-bold text-ink underline-offset-4 hover:underline">
          ← Enter the interactive studio
        </a>
        <span className="tabular-nums">{COORDS.lat} {COORDS.lng}</span>
      </footer>
    </section>
  )
}

// ── Root ─────────────────────────────────────────────────────────────────

export default function V3App() {
  return (
    <div className="v3-root relative min-h-dvh overflow-x-hidden font-mono text-ink">
      {/* dotted-grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background: 'var(--color-cream)',
          backgroundImage: 'radial-gradient(circle, rgba(50,47,42,0.16) 1px, transparent 1.4px)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* scoped styles: marquee + soft cloud drift, reduced-motion aware */}
      <style>{`
        @keyframes v3marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .v3-marquee { animation: v3marquee 22s linear infinite; }
        @keyframes v3cloud { 0%,100% { transform: translateX(0); } 50% { transform: translateX(30px); } }
        .cloud-soft { animation: v3cloud 18s ease-in-out infinite; }
        /* The ID card's intro panel: collapsed until the card is hovered or
           something inside it takes keyboard focus. Grid-rows animation keeps
           it smooth at any content height. */
        .v3-reveal { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.55s cubic-bezier(0.22, 1, 0.36, 1); }
        .group:hover .v3-reveal,
        .group:focus-within .v3-reveal { grid-template-rows: 1fr; }
        @media (hover: none) {
          .v3-reveal { grid-template-rows: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .v3-marquee, .cloud-soft { animation: none !important; }
          .v3-reveal { transition: none !important; }
        }
      `}</style>

      <Nav />
      <CornerChrome />
      <Doodles />
      <main>
        <Hero />
        <About />
        <Works />
        <Journey />
        <FunStuff />
        <Contact />
      </main>
    </div>
  )
}
