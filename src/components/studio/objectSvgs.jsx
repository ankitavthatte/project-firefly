/* Hand-drawn SVG illustrations for every object in the studio.
   Pure visuals — interaction lives in StudioScene. `active` = hovered/focused. */

export function LaptopSvg({ active, seen = false, booting = false }) {
  if (booting) {
    return (
      <svg viewBox="0 0 220 150" className="w-full" aria-hidden="true">
        <ellipse cx="110" cy="140" rx="95" ry="9" fill="rgba(53,50,45,0.14)" />
        <rect x="35" y="10" width="150" height="100" rx="10" fill="#3b3833" />
        <rect x="42" y="17" width="136" height="86" rx="6" fill="#1f1d1a" />
        <text x="110" y="66" textAnchor="middle" fontSize="26" fill="#0a66c2">✦</text>
        <path d="M22 112h176l10 18a5 5 0 0 1-5 7H17a5 5 0 0 1-5-7z" fill="#524e47" />
        <rect x="88" y="116" width="44" height="6" rx="3" fill="#6a655c" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 220 150" className="w-full" aria-hidden="true">
      <ellipse cx="110" cy="140" rx="95" ry="9" fill="rgba(53,50,45,0.14)" />
      {/* screen */}
      <rect x="35" y="10" width="150" height="100" rx="10" fill="#3b3833" />
      <rect x="42" y="17" width="136" height="86" rx="6" fill={active ? '#ffffff' : '#f3ecdd'} />
      {active && <rect x="42" y="17" width="136" height="86" rx="6" fill="url(#lapGlow)" />}
      {/* after you've visited, the case study window stays open on screen */}
      {seen && (
        <g>
          <rect x="66" y="30" width="108" height="64" rx="5" fill="#ffffff" stroke="#d8cfbd" />
          <rect x="66" y="30" width="108" height="12" rx="5" fill="#8298b8" />
          <circle cx="73" cy="36" r="2" fill="#f4f2ee" />
          <circle cx="80" cy="36" r="2" fill="#f4f2ee" />
          <rect x="73" y="49" width="52" height="5" rx="2.5" fill="#56718f" />
          <rect x="73" y="59" width="90" height="3.5" rx="1.75" fill="#c9c2b4" />
          <rect x="73" y="66" width="80" height="3.5" rx="1.75" fill="#c9c2b4" />
          <rect x="73" y="76" width="34" height="10" rx="5" fill="#0a66c2" />
        </g>
      )}
      <defs>
        <radialGradient id="lapGlow" cx="0.5" cy="0.4" r="0.8">
          <stop offset="0%" stopColor="#ead9b5" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ead9b5" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* tiny desktop UI on screen */}
      <rect x="50" y="25" width="26" height="7" rx="2" fill="#0a66c2" />
      <rect x="50" y="38" width="54" height="4" rx="2" fill="#c9c2b4" />
      <rect x="50" y="46" width="42" height="4" rx="2" fill="#c9c2b4" />
      {/* folder icons */}
      <g>
        <rect x="118" y="34" width="18" height="13" rx="2.5" fill="#8298b8" />
        <rect x="118" y="31" width="9" height="5" rx="2" fill="#8298b8" />
        <rect x="144" y="34" width="18" height="13" rx="2.5" fill="#c8973f" />
        <rect x="144" y="31" width="9" height="5" rx="2" fill="#c8973f" />
        <rect x="118" y="56" width="18" height="13" rx="2.5" fill="#89a99b" />
        <rect x="118" y="53" width="9" height="5" rx="2" fill="#89a99b" />
        <rect x="144" y="56" width="18" height="13" rx="2.5" fill="#93b6d6" />
        <rect x="144" y="53" width="9" height="5" rx="2" fill="#93b6d6" />
      </g>
      <rect x="50" y="60" width="56" height="34" rx="4" fill="#eee5d2" />
      <rect x="55" y="66" width="30" height="4" rx="2" fill="#0a66c2" />
      <rect x="55" y="74" width="44" height="3" rx="1.5" fill="#c9c2b4" />
      <rect x="55" y="80" width="38" height="3" rx="1.5" fill="#c9c2b4" />
      {/* base */}
      <path d="M22 112h176l10 18a5 5 0 0 1-5 7H17a5 5 0 0 1-5-7z" fill="#524e47" />
      <rect x="88" y="116" width="44" height="6" rx="3" fill="#6a655c" />
      {/* sticker on lid edge */}
      <circle cx="196" cy="118" r="0" fill="none" />
    </svg>
  )
}

export function NotebookSvg({ active, seen = false }) {
  return (
    <svg viewBox="0 0 150 110" className="w-full" aria-hidden="true">
      <ellipse cx="75" cy="100" rx="62" ry="7" fill="rgba(53,50,45,0.13)" />
      <rect x="14" y="18" width="122" height="78" rx="8" fill="#004182" />
      <rect x="14" y="18" width="122" height="78" rx="8" fill="url(#nbShade)" />
      <defs>
        <linearGradient id="nbShade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0a66c2" />
          <stop offset="100%" stopColor="#004182" />
        </linearGradient>
      </defs>
      {/* spiral binding */}
      {[...Array(7)].map((_, i) => (
        <circle key={i} cx={26} cy={28 + i * 10} r="3" fill="none" stroke="#f4f2ee" strokeWidth="2" />
      ))}
      {/* elastic band */}
      <rect x="112" y="18" width="6" height="78" fill="#c8973f" />
      {/* label */}
      <rect x="44" y="42" width="52" height="26" rx="4" fill="#f4f2ee" />
      <text x="70" y="59" textAnchor="middle" fontFamily="Caveat, cursive" fontSize="15" fontWeight="700" fill="#2b2a27">
        process
      </text>
      {/* lifting page corner — stays dog-eared once you've read it */}
      <path
        d={active || seen ? 'M136 96 L112 96 Q126 84 136 74 Z' : 'M136 96 L124 96 Q131 90 136 85 Z'}
        fill="#ffffff"
        stroke="#e0d7c5"
        strokeWidth="1"
        style={{ transition: 'all 0.35s ease' }}
      />
      {/* a bookmark sticky pokes out after your visit */}
      {seen && <rect x="58" y="10" width="16" height="12" rx="2" fill="#89a99b" transform="rotate(-6 66 16)" />}
      {/* pencil resting on top */}
      <g transform="rotate(-18 40 20)">
        <rect x="30" y="6" width="52" height="6" rx="3" fill="#c8973f" />
        <path d="M82 6l9 3-9 3z" fill="#d9a066" />
        <path d="M89.5 8.4l2.4 0.8-2.4 0.8z" fill="#2b2a27" />
      </g>
    </svg>
  )
}

export function MugSvg({ active, seen = false }) {
  return (
    <svg viewBox="0 0 90 100" className="w-full overflow-visible" aria-hidden="true">
      <ellipse cx="42" cy="93" rx="30" ry="5" fill="rgba(53,50,45,0.13)" />
      {/* the coffee ring left behind after your chat */}
      {seen && <ellipse cx="76" cy="92" rx="13" ry="4" fill="none" stroke="#8f6335" strokeWidth="2" opacity="0.35" />}
      {/* steam — visible when active (and gently otherwise via css class applied outside) */}
      <g opacity={active ? 1 : 0}>
        <path className="steam" d="M32 38q-4-8 0-14" stroke="#b9b3a6" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path className="steam" style={{ animationDelay: '0.8s' }} d="M44 36q4-9 0-16" stroke="#b9b3a6" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path className="steam" style={{ animationDelay: '1.6s' }} d="M55 39q-3-7 0-13" stroke="#b9b3a6" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      {/* body */}
      <path d="M16 44h52v30a14 14 0 0 1-14 14H30a14 14 0 0 1-14-14z" fill="#56718f" />
      <path d="M16 44h52v8H16z" fill="#566a88" />
      <ellipse cx="42" cy="44" rx="26" ry="6" fill="#465974" />
      <ellipse cx="42" cy="44" rx="21" ry="4.4" fill="#5b3f2e" />
      {/* handle */}
      <path d="M68 50c10 0 14 6 12 13-2 8-9 11-15 10" fill="none" stroke="#56718f" strokeWidth="7" strokeLinecap="round" />
      {/* heart */}
      <path d="M36 62c0-3 2.5-5 5-5s5 2 5 5c0 4-5 7-5 7s-5-3-5-7z" transform="translate(1 2)" fill="#f4f2ee" />
    </svg>
  )
}

export function TrophyShelfSvg({ active, seen = false }) {
  return (
    <svg viewBox="0 0 220 110" className="w-full" aria-hidden="true">
      {/* a lasting gleam once you've admired them */}
      {seen && (
        <g fill="#ffffff" opacity="0.9">
          <path d="M84 24l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z" />
          <path d="M196 44l1.2 3.2 3.2 1.2-3.2 1.2-1.2 3.2-1.2-3.2-3.2-1.2 3.2-1.2z" />
        </g>
      )}
      {/* shelf plank */}
      <rect x="4" y="88" width="212" height="10" rx="4" fill="#b57e45" />
      <rect x="4" y="96" width="212" height="4" rx="2" fill="rgba(53,50,45,0.18)" />
      {/* gold cup */}
      <g className={active ? 'drop-shadow-[0_0_8px_rgba(255,201,77,0.9)]' : ''}>
        <path d="M42 34h32v14a16 16 0 0 1-32 0z" fill="#c8973f" />
        <path d="M42 38c-8 0-12 4-11 9 1 6 6 8 12 8M74 38c8 0 12 4 11 9-1 6-6 8-12 8" stroke="#915907" strokeWidth="4" fill="none" />
        <rect x="53" y="62" width="10" height="10" fill="#915907" />
        <rect x="45" y="72" width="26" height="8" rx="2" fill="#b57e45" />
        <rect x="45" y="80" width="26" height="8" rx="2" fill="#8a5f31" />
        {active && <circle cx="50" cy="40" r="2.5" fill="#ffffff" opacity="0.9" />}
      </g>
      {/* medal */}
      <g>
        <path d="M110 30l8 20h-16z" fill="#0a66c2" />
        <circle cx="110" cy="60" r="14" fill="#c8973f" stroke="#915907" strokeWidth="3" />
        <text x="110" y="65" textAnchor="middle" fontSize="13" fontWeight="800" fill="#8a5f31">3</text>
        <rect x="98" y="76" width="24" height="12" rx="2" fill="#8a5f31" />
      </g>
      {/* star award */}
      <g className={active ? 'drop-shadow-[0_0_8px_rgba(185,167,242,0.9)]' : ''}>
        <path
          d="M175 28l6.5 13 14.5 2-10.5 10 2.5 14.5L175 61l-13 6.5L164.5 53 154 43l14.5-2z"
          fill="#8298b8"
          stroke="#56718f"
          strokeWidth="2.5"
        />
        <rect x="163" y="72" width="24" height="16" rx="2" fill="#8a5f31" />
      </g>
    </svg>
  )
}

export function BookshelfSvg() {
  const books = [
    { x: 10, h: 52, c: '#0a66c2' },
    { x: 26, h: 60, c: '#93b6d6' },
    { x: 42, h: 48, c: '#c8973f' },
    { x: 58, h: 58, c: '#89a99b' },
    { x: 74, h: 50, c: '#8298b8' },
  ]
  return (
    <svg viewBox="0 0 130 90" className="w-full" aria-hidden="true">
      <rect x="0" y="76" width="130" height="9" rx="4" fill="#b57e45" />
      {books.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={76 - b.h} width="13" height={b.h} rx="2.5" fill={b.c} transform={i === 4 ? `rotate(9 ${b.x + 6} 76)` : undefined} />
          <rect x={b.x + 3} y={76 - b.h + 8} width="7" height="3" rx="1.5" fill="rgba(255,246,234,0.85)" transform={i === 4 ? `rotate(9 ${b.x + 6} 76)` : undefined} />
        </g>
      ))}
      {/* tiny plant on the shelf end */}
      <g className="sway">
        <path d="M108 62q-3-12 4-18M112 64q1-10 9-13" stroke="#567f6c" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      <path d="M104 64h16l-2 12h-12z" fill="#004182" />
    </svg>
  )
}

