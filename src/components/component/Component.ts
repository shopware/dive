import { EventDispatcher, type Object3D } from 'three/webgpu';
import { type DIVENode } from '../node/Node.ts';
import { type DIVEComponentEventMap } from '../../types/events/DIVEComponentEventMap.ts';

/**
 * Base class for everything that gives a node a capability: geometry, a light,
 * a label, a helper visualisation, per-frame behaviour.
 *
 * A component is **not** part of the scene graph. What it owns is: three rebuilds
 * its render list by walking the graph every single frame, so a mesh or a light
 * has to be in `children` to be drawn -- but it goes into the *node's* children,
 * through {@link contribute}. The component itself stays out, because an exporter
 * writes a node for everything it walks, so a component in the graph would cost
 * one level per component per save.
 *
 * The two rules worth knowing before writing one:
 *
 * 1. **Contribute your content, do not parent it.** `contribute` puts objects
 *    into the owner's children and takes them along when the component moves;
 *    `withdraw` takes them back. Anything that needs an internal offset carries
 *    it on the object contributed -- a directional light's direction lives on the
 *    light. A component has no transform of its own to offer.
 * 2. **Never attach another component.** Contribute all the objects you like --
 *    `PointLightComponent` contributes a light and a clickable proxy sphere --
 *    but never call `owner.addComponent`. A component describes one capability
 *    and does not decide what else its owner is made of; composing a node is the
 *    caller's job. A component that needs a sibling should be handed it, or the
 *    caller should attach both.
 *
 * Constructors take no arguments: {@link clone} calls `new this.constructor()`.
 * Configure through setters instead.
 *
 * An `EventDispatcher`, so a component reports what happens to it on itself. A
 * detached one can speak too, which is why nothing here guards a report with
 * {@link isAttached}: whether an event fires says something about the event, never
 * about the delivery route.
 *
 * A component is not in the `.parent` chain, but what it contributes is, and
 * `findInterface` walks that chain up from a raycast hit looking for
 * `isSelectable` and friends. A capability brand on a contributed mesh therefore
 * gets the mesh handed back instead of the node behind it. Contribute plain
 * objects and let the node carry the brands.
 *
 * @module
 */
export abstract class DIVEComponent extends EventDispatcher<DIVEComponentEventMap> {
    readonly isDIVEComponent: true = true;

    /** For debugging: nothing reads it, since components are not in the graph. */
    public name: string = '';

    /**
     * The node this component is attached to.
     *
     * Throws while the component is detached, rather than handing out a `null`
     * that every consumer has to rule out. A non-nullable owner is not available
     * to us: {@link clone} builds a component before there is any node to put it
     * on, so a detached one has to be constructible, and detached is therefore a
     * real state rather than an impossible one.
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
     * Only meaningful for components that implement {@link tick}. Enrolment and
     * participation are separate questions: whether a component can ever tick is
     * decided by the method existing, while this decides whether it does right
     * now, so one that only works some of the time can withdraw entirely instead
     * of being called every frame to return immediately.
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

    /**
     * Called by {@link DIVENode.addComponent}. Not for anyone else.
     *
     * three's `added`/`removed` events used to drive this, which caught every way
     * into the graph -- `add`, `attach`, `clear`, re-parenting. A component is no
     * longer in the graph, so the node is now the only way in, and that is what
     * makes this reliable rather than what makes it fragile.
     *
     * @internal
     */
    public _attach(owner: DIVENode): void {
        this._owner = owner;

        /**
         * content first, so a subclass that forgets super in onAttach cannot
         * leave it out of the scene
         */
        this._adopt(owner);

        this.onAttach(owner);
    }

    /**
     * Called by {@link DIVENode.removeComponent}. Not for anyone else.
     *
     * @internal
     */
    public _detach(): void {
        const previousOwner = this._owner;
        if (!previousOwner) return;

        // hook first, the mirror of _attach, so onDetach still finds its content
        this.onDetach(previousOwner);

        previousOwner.remove(...this._contributed);

        this._owner = null;
    }

    /**
     * A component of the same kind, configured the same way.
     *
     * Calls `new this.constructor()`, which is why constructors take no
     * arguments, and hands over to {@link copy}.
     */
    public clone(): this {
        const Ctor = this.constructor as new () => this;
        return new Ctor().copy(this);
    }

    /**
     * Takes on another component's configuration.
     *
     * The base copies the name and nothing else. A component holding state --
     * a geometry descriptor, a material, an intensity factor -- overrides this
     * and copies it, because a clone that silently drops it looks like it worked.
     *
     * Never copies contributions: the clone builds or loads its own.
     *
     * @param source - The component to copy from.
     */
    public copy(source: this): this {
        this.name = source.name;
        return this;
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
export function contributedBy(object: Object3D): DIVEComponent | undefined {
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
export function isDIVEComponent(object: unknown): object is DIVEComponent {
    return (
        typeof object === 'object' &&
        object !== null &&
        'isDIVEComponent' in object
    );
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
 * Walks up from `object`, asking at each step which component contributed it --
 * a component owns its content but does not parent it, so it is not an ancestor.
 * Going up as well as asking means this still finds a component from something
 * nested deep inside what it contributed.
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

        // ask the registry, since a component is not an ancestor of what it owns
        const contributor = contributors.get(current);
        if (contributor instanceof Ctor) return contributor;

        current = current.parent;
    }
    return undefined;
}
