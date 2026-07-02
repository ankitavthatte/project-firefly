import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

// Everything discoverable in the studio. Progress = fraction of these opened.
export const DISCOVERABLES = [
  'laptop',
  'notebook',
  'trophy',
  'mug',
  'passport',
  'controller',
  'palette',
  'bookshelf',
  'sticky',
  'drawer',
  'contact',
]

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
  const [recruiterMode, setRecruiterMode] = useState(false)
  const [whyMode, setWhyMode] = useState(false)
  const [night, setNight] = useState(false)
  const [activeModal, setActiveModal] = useState(null)
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

  const openModal = useCallback(
    (id, ev) => {
      setModalOrigin(ev && typeof ev.clientX === 'number' ? { x: ev.clientX, y: ev.clientY } : null)
      setActiveModal(id)
      if (DISCOVERABLES.includes(id)) discover(id)
    },
    [discover],
  )

  const closeModal = useCallback(() => setActiveModal(null), [])

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
      activeModal,
      openModal,
      closeModal,
      modalOrigin,
      goodbyeSeen,
      setGoodbyeSeen,
      finale,
      setFinale,
    }),
    [discovered, progress, catsFound, findCat, catToast, recruiterMode, whyMode, night, activeModal, openModal, closeModal, modalOrigin, goodbyeSeen, finale],
  )

  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>
}

export function useStudio() {
  const ctx = useContext(StudioContext)
  if (!ctx) throw new Error('useStudio must be used inside StudioProvider')
  return ctx
}
