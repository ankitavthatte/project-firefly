import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import ModalShell from '../shared/ModalShell.jsx'
import HiddenCat from '../shared/HiddenCat.jsx'
import { useStudio } from '../../context/StudioContext.jsx'
import {
  identity,
  awards,
  processSteps,
  principles,
  chapters,
  travel,
  playMode,
  palette,
  drawer,
  contact,
  nowBoard,
} from '../../data/content.js'

const tone = {
  coral: { bg: 'bg-coral', soft: 'bg-coral/15', text: 'text-coral-deep', border: 'border-coral/40' },
  sun: { bg: 'bg-sun', soft: 'bg-sun/20', text: 'text-sun-deep', border: 'border-sun/50' },
  mint: { bg: 'bg-mint', soft: 'bg-mint/20', text: 'text-mint-deep', border: 'border-mint/50' },
  sky: { bg: 'bg-sky', soft: 'bg-sky/20', text: 'text-sky-deep', border: 'border-sky/50' },
  lavender: { bg: 'bg-lavender', soft: 'bg-lavender/20', text: 'text-lavender-deep', border: 'border-lavender/50' },
  wood: { bg: 'bg-wood', soft: 'bg-wood/20', text: 'text-wood-deep', border: 'border-wood/50' },
}

/* ---------- Notebook: design process ---------- */
export function NotebookModal({ onClose }) {
  const reduce = useReducedMotion()
  return (
    <ModalShell title="The Process Notebook" accent="coral" onClose={onClose} wide>
      {/* the sticky note that falls out */}
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: -60, rotate: -14 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, rotate: -4 }}
        transition={{ type: 'spring', stiffness: 120, damping: 11, delay: 0.35 }}
        className="mx-auto w-fit rounded-sm bg-sun px-6 py-4 shadow-[3px_5px_12px_rgba(53,50,45,0.2)]"
      >
        <p className="font-hand text-2xl font-bold text-ink">“Everything starts with a question.”</p>
      </motion.div>

      <p className="mt-6 text-base leading-relaxed text-ink-soft">
        <strong className="text-ink">I always ask why before designing.</strong> The notebook fills up long before
        Figma opens — because a beautiful answer to the wrong question is still the wrong answer.
      </p>

      <ol className="mt-6 space-y-4">
        {processSteps.map((step, i) => (
          <motion.li
            key={step.title}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.09 }}
            className="flex gap-4 rounded-2xl bg-cream p-4"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-coral text-sm font-bold text-white">
              {i + 1}
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h3 className="text-base font-bold">{step.title}</h3>
                <span className="font-hand text-lg text-coral-deep">{step.scribble}</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{step.body}</p>
            </div>
          </motion.li>
        ))}
      </ol>
      <div className="mt-5 flex justify-end">
        <HiddenCat id={6} size={22} color="#b57e45" />
      </div>
    </ModalShell>
  )
}

/* ---------- Trophy shelf: awards as flippable collectible cards ---------- */
function AwardCard({ award, index }) {
  const [flipped, setFlipped] = useState(false)
  const t = tone[award.color]
  return (
    <motion.button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.1 }}
      className="h-56 cursor-pointer [perspective:900px]"
      aria-label={`${award.title}, ${award.detail}. ${flipped ? award.note : 'Activate to flip and read the note.'}`}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 20 }}
      >
        {/* front */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl border-2 ${t.border} ${t.soft} p-4 [backface-visibility:hidden]`}>
          <span className={`grid h-12 w-12 place-items-center rounded-full ${t.bg} text-2xl shadow-sm`} aria-hidden="true">
            🏆
          </span>
          <h3 className="text-center text-sm leading-tight font-extrabold">{award.title}</h3>
          <p className={`text-xs font-bold ${t.text}`}>{award.detail}</p>
          <span className="mt-1 text-[10px] font-semibold tracking-wider text-ink-soft uppercase">flip me</span>
        </div>
        {/* back — a photo from the moment (if one exists), with the note beneath */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-2.5 overflow-hidden rounded-2xl ${t.bg} p-4 [backface-visibility:hidden] [transform:rotateY(180deg)]`}>
          {award.photo && (
            <img
              src={`${import.meta.env.BASE_URL}${award.photo}`}
              alt={`Photo — ${award.title}, ${award.detail}`}
              loading="lazy"
              className="h-28 w-full shrink-0 rounded-xl object-cover shadow-sm"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          )}
          <p className="text-center font-hand text-lg leading-snug font-semibold text-ink">“{award.note}”</p>
        </div>
      </motion.div>
    </motion.button>
  )
}

