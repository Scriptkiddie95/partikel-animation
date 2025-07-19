# ToDo

- [ ] Letter-Spacing des DOM-Textes mit `getComputedStyle` lesen und in `measureTextMetrics` uebergeben
- [ ] `computeOffsets` so anpassen, dass Breite mit Letter-Spacing und `devicePixelRatio` beruecksichtigt wird
- [ ] Canvas-Elemente intern mit `devicePixelRatio` skalieren und den Zeichenkontext mittels `ctx.scale` anpassen
- [ ] `<h1>` und Canvas nur ueber absolute Offsets positionieren, ohne `position: fixed`
- [ ] Cookies oder `localStorage` nutzen, um gemessene Offsets und Zoom-Stufe zu speichern
- [ ] Nach der Partikelanimation per Crossfade auf den markierbaren Text ueberblenden
- [ ] In der README erklaeren, wie bei 125 % Zoom die Ueberlagerung geprueft werden kann

**Ziel:** Der sichtbare DOM-Text soll nach der Animation pixelgenau die gleiche Position wie das Canvas einnehmen, damit der Uebergang nicht wahrnehmbar ist.
