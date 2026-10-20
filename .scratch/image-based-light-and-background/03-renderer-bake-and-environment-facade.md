# 03 Renderer bakes from the scene; environment becomes a facade

Status: done
Blocked by: 01, 02

Spec: `SPEC.md` (this folder). ADR 0001, `GLOSSARY.md`.

## What to build

- In its tick, before rendering, the renderer reads the scene's image based light and bakes (cube capture + PMREM) only when the image changed since its last bake. Several changes within one frame produce one bake. `null` clears `scene.environment`. Rotation and intensity map to the scene's environment rotation and intensity, with no rebake. The baking code is a private, unexported helper of the renderer. Canvas swaps (renderer replacement) still work.
- DIVE owns `scene.background` / `scene.environment` exclusively: the restore logic (`originalBackground` / `installedBackground`) goes.
- The existing environment class keeps its name and stays reachable as the renderer's `environment`, but only forwards (everything marked deprecated):
  - image URL → light image
  - rotation → light, and the background too if it is an image
  - use-as-background on → image background with the current light image and rotation; off → back to the colour configured before
  - `init`/`dispose` keep their contracts
- Remove `groundProjection` / `setGroundProjection` from the environment settings and API. `GroundProjectionComponent` stays as is.

## Acceptance criteria

- [ ] Tests through scene + renderer (mocking only `three/webgpu` and the loaders) cover: default HDR baked, `null` clears, rotation/intensity without rebake, new image rebakes once, several changes per frame bake once, canvas swap.
- [ ] Facade tests check the outcome (scene state, render properties), not the forwarding itself.
- [ ] The restore-logic and ground-projection tests in the environment suite are deleted, not ported.
- [ ] Existing suites stay green; `yarn build` clean.
