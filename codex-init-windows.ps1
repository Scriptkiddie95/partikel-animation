# codex-init-windows.ps1 – Lokales Setup ohne Pfadfehler

$projectDir = "$PSScriptRoot"

if (-Not (Test-Path "$projectDir\package.json")) {
    Write-Error "❌ package.json nicht gefunden unter: $projectDir"
    exit 1
}

Set-Location -Path $projectDir

Write-Host "Installiere npm-Abhängigkeiten..."
npm install

Write-Host "Installiere three.js..."
npm install three

Write-Host "Starte Vite-Dev-Server und öffne Browser..."

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd `"$projectDir`"; npm run dev" | Out-Null

Start-Sleep -Seconds 2
Start-Process "http://localhost:5173/"
