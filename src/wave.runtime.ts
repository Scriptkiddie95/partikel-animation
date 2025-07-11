
// 📦 wave.runtime.ts – Runtime Resolver für Partikel-Gleichungen

export interface WaveParams {
  A?: number
  k?: number
  omega?: number
  alpha?: number
  beta?: number
  gamma?: number
  epsilon?: number
  x0?: number
  y0?: number
}

// Gleichungen aus math_map (Python-Übersetzung)
export const waveFunctions = {
  wave_inward: (x: number, y: number, t: number, params: WaveParams): number => {
    const { A = 1.0, k = 0.1, omega = 2.0, alpha = 0.05, x0 = 0, y0 = 0 } = params
    const r = Math.hypot(x - x0, y - y0)
    return A * Math.sin(k * r - omega * t) * Math.exp(-alpha * t)
  },

  gravitational_pull: (
    x: number,
    y: number,
    _t: number,

    params: WaveParams,
  ): { vx: number; vy: number } => {
    const { gamma = 4.0, epsilon = 0.01, x0 = 0, y0 = 0 } = params
    const dx = x - x0
    const dy = y - y0
    const r2 = dx ** 2 + dy ** 2 + epsilon
    return { vx: -gamma * dx / r2, vy: -gamma * dy / r2 }
  },

  wave_time_warped: (
    x: number,
    y: number,
    t: number,

    params: WaveParams,
  ): number => {
    const { A = 1.0, k = 0.1, omega = 2.0, alpha = 0.05, beta = 1.2, x0 = 0, y0 = 0 } = params
    const r = Math.hypot(x - x0, y - y0)
    return A * Math.sin(k * r - omega * Math.pow(t, beta)) * Math.exp(-alpha * t)
  },

  mother_wave: (
    x: number,
    y: number,
    t: number,
    params: WaveParams,
  ): number => {
    const { A = 1.0, k = 0.1, omega = 2.0, alpha = 0.05, gamma = 3.0, epsilon = 0.1, x0 = 0, y0 = 0 } = params
    const dx = x - x0
    const dy = y - y0
    const r = Math.hypot(dx, dy)
    const wave = A * Math.sin(k * r - omega * t)
    const gravity = gamma / (r ** 2 + epsilon)
    return (wave + gravity) * Math.exp(-alpha * t)
  }
}
export const resolveWave = (id: string) => {
  return waveFunctions[id] || waveFunctions['mother_wave']
}