export function CatSvg({ eyeOpen, stretching, night = false }) {
  return (
    <svg viewBox="0 0 150 90" className="w-full overflow-visible" aria-hidden="true">
      <ellipse cx="75" cy="84" rx="55" ry="6" fill="rgba(53,50,45,0.13)" />
      <g style={{ transition: 'transform 0.6s ease', transform: stretching ? 'scaleX(1.14) translateX(-6px)' : 'none', transformOrigin: '75px 80px' }}>
        {/* tail */}
        <path className="tailflick" d="M118 70q22-4 20-22" stroke="#524e47" strokeWidth="10" fill="none" strokeLinecap="round" />
        {/* body loaf */}
        <path d="M32 80q-6-28 20-34 16-4 40-2 26 2 28 20 2 16-10 16z" fill="#524e47" />
        {/* head */}
        <circle cx="42" cy="46" r="22" fill="#524e47" />
        {night ? (
          /* nightcap — the lamp is off, Miso is committed */
          <g>
            <path d="M25 29 C30 11, 50 3, 67 9 L59 30 C48 21, 36 23, 25 29 Z" fill="#56718f" />
            <path d="M52 12 C58 6, 66 6, 69 11" stroke="#56718f" strokeWidth="8" fill="none" strokeLinecap="round" />
            {/* trim band */}
            <path d="M24 30 Q43 19 62 29" stroke="#f4f2ee" strokeWidth="6" fill="none" strokeLinecap="round" />
            {/* pompom drooping off the tip */}
            <circle cx="71" cy="13" r="5" fill="#f4f2ee" />
            {/* a drowsy z drifting up */}
            <text x="80" y="26" fontFamily="Caveat, cursive" fontSize="13" fontWeight="700" fill="#8298b8">z</text>
            <text x="88" y="16" fontFamily="Caveat, cursive" fontSize="10" fontWeight="700" fill="#8298b8" opacity="0.7">z</text>
          </g>
        ) : (
          /* ears */
          <g>
            <path className="eartwitch" d="M26 32l-4-14 14 6z" fill="#524e47" />
            <path d="M56 30l6-13-15 4z" fill="#524e47" />
            <path d="M28 30l-2-7 7 3z" fill="#c19d97" />
          </g>
        )}
        {/* face */}
        <g>
          {/* eyes: closed arcs, one opens */}
          {eyeOpen ? (
            <>
              <circle cx="34" cy="46" r="3.4" fill="#c8973f" />
              <circle cx="34" cy="46" r="1.5" fill="#2b2a27" />
              <path d="M46 46q4 3 8 0" stroke="#2b2a27" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            </>
          ) : (
            <>
              <path d="M30 46q4 3 8 0" stroke="#2b2a27" strokeWidth="2.4" fill="none" strokeLinecap="round" />
              <path d="M46 46q4 3 8 0" stroke="#2b2a27" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            </>
          )}
          {/* nose + whiskers */}
          <path d="M40 54l3 3 3-3z" fill="#c19d97" />
          <path d="M28 55h-9M28 59l-8 2M56 55h9M56 59l8 2" stroke="#8c877d" strokeWidth="1.6" strokeLinecap="round" />
        </g>
        {/* chest patch */}
        <path d="M56 76q0-10 10-10t10 10z" fill="#6a655c" />
      </g>
    </svg>
  )
}

