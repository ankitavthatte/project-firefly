import { useState } from 'react'
import { identity, chapters, travel } from '../data/content.js'
import { Asterisk, TechLabel } from './bits.jsx'

const asset = (p) => `${import.meta.env.BASE_URL}${p}`

const TAG_EMOJI = {
  Traveler: '✈️',
  Gamer: '🎮',
  Creator: '🎨',
  'Book Lover': '📚',
  Painter: '🖌️',
  Sketcher: '✏️',
  'Cat Mom': '🐈',
}

const TABS = ['Basics', 'Work', 'Life']

// The "About" page — opens on its own route (#/about) with the tabbed
// dossier layout from the reference: a portrait on the left, a Basics /
// Work / Life tab set on the right, technical registration marks down the
// edge, and a little sticker collage in the corner.
export default function AboutPage() {
  const [tab, setTab] = useState('Basics')

  return (
    <div className="grain relative z-10 min-h-full">
      {/* nav */}
      <nav className="wrap flex items-center justify-between pt-6">
        <a
          href="#top"
          className="inline-flex items-center gap-2 rounded-full border-2 border-[color:var(--color-ink)] bg-[color:var(--color-card-hi)] px-4 py-2 font-extrabold tracking-tight"
        >
          <Asterisk size={18} />
          <span className="text-base">ANKITA</span>
        </a>
        <a href="#top" className="pill pill-ghost">
          ← Back home
        </a>
      </nav>

      <div className="wrap pb-24 pt-8">
        {/* header strip */}
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <div className="flex items-baseline gap-5">
            <h1 className="mono text-lg font-bold tracking-[0.15em]">ABOUT ME</h1>
            <TechLabel className="!text-[color:var(--color-orange)]">ankita.exe</TechLabel>
          </div>
          <TechLabel className="!text-[color:var(--color-orange)]">
            my life story, condensed into a few tabs
          </TechLabel>
        </div>
        <hr className="mt-4 border-[color:var(--color-line)]" />

        {/* folder tabs */}
        <div className="mt-8 flex gap-2">
          {TABS.map((t) => {
            const active = t === tab
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`mono relative -mb-px rounded-t-2xl border border-b-0 px-6 py-3 text-[0.8rem] font-bold tracking-[0.12em] transition-colors ${
                  active
                    ? 'z-10 border-[color:var(--color-line)] bg-[color:var(--color-ink)] text-[color:var(--color-orange)]'
                    : 'border-[color:var(--color-line)] bg-[color:var(--color-card-hi)] text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]'
                }`}
              >
                {t.toUpperCase()}
              </button>
            )
          })}
        </div>

        {/* dossier panel */}
        <div className="relative overflow-hidden rounded-2xl rounded-tl-none border border-[color:var(--color-line)] bg-[color:var(--color-card)] p-5 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,15rem)_1fr] lg:gap-12">
            {/* portrait column */}
            <div className="relative">
              <Portrait />
              {/* sticker collage tucked at the base of the portrait */}
              <div className="pointer-events-none absolute -bottom-3 left-1/2 flex -translate-x-1/2 gap-2 sm:left-auto sm:right-[-1.5rem] sm:translate-x-0">
                <span className="float-a text-3xl" style={{ '--r': '-10deg', transform: 'rotate(-10deg)' }}>🐈</span>
                <span className="float-b text-2xl" style={{ '--r': '8deg', transform: 'rotate(8deg)' }}>🎮</span>
                <span className="float-a text-2xl" style={{ '--r': '-4deg', transform: 'rotate(-4deg)' }}>🎨</span>
              </div>
            </div>

            {/* tab body + registration marks */}
            <div className="relative min-h-[18rem]">
              <div className="screen-swap pr-0 lg:pr-14" key={tab}>
                {tab === 'Basics' && <Basics />}
                {tab === 'Work' && <Work />}
                {tab === 'Life' && <Life />}
              </div>

              {/* vertical technical registration marks down the right edge */}
              <RegistrationMarks />
            </div>
          </div>
        </div>

        {/* footer nav */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <a href="#/works" className="pill pill-ghost">
            See selected work →
          </a>
          <a href={`mailto:${identity.email}`} className="pill pill-orange">
            Say hello ↗
          </a>
        </div>
      </div>
    </div>
  )
}

/* ---------- tab bodies ---------- */

