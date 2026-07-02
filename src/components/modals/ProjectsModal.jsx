import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import ModalShell from '../shared/ModalShell.jsx'
import HiddenCat from '../shared/HiddenCat.jsx'
import { projects, experiments } from '../../data/content.js'

const folderColors = {
  evalix: 'bg-lavender',
  moneyminds: 'bg-sun',
  shiftcare: 'bg-mint',
  experiments: 'bg-sky',
  archive: 'bg-coral/70',
}

const accentText = {
  lavender: 'text-lavender-deep',
  sun: 'text-sun-deep',
  mint: 'text-mint-deep',
  sky: 'text-sky-deep',
}
const accentSoft = {
  lavender: 'bg-lavender/20 border-lavender/50',
  sun: 'bg-sun/20 border-sun/60',
  mint: 'bg-mint/20 border-mint/60',
  sky: 'bg-sky/20 border-sky/60',
}

function Folder({ color, label, sub, onClick, big = false }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`group flex cursor-pointer flex-col items-start gap-2 rounded-2xl border-2 border-transparent bg-cream p-4 text-left transition-colors hover:border-ink/10 ${
        big ? 'sm:col-span-2' : ''
      }`}
      aria-label={`Open ${label}`}
    >
      <span className="relative block">
        <span className={`block h-4 w-8 rounded-t-md ${color}`} />
        <span className={`block h-9 w-14 rounded-md rounded-tl-none ${color} shadow-sm transition-transform group-hover:-rotate-2`} />
        {big && (
          <span className="absolute -top-1 -right-2 rounded-full bg-coral px-1.5 py-0.5 text-[9px] font-extrabold text-white shadow">
            ★
          </span>
        )}
      </span>
      <span className="text-sm font-extrabold text-ink">{label}</span>
      <span className="text-xs leading-snug text-ink-soft">{sub}</span>
    </motion.button>
  )
}

function CaseStudy({ project, onBack }) {
  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
    >
      <button
        onClick={onBack}
        className="mb-4 inline-flex cursor-pointer items-center gap-2 rounded-full bg-cream-deep px-4 py-2 text-xs font-bold text-ink transition hover:bg-cream"
      >
        ← Back to desktop
      </button>

      <div className={`rounded-2xl border p-5 sm:p-6 ${accentSoft[project.color]}`}>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-2xl font-extrabold tracking-tight">{project.name}</h3>
          {project.flagship && (
            <span className="rounded-full bg-ink px-3 py-1 text-[10px] font-extrabold tracking-wider text-cream uppercase">
              Flagship case study
            </span>
          )}
        </div>
        <p className={`mt-1 font-hand text-xl ${accentText[project.color]}`}>{project.metaphor}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-ink">{project.summary}</p>
      </div>

      {/* stats */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {project.stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-cream p-3 text-center">
            <div className={`text-xl font-extrabold ${accentText[project.color]}`}>{s.value}</div>
            <div className="mt-0.5 text-[11px] leading-tight font-semibold text-ink-soft">{s.label}</div>
          </div>
        ))}
      </div>

      {/* scope chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        {project.chips.map((c) => (
          <span key={c} className="rounded-full border border-ink/10 bg-paper px-3 py-1 text-xs font-semibold text-ink-soft">
            {c}
          </span>
        ))}
      </div>

      {/* story */}
      <div className="mt-6 space-y-5">
        {project.story.map((s, i) => (
          <motion.section
            key={s.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
          >
            <h4 className="flex items-center gap-2 text-sm font-extrabold tracking-wider uppercase">
              <span className={`inline-block h-2 w-2 rounded-full ${folderColors[project.id] ?? 'bg-coral'}`} />
              {s.title}
            </h4>
            <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{s.body}</p>
          </motion.section>
        ))}
      </div>

      {project.highlight && (
        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-ink p-4 text-cream">
          <span className="text-xl" aria-hidden="true">🎤</span>
          <p className="text-sm leading-relaxed font-semibold">{project.highlight}</p>
          {project.id === 'evalix' && <HiddenCat id={5} size={22} color="#fff6ea" className="ml-auto shrink-0" />}
        </div>
      )}
    </motion.div>
  )
}