export function ControllerSvg({ active }) {
  return (
    <svg viewBox="0 0 130 85" className="w-full" aria-hidden="true">
      <ellipse cx="65" cy="78" rx="50" ry="5" fill="rgba(53,50,45,0.13)" />
      <path
        d="M30 22h70q16 0 20 18 4 20-4 28-8 8-18-2l-8-8H40l-8 8q-10 10-18 2-8-8-4-28 4-18 20-18z"
        fill="#4a78a8"
      />
      <path d="M30 22h70q16 0 20 18l1 6H10l0-6q4-18 20-18z" fill="#93b6d6" opacity="0.45" />
      {/* d-pad */}
      <rect x="32" y="36" width="8" height="22" rx="2.5" fill="#f4f2ee" />
      <rect x="25" y="43" width="22" height="8" rx="2.5" fill="#f4f2ee" />
      {/* buttons — pulse when active */}
      <g>
        <circle cx="88" cy="38" r={active ? 5.6 : 4.6} fill="#c8973f" style={{ transition: 'all 0.25s' }} />
        <circle cx="99" cy="47" r={active ? 5.6 : 4.6} fill="#0a66c2" style={{ transition: 'all 0.25s 0.08s' }} />
        <circle cx="77" cy="47" r={active ? 5.6 : 4.6} fill="#89a99b" style={{ transition: 'all 0.25s 0.16s' }} />
        <circle cx="88" cy="56" r={active ? 5.6 : 4.6} fill="#8298b8" style={{ transition: 'all 0.25s 0.24s' }} />
      </g>
      <circle cx="58" cy="52" r="5" fill="#2b2a27" opacity="0.5" />
      <circle cx="70" cy="34" r="3" fill="#2b2a27" opacity="0.35" />
    </svg>
  )
}

