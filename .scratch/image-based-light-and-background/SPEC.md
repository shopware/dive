# Separate image based light, background and dome

Status: ready-for-agent

See ADR 0001 and `GLOSSARY.md` for the terms used here.

## Problem Statement

A developer integrating DIVE gets lighting and background from a single unit, the environment. That unit lives on the renderer, but it writes into the scene. The background can only be the lighting image, and only through a flag. Showing it on a dome takes a second flag that does nothing without the first.

So the developer cannot:
- light a product with a studio HDR and show a different panorama behind it
- use a JPG or EXR panorama as a background
- put a dome into a scene without going through the environment

Every rotation step rebakes the whole lighting, so a rotation slider stutters. A saved state keeps only the background colour, and loading it loses the lighting and any image background.

Inside DIVE, two owners write `scene.background`: the scene's colour and the environment. Restore logic keeps them from overwriting each other, and every new way of showing a background has to fit through it.

## Solution

Image based light, background and dome become three independent things:

- The **image based light** is a scene setting. It has an image, a rotation and an intensity, or it is turned off. Without any setting the scene is lit by the bundled default HDR, as today.
- The **background** is a scene setting with three forms: none (transparent), a colour, or an equirectangular image at infinity with its own rotation. It extends the background setting that exists today instead of adding a new one.
- The **dome** is only the existing ground projection component on a node of the caller's own, with its own image. The environment no longer knows about it.

Changing the rotation or intensity of the light or the background no longer rebakes anything. Only a new light image does. The state stores and restores both the light and the background.

Existing integrations keep working unchanged: the old environment API and the background colour setting stay as deprecated paths that produce exactly the old result until the next major release.

## User Stories

1. As a developer, I want to set the image based light from a URL, so that my product is lit by an HDR of my choice.
2. As a developer, I want to set the image based light from a texture I loaded myself, so that I control loading, caching and reuse.
3. As a developer, I want the scene to be lit by the bundled default HDR when I configure nothing, so that PBR materials do not render black out of the box.
4. As a developer, I want to turn the image based light off, so that only my explicit light entities light the scene.
5. As a developer, I want to rotate the image based light, so that its highlights fall where I want them on the product.
6. As a developer, I want rotating the image based light to be cheap, so that I can drive it from a slider or an animation without stutter.
7. As a developer, I want to change the intensity of the image based light, so that I can balance it against the scene's other lights.
8. As a developer, I want changing the intensity to be cheap, so that I can adjust it live.
9. As a developer, I want setting the image based light to return a promise that resolves once the image is loaded, so that I know when it is safe to proceed.
10. As a developer, I want overlapping calls to set the image based light to end with the last one, so that a slow earlier load never overwrites a newer choice.
11. As a developer, I want images that a newer call replaced to be freed, so that switching HDRs repeatedly does not leak GPU memory.
12. As a developer, I want `.hdr`, `.exr`, `.jpg`, `.png` and `.webp` images to work for the image based light, so that I am not limited to Radiance HDR files.
13. As a developer, I want a transparent background, so that the page behind the canvas shows through.
14. As a developer, I want a coloured background, so that the product sits in front of a plain colour.
15. As a developer, I want an equirectangular image as the background, so that the product appears inside a panorama.
16. As a developer, I want the background image to be independent of the lighting image, so that I can light with a studio HDR and show a different panorama.
17. As a developer, I want to use the same HDR for both light and background by loading it once and passing the texture to both, so that it is neither downloaded nor decoded twice.
18. As a developer, I want to rotate the background image independently of the light, so that I can frame the panorama separately.
19. As a developer, I want rotating the background image to be cheap, so that I can drive it interactively.
20. As a developer, I want JPG, PNG, WebP, HDR and EXR panoramas to work as backgrounds, so that I can use common photo panoramas.
21. As a developer, I want a texture I pass in to be borrowed and never disposed by DIVE, so that I can keep using it elsewhere.
22. As a developer, I want images that DIVE loaded from a URL to be freed when they are replaced or the scene is disposed, so that I do not have to manage their lifetime.
23. As a developer, I want the initial image based light and background to be settable through the DIVE settings, so that the first frame already looks right.
24. As a developer, I want the background setting to accept a colour, an image or nothing, so that I configure every background form in one place.
25. As a developer, I want a dome to be a component I put on my own node, so that I can position it and give it any panorama.
26. As a developer, I want a dome to work without any background setting, so that the dome and the background do not depend on each other.
27. As an editor user, I want a saved state to contain the image based light (URL, rotation, intensity, or off), so that reopening a scene restores its lighting.
28. As an editor user, I want a saved state to contain the background (none, colour, or image URL with rotation), so that reopening a scene restores what is behind the product.
29. As an editor developer, I want a state action to set the image based light, so that lighting changes go through the same action pipeline as everything else.
30. As an editor developer, I want the existing set-background action to accept every background form, so that I do not need a second action for images.
31. As an editor developer, I want settings made with a texture to be exported as no setting, so that a saved state never claims to restore something it cannot.
32. As an existing integrator, I want `renderer.environment.setImageUrl` to keep working, so that upgrading to the minor release breaks nothing.
33. As an existing integrator, I want `renderer.environment.setRotationY` to keep rotating both the light and an image background, as it does today, so that upgrading changes nothing visible.
34. As an existing integrator, I want `renderer.environment.setUseAsBackground(true)` to keep showing the lighting image as the background, so that my current setup looks the same.
35. As an existing integrator, I want the `backgroundColor` setting and the state's `backgroundColor` field to keep working, so that code reading or writing them does not break.
36. As an existing integrator, I want deprecation notes on the old paths that name the replacement, so that I know where to migrate.
37. As an existing integrator using the experimental ground projection setting, I want the docs to show how to build the same thing with the component, so that I can migrate even though the setting is removed.
38. As a QuickView user, I want the QuickView documentation to show the new scene setters, so that I know how to configure lighting and background on a QuickView.
39. As a developer, I want the image based light and the background to be stable APIs, so that I can rely on them without watching for breaking changes.
40. As a DIVE maintainer, I want DIVE to own `scene.background` and `scene.environment` exclusively, so that there is no restore logic between competing writers.
41. As a DIVE maintainer, I want the scene to hold only the description and the renderer to do the baking, so that the scene never needs to know about a renderer.

