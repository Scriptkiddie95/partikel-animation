// @ts-expect-error -- demo script, Node types not included
import { writeFileSync } from 'node:fs'

const files = {
  'src/ParticleText.tsx': `// <-- pack hier deinen ParticleText Code rein`,
  'src/M1guelDisintegrate.tsx': `// <-- pack hier den m1guel Code rein`,
  'src/App.tsx': `// <-- pack hier den App-Code rein`,
};

for (const [file, content] of Object.entries(files)) {
  writeFileSync(file, content);
  console.log('Created', file);
}
