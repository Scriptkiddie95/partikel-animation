/** @type {import('tailwindcss').Config} */ // Konfigurationstyp fuer Tailwind
export default { // Exportiert das Tailwind-Konfigurationsobjekt
  content: [ // Definiert die Pfade zu allen Templates
    "./src/**/*.{ts,tsx}", // erfasst alle TS- und TSX-Dateien im src-Verzeichnis
  ],
  theme: { // Anpassung des Design-Systems
    extend: {}, // noch keine Erweiterungen
  },
  plugins: [], // keine Plugins eingebunden
}
