import React from 'react'; // React-Bibliothek fuer JSX
import { createRoot } from 'react-dom/client'; // Neue Root-API importieren
import App from './App'; // Hauptelement der Anwendung
import './index.css'; // Globale Styles inklusive Tailwind

const container = document.getElementById('root') as HTMLElement; // DOM-Element finden

createRoot(container).render( // Root erstellen und App rendern
  <React.StrictMode> // Aktiviert zusätzliche Checks im Development
    <App /> // Unsere Hauptkomponente einbinden
  </React.StrictMode>
); // Render-Vorgang abschliessen
