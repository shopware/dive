# Component system

A DIVE scene is a tree of **nodes**. A node carries a transform and an identity;
everything it *does* comes from the **components** attached to it, which is what
replaced the class-per-entity design of DIVE 3.

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
the render list - `children` *is* the render queue, and there is no persistent
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

The component itself stays out, and that is not a detail: `GLTFExporter` writes a
node for every graph object it walks, and has no skip for empty ones. A component
in the graph would cost **one extra level per component, per save** - and on
reload that level becomes content of a *new* component, so the tree grows by a
level every time a scene goes round. `exportscene` hands over the whole scene
root, so that would be every entity at once.

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
   node, and removes them when it is detached. `withdraw` takes them back -
   `ModelComponent` does that on every reload, which is how loading an asset
   replaces exactly its own content and leaves the node's child nodes and the
   other components' content alone.

   Anything needing an internal offset carries it on the object contributed - a
   directional light's direction lives on the light, which is a property of the
   light rather than a placement.

2. **Never attach another component.** Contribute all the objects you like, but
   never call `owner.addComponent`. Composing a node is the caller's job - see
   the section below for what breaks.

   The line between the two is where the object comes from, not how much of it
   there is. `PointLightComponent` owns a light *and* a clickable proxy sphere,
   and contributes both:

   ```ts
   this.contribute(this._light, this._handle);   // content: yours to own
   ```

   What it must not do is decide that its node also needs bounds:

   ```ts
   protected onAttach(owner: DIVENode): void {
       owner.addComponent(new BoundsComponent());   // not yours to decide
   }
   ```

Constructors take no arguments: `clone()` calls `new this.constructor()` and then
`copy(source)`. A component holding state overrides `copy` - a clone that
silently drops the geometry descriptor or the intensity factor looks like it
worked.

Two things a component does not have, both worth knowing before writing one:

- **No transform.** Placement belongs to the node, and an internal offset belongs
  to the object contributed. There is nothing on the component to position.
- **No place in the `.parent` chain** - but what it contributes has one, and
  `findInterface` walks that chain up from a raycast hit looking for
  `isSelectable` and friends, stopping at the first match. A capability brand on
  a contributed mesh therefore gets the *mesh* handed back instead of the node
  behind it. Contribute plain objects and let the node carry the brands.

## Ticking

Components that implement `tick(deltaTime)` are driven by `DIVEScene`, which is
itself a `DIVETicker` on the engine clock. The scene keeps a **flat array of only
the components that actually tick** - nothing walks the tree per frame, and a
component without a `tick` method is never visited.

Enrolment happens when a node joins a tree that reaches the scene, and is undone
when it leaves; `addComponent` and `removeComponent` do the bookkeeping, because
a component is not a child and three's `childadded`/`childremoved` never fire for
one. The presence of the method is the whole declaration - there is no flag to
set and no base call to remember.

Enrolment is one question, participation another:

```ts
component.setTickEnabled(false); // withdraw entirely, cost drops to zero
```

Use it for work that only happens sometimes - an animation that finished, a
helper that only recomputes while something is being dragged. Calling it from
inside your own `tick` is expected and safe.

**Need the camera?** `tick` has no view context. Put an `onBeforeRender` on a mesh
the component contributed; that is the sanctioned escape hatch, and `DIVEGrid`
uses it to follow the camera.

## A component never attaches another component

A component describes one capability and does not decide what else its owner is
made of. Composing a node is the *caller's* job - `EngineGateway._instantiate`
does it for every entity type, and `DIVERoot` does it for itself by attaching a
`FloorComponent` in its own constructor. A node composing itself is the caller.

Three things break when a component attaches a sibling instead:

- **The attachment order starts to matter.** What `getComponent` finds depends on
  which component went on first, and attaching from inside `_attach` mutates
  `_components` while the caller is still working through it.
- **Removal stops being symmetric.** `removeComponent(model)` does not take the
  bounds the model attached, and nothing records whose they were. Same separation
  as `withdraw`, which unparents without disposing: ownership and lifetime are
  not the same question.
- **Cloning doubles.** `DIVENode.copy` clones the source's components, so a
  component that attaches another on attach gives the copy two of them - one
  cloned, one freshly attached.

Underneath all three is the point the next section makes: "a model needs bounds"
is knowledge about an entity type, and entity types live in the state plugin.

If a component needs a sibling, the caller attaches both and hands one to the
other, or the caller drives both itself.

## What the engine does not know

The engine has nodes and components. It has no idea what a *group*, a *model* or
a *light* is - those are entity types, and entity types belong to the state
plugin. Anything shaped like "when X happens to this kind of entity, do Y"
belongs in `EngineGateway`, never in a component.

Group links are the worked example. A group node gets nothing but a
`MultiLineComponent`, which draws line segments and watches nothing. The gateway
holds all the group knowledge:

- `_setParent` adds a line when a member joins and removes it when it leaves
- the `object-transform` listener redraws the line when a member is dragged
- `_apply` redraws it when a patch writes a new position
- `bbVisible` in the group schema toggles the line component's visibility

So the drawing half is reusable for anything that needs many cheap lines -
measurement overlays, debug rays - and no component ever learns what a group is.

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
  stand in for them, and no `visible` either - hide what you contributed.
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

`findComponent` is the way back in from something a component owns - an
`OrbitController` hands out its camera, and `setCameraLayer` lives on the
camera's component. It walks up from the object, asking the contribution registry
at each step, because a component owns its content without parenting it and so is
never an ancestor of it.

Matching is by `instanceof`, so a base class finds its subclasses. That is what
lets one code path serve both models and primitives (`PrimitiveComponent
extends MeshComponent`), and what lets the state layer apply colour and intensity
to every light on a node without knowing which kinds are there - a scene light is
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
