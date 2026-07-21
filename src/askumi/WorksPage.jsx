import { useState } from 'react'
import { projects, experiments, identity } from '../data/content.js'
import { Asterisk } from './bits.jsx'

const asset = (p) => `${import.meta.env.BASE_URL}${p}`
const behance = identity.links.find((l) => l.label === 'Behance')?.href

// The full works index, in the reference's list style. Each row links to its
// case study; a few explorations stay locked. Hovering a row lights it up and
// swaps the preview image pinned in the header.
const CATEGORY = {
  evalix: 'Enterprise AI · UX',
  moneyminds: 'Gamified Product Design',
  shiftcare: 'Healthcare UX',
  irctc: 'Product Redesign',
  chownow: 'Mobile App Design',
  nook: 'Brand Identity',
  logofolio: 'Logo & Identity',
}
const TITLE = {
  evalix: 'REDESIGNING EVALIX AI, END TO END',
  moneyminds: 'GAMIFYING FINANCIAL LITERACY',
  shiftcare: 'SCHEDULING HEALTHCARE WITHOUT THE CHAOS',
}
const PREVIEW = {
  moneyminds: 'projects/moneyminds/intro.jpg',
  shiftcare: 'projects/shiftcare/slide-17.jpg',
  irctc: 'projects/irctc/redesign-1.jpg',
  chownow: 'projects/chownow/board-1.jpg',
  nook: 'projects/nook/nook-01.jpg',
  logofolio: 'projects/logofolio/board-1.jpg',
}
const LOCKED_CATEGORY = {
  Vfort: 'Product Exploration',
  Niyantrac: 'Dashboard Concepts',
  Luma: 'Interface Experiments',
}

function buildRows() {
  const rows = []
  projects.forEach((p) =>
    rows.push({
      id: p.id,
      title: TITLE[p.id] || p.name.toUpperCase(),
      category: CATEGORY[p.id] || p.kind,
      preview: PREVIEW[p.id],
    }),
  )
  experiments.forEach((e) => {
    if (e.id) {
      rows.push({
        id: e.id,
        title: e.name.toUpperCase(),
        category: CATEGORY[e.id] || 'Case study',
        preview: PREVIEW[e.id],
      })
    } else {
      rows.push({
        title: e.name.toUpperCase(),
        category: LOCKED_CATEGORY[e.name] || 'Exploration',
        locked: true,
      })
    }
  })
  return rows
}

export default function WorksPage() {
  const rows = buildRows()
  const firstPreview = rows.find((r) => r.preview)?.preview
  const [active, setActive] = useState(firstPreview)

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

      {/* header with pinned preview */}
      <div className="wrap relative pt-6">
        <div className="text-center">
          <h1 className="mono text-2xl font-bold tracking-[0.15em] sm:text-3xl">COLLECTION OF WORKS</h1>
          <p className="mono mt-2 text-[0.9rem] text-[color:var(--color-orange)]">
            Things I’ve Built, Shipped, and Celebrated
          </p>
        </div>

        {/* preview image, pinned top-right on desktop, overlapping the rule */}
        <div className="pointer-events-none absolute right-4 top-6 hidden w-[22rem] lg:block xl:right-0">
          <Preview src={active} />
        </div>
      </div>

      <hr className="mt-6 border-[color:var(--color-ink)]" />

      {/* the list — rows bleed to the viewport edge on hover */}
      <ul className="border-b border-[color:var(--color-line)]">
        {rows.map((row, i) => (
          <WorkRow key={row.id || row.title} row={row} onHover={setActive} first={i === 0} />
        ))}
      </ul>

      <div className="wrap flex flex-wrap items-center justify-between gap-4 py-10">
        {behance && (
          <a href={behance} target="_blank" rel="noreferrer" className="pill pill-ghost">
            Full archive on Behance ↗
          </a>
        )}
        <a href={`mailto:${identity.email}`} className="pill pill-orange">
          Ask about a locked one ↗
        </a>
      </div>
    </div>
  )
}

function WorkRow({ row, onHover }) {
  const inner = (
    <div className="wrap flex items-center justify-between gap-4 py-6">
      <div className="flex min-w-0 items-center gap-4 sm:gap-6">
        {row.locked ? <LockIcon /> : <ArrowIcon />}
        <span
          className={`mono truncate text-[0.95rem] font-bold tracking-tight sm:text-[1.35rem] ${
            row.locked
              ? 'text-[color:var(--color-ink-soft)] group-hover:text-[color:var(--color-ink-soft)]'
              : 'text-[color:var(--color-ink)] group-hover:text-[#161116]'
          }`}
        >
          {row.title}
        </span>
      </div>

      <span
        className={`mono shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-[0.72rem] transition-opacity ${
          row.locked
            ? 'border-[color:var(--color-line)] text-[color:var(--color-ink-soft)]'
            : 'border-[color:var(--color-line)] bg-[color:var(--color-card-hi)] text-[color:var(--color-ink)] group-hover:opacity-0'
        }`}
      >
        {row.category}
      </span>
    </div>
  )

  if (row.locked) {
    return (
      <li
        className="group block cursor-not-allowed border-t border-[color:var(--color-line)] opacity-70"
        title="Under wraps for now — ask me about it"
      >
        {inner}
      </li>
    )
  }

  return (
    <li className="group block border-t border-[color:var(--color-line)] transition-colors hover:bg-[color:var(--color-orange)]">
      <a
        href={`#/work/${row.id}`}
        aria-label={`Open ${row.title}`}
        onMouseEnter={() => row.preview && onHover(row.preview)}
        onFocus={() => row.preview && onHover(row.preview)}
        className="cursor-hand-lg block outline-none"
      >
        {inner}
      </a>
    </li>
  )
}

function Preview({ src }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-card-hi)] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)]">
      {src ? (
        <img src={asset(src)} alt="Work preview" className="h-52 w-full object-cover" />
      ) : (
        <div className="grid h-52 w-full place-items-center bg-[color:var(--color-card-hi)]">
          <span className="mono text-[0.7rem] tracking-[0.15em] text-[color:var(--color-ink-soft)]">
            LIVE ENTERPRISE PRODUCT · UNDER NDA
          </span>
        </div>
      )}
    </div>
  )
}

function ArrowIcon() {
  return (
    <span className="relative grid h-9 w-9 shrink-0 place-items-center text-[color:var(--color-ink)] group-hover:text-[#161116]">
      {/* corner brackets echoing the reference */}
      <span className="absolute left-0 top-0 h-2 w-2 border-l border-t border-current opacity-70" />
      <span className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-current opacity-70" />
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M8 8h8v8M16 8L7 17" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

function LockIcon() {
  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center text-[color:var(--color-ink-soft)]">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" strokeLinecap="round" />
      </svg>
    </span>
  )
}
