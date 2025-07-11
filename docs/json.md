# 📜 Codex-Regeln – json.rules

## 🔧 Zweck

Definiert verbindliche Regeln und Outputformate für alle Agenten, Prompts und Komponenten im Projekt `system-hero-particles`. Ziel ist eine strukturierte, dokumentierte und automatisierbare Steuerung der Canvas-Animation.

---

## 📂 Struktur

### Regeltyp: `agent`

```json
{
  "type": "agent",
  "target": "#hero-title",
  "equation": "z(x, y, t) = A * sin(k * sqrt(x^2 + y^2) - ω * t) * exp(-α * t)",
  "strategy": "form-to-text",
  "source": "textmap.prompt.md",
  "frameRate": 60,
  "duration": 2500
}
```

### Regeltyp: `prompt`

```json
{
  "type": "prompt",
  "input": {
    "text": "System Hero",
    "font": "Inter",
    "fontWeight": 600,
    "fontSize": 72,
    "resolution": [800, 300],
    "threshold": 200
  },
  "output": "coordinates[]",
  "forwardTo": "canvas.agent.md"
}
```

---

## 📌 Verpflichtende Felder

### Für `agent`

| Feld        | Beschreibung                                                |
| ----------- | ----------------------------------------------------------- |
| `type`      | Muss "agent" sein                                           |
| `target`    | CSS-Selektor für den Ort der Partikelformation              |
| `equation`  | Wellenform (LaTeX-kompatibel oder JS-ready)                 |
| `strategy`  | Bewegungsmuster, z. B. `form-to-text` oder `explode-center` |
| `source`    | Referenz auf Quelle für Zielpunkte                          |
| `frameRate` | Anzahl der Frames pro Sekunde                               |
| `duration`  | Gesamtdauer in Millisekunden                                |

### Für `prompt`

| Feld        | Beschreibung                                                 |
| ----------- | ------------------------------------------------------------ |
| `type`      | Muss "prompt" sein                                           |
| `input`     | Textspezifikation & Formatierungsdetails                     |
| `output`    | Erwartetes Ausgabeformat (`coordinates[]`, `imageData`, ...) |
| `forwardTo` | Ziel-Agent zur Weiterverarbeitung der generierten Daten      |

---

## ✅ Beispielhafte Agentenkette

```markdown
[textmap.prompt.md] → [textCoordinates[]] → [canvas.agent.md] → [wave_function.ts] → [Canvas]
```

---

## 🧠 Erweiterungen

- `audio-reactive.rules` (z. B. FFT → Amplituden auf A, ω, α)
- `interaction.rules` (z. B. Scroll, Hover, Drag beeinflusst Bewegung)
- `shader.rules` (z. B. Wellenberechnung direkt auf der GPU)

---

## 📍 Status

**v1.0 Ready** – nutzbar für Codex-Systeme und zukünftige Generator-Prompts