export function PaletteSvg({ active }) {
  const drops = [
    { cx: 38, cy: 32, c: '#0a66c2' },
    { cx: 58, cy: 24, c: '#c8973f' },
    { cx: 78, cy: 28, c: '#89a99b' },
    { cx: 92, cy: 42, c: '#93b6d6' },
    { cx: 88, cy: 60, c: '#8298b8' },
  ]
  return (
    <svg viewBox="0 0 130 95" className="w-full overflow-visible" aria-hidden="true">
      <ellipse cx="62" cy="88" rx="50" ry="5" fill="rgba(53,50,45,0.13)" />
      <path
        d="M62 12C30 12 8 30 10 54c2 22 24 30 44 28 10-1 8-8 6-13-3-8 2-14 10-13 12 2 34 2 40-14C116 24 90 12 62 12z"
        fill="#d9a066"
      />
      <path d="M62 12C30 12 8 30 10 54l4 1C14 34 34 18 62 17z" fill="#e5b57e" />
      <ellipse cx="46" cy="56" rx="8" ry="6.5" fill="#b57e45" />
      {drops.map((d, i) => (
        <circle
          key={i}
          cx={d.cx}
          cy={d.cy}
          r={active ? 7 : 5.6}
          fill={d.c}
          style={{ transition: `all 0.3s ${i * 0.06}s cubic-bezier(.34,1.56,.64,1)` }}
        />
      ))}
      {/* brush */}
      <g transform="rotate(24 100 70)">
        <rect x="92" y="62" width="42" height="5.5" rx="2.75" fill="#8a5f31" />
        <rect x="86" y="61" width="10" height="7.5" rx="2" fill="#c9c2b4" />
        <path d="M86 62q-9 1-12 3 3 2.5 12 3.5z" fill="#0a66c2" />
      </g>
    </svg>
  )
}

