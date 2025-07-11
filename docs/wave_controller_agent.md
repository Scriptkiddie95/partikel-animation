# 🎛️ wave.controller.agent.md

## 🧠 Zweck

Steuert zentral die Auswahl und Parametrisierung aller Wellengleichungen zur Partikelbewegung. Kann von Codex-Agents, Canvas-Renderern oder externen UI-Panels (z. B. Leva, GUI) dynamisch abgefragt und angepasst werden.

---

## ⚙️ Konfiguration

```json
{
  "default": "mother_wave",
  "equations": {
    "wave_inward": {
      "function": "wave_inward",
      "source": "math_map.md",
      "label": "Invertierte Radialwelle",
      "parameters": ["A", "k", "omega", "alpha", "x0", "y0"]
    },
    "gravitational_pull": {
      "function": "gravitational_pull",
      "source": "math_map.md",
      "label": "Gravitationssog",
      "parameters": ["gamma", "epsilon", "x0", "y0"]
    },
    "wave_time_warped": {
      "function": "wave_time_warped",
      "source": "math_map.md",
      "label": "Zeitmodulierte Welle",
      "parameters": ["A", "k", "omega", "alpha", "beta", "x0", "y0"]
    },
    "mother_wave": {
      "function": "mother_wave",
      "source": "math_map.md",
      "label": "Muttergleichung (Hybrid)",
      "parameters": ["A", "k", "omega", "alpha", "gamma", "epsilon", "x0", "y0"]
    }
  }
}
```

---

## 🔄 Beispielnutzung in Codex-Agenten

```markdown
- agent: canvas.agent.md
- uses: wave.controller.agent.md
- equation: mother_wave
- parameters:
    A: 1.0
    k: 0.08
    omega: 1.2
    alpha: 0.03
    gamma: 2.4
    epsilon: 0.1
    x0: 0
    y0: 0
```

---

## 🧩 Erweiterungsideen

- Verbindung zu Leva-Control Panel zur Live-Modifikation
- KI-gesteuertes Umschalten je nach Textlänge / Sichtbarkeit / Scrolltiefe
- Integration in `debugOverlay.agent.md` zur Visualisierung

---

## 📍 Status

**v1.0 Einsatzbereit** – ermöglicht modulare Steuerung aller Bewegungsmodelle aus `math_map.md`

> Nächster Schritt: `wave.runtime.ts` zur Echtzeit-Interaktion & Parametertweaks.

