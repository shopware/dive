# Component system

A DIVE scene is a tree of **nodes**. A node carries a transform and an identity;
everything it *does* comes from the **components** attached to it. This is the
model Unity and Unreal use, and it is what replaced the class-per-entity design
of DIVE 3.

```ts
import { DIVENode, MeshComponent, PointLightComponent } from '@shopware-ag/dive';

const model = new DIVENode();
model.addComponent(new MeshComponent());
await model.requireComponent(MeshComponent).setFromURL('chair.glb');
dive.scene.root.add(model);

const lamp = new DIVENode();
lamp.addComponent(new PointLightComponent());
lamp.setPosition({ x: 0, y: 2, z: 0 });
dive.scene.root.add(lamp);
```

## Why components live in `children`

A component **is** an `Object3D` and sits in its owner's `children`. That is
deliberate, and it is forced by three's internals rather than chosen for
convenience:

- `Renderer._projectObject` walks the whole scene graph **every frame** to rebuild
  the render list. There is no persistent queue to register into — `children`
  *is* the render queue.
- `object.onBeforeRender` fires inside `_renderObjectDirect`, i.e. *after* that
  list has been built, so it cannot be used to inject anything for that frame.

So the alternative — adding components to `children` before each render and
removing them after — would need a second full traversal plus `add`/`remove`
churn per frame, and buy nothing.

Instead, the tree stays readable through the API rather than through the array:

| You want | Use |
|---|---|
| the logical child tree | `node.nodes` |
| the attached capabilities | `node.components` |
| everything three renders | `node.children` |

## Writing a component

```ts
import { DIVEComponent, type DIVENode } from '@shopware-ag/dive';

export class SpinComponent extends DIVEComponent {
    private _speed = 1;

    public tick(deltaTime: number): void {
        this.owner?.rotateY(this._speed * deltaTime);
    }

    protected onAttach(owner: DIVENode): void { /* … */ }
    protected onDetach(previousOwner: DIVENode): void { /* … */ }
    public dispose(): void { /* release geometry, materials, textures */ }
}
```

Four rules, each with a reason:

1. **Constructors take no arguments.** `Object3D.clone()` calls
   `new this.constructor()`, so a required parameter makes cloning throw.
   Configure through setters (`setTarget`, `setGeometry`, …) after attaching.

2. **Position the node, not the component.** A component sits at its owner's
   transform; its local matrix is identity and `matrixAutoUpdate` is off as a
   performance default. Anything needing an internal offset puts it on its own
   children — a directional light's direction, for instance, which is a property
   of the light rather than a placement. A component that genuinely wants its own
   transform sets `matrixAutoUpdate = true` itself.

3. **Never declare a capability brand.** No `isSelectable`, `isMovable`,
   `isHoverable` or `isDraggable` — not even set to `false`. `findInterface`
   walks up from a raycast hit looking for those brands, and a component carrying
   one would be handed back as the owner instead of the node behind it.

4. **Own your content.** Put geometry and helpers in the *component's* children,
   not the node's. `MeshComponent.setFromGLTF` calls `clear()` on itself, which
   is why loading an asset no longer wipes the node's other components.

## Ticking

Components that implement `tick(deltaTime)` are driven by `DIVEScene`, which is
itself a `DIVETicker` on the engine clock. The scene keeps a **flat array of only
the components that actually tick** — nothing walks the tree per frame, and a
component without a `tick` method is never visited.

Enrolment happens when a node joins a tree that reaches the scene, and is undone
when it leaves. This mirrors both engines: Unity enrols a `MonoBehaviour` when
the script defines `Update`, Unreal registers an `FTickFunction` when
`bCanEverTick` is set. Here, the presence of the method is the declaration.

Unreal's second flag has an equivalent too:

```ts
component.setTickEnabled(false); // withdraw entirely, cost drops to zero
```

Use it for work that only happens sometimes — an animation that finished, a
helper that only recomputes while something is being dragged. Calling it from
inside your own `tick` is expected and safe.

**Need the camera?** `tick` has no view context. Put an `onBeforeRender` on a mesh
the component owns; that is the sanctioned escape hatch, and `DIVEGrid` uses it
to follow the camera.

## A component never attaches another component

Composing a node is the *caller's* job. A component describes one capability and
must not decide what else its owner is made of — attaching a sibling from
`onAttach` breaks that contract and makes the node's component set depend on
attachment order.

If a component needs a sibling, the caller attaches both and hands one to the
other, or the caller drives both itself.

## What the engine does not know

The engine has nodes and components. It has no idea what a *group*, a *model* or
a *light* is — those are entity types, and entity types belong to the state
plugin. Anything shaped like "when X happens to this kind of entity, do Y"
belongs in `EngineGateway`, never in a component.

Group links are the worked example. A group node gets nothing but a
`MultiLineComponent`, which draws line segments and watches nothing. The gateway
holds all the group knowledge:

- `_setParent` adds a line when a member joins and removes it when it leaves
- the `object-transform` listener redraws the line when a member is dragged
- `_apply` redraws it when a patch writes a new position
- `bbVisible` in the group schema toggles the line component's visibility

So the drawing half is reusable for anything that needs many cheap lines —
measurement overlays, debug rays — and no component ever learns what a group is.

## Layers decide what geometry means

`src/constants/VisibilityLayerMask.ts` is the contract for "what is this
geometry for?", and every consumer reads it instead of special-casing classes:

| Layer | Meaning | Counts for bounds / export / picking |
|---|---|---|
| `PRODUCT` | real content | yes |
| `FLOOR` | the ground plane | no (renders, receives shadows) |
| `UI` | gizmo handles, light handles | no |
| `HELPER` | visualisations, group links | no |
| `COORDINATE` | orientation display | no |

Put your component's helper geometry on `HELPER` and its content on the owner's
layer. Two things to know:

- A component's own `layers.mask` does **not** hide its subtree; `layers` gates
  only the object itself. Set the mask on leaf meshes, or `component.visible = false`.
- `Raycaster` checks `layers` but **never `visible`**. Layers, not visibility, are
  the picking contract.

## Looking components up

```ts
node.getComponent(MeshComponent);      // first match, or undefined
node.getComponents(DIVELightComponent); // every match
node.requireComponent(MeshComponent);   // throws if missing
```

Matching is by `instanceof`, so a base class finds its subclasses. That is what
lets one code path serve both models and primitives (`PrimitiveMeshComponent
extends MeshComponent`), and what lets the state layer apply colour and intensity
to every light on a node without knowing which kinds are there — a scene light is
a node with a hemisphere *and* a directional component.

Prefer `requireComponent` wherever the component is part of the node's contract.
One throw beats threading an `undefined` through every caller.

## Components and the state plugin

Components do **not** appear in entity schemas. `entityType` already is the
"which component set" discriminant, and the state plugin's `EngineGateway`
composes the set. A `components: []` array in the schema would leak engine class
names into persisted scenes, making every rename a state migration, and it has no
sane merge semantics under `PartialSchema`'s "missing means unchanged" contract.

Consumer-written components are therefore an engine-level feature: attach them
directly to the nodes you build or look up through `gateway.findEntity`.
