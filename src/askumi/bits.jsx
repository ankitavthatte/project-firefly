// Small shared pieces for the ASKUMI-style design: logo mark, a marquee,
// a mono section label, and a decorative sticker wrapper.

export function Asterisk({ className = '', size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M11 2h2v6.6l4.7-4.6 1.4 1.4L14.4 10H21v2h-6.6l4.7 4.6-1.4 1.4L13 13.4V20h-2v-6.6l-4.7 4.6-1.4-1.4L9.6 12H3v-2h6.6L4.9 5.4 6.3 4 11 8.6z"
      />
    </svg>
  )
}

export function Marquee({ items, className = '' }) {
  const doubled = [...items, ...items]
  return (
    <div className={`marquee ${className}`}>
      <div className="marquee__track">
        {doubled.map((t, i) => (
          <span key={i} className="mono inline-flex items-center gap-3 text-[0.8rem]">
            {t}
            <Asterisk size={11} />
          </span>
        ))}
      </div>
    </div>
  )
}

// The tiny bracketed technical label: [ 01 / SELECTED WORKS ]
export function TechLabel({ index, children, className = '' }) {
  return (
    <span className={`tech inline-flex items-center gap-2 ${className}`}>
      <span aria-hidden>[</span>
      {index && <span className="text-[color:var(--color-orange)]">{index}</span>}
      {children}
      <span aria-hidden>]</span>
    </span>
  )
}

// A rotated, floating decorative emoji sticker. Decorative only.
export function Sticker({ children, rot = 0, drift = 'a', className = '', size = '2rem' }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none select-none absolute float-${drift} ${className}`}
      style={{ '--r': `${rot}deg`, transform: `rotate(${rot}deg)`, fontSize: size, lineHeight: 1 }}
    >
      {children}
    </span>
  )
}
