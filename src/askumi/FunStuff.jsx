import { identity, nowBoard } from '../data/content.js'
import { Sticker, TechLabel } from './bits.jsx'

const asset = (p) => `${import.meta.env.BASE_URL}${p}`

// Hand-drawn art that already lives in /public/art — real doodles make the
// best collage pieces.
const POLAROIDS = [
  { src: 'art/nook.jpg', cap: 'The Nook', rot: -5 },
  { src: 'art/adoption.jpg', cap: 'Adoption drive', rot: 4 },
  { src: 'art/setu.jpg', cap: 'Setu', rot: -3 },
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
    <section id="about" className="relative overflow-hidden py-14">
      <div className="wrap relative">
        {/* scattered stickers */}
        <Sticker rot={-18} className="left-2 top-4" size="2rem">
          🐝
        </Sticker>
        <Sticker rot={16} drift="b" className="right-4 top-10" size="2rem">
          🦋
        </Sticker>
        <Sticker rot={-10} className="left-10 bottom-10 hidden sm:block" size="1.8rem">
          🐈
        </Sticker>

        {/* heading */}
        <div className="text-center">
          <div className="mono text-2xl text-[color:var(--color-orange)]">\(^O^)/ Fun Stuff (ﾉ◕ヮ◕)ﾉ</div>
          <p className="mono mx-auto mt-3 max-w-xl text-[0.85rem] leading-relaxed text-[color:var(--color-ink-soft)]">
            The person behind the 300 screens. Curious by nature, allergic to
            confusing experiences, and cat mom to eleven very opinionated rescues.
          </p>
        </div>

        {/* about card */}
        <div className="mx-auto mt-8 max-w-3xl">
          <div className="card card-hi brackets relative rounded-[22px] p-6 sm:p-8">
            <TechLabel index="01">the short version</TechLabel>
            <p className="mt-3 text-[1.05rem] leading-relaxed">{identity.about}</p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-[color:var(--color-ink-soft)]">
              {identity.aboutExtra} {identity.craft}
            </p>

            {/* tag chips */}
            <div className="mt-5 flex flex-wrap gap-2">
              {identity.tags.map((t) => (
                <span
                  key={t}
                  className="mono inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-paper)] px-3 py-1.5 text-[0.72rem]"
                >
                  <span aria-hidden>{TAG_EMOJI[t] || '★'}</span>
                  {t}
                </span>
              ))}
            </div>

            {doodle && (
              <a
                href={doodle}
                target="_blank"
                rel="noreferrer"
                className="pill mt-5"
              >
                Daily doodles @punedoodlerr →
              </a>
            )}
          </div>
        </div>

        {/* polaroid row */}
        <div className="mt-10 flex flex-wrap items-start justify-center gap-6">
          {POLAROIDS.map((p) => (
            <figure
              key={p.src}
              className="float-a w-40 rounded-md bg-white p-2 pb-4 shadow-[0_10px_30px_rgba(0,0,0,0.12)] sm:w-48"
              style={{ '--r': `${p.rot}deg`, transform: `rotate(${p.rot}deg)` }}
            >
              <img
                src={asset(p.src)}
                alt={p.cap}
                loading="lazy"
                className="aspect-square w-full rounded-sm object-cover"
              />
              <figcaption className="mono mt-2 text-center text-[0.66rem] text-[color:var(--color-ink-soft)]">
                {p.cap}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
