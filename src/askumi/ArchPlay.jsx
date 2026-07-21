import { useEffect, useRef, useState } from 'react'

// A closing "architect" toy: an isometric block on a platform. Each tap
// rebuilds it into a different architectural form (cube, tower, ziggurat,
// slab, twins, L-plan) and shifts it to a new spot — a nod to a past life
// designing in mass, light and structure. Canvas 2D, DPR-aware, eased.

// Six states — each is exactly 4 boxes {x,y,z,w,d,h} on a 6×6 platform
// (padded with zero-size boxes so morphs interpolate cleanly).
const Z = { x: 3, y: 3, z: 0, w: 0, d: 0, h: 0 }
const STATES = [
  // 1 — a single cube, centre
  [{ x: 2, y: 2, z: 0, w: 2, d: 2, h: 2 }, Z, Z, Z],
  // 2 — a slender tower, back-left
  [
    { x: 1, y: 1, z: 0, w: 1, d: 1, h: 1 },
    { x: 1, y: 1, z: 1, w: 1, d: 1, h: 1 },
    { x: 1, y: 1, z: 2, w: 1, d: 1, h: 1 },
    { x: 1, y: 1, z: 3, w: 1, d: 1, h: 1 },
  ],
  // 3 — a stepped ziggurat, back-right
  [
    { x: 2.6, y: 2.6, z: 0, w: 3, d: 3, h: 0.7 },
    { x: 3.0, y: 3.0, z: 0.7, w: 2.2, d: 2.2, h: 0.7 },
    { x: 3.4, y: 3.4, z: 1.4, w: 1.4, d: 1.4, h: 0.7 },
    { x: 3.8, y: 3.8, z: 2.1, w: 0.6, d: 0.6, h: 0.7 },
  ],
  // 4 — a broad slab with a cube on top
  [
    { x: 0.6, y: 1.6, z: 0, w: 4.8, d: 2.8, h: 0.6 },
    { x: 2.4, y: 2.2, z: 0.6, w: 1.6, d: 1.6, h: 1.6 },
    Z,
    Z,
  ],
  // 5 — twin cubes
  [
    { x: 1, y: 2.4, z: 0, w: 1.6, d: 1.6, h: 1.6 },
    { x: 3.4, y: 2.4, z: 0, w: 1.6, d: 1.6, h: 1.6 },
    Z,
    Z,
  ],
  // 6 — an L-plan
  [
    { x: 1.4, y: 1, z: 0, w: 1.2, d: 3.4, h: 1.5 },
    { x: 2.6, y: 1, z: 0, w: 2.4, d: 1.2, h: 1.5 },
    Z,
    Z,
  ],
]

const PLATFORM = { x: 0, y: 0, z: -0.7, w: 6, d: 6, h: 0.7 }
const lerp = (a, b, t) => a + (b - a) * t

export default function ArchPlay() {
  const canvasRef = useRef(null)
  const nextRef = useRef(null)
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let W = 0, H = 0, dpr = 1, raf = 0
    let idx = 0
    let cur = STATES[0].map((b) => ({ ...b }))
    let target = STATES[0]
    let ox = 0, oy = 0, TW = 34, TH = 17, TZ = 34

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      W = rect.width
      H = rect.height
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const s = Math.min(1, W / 520)
      TW = 34 * s
      TH = 17 * s
      TZ = 34 * s
      ox = W / 2
      oy = H / 2 - 3 * TH + 0.8 * TZ
      draw()
    }

    const P = (x, y, z) => [ox + (x - y) * TW, oy + (x + y) * TH - z * TZ]

    function quad(pts, fill, stroke) {
      ctx.beginPath()
      ctx.moveTo(pts[0][0], pts[0][1])
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1])
      ctx.closePath()
      ctx.fillStyle = fill
      ctx.fill()
      ctx.strokeStyle = stroke
      ctx.lineWidth = 1.25
      ctx.lineJoin = 'round'
      ctx.stroke()
    }

    function drawBox(b, c) {
      if (b.w < 0.03 || b.d < 0.03 || b.h < 0.03) return
      const { x, y, z, w, d, h } = b
      // left face (y+d side)
      quad([P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x, y + d, z + h)], c.left, c.stroke)
      // right face (x+w side)
      quad([P(x + w, y, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x + w, y, z + h)], c.right, c.stroke)
      // top face
      quad([P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)], c.top, c.stroke)
    }

    const PLAT_C = { top: '#0f1d49', right: '#0b1636', left: '#091230', stroke: 'rgba(70,95,180,0.55)' }
    const BLD_C = { top: '#6d8ff0', right: '#4a6ede', left: '#3a55bd', stroke: 'rgba(165,190,255,0.6)' }

    function draw() {
      ctx.clearRect(0, 0, W, H)
      drawBox(PLATFORM, PLAT_C)
      const order = cur
        .map((b, i) => ({ b, k: b.x + b.y + b.z }))
        .sort((a, z) => a.k - z.k)
      order.forEach(({ b }) => drawBox(b, BLD_C))
    }

    function animate() {
      let moving = false
      for (let i = 0; i < cur.length; i++) {
        for (const k of ['x', 'y', 'z', 'w', 'd', 'h']) {
          cur[i][k] = lerp(cur[i][k], target[i][k], 0.16)
          if (Math.abs(cur[i][k] - target[i][k]) > 0.002) moving = true
        }
      }
      draw()
      if (moving) raf = requestAnimationFrame(animate)
      else raf = 0
    }

    function advance() {
      idx = (idx + 1) % STATES.length
      target = STATES[idx]
      setTouched(true)
      if (reduce) {
        cur = target.map((b) => ({ ...b }))
        draw()
      } else if (!raf) {
        raf = requestAnimationFrame(animate)
      }
    }
    nextRef.current = advance

    resize()
    window.addEventListener('resize', resize)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const onActivate = () => nextRef.current && nextRef.current()

  return (
    <section className="wrap py-16">
      <div className="mx-auto max-w-3xl text-center">
        <span className="tech text-[color:var(--color-orange)]">
          [ before pixels, there were buildings ]
        </span>
        <h2 className="display mt-3 text-3xl sm:text-4xl">STILL AN ARCHITECT AT HEART</h2>
        <p className="mono mx-auto mt-3 max-w-xl text-[0.85rem] leading-relaxed text-[color:var(--color-ink-soft)]">
          A decade ago I designed in mass, light and structure. Tap the block —
          watch it keep rebuilding itself.
        </p>
      </div>

      <div className="relative mx-auto mt-8 max-w-3xl">
        <div className="relative overflow-hidden rounded-[18px] border border-[color:#2f5bff]/40">
          <button
            type="button"
            onClick={onActivate}
            aria-label="Rebuild the structure"
            className="block w-full cursor-pointer bg-black/40 outline-none focus-visible:ring-2 focus-visible:ring-[color:#2f5bff]"
          >
            <canvas ref={canvasRef} className="block h-[440px] w-full" />
          </button>

          {/* bracketed hint */}
          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2">
            <span className="tech relative bg-black/60 px-5 py-2 text-[0.7rem] text-[color:var(--color-paper)] before:absolute before:-left-1 before:top-0 before:h-full before:w-2 before:border-y before:border-l before:border-[color:#2f5bff] after:absolute after:-right-1 after:top-0 after:h-full after:w-2 after:border-y after:border-r after:border-[color:#2f5bff]">
              {touched ? 'Tap again ↻' : 'Tap to interact'}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
