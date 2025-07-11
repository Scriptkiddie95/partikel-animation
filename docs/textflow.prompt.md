# 📝 textflow.prompt.md – Textkoordinaten aus Canvas

## 🔗 Mapping-Beispiel

```json
{
  "text": "System Hero",
  "size": 64,
  "font": "Orbitron",
  "points": [ { "x": 120, "y": 74 }, { "x": 121, "y": 74 }, ... ]
}
```

Die Funktion `textToPoints()` aus `src/textMask.ts` verwendet `CanvasRenderingContext2D.getImageData` und liefert diese Punktliste. Sie dient als Eingabe für `ParticlesEngine`.
