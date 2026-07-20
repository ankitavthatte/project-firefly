// ASKUMI-style redesign (branch: askumi-version).
// A single-scroll, software-UI-flavoured portfolio built on the same
// content.js as the studio version — so copy stays in one place.
import { useEffect, useState } from 'react'
import Hero from './askumi/Hero.jsx'
import IntroBand from './askumi/IntroBand.jsx'
import SelectedWorks from './askumi/SelectedWorks.jsx'
import FunStuff from './askumi/FunStuff.jsx'
import WorkedWith from './askumi/WorkedWith.jsx'
import SiteFooter from './askumi/SiteFooter.jsx'
import ProjectPage, { findWork } from './askumi/ProjectPage.jsx'

const WORK_ROUTE = /^#\/work\/(.+)$/

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash)
  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Manage scroll: a work page jumps to the top; a section anchor scrolls
  // to its element once the home page has rendered.
  useEffect(() => {
    if (WORK_ROUTE.test(hash)) {
      window.scrollTo(0, 0)
    } else if (hash && hash.length > 1) {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView()
    }
  }, [hash])

  return hash
}

export default function App() {
  const hash = useHashRoute()

  const match = hash.match(WORK_ROUTE)
  if (match) {
    const item = findWork(match[1])
    if (item) return <ProjectPage item={item} />
  }

  return (
    <div className="grain min-h-full bg-[color:var(--color-paper)]">
      <Hero />
      <main>
        <IntroBand />
        <SelectedWorks />
        <FunStuff />
        <WorkedWith />
      </main>
      <SiteFooter />
    </div>
  )
}
