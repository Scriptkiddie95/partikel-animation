// Utility functions for precise DOM and canvas measurements

// Rectangle measurement using getBoundingClientRect
export function measureElementRect(el: HTMLElement): DOMRect {
  return el.getBoundingClientRect();
}

// Measure text metrics on a throwaway canvas
// Ergebnisobjekt fuer die Textvermessung
export interface TextMeasurement {
  metrics: TextMetrics; // rohe Canvas-Metriken
  widthWithSpacing: number; // Breite inklusive Letter-Spacing
}

// Vermisst Text auf einem temporären Canvas
export function measureTextMetrics(
  font: string, // CSS-Schriftangabe
  text: string, // zu vermessender Text
  letterSpacing = 0 // beruecksichtigtes Letter-Spacing
): TextMeasurement {
  const canvas = document.createElement('canvas'); // Hilfs-Canvas anlegen
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D; // Kontext holen
  ctx.font = font; // Schrift setzen
  const metrics = ctx.measureText(text); // Metriken ermitteln
  const widthWithSpacing = metrics.width + (text.length - 1) * letterSpacing; // Gesamtbreite berechnen
  return { metrics, widthWithSpacing }; // Ergebnis liefern
}

// Device pixel ratio of the current browser
export function getPixelRatio(): number {
  return window.devicePixelRatio || 1;
}

// Gelesenes Letter-Spacing aus dem DOM zur Zahl konvertieren
export function getLetterSpacing(el: HTMLElement): number {
  return parseFloat(getComputedStyle(el).letterSpacing); // Wert in px
}

export interface Offsets {
  offsetX: number; // horizontale Verschiebung
  offsetY: number; // vertikale Verschiebung
}

// Calculate offsets between DOM box and glyph box
export function computeOffsets(rect: DOMRect, measurement: TextMeasurement): Offsets {
  const dpr = window.devicePixelRatio || 1; // Display-Scaling abfragen
  const glyphWidth = measurement.widthWithSpacing / dpr; // Breite in CSS-Pixel umrechnen
  const glyphHeight =
    measurement.metrics.actualBoundingBoxAscent +
    measurement.metrics.actualBoundingBoxDescent; // Hoehe aus Metriken

  const offsetX = (rect.width - glyphWidth) / 2; // horizontale Mitte finden
  const offsetY = (rect.height - glyphHeight) / 2; // vertikale Mitte finden

  return { offsetX, offsetY }; // Ergebnis zurueckgeben
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
