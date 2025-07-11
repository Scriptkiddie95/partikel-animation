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
  private spawnRadius: number
  private onComplete?: () => void
  private lastTime: number | null = null
  private rafId = 0
  private running = false
  private hasCompleted = false

  constructor(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    config: {
      equationId?: string
      params?: Record<string, number>
      spawnRadius?: number
    } = {},
    onComplete?: () => void
  ) {
    this.ctx = ctx
    this.width = width
    this.height = height
    this.equation = resolveWave(config.equationId ?? 'mother_wave')
    this.params = config.params ?? {}
    this.spawnRadius = config.spawnRadius ?? 50
    this.onComplete = onComplete
  }

  init(targets: { x: number; y: number }[]) {
    const r = this.spawnRadius
    this.particles = targets.map(t => {
      const side = Math.floor(Math.random() * 4)
      let x = 0
      let y = 0
      switch (side) {
        case 0:
          // left
          x = -r * (1 + Math.random())
          y = Math.random() * this.height
          break
        case 1:
          // right
          x = this.width + r * (1 + Math.random())
          y = Math.random() * this.height
          break
        case 2:
          // top
          x = Math.random() * this.width
          y = -r * (1 + Math.random())
          break
        default:
          // bottom
          x = Math.random() * this.width
          y = this.height + r * (1 + Math.random())
          break
      }

      return {
        x,
        y,
        vx: 0,
        vy: 0,
        targetX: t.x,
        targetY: t.y,
        alpha: 1,
      }
    })
  }

  update(dt = 0.016) {
    this.time += dt
    const remaining: Particle[] = []
    for (const p of this.particles) {
      const fx = this.equation(p.x, p.y, this.time, {
        ...this.params,
        x0: p.targetX,
        y0: p.targetY,
      })

      if (typeof fx === 'number') {
        const angle = Math.atan2(p.targetY - p.y, p.targetX - p.x)
        p.vx += Math.cos(angle) * fx
        p.vy += Math.sin(angle) * fx
      } else {
        p.vx += fx.vx
        p.vy += fx.vy
      }

      p.vx *= 0.9
      p.vy *= 0.9
      p.x += p.vx
      p.y += p.vy

      const dx = p.targetX - p.x
      const dy = p.targetY - p.y
      if (dx * dx + dy * dy < 1) {
        p.x = p.targetX
        p.y = p.targetY
        p.vx = 0
        p.vy = 0
        p.alpha -= dt * 0.5
        if (p.alpha < 0) p.alpha = 0
      }

      if (p.alpha > 0.05) remaining.push(p)
    }

    this.particles = remaining

    if (this.particles.length === 0 && !this.hasCompleted) {
      this.hasCompleted = true
      this.stop()
      this.onComplete?.()
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    for (const p of this.particles) {
      if (p.alpha <= 0.05) continue
      this.ctx.beginPath()
      this.ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
      this.ctx.fillStyle = `rgba(255,255,255,${p.alpha})`
      this.ctx.fill()
    }
  }

  run() {
    this.running = true
    this.hasCompleted = false
    this.lastTime = null
    const loop = (timestamp: number) => {
      const dt = this.lastTime === null ? 0.016 : (timestamp - this.lastTime) / 1000
      this.lastTime = timestamp
      this.update(dt)
      if (!this.running) return
      this.draw()
      this.rafId = requestAnimationFrame(loop)
    }
    this.rafId = requestAnimationFrame(loop)
  }

  stop() {
    this.running = false
    cancelAnimationFrame(this.rafId)
    this.rafId = 0
    this.lastTime = null
  }
}
