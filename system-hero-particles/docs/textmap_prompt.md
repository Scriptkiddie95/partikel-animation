# 📄 textmap.prompt.md

## 🧠 Zweck

Wandelt einen gegebenen Text (z. B. „System Hero“) in ein präzises Zielraster um, das als Koordinatengrundlage für die Partikel-Formation im Canvas dient.

---

## 📥 Eingabe

```json
{
  "text": "System Hero",
  "font": "Inter",
  "fontWeight": 600,
  "fontSize": 72,
  "resolution": [800, 300],
  "threshold": 200
}
```

### Parametererklärung

| Feld         | Beschreibung                                               |
| ------------ | ---------------------------------------------------------- |
| `text`       | Der darzustellende Zieltext                                |
| `font`       | Verwendete Schriftart im Canvas                            |
| `fontWeight` | Gewichtung (für Lesbarkeit der Pixelmaske)                 |
| `fontSize`   | Schriftgröße in Pixeln                                     |
| `resolution` | Breite und Höhe der Canvasfläche                           |
| `threshold`  | Alpha-Schwelle, ab der ein Pixel als sichtbar gilt (0–255) |

---

## 📤 Ausgabe

```ts
Array<{
  x: number,
  y: number
}>
```

Dies sind die **Zielpunkte**, auf die sich die Partikel synchronisieren.

---

## 🔁 Beispiel-Antwort

```json
[
  { "x": 123, "y": 58 },
  { "x": 124, "y": 58 },
  { "x": 125, "y": 58 },
  ...
]
```

---

## 🧩 Integration

Wird automatisch von Codex-Agenten mit der `textmap.prompt.md`-Strategie verwendet und an die `ParticleTextCanvas`-Komponente übergeben.

```markdown
- use: textmap.prompt.md
- output: textCoordinates[]
- forwardTo: particle_canvas.agent
```

---

## 📍 Status

**v1.0** – Einsatzbereit für alle Textmaskierungsanwendungen innerhalb des Canvas.

---

## 🔗 Verknüpfung

- Siehe auch: `math_map.md`, `canvas.agent.md`, `json.rules`

