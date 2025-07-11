// 🚀 particles.engine.ts – zentrale Steuerlogik für das Partikelsystem

import { resolveWave, waveFunctions } from '../docs/wave_runtime'
import { getTextTargets } from '../docs/textflow.prompt.md'
import { getParams } from '../docs/wave.controller.agent.md'

interface Particle {
  x: number
  y: number
  vx?: number
  vy?: number
  targetX: number
  targetY: number
  alpha: number
}

export class ParticlesEngine {
  private particles: Particle[] = []
  private equation: (x: number, y: number, t: number, params: any) => number | { vx: number; vy: number }
  private params: any
  private time: number = 0
  private ctx: CanvasRenderingContext2D
  private width: number
  private height: number

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number, config: { equationId: string, params: any }) {
    this.ctx = ctx
    this.width = width
    this.height = height
    this.equation = resolveWave(config.equationId)
    this.params = config.params
  }

  async init() {
    const targets = await getTextTargets() // aus textflow.prompt.md

    for (const section of targets) {
      for (const coord of section.coordinates) {
        const startX = Math.random() * this.width
        const startY = Math.random() * this.height

        this.particles.push({
          x: startX,
          y: startY,
          targetX: coord.x,
          targetY: coord.y,
          alpha: 1.0
        })
      }
    }
  }

  update(dt: number) {
    this.time += dt

    for (const p of this.particles) {
      const fx = this.equation(p.x, p.y, this.time, this.params)
      if (typeof fx === 'number') {
        // radialer Einfluss – optional nutzen
        const dx = p.targetX - p.x
        const dy = p.targetY - p.y
        p.x += dx * 0.08
        p.y += dy * 0.08
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
    const loop = (timestamp: number) => {
      this.update(0.016) // ~60 FPS
      this.draw()
      requestAnimationFrame(loop)
    }
    requestAnimationFrame(loop)
  }
}
