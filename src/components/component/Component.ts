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
 *
 * @module
 */
export abstract class DIVEComponent extends Object3D {
    readonly isDIVEComponent: true = true;

    /**
     * The node this component is attached to, or `null` while detached.
     */
    public get owner(): DIVENode | null {
        return this._owner;
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

    /**
     * Implement to react when a child node of the owner is moved, rotated or
     * scaled through its setters.
     *
     * Lets a component track its owner's children -- drawing links to them, for
     * instance -- without those children knowing the component exists.
     *
     * @param node - The child node whose transform changed.
     */
    public onChildNodeTransform?(node: DIVENode): void;

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
     * Releases GPU resources held by this component.
     *
     * Subclasses owning geometries, materials or textures must override this.
     */
    public dispose(): void {}

    private _handleAdded(): void {
        const parent = this.parent;
        if (!parent || !('isDIVENode' in parent)) return;

        this._owner = parent as unknown as DIVENode;
        this.onAttach(this._owner);
    }

    private _handleRemoved(): void {
        const previousOwner = this._owner;
        if (!previousOwner) return;

        this._owner = null;
        this.onDetach(previousOwner);
    }
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