export function PassportSvg({ active }) {
  return (
    <svg viewBox="0 0 120 90" className="w-full" aria-hidden="true">
      <ellipse cx="60" cy="84" rx="48" ry="5" fill="rgba(53,50,45,0.13)" />
      {/* postcard peeking behind */}
      <g style={{ transition: 'transform 0.35s ease', transform: active ? 'translate(8px,-8px) rotate(6deg)' : 'rotate(3deg)', transformOrigin: '80px 40px' }}>
        <rect x="42" y="14" width="66" height="44" rx="4" fill="#ffffff" stroke="#e0d7c5" />
        <path d="M46 44l14-14 10 8 12-12 18 18v10H46z" fill="#89a99b" opacity="0.7" />
        <circle cx="94" cy="24" r="5" fill="#c8973f" />
        <rect x="94" y="18" width="10" height="12" rx="1" fill="#0a66c2" opacity="0.85" />
      </g>
      {/* passport */}
      <rect x="14" y="30" width="58" height="50" rx="6" fill="#567f6c" />
      <rect x="14" y="30" width="58" height="50" rx="6" fill="url(#ppShade)" />
      <defs>
        <linearGradient id="ppShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#89a99b" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#567f6c" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx="43" cy="49" r="9" fill="none" stroke="#f4f2ee" strokeWidth="2" />
      <path d="M34 49h18M43 40c4 5 4 13 0 18M43 40c-4 5-4 13 0 18" stroke="#f4f2ee" strokeWidth="1.6" fill="none" />
      <text x="43" y="72" textAnchor="middle" fontSize="8" fontWeight="700" fill="#f4f2ee" letterSpacing="1.5">
        PASSPORT
      </text>
    </svg>
  )
}

