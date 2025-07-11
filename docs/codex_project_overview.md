# 🧭 Codex Projektüberblick – system-hero-particles

## 🧱 Projektstruktur

Das Repository `system-hero-particles` enthält ein mit **Vite** generiertes React/TypeScript-Projekt. Ziel ist die Erstellung einer mathematisch gesteuerten **Partikelanimation**, bei der sich Partikel **sammeln**, um Text zu formen – gesteuert durch invertierte Wellenfunktionen, die aktuell rein programmatisch eingebunden sind – nicht über aktive Codex-Agenten gesteuert, sondern direkt in der Engine verwendet.

---

## 📂 Bestandteile & Komponenten

### 🔧 Implementiert (technisch)

- **React-Komponenten** wie `EmailInput.tsx`, `ParticleText.tsx`
- **Canvas-Rendering mit GSAP** / ScrollTrigger
- **Mathematische Runtime**: `wave.runtime.ts`
 - **Partikel-Engine**: `src/ParticlesEngine.ts`
- **Agenten-Logik**: `canvas.agent.md`, `wave.controller.agent.md`, `json.rules`

### 📄 Dokumentiert (konzeptionell)

- `math_map.md`: Wellenfunktionen in LaTeX + Python
- `textflow.prompt.md`: Text-to-Koordinaten Mapping
- `canvas.debugOverlay.agent.md`: Debugvisualisierung
- `readme_particles_wave_text.md`: Vision & Zielbeschreibung

### ❓Unfertig / Widersprüchlich

- `create-particles-demo.ts`: unvollständig oder leer
- `README.md`: endet mit persönlichem Log („hier ist etwas schiefgelaufen“)

---

## 🧠 Ursprungsidee

> **„Nicht zerfallen – sondern aufbauen“**

Die Partikel sollen sich beim Laden/Scrollen **aus dem Raum sammeln**, um klaren Text zu bilden. Dies basiert auf einer umgekehrten Wellenfunktion:

```latex
z(x, y, t) = A \cdot \sin\left( k \cdot \sqrt{(x - x_0)^2 + (y - y_0)^2} - \omega t \right) \cdot e^{-\alpha t}
```

Die Bewegung erfolgt über mathematisch gesteuerte Agenten mit Triggern wie `onLoad` oder `onScroll`.

---

## ⚠️ Herausforderungen

### 1. **Vermischte Projektansätze**

- Verschiedene Boilerplates wurden ohne klares Integrationskonzept zusammengeführt.
- Teile der Architektur sind vorhanden, aber unverbunden.

### 2. **Diskrepanz: Dokumentation vs. Realität**

- Die MD-Dokumente skizzieren ein komplettes Framework.
- Im React-Code sind nur Basis-Komponenten enthalten.

### 3. **Fehlende Struktur & Wartbarkeit**

- Agenten, Prompts und Gleichungen existieren nur als Konzepte.
- Es fehlt eine technische Middleware, die alles orchestriert.

### 4. **Versionshistorie / README fehlt Struktur**

- Das ursprüngliche README endet mit einem Logeintrag statt Dokumentation:
  > „Ich bin ganz ehrlich: Hier ist etwas schiefgelaufen im Code …“

---

## ✅ Diskussionspunkte (Open Tasks)

| Thema           | Frage / Entscheidung                                                         |
| --------------- | ---------------------------------------------------------------------------- |
| 🔁 Refactor     | Besteht Bedarf für ein vollständiges Re-Scaffolding?                         |
| 🧠 Architektur  | Wie strikt trennen wir Runtime, Docs, Prompt-Input & Agenten-Logik?          |
| ⚙️ Setup-Script | Soll `codex.setup.cli.ts` alles automatisch generieren inkl. Canvas-Hook?    |
| 🔎 Debug-Modus  | Bleibt `canvas.debugOverlay.agent.md` optional oder Teil des Default Builds? |
| 📚 README       | Ersetzen wir den alten Log durch eine Codex-gerechte Erklärung?              |
| 🧬 Naming       | Einheitlich `agent`, `prompt`, `runtime`, `engine`, `map`?                   |

---

## 🧩 Zielstruktur (Modular Codex-basiert)

```bash
src/
├── engine/                # ParticlesEngine.ts, wave.runtime.ts
├── canvas/                # Canvas-Komponente, useParticlesEngine.ts
├── agents/                # canvas.agent.md, wave.controller.agent.md
├── prompts/               # textflow.prompt.md, generate_wave.prompt.md
├── overlays/              # canvas.debugOverlay.agent.md
├── math/                  # math_map.md
└── cli/                   # codex.setup.cli.ts
```

---

## 📌 Fazit

Das Projekt hat starkes Potenzial, ist aber **fragmentiert**. Die Kernidee – eine semantisch gesteuerte Partikeltextbildung – ist visionär. Jetzt gilt es, **System, Code und Dokumentation zu vereinheitlichen**, die Agentenlogik zu realisieren und einen wiederholbaren Build-Prozess zu etablieren.

> Vorschlag: Wir starten ein „Codex Refactor Sprint“, bei dem alle Komponenten nach einem gemeinsamen Muster geordnet, verbunden und deployfähig gemacht werden. 💥

