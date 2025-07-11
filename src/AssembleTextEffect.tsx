// AssembleTextEffect.tsx – Initiale Partikel-Zusammensetzung
import { useEffect, useRef, useState } from 'react'
import useMeasure from 'react-use-measure'
import { ParticlesEngine } from './ParticlesEngine'

interface AssembleTextEffectProps {
  text: string
  fontSize?: number
  color?: string
}

const AssembleTextEffect: React.FC<AssembleTextEffectProps> = ({ text, fontSize = 128, color = '#0ff' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<ParticlesEngine | null>(null)
  const [containerRef, bounds] = useMeasure()
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    let cancelled = false
    setShowText(false)

    const start = async () => {
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

    // Offscreen canvas for text mask
    const offCanvas = document.createElement('canvas')
    offCanvas.width = Math.round(width * dpr)
    offCanvas.height = Math.round(height * dpr)
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
    const offWidth = Math.floor(offCanvas.width / dpr)
    const offHeight = Math.floor(offCanvas.height / dpr)
    for (let y = 0; y < offHeight; y += 2) {
      for (let x = 0; x < offWidth; x += 2) {
        const iy = Math.floor(y * dpr)
        const ix = Math.floor(x * dpr)
        const idx = (iy * offCanvas.width + ix) * 4
        if (data[idx + 3] > 128) targets.push({ x, y })
      }
    }

    const engine = new ParticlesEngine(ctx, width, height, {
      equationId: 'mother_wave',
    })
    engine.init(targets)
    engine.run(() => setShowText(true))
    engineRef.current = engine

    }

    start()

    return () => {
      cancelled = true
      engineRef.current?.stop()
    }
  }, [text, fontSize, color, bounds.width, bounds.height])

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      />
      <span
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: `${fontSize}px`,
          fontFamily: 'Orbitron, sans-serif',
          color,
          textAlign: 'center',
          whiteSpace: 'nowrap',
          opacity: showText ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      >
        {text}
      </span>
    </div>
  )
}

export default AssembleTextEffect
