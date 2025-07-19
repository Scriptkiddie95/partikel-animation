import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'; // React-Import inklusive Hooks

// Schnittstelle fuer die Eigenschaften der Partikel-Animation
export interface ParticleIntroProps {
  text: string; // Der anzuzeigende Text
  font: string; // CSS-Font-Definition fuer Canvas und DOM
  padding: number; // Innenabstand fuer das Canvas
  holdDuration?: number; // Dauer des Pausierens nach der Animation
  fadeDuration?: number; // Dauer des Ueberblendens
}

// Schnittstelle fuer die Eigenschaften der Zeichenkomponente
interface AssembleEffectProps {
  text: string; // Text, der als Partikel dargestellt wird
  rect: DOMRect; // Position und Groesse des DOM-Textes
  font: string; // Schriftdefinition fuer das Canvas
  padding: number; // Innenabstand fuer das Canvas
  onComplete: () => void; // Callback nach Abschluss der Animation
}

// Struktur eines einzelnen Partikels
interface Particle {
  targetX: number; // Zielkoordinate X
  targetY: number; // Zielkoordinate Y
  x: number; // aktuelle X-Position
  y: number; // aktuelle Y-Position
  radius: number; // aktueller Radius
  targetRadius: number; // Zielradius
  isActive: boolean; // Aktiv-Flag
  delay: number; // Startverzoegerung
}

