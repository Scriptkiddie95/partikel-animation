import { useRef, useLayoutEffect, useState, useCallback } from 'react'

type Particle = {
  x: number
  y: number
  radius: number
  color: string
}

type DissipateTextEffectProps = {
  value: string
  width: number
  height: number
  size: number
  color: string
  onDone?: () => void
}

const DissipateTextEffect = ({ value, width, height, size, color, onDone }: DissipateTextEffectProps) => {
  const particles = useRef<Particle[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isAnimating, setAnimating] = useState<boolean>(false)

  const animateParticles = useCallback(() => {
    if (isAnimating) return

    setAnimating(true)

    function animate(startPos = 0) {
      requestAnimationFrame(() => {
        const updatedParticles: Particle[] = []

        for (let i = 0; i < particles.current.length; i++) {
          const particle = particles.current[i]

          if (particle.x < startPos) updatedParticles.push(particle)
          else {
            if (particle.radius <= 0) {
              particle.radius = 0
              continue
            }

            updatedParticles.push({
              color: particle.color,
              x: particle.x + (Math.random() > 0.5 ? 1 : -1),
              y: particle.y + (Math.random() > 0.5 ? 1 : -1),
              radius: particle.radius - 0.05 * Math.random(),
            })
          }
        }

        particles.current = updatedParticles

        const ctx = canvasRef.current?.getContext('2d')
        if (ctx) {
          ctx.clearRect(startPos, 0, width, height)

          particles.current.forEach(({ x, y, radius, color }) => {
            if (x < startPos) return

            ctx.beginPath()
            ctx.rect(x, y, radius, radius)
            ctx.fillStyle = color
            ctx.strokeStyle = color
            ctx.stroke()
          })
        }

        if (particles.current.length > 0) animate(startPos - 8)
        else {
          setAnimating(false)
          onDone?.()
        }
      })
    }

    animate(particles.current.reduce((maxX, { x, radius: size }) => (size > 0 ? (x < maxX ? maxX : x) : maxX), 0))
  }, [width, height, isAnimating, onDone])

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    if (!canvas || !ctx) return

    ctx.font = `500 ${size * 2}px "Inter", "Inter Fallback"`
    ctx.clearRect(0, 0, width, height)

    const textSize = ctx.measureText(value)
    const textHeight = textSize.actualBoundingBoxAscent + textSize.actualBoundingBoxDescent
    ctx.fillStyle = color
    ctx.fillText(value, 8, height / 2 + textHeight / 2 - 12)

    const pixels = []
    const imageData = ctx.getImageData(0, 0, width, height).data

    for (let y = 0; y < height; y++) {
      const row = 4 * y * width
      for (let x = 0; x < width; x++) {
        const index = row + 4 * x

        if (!imageData[index] || !imageData[index + 1] || !imageData[index + 2]) continue
        pixels.push({
          x,
          y,
          color: [imageData[index], imageData[index + 1], imageData[index + 2], imageData[index + 3]],
        })
      }
    }

    particles.current = pixels.map(({ x, y, color }) => ({
      x, y,
      radius: 1,
      color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
    }))

    animateParticles()
  }, [value, width, height, size, color, animateParticles])

  return (
    <canvas
      width={width}
      height={height}
      ref={canvasRef}
      className="top-[-3.5px] left-[-3.5px]"
      style={{
        scale: 0.5,
        position: 'absolute',
        pointerEvents: 'none',
        transformOrigin: 'top left',
      }}
    />
  )
}

export default DissipateTextEffect
