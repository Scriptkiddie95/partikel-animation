import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  text: string
  fontSize?: number
  density?: number
  width?: number
  height?: number
}

const ParticleText: React.FC<Props> = ({
  text,
  fontSize = 120,
  density = 0.9,
  width = 800,
  height = 200,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const particles = useRef<{
    x: number
    y: number
    tx: number
    ty: number
    vx: number
    vy: number
  }[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Device Pixel Ratio berücksichtigen
    const dpr = window.devicePixelRatio || 1

    // Setze explizit HTML-Attribute, nicht nur CSS!
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)

    // Offscreen-Canvas für Texterkennung
    const offCanvas = document.createElement('canvas')
    offCanvas.width = Math.round(width * dpr)
    offCanvas.height = Math.round(height * dpr)
    const offCtx = offCanvas.getContext('2d')
    if (!offCtx) return
    offCtx.scale(dpr, dpr)

    // Fallback auf Arial, falls Orbitron nicht geladen wird!
    offCtx.fillStyle = '#000'
    offCtx.font = `bold ${fontSize}px Orbitron, Arial, sans-serif`
    offCtx.textAlign = 'center'
    offCtx.textBaseline = 'middle'
    offCtx.fillText(text, width / 2, height / 2)

    const imageData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height).data

    // Neue Partikel erzeugen
    particles.current = []
    const step = Math.max(1, Math.round(dpr))
    for (let y = 0; y < offCanvas.height; y += step) {
      for (let x = 0; x < offCanvas.width; x += step) {
        const idx = (y * offCanvas.width + x) * 4
        const alpha = imageData[idx + 3]
        if (alpha > 128 && Math.random() < density) {
          particles.current.push({
            x: Math.random() * width,
            y: Math.random() * height,
            tx: x / dpr,
            ty: y / dpr,
            vx: 0,
            vy: 0,
          })
        }
      }
    }

    let t = 0
    let anim = true

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      for (const p of particles.current) {
        const dx = p.tx - p.x
        const dy = p.ty - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const angle = Math.atan2(dy, dx)
        const speed = Math.sin(dist / 10 + t) * 0.5

        p.vx += Math.cos(angle) * speed * 0.1
        p.vy += Math.sin(angle) * speed * 0.1
        p.vx *= 0.9
        p.vy *= 0.9

        p.x += p.vx
        p.y += p.vy

        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = '#fff'
        ctx.fill()
      }

      t += 0.05
      if (anim) requestAnimationFrame(animate)
    }

    animate()

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => {
        anim = true
        requestAnimationFrame(animate)
      },
      onLeaveBack: () => {
        anim = false
        particles.current.forEach(p => {
          p.vx = Math.random() * 4 - 2
          p.vy = Math.random() * 4 - 2
        })
      },
    })

    return () => {
      anim = false
      trigger.kill()
    }
  }, [text, fontSize, density, width, height])

  return (
    <div
      ref={containerRef}
      style={{
        width,
        height,
        margin: '100vh auto 0 auto',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <span
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'transparent',
          font: `bold ${fontSize}px Orbitron, Arial, sans-serif`,
          color: '#fff',
          userSelect: 'text',
        }}
      >
        {text}
      </span>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ display: 'block', background: '#111', borderRadius: 8 }}
      />
    </div>
  )
}

export default ParticleText
