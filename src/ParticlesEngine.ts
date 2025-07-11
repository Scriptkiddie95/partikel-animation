import { resolveWave } from './wave.runtime'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  targetX: number
  targetY: number
  alpha: number
}

export class ParticlesEngine {
  private particles: Particle[] = []
  private equation: (
    x: number,
    y: number,
    t: number,
    params: Record<string, number>
  ) => number | { vx: number; vy: number }
  private params: Record<string, number>
  private time = 0
  private ctx: CanvasRenderingContext2D
  private width: number
  private height: number
  private rafId = 0

  constructor(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    config: { equationId?: string; params?: Record<string, number> } = {}
  ) {
    this.ctx = ctx
    this.width = width
    this.height = height
    this.equation = resolveWave(config.equationId ?? 'mother_wave')
    this.params = config.params ?? {}
  }

  init(targets: { x: number; y: number }[]) {
    this.particles = targets.map(t => ({
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      vx: 0,
      vy: 0,
      targetX: t.x,
      targetY: t.y,
      alpha: 1,
    }))
  }

  update(dt: number) {
    this.time += dt
    for (const p of this.particles) {
      const fx = this.equation(p.x, p.y, this.time, this.params)
      if (typeof fx === 'number') {
        const dx = p.targetX - p.x
        const dy = p.targetY - p.y
        p.x += dx * 0.08
        p.y += dy * 0.08
        p.vx *= 0.9
        p.vy *= 0.9
      } else {
        p.vx = fx.vx
        p.vy = fx.vy
        p.x += p.vx
        p.y += p.vy
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    for (const p of this.particles) {
      this.ctx.beginPath()
      this.ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
      this.ctx.fillStyle = `rgba(255,255,255,${p.alpha})`
      this.ctx.fill()
    }
  }

  run() {
    const loop = () => {
      this.update(0.016)
      this.draw()
      this.rafId = requestAnimationFrame(loop)
    }
    this.rafId = requestAnimationFrame(loop)
  }

  stop() {
    cancelAnimationFrame(this.rafId)
  }
}
