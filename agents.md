# 🎼 AGENTS.md – Orchestrierung aller Codex Agenten Anfragen.

> *„Wenn die Partikel sich zur Musik formen, tanzen sie im Takt des Codex.“*

Willkommen in der **Agenten-Konzertleitung** von `system-hero-particles`.\
Hier werden alle `*.agent.md` Dateien harmonisiert, verbunden und als **kompositorische Partitur** dokumentiert.

---

## 🧠 Was ist ein Agent?

Ein Agent in diesem System ist eine **semantische Steueranweisung**, die beschreibt, *wann*, *wo* und *wie* eine Partikelanimation stattfindet. Die Dateien dienen aktuell als **strukturierte Markdown-Komponenten** – *noch ohne echte Executor-Logik*.

Ziel: eine zentrale `Agent Engine`, die diese Dateien analysiert, interpretiert und zur Laufzeit automatisch mit dem Canvas synchronisiert.

---

## 📜 Registrierte Agenten

| Agent-Datei                    | Beschreibung                                               | Status       |
| ------------------------------ | ---------------------------------------------------------- | ------------ |
| `canvas.agent.md`              | Hauptsteuerung der Partikelbewegung auf dem Canvas         | Konzipiert ✅ |
| `wave.controller.agent.md`     | Auswahl der mathematischen Gleichung + Parametervarianten  | Aktiv ✅      |
| `canvas.debugOverlay.agent.md` | Visual Debug Layer zur Kontrolle von Animation + Gleichung | Dev-Modus ⚠️ |
| `textflow.prompt.md`           | Textkoordinaten-Mapping über HTML-Parsing                  | Aktiv ✅      |


---

## 🧩 Zielstruktur für Live-Ausführung (künftig)

```ts
// Pseudo: agent-executor.ts
import { loadAgent } from './AGENTS.md'
const canvasAgent = loadAgent('canvas.agent.md')
canvasAgent.execute(canvasContext, textTargets)
```

---

## 🚧 ToDo für vollständige Agentenintegration

Animation fertig stellen.

---

## 📌 Fazit

schau in den \docs ordner als nächstes!