// Komponente, die die Partikel aufs Canvas zeichnet
const AssembleEffect: React.FC<AssembleEffectProps> = ({ text, rect, font, padding, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Referenz auf das Canvas

  useEffect(() => { // Startet die Partikelanimation
    const config = { startRadius: 60, easeFactor: 0.07, targetRadius: 1.0 }; // Grundeinstellungen fuer Partikel
    const canvas = canvasRef.current!; // Aktuelles Canvas abrufen
    const ctx = canvas.getContext('2d')!; // 2D-Kontext sichern
    const particles: Particle[] = []; // Partikelliste initialisieren

    ctx.font = font; // Schrift auf Canvas einstellen
    const fontMetrics = ctx.measureText(text); // Textmetrik ermitteln
    const baselineY = padding + fontMetrics.actualBoundingBoxAscent; // Y-Position fuer baseline bestimmen
    ctx.fillText(text, padding, baselineY); // Text auf Canvas platzieren

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data; // Bilddaten auslesen

    for (let y = 0; y < canvas.height; y++) { // Zeilen des Canvas durchlaufen
      for (let x = 0; x < canvas.width; x++) { // Spalten des Canvas durchlaufen
        if (imageData[(y * canvas.width + x) * 4 + 3] > 128) { // Pixel mit Deckkraft finden
          const randomAngle = Math.random() * Math.PI * 2; // Startwinkel zufaellig waehlen
          const randomDist = Math.random() * config.startRadius; // Startentfernung bestimmen
          particles.push({ // Partikel erzeugen
            targetX: x, targetY: y, // Zielkoordinaten
            x: x + Math.cos(randomAngle) * randomDist, // Startkoordinate X
            y: y + Math.sin(randomAngle) * randomDist, // Startkoordinate Y
            radius: 0, targetRadius: config.targetRadius, // Start- und Zielradius
            isActive: false, // Aktiv-Status
            delay: Math.random() * 12, // Verzögerung bis zum Start
          });
        }
      }
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas leeren

    let animationFrameId: number; // ID des Animationsframes
    let frameCount = 0; // Anzahl der Frames

    function animate() { // Animationsschleife
      let allAssembled = true; // Flag fuer fertig animierte Partikel
      animationFrameId = requestAnimationFrame(animate); // Naechsten Frame anfordern
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas loeschen

      const startPos = frameCount * 8; // Steuerung des Aktivierungsbereichs

      for (const p of particles) { // Alle Partikel durchgehen
        if (!p.isActive && p.targetX < startPos + padding) p.isActive = true; // Startbedingung pruefen
        if (p.isActive && p.delay > 0) p.delay--; // Countdown fuer Delay

        if (p.isActive && p.delay <= 0) { // Nur aktive Partikel animieren
          p.x += (p.targetX - p.x) * config.easeFactor; // Richtung X angleichen
          p.y += (p.targetY - p.y) * config.easeFactor; // Richtung Y angleichen
          p.radius += (p.targetRadius - p.radius) * config.easeFactor; // Radius angleichen

          if (Math.hypot(p.targetX - p.x, p.targetY - p.y) > 0.05 || p.radius < p.targetRadius - 0.05) {
            allAssembled = false; // Noch nicht vollstaendig
          }

          ctx.beginPath(); // Pfad starten
          ctx.arc(p.x, p.y, Math.max(0, p.radius), 0, Math.PI * 2); // Kreis zeichnen
          ctx.fillStyle = '#FFF'; // Farbe setzen
          ctx.fill(); // Kreis fuellen
        } else if (!p.isActive) {
          allAssembled = false; // Noch auf Aktivierung wartend
        }
      }
      frameCount++; // Frame hochzaehlen

      if (allAssembled) { // Alle Partikel am Ziel?
        cancelAnimationFrame(animationFrameId); // Animation stoppen
        onComplete(); // Callback ausfuehren
      }
    }
    animate(); // Animation starten
    return () => cancelAnimationFrame(animationFrameId); // Aufraeumen bei Unmount
  }, [text, rect, font, padding, onComplete]); // Abhaengigkeiten der Animation

  // Canvas wird absolut positioniert
  return (
    <canvas
      ref={canvasRef} // Referenz setzen
      width={rect.width + padding * 2} // Breite inklusive Padding
      height={rect.height + padding * 2} // Hoehe inklusive Padding
      className="pointer-events-none absolute transition-opacity duration-[400ms]" // Stylingklassen
      style={{ top: rect.top - padding, left: rect.left - padding }} // Positionierung ueber Props
    />
  );
};

// Hauptkomponente, die den Text und das Canvas synchronisiert
export const ParticleIntro: React.FC<ParticleIntroProps> = ({
  text,
  font,
  padding,
  holdDuration = 100,
  fadeDuration = 400,
}) => {
  const [rect, setRect] = useState<DOMRect | null>(null); // gemessene BoundingBox
  const [phase, setPhase] = useState<'preparing' | 'animating' | 'fading'>('preparing'); // aktueller Ablaufstatus
  const headlineRef = useRef<HTMLHeadingElement | null>(null); // Referenz auf das H1 Element

  useLayoutEffect(() => { // Nach Layout wird die Groesse gemessen
    if (headlineRef.current && phase === 'preparing') { // Nur in der Startphase
      setRect(headlineRef.current.getBoundingClientRect()); // BoundingBox speichern
    }
  }, [phase]); // nur reagieren wenn sich die Phase aendert

  useEffect(() => { // Startet die Animation
    if (rect && phase === 'preparing') { // Wenn das Messen abgeschlossen ist
      const timer = setTimeout(() => setPhase('animating'), 300); // kurze Pause vor Start
      return () => clearTimeout(timer); // Timer bereinigen
    }
  }, [rect, phase]); // Abhaengigkeiten des Effekts

  const handleAnimationComplete = useCallback(() => { // Callback nach Animation
    setTimeout(() => setPhase('fading'), holdDuration); // Nach Haltezeit ausblenden
  }, [holdDuration]);

  const headlineStyle = { color: phase === 'fading' ? '#FFFFFF' : 'transparent' }; // Textfarbe steuern
  const canvasOpacity = { opacity: phase === 'fading' ? 0 : 1 }; // Sichtbarkeit Canvas steuern

  return (
    <div className="relative inline-block"> {/* Wrapper zur Positionierung */}
      <h1
        ref={headlineRef} // Referenz fuer Messung
        className="text-[80px] font-bold tracking-[0.02em] m-0 p-0 whitespace-nowrap transition-colors" // Headline-Stil
        style={{ fontFamily: font, transitionDuration: `${fadeDuration}ms`, ...headlineStyle }} // Dynamische Styles
      >
        {text} {/* Sichtbarer Text */}
      </h1>

      {phase === 'animating' && rect && (
        <AssembleEffect
          text={text} // Text fuer die Partikel
          rect={rect} // Position und Groesse
          font={font} // Schrift fuer das Canvas
          padding={padding} // Innenabstand des Canvas
          onComplete={handleAnimationComplete} // Meldung nach Ende
        />
      )}

      {phase === 'fading' && rect && (
        <canvas
          className="pointer-events-none absolute transition-opacity" // Fade-Canvas
          style={{
            ...canvasOpacity, // Transparenz steuern
            top: rect.top - padding, // Position Y
            left: rect.left - padding, // Position X
            transitionDuration: `${fadeDuration}ms`, // Dauer des Fades
          }}
          width={rect.width + padding * 2} // Breite inklusive Padding
          height={rect.height + padding * 2} // Hoehe inklusive Padding
          ref={(node) => {
            if (node) { // Wenn Canvas bereit ist
              const ctx = node.getContext('2d')!; // Kontext holen
              ctx.clearRect(0, 0, node.width, node.height); // Canvas leeren
              ctx.font = font; // Schrift setzen
              const metrics = ctx.measureText(text); // Textmetrik bestimmen
              const baselineY = padding + metrics.actualBoundingBoxAscent; // Baseline berechnen
              ctx.fillText(text, padding, baselineY); // Endtext zeichnen
            }
          }}
        />
      )}
    </div>
  );
};
