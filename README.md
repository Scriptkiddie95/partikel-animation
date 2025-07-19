# System Hero Particles

Dieses Projekt ist eine React/Tailwind-Anwendung, die Partikelanimationen mit dem DOM synchronisiert. Es dient als Grundlage für die Website eines IT-Systemhauses und demonstriert die perfekte Überlagerung von Canvas und HTML-Text.

## Installation

```bash
npm install
```

Alternativ können die Setup-Skripte genutzt werden:

- `setup.sh` für Unix-Systeme
- `codex-init-windows.ps1` für Windows

## Entwicklung starten

```bash
npm run dev
```

Damit wird der Vite-Entwicklungsserver gestartet und die App ist unter `http://localhost:5173/` erreichbar.

## Ziel des Projekts

System Hero Particles zeigt, wie Text per Partikel sichtbar gemacht und anschließend in identischen DOM-Text übergeht. Die Animation bildet das Herzstück der späteren Website für Kunden-Onboarding und Unternehmenspräsentation.

## Beispiel: Korrekte Breite bei 125% Zoom

1. Entwicklungsserver mit `npm run dev` starten.
2. Im Browser die Ansicht auf **125 %** zoomen.
3. Der Text auf dem Canvas überlappt weiterhin pixelgenau den DOM-Text, weil Letter‑Spacing nun berücksichtigt wird.

## Logbuch

- 2025-07-19: README neu erstellt, Installations- und Startbefehle beschrieben sowie Setup-Skripte erwähnt.
- 2025-07-19: Tailwind-Konfiguration hinzugefuegt und main.tsx eingerichtet.
- 2025-07-20: ParticleIntro-Komponente erstellt und App.tsx angepasst.
- 2025-07-21: Messfunktionen hinzugefuegt und Offsets zur absoluten Positionierung verwendet.
- 2025-07-22: App.tsx Wrapper fuer ParticleIntro mit fester Hoehe hinzugefuegt.
- 2025-07-23: Letter-Spacing korrekt vermessen und Offsets auf Zoom vorbereitet.
- 2025-07-24: Canvas-Dimensionen mit devicePixelRatio skaliert und DPR-Ausgabe in
  ParticleIntro integriert.
- 2025-07-25: ToDo-Liste erstellt, um Aufgaben zur perfekten Ueberlagerung von H1 und Canvas zu sammeln.
- 2025-07-26: Dokumentationspfad fuer goal.md korrigiert und fehlende Datei docs/codex/goal.md angelegt.
- 2025-07-27: DPR-Korrektur entfernt, glyphWidth wird nun direkt verwendet.
- 2025-07-27: Resize-Listener in ParticleIntro hinzugefuegt, um Offsets bei Fenster- und DPR-Aenderungen neu zu berechnen.
- 2025-07-27: Fonts werden nun via document.fonts.ready abgewartet, bevor ParticleIntro die Messung startet.
- 2025-07-28: document.fonts.ready mit Fallback eingebaut, Messung startet erst nach Schriftladen.
- 

