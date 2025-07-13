import { useEffect, useRef, useState } from 'react'
import useMeasure from 'react-use-measure'

interface Particle {
  startX: number
  startY: number
  targetX: number
  targetY: number
}

interface HeroTitleEffectProps {
  text: string
  fontSize?: number
  color?: string
}

const HeroTitleEffect: React.FC<HeroTitleEffectProps> = ({
  text,
  fontSize = 128,
  color = '#0ff',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [containerRef, bounds] = useMeasure()
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    let frame = 0
    let cancelled = false
    setShowText(false)

    const run = async () => {
      await document.fonts?.ready
      if (cancelled) return

      const canvas = canvasRef.current
      if (!canvas || !bounds.width || !bounds.height) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const dpr = window.devicePixelRatio || 1
      const width = bounds.width
      const height = bounds.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)

      ctx.font = `${fontSize}px Orbitron, sans-serif`
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'

      const totalWidth = ctx.measureText(text).width
      let xCursor = (width - totalWidth) / 2

      const offCanvas = document.createElement('canvas')
      offCanvas.width = Math.round(width * dpr)
      offCanvas.height = Math.round(height * dpr)
      const offCtx = offCanvas.getContext('2d')
      if (!offCtx) return
      offCtx.scale(dpr, dpr)
      offCtx.font = `${fontSize}px Orbitron, sans-serif`
      offCtx.textAlign = 'left'
      offCtx.textBaseline = 'middle'
      offCtx.fillStyle = color

      const step = Math.max(1, Math.round(dpr))

      const letters: Particle[][] = []

      for (const letter of text) {
        const widthLetter = ctx.measureText(letter).width
        offCtx.clearRect(0, 0, width, height)
        offCtx.fillText(letter, xCursor, height / 2)
        const data = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height).data
        const particles: Particle[] = []
        for (let y = 0; y < offCanvas.height; y += step) {
          for (let x = 0; x < offCanvas.width; x += step) {
            const idx = (y * offCanvas.width + x) * 4
            if (data[idx + 3] > 128) {
              const targetX = x / dpr
              const targetY = y / dpr
              const startX = -100 + Math.random() * 50
              const startY = targetY
              particles.push({ startX, startY, targetX, targetY })
            }
          }
        }
        letters.push(particles)
        xCursor += widthLetter
      }

      let current = 0
      let startTime = performance.now()
      const duration = 1000

      const ease = (t: number) => 1 - Math.cos(t * Math.PI) / 2

      const animate = (time: number) => {
        if (cancelled) return
        const t = Math.min(1, (time - startTime) / duration)
        const particles = letters[current]
        ctx.clearRect(0, 0, width, height)
        for (const p of particles) {
          const x = p.startX + (p.targetX - p.startX) * ease(t)
          const y = p.startY + (p.targetY - p.startY) * ease(t)
          ctx.beginPath()
          ctx.arc(x, y, 1.5, 0, Math.PI * 2)
          ctx.fillStyle = color
          ctx.fill()
        }

        if (t < 1) {
          frame = requestAnimationFrame(animate)
        } else {
          current += 1
          if (current < letters.length) {
            startTime = time
            frame = requestAnimationFrame(animate)
          } else {
            setShowText(true)
          }
        }
      }

      frame = requestAnimationFrame(animate)
    }

    run()

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
    }
  }, [text, fontSize, color, bounds.width, bounds.height])

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {!showText && (
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />
      )}
      <span
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: `${fontSize}px`,
          fontFamily: 'Orbitron, sans-serif',
          color,
          whiteSpace: 'nowrap',
          opacity: showText ? 1 : 0,
          transition: 'opacity 0.4s ease',
          userSelect: 'text',
        }}
      >
        {text}
      </span>
    </div>
  )
}

export default HeroTitleEffect
