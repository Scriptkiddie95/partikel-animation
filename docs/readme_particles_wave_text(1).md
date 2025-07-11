# 🌊 Partikel-Wellen-Textanimation – README.md

## 🚀 Projektname: `system-hero-particles`

Ein mathematisch präziser, visuell beeindruckender Canvas-Effekt: Partikel strömen *nicht auseinander*, sondern *sammeln sich synchronisiert zu einem Text* (z. B. Logo, Claim). Grundlage ist eine invertierte Wellenfunktion mit zentralem Ursprung. Ziel ist es, die Animation nicht zu "zerstreuen", sondern gezielt **zu formieren** – synchron, immersiv und skalierbar.

---

## 🎯 Zielsetzung

- Umkehrung der klassischen Partikel-Explosionsanimation: **Formieren statt Zerfallen**
- Steuerung über mathematische Wellenfunktionen (z.B. `z(x, y, t) = A * sin(...) * e^{-αt}`)
- Modular erweiterbar über `math_map.md` und `textmap.prompt`
- Zielpunkte entstehen durch dynamische Textmasken im Canvas
- Kompatibel mit Codex-basierten Agenten-Systemen (`.agent`, `.prompt`, `.rules`)

---

## 🔧 Tech Stack

```json
{
  "react": "18.2.0",
  "three": "^0.158.0",
  "@react-three/fiber": "^8.16.9",
  "@react-three/drei": "^9.98.6",
  "gsap": "^3.12.6",
  "leva": "^0.9.36",
  "vite": "^5.2.0",
  "typescript": "^5.3.2"
}
```

---

## 🧮 Mathematische Grundlage

### Wellenfunktion (invertiert)

```latex
z(x, y, t) = A \cdot \sin\left( k \cdot \sqrt{x^2 + y^2} - \omega t \right) \cdot e^{-\alpha t}
```

Diese Form ist explizit darauf ausgerichtet, **in Richtung des Ursprungs** zu animieren – die Partikel wandern zur Mitte hin und formen dort die Textmaske.

Weitere Varianten: siehe [`math_map.md`](./math_map.md)

---

## 📂 Projektstruktur

```bash
src/
├── components/
│   ├── ParticleTextCanvas.tsx        # Haupt-Canvas mit Animationslogik
│   ├── useTextMask.ts                # Text → Zielkoordinaten
│   ├── useWaveFunction.ts            # Mathematische Wellenberechnung
│   └── useScrollTrigger.ts           # Scroll-Synchronisation (optional)
├── agents/
│   ├── canvas.agent.md               # Agent zur Steuerung des Ziels (z. B. h1#hero)
│   ├── textmap.prompt.md             # Erzeugt Zieltext → Koordinaten
│   └── math_map.md                   # Alle Gleichungsvarianten für Partikelbewegung
├── App.tsx
├── main.tsx
└── vite.config.ts
```

---

## 🧠 Agentensteuerung (Codex-kompatibel)

### canvas.agent.md

```markdown
- target: #hero-title
- equation: z(x, y, t) = A * sin(k * sqrt(x^2 + y^2) - ω * t) * exp(-α * t)
- strategy: form-to-text
```

### textmap.prompt.md

```markdown
- text: "System Hero"
- resolution: [width, height]
- output: pixel[]
```

---

## 💡 Features

- Präzise Kontrolle der Partikelbewegung durch mathematische Gleichung
- Leichte Erweiterbarkeit durch neue Formeln (z. B. `phaseShift`, `timeWarped`)
- Canvas-Rendering optimiert für Performance (instancing ready)
- Ideal für hero sections, splash pages oder Produktlogos
- Komplett lokal steuerbar und ohne externe APIs

---

## ⛔️ Was **nicht** enthalten ist

- **Dissipate-Effekt**: wird bewusst nicht verwendet.
- Keine zufällige Zerstreuung oder chaotische Bewegung.
- Keine externe Datenquellen oder Audio-Reaktoren in V1.

---

## 🔄 Erweiterungsmöglichkeiten

- AI-gesteuerte Textänderung via Prompt
- Audio-Reaktivität mit Fourier-Transformation
- Shader-basierte GPU-Optimierung mit WebGL
- Übergangsanimationen mit `react-spring` oder `GSAP` zur Verstärkung der Wellenstruktur
- Partikelverhalten basierend auf Benutzerinteraktion (z. B. Mausbewegung, Scroll, Click)

---

## 🧪 Test & Dev

```bash
npm install
npm run dev
```

---

## 📎 Weitere Ressourcen

- [math\_map.md](./math_map.md) – Mathematische Basisfunktionen & Varianten
- [Codex Rules](./json.rules) – Agentensteuerung & Outputformate
- [textmap.prompt.md](./textmap.prompt.md) – Umwandlung von Text in Zielkoordinaten

---

## 🤖 Vision

Die Codex-kompatible Partikel-Wellen-Engine von `System Hero` ist **mehr als ein Effekt** – sie ist ein Einstieg in eine visuelle Semantik. Text wird zu Bewegung, Bewegung zu Bedeutung. Mathematik ist nicht nur Stilmittel, sondern **Motor** der Erzählung.

---

## 📍 Status

**v1.0 Alpha** – mathematisch funktionsfähig, visuell vollständig implementierbar, Codex-ready.

Nächster Meilenstein:

- Live-Integration in `system-hero.com`
- API-freie Rendering Engine mit Wellenpräzision
- GPU/Instancing über `three.js`

