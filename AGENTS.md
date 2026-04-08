# AGENTS.md

## Learned User Preferences

- Always respond in the language the user is writing in
- Always update this `AGENTS.md` with new insights after code changes (workspace facts, patterns, preferences)
- Always write `AGENTS.md` content in English

## Learned Workspace Facts

- Monorepo using yarn as package manager
- Testing framework: vitest with coverage via `yarn coverage`
- Global Vitest setup mocks were removed; tests now mock dependencies locally per file
- Shared test mock modules like `src/test/mocks/three.ts` and `src/test/mocks/three-spritetext.ts` were removed; tests should inline only the mocks they actually need
- Old global-mock cleanup can leave behind no-op local shims like `vi.mock('three', () => importActual('three'))`; remove them when a test does not override Three behavior
- After the WebGPU import migration, tests must mock `three/webgpu` when the production module imports from `three/webgpu`; mocking `three` does not affect those modules
- `TransformTool` must add and traverse `TransformControls.getHelper()`, not the `TransformControls` instance itself, because current Three typings and runtime treat the control as non-`Object3D`
- Local mocks for `three/examples/jsm/*` should use the exact runtime specifier including the `.js` suffix when the source import does
- `ARQuickLook` tests must mock `@shopware-ag/dive/assetloader` and `@shopware-ag/dive/assetexporter` in addition to `AssetConverter`, because `new AssetLoader()` and `new AssetExporter()` are evaluated before the mocked `AssetConverter` constructor runs
- `DIVEGizmo` tests should mock child gizmo classes as real `Object3D` instances with spied methods to avoid `THREE.Object3D.add` warnings from plain-object stand-ins
- `DIVEPrimitive` tests are more stable with real `Box3` plus per-test spies on `Box3.prototype`/`Raycaster`, instead of mocking the full `three` module surface
- `OrientationDisplayAxes` tests should locally stub `three-spritetext` because jsdom does not implement the canvas text context that the real package needs
- `DIVERoot` should detach both legacy scene-level `TransformControls` objects and modern `TransformControlsRoot.controls` helper roots when cleaning up transform controls
- `DIVERoot` POV update/delete coverage requires manually seeding a matching `Object3D` in tests because `addSceneObject` intentionally skips creating POV scene nodes
- Plugins live in `src/plugins/<name>/` and are auto-discovered by looking for `index.ts` in subdirectories
- Plugins are exported as subpath exports: `@shopware-ag/dive/<plugin-name>` (e.g. `@shopware-ag/dive/shader`, `@shopware-ag/dive/state`)
- The shader plugin (`src/plugins/shader/`) exports `DIVEShaderMaterial` (extends three.js `ShaderMaterial`) and `DIVEShaderLib`
- `DIVEGrid` component uses the shader plugin; it is imported transitively via `Scene` → `Grid` → `@shopware-ag/dive/shader`
- Demo fixture `/Users/f.frank/Public/Repos/dive-demo/public/model_reverse_animation_order_long_name_blank_name.glb` is used for animation edge cases; it contains a blank clip name, an overlong clip name, and a `Walk` clip that now hard-fails loading via an invalid animation accessor reference
