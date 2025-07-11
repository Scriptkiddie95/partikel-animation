# 🎯 animation.core.md – Fokus auf den funktionierenden Partikelaufbau

## ✅ Ziel dieses Dokuments
Dieses Dokument klärt die **einzige essenzielle Aufgabe**: Die Animation zu vollenden. nur **die fertige, funktionale, sichtbare Animation**:

> **Partikel, von links nach rechts sammeln, um Text zu formen – exakt umgekehrt zur bekannten Zerfall-Animation DissipateTextEffect**.

---

## 🧠 Warum ist `DissipateTextEffect.tsx` eingebunden?

Weil dieses Modul ursprünglich eine Partikel-Zerfalls-Animation enthält, bei der ein sichtbarer Text **sich auflöst und verschwindet**. In der Testumgebung wurde es bewusst beibehalten, um eine **vergleichbare Umkehrung** der Logik zu ermöglichen:

### 🧪 Testzweck
- Verstehen der **Entstehungspfade** der Partikel
- Rückverfolgung der Alphakanäle aus dem Text
- Exakte **Pixelextraktion der Schrift** per `CanvasRenderingContext2D.getImageData`

Diese Technik wird **umgedreht**, sodass:
- Die Partikel **nicht vom Text wegfliegen**, sondern **aus dem Raum zum Text** strömen.
- Die Bewegung durch mathematische Funktionen wie `mother_wave()` gesteuert wird.

---

## 🔧 Aktueller Stand

- Die Funktion `DissipateTextEffect` kann vollständig ignoriert werden und nach unten auf die website gesetzt werden zur referenz.
- Die Koordinaten stammen weiterhin aus der Canvas-Pixelauswertung

 - Die Bewegung soll durch `ParticlesEngine.ts` geregelt werden, nicht durch Timeline-Zerfall für die Lade Animation
- Die Partikel **erreichen** statt **verlassen** das Zielbild

---

## 🚀 Priorisierte ToDos

1. [x] Neue Komponente `AssembleTextEffect.tsx` schreiben (Zielgerichtete Bewegung)
2. [x] Alte Zerfallslogik vollständig entfernen (`status == Animate → Dissipate` raus)
3. [ ] `ParticlesEngine.ts` anpassen, sodass `targetX, targetY` → Fixpunkt ist
4. [x] Wellenbasierte Bewegung (`mother_wave`) einbauen → aus `wave.runtime.ts`
5. [x] Nur *sichtbare Textpixel* als Zielpunkte verwenden (wie in der Zerfallsversion)

---

## 📌 Reminder

👉 **Fokus: Animation fertigstellen.**

Wenn du Partikel siehst, die auf einen Text zuströmen und ihn formen, **hast du das Ziel erreicht**.