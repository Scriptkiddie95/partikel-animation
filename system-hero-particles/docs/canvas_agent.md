# 🖼️ canvas.agent.md – Steuerung des Partikelaufbaus im Canvas

## 🧠 Zweck

Zentrale Agentenbeschreibung für die Partikel-zu-Text-Animation im HTML-Canvas. Nutzt die von `textflow.prompt.md` bereitgestellten Zielpunkte und kombiniert sie mit mathematischen Wellenbewegungen aus `wave.controller.agent.md` → `math_map.md` → `wave.runtime.ts`.

---

## 🎯 Aufgabe

- Steuert Partikelformation beim Laden und Scrollen
- Initialisiert pro Text-Section eine Partikelbewegung zur Zielkoordinate
- Verwendet Gleichungs-IDs aus `wave.controller.agent.md`

---

## 🔧 Konfiguration

```yaml
agent: canvas.agent.md
strategy: particles-to-text
trigger:
  - onLoad
  - onScroll
source: textflow.prompt.md
equation: mother_wave
runtime: wave.runtime.ts
parameters:
  A: 1.0
  k: 0.1
  omega: 1.5
  alpha: 0.03
  gamma: 3.0
  epsilon: 0.1
  x0: 0
  y0: 0
frameRate: 60
duration: 800
ease: easeOutCubic
canvas:
  mode: full-screen-overlay
  zIndex: -1
  pixelRatio: 2
```

---

## 🔁 Ablauf

1. `textflow.prompt.md` liefert Koordinaten für alle DOM-Texte
2. `wave.runtime.ts` berechnet Bewegungsverlauf je Partikel
3. Partikel bewegen sich zur Zielposition synchronisiert per Gleichung
4. Optional: Scroll-sensitives Wiederholen oder Rückwärtsanimation

---

## 🔗 Abhängigkeiten

- [`textflow.prompt.md`](./textflow.prompt.md)
- [`wave.controller.agent.md`](./wave.controller.agent.md)
- [`math_map.md`](./math_map.md)
- [`wave.runtime.ts`](./wave.runtime.ts)
- [`json.rules`](./json.rules)

---

## 📍 Status

**v1.0 Ready** – aktiviert und einsatzbereit für alle Viewport-gesteuerten Textanimationen mit Partikelsystem.

> Optional: `canvas.debugOverlay.agent.md` zur Live-Überwachung von Wellenform, Offset und Zielmatrix.

