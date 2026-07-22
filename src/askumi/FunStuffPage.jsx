import { funStuff } from '../data/content.js'
import Masthead from './Masthead.jsx'

const asset = (p) => `${import.meta.env.BASE_URL}${p}`

// "Fun Stuff" as its own page: a header and a grid of creative side-quests,
// each a title + blurb + visual, in the reference's card-grid layout.
export default function FunStuffPage() {
  return (
    <div className="grain relative z-10 min-h-full">
      <Masthead active="fun" />

      {/* header */}
      <div className="wrap pt-6">
        <div className="text-center">
          <h1 className="mono text-2xl font-bold tracking-[0.15em] sm:text-3xl">COLLECTION OF FUN STUFF</h1>
          <p className="mono mt-2 text-[0.9rem] text-[color:var(--color-orange)]">The “Why not?” archive</p>
        </div>
      </div>

      <hr className="mt-6 border-[color:var(--color-ink)]" />

      {/* grid — centered, adapts to the number of cards */}
      <div className="wrap">
        <div className="mx-auto grid max-w-3xl gap-x-8 gap-y-12 pb-24 pt-12 sm:grid-cols-2">
          {funStuff.map((item) => (
            <FunCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

function FunCard({ item }) {
  const media = (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-card-hi)]">
      {item.img ? (
        <img
          src={asset(item.img)}
          alt={item.title}
          loading="lazy"
          className="h-64 w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      ) : (
        <div className="grid h-64 w-full place-items-center bg-gradient-to-br from-[color:var(--color-pop)]/25 to-[color:var(--color-orange)]/25 text-6xl">
          <span aria-hidden>{item.emoji}</span>
        </div>
      )}
    </div>
  )

  const external = item.href?.startsWith('http')

  return (
    <article className="flex flex-col">
      <h3 className="mono text-[1.05rem] font-bold text-[color:var(--color-ink)]">
        {item.title} <span aria-hidden>{item.emoji}</span>
      </h3>
      <p className="mono mt-3 text-[0.8rem] leading-relaxed text-[color:var(--color-ink-soft)] lg:min-h-[6rem]">
        {item.desc}
      </p>

      <div className="mt-5">
        {item.href ? (
          <a
            href={item.href}
            {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
            aria-label={`Open ${item.title}`}
            className="cursor-hand-lg block"
          >
            {media}
          </a>
        ) : (
          media
        )}
      </div>
    </article>
  )
}
