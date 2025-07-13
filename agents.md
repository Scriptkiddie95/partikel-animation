Erzeuge eine React-Komponente `HeroTitleEffect.tsx`, die den folgenden Effekt ausführt:

---

## 🎯 Ziel

Der Text „System Hero“ erscheint beim Laden der Seite mit einem magischen Animationseffekt:  
Partikel fliegen von links ein und formen langsam die Buchstaben des Textes – **buchstabenweise, synchron, nicht gleichzeitig**.

Nach Abschluss der Partikel-Animation wird der echte Text im DOM sichtbar und vollständig selektierbar. Der Partikeleffekt darf **nicht doppelt oder statisch bleiben**. Er ist rein visuell und wird danach entfernt oder ausgeblendet.

---

## 🛠 Technische Anforderungen

### Canvas:
- Verwende ein `<canvas>` mit absoluter Positionierung, über der Textstelle
- Die Animation wird per `requestAnimationFrame()` gesteuert
- Jeder Partikel hat:  
  `x`, `y`, `radius`, `rgba`, `targetX`, `targetY`

### Bewegung:
- Partikel fliegen von `x_start = -100 + random(0–50)` zum `x_target` (Buchstabenposition)
- Formel:
```ts
x(t) = x₀ + (x_target - x₀) * E(t)
y(t) = y₀ + (y_target - y₀) * E(t)
E(t) = 1 - cos(t * π) / 2 // EaseInOut
