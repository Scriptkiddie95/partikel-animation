# 📄 textflow\.prompt.md

## 🧠 Zweck

Dient der automatischen Umwandlung des gesamten sichtbaren Website-Texts in eine koordinatenbasierte Partikelziel-Struktur. Ermöglicht vollflächige „Text aus Partikeln“-Aufbauanimationen synchron zu `onLoad` und `onScroll`.

---

## 📥 Eingabe

```json
{
  "selectors": ["h1", "h2", "p", ".cta", ".section-title"],
  "font": "Inter",
  "fontWeight": 600,
  "fontSize": 72,
  "resolution": [1920, 1080],
  "threshold": 180,
  "priorities": {
    "h1": 5,
    "h2": 3,
    "p": 1,
    ".cta": 4,
    ".section-title": 2
  }
}
```

### Parametererklärung

| Feld         | Beschreibung                                                                |
| ------------ | --------------------------------------------------------------------------- |
| `selectors`  | Alle zu verarbeitenden Text-Selektoren                                      |
| `font`       | Einheitliche Render-Schriftart für die Textmaske                            |
| `fontWeight` | Schriftgewicht für die Zeichenlesbarkeit                                    |
| `fontSize`   | Standardgröße (kann dynamisch skaliert werden je nach Elementgröße)         |
| `resolution` | Auflösung des Canvas in Pixel                                               |
| `threshold`  | Alpha-Wert-Schwelle zur Sichtbarkeitsentscheidung (0–255)                   |
| `priorities` | Gewichtung je Elementtyp für spätere Animationsreihenfolge oder Delay-Zonen |

---

## 📤 Ausgabe

```ts
Array<{
  text: string,
  selector: string,
  coordinates: Array<{ x: number, y: number }>,
  priority: number
}>
```

### Beispiel

```json
[
  {
    "text": "System Hero",
    "selector": "h1",
    "coordinates": [ { "x": 123, "y": 90 }, ... ],
    "priority": 5
  },
  {
    "text": "IT & KI für Unternehmen",
    "selector": "p",
    "coordinates": [ { "x": 450, "y": 180 }, ... ],
    "priority": 1
  }
]
```

---

## 🔁 Integration mit Codex-Agenten

```markdown
- use: textflow.prompt.md
- trigger: onLoad, onScroll
- output: [{ selector, coordinates[], priority }]
- forwardTo: canvas.agent.md
```

---

## 🔗 Verknüpfung

- canvas.agent.md (Strategie: `particles-to-text`)
- json.rules → Regeltyp `agent`, `trigger`, `strategy`
- math\_map.md für Gleichungssteuerung der Bewegung

---

## 📍 Status

**v1.0 Alpha** – bereit für dynamische Partikel-Textanimationen im gesamten DOM-Bereich.

> Nächste Ausbaustufe: dynamische BoundingBox-Erkennung & Scroll-Ranking

