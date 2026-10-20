# 05 Docs and AGENTS.md

Status: ready-for-agent
Blocked by: 03, 04

Spec: `SPEC.md` (this folder). ADR 0001, `GLOSSARY.md`.

## What to build

- Rewrite `docs/environment.md` around the three concepts: image based light, background, dome. The dome section shows `GroundProjectionComponent` on a node of the caller's own, keeping the experimental note.
- The QuickView README shows the scene setters instead of `renderer.environment`.
- Root README: update any environment/background mentions.
- `AGENTS.md`: replace the "Planned (ADR 0001)" entry with current facts, and drop or rewrite entries the change made stale (the environment ground projection entries, restore logic).
