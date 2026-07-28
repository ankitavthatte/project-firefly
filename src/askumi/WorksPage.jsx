import { useRef, useState } from 'react'
import { projects, experiments, identity } from '../data/content.js'
import Masthead from './Masthead.jsx'

const asset = (p) => `${import.meta.env.BASE_URL}${p}`
const behance = identity.links.find((l) => l.label === 'Behance')?.href

// The full works index, in the reference's list style. Each row links to its
// case study; a few explorations stay locked. Hovering a row lights it up and
// reveals a big preview image from that project, tracking the row's position.
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
const LOCKED_CATEGORY = {
  Vfort: 'Product Exploration',
  Niyantrac: 'Dashboard Concepts',
}
// Where to anchor the preview crop. MoneyMinds' first image is a tall board
// whose cover (the phone mockup) sits at the very top, so anchor it there.
const PREVIEW_POS = {
  moneyminds: 'top',
}

const PREVIEW_H = 300 // px — kept in sync with the image height below

// The hover preview should be each project's FIRST main image — the first
// thing shown on its page — not a random middle slide. Derive it from the
// project's own media so it always matches (skipping video intros).
function firstImage(item) {
  if (!item.media) return undefined
  for (const m of item.media) {
    if (m.type === 'image' && m.src) return m.src
    if (m.type === 'board' && m.srcs?.length) return m.srcs[0]
  }
  return undefined
}

function buildRows() {
  const rows = []
  projects
    .filter((p) => !p.hidden)
    .forEach((p) =>
    rows.push({
      id: p.id,
      title: TITLE[p.id] || p.name.toUpperCase(),
      category: CATEGORY[p.id] || p.kind,
      preview: firstImage(p),
      pos: PREVIEW_POS[p.id],
    }),
  )
  experiments.forEach((e) => {
    if (e.id) {
      rows.push({
        id: e.id,
        title: e.name.toUpperCase(),
        category: CATEGORY[e.id] || 'Case study',
        preview: firstImage(e),
        pos: PREVIEW_POS[e.id],
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
  const listRef = useRef(null)
  // { src, top } while a row is hovered; null when the pointer leaves the list.
  const [hover, setHover] = useState(null)

  // Align the preview's vertical centre with the hovered row, clamped to the
  // list bounds so it never spills past the top or bottom.
  const onRowHover = (row, el) => {
    if (!listRef.current) return
    const list = listRef.current.getBoundingClientRect()
    const r = el.getBoundingClientRect()
    const centre = r.top - list.top + r.height / 2
    const top = Math.max(0, Math.min(centre - PREVIEW_H / 2, list.height - PREVIEW_H))
    setHover({ src: row.preview, top, pos: row.pos })
  }

  return (
    <div className="grain relative z-10 min-h-full">
      <Masthead active="works" />

      {/* header */}
      <div className="wrap pt-6">
        <div className="text-center">
          <h1 className="mono text-2xl font-bold tracking-[0.15em] sm:text-3xl">COLLECTION OF WORKS</h1>
          <p className="mono mt-2 text-[0.9rem] text-[color:var(--color-orange)]">
            Things I’ve Built, Shipped, and Celebrated
          </p>
        </div>
      </div>

      <hr className="mt-6 border-[color:var(--color-ink)]" />

      {/* list + floating preview */}
      <div ref={listRef} className="relative" onMouseLeave={() => setHover(null)}>
        <ul className="border-b border-[color:var(--color-line)]">
          {rows.map((row) => (
            <WorkRow key={row.id || row.title} row={row} onHover={onRowHover} />
          ))}
        </ul>

        {/* the prominent project image — fades/slides in beside the hovered row */}
        <div
          aria-hidden
          className={`pointer-events-none absolute right-4 z-20 hidden w-[clamp(24rem,34vw,34rem)] transition-all duration-300 ease-out lg:block xl:right-[max(1.5rem,calc(50%-560px+1.5rem))] ${
            hover ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
          }`}
          style={{ top: hover ? hover.top : 0 }}
        >
          <Preview src={hover?.src} pos={hover?.pos} />
        </div>
      </div>

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
    <div className="wrap flex flex-col items-start gap-3 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-6">
      <div className="flex min-w-0 items-center gap-3 sm:gap-6">
        {row.locked ? <LockIcon /> : <ArrowIcon />}
        <span
          className={`mono text-[1.05rem] font-bold tracking-tight sm:truncate sm:text-[1.35rem] ${
            row.locked
              ? 'text-[color:var(--color-ink-soft)] group-hover:text-[color:var(--color-ink-soft)]'
              : 'text-[color:var(--color-ink)] group-hover:text-[#161116]'
          }`}
        >
          {row.title}
        </span>
      </div>

      <span
        className={`mono ml-11 shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-[0.72rem] transition-opacity sm:ml-0 ${
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
        onMouseEnter={(e) => onHover(row, e.currentTarget)}
        onFocus={(e) => onHover(row, e.currentTarget)}
        className="cursor-hand-lg block outline-none"
      >
        {inner}
      </a>
    </li>
  )
}

function Preview({ src, pos }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-card-hi)] shadow-[0_30px_70px_-24px_rgba(0,0,0,0.8)]">
      {src ? (
        <img
          src={asset(src)}
          alt="Work preview"
          className="h-[300px] w-full object-cover"
          style={{ objectPosition: pos || 'center' }}
        />
      ) : (
        <div className="grid h-[300px] w-full place-items-center bg-[color:var(--color-card-hi)] px-6 text-center">
          <span className="mono text-[0.72rem] tracking-[0.15em] text-[color:var(--color-ink-soft)]">
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
