import { useState } from 'react'
import { identity, nowBoard } from '../data/content.js'
import { Sticker } from './bits.jsx'

const asset = (p) => `${import.meta.env.BASE_URL}${p}`

const POLAROIDS = [
  { src: 'art/nook.jpg', cap: 'The Nook', rot: -6 },
]

const TAG_EMOJI = {
  Traveler: '✈️',
  Gamer: '🎮',
  Creator: '🎨',
  'Book Lover': '📚',
  Painter: '🖌️',
  Sketcher: '✏️',
  'Cat Mom': '🐈',
}

const doodle = nowBoard.items.find((i) => i.href)?.href

export default function FunStuff() {
  return (
    <section id="fun" className="relative overflow-hidden py-24">
      <div className="wrap relative">
        {/* floating critters */}
        <Sticker rot={-14} className="left-3 top-6" size="2rem">🐝</Sticker>
        <Sticker rot={12} drift="b" className="right-6 bottom-24 hidden sm:block" size="2.2rem">🐦</Sticker>
        <Sticker rot={-8} className="left-8 bottom-10 hidden sm:block" size="1.8rem">🦋</Sticker>

        {/* heading */}
        <div className="text-center">
          <div className="mono text-2xl text-[color:var(--color-orange)] sm:text-3xl">
            ٩(^ᴗ^)۶ Fun Stuff (ﾉ◕ヮ◕)ﾉ
          </div>
          <p className="mono mx-auto mt-4 max-w-xl text-[0.85rem] leading-relaxed text-[color:var(--color-ink-soft)]">
            What happens when I’m left alone with a sketchbook and a laptop — the
            traveling, gaming, painting and eleven-cat chaos that keeps the pixels
            honest.
          </p>
        </div>

        {/* collage */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          {/* lime portrait card */}
          <div className="float-a w-52 shrink-0 rounded-[20px] bg-[color:var(--color-lime)] p-3" style={{ '--r': '-3deg', transform: 'rotate(-3deg)' }}>
            <div className="flex h-56 items-end justify-center overflow-hidden">
              <LimePortrait />
            </div>
            <div className="mono px-1 pb-1 pt-2 text-[0.7rem] font-bold text-[color:var(--color-ink)]">
              off the clock ↗
            </div>
          </div>

          {POLAROIDS.map((p) => (
            <figure
              key={p.src}
              className="float-b w-44 rounded-md bg-white p-2 pb-4 shadow-[0_12px_34px_rgba(0,0,0,0.14)] sm:w-48"
              style={{ '--r': `${p.rot}deg`, transform: `rotate(${p.rot}deg)` }}
            >
              <img
                src={asset(p.src)}
                alt={p.cap}
                loading="lazy"
                className="aspect-square w-full rounded-sm object-cover"
              />
              <figcaption className="mono mt-2 text-center text-[0.66rem] text-[#5c554c]">
                {p.cap}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* tag stickers + doodle link */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {identity.tags.map((t, i) => (
            <span
              key={t}
              className="mono inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-card-hi)] px-3.5 py-2 text-[0.74rem]"
              style={{ transform: `rotate(${(i % 2 ? 1 : -1) * (2 + (i % 3))}deg)` }}
            >
              <span aria-hidden>{TAG_EMOJI[t] || '★'}</span>
              {t}
            </span>
          ))}
        </div>

        {doodle && (
          <div className="mt-8 text-center">
            <a href={doodle} target="_blank" rel="noreferrer" className="pill">
              Daily doodles @punedoodlerr →
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

function LimePortrait() {
  const [failed, setFailed] = useState(false)
  if (identity.photo && !failed) {
    return (
      <img
        src={asset(identity.photo)}
        alt={identity.name}
        onError={() => setFailed(true)}
        className="photo-bw h-56 w-full rounded-lg"
      />
    )
  }
  return (
    <svg viewBox="0 0 200 240" className="h-56 w-auto" aria-label="Ankita, off the clock" role="img" preserveAspectRatio="xMidYMax meet">
      <path d="M22 240c0-50 34-78 78-78s78 28 78 78z" fill="#0d0d0c" />
      <rect x="85" y="118" width="30" height="44" rx="13" fill="#0d0d0c" />
      <ellipse cx="100" cy="90" rx="40" ry="48" fill="#0d0d0c" />
      <path d="M58 94c-8-40 20-66 42-66s52 22 44 64c-4-22-20-34-42-34S62 72 58 94z" fill="#000" />
    </svg>
  )
}