## Implementation Decisions

- **Image based light on the scene.** The scene gets a setter for the image based light. It takes an object with an image (URL or texture), a rotation in radians and an intensity, or `null` for off. Fields left out keep their current value. The DIVE settings get an `imageBasedLight` entry of the same shape, with the bundled default HDR as the default image.
- **Background on the scene.** The existing background setter is widened to a union: a colour, an image object (URL or texture, plus rotation), or `null` for transparent. Transparent is its own form, not a colour value, because it is rendered as clear alpha. The DIVE settings get a `background` entry. The existing `backgroundColor` setting is deprecated. If both are given, `background` wins.
- **Ownership.** DIVE owns `scene.background` and `scene.environment` exclusively. The current restore logic (remembering a foreign background and putting it back) is removed.
- **Loading.** The scene loads URLs itself, choosing the loader by file extension: HDR loader for `.hdr`, EXR loader for `.exr`, the texture loader with sRGB colour space for everything else. The promise of a setter resolves once the image is loaded and recorded in the description, not once it is baked. Overlapping calls follow "last one wins", and images loaded for calls that were overtaken are disposed. There is no cache between the light and the background.
- **Texture ownership.** What the scene loaded from a URL is owned and disposed on replace and on scene dispose. A texture passed in is borrowed and never disposed. This matches the rule the dome component already follows.
- **Baking.** The renderer reads the scene's image based light description in its tick, before rendering, and bakes (cube capture and PMREM) only when the image has changed since the last bake. Several changes within one frame produce one bake. The baking code is a private helper of the renderer and is not exported.
- **Rotation and intensity without rebake.** Light rotation and intensity map to three's scene environment rotation and environment intensity. Background rotation maps to the scene background rotation. All three are evaluated per frame by the node material system.
- **Background image without cube capture.** An image background is put on the scene as an equirectangular texture directly. Today's capture mirrors the sky along Z, and the dome geometry is mirrored to match it. Orientation and brightness must be checked visually against the old output and against the dome when this changes.
- **Dome.** The dome is only the existing ground projection component. The environment's `groundProjection` setting and `setGroundProjection` are removed without a replacement, because they are experimental. The component, its settings and its layer mask are unchanged and stay experimental.
- **Deprecated facade.** The old environment class stays, under its existing name and as the renderer's `environment` property, but only forwards to the scene setters:
  - setting the image URL sets the image based light image (`null` means the default HDR)
  - setting the rotation rotates the light and, if the background is an image, the background as well
  - turning "use as background" on sets an image background with the current light image and rotation, and turning it off sets the background back to the colour configured before
  - `init` and `dispose` keep their contracts
  - renderer replacement on a canvas swap still works

  Everything on it is marked deprecated in favour of the scene setters.
