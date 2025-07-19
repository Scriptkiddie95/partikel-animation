import { useCallback, useEffect, useRef, useState } from 'react'
import { createParticle, drawParticle, updateParticle, type Particle } from './effects/HeroTextParticle'

interface HeroTitleEffectProps {
    text: string
    particleColor?: string
    particleCount?: number
    delay?: number
}

export default function HeroTitleEffect({ 
    text, 
    particleColor = '#ffffff', 
    particleCount = 300,
    delay = 500 
}: HeroTitleEffectProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const textRef = useRef<HTMLDivElement>(null)
    const particlesRef = useRef<Particle[]>([])
    const [animationDone, setAnimationDone] = useState(false)
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    
    // Setup der Canvas und Partikel
    const setup = useCallback(() => {
        const canvas = canvasRef.current
        const textElement = textRef.current
        if (!canvas || !textElement) return

        const rect = textElement.getBoundingClientRect()
        const width = Math.ceil(rect.width)
        const height = Math.ceil(rect.height)
        
        canvas.width = width
        canvas.height = height
        setDimensions({ width, height })

        // Erstelle Partikel für jeden Buchstaben
        const letters = text.split('')
        const particlesPerLetter = Math.floor(particleCount / letters.length)
        const particles: Particle[] = []

        letters.forEach((letter, letterIndex) => {
            const letterWidth = width / letters.length
            const letterX = letterWidth * letterIndex + letterWidth / 2
            
            for (let i = 0; i < particlesPerLetter; i++) {
                const startX = -100 + Math.random() * 50
                const startY = Math.random() * height
                const targetX = letterX + (Math.random() - 0.5) * letterWidth * 0.8
                const targetY = height / 2 + (Math.random() - 0.5) * height * 0.5
                
                particles.push(
                    createParticle(
                        startX,
                        startY,
                        targetX,
                        targetY,
                        1 + Math.random(),
                        particleColor,
                        letterIndex
                    )
                )
            }
        })

        particlesRef.current = particles
    }, [text, particleCount, particleColor])

    // Animation Loop
    const animate = useCallback(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (!canvas || !ctx) return

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        let isAnimating = false
        const currentLetterIndex = Math.floor(
            particlesRef.current.reduce((max, p) => Math.max(max, p.progress * p.letterIndex), 0)
        )

        particlesRef.current.forEach(particle => {
            if (particle.letterIndex <= currentLetterIndex) {
                const active = updateParticle(particle, 0.02)
                if (active) isAnimating = true
                drawParticle(ctx, particle)
            }
        })

        if (!isAnimating && !animationDone) {
            setAnimationDone(true)
        } else if (!animationDone) {
            requestAnimationFrame(animate)
        }
    }, [animationDone])

    // Initialisierung
    useEffect(() => {
        setup()
        const timeoutId = setTimeout(() => {
            requestAnimationFrame(animate)
        }, delay)

        return () => clearTimeout(timeoutId)
    }, [setup, animate, delay])

    return (
        <div style={{ position: 'relative' }}>
            <div 
                ref={textRef}
                style={{ 
                    opacity: animationDone ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out',
                    position: 'relative',
                    fontSize: 'inherit',
                    fontWeight: 'inherit'
                }}
            >
                {text}
            </div>
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: dimensions.width,
                    height: dimensions.height,
                    pointerEvents: 'none',
                    opacity: animationDone ? 0 : 1,
                    transition: 'opacity 0.5s ease-in-out'
                }}
            />
        </div>
    )
}