export default function ProjectsModal({ onClose }) {
  const reduce = useReducedMotion()
  const [booted, setBooted] = useState(reduce)
  const [view, setView] = useState('desktop') // 'desktop' | project id | 'experiments'

  useEffect(() => {
    if (booted) return
    const t = setTimeout(() => setBooted(true), 1100)
    return () => clearTimeout(t)
  }, [booted])

  const openProject = projects.find((p) => p.id === view)

  return (
    <ModalShell title="Ankita’s Laptop" accent="lavender" onClose={onClose} wide>
      {!booted ? (
        <div className="grid h-72 place-items-center rounded-2xl bg-ink" role="status" aria-label="Laptop booting">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 14 }}
              className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-coral text-2xl"
            >
              ✦
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-3 font-hand text-xl text-cream"
            >
              ankitaOS is waking up…
            </motion.p>
            <motion.div className="mx-auto mt-3 h-1.5 w-40 overflow-hidden rounded-full bg-cream/20">
              <motion.div
                className="h-full rounded-full bg-coral"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.95, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {view === 'desktop' && (
            <motion.div key="desktop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -30 }}>
              <p className="mb-4 text-sm text-ink-soft">
                Three shipped products, a drawer of experiments, and one very important folder of cat photos
                (that one’s locked). Start with <strong className="text-ink">Evalix AI</strong> — it’s the big one.
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <Folder
                  big
                  color={folderColors.evalix}
                  label="Evalix AI ✦"
                  sub="Flagship — enterprise AI assessment platform, 300+ screens, sole designer."
                  onClick={() => setView('evalix')}
                />
                <Folder
                  color={folderColors.moneyminds}
                  label="MoneyMinds"
                  sub="Gamified financial literacy."
                  onClick={() => setView('moneyminds')}
                />
                <Folder
                  color={folderColors.shiftcare}
                  label="ShiftCare"
                  sub="Healthcare staff scheduling."
                  onClick={() => setView('shiftcare')}
                />
                <Folder
                  color={folderColors.experiments}
                  label="Experiments"
                  sub="Redesigns & explorations."
                  onClick={() => setView('experiments')}
                />
                <Folder
                  color={folderColors.archive}
                  label="Archive"
                  sub="The architecture years."
                  onClick={() => setView('experiments')}
                />
              </div>
              <div className="mt-4 flex items-center justify-between rounded-xl bg-cream px-4 py-2">
                <span className="text-[11px] font-semibold text-ink-soft">ankitaOS · all files designed with love (and Figma)</span>
                <HiddenCat id={4} size={20} color="#8f77e0" />
              </div>
            </motion.div>
          )}

          {openProject && <CaseStudy key={openProject.id} project={openProject} onBack={() => setView('desktop')} />}

          {view === 'experiments' && (
            <motion.div key="exp" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }}>
              <button
                onClick={() => setView('desktop')}
                className="mb-4 inline-flex cursor-pointer items-center gap-2 rounded-full bg-cream-deep px-4 py-2 text-xs font-bold text-ink transition hover:bg-cream"
              >
                ← Back to desktop
              </button>
              <h3 className="text-xl font-extrabold">Experiments & Archive</h3>
              <p className="mt-1 text-sm text-ink-soft">
                Side quests. Every one started the same way: “this experience bothers me, and I can’t leave it alone.”
              </p>
              <ul className="mt-4 space-y-3">
                {experiments.map((e) => (
                  <li key={e.name} className="flex items-start gap-3 rounded-xl bg-cream p-3.5">
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-sky/40 text-sm" aria-hidden="true">
                      ✎
                    </span>
                    <div>
                      <div className="text-sm font-extrabold">{e.name}</div>
                      <div className="text-xs leading-relaxed text-ink-soft">{e.note}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </ModalShell>
  )
}
