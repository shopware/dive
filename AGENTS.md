# AGENTS.md

## Learned User Preferences

- Always respond in the language the user is writing in
- Always update this `AGENTS.md` with new insights after code changes (workspace facts, patterns, preferences)
- Always write `AGENTS.md` content in English

## Learned Workspace Facts

- Monorepo using yarn as package manager
- Testing framework: vitest with coverage via `yarn coverage`
- Three.js is globally mocked via `__mocks__/three.ts` and `vitest.setup.ts` (`vi.mock('three')`)
- When a test file provides its own `vi.mock('three', factory)`, it overrides the global mock entirely (the `__mocks__/three.ts` is not used)
- Plugins live in `src/plugins/<name>/` and are auto-discovered by looking for `index.ts` in subdirectories
- Plugins are exported as subpath exports: `@shopware-ag/dive/<plugin-name>` (e.g. `@shopware-ag/dive/shader`, `@shopware-ag/dive/state`)
- The shader plugin (`src/plugins/shader/`) exports `DIVEShaderMaterial` (extends three.js `ShaderMaterial`) and `DIVEShaderLib`
- `DIVEGrid` component uses the shader plugin; it is imported transitively via `Scene` → `Grid` → `@shopware-ag/dive/shader`
