import { identity, atAGlance } from '../data/content.js'
import { TechLabel, Asterisk, Sticker } from './bits.jsx'

// Two-panel hero: an orange promo card carrying the pitch, and an ID-badge
// card that reads like a designer's studio access pass.
export default function Hero() {
  return (
    <section id="top" className="wrap relative pt-10 pb-6">
      <Sticker rot={-14} className="left-[-6px] top-2" size="1.6rem">
        ✦
      </Sticker>
      <Sticker rot={12} drift="b" className="right-2 top-6" size="1.5rem">
        👋
      </Sticker>

      <div className="grid gap-5 md:grid-cols-[1.35fr_1fr]">
        {/* Orange promo card */}
        <div className="brackets relative overflow-hidden rounded-[22px] bg-[color:var(--color-orange)] p-7 text-white sm:p-9">
          <div className="tech mb-6 flex items-center justify-between text-white/80">
            <span>[ HELLO · WELCOME IN ]</span>
            <span>PUNE 18°C ☁</span>
          </div>

          <h1 className="display text-[2.5rem] leading-[0.95] sm:text-[3.4rem]">
            {identity.heroLine}
          </h1>

          <p className="mono mt-5 max-w-xl text-[0.9rem] leading-relaxed text-white/90">
            {identity.heroSub}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href="#work" className="pill bg-[color:var(--color-ink)] border-[color:var(--color-ink)]">
              See the work →
            </a>
            <a href="#about" className="pill pill-ghost border-white text-white hover:bg-white hover:text-[color:var(--color-orange)]">
              Read about me
            </a>
          </div>

          <Asterisk
            size={130}
            className="pointer-events-none absolute -bottom-8 -right-6 text-white/15"
          />
        </div>

        {/* ID badge card */}
        <IdBadge />
      </div>

      {/* at-a-glance strip */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {atAGlance.map((item) => (
          <div key={item.label} className="card card-hi rounded-2xl p-3.5">
            <div className="tech text-[color:var(--color-orange)]">{item.label}</div>
            <div className="mt-1.5 text-[0.82rem] font-semibold leading-snug">{item.value}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function IdBadge() {
  return (
    <div className="card card-hi relative flex flex-col overflow-hidden rounded-[22px] p-5">
      <div className="tech flex items-center justify-between">
        <span>STUDIO ACCESS PASS</span>
        <span className="text-[color:var(--color-orange)]">● LIVE</span>
      </div>

      <div className="mt-4 flex items-center gap-4">
        {/* avatar block — stylised, no photo needed */}
        <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-[color:var(--color-orange)] text-white">
          <span className="display text-2xl">AT</span>
        </div>
        <div>
          <div className="display text-xl leading-tight">{identity.name}</div>
          <div className="mono mt-1 text-[0.78rem] text-[color:var(--color-ink-soft)]">
            {identity.role}
          </div>
          <div className="mono mt-0.5 text-[0.72rem] text-[color:var(--color-ink-soft)]">
            Architect → Product · {identity.location}
          </div>
        </div>
      </div>

      <dl className="mono mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[0.72rem]">
        <div className="flex justify-between border-b border-dashed border-[color:var(--color-line)] pb-1">
          <dt className="text-[color:var(--color-ink-soft)]">EXP</dt>
          <dd className="font-bold">10+ YRS</dd>
        </div>
        <div className="flex justify-between border-b border-dashed border-[color:var(--color-line)] pb-1">
          <dt className="text-[color:var(--color-ink-soft)]">ID</dt>
          <dd className="font-bold">AT-2016</dd>
        </div>
        <div className="flex justify-between border-b border-dashed border-[color:var(--color-line)] pb-1">
          <dt className="text-[color:var(--color-ink-soft)]">SCALE</dt>
          <dd className="font-bold">300+ SCREENS</dd>
        </div>
        <div className="flex justify-between border-b border-dashed border-[color:var(--color-line)] pb-1">
          <dt className="text-[color:var(--color-ink-soft)]">STATUS</dt>
          <dd className="font-bold text-[color:var(--color-green-deep)]">OPEN TO WORK</dd>
        </div>
      </dl>

      <div className="mt-auto pt-4">
        <div className="barcode" />
        <div className="mono mt-1 flex justify-between text-[0.6rem] text-[color:var(--color-ink-soft)]">
          <span>SENIOR PRODUCT DESIGNER</span>
          <span>PUNE · IN</span>
        </div>
      </div>
    </div>
  )
}
