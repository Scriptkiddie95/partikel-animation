export type Particle = {
    x: number
    y: number
    radius: number
    color: string
    targetX: number
    targetY: number
    startX: number
    startY: number
    progress: number
    letterIndex: number
}

export const createParticle = (
    startX: number,
    startY: number,
    targetX: number,
    targetY: number,
    radius: number,
    color: string,
    letterIndex: number
): Particle => ({
    x: startX,
    y: startY,
    radius,
    color,
    targetX,
    targetY,
    startX,
    startY,
    progress: 0,
    letterIndex
})

export const updateParticle = (particle: Particle, speed: number = 0.02): boolean => {
    if (particle.progress >= 1) return false

    particle.progress = Math.min(particle.progress + speed, 1)
    
    // EaseInOut Funktion: 1 - cos(t * π) / 2
    const easing = 1 - Math.cos(particle.progress * Math.PI) / 2

    particle.x = particle.startX + (particle.targetX - particle.startX) * easing
    particle.y = particle.startY + (particle.targetY - particle.startY) * easing

    return true
}

export const drawParticle = (
    ctx: CanvasRenderingContext2D,
    particle: Particle
) => {
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.radius * (1 - 0.5 * particle.progress), 0, Math.PI * 2)
    ctx.fillStyle = particle.color
    ctx.fill()
}
