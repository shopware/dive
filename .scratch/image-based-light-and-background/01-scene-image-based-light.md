# 01 Image based light description on the scene

Status: done
Blocked by: none

Spec: `SPEC.md` (this folder). ADR 0001, `GLOSSARY.md`.

## What to build

The scene holds the image based light description and loads its image. No baking yet: today's environment keeps lighting the scene until ticket 03.

- Scene setter for the image based light: image (URL or texture), rotation, intensity, or `null` for off. Fields left out keep their value. Returns a promise that resolves once the image is loaded and recorded.
- A read accessor for the current description (the renderer reads it in ticket 03).
- An `imageBasedLight` entry in the DIVE settings, defaulting to the bundled default HDR.
- Loading by extension: `.hdr` → HDR loader, `.exr` → EXR loader, everything else → texture loader in sRGB. Put this in a small loading helper that ticket 02 reuses.
- Last overlapping call wins, overtaken loads are disposed. URL images are owned (disposed on replace and on scene dispose), passed textures are borrowed.
- Something the renderer can use to tell that the image changed since it last looked (e.g. a change counter). Rotation/intensity changes must not count as an image change.

## Acceptance criteria

- [ ] Tests at the scene's public API cover: default image, `null`, partial updates, last call wins with stale disposal, borrowed texture never disposed, owned image disposed on replace and on scene dispose, loader picked by extension, image-change signal unaffected by rotation/intensity.
- [ ] Existing suites stay green; `yarn build` clean (check `vite-plugin-dts` output, not just the exit code).
