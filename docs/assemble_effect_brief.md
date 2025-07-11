# 🧠 assemble.effect.brief.md – Minimalbeschreibung für Codex Agenten

## ✅ Ziel (1 Satz)
Erzeuge eine sichtbare Animation, bei der **Partikel aus dem Raum** in definierte Zielpositionen strömen, um **einen Text zu formen** – nach demselben technischen Muster wie `DissipateTextEffect.tsx`, jedoch umgekehrt.

---

## 🧩 Technischer Hinweis
- `DissipateTextEffect.tsx` dient als Referenz
- Canvas-Text wird per `getImageData` in Zielkoordinaten umgewandelt
- Bewegung basiert nicht auf Zufall, sondern **gerichtet zu Koordinaten**
- Die Partikel starten aus zufälligen Punkten außerhalb oder innerhalb des Canvas
- `particles.engine.ts` übernimmt Steuerung

---

## 🔗 Eingabestruktur für Codex Agenten (informell)

```json
{
  "text": "System Hero",
  "size": 48,
  "font": "Inter",
  "output": [ { "x": 124, "y": 80 }, { "x": 125, "y": 80 }, ... ]
}
```

---

## 💡 Agentenverhalten (minimal)

> Wenn ein `particles-to-text` Agent aktiv ist, soll er `DissipateTextEffect` **invertieren**:  
> Die Zielpunkte bleiben gleich – nur die Bewegungsrichtung wird **umgekehrt**.

---
