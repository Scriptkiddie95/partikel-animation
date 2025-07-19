'use client'

import useMeasure from 'react-use-measure'
import { useCallback, useState, useRef, useLayoutEffect } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

enum Status { Idle, Error, Loading, Animate, Success }

type EmailInputProps = {
    onSubmit: (email: string) => void
    [key: string]: unknown
}

const EmailInput = ({ onSubmit, ...props }: EmailInputProps) => {
    const [formRef, dimensions] = useMeasure()
    const [value, setValue] = useState<string>('')
    const [status, setStatus] = useState<Status>(Status.Idle)
    const [error, setError] = useState<string>('')

    const validateEmail = (email: string) => {
        if (email.length === 0) {
            setError('Bitte geben Sie eine E-Mail-Adresse ein')
            return false
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Bitte geben Sie eine gültige E-Mail-Adresse ein')
            return false
        }
        setError('')
        return true
    }

    const onEmailChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setStatus(Status.Idle)
            setError('')
            setValue(event.target.value)
        },
        []
    )

    const submitForm = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            event.stopPropagation()

            if (!validateEmail(value)) {
                setStatus(Status.Error)
                return
            }

            setStatus(Status.Loading)

            try {
                await onSubmit(value)
                setStatus(Status.Animate)
            } catch {
                setError('Ein Fehler ist aufgetreten')
                setStatus(Status.Error)
            }
        },
        [value, onSubmit]
    )

    return (
        <form
            ref={formRef}
            onSubmit={submitForm}
            data-loading={status === Status.Loading}
            className="pb-3 relative w-full mx-auto border-[#ffffff48] border-b-2 max-w-[80%]"
        >
            <div className="relative group">
                <input
                    type="email"
                    value={value}
                    onChange={onEmailChange}
                    placeholder="ihre@email.de"
                    disabled={[Status.Loading, Status.Animate].includes(status)}
                    className={`
                        w-full focus-visible:shadow-none 
                        transition-all ease duration-300 
                        selection:bg-white selection:text-orange 
                        pr-20 text-2xl outline-0 font-medium 
                        bg-transparent
                        ${status === Status.Animate ? 'text-transparent' : 'text-white'}
                        ${status === Status.Error ? 'border-red-500' : ''}
                    `}
                    {...props}
                />
                <div className="absolute right-0 translate-y-[-50%] top-[50%] grid-stack">
                    <button
                        type="submit"
                        disabled={[Status.Loading, Status.Animate].includes(status)}
                        className={`
                            uppercase text-[#ffffff95] text-lg 
                            transition-all duration-500 ease-in-out 
                            opacity-0 blur-xs scale-85
                            hover:text-white
                            disabled:opacity-30 disabled:cursor-not-allowed
                            ${status === Status.Idle ? 'group-focus-within:opacity-50 group-focus-within:blur-none group-focus-within:scale-100' : ''}
                            ${status === Status.Loading ? 'animate-pulse' : ''}
                        `}
                    >
                        {status === Status.Loading ? '...' : '[Enter]'}
                    </button>
                </div>
                {error && status === Status.Error && (
                    <div className="absolute left-0 top-full mt-2 text-red-500 text-sm">
                        {error}
                    </div>
                )}
                {status === Status.Animate && dimensions.width > 0 && dimensions.height > 0 && (
                    <DissipateTextEffect
                        size={24}
                        value={value}
                        color="#FFFFFF"
                        height={2 * dimensions.height}
                        width={2 * dimensions.width - 136}
                        onDone={() => {
                            setStatus(Status.Success)
                            setValue('')
                            setTimeout(() => {
                                setStatus(Status.Idle)
                                setError('')
                            }, 1000)
                        }}
                    />
                )}
            </div>
        </form>
    )
}

type Particle = {
    x: number
    y: number
    radius: number
    color: string
    velocityX: number
    velocityY: number
    opacity: number
}

type DissipateTextEffectProps = {
    value: string
    width: number
    height: number
    size: number
    color: string
    onDone?: () => void
}

export const DissipateTextEffect = ({ value, width, height, size, color, onDone }: DissipateTextEffectProps) => {
    const particles = useRef<Particle[]>([])
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isAnimating, setAnimating] = useState<boolean>(false)

    const animateParticles = useCallback(() => {
        if (isAnimating) return

        setAnimating(true)

        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (!canvas || !ctx) return

        const animate = (startPos = 0) => {
            requestAnimationFrame(() => {
                const updatedParticles: Particle[] = []

                for (let i = 0; i < particles.current.length; i++) {
                    const particle = particles.current[i]

                    if (particle.x < startPos) {
                        updatedParticles.push(particle)
                        continue
                    }

                    // Update particle physics
                    particle.x += particle.velocityX
                    particle.y += particle.velocityY
                    particle.radius *= 0.98
                    particle.opacity *= 0.98
                    particle.velocityX *= 1.02
                    particle.velocityY += (Math.random() - 0.5) * 0.2

                    if (particle.radius > 0.1 && particle.opacity > 0.01) {
                        updatedParticles.push(particle)
                    }
                }

                particles.current = updatedParticles

                // Clear only the animated area
                ctx.clearRect(startPos, 0, width - startPos, height)

                // Render particles
                particles.current.forEach(({ x, y, radius, color, opacity }) => {
                    if (x < startPos) return

                    ctx.beginPath()
                    ctx.arc(x, y, radius, 0, Math.PI * 2)
                    ctx.fillStyle = color.replace('rgba(', '').replace(')', `,${opacity})`)
                    ctx.fill()
                })

                if (particles.current.length > 0) {
                    animate(startPos - 8)
                } else {
                    setAnimating(false)
                    onDone?.()
                }
            })
        }

        animate(
            particles.current.reduce(
                (maxX, { x }) => Math.max(maxX, x),
                0
            )
        )
    }, [width, height, isAnimating, onDone])

    useLayoutEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (!canvas || !ctx) return

        // Setup text rendering
        ctx.font = `500 ${size * 2}px "Inter", "Inter Fallback"`
        ctx.clearRect(0, 0, width, height)

        const textMetrics = ctx.measureText(value)
        const textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent
        const textY = height / 2 + textHeight / 2 - 12
        
        // Draw the text
        ctx.fillStyle = color
        ctx.fillText(value, 8, textY)

        // Create particles from text pixels
        const imageData = ctx.getImageData(0, 0, width, height).data
        const newParticles: Particle[] = []

        for (let y = 0; y < height; y += 2) { // Skip pixels for performance
            const row = 4 * y * width
            for (let x = 0; x < width; x += 2) {
                const index = row + 4 * x
                const alpha = imageData[index + 3]

                if (alpha < 128) continue // Skip transparent pixels

                newParticles.push({
                    x,
                    y,
                    radius: 1.5,
                    velocityX: (Math.random() - 0.5) * 2,
                    velocityY: (Math.random() - 0.5) * 2,
                    opacity: 1,
                    color: `rgba(${imageData[index]}, ${imageData[index + 1]}, ${imageData[index + 2]}`
                })
            }
        }

        particles.current = newParticles
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
                filter: 'blur(0.5px)',
            }}
        />
    )
}

export { EmailInput }