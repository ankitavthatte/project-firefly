import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { projects, experiments, archive } from '../data/content.js'

// Everything discoverable in the studio. Progress = fraction of these opened.
export const DISCOVERABLES = [
  'laptop',
  'notebook',
  'trophy',
  'mug',
  'passport',
  'bookshelf',
  'sticky',
  'drawer',
  'calendar',
  'contact',
]

// The recommended path through the room, in reading order. Not everything —
// just the five stops that actually matter, each with the reason to open it.
// Both the first-visit JourneyGuide and the progress meter point here so the
// visitor is always told what to see next and why, never just "click around".
export const GUIDED_PATH = [
  { id: 'laptop', label: 'The work', hint: 'Case studies live here' },
  { id: 'notebook', label: 'How I work', hint: 'Process & principles' },
  { id: 'bookshelf', label: 'My journey', hint: 'Career so far' },
  { id: 'mug', label: 'About me', hint: 'The person behind it' },
  { id: 'contact', label: 'Say hello', hint: 'Get in touch' },
]

/* ---------- Shareable URLs ----------
   Every door in the studio has a hash route, so case studies and Recruiter
   Mode can be linked, bookmarked, and sent to a colleague:
     #/recruiter          → Recruiter Mode
     #/work               → the laptop (project desktop)
     #/work/evalix        → a case study, straight to it
     #/work/exp-irctc     → an experiment gallery
     #/notebook, #/mug…   → any other object's modal
   Hash routing (not paths) keeps deep links working on GitHub Pages. */

const MODAL_IDS = new Set([...DISCOVERABLES, 'speedrun'])

const LAPTOP_VIEWS = new Set([
  'desktop',
  'experiments',
  'archive',
  ...projects.map((p) => p.id),
  ...[...experiments, ...archive.items].filter((e) => e.id && e.media).map((e) => `exp-${e.id}`),
])

