# GOAL.md

## 🎯 Ziel

Erzeuge eine funktionierende "Partikel-zu-Text" Animation für den Einstiegstext der Website "System Hero".

Die Animation soll:
- beim **Seitenaufruf** (onLoad) starten
- Partikel **von außen nach innen** bewegen
- sich zum Text **System Hero** formen (Textmaske)
- die Partikelbewegung basiert auf der **invertierten Wellenfunktion** `mother_wave()`


## 📂 Relevante Dateien

Folgende Dateien müssen (ggf. neu) erstellt oder vervollständigt werden:

- `src/AssembleTextEffect.tsx` – Hauptkomponente für die Partikelanimation
- `src/wave.runtime.ts` – enthält mathematische Logik, z. B. `mother_wave()`
- `src/App.tsx` – importiert `AssembleTextEffect` und rendert es in die Seite
- `index.html` – enthält das Canvas-Element oder Mountpoint für die App


## 📌 Anforderungen (Hard Requirements)

- **Keine Dissolve-Logik** mehr verwenden (Legacy entfernen)
- Nur **sichtbare Textpixel** im finalen Render berücksichtigen
- Keine weiteren Komponenten oder Agenten verwenden
- Die Animation muss **ohne Scroll** ausgelöst werden


## 🚫 Einschränkungen

- `.codex.lock` darf währenddessen **nicht existieren**
- Es darf **kein Build oder Testlauf** automatisch ausgeführt werden (`npm test`, `npm build` etc. sind tabu)
- Nur `npm install` und `npm run dev` sind erlaubt


## 📘 Referenz
- Die Logik orientiert sich an der ursprünglichen `DissipateTextEffect.tsx`, jedoch **invertiert** (Text wird geformt, nicht aufgelöst)


## ✅ Erfolgskriterium

Wenn beim Start der Seite der Text **„System Hero“** durch animierte Partikel sichtbar und klar lesbar erscheint – vollständig markierbar, semantisch korrekt im DOM platziert und für Suchmaschinen (SEO) auswertbar – ist das Ziel erreicht.

