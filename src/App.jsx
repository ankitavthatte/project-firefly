// ASKUMI-style redesign (branch: askumi-version).
// A single-scroll, software-UI-flavoured portfolio built on the same
// content.js as the studio version — so copy stays in one place.
import Hero from './askumi/Hero.jsx'
import IntroBand from './askumi/IntroBand.jsx'
import SelectedWorks from './askumi/SelectedWorks.jsx'
import FunStuff from './askumi/FunStuff.jsx'
import WorkedWith from './askumi/WorkedWith.jsx'
import SiteFooter from './askumi/SiteFooter.jsx'

export default function App() {
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
