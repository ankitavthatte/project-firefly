import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStudio } from '../../context/StudioContext.jsx'
import { identity, catFacts } from '../../data/content.js'
import { getPuneSeason } from '../../data/season.js'
import { WindowRain } from './StudioScene.jsx'
import HiddenCat from '../shared/HiddenCat.jsx'
import {
  LaptopSvg,
  NotebookSvg,
  MugSvg,
  TrophyShelfSvg,
  BookshelfSvg,
  CatSvg,
  ControllerSvg,
  PaletteSvg,
  PassportSvg,
  StickyNotesSvg,
  PaperPlaneSvg,
  DrawerSvg,
  CalendarSvg,
  LampSvg,
} from './objectSvgs.jsx'

const cards = [
  { id: 'laptop', label: 'Projects & Case Studies', sub: 'Evalix AI · MoneyMinds · ShiftCare', Svg: LaptopSvg, big: true },
  { id: 'notebook', label: 'Design Process', sub: 'It starts with a question', Svg: NotebookSvg },
  { id: 'trophy', label: 'Awards', sub: 'The trophy shelf', Svg: TrophyShelfSvg },
  { id: 'mug', label: 'About Ankita', sub: 'Coffee’s still warm', Svg: MugSvg },
  { id: 'sticky', label: 'Design Philosophy', sub: 'Peel the sticky notes', Svg: StickyNotesSvg },
  { id: 'bookshelf', label: 'My Journey', sub: 'Career, in chapters', Svg: BookshelfSvg },
  { id: 'controller', label: 'Play Mode', sub: 'What games taught me', Svg: ControllerSvg },
  { id: 'palette', label: 'Paint & Pixels', sub: 'Made by hand first', Svg: PaletteSvg },
  { id: 'passport', label: 'Travel', sub: 'Field research', Svg: PassportSvg },
  { id: 'calendar', label: 'This Month', sub: 'The page it’s really on', Svg: CalendarSvg },
  { id: 'drawer', label: 'What’s in the drawer?', sub: 'Probably nothing. Probably.', Svg: DrawerSvg },
  { id: 'contact', label: 'Send a Message', sub: 'Paper plane, ready', Svg: PaperPlaneSvg, big: true },
]

