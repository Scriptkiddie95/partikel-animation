export interface TextMaskOptions {
  text: string
  width: number
  height: number
  fontSize: number
  fontFamily?: string
  step?: number
}

export interface Point {
  x: number
  y: number
}

export function textToPoints({
  text,
  width,
  height,
  fontSize,
  fontFamily = 'sans-serif',
  step = 2,
}: TextMaskOptions): Point[] {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) return []

  ctx.fillStyle = '#000'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `${fontSize}px ${fontFamily}`
  ctx.fillText(text, width / 2, height / 2)

  const data = ctx.getImageData(0, 0, width, height).data
  const points: Point[] = []

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const idx = (y * width + x) * 4
      if (data[idx + 3] > 128) {
        points.push({ x, y })
      }
    }
  }

  return points
}
