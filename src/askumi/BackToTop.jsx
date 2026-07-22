import { useEffect, useState } from 'react'

// A floating "back to top" button that fades in once you reach the bottom of
// the page, on every route. The app scrolls on <body> (overflow-x:hidden
// promotes it to the scroll container), so we read/scroll that element and
// catch its scroll events in the capture phase.
export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const scroller = () =>
      document.body.scrollHeight > document.documentElement.clientHeight + 4
        ? document.body
        : document.scrollingElement || document.documentElement

    const check = () => {
      const el = scroller()
      const max = el.scrollHeight - el.clientHeight
      const scrollable = max > 240
      setShow(scrollable && el.scrollTop >= max - 260)
    }

    check()
    window.addEventListener('scroll', check, true) // capture catches <body> scroll
    window.addEventListener('resize', check)
    window.addEventListener('hashchange', check)
    return () => {
      window.removeEventListener('scroll', check, true)
      window.removeEventListener('resize', check)
      window.removeEventListener('hashchange', check)
    }
  }, [])

  const toTop = () => {
    const el =
      document.body.scrollHeight > document.documentElement.clientHeight + 4
        ? document.body
        : document.scrollingElement || document.documentElement
    el.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full border border-[color:var(--color-ink)] bg-[color:var(--color-paper)] text-[color:var(--color-ink)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-paper)] ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 19V5M6 11l6-6 6 6" />
      </svg>
    </button>
  )
}
