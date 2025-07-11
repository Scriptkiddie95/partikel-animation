#!/bin/bash
set -e

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

if [ ! -f "$PROJECT_DIR/package.json" ]; then
  echo "❌ package.json nicht gefunden unter: $PROJECT_DIR"
  exit 1
fi

cd "$PROJECT_DIR"

echo "📦 Installiere npm-Abhängigkeiten..."
npm install

echo "➕ Installiere three.js..."
npm install three

echo "🚀 Starte Vite-Dev-Server..."

# Öffne Browser nur wenn auf Desktop-System
if command -v xdg-open >/dev/null 2>&1; then
  nohup npm run dev &>/dev/null &
  sleep 2
  xdg-open http://localhost:5173/
elif command -v open >/dev/null 2>&1; then
  nohup npm run dev &>/dev/null &
  sleep 2
  open http://localhost:5173/
else
  npm run dev
fi
