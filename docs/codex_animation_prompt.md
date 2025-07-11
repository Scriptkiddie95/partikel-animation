### 🧠 Kontextgeprüfter Prompt für Codex

#### ⚡ Ziel: Partikelanimation korrekt umsetzen (Aufbau, keine Auflösung)

---

### 📖 Ausgangspunkt (basierend auf letzter Zusammenfassung):

- `agents.md` orchestriert das Projekt grob, verweist aber unklar auf die zentrale Aufgabe.
- `animation_core.md` benennt 5 konkrete To-Dos, darunter:
  - `AssembleTextEffect.tsx` implementieren
  - `mother_wave` einbinden
- `codex_project_overview.md` nennt mehrere offene Architektur-Entscheidungen
- `wave.runtime.ts` soll für Echtzeitanpassungen erweitert werden
- DebugOverlay & GPU-Instancing sind in Planung
- `README.md` nennt Live-Integration als Meilenstein

---

### 📕 Prompt (textflow\.prompt.md)

```md
GOAL:
Setze die Partikelanimation korrekt um: Partikel formen Text (Assemble-Effekt, kein Disintegrate). Alles soll SEO-kompatibel bleiben.

TASKS:
1. Implementiere `AssembleTextEffect.tsx` – Partikel fliegen von außen nach innen und bilden Text.
2. Binde `mother_wave(x, y, t)` aus `wave.runtime.ts` zur Steuerung der Bewegung ein.
3. Vermeide alte Dissolve-Logik.
4. Stelle sicher, dass nur sichtbare Textpixel berücksichtigt werden.
5. Animation wird nur beim ersten Scroll in View gestartet (Viewport).
6. Text bleibt selektierbar & copybar (kein Canvas-only-Overlay).

INPUT:
- `App.tsx` ist der Einstiegspunkt mit mehreren Textsektionen ("System Hero", "IT Services" usw.).
- Über `ParticleText.tsx` oder das neue `AssembleTextEffect.tsx` muss der Partikeleffekt erfolgen.
 - Wichtige Dateien: `wave.runtime.ts`, `ParticlesEngine.ts`, `scrollTrigger.ts`, `textMask.ts` (siehe `src/ParticlesEngine.ts`)

OUTPUT:
- `AssembleTextEffect.tsx` als funktionsfähige Komponente
- Optional Updates in `ParticleText.tsx` für Wiederverwendung

WARNUNG:
- `.codex.lock` darf nicht existieren
- Vermeide automatische Tests/Builds (npm test, build)
- Nutze `npm start` oder `npm run dev`

ZUSATZ:
- `codex.setup.cli.ts` ggf. anpassen falls neue Abhängigkeiten entstehen
- README über Fortschritte aktualisieren
```

---

### 🎯 Ergebnis: Dieser Prompt ist **vollständig abgestimmt** auf alle Punkte der letzten Projekt-Zusammenfassung. Er klärt:

- **Was zu tun ist**
- **Welche Dateien betroffen sind**
- **Welche Regeln gelten (SEO, Agent Lock, keine Tests)**
- **Wie die Animation sich verhalten soll** (Aufbau statt Auflösung, selektierbarer Text)

---