/* The studio, restacked for thumbs: same objects, same doors, vertical room. */
export default function MobileStudio() {
  const { openModal, discovered, findCat, night, setNight } = useStudio()
  const [eyeOpen, setEyeOpen] = useState(false)
  const [season] = useState(() => getPuneSeason())
  const monsoon = season === 'monsoon'

  return (
    <main className="mx-auto max-w-md px-4 pt-24 pb-24">
      {/* dusk falls over the whole room — same lamp trick as the desktop studio.
          z-30 keeps it under the dock (z-40) and modals (z-50). */}
      <div
        className={`pointer-events-none fixed inset-0 z-30 bg-[#2b2547] mix-blend-multiply transition-opacity duration-1000 ${
          night ? 'opacity-60' : 'opacity-0'
        }`}
        aria-hidden="true"
      />
      {night && (
        <div className="pointer-events-none fixed inset-0 z-30" aria-hidden="true">
          {[['15%', '28%', '0.5s', '9s'], ['80%', '20%', '2s', '8s'], ['62%', '52%', '3.5s', '10s'], ['28%', '70%', '1.2s', '7.5s'], ['85%', '82%', '2.6s', '8.5s']].map(([l, t, d, dur], i) => (
            <span key={i} className="firefly absolute h-1.5 w-1.5" style={{ left: l, top: t, animationDelay: d, animationDuration: dur }} />
          ))}
        </div>
      )}

      {/* mini window — follows Pune's season, and the visitor's hour */}
      <div
        className={`relative h-28 overflow-hidden rounded-2xl border-8 border-wood-deep bg-gradient-to-b ${
          night
            ? 'from-[#2b2850] via-[#4a3b6b] to-[#8a5a7a]'
            : monsoon
              ? 'from-[#8ba7b7] to-[#c6d6da]'
              : 'from-sky to-[#e2ecf7]'
        }`}
        aria-hidden="true"
      >
        {night ? (
          <>
            <div className="absolute top-3 right-5 h-7 w-7 rounded-full bg-[#f6efdc] shadow-[0_0_16px_6px_rgba(255,243,214,0.4)]" />
            {[['22%', '20%', '0s'], ['48%', '35%', '1.2s'], ['64%', '15%', '2.1s']].map(([l, t, d], i) => (
              <span key={i} className="twinkle absolute h-1 w-1 rounded-full bg-white/90" style={{ left: l, top: t, animationDelay: d }} />
            ))}
            {[['20%', '60%', '0s'], ['55%', '68%', '1.4s'], ['75%', '58%', '2.6s']].map(([l, t, d], i) => (
              <span key={i} className="firefly absolute h-1.5 w-1.5" style={{ left: l, top: t, animationDelay: d }} />
            ))}
            <div className="absolute -bottom-2 left-[-10%] h-10 w-[70%] rounded-t-full bg-[#1f3a33]" />
            <div className="absolute right-[-10%] -bottom-2 h-12 w-[70%] rounded-t-full bg-[#28473d]" />
          </>
        ) : (
          <>
            <div className={`absolute top-3 right-5 h-8 w-8 rounded-full ${monsoon ? 'bg-[#f3e9cf] opacity-40' : 'bg-sun shadow-[0_0_20px_8px_rgba(255,201,77,0.5)]'}`} />
            <div className={`cloud absolute top-4 left-0 h-4 w-16 rounded-full ${monsoon ? 'bg-[#6e8494]/90' : 'bg-white/90'}`} style={{ animationDuration: '30s' }} />
            <div className={`cloud absolute top-10 left-0 h-3 w-10 rounded-full ${monsoon ? 'bg-[#7d93a1]/80' : 'bg-white/70'}`} style={{ animationDuration: '44s', animationDelay: '-20s' }} />
            <div className={`absolute -bottom-2 left-[-10%] h-10 w-[70%] rounded-t-full ${monsoon ? 'bg-[#2f6e57]/90' : 'bg-mint-deep/70'}`} />
            <div className={`absolute right-[-10%] -bottom-2 h-12 w-[70%] rounded-t-full ${monsoon ? 'bg-[#3c8a6e]/90' : 'bg-mint/80'}`} />
            {monsoon && <WindowRain />}
          </>
        )}
      </div>
      {/* the lamp works on mobile too — Project Firefly keeps its light switch */}
      <div className="mt-1 flex items-center justify-between pl-2">
        <div className="flex items-center gap-2">
          <p className="font-hand text-lg text-ink-soft">{night ? 'the fireflies are out' : 'try the lamp →'}</p>
          <HiddenCat id={2} size={18} color="#2f6e57" />
        </div>
        <motion.button
          type="button"
          aria-pressed={night}
          aria-label={night ? 'Desk lamp — switch the studio back to daytime' : 'Desk lamp — dim the studio to evening'}
          onClick={() => setNight(!night)}
          whileTap={{ scale: 0.92, rotate: -3 }}
          className="relative z-[31] -mt-3 w-16 cursor-pointer border-none bg-transparent p-0"
        >
          <LampSvg night={night} />
        </motion.button>
      </div>

      <header className="mt-4">
        <p className="font-hand text-2xl text-coral-deep">Ankita Thatte · Product Designer · Pune</p>
        <h1 className="mt-1 text-3xl leading-tight font-extrabold tracking-tight">{identity.heroLine}</h1>
        <p className="mt-2.5 text-base leading-relaxed text-ink-soft">{identity.heroSub}</p>
      </header>

      {/* the cat, front and center on the rug */}
      <motion.button
        type="button"
        aria-label="Miso, the studio cat — one of Ankita’s 11 rescues. Say hello."
        onClick={() => findCat(1, catFacts[0])}
        onTapStart={() => setEyeOpen(true)}
        onTap={() => setTimeout(() => setEyeOpen(false), 1500)}
        whileTap={{ scale: 0.96 }}
        className="mx-auto mt-5 block w-40 cursor-pointer border-none bg-transparent p-0"
      >
        <CatSvg eyeOpen={eyeOpen} stretching={false} />
      </motion.button>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {cards.map(({ id, label, sub, Svg, big }, i) => {
          const seen = discovered.has(id)
          return (
            <motion.button
              key={id}
              type="button"
              onClick={(e) => openModal(id, e)}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: (i % 2) * 0.06, type: 'spring', stiffness: 200, damping: 20 }}
              whileTap={{ scale: 0.97 }}
              className={`relative cursor-pointer rounded-2xl bg-paper p-4 text-left shadow-sm transition hover:shadow-md ${
                big ? 'col-span-2' : ''
              }`}
              aria-label={`${label}${seen ? ' (explored)' : ''}`}
            >
              {!seen && (
                <span className="absolute top-3 right-3 h-2.5 w-2.5 rounded-full bg-coral" aria-hidden="true" />
              )}
              <div className={`mx-auto ${big ? 'w-40' : 'w-24'}`}>
                <Svg active={false} />
              </div>
              <div className="mt-2 text-sm font-bold">{label}</div>
              <div className="text-xs text-ink-soft">{sub}</div>
            </motion.button>
          )
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-ink-soft">
        <span>psst — tiny cats are hiding all over this studio</span>
        <HiddenCat id={3} size={20} color="#7c5427" />
      </div>
    </main>
  )
}
