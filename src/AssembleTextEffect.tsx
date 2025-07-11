// AssembleTextEffect.tsx – Initiale Partikel-Zusammensetzung
import { useEffect, useRef } from 'react'
import { ParticlesEngine } from './ParticlesEngine'

interface AssembleTextEffectProps {
  text: string
  fontSize?: number
  color?: string
}

const AssembleTextEffect: React.FC<AssembleTextEffectProps> = ({ text, fontSize = 128, color = '#0ff' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<ParticlesEngine | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const { width, height } = canvas
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)

    // Offscreen canvas for text mask
    const offCanvas = document.createElement('canvas')
    offCanvas.width = width * dpr
    offCanvas.height = height * dpr
    const offCtx = offCanvas.getContext('2d')
    if (!offCtx) return
    offCtx.scale(dpr, dpr)

    offCtx.fillStyle = color
    offCtx.font = `${fontSize}px Orbitron, sans-serif`
    offCtx.textAlign = 'center'
    offCtx.textBaseline = 'middle'
    offCtx.fillText(text, width / 2, height / 2)

    const data = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height).data
    const targets: { x: number; y: number }[] = []
    for (let y = 0; y < height; y += 2) {
      for (let x = 0; x < width; x += 2) {
        const idx = ((y * dpr) * offCanvas.width + (x * dpr)) * 4
        if (data[idx + 3] > 128) targets.push({ x, y })
      }
    }

    const engine = new ParticlesEngine(ctx, width, height, { equationId: 'mother_wave' })
    engine.init(targets)
    engine.run()
    engineRef.current = engine

    return () => {
      engine.stop()
    }
  }, [text, fontSize, color])

  return <canvas ref={canvasRef} width={800} height={300} />
}

export default AssembleTextEffect
