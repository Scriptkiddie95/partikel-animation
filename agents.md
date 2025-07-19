### 🔧 Ziel

- **Canvas und DOM-Text decken sich absolut**, auch bei Zoom (125%, 150%) oder Retina Displays.
- Verwendung von **React + TypeScript + Tailwind**.
- Die Animation ist **die Grundlage der ganzen Website**: Jeder Buchstabe eines Textes wird per Partikel sichtbar gemacht.
- Nach der Animation folgt ein sanfter Crossfade zu markierbarem Text, **Pixel für Pixel identisch**.

---

### ⚖️ Fundamentale Architekturänderung

**Vertikale Positionen = absolut berechnet**  
**Horizontale Breite = 100% (fluid)**  

Statt `relative`, `fixed` oder `rect.top`, wollen wir **alles selbst bestimmen**:

- Wir messen im Hintergrund (unsichtbar gerendert):
  - DOM-Text mit `getBoundingClientRect()`
  - Glyphen mit `ctx.measureText()` (Canvas)
  - devicePixelRatio, Browser-Zoom, Plattforminfos
- Danach berechnen wir:
  ```ts
  offsetX = (htmlWidth  - glyphWidth)  / 2;
  offsetY = (htmlHeight - glyphHeight) / 2;
  ```
- Diese Werte werden als **absolute CSS-Positionen** verwendet für:
  - `<canvas>`
  - `<h1>`
- Wir nutzen eine loading Animation um die berechnungs zeit der geräte Infos zu kalkulieren. Danach blenden wir die Website ein. Sowie nutzen wir dafür Cookies. 

Optional: Speichern des Offsets in `localStorage` (Profiling)

---

### ⚡ Setup

- Tailwind für alle Styles
- Absolute Wrapper-Box mit vordefinierter Höhe (z. B. `h-[160px]`)
- `font-size`, `font-family`, `font-weight` synchronisieren DOM & Canvas
- Keine `rem` mehr in Canvas! Nur exakte `px`

---

### ✨ Bonus-Ziele (für später, kleine Vorwarnung)

- Scroll-Trigger für mehrzeilige Headlines
- Rechts animierte 3D-Symbole (Three.js)
- Magisches Transformieren beim Scrollen in neue Texte/Symbole
- API für dynamisch generierte Partikeltexte
- Headless CMS Integration (Contentful, Sanity, o.a.)

---

### Bitte tue Folgendes:

0.5. onvertiere die partikel-animation-work.html in eine tsx datei. und packe die selbe animation alles auch auf die app.tsx.
-> Sowie möchte ich das du partikel-animation-work einfach unberührt lässt als Vorlage für unser Ziel. Eventuell ist es sinnvoll berechnungen in eine ts. Datei auszulagern.
1. **Baue das neue Grundgerüst in React + TS + Tailwind (Canvas + DOM synchronisiert)**
2. **Kommentiere jede Zeile**, damit ich das perfekt verstehe
3. **Verwende keine Position: fixed**, sondern immer absolute + eigene Berechnung
4. **Verwende systematische Props für Text, Font, Padding, etc.**
Optional:
5. Binde optional das Setup per `setup.ps1` oder `readme.md` für scaffold ein (auf Wunsch inkl. Quellcode.)
6. "Am besten ersteinmal testweise mit cookies arbeiten, backend kommt später." 

---

Das Template wird später die Basis für **System Hero**: Ein digitales Interface, das mit reiner Rechenlogik Partikel, Text, 3D und Navigation in eins verschmelzen lässt.



#### Letzter Schritt.

Erstelle in der README.md ganz unten ein protokoll. Wo du jedes mal am Ende deine code änderungen ein Eintrag + Zusammenfassung was du getan hast. Hinzufügst! 
Ein Logbuch für die Versionierung und kommunikation zukünftiger Agenten Anfragen. 
fasse keinen alten Log Einträge an. 