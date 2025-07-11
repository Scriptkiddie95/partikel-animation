
This project contains a React-based prototype for the **System Hero** landing page.
Particles gather from the surrounding space and assemble into text using an inverted wave equation.
Background on this idea and current challenges can be found in
[docs/codex_project_overview.md](docs/codex_project_overview.md#L30-L67).

## Key Modules

The planned modular structure includes:

- `engine/` – particle algorithms (`ParticlesEngine.ts`, `wave.runtime.ts`)
- `canvas/` – React components running the engine
- `agents/` – control files such as `canvas.agent.md`
- `prompts/` – text prompts for generating particle positions
- `overlays/` – debug helpers like `canvas.debugOverlay.agent.md`
- `math/` – math utilities
- `cli/` – setup helpers (`codex.setup.cli.ts`)

See the `docs/` folder for more details.

## Running the Animation

To try the prototype locally, install dependencies and launch the Vite dev server:

```bash
npm install
npm run dev
```

After the server starts, open the provided URL in your browser. The hero text animation begins automatically as soon as the page loads.


## License

This project is licensed under the [MIT License](LICENSE).

