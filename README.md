# System Hero Particles

A Vite-powered React/TypeScript demo where particles gather to form the **System Hero** title. The animation relies on an inverted wave function and runs in the browser.

## Setup

```bash
npm install
npm run dev
```

The goal is described in `docs/codex_goal_animation.md` where particles move "von außen nach innen" and shape the text "System Hero" at startup.

## Notes

As highlighted in `docs/codex_animation_prompt.md`, avoid automatic test or build commands:
- `.codex.lock` must not be present
- do not run `npm test` or `npm build`
- use `npm run dev` (or `npm start` if defined)
