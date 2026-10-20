# 02 Background union on the scene

Status: done
Blocked by: 01

Spec: `SPEC.md` (this folder). ADR 0001, `GLOSSARY.md`.

## What to build

Widen the existing scene background setter to: a colour, an image (URL or texture, plus rotation), or `null` for transparent.

- Image backgrounds go on the scene as an equirectangular texture directly (no cube capture); rotation via three's scene background rotation. Reuse the loading helper from ticket 01, same ownership and last-call-wins rules.
- Transparent is its own form, rendered as clear alpha.
- New `background` entry in the DIVE settings; `backgroundColor` is deprecated (TSDoc naming the replacement) and loses to `background` when both are given.
- A read accessor for the current background description (state needs it in ticket 04).
- Today's environment may still write `scene.background` while "use as background" is on; ticket 03 removes that. Keep its suite green.

## Acceptance criteria

- [ ] Tests at the scene's public API cover all three forms, rotation without reload, last call wins, owned vs borrowed disposal, settings precedence.
- [ ] Existing suites stay green; `yarn build` clean.
