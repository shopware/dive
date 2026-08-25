import { Object3D } from 'three/webgpu';
import { type DIVENode } from '../node/Node.ts';

/**
 * Base class for everything that gives a node a capability: geometry, a light,
 * a label, a helper visualisation, per-frame behaviour.
 *
 * A component *is* an `Object3D` and lives in its owner's `children`. That is
 * deliberate and load-bearing: three rebuilds its render list by walking the
 * scene graph every single frame, so being in `children` is the only way to be
 * rendered, and it costs nothing beyond one matrix multiply. The logical scene
 * tree stays readable through `DIVENode.nodes`, which reports child nodes only.
 *
 * Three rules worth knowing before writing one:
 *
 * 1. **Position the node, not the component.** A component sits at its owner's
 *    transform, so its local matrix is identity and `matrixAutoUpdate` is off
 *    as a performance default. Anything that genuinely needs an internal offset
 *    puts it on its own children -- a directional light's direction, say. A
 *    component that really wants its own transform sets `matrixAutoUpdate`
 *    back to `true` itself.
 * 2. **Never declare a capability brand.** No `isSelectable`, not even as
 *    `false`: `findInterface` walks up from a raycast hit looking for those
 *    brands, and a component carrying one would be handed back as the owner
 *    instead of the node behind it.
 * 3. **Constructors take no arguments.** `Object3D.clone()` calls
 *    `new this.constructor()`, so a required parameter makes cloning throw.
 *    Configure through setters after attaching.
 * 4. **Never attach another component.** A component describes one capability
 *    and does not decide what else its owner is made of; composing a node is the
 *    caller's job. A component that needs a sibling should be handed it, or the
 *    caller should attach both.
 *
 * @module
 */
export abstract class DIVEComponent extends Object3D {
    readonly isDIVEComponent: true = true;

    /**
     * The node this component is attached to.
     *
     * Throws while the component is detached, rather than handing out a `null`
     * that every consumer has to rule out. This is Unreal's `check(GetOwner())`:
     * there, too, a component can exist before it is registered, and code that
     * needs the owner asserts instead of branching. Unity's route -- a
     * non-nullable `Component.gameObject`, because `new MonoBehaviour()` is
     * forbidden and `AddComponent` is the only way in -- is closed to us by rule
     * 3 above: cloning needs a constructor that takes nothing, so a detached
     * component has to be constructible.
     *
     * Ask {@link isAttached} when a detached component is a case to handle rather
     * than a mistake.
     */
    public get owner(): DIVENode {
        if (!this._owner) {
            throw new Error(
                `${this.constructor.name} is not attached to a node. Add it to one with DIVENode.addComponent before using it.`,
            );
        }

        return this._owner;
    }

    /**
     * What this component put into its owner's children.
     *
     * A component owns renderables -- a mesh, a light, a camera, a helper -- but
     * they belong in the *node's* children, not in its own. `children` is three's
     * render queue, so the content has to be in the graph; the component holding
     * it does not, and an exporter writes every graph node it walks. One level
     * per component per save is what that costs.
     *
     * Contribute through {@link contribute}, take back through {@link withdraw}.
     * Both work whether or not the component is attached: while it has no owner
     * this is a list and nothing more, and everything on it is added the moment
     * one arrives.
     */
    public get contributions(): readonly Object3D[] {
        return this._contributed;
    }
    private _contributed: Object3D[] = [];

    /**
     * Whether this component is attached to a node.
     */
    public get isAttached(): boolean {
        return this._owner !== null;
    }
    private _owner: DIVENode | null = null;

    /**
     * Whether this component currently participates in the per-frame tick.
     *
     * Only meaningful for components that implement {@link tick}. Mirrors
     * Unreal's split between "can ever tick" (here: does the method exist) and
     * "is ticking right now": a component that only works some of the time can
     * withdraw itself entirely instead of being called every frame to return
     * immediately.
     */
    public get tickEnabled(): boolean {
        return this._tickEnabled;
    }
    private _tickEnabled: boolean = true;

    /**
     * Implement to receive a per-frame callback.
     *
     * The mere presence of this method enrols the component; components without
     * it are never visited. Needs the camera? Put an `onBeforeRender` on the
     * meshes the component owns instead -- `tick` has no view context.
     *
     * @param deltaTime - Seconds since the previous frame.
     */
    public tick?(deltaTime: number): void;

    constructor() {
        super();

        // identity local matrix: skip the compose in updateMatrixWorld
        this.matrixAutoUpdate = false;

        // Self-managed rather than driven by DIVENode, so that every path into
        // the tree converges here -- add(), attach(), clear(), removeFromParent()
        // and re-parenting all end up dispatching these two events.
        this.addEventListener('added', () => this._handleAdded());
        this.addEventListener('removed', () => this._handleRemoved());
    }

    /**
     * Enables or disables this component's per-frame tick.
     *
     * @param enabled - Whether the component should tick.
     */
    public setTickEnabled(enabled: boolean): void {
        if (this._tickEnabled === enabled) return;

        this._tickEnabled = enabled;
        this._owner?.refreshComponentTick(this);
    }

