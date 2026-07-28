// ASKUMI-style redesign (branch: askumi-version).
// A single-scroll, software-UI-flavoured portfolio built on the same
// content.js as the studio version — so copy stays in one place.
import { identity, nowBoard } from '../data/content.js'

const asset = (p) => `${import.meta.env.BASE_URL}${p}`

// The home-page Fun Stuff section: a scattered scrapbook collage. A kaomoji
// heading sits in the middle while real off-the-clock photos and short videos
// drift around it at playful angles, and a blue butterfly flutters across the
// whole thing. On small screens the scatter tidies into a scrollable rail.
const COLLAGE = [
  {
    kind: 'image',
    src: 'fun/sketching.jpg',
    cap: 'Sketchbook · on location',
    rot: -5,
    cls: 'lg:absolute lg:left-[2%] lg:top-2 lg:w-52',
  },
  {
    kind: 'video',
    src: 'fun/market.mp4',
    poster: 'fun/market.jpg',
    cap: 'Flea-market field notes',
    rot: 4,
    cls: 'lg:absolute lg:right-[4%] lg:top-0 lg:w-48',
  },
  {
    kind: 'video',
    src: 'fun/ferris-build.mp4',
    poster: 'fun/ferris-build.jpg',
    cap: 'Weekend build',
    rot: -3,
    cls: 'lg:absolute lg:bottom-1 lg:right-[15%] lg:w-44',
  },
  {
    kind: 'video',
    src: 'fun/farm.mp4',
    poster: 'fun/farm.jpg',
    cap: 'Farm days',
    rot: 3,
    cls: 'lg:absolute lg:bottom-0 lg:left-[8%] lg:w-48',
  },
  {
    kind: 'image',
    src: 'fun/vr-expo.jpg',
    cap: 'Tried the future',
    rot: 6,
    cls: 'lg:absolute lg:right-[1%] lg:top-[44%] lg:w-40',
  },
]

const doodle = nowBoard.items.find((i) => i.href)?.href