function parseHash(hash) {
  const h = (hash || '').replace(/^#\/?/, '').replace(/\/+$/, '')
  if (!h) return { recruiter: false, modal: null, view: 'desktop' }
  if (h === 'recruiter') return { recruiter: true, modal: null, view: 'desktop' }
  if (h === 'work' || h.startsWith('work/')) {
    const sub = h.slice('work/'.length)
    return { recruiter: false, modal: 'laptop', view: LAPTOP_VIEWS.has(sub) ? sub : 'desktop' }
  }
  if (MODAL_IDS.has(h)) return { recruiter: false, modal: h, view: 'desktop' }
  return { recruiter: false, modal: null, view: 'desktop' }
}

function buildHash({ recruiter, modal, view }) {
  if (recruiter) return '#/recruiter'
  if (modal === 'laptop') return view && view !== 'desktop' ? `#/work/${view}` : '#/work'
  if (modal) return `#/${modal}`
  return ''
}

// The studio keeps the visitor's hours: arrive late and the lights are already low.
export function isAfterHours() {
  const h = new Date().getHours()
  return h >= 19 || h < 6
}

export const TOTAL_CATS = 11

const StudioContext = createContext(null)

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function StudioProvider({ children }) {
  const [discovered, setDiscovered] = useState(() => new Set(load('ff-discovered', [])))
  const [catsFound, setCatsFound] = useState(() => new Set(load('ff-cats', [])))
  // Arriving on a deep link lands directly on that view — no re-exploring.
  const [route] = useState(() => parseHash(window.location.hash))
  const [recruiterMode, setRecruiterMode] = useState(route.recruiter)
  const [whyMode, setWhyMode] = useState(false)
  // The studio always opens in daylight. A dark room on arrival reads as a
  // gloomy site, not "it's night" — so night stays a reward reached through
  // the lamp, never the default. `afterHours` (real evening, visitor's clock)
  // only tailors the gentle invitation to try it; it no longer dims anything.
  const [night, setNight] = useState(false)
  const [afterHours] = useState(isAfterHours)
  const [activeModal, setActiveModal] = useState(route.modal)
  const [laptopView, setLaptopView] = useState(route.view) // which screen the laptop shows
  const [modalOrigin, setModalOrigin] = useState(null) // viewport {x, y} the modal grows from
  const [catToast, setCatToast] = useState(null) // { index, fact, all }
  const [goodbyeSeen, setGoodbyeSeen] = useState(false)
  const [finale, setFinale] = useState(false)

  useEffect(() => {
    localStorage.setItem('ff-discovered', JSON.stringify([...discovered]))
  }, [discovered])
  useEffect(() => {
    localStorage.setItem('ff-cats', JSON.stringify([...catsFound]))
  }, [catsFound])

  const discover = useCallback((id) => {
    setDiscovered((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }, [])

  // Every open counts as discovered — clicks and deep links alike.
  useEffect(() => {
    if (activeModal && DISCOVERABLES.includes(activeModal)) discover(activeModal)
  }, [activeModal, discover])

  const openModal = useCallback((id, ev) => {
    setModalOrigin(ev && typeof ev.clientX === 'number' ? { x: ev.clientX, y: ev.clientY } : null)
    if (id === 'laptop') setLaptopView('desktop') // a fresh click starts at the desktop
    setActiveModal(id)
  }, [])

  const closeModal = useCallback(() => setActiveModal(null), [])

  // State → URL: the address bar always names what's on screen.
  useEffect(() => {
    const target = buildHash({ recruiter: recruiterMode, modal: activeModal, view: laptopView })
    if (window.location.hash === target) return
    if (target) {
      window.location.hash = target
    } else if (window.location.hash) {
      // Clear the hash without scrolling; keeps a history entry so Back works.
      history.pushState(null, '', window.location.pathname + window.location.search)
    }
  }, [recruiterMode, activeModal, laptopView])

  // URL → state: back/forward (and pasted links) drive the studio.
  const routeRef = useRef(null)
  routeRef.current = { recruiterMode, activeModal, laptopView }
  useEffect(() => {
    const onHash = () => {
      const next = parseHash(window.location.hash)
      const cur = routeRef.current
      if (next.recruiter !== cur.recruiterMode) setRecruiterMode(next.recruiter)
      if (next.modal !== cur.activeModal) {
        setModalOrigin(null) // no object was clicked — grow from center
        setActiveModal(next.modal)
      }
      if (next.view !== cur.laptopView) setLaptopView(next.view)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const findCat = useCallback((catId, fact) => {
    setCatsFound((prev) => {
      if (prev.has(catId)) return prev
      const next = new Set(prev)
      next.add(catId)
      setCatToast({ index: next.size, fact, all: next.size >= TOTAL_CATS })
      return next
    })
  }, [])

  useEffect(() => {
    if (!catToast) return
    const t = setTimeout(() => setCatToast(null), catToast.all ? 7000 : 4200)
    return () => clearTimeout(t)
  }, [catToast])

  const progress = Math.round((discovered.size / DISCOVERABLES.length) * 100)

  // The finale fires once, the first time the room is fully explored.
  useEffect(() => {
    if (progress >= 100 && !load('ff-finale', false)) {
      localStorage.setItem('ff-finale', 'true')
      setFinale(true)
      const t = setTimeout(() => setFinale(false), 14000)
      return () => clearTimeout(t)
    }
  }, [progress])

  const value = useMemo(
    () => ({
      discovered,
      progress,
      catsFound,
      findCat,
      catToast,
      recruiterMode,
      setRecruiterMode,
      whyMode,
      setWhyMode,
      night,
      setNight,
      afterHours,
      activeModal,
      openModal,
      closeModal,
      modalOrigin,
      laptopView,
      setLaptopView,
      goodbyeSeen,
      setGoodbyeSeen,
      finale,
      setFinale,
    }),
    [discovered, progress, catsFound, findCat, catToast, recruiterMode, whyMode, night, afterHours, activeModal, openModal, closeModal, modalOrigin, laptopView, goodbyeSeen, finale],
  )

  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>
}

export function useStudio() {
  const ctx = useContext(StudioContext)
  if (!ctx) throw new Error('useStudio must be used inside StudioProvider')
  return ctx
}
