# 04 State: image based light and background

Status: ready-for-agent
Blocked by: 01, 02

Spec: `SPEC.md` (this folder). ADR 0001, `GLOSSARY.md`.

## What to build

- State data gets `imageBasedLight` (URL, rotation, intensity, or `null`) and `background` (`null`, a colour string, or an image URL with rotation). A texture-based setting exports as `null`.
- `backgroundColor` stays as a deprecated mirror: the colour when the background is a colour, otherwise `'transparent'`. On load, `background` wins over `backgroundColor`.
- The set-background action accepts the background union. A new action sets the image based light. Both go through the gateway's single scene-settings entrypoint.

## Acceptance criteria

- [ ] Gateway tests against a real scene: both fields round-trip, a texture exports as `null`, the mirror is right, precedence on load.
- [ ] Action tests stay thin with a mocked gateway.
- [ ] Existing suites stay green; `yarn build` clean.