export default function FunStuff() {
  return (
    <section id="fun" className="relative overflow-hidden py-24">
      <FunMotionStyles />
      <div className="wrap relative">
        {/* the collage stage — heading centered, cards scattered around it */}
        <div className="relative lg:min-h-[44rem]">
          {/* heading + blurb (centered on desktop, in-flow on mobile) */}
          <div className="flex flex-col items-center justify-center text-center lg:absolute lg:inset-0">
            <div className="display text-3xl text-[color:var(--color-orange)] sm:text-4xl">
              <span className="mono align-middle text-2xl">٩(^ᴗ^)۶</span> Fun stuff{' '}
              <span className="mono align-middle text-2xl">(๑&gt;ᴗ&lt;)๑</span>
            </div>
            <p className="mono mx-auto mt-4 max-w-md text-[0.85rem] leading-relaxed text-[color:var(--color-ink-soft)]">
              What happens when I’m left alone with my laptop — the traveling,
              building, sketching and eleven-cat chaos. Projects that exist purely
              because I said “what if?”
            </p>
          </div>

          {/* the butterfly, fluttering across the collage */}
          <Butterfly />

          {/* the media cards — a scroll rail on mobile, a seamless marquee on desktop that
              runs continuously from right to left */}
          <div className="mt-10 lg:mt-0">
            <div className="fun-cards-wrap">
              {/* Duplicate the COLLAGE in the DOM to create a seamless loop */}
              <div className="fun-cards-track mt-2 flex snap-x gap-4 pb-2 overflow-x-auto lg:block lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {[...COLLAGE, ...COLLAGE].map((item, i) => (
                  <FloatCard key={`${item.src}-${i}`} item={item} i={i} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* tag stickers + daily-doodle link */}
        <div className="relative mt-12 flex flex-wrap items-center justify-center gap-2.5">
          {identity.tags.map((t, i) => (
            <span
              key={t}
              className="mono inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-card-hi)] px-3.5 py-2 text-[0.74rem]"
              style={{ transform: `rotate(${(i % 2 ? 1 : -1) * (2 + (i % 3))}deg)` }}
            >
              {t}
            </span>
          ))}
        </div>

        {doodle && (
          <div className="relative mt-8 text-center">
            <a href={doodle} target="_blank" rel="noreferrer" className="pill">
              Daily doodles @punedoodlerr →
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

// One drifting card in the collage. Floats gently (via floaty) keeping its tilt,
// and the media inside lifts a touch on hover.
function FloatCard({ item, i }) {
  const floatCls = i % 2 ? 'float-b' : 'float-a'
  return (
    <figure
      className={`group relative w-44 shrink-0 snap-center rounded-[18px] border border-[color:var(--color-line)] bg-[color:var(--color-card-hi)] p-2 pb-3 shadow-[0_16px_34px_-14px_rgba(0,0,0,0.4] ${floatCls} ${item.cls}`}
      style={{ '--r': `${item.rot}deg`, transform: `rotate(${item.rot}deg)` }}
    >
      <div className="overflow-hidden rounded-[12px]">
        {item.kind === 'video' ? (
          <video
            src={asset(item.src)}
            poster={item.poster ? asset(item.poster) : undefined}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
        ) : (
          <img
            src={asset(item.src)}
            alt={item.cap}
            loading="lazy"
            className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
        )}
      </div>
      <figcaption className="mono px-1 pt-2 text-[0.62rem] leading-tight text-[color:var(--color-ink-soft)]">
        {item.cap}
      </figcaption>
    </figure>
  )
}

// A little blue morpho butterfly. The two wing halves flap (scaleX toward the
// body) while the whole thing wanders a slow looping path across the section.
function Butterfly() {
  return (
    <div className="bfly pointer-events-none absolute left-[8%] top-20 z-20 hidden sm:block" aria-hidden="true">
      <svg width="58" height="58" viewBox="0 0 80 80" className="bfly-body">
        <defs>
          <linearGradient id="bflyWing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7aa2ff" />
            <stop offset="0.55" stopColor="#4f7bff" />
            <stop offset="1" stopColor="#2f4fb8" />
          </linearGradient>
        </defs>
        {/* left wing pair */}
        <g className="bfly-wing bfly-wing--l">
          <path d="M40 31 C21 11 5 18 9 34 C11 43 30 41 40 41 Z" fill="url(#bflyWing)" stroke="#43371f" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M40 43 C23 47 13 57 22 63 C29 67 39 52 40 48 Z" fill="url(#bflyWing)" stroke="#43371f" strokeWidth="1.4" strokeLinejoin="round" />
          <circle cx="18" cy="29" r="2.6" fill="#dbe6ff" opacity="0.85" />
          <circle cx="24" cy="56" r="1.8" fill="#dbe6ff" opacity="0.7" />
        </g>
        {/* right wing pair */}
        <g className="bfly-wing bfly-wing--r">
          <path d="M40 31 C59 11 75 18 71 34 C69 43 50 41 40 41 Z" fill="url(#bflyWing)" stroke="#43371f" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M40 43 C57 47 67 57 58 63 C51 67 41 52 40 48 Z" fill="url(#bflyWing)" stroke="#43371f" strokeWidth="1.4" strokeLinejoin="round" />
          <circle cx="62" cy="29" r="2.6" fill="#dbe6ff" opacity="0.85" />
          <circle cx="56" cy="56" r="1.8" fill="#dbe6ff" opacity="0.7" />
        </g>
        {/* body + antennae */}
        <path d="M38.5 27 Q34 22 33 17" stroke="#23252f" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        <path d="M41.5 27 Q46 22 47 17" stroke="#23252f" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        <circle cx="32.6" cy="16.4" r="1.4" fill="#23252f" />
        <circle cx="47.4" cy="16.4" r="1.4" fill="#23252f" />
        <ellipse cx="40" cy="41" rx="2.4" ry="14" fill="#23252f" />
      </svg>
    </div>
  )
}

// Scoped keyframes for the butterfly's flap + wander, reduced-motion aware.
function FunMotionStyles() {
  return (
    <style>{`
      .bfly { animation: bflyPath 22s ease-in-out infinite; }
      .bfly-body { transform-origin: center; animation: bflyBob 2.6s ease-in-out infinite; }
      .bfly-wing { transform-box: fill-box; }
      .bfly-wing--l { transform-origin: right center; animation: bflyFlapL 0.42s ease-in-out infinite; }
      .bfly-wing--r { transform-origin: left center; animation: bflyFlapR 0.42s ease-in-out infinite; }
      @keyframes bflyFlapL { 0%,100% { transform: scaleX(1); } 50% { transform: scaleX(0.28); } }
      @keyframes bflyFlapR { 0%,100% { transform: scaleX(1); } 50% { transform: scaleX(0.28); } }
      @keyframes bflyBob { 0%,100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }
      @keyframes bflyPath {
        0%   { transform: translate(0, 0) rotate(-6deg); }
        20%  { transform: translate(16vw, -46px) rotate(6deg); }
        45%  { transform: translate(38vw, 26px) rotate(-4deg); }
        62%  { transform: translate(52vw, -18px) rotate(8deg); }
        80%  { transform: translate(30vw, 58px) rotate(-6deg); }
        100% { transform: translate(0, 0) rotate(-6deg); }
      }

      /* Marquee-style edge-to-edge animation for the fun-stuff cards on large screens */
      .fun-cards-wrap { width: 100vw; max-width: 100vw; margin: 0 auto; overflow: hidden; box-sizing: border-box; }
      .fun-cards-track { display: flex; align-items: center; gap: clamp(1rem, 2.5vw, 2.5rem); white-space: nowrap; flex-wrap: nowrap; will-change: transform; }
      .fun-cards-track:hover { animation-play-state: paused; }
      .fun-cards-track > * { flex: 0 0 auto; }

      /* With duplicated content we animate by half the track width to loop seamlessly */
      @keyframes fun-scroll {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-50%); }
      }

      /* Apply animation only on large screens (match Tailwind lg breakpoint: 1024px) */
      @media (min-width: 1024px) {
        .fun-cards-track { animation: fun-scroll 28s linear infinite; }
      }

      /* Respect reduced-motion preference */
      @media (prefers-reduced-motion: reduce) {
        .bfly, .bfly-body, .bfly-wing--l, .bfly-wing--r { animation: none !important; }
        .fun-cards-track { animation: none !important; overflow-x: auto; -webkit-overflow-scrolling: touch; }
      }
    `}</style>
  )
}
