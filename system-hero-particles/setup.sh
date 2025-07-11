#!/bin/bash

# Codex Setup: System Hero Particles
# Installiert alle Abhängigkeiten und startet den Dev-Server im richtigen Verzeichnis

set -e

# 🔍 Finde das echte Projektverzeichnis (dynamisch über Pfadname)
PROJECT_DIR=$(find /tmp /workspace /root /home -type d -name 'system-hero-particles' 2>/dev/null | head -n 1)

if [ ! -d "$PROJECT_DIR" ]; then
  echo "❌ Konnte system-hero-particles nicht finden. Setup abgebrochen."
  exit 1
fi

cd "$PROJECT_DIR"

# 🛆 Abhängigkeiten installieren
echo "🛆 Installiere npm-Pakete..."
npm install

# 🧱 three.js sicherstellen (für TextGeometry etc.)
echo "➕ Installiere three.js (inkl. examples)..."
npm install three

# 🚀 Dev-Server starten
echo "🚀 Starte Vite Development Server..."
npm run dev
