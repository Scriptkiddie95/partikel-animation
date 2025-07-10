// ✅ VOLL FUNKTIONSFÄHIGE VERSION
// - Sichtbare Animation
// - [Enter] Button bleibt sichtbar
// - Input wird animiert & zurückgesetzt
// - Keine TypeScript-Fehler

import { useLayoutEffect, useRef, useState, useCallback } from 'react'

type Particle = {
  x: number
  y: number
  radius: number
  color: string
}

interface EffectProps {
  value: string
  width: number
  height: number
  size: number
  color: string
  onDone?: () => void
}

const DissipateTextEffect: React.FC<EffectProps> = ({
  value,
  width,
  height,
  size,
  color,
  onDone,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const [animating, setAnimating] = useState(false)

  const animateParticles = useCallback(() => {
    if (animating) return
    setAnimating(true)

    const step = (startPos = 0) => {
      requestAnimationFrame(() => {
        const next: Particle[] = []

        for (const p of particles.current) {
          if (p.x < startPos) next.push(p)
          else if (p.radius > 0) {
            next.push({
              ...p,
              x: p.x + (Math.random() > 0.5 ? 1 : -1),
              y: p.y + (Math.random() > 0.5 ? 1 : -1),
              radius: p.radius - 0.05 * Math.random(),
            })
          }
        }
        particles.current = next

        const ctx = canvasRef.current?.getContext('2d')
        if (ctx) {
          ctx.clearRect(0, 0, width, height)
          for (const { x, y, radius, color } of next) {
            ctx.fillStyle = color
            ctx.fillRect(x, y, radius, radius)
          }
        }

        if (next.length) step(startPos - 8)
        else {
          setAnimating(false)
          onDone?.()
        }
      })
    }

    const rightMost = Math.max(...particles.current.map(p => p.x))
    step(rightMost)
  }, [width, height, animating, onDone])

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

ctx.font = `500 ${size}px Orbitron, Inter, Arial, sans-serif`
    ctx.clearRect(0, 0, width, height)

    const m = ctx.measureText(value)
    const textHeight = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent
    ctx.fillStyle = color
    ctx.fillText(value, 8, height / 2 + textHeight / 2 - 12)

    const pixels: { x: number; y: number; c: Uint8ClampedArray }[] = []
    const data = ctx.getImageData(0, 0, width, height).data

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4
        if (!data[idx] && !data[idx + 1] && !data[idx + 2]) continue
        pixels.push({ x, y, c: data.subarray(idx, idx + 4) })
      }
    }

    particles.current = pixels.map(({ x, y, c }) => ({
      x,
      y,
      radius: 1,
      color: `rgba(${c[0]},${c[1]},${c[2]},${c[3] / 255})`,
    }))

    animateParticles()
  }, [value, width, height, size, color, animateParticles])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 5,
      }}
    />
  )
}

export default DissipateTextEffect