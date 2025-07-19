import React from 'react'; // Basis-Import fuer React
import { ParticleIntro } from './components/ParticleIntro'; // Intro-Komponente einbinden

// Hauptkomponente der Anwendung
export default function App() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-black text-white"> {/* Vollbild-Hintergrund */}
      <div className="relative w-full h-[160px]"> {/* Fester Wrapper gemaess Setup */}
        <ParticleIntro
          text="HELLO WORLD" // Beispieltext
          font="700 80px Orbitron, sans-serif" // Einheitliche Schriftdefinition
          padding={80} // Innenabstand des Canvas
        />
      </div>
    </div>
  );
}