- **State schema.** The state data gets an `imageBasedLight` field (URL, rotation, intensity, or `null`) and a `background` field (`null`, a colour string, or an image URL with rotation). A setting made with a texture is exported as `null`. `backgroundColor` stays in the state data as a deprecated mirror: the colour when the background is a colour, otherwise `'transparent'`. When loading, `background` wins over `backgroundColor`.
- **State actions.** The existing set-background action accepts the background union. A new action sets the image based light. Both go through the gateway's single scene-settings entrypoint, as the background does today.
- **Docs.** The environment docs are rewritten around the three concepts. The QuickView README shows the scene setters. The ground projection section shows the component on a node of the caller's own.
- **Unchanged:** views and renderers (one renderer per view, as today), `forceWebGL`, the XR light root, QuickView's settings.

## Testing Decisions

- A good test drives the public API and checks what is visible from outside: the scene's `environment`, `background`, environment rotation and intensity, background rotation, how often a bake happens, which textures get disposed, and what the state exports. Tests do not reach into the private baking helper or into internal fields.
- **Main seam: scene and renderer together.** Tests call the scene setters, then the renderer's tick, and check the outcome. Mocks sit only at the module boundary: the WebGPU renderer and PMREM generator from `three/webgpu`, and the HDR, EXR and texture loaders. Cases:
  - the default HDR applies
  - `null` turns the light off
  - rotation and intensity change without a rebake
  - a new image rebakes once
  - several changes in one frame bake once
  - the last overlapping call wins and the stale image is disposed
  - a borrowed texture is never disposed
  - all three background forms render as intended
  - scene dispose frees owned images
  - the extension picks the loader

  This replaces most of the existing environment test suite; the restore-logic tests are deleted, not ported. Prior art: the existing scene, renderer and environment test suites.
- **State seam: the gateway against a real scene.** Apply settings, then read the state back:
  - both fields round-trip
  - a texture setting exports as `null`
  - the deprecated `backgroundColor` mirror is filled correctly
  - `background` wins over `backgroundColor`

  Action tests stay thin with a mocked gateway and only check what is passed on. Prior art: the gateway tests and the set-background action test.
- **Facade seam: through the main seam.** Calling the deprecated environment methods produces the same scene state and render properties as before. The tests check the result, not that forwarding happens.
- No new tests for the dome component beyond removing its coupling to the environment.
- Focused coverage runs use `vitest --coverage.include=<path>`, as noted in `AGENTS.md`.

## Out of Scope

- One renderer per scene, multiple views, moving the camera from the renderer to the view.
- Removing `forceWebGL` or any WebGPU/WebGL backend decision.
- A flat screen-filling 2D background image, gradients, video backgrounds. They come later as additional background forms.
- An event that reports when a bake has finished.
- QuickView settings for the image based light, the background or a dome.
- XR light estimation and any override of the image based light during an XR session.
- A shared texture cache between light and background.
- Making the dome stable.
- Removing the deprecated paths. That happens in the next major release.

## Further Notes

- The demo's HDR route is marked ready once the image is loaded. The bake follows one frame later, which is accepted.
- The visual check of orientation and brightness after dropping the cube capture for backgrounds is a required step, not optional. The dome's Z mirroring may need adjusting to stay aligned with the light.
- Update `AGENTS.md` with the new facts once this is implemented, replacing the "planned" entry for ADR 0001.