export function StickyNotesSvg({ active, seen = false }) {
  return (
    <svg viewBox="0 0 110 100" className="w-full" aria-hidden="true">
      {seen ? (
        /* one note peeled away — only tape marks remain */
        <g transform="rotate(-5 30 30)" opacity="0.5">
          <rect x="8" y="10" width="12" height="6" rx="1" fill="#d8cfbd" />
          <rect x="38" y="10" width="12" height="6" rx="1" fill="#d8cfbd" />
        </g>
      ) : (
        <g transform="rotate(-5 30 30)">
          <rect x="8" y="10" width="42" height="42" rx="2" fill="#c8973f" />
          <path d="M8 44l42 8v-8z" fill="rgba(53,50,45,0.08)" />
          <text x="29" y="34" textAnchor="middle" fontFamily="Caveat, cursive" fontSize="15" fontWeight="700" fill="#2b2a27">
            why?
          </text>
        </g>
      )}
      <g transform={active ? 'rotate(7 78 34) translate(0 -3)' : 'rotate(4 78 34)'} style={{ transition: 'all 0.3s' }}>
        <rect x="56" y="14" width="42" height="42" rx="2" fill="#89a99b" />
        <text x="77" y="38" textAnchor="middle" fontFamily="Caveat, cursive" fontSize="13" fontWeight="700" fill="#2b2a27">
          simple!
        </text>
      </g>
      <g transform={active ? 'rotate(-9 52 74) translate(0 -4)' : 'rotate(-3 52 74)'} style={{ transition: 'all 0.3s 0.06s' }}>
        <rect x="32" y="52" width="42" height="42" rx="2" fill="#c9a2ad" />
        <text x="53" y="77" textAnchor="middle" fontFamily="Caveat, cursive" fontSize="13" fontWeight="700" fill="#2b2a27">
          feeling
        </text>
      </g>
    </svg>
  )
}

export function PlantSvg() {
  return (
    <svg viewBox="0 0 110 160" className="w-full" aria-hidden="true">
      <ellipse cx="55" cy="152" rx="40" ry="6" fill="rgba(53,50,45,0.13)" />
      <g className="sway">
        <path d="M55 105Q30 80 34 44" stroke="#567f6c" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M55 105Q78 76 74 40" stroke="#567f6c" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M55 105Q55 70 55 34" stroke="#567f6c" strokeWidth="5" fill="none" strokeLinecap="round" />
        <ellipse cx="34" cy="40" rx="12" ry="20" fill="#89a99b" transform="rotate(-18 34 40)" />
        <ellipse cx="55" cy="28" rx="12" ry="22" fill="#6f9a85" />
        <ellipse cx="75" cy="36" rx="12" ry="20" fill="#89a99b" transform="rotate(16 75 36)" />
        <ellipse cx="43" cy="70" rx="10" ry="16" fill="#6f9a85" transform="rotate(-30 43 70)" />
        <ellipse cx="68" cy="68" rx="10" ry="16" fill="#89a99b" transform="rotate(28 68 68)" />
      </g>
      <path d="M30 104h50l-6 48H36z" fill="#004182" />
      <path d="M30 104h50l-1.5 12h-47z" fill="#0a66c2" />
    </svg>
  )
}

export function LampSvg({ night = false }) {
  return (
    <svg viewBox="0 0 130 150" className="w-full overflow-visible" aria-hidden="true">
      <ellipse cx="55" cy="144" rx="38" ry="5" fill="rgba(53,50,45,0.13)" />
      {/* light pool — the lamp works hardest after dark */}
      <path className="glowpulse" d="M84 52 L128 128 L30 128 Z" fill="url(#lampGlow)" style={{ opacity: night ? 1 : undefined }} />
      {night && <ellipse cx="80" cy="55" rx="26" ry="14" fill="#ead9b5" opacity="0.55" style={{ filter: 'blur(6px)' }} />}
      <defs>
        <linearGradient id="lampGlow" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#ead9b5" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ead9b5" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* arm */}
      <path d="M40 138 L52 84 L76 52" stroke="#524e47" strokeWidth="7" fill="none" strokeLinecap="round" />
      <circle cx="52" cy="84" r="5" fill="#2b2a27" />
      {/* head */}
      <g transform="rotate(38 80 48)">
        <path d="M62 38h38a4 4 0 0 1 4 4l-6 14H64l-6-14a4 4 0 0 1 4-4z" fill="#0a66c2" />
        <ellipse cx="81" cy="56" rx="18" ry="5" fill="#ead9b5" />
      </g>
      {/* base */}
      <rect x="22" y="134" width="38" height="10" rx="5" fill="#2b2a27" />
    </svg>
  )
}

