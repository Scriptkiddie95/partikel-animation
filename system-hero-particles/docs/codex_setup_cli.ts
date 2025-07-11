

import fs from 'fs'
import path from 'path'

const FILES = [
  'math_map.md',
  'textflow.prompt.md',
  'json.rules',
  'wave.controller.agent.md',
  'wave.runtime.ts',
  'canvas.agent.md',
  'canvas.debugOverlay.agent.md',
  'particles.engine.ts'
]

const CONTENT_MAP: Record<string, string> = {
  'math_map.md': '# Siehe math_map.md Inhalt (via Codex generiert)',
  'textflow.prompt.md': '# Siehe textflow.prompt.md Inhalt (via Codex generiert)',
  'json.rules': '// Siehe json.rules (via Codex generiert)',
  'wave.controller.agent.md': '# Siehe wave.controller.agent.md Inhalt (via Codex generiert)',
  'wave.runtime.ts': '// Siehe wave.runtime.ts Inhalt (via Codex generiert)',
  'canvas.agent.md': '# Siehe canvas.agent.md Inhalt (via Codex generiert)',
  'canvas.debugOverlay.agent.md': '# Siehe canvas.debugOverlay.agent.md Inhalt (via Codex generiert)',
  'particles.engine.ts': '// Siehe particles.engine.ts Inhalt (via Codex generiert)'
}

const BASE_PATH = path.resolve(__dirname, 'codex-particles-system')

function createFile(name: string, content: string) {
  const filePath = path.join(BASE_PATH, name)
  fs.writeFileSync(filePath, content, { encoding: 'utf-8' })
  console.log(`✅ ${name} erstellt.`)
}

function initCodexProject() {
  if (!fs.existsSync(BASE_PATH)) fs.mkdirSync(BASE_PATH)

  FILES.forEach((file) => {
    const content = CONTENT_MAP[file] || ''
    createFile(file, content)
  })

  console.log('\n🚀 Codex CLI Setup abgeschlossen: Partikelstruktur initialisiert.')
  console.log(`📁 Pfad: ${BASE_PATH}`)
}

initCodexProject()