export function TrophyModal({ onClose }) {
  return (
    <ModalShell title="The Trophy Shelf" accent="sun" onClose={onClose} wide>
      <p className="text-base leading-relaxed text-ink-soft">
        Collectible cards, because awards are memories with better lighting. Flip each one for the note behind it.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {awards.map((a, i) => (
          <AwardCard key={a.id} award={a} index={i} />
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <HiddenCat id={7} size={22} color="#915907" />
      </div>
    </ModalShell>
  )
}

/* ---------- Coffee mug: about ---------- */
export function AboutModal({ onClose }) {
  const reduce = useReducedMotion()
  return (
    <ModalShell title="Coffee with Ankita" accent="lavender" onClose={onClose}>
      {/* coffee stain expanding into the about card */}
      <motion.div
        initial={reduce ? { opacity: 0 } : { clipPath: 'circle(6% at 20% 12%)', opacity: 0.6 }}
        animate={reduce ? { opacity: 1 } : { clipPath: 'circle(140% at 20% 12%)', opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="relative rounded-2xl bg-cream p-5 sm:p-6"
      >
        <span className="absolute -top-2 -left-2 h-10 w-10 rounded-full border-4 border-wood/50" aria-hidden="true" />
        <p className="text-base leading-relaxed text-ink">{identity.about}</p>
        <p className="mt-3 text-base leading-relaxed text-ink">{identity.aboutExtra}</p>
        <p className="mt-3 text-base leading-relaxed text-ink-soft">{identity.personality}</p>
      </motion.div>

      <div className="mt-5 flex flex-wrap gap-2">
        {identity.tags.map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.07, type: 'spring', stiffness: 300, damping: 16 }}
            className={`rounded-full px-3.5 py-1.5 text-xs font-bold text-ink ${
              ['bg-coral/25', 'bg-sun/35', 'bg-mint/35', 'bg-sky/35', 'bg-lavender/30'][i % 5]
            }`}
          >
            {tag}
          </motion.span>
        ))}
      </div>

      <h3 className="mt-6 text-xs font-bold tracking-widest text-ink-soft uppercase">Daily toolkit</h3>
      <div className="mt-2 flex flex-wrap gap-2">
        {identity.tools.map((tool) => (
          <span key={tool} className="rounded-lg border border-ink/10 bg-paper px-3 py-1.5 text-xs font-semibold text-ink">
            {tool}
          </span>
        ))}
      </div>
      <p className="mt-5 font-hand text-2xl text-coral-deep">“{identity.positioning}”</p>
    </ModalShell>
  )
}

/* ---------- Passport: travel ---------- */
export function PassportModal({ onClose }) {
  return (
    <ModalShell title="Passport & Postcards" accent="mint" onClose={onClose}>
      <p className="text-base leading-relaxed text-ink">{travel.intro}</p>
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {travel.stamps.map((s, i) => (
          <motion.div
            key={s.place}
            initial={{ opacity: 0, rotate: -6, scale: 0.85 }}
            animate={{ opacity: 1, rotate: i % 2 ? 2 : -2, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.12, type: 'spring', stiffness: 200, damping: 14 }}
            className="rounded-xl border-2 border-dashed border-mint-deep/50 bg-mint/10 p-4"
          >
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-mint text-sm" aria-hidden="true">✈</span>
              <h3 className="text-sm font-bold tracking-wide uppercase">{s.place}</h3>
            </div>
            <p className="mt-2 font-hand text-lg leading-snug text-ink-soft">{s.note}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs font-semibold text-ink-soft">Observation is a designer’s raw material — travel is how I stock up.</p>
        <HiddenCat id={8} size={22} color="#567f6c" />
      </div>
    </ModalShell>
  )
}

/* ---------- Controller: play mode ---------- */
export function ControllerModal({ onClose }) {
  return (
    <ModalShell title="Play Mode" accent="sky" onClose={onClose}>
      <div className="rounded-2xl bg-ink p-5 text-cream">
        <p className="font-hand text-2xl leading-snug">“{playMode.line}”</p>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {playMode.lessons.map((l, i) => (
          <motion.div
            key={l.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="rounded-xl bg-cream p-4"
          >
            <div className="flex items-center gap-2.5">
              <span
                className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold text-ink ${
                  ['bg-sun', 'bg-coral', 'bg-mint', 'bg-lavender'][i]
                }`}
                aria-hidden="true"
              >
                {['A', 'B', 'X', 'Y'][i]}
              </span>
              <h3 className="text-sm font-bold">{l.title}</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{l.body}</p>
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-xs font-semibold text-ink-soft">
        Every microinteraction on this site is a small “game feel” decision. Even this sentence appearing right now.
      </p>
    </ModalShell>
  )
}

/* ---------- Calendar: this month in the studio ---------- */
export function NowModal({ onClose }) {
  const monthYear = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })
  return (
    <ModalShell title={`This Month · ${monthYear}`} accent="sky" onClose={onClose}>
      <p className="text-base leading-relaxed text-ink-soft">
        The page the calendar is actually open to. What&rsquo;s on the desk right now:
      </p>
      <ul className="mt-5 space-y-3">
        {nowBoard.items.map((item, i) => {
          const t = tone[item.color]
          return (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="flex items-start gap-3.5 rounded-xl bg-cream p-4"
            >
              <span className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full text-[10px] font-bold tracking-wide uppercase ${t.bg} text-ink`} aria-hidden="true">
                {item.label.slice(0, 2)}
              </span>
              <div className="min-w-0">
                <h3 className="text-sm font-bold">{item.label}</h3>
                <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">
                  {item.href ? (
                    <>
                      {item.text.split('@')[0]}
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="font-bold text-coral-deep underline-offset-2 hover:underline">
                        @{item.text.split('@')[1]}
                      </a>
                    </>
                  ) : (
                    item.text
                  )}
                </p>
              </div>
            </motion.li>
          )
        })}
      </ul>
      <p className="mt-5 font-hand text-xl text-sky-deep">
        This page turns every month. If it looks stale, tell me — that&rsquo;s a design bug.
      </p>
    </ModalShell>
  )
}

/* ---------- Palette: visual creativity ---------- */
export function PaletteModal({ onClose }) {
  return (
    <ModalShell title="Paint & Pixels" accent="coral" onClose={onClose}>
      <p className="text-base leading-relaxed text-ink">{palette.intro}</p>
      <div className="mt-5 space-y-3">
        {palette.loves.map((l, i) => (
          <motion.div
            key={l.title}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="flex items-start gap-3 rounded-xl bg-cream p-4"
          >
            <span
              className={`mt-0.5 h-4 w-4 shrink-0 rounded-full ${['bg-coral', 'bg-sun', 'bg-mint', 'bg-sky'][i]}`}
              aria-hidden="true"
            />
            <div>
              <h3 className="text-sm font-bold">{l.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{l.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <a
          href="https://www.instagram.com/punedoodlerr"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full border border-coral/40 bg-coral/10 px-4 py-2 text-xs font-bold text-coral-deep transition hover:bg-coral hover:text-white"
        >
          See the doodles — @punedoodlerr
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
        </a>
        <HiddenCat id={9} size={22} color="#004182" />
      </div>
    </ModalShell>
  )
}

/* ---------- Bookshelf: journey chapters ---------- */
export function BookshelfModal({ onClose }) {
  const [open, setOpen] = useState(0)
  return (
    <ModalShell title="My Journey, in Chapters" accent="wood" onClose={onClose} wide>
      <p className="text-base leading-relaxed text-ink-soft">
        No timeline, no dates-in-a-column. Careers read better as chapters — pull a book off the shelf.
      </p>
      <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Journey chapters">
        {chapters.map((c, i) => {
          const t = tone[c.color]
          const isOpen = open === i
          return (
            <button
              key={c.title}
              role="tab"
              aria-selected={isOpen}
              onClick={() => setOpen(i)}
              className={`cursor-pointer rounded-lg px-3.5 py-4 text-xs font-bold transition-all ${
                isOpen ? `${t.bg} -translate-y-1 text-ink shadow-md` : `${t.soft} text-ink-soft hover:-translate-y-0.5`
              }`}
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              {c.title}
            </button>
          )
        })}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={open}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className={`mt-4 rounded-2xl border p-5 ${tone[chapters[open].color].border} ${tone[chapters[open].color].soft}`}
          role="tabpanel"
        >
          <h3 className="text-lg font-extrabold">
            Chapter {open + 1} · {chapters[open].title}
          </h3>
          {chapters[open].detail && (
            <p className="mt-0.5 text-xs font-semibold tracking-wide text-ink-soft">{chapters[open].detail}</p>
          )}
          <p className="mt-2 text-base leading-relaxed text-ink">{chapters[open].body}</p>
        </motion.div>
      </AnimatePresence>
      <div className="mt-4 flex justify-end">
        <HiddenCat id={10} size={22} color="#8a5f31" />
      </div>
    </ModalShell>
  )
}

/* ---------- Sticky notes: peel to reveal principles ---------- */
function PeelNote({ principle, index }) {
  const [peeled, setPeeled] = useState(false)
  const t = tone[principle.color]
  return (
    <motion.button
      type="button"
      onClick={() => setPeeled(true)}
      initial={{ opacity: 0, rotate: index % 2 ? 3 : -3, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.1 }}
      whileHover={peeled ? {} : { rotate: index % 2 ? -2 : 2, y: -3 }}
      className={`relative h-40 cursor-pointer rounded-sm p-4 text-left shadow-[3px_5px_10px_rgba(53,50,45,0.16)] ${t.bg}`}
      aria-label={peeled ? principle.text : 'A folded sticky note. Activate to peel it open.'}
    >
      <AnimatePresence mode="wait">
        {!peeled ? (
          <motion.div key="front" exit={{ opacity: 0, y: -30, rotate: -12 }} transition={{ duration: 0.3 }} className="flex h-full flex-col justify-between">
            <span className="font-hand text-xl text-ink/70">peel me</span>
            <span className="self-end text-2xl" aria-hidden="true">📌</span>
          </motion.div>
        ) : (
          <motion.p
            key="back"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid h-full place-items-center text-center font-hand text-2xl leading-snug font-bold text-ink"
          >
            “{principle.text}”
          </motion.p>
        )}
      </AnimatePresence>
      {/* curled corner */}
      <span className="absolute right-0 bottom-0 h-5 w-5 rounded-tl-xl bg-black/10" aria-hidden="true" />
    </motion.button>
  )
}

export function StickyModal({ onClose }) {
  return (
    <ModalShell title="Design Philosophy" accent="sun" onClose={onClose} wide>
      <p className="text-base leading-relaxed text-ink-soft">
        Five sticky notes. Everything I believe about design fits on them — peel each one.
      </p>
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {principles.map((p, i) => (
          <PeelNote key={p.text} principle={p} index={i} />
        ))}
      </div>
    </ModalShell>
  )
}

/* ---------- The drawer: curiosity, rewarded ---------- */
export function DrawerModal({ onClose }) {
  return (
    <ModalShell title="The Desk Drawer" accent="wood" onClose={onClose}>
      <p className="font-hand text-2xl leading-snug text-wood-deep">“{drawer.intro}”</p>
      <ul className="mt-5 space-y-3">
        {drawer.items.map((item, i) => (
          <motion.li
            key={item.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.12, type: 'spring', stiffness: 220, damping: 18 }}
            className="flex items-start gap-3.5 rounded-xl bg-cream p-4"
          >
            <span className="text-2xl" aria-hidden="true">{item.emoji}</span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-bold">{item.title}</h3>
                {item.cta && (
                  <a
                    href={`${import.meta.env.BASE_URL}${identity.resumeFile}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-coral px-3 py-1 text-[11px] font-bold text-white transition hover:bg-coral-deep"
                  >
                    Open the real one ↗
                  </a>
                )}
              </div>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{item.note}</p>
            </div>
          </motion.li>
        ))}
      </ul>
      <p className="mt-4 text-xs font-semibold text-ink-soft">
        You opened a stranger’s drawer. Curiosity like that belongs on a product team.
      </p>
    </ModalShell>
  )
}

/* ---------- Contact: paper plane + the goodbye moment ---------- */
function CopyEmailButton() {
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2200)
    return () => clearTimeout(t)
  }, [copied])
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(identity.email)
          setCopied(true)
        } catch {
          // Clipboard API needs focus + permission — fall back to the old way.
          const ta = document.createElement('textarea')
          ta.value = identity.email
          ta.style.position = 'fixed'
          ta.style.opacity = '0'
          document.body.appendChild(ta)
          ta.select()
          const ok = document.execCommand('copy')
          document.body.removeChild(ta)
          if (ok) setCopied(true)
        }
      }}
      className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-ink/15 bg-cream px-5 py-3 text-sm font-bold text-ink transition hover:border-ink/40"
      aria-live="polite"
    >
      {copied ? '✓ Copied' : 'Copy email'}
    </button>
  )
}

export function ContactModal({ onClose }) {
  const { setGoodbyeSeen, progress } = useStudio()
  const reduce = useReducedMotion()
  useEffect(() => {
    setGoodbyeSeen(true)
  }, [setGoodbyeSeen])

  return (
    <ModalShell title="Send a Paper Plane" accent="coral" onClose={onClose}>
      <p className="text-xl leading-snug font-extrabold tracking-tight sm:text-2xl">{contact.headline}</p>

      {/* mailto fails silently without a mail client — the copy button always works */}
      <div className="mt-5 flex flex-wrap items-center gap-2.5">
        <motion.a
          href={`mailto:${identity.email}`}
          whileHover={reduce ? {} : { scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2.5 rounded-full bg-coral px-7 py-3.5 text-base font-bold text-white shadow-[0_10px_24px_-8px_rgba(232,93,61,0.7)] transition-colors hover:bg-coral-deep"
        >
          {contact.cta}
          <span aria-hidden="true">✈</span>
        </motion.a>
        <CopyEmailButton />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {identity.links.map((l) => (
          <a
            key={l.label}
            href={l.file ? `${import.meta.env.BASE_URL}${l.file}` : l.href}
            target={l.external || l.file ? '_blank' : undefined}
            rel={l.external || l.file ? 'noopener noreferrer' : undefined}
            className="group flex items-center justify-between rounded-xl border border-ink/10 bg-cream px-4 py-3 transition hover:border-coral/50 hover:bg-paper"
          >
            <div>
              <div className="text-sm font-bold">{l.label}</div>
              <div className="text-xs text-ink-soft">{l.note}</div>
            </div>
            <span className="text-ink-soft transition-transform group-hover:translate-x-1" aria-hidden="true">
              {l.file ? '↗' : '→'}
            </span>
          </a>
        ))}
      </div>

      {/* the goodbye moment: the room settles, the cat pads over */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduce ? 0 : 1.1, duration: 0.7 }}
        className="mt-8 rounded-2xl bg-cream-deep p-5 text-center"
      >
        <motion.div
          initial={reduce ? {} : { x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: reduce ? 0 : 1.4, type: 'spring', stiffness: 60, damping: 12 }}
          className="text-3xl"
          aria-hidden="true"
        >
          🐈
        </motion.div>
        <p className="mt-2 font-hand text-2xl leading-snug text-ink">“{contact.goodbye}”</p>
        <p className="mt-2 text-xs font-semibold text-ink-soft">
          {progress >= 100
            ? 'You explored everything. The studio (and all of us) hopes to see you again.'
            : 'The studio will be right here whenever you want to keep exploring.'}
        </p>
        <div className="mt-2 flex justify-center">
          <HiddenCat id={11} size={24} color="#666666" />
        </div>
      </motion.div>
    </ModalShell>
  )
}
