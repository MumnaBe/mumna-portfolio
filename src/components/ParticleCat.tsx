import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useMediaQuery'

// my tabby, drawn as points and rendered as particles. they start scattered,
// pull into shape, run away from the cursor, and blink every so often.

const SHAPE_W = 48
const SHAPE_H = 40
const STEP = 0.7

type Point = [number, number]
type Line = [Point, Point]
type Kind = 'body' | 'eyesOpen' | 'eyesClosed'

const head = { cx: 24, cy: 25, rx: 16, ry: 12 }
const EYES_X = [18, 30]
const EYES_Y = 23.5

// ears. the base of each one sits inside the head outline so it never shows
const outerEars: Line[] = [
  [[9.6, 20.5], [12, 4]],
  [[12, 4], [21.5, 13.8]],
  [[38.4, 20.5], [36, 4]],
  [[36, 4], [26.5, 13.8]],
]
const innerEars: Line[] = [
  [[13.2, 14.5], [13.9, 8.6]],
  [[13.9, 8.6], [18.2, 13.2]],
  [[34.8, 14.5], [34.1, 8.6]],
  [[34.1, 8.6], [29.8, 13.2]],
]
// forehead stripes
const stripes: Line[] = [
  [[21, 15.5], [21.7, 18.5]],
  [[24, 14.6], [24, 18]],
  [[27, 15.5], [26.3, 18.5]],
]
const whiskers: Line[] = [
  [[12.5, 27], [2.5, 25]],
  [[12.5, 29], [2.5, 30.5]],
  [[35.5, 27], [45.5, 25]],
  [[35.5, 29], [45.5, 30.5]],
]

function nearLine(x: number, y: number, [[ax, ay], [bx, by]]: Line, thickness: number) {
  const dx = bx - ax
  const dy = by - ay
  const k = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy)))
  return Math.hypot(x - (ax + k * dx), y - (ay + k * dy)) < thickness
}

function isBody(x: number, y: number) {
  const r = Math.hypot((x - head.cx) / head.rx, (y - head.cy) / head.ry)
  if (Math.abs(r - 1) * head.ry < 0.75) return true
  if (r > 1 && outerEars.some((line) => nearLine(x, y, line, 0.75))) return true
  if (r > 1 && innerEars.some((line) => nearLine(x, y, line, 0.45))) return true
  if (r < 1 && stripes.some((line) => nearLine(x, y, line, 0.5))) return true
  if (whiskers.some((line) => nearLine(x, y, line, 0.38))) return true
  // nose
  if ((x - 24) ** 2 + ((y - 27.4) * 1.6) ** 2 < 1.1) return true
  // ":3" mouth: the lower halves of two small circles
  if (y > 28.6 && [22.6, 25.4].some((mx) => Math.abs(Math.hypot(x - mx, y - 28.6) - 1.4) < 0.4)) return true
  // a little heart floating by the ear
  const hx = (x - 43) / 3
  const hy = -(y - 6.5) / 3
  return (hx * hx + hy * hy - 1) ** 3 - hx * hx * hy ** 3 < 0
}

const isEyeOpen = (x: number, y: number) =>
  EYES_X.some((ex) => ((x - ex) / 1.35) ** 2 + ((y - EYES_Y) / 2.1) ** 2 < 1)
const isEyeClosed = (x: number, y: number) =>
  EYES_X.some((ex) => Math.abs(x - ex) < 2.2 && Math.abs(y - (EYES_Y - 0.4 + 0.2 * (x - ex) ** 2)) < 0.45)

const TARGETS: { x: number; y: number; kind: Kind }[] = []
for (let y = 0; y < SHAPE_H; y += STEP) {
  for (let x = 0; x < SHAPE_W; x += STEP) {
    if (isBody(x, y)) TARGETS.push({ x, y, kind: 'body' })
    if (isEyeOpen(x, y)) TARGETS.push({ x, y, kind: 'eyesOpen' })
    if (isEyeClosed(x, y)) TARGETS.push({ x, y, kind: 'eyesClosed' })
  }
}

const REPEL_RADIUS = 48

export default function ParticleCat({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let width = 0
    let height = 0
    let scale = 1
    let offsetX = 0
    let offsetY = 0
    let color = '#d895a5'
    let blinkUntil = 0
    let nextBlink = performance.now() + 2500
    const pointer = { x: 0, y: 0, active: false }

    const particles = TARGETS.map((t) => ({
      kind: t.kind,
      tx: t.x,
      ty: t.y,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      size: 0.75 + Math.random() * 0.85,
      phase: Math.random() * Math.PI * 2,
    }))

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      scale = Math.min(width / (SHAPE_W + 6), height / (SHAPE_H + 6))
      offsetX = (width - SHAPE_W * scale) / 2
      offsetY = (height - SHAPE_H * scale) / 2
    }

    const readColor = () => {
      color = getComputedStyle(canvas).getPropertyValue('--petal').trim() || color
    }

    const draw = (time: number) => {
      if (!reduced && time > nextBlink) {
        blinkUntil = time + 170
        nextBlink = time + 2600 + Math.random() * 2600
      }
      const blinking = time < blinkUntil

      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = color

      for (const p of particles) {
        const tx = offsetX + p.tx * scale
        const ty = offsetY + p.ty * scale

        if (reduced) {
          p.x = tx
          p.y = ty
        } else {
          p.vx += (tx - p.x) * 0.018
          p.vy += (ty - p.y) * 0.018
          if (pointer.active) {
            const dx = p.x - pointer.x
            const dy = p.y - pointer.y
            const d = Math.hypot(dx, dy)
            if (d > 0.01 && d < REPEL_RADIUS) {
              const force = (1 - d / REPEL_RADIUS) * 2.4
              p.vx += (dx / d) * force
              p.vy += (dy / d) * force
            }
          }
          p.vx *= 0.86
          p.vy *= 0.86
          p.x += p.vx
          p.y += p.vy
        }

        const visible = p.kind === 'body' || (p.kind === 'eyesOpen' ? !blinking : blinking)
        if (!visible) continue
        ctx.globalAlpha = reduced ? 0.9 : 0.6 + 0.4 * Math.sin(time / 650 + p.phase)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * (scale / 6), 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    resize()
    readColor()
    // scatter first so the cat pulls itself together on load
    for (const p of particles) {
      p.x = Math.random() * width
      p.y = Math.random() * height
    }

    let raf = 0
    let visible = true
    const loop = (time: number) => {
      draw(time)
      raf = visible ? requestAnimationFrame(loop) : 0
    }

    if (reduced) draw(0)
    else raf = requestAnimationFrame(loop)

    // no point animating off-screen
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !raf && !reduced) raf = requestAnimationFrame(loop)
    })
    intersection.observe(canvas)

    const sizeObserver = new ResizeObserver(() => {
      resize()
      if (reduced) draw(0)
    })
    sizeObserver.observe(canvas)

    // the particle colour is a css var, so re-read it on a theme flip
    const themeObserver = new MutationObserver(() => {
      readColor()
      if (reduced) draw(0)
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active = true
    }
    const onLeave = () => {
      pointer.active = false
    }
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)
    canvas.addEventListener('pointerup', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      intersection.disconnect()
      sizeObserver.disconnect()
      themeObserver.disconnect()
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
      canvas.removeEventListener('pointerup', onLeave)
    }
  }, [reduced])

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        className="particle-canvas"
        role="img"
        aria-label="An illustrated tabby cat made of pink particles that scatter when you move your cursor over it."
      />
      <p className="mono-caption mt-1 text-center" aria-hidden="true">
        {'// pet the cat'}
      </p>
    </div>
  )
}
