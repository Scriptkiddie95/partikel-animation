# 🧪 canvas.debugOverlay.agent.md – Debug-Overlay für Partikel-Wellenanimation

## 🧠 Zweck
Visualisiert die aktuelle Aktivität der Partikelanimation im Canvas – inklusive Wellenform, Zielpunkte, Echtzeitparameter und Frame-Verlauf. Unterstützt bei der Justierung und dem Verständnis der Gleichungsdynamik.

---

## 🔍 Sichtbare Elemente

- 🌀 **Live-Gleichungsvorschau** (`z(x, y, t) = …`)
- 🎯 **Textzielpunkte** als Punkte oder Gitter
- 📈 **Wellenamplitude & Radius-Linien** (Radialvisualisierung)
- 🕓 **Frame-Counter + Duration-Overlay**
- 🔄 **Scroll-Sync-Status** / `onLoad` vs `onScroll`
- ⚙️ **Live-Werte** aller Parameter (`A`, `k`, `ω`, `α`, etc.)

---

## ⚙️ Konfiguration

```json
{
  "enabled": true,
  "position": "top-left",
  "background": "rgba(0, 0, 0, 0.5)",
  "font": "monospace",
  "track": {
    "equationId": true,
    "activeTextSelector": true,
    "particleCount": true,
    "currentFrame": true,
    "waveValueSample": true
  },
  "highlight": {
    "targetDots": "#33FF88",
    "waveRings": "#3388FF",
    "activeParticle": "#FF4444"
  }
}
```

---

## 🔗 Integration

- Optional per Dev-Flag aktivierbar
- Nutzt Daten aus:
  - `wave.runtime.ts`
  - `canvas.agent.md`
  - `textflow.prompt.md`

---

## 📍 Status
**v0.9 Dev Mode** – empfohlen für Dev & Tuning-Sessions während Setup & Testing

> Nächste Ausbaustufe: Toggle-UI zur Echtzeitaktivierung via `Leva`, URL-Flag oder `?debug=true`