export function DrawerSvg({ active, seen = false }) {
  return (
    <svg viewBox="0 0 150 70" className="w-full overflow-visible" aria-hidden="true">
      {/* drawer front, set into the desk edge */}
      <g style={{ transition: 'transform 0.35s cubic-bezier(.34,1.56,.64,1)', transform: active ? 'translateY(-7px)' : 'none' }}>
        <rect x="8" y="10" width="134" height="52" rx="7" fill="#a8763f" />
        <rect x="8" y="10" width="134" height="52" rx="7" fill="url(#drawerShade)" />
        <defs>
          <linearGradient id="drawerShade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c08a4e" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#7c5427" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <rect x="55" y="30" width="40" height="8" rx="4" fill="#5b3f1e" />
        {/* something peeks out once opened */}
        {(active || seen) && <rect x="20" y="2" width="34" height="12" rx="2" fill="#ffffff" stroke="#d8cfbd" transform="rotate(-4 37 8)" />}
        {seen && <rect x="104" y="4" width="22" height="10" rx="2" fill="#c8973f" transform="rotate(5 115 9)" />}
      </g>
    </svg>
  )
}

export function PaperPlaneSvg({ active }) {
  return (
    <svg viewBox="0 0 120 80" className="w-full overflow-visible" aria-hidden="true">
      <ellipse cx="60" cy="72" rx="42" ry="5" fill="rgba(53,50,45,0.12)" />
      <g style={{ transition: 'transform 0.35s cubic-bezier(.34,1.56,.64,1)', transform: active ? 'translateY(-10px) rotate(-8deg)' : 'none', transformOrigin: '60px 45px' }}>
        <path d="M12 48 L106 16 L66 62 Z" fill="#ffffff" stroke="#d8cfbd" strokeWidth="1.5" />
        <path d="M12 48 L106 16 L52 46 Z" fill="#f3ecdd" stroke="#d8cfbd" strokeWidth="1.5" />
        <path d="M52 46 L66 62 L60 47.5 Z" fill="#e6dcc7" />
        {/* heart stamp on the wing */}
        <path d="M78 32c0-2.4 2-4 4-4s4 1.6 4 4c0 3.2-4 5.6-4 5.6s-4-2.4-4-5.6z" fill="#0a66c2" opacity="0.9" />
      </g>
      {active && (
        <path d="M14 62q10-4 20-1" stroke="#93b6d6" strokeWidth="2" strokeDasharray="4 4" fill="none" strokeLinecap="round" />
      )}
    </svg>
  )
}

export function CalendarSvg({ active = false }) {
  const now = new Date()
  const month = now.toLocaleString('en-US', { month: 'short' }).toUpperCase()
  const day = now.getDate()
  return (
    <svg viewBox="0 0 90 100" className="w-full" aria-hidden="true">
      <ellipse cx="45" cy="93" rx="34" ry="5" fill="rgba(53,50,45,0.13)" />
      {/* easel-style stand */}
      <path d="M14 90 L24 26 h42 L76 90 Z" fill="#c08a4e" />
      {/* page */}
      <rect x="16" y="18" width="58" height="70" rx="7" fill="#ffffff" stroke="#e0d7c5" strokeWidth="1.5" />
      {/* spiral rings */}
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={26 + i * 9.5} cy="18" r="2.6" fill="none" stroke="#666666" strokeWidth="1.8" />
      ))}
      {/* month band */}
      <rect x="16" y="22" width="58" height="16" rx="5" fill="#0a66c2" />
      <text x="45" y="34" textAnchor="middle" fontSize="11" fontWeight="800" fill="#f4f2ee" fontFamily="inherit" letterSpacing="2">
        {month}
      </text>
      {/* today's date */}
      <text x="45" y="70" textAnchor="middle" fontSize="28" fontWeight="800" fill="#2b2a27" fontFamily="inherit">
        {day}
      </text>
      {/* scribbled note */}
      <path d="M28 78 q8 3 16 0 q8 -3 18 1" stroke={active ? '#004182' : '#c9c2b4'} strokeWidth="2" fill="none" strokeLinecap="round" style={{ transition: 'stroke 0.3s' }} />
      {/* page curl */}
      <path d="M74 88 L64 88 Q70 83 74 78 Z" fill="#f3ecdd" stroke="#e0d7c5" strokeWidth="1" />
    </svg>
  )
}