    /**
     * Called once the component has been attached to a node.
     *
     * @param owner - The node it is now attached to.
     */
    protected onAttach(owner: DIVENode): void {
        void owner;
    }

    /**
     * Called after the component has been detached from a node.
     *
     * Takes the previous owner explicitly because three clears `parent` before
     * dispatching `removed`, so `this.owner` is already `null` by this point.
     *
     * @param previousOwner - The node it was attached to.
     */
    protected onDetach(previousOwner: DIVENode): void {
        void previousOwner;
    }

    /**
     * Puts objects into the owner's children, and remembers them.
     *
     * Safe to call from a constructor: with no owner yet this only records them,
     * and {@link contributions} is applied as soon as one arrives. Safe to call
     * twice with the same object -- the second time is ignored rather than
     * producing a duplicate, which would send a spurious `childremoved` /
     * `childadded` pair through the owner.
     *
     * @param objects - What this component contributes to its owner.
     */
    protected contribute(...objects: Object3D[]): void {
        const added = objects.filter(
            (object) => !this._contributed.includes(object),
        );
        if (added.length === 0) return;

        added.forEach((object) => contributors.set(object, this));
        this._contributed.push(...added);

        if (this._owner) this._owner.add(...added);
    }

    /**
     * Takes objects back out of the owner's children.
     *
     * Only unparents them. Disposing is a separate concern: a component that is
     * merely moving to another node must not destroy what it carries.
     *
     * @param objects - What to take back. Anything not contributed is ignored.
     */
    protected withdraw(...objects: Object3D[]): void {
        objects.forEach((object) => {
            const index = this._contributed.indexOf(object);
            if (index === -1) return;

            this._contributed.splice(index, 1);
            contributors.delete(object);
            object.removeFromParent();
        });
    }

    /**
     * Releases GPU resources held by this component.
     *
     * Subclasses owning geometries, materials or textures must override this.
     */
    public dispose(): void {}

    /**
     * Hands the contributions to a new owner.
     *
     * Adds only what is not already there, so a stray direct assignment to
     * `node.children` cannot leave this out of step -- and so re-attaching a
     * component that never left is a no-op.
     */
    private _adopt(owner: DIVENode): void {
        const orphaned = this._contributed.filter(
            (object) => object.parent !== owner,
        );
        if (orphaned.length > 0) owner.add(...orphaned);
    }

    private _handleAdded(): void {
        const parent = this.parent;
        if (!parent || !('isDIVENode' in parent)) return;

        this._owner = parent as unknown as DIVENode;

        // Content first, hook second: `onAttach` is a hook subclasses override,
        // and one that forgot `super` would silently leave its content out of the
        // scene. Moving the contributions here makes that impossible -- and the
        // hook sees them already in place.
        this._adopt(this._owner);

        this.onAttach(this._owner);
    }

    private _handleRemoved(): void {
        const previousOwner = this._owner;
        if (!previousOwner) return;

        // Hook first, content second -- the mirror of _handleAdded, so `onDetach`
        // still finds its content where it was.
        this.onDetach(previousOwner);

        previousOwner.remove(...this._contributed);

        this._owner = null;
    }
}

/**
 * Which component put an object into a node's children.
 *
 * A `WeakMap` rather than a flag on the object: `Object3D.copy` sends `userData`
 * through `JSON.parse(JSON.stringify(...))`, and `GLTFExporter` writes it out as
 * `extras` -- a marker there would end up in exported files. This is invisible to
 * both, and it is what lets `DIVENode.clear` and `DIVENode.copy` tell contributed
 * content from real child nodes.
 */
const contributors = new WeakMap<Object3D, DIVEComponent>();

/**
 * The component that contributed `object`, if any.
 *
 * @param object - Something found in a node's children.
 */
export function componentOf(object: Object3D): DIVEComponent | undefined {
    return contributors.get(object);
}

/**
 * Any component class, for `instanceof` lookups.
 *
 * Uses `never[]` parameters so abstract bases that take constructor arguments
 * still match -- only the class identity matters here, never its signature.
 * Concrete components must still be zero-argument so `clone()` works.
 */
export type DIVEComponentClass<T extends DIVEComponent = DIVEComponent> =
    abstract new (...args: never[]) => T;

/**
 * Type guard for components, without importing the class.
 *
 * @param object - The object to test.
 */
export function isDIVEComponent(object: Object3D): object is DIVEComponent {
    return 'isDIVEComponent' in object;
}

/**
 * Walks **up** from an object to the component that contains it.
 *
 * The counterpart to `DIVENode.getComponent`, which looks at a node's own
 * components: this starts anywhere inside one and finds the component itself.
 * That is how a caller holding only what a component owns gets back to it -- an
 * `OrbitController` hands out its camera, and `setCameraLayer` lives on the
 * camera's component.
 *
 * Matches with `instanceof`, so an abstract base finds its subclasses.
 *
 * @param object - Where to start, typically something a component owns.
 * @param Ctor - The component class to look for.
 */
export function findComponent<T extends DIVEComponent>(
    object: Object3D,
    Ctor: DIVEComponentClass<T>,
): T | undefined {
    let current: Object3D | null = object;
    while (current) {
        if (current instanceof Ctor) return current;
        current = current.parent;
    }
    return undefined;
}
