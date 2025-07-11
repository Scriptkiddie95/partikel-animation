// AssembleTextEffect.tsx – Initiale Partikel-Zusammensetzung
import { useEffect, useRef } from 'react'

interface AssembleTextEffectProps {
  text: string
  fontSize?: number
  color?: string
}

const AssembleTextEffect: React.FC<AssembleTextEffectProps> = ({ text, fontSize = 128, color = '#0ff' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    const { width, height } = canvasRef.current
    ctx.clearRect(0, 0, width, height)

    // Zeichne Text als Maskierung für Partikel
    ctx.fillStyle = color
    ctx.font = `${fontSize}px Orbitron, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, width / 2, height / 2)

    // Extrahiere Zielpunkte und starte Partikelanimation
    // const imageData = ctx.getImageData(0, 0, width, height) follow math_map.md
    // const targetPoints = []
    // for{
    // animateParticlesToText(ctx, imageData, { color })
  }, [text, fontSize, color])

  return <canvas ref={canvasRef} width={800} height={300} />
}

export default AssembleTextEffect