function Basics() {
  return (
    <div className="max-w-2xl">
      <p className="mono text-[0.9rem] leading-relaxed">
        Hey there, I’m <B>Ankita</B> — a{' '}
        <B>Senior Product Designer with 10+ years</B> of experience. I’m{' '}
        <B>based in Pune, India</B>, and right now I’m the sole designer behind{' '}
        <B>Evalix AI, a live enterprise platform</B> at Cloud.in.
      </p>

      <hr className="my-6 border-[color:var(--color-line)]" />

      <p className="mono text-[0.9rem] leading-relaxed">
        I started out as an <B>architect</B> — a decade spent learning how
        structure makes complex things usable, first in buildings, now in
        enterprise software. My current obsession: <B>AI-first design workflows</B>.
        I love building experimental things where a designer’s judgment and a
        machine’s speed finally shake hands.
      </p>
    </div>
  )
}

function Work() {
  return (
    <div className="max-w-2xl space-y-6">
      {chapters
        .filter((c) => c.detail)
        .map((c) => (
          <div key={c.title} className="border-l-2 border-[color:var(--color-line)] pl-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h3 className="mono text-[0.95rem] font-bold text-[color:var(--color-orange)]">
                {c.title}
              </h3>
              <span className="mono text-[0.66rem] text-[color:var(--color-ink-soft)]">
                {c.detail}
              </span>
            </div>
            <p className="mono mt-2 text-[0.82rem] leading-relaxed text-[color:var(--color-ink-soft)]">
              {c.body}
            </p>
          </div>
        ))}
    </div>
  )
}

function Life() {
  return (
    <div className="max-w-2xl">
      <p className="text-[1.15rem] leading-relaxed sm:text-[1.2rem]">{identity.personality}</p>

      <div className="mt-6 flex flex-wrap gap-2.5">
        {identity.tags.map((t, i) => (
          <span
            key={t}
            className="mono inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-card-hi)] px-3.5 py-2 text-[0.74rem]"
            style={{ transform: `rotate(${(i % 2 ? 1 : -1) * (2 + (i % 3))}deg)` }}
          >
            <span aria-hidden>{TAG_EMOJI[t] || '★'}</span>
            {t}
          </span>
        ))}
      </div>

      <hr className="my-6 border-[color:var(--color-line)]" />

      <p className="mono text-[0.9rem] leading-relaxed text-[color:var(--color-ink-soft)]">
        {identity.craft}
      </p>
      <p className="mono mt-4 text-[0.9rem] leading-relaxed text-[color:var(--color-ink-soft)]">
        {travel.intro}
      </p>
    </div>
  )
}

/* ---------- pieces ---------- */

function B({ children }) {
  return <span className="font-bold text-[color:var(--color-ink)]">{children}</span>
}

function Portrait() {
  const [failed, setFailed] = useState(false)
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-card-hi)]">
      {identity.photo && !failed ? (
        <img
          src={asset(identity.photo)}
          alt={identity.name}
          onError={() => setFailed(true)}
          className="photo-bw h-72 w-full sm:h-80"
        />
      ) : (
        <svg viewBox="0 0 200 240" className="h-72 w-full sm:h-80" role="img" aria-label={identity.name} preserveAspectRatio="xMidYMax meet">
          <path d="M22 240c0-50 34-78 78-78s78 28 78 78z" fill="#0d0d0c" />
          <rect x="85" y="118" width="30" height="44" rx="13" fill="#0d0d0c" />
          <ellipse cx="100" cy="90" rx="40" ry="48" fill="#0d0d0c" />
        </svg>
      )}
    </div>
  )
}

// Decorative vertical technical marks echoing the reference's right rail.
function RegistrationMarks() {
  return (
    <div className="pointer-events-none absolute right-0 top-2 hidden select-none flex-col items-center gap-4 lg:flex">
      <svg width="26" height="26" viewBox="0 0 24 24" className="text-[color:var(--color-ink-soft)]" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
      </svg>
      <span className="mono text-[0.55rem] tracking-[0.25em] text-[color:var(--color-ink-soft)] [writing-mode:vertical-rl]">
        DIGITAL DESIGN ARTIFACTS
      </span>
      <span className="mono text-[0.55rem] tracking-[0.25em] text-[color:var(--color-orange)] [writing-mode:vertical-rl]">
        MAKE MORE · CRY LESS
      </span>
      <div className="h-16 w-[3px] rounded bg-[repeating-linear-gradient(180deg,var(--color-ink-soft)_0_2px,transparent_2px_5px)]" />
    </div>
  )
}
