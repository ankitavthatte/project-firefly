import { useEffect, useRef } from 'react'

// An interactive grid mesh: faint dots + lines on black that get pulled
// toward the cursor (a gentle gravity-well warp) and glow blue near it.
// Canvas 2D, DPR-aware, pauses when off-screen, static for reduced motion.
export default function GridBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const SPACING = 46
    const mouse = { x: 0, y: 0, tx: 0, ty: 0, active: false }
    let W = 0, H = 0, dpr = 1, raf = 0, visible = true

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      W = rect.width
      H = rect.height
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (!mouse.active) {
        mouse.tx = mouse.x = W / 2
        mouse.ty = mouse.y = H * 0.42
      }
      if (reduce) render(true)
    }

    function render(staticOnly) {
      ctx.clearRect(0, 0, W, H)
      if (!staticOnly) {
        mouse.x += (mouse.tx - mouse.x) * 0.12
        mouse.y += (mouse.ty - mouse.y) * 0.12
      }
      const sig2 = 2 * 150 * 150 // warp radius
      const glow2 = 2 * 170 * 170 // glow radius
      const pull = staticOnly ? 0 : 34
      const cols = Math.ceil(W / SPACING) + 2
      const rows = Math.ceil(H / SPACING) + 2

      const nodes = []
      for (let r = 0; r < rows; r++) {
        const row = []
        for (let c = 0; c < cols; c++) {
          const bx = c * SPACING - SPACING
          const by = r * SPACING - SPACING
          const dx = mouse.x - bx
          const dy = mouse.y - by
          const d2 = dx * dx + dy * dy
          const amt = pull * Math.exp(-d2 / sig2)
          const len = Math.sqrt(d2) || 1
          row.push({
            x: bx + (dx / len) * amt,
            y: by + (dy / len) * amt,
            heat: staticOnly ? 0 : Math.exp(-d2 / glow2),
          })
        }
        nodes.push(row)
      }

      // base grid — one faint path
      ctx.lineWidth = 1
      ctx.strokeStyle = 'rgba(150,168,205,0.10)'
      ctx.beginPath()
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const n = nodes[r][c]
          if (c < cols - 1) {
            const rn = nodes[r][c + 1]
            ctx.moveTo(n.x, n.y)
            ctx.lineTo(rn.x, rn.y)
          }
          if (r < rows - 1) {
            const dn = nodes[r + 1][c]
            ctx.moveTo(n.x, n.y)
            ctx.lineTo(dn.x, dn.y)
          }
        }
      }
      ctx.stroke()

      // glowing blue segments near the cursor
      if (!staticOnly) {
        ctx.lineCap = 'round'
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const n = nodes[r][c]
            if (n.heat < 0.05) continue
            const seg = (m) => {
              const h = Math.min(1, ((n.heat + m.heat) / 2) * 1.7)
              if (h < 0.05) return
              ctx.strokeStyle = `rgba(96,146,255,${h * 0.9})`
              ctx.lineWidth = 1 + h * 1.4
              ctx.beginPath()
              ctx.moveTo(n.x, n.y)
              ctx.lineTo(m.x, m.y)
              ctx.stroke()
            }
            if (c < cols - 1) seg(nodes[r][c + 1])
            if (r < rows - 1) seg(nodes[r + 1][c])
          }
        }
      }

      // node dots
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const n = nodes[r][c]
          ctx.beginPath()
          ctx.fillStyle =
            n.heat > 0.08
              ? `rgba(130,178,255,${Math.min(1, n.heat * 1.25)})`
              : 'rgba(160,178,215,0.13)'
          ctx.arc(n.x, n.y, 1 + n.heat * 2.4, 0, 6.283)
          ctx.fill()
        }
      }

      // focal glow at the cursor
      if (!staticOnly) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 130)
        g.addColorStop(0, 'rgba(70,120,255,0.15)')
        g.addColorStop(1, 'rgba(70,120,255,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 130, 0, 6.283)
        ctx.fill()
      }
    }

    function loop() {
      render(false)
      raf = requestAnimationFrame(loop)
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect()
      mouse.tx = e.clientX - rect.left
      mouse.ty = e.clientY - rect.top
      mouse.active = true
    }
    function onTouch(e) {
      if (e.touches && e.touches[0]) onMove(e.touches[0])
    }

    resize()
    window.addEventListener('resize', resize)

    if (reduce) {
      render(true)
      return () => window.removeEventListener('resize', resize)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onTouch, { passive: true })

    // pause the loop when the landing scrolls out of view
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible && !raf) raf = requestAnimationFrame(loop)
        if (!visible && raf) {
          cancelAnimationFrame(raf)
          raf = 0
        }
      },
      { threshold: 0 },
    )
    io.observe(canvas)
    raf = requestAnimationFrame(loop)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
