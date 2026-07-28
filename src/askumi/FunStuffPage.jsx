import { funStuff } from '../data/content.js'
import Masthead from './Masthead.jsx'

const asset = (p) => `${import.meta.env.BASE_URL}${p}`

// "Fun Stuff" as a pinned-card board: a big yellow panel titled "Fun
// Experiments at 2 AM" holding photo cards, each clipped on with a
// paperclip and tilted slightly. Each card IS the product image (or a
// tinted panel when no photo exists), with the title, quote mark and blurb
// written directly on top of it over a dark scrim. The board is
// deliberately bright in both themes.
export default function FunStuffPage() {
  return (
    <div className="grain relative z-10 min-h-full">
      <Masthead active="fun" />

      <div className="wrap py-10 sm:py-14">
        <div className="relative rounded-[28px] bg-[#f2a44e] px-3 pb-14 pt-12 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.5)] sm:px-8">
          {/* corner paperclip */}
          <Clip className="absolute -top-3 right-8 rotate-12 drop-shadow" width={32} height={52} />

          {/* header */}
          <div className="text-center">
            <h1 className="fancy text-[2.1rem] leading-tight text-[#241a0d] sm:text-[3rem]">
              Fun Experiments at 2 AM
            </h1>
          </div>

          {/* card rail — scrolls continuously, pauses on hover */}
          <div className="card-scroll mt-6">
            <div className="card-scroll__track">
              {[...funStuff, ...funStuff].map((item, i) => (
                <FunCard key={item.title + i} item={item} i={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FunCard({ item, i }) {
  const tilt = (i % 2 ? 1 : -1) * (1.4 + (i % 3) * 0.4)
  // Open in a new tab for off-site links and for items that opt in (e.g. a
  // self-hosted playable that should not replace the portfolio tab).
  const newTab = item.href?.startsWith('http') || item.newTab

  // The card's full visual — a real photo/video if we have one, otherwise a
  // tinted panel built from the item's accent colour. Either way this fills
  // the entire card; text sits on top of it.
  const visual = item.video ? (
    <video
      src={asset(item.video)}
      poster={item.img ? asset(item.img) : undefined}
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 h-full w-full object-cover"
    />
  ) : item.img ? (
    <img
      src={asset(item.img)}
      alt={item.title}
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover"
    />
  ) : (
    <div
      className="absolute inset-0"
      style={{ background: `linear-gradient(160deg, ${item.tint}, ${item.tint}cc 55%, #201a12)` }}
      aria-hidden
    />
  )

  const content = (
    <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[14px]">
      {visual}
      {/* scrim so the white text stays legible over any photo */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/25" />

      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="fancy text-[2.6rem] leading-[0.5] text-white/70" aria-hidden>
          “
        </div>
        <h3 className="fancy mt-1 text-[1.35rem] leading-tight text-white">{item.title}</h3>
        <p className="mt-2 text-[0.82rem] leading-relaxed text-white/85">{item.desc}</p>
      </div>
    </div>
  )

  return (
    <article
      className="relative w-56 shrink-0 snap-center rounded-[16px] shadow-[0_16px_34px_-14px_rgba(0,0,0,0.5)] sm:w-64"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <Clip
        className="absolute -top-5 left-1/2 -translate-x-1/2 rotate-6 drop-shadow"
        width={26}
        height={44}
      />
      {item.href ? (
        <a
          href={item.href}
          {...(newTab ? { target: '_blank', rel: 'noreferrer' } : {})}
          aria-label={`Open ${item.title}`}
          className="cursor-hand-lg block"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </article>
  )
}

// A little metallic paperclip.
function Clip({ className = '', width = 26, height = 44 }) {
  return (
    <svg
      viewBox="0 0 24 40"
      width={width}
      height={height}
      className={className}
      fill="none"
      aria-hidden
    >
      <path
        d="M17 12v16a5.4 5.4 0 0 1-10.8 0V9.5a3.4 3.4 0 0 1 6.8 0v17.2a1.5 1.5 0 0 1-3 0V12.5"
        stroke="#9aa0aa"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 12v16a5.4 5.4 0 0 1-10.8 0V9.5a3.4 3.4 0 0 1 6.8 0v17.2a1.5 1.5 0 0 1-3 0V12.5"
        stroke="#ffffff"
        strokeOpacity="0.5"
        strokeWidth="0.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
