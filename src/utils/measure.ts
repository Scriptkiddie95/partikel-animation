// Utility functions for precise DOM and canvas measurements

// Rectangle measurement using getBoundingClientRect
export function measureElementRect(el: HTMLElement): DOMRect {
  return el.getBoundingClientRect();
}

// Measure text metrics on a throwaway canvas
export function measureTextMetrics(font: string, text: string): TextMetrics {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.font = font;
  return ctx.measureText(text);
}

// Device pixel ratio of the current browser
export function getPixelRatio(): number {
  return window.devicePixelRatio || 1;
}

export interface Offsets {
  offsetX: number;
  offsetY: number;
}

// Calculate offsets between DOM box and glyph box
export function computeOffsets(rect: DOMRect, metrics: TextMetrics): Offsets {
  const glyphWidth = metrics.width;
  const glyphHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

  const offsetX = (rect.width - glyphWidth) / 2;
  const offsetY = (rect.height - glyphHeight) / 2;

  return { offsetX, offsetY };
}

// Optional: store offsets in localStorage
export function saveOffsets(key: string, offsets: Offsets) {
  try {
    localStorage.setItem(key, JSON.stringify(offsets));
  } catch {
    // ignore if storage is unavailable
  }
}

// Load offsets from localStorage
export function loadOffsets(key: string): Offsets | null {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as Offsets) : null;
  } catch {
    return null;
  }
}
