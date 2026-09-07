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

## Where a component's content lives

A component is **not** in the scene graph. What it owns is.

`Renderer._projectObject` walks the whole scene graph **every frame** to rebuild
the render list — `children` *is* the render queue, and there is no persistent
queue to register into. So a mesh, a light or a camera has to be in `children` to
be drawn. It goes into the **node's** children, through `contribute`:

```ts
protected onAttach(): void { /* nothing to do -- contribute did it */ }

constructor() {
    super();
    this._mesh = new Mesh(geometry, material);
    this.contribute(this._mesh);   // lands in the node, now or on attach
}
```

The component itself stays out, and that is not a detail: `GLTFExporter`
writes a node for every graph object it walks, and has no skip for empty ones. A
component in the graph therefore cost **one extra level per component, per save**
— and on reload that level became content of a *new* component, so a saved scene
grew a level every time it went round. `exportscene` hands over the whole scene
root, so it was every entity at once.

The tree stays readable through the API rather than through the array:

| You want | Use |
|---|---|
| the logical child tree | `node.nodes` |
| the attached capabilities | `node.components` |
| what a component put there | `component.contributions` |
| which component owns an object | `componentOf(object)` |
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

Two rules, each with a reason:

1. **Contribute your content, do not parent it.** `contribute` puts objects into
   the owner's children, takes them along when the component moves to another
   node, and removes them when it is detached. `withdraw` takes them back —
   `ModelComponent` does that on every reload, which is how loading an asset
   replaces exactly its own content and leaves the node's child nodes and the
   other components' content alone.

   Anything needing an internal offset carries it on the object contributed — a
   directional light's direction lives on the light, which is a property of the
   light rather than a placement. A component has no transform of its own to
   offer.

2. **Never attach another component.** Composing a node is the caller's job; see
   the section below.

Constructors take no arguments: `clone()` calls `new this.constructor()` and then
`copy(source)`. A component holding state overrides `copy` — a clone that
silently drops the geometry descriptor or the intensity factor looks like it
worked.

Two rules died when components left the graph, and it is worth knowing why they
were there:

- *Never declare a capability brand.* `findInterface` walks up from a raycast hit
  looking for `isSelectable` and friends, and a component in that chain carrying
  one would have been handed back instead of the node. It is not in the chain any
  more. **What a component contributes still is**, so a brand on a contributed
  mesh would still cut the search short.
- *Position the node, not the component.* There is no component transform left to
  position.

## Ticking

Components that implement `tick(deltaTime)` are driven by `DIVEScene`, which is
itself a `DIVETicker` on the engine clock. The scene keeps a **flat array of only
the components that actually tick** — nothing walks the tree per frame, and a
component without a `tick` method is never visited.

Enrolment happens when a node joins a tree that reaches the scene, and is undone
when it leaves; `addComponent` and `removeComponent` do the bookkeeping, since a
component is not a child and three's events no longer speak for it. This mirrors both engines: Unity enrols a `MonoBehaviour` when
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
the component contributed; that is the sanctioned escape hatch, and `DIVEGrid`
uses it to follow the camera.

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

- `layers` gates only the object it is set on, never a subtree. Set the mask on
  the leaf meshes you contribute; a component has no mask of its own that could
  stand in for them, and no `visible` either — hide what you contributed.
- `Raycaster` checks `layers` but **never `visible`**. Layers, not visibility, are
  the picking contract.

## Looking components up

```ts
node.getComponent(MeshComponent);       // first match, or undefined
node.getComponents(DIVELightComponent); // every match
node.requireComponent(MeshComponent);   // throws if missing

findComponent(mesh, MeshComponent);     // from content back to its component
componentOf(mesh);                      // whichever component contributed it
```

`findComponent` is the way back in from something a component owns — an
`OrbitController` hands out its camera, and `setCameraLayer` lives on the
camera's component. It walks up from the object, asking the contribution registry
at each step, because a component owns its content without parenting it and so is
never an ancestor of it.

Matching is by `instanceof`, so a base class finds its subclasses. That is what
lets one code path serve both models and primitives (`PrimitiveComponent
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
