import { funStuff } from '../data/content.js'
import Masthead from './Masthead.jsx'

const asset = (p) => `${import.meta.env.BASE_URL}${p}`

// "Fun Stuff" as a pinned-card board: a big yellow panel titled "Fun
// Experiments at 2 AM" holding white index cards, each clipped on with a
// paperclip, tilted slightly, with an italic title, a coloured quote mark,
// a blurb and an image. The board is deliberately bright in both themes.
export default function FunStuffPage() {
  return (
    <div className="grain relative z-10 min-h-full">
      <Masthead active="fun" />

      <div className="wrap py-10 sm:py-14">
        <div className="relative rounded-[28px] bg-[#f4cb45] px-3 pb-14 pt-12 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.5)] sm:px-8">
          {/* corner paperclip */}
          <Clip className="absolute -top-3 right-8 rotate-12 drop-shadow" width={32} height={52} />

          {/* header */}
          <div className="text-center">
            <div className="text-4xl" aria-hidden>🍒</div>
            <h1 className="fancy mt-2 text-[2.1rem] leading-tight text-[#241a0d] sm:text-[3rem]">
              Fun Experiments at 2 AM
            </h1>
          </div>

          {/* card rail */}
          <div className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 pb-4 pt-10 [scrollbar-width:thin]">
            {funStuff.map((item, i) => (
              <FunCard key={item.title} item={item} i={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function FunCard({ item, i }) {
  const tilt = (i % 2 ? 1 : -1) * (1.4 + (i % 3) * 0.4)
  const external = item.href?.startsWith('http')

  const content = (
    <>
      <h3 className="fancy text-[1.35rem] leading-tight text-[#211c15]">{item.title}</h3>
      <div className="fancy -mb-2 mt-1 text-[3.4rem] leading-[0.5]" style={{ color: item.tint }} aria-hidden>
        “
      </div>
      <p className="mt-3 text-[0.9rem] leading-relaxed text-[#4c473e]">{item.desc}</p>
      <div className="mt-4 overflow-hidden rounded-lg">
        {item.img ? (
          <img
            src={asset(item.img)}
            alt={item.title}
            loading="lazy"
            className="h-40 w-full object-cover"
          />
        ) : (
          <div
            className="grid h-40 w-full place-items-center text-5xl"
            style={{ background: `${item.tint}66` }}
          >
            <span aria-hidden>{item.emoji}</span>
          </div>
        )}
      </div>
    </>
  )

  return (
    <article
      className="relative w-[18.5rem] shrink-0 snap-center rounded-[14px] bg-[#fbfaf4] p-6 pt-7 shadow-[0_16px_34px_-14px_rgba(0,0,0,0.4)]"
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
          {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
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
