import {
    Box3,
    Object3D,
    Raycaster,
    Vector3,
    type Vector3Like,
} from 'three/webgpu';
import { PRODUCT_LAYER_MASK } from '../../constants/VisibilityLayerMask.ts';

import { DIVEMovable } from '../../interfaces/Movable.ts';
import { DIVESelectable } from '../../interfaces/Selectable.ts';
import { type TransformControls } from 'three/examples/jsm/controls/TransformControls.ts';
import { type DIVEEntityEventMap } from '../../types/events/index.ts';
import {
    contributedBy,
    type DIVEComponent,
    type DIVEComponentClass,
} from '../component/Component.ts';
import { findSceneRecursive } from '../../helpers/findSceneRecursive/findSceneRecursive.ts';
import { computeProductBounds } from '../../helpers/computeProductBounds/computeProductBounds.ts';
import { type DIVEScene } from '../../engine/scene/Scene.ts';

/**
 * A node in the scene tree.
 *
 * Nodes carry the transform and the identity; everything they *do* comes from
 * the components attached to them. `children` holds both -- it has to, because
 * three builds its render list from the scene graph -- so use `nodes` for the
 * logical child tree and `components` for the attached capabilities.
 *
 * @module
 */
export class DIVENode
    extends Object3D<DIVEEntityEventMap>
    implements DIVESelectable, DIVEMovable
{
    readonly isSelectable: true = true;
    readonly isMovable: true = true;
    readonly isDIVENode: true = true;

    public gizmo: TransformControls | null = null;

    protected _positionWorldBuffer: Vector3;
    protected _boundingBox: Box3;

    private _components: DIVEComponent[] = [];

    /** The scene this node belongs to, cached so it survives detachment. */
    private _scene: DIVEScene | null = null;

    /**
     * The components attached to this node.
     */
    public get components(): readonly DIVEComponent[] {
        return this._components;
    }

    /**
     * The child nodes of this node -- the logical scene tree.
     *
     * Filters `children` by `isDIVENode`, which excludes components as well as
     * raw geometry a component happens to own. Uncached on purpose: direct
     * `children` assignment bypasses three's events, so a cache would be able
     * to go stale, and the list is short enough that filtering costs nothing.
     */
    public get nodes(): DIVENode[] {
        return this.children.filter(
            (child) => 'isDIVENode' in child,
        ) as unknown as DIVENode[];
    }

    constructor() {
        super();

        this.layers.mask = PRODUCT_LAYER_MASK;

        this._positionWorldBuffer = new Vector3();
        this._boundingBox = new Box3();

        this.addEventListener('added', () => this._handleAddedToTree());
        this.addEventListener('removed', () => this._handleRemovedFromTree());
    }

    /**
     * Attaches a component to this node.
     *
     * Uses `add`, never `attach`: a component has no meaningful transform of its
     * own, and `attach` would apply an inverse world matrix to it.
     *
     * @param component - The component to attach.
     * @returns The component, for chaining.
     */
    public addComponent<T extends DIVEComponent>(component: T): T {
        // `isAttached` first: `owner` throws while a component has none, and a
        // fresh one is the ordinary case here.
        if (component.isAttached) {
            if (component.owner === this) return component;

            // Stealing is explicit now. `Object3D.add` did it for us by calling
            // `removeFromParent`, and a component is no longer a child.
            component.owner.removeComponent(component);
        }

        this._components.push(component);
        component._attach(this);
        this.refreshComponentTick(component);

        return component;
    }

    /**
     * Detaches a component from this node.
     *
     * @param component - The component to detach.
     */
    public removeComponent(component: DIVEComponent): this {
        const index = this._components.indexOf(component);
        if (index === -1) return this;

        this._components.splice(index, 1);
        component._detach();
        this._scene?.withdrawComponent(component);

        return this;
    }

    /**
     * Finds the first attached component of the given type.
     *
     * Matches with `instanceof`, so a base class finds its subclasses -- asking
     * for `MeshComponent` also returns a `PrimitiveComponent`, and asking
     * for an abstract base such as `DIVELightComponent` works too.
     *
     * @param Ctor - The component class to look for.
     */
    public getComponent<T extends DIVEComponent>(
        Ctor: DIVEComponentClass<T>,
    ): T | undefined {
        return this._components.find(
            (component) => component instanceof Ctor,
        ) as T | undefined;
    }

    /**
     * Finds every attached component of the given type.
     *
     * @param Ctor - The component class to look for.
     */
    public getComponents<T extends DIVEComponent>(
        Ctor: DIVEComponentClass<T>,
    ): T[] {
        return this._components.filter(
            (component) => component instanceof Ctor,
        ) as T[];
    }

    /**
     * Like {@link getComponent}, but throws when the component is missing.
     *
     * Use this wherever a component is part of the node's contract -- a model
     * node always has mesh geometry, a light node always has a light. Throwing
     * once beats threading an `undefined` through every caller.
     *
     * @param Ctor - The component class to look for.
     */
    public requireComponent<T extends DIVEComponent>(
        Ctor: DIVEComponentClass<T>,
    ): T {
        const component = this.getComponent(Ctor);
        if (!component) {
            throw new Error(
                `${this.constructor.name} ("${this.name}") has no ${Ctor.name} attached.`,
            );
        }
        return component;
    }

    /**
     * Removes all child nodes and raw children, keeping what components own.
     *
     * `Object3D.clear()` would take the contributions with it, which would
     * silently strip a node of its geometry or its light. A component gives up
     * its own content through `withdraw`, never through the node.
     */
    public clear(): this {
        const detachable = this.children.filter(
            (child) => !('isDIVEComponent' in child) && !contributedBy(child),
        );
        this.remove(...detachable);
        return this;
    }

    /**
     * Copies another node, its components included.
     *
     * Child nodes are cloned, contributed content is not: a component brings its
     * own along, and cloning it here as well would leave the copy with ownerless
     * geometry beside a component that knows nothing about it.
     *
     * **Replaces the components this node already has, disposing them.** A node
     * that attaches components in its constructor -- `DIVERoot` and its floor --
     * would otherwise end up with two of each, and the ones being replaced hold
     * GPU resources that nobody else will ever release. Unexpected for a copy
     * operation, hence spelled out here.
     *
     * @param source - The node to copy from.
     * @param recursive - Whether to copy children.
     */
    public copy(source: this, recursive: boolean = true): this {
        super.copy(source, false);

        [...this._components].forEach((component) => {
            this.removeComponent(component);
            component.dispose();
        });
        source.components.forEach((component) =>
            this.addComponent(component.clone()),
        );

        if (recursive) {
            source.children
                .filter((child) => !contributedBy(child))
                .forEach((child) => this.add(child.clone()));
        }

        return this;
    }

    /**
     * Re-evaluates whether a component should be ticking.
     *
     * @param component - The component whose tick state changed.
     * @internal
     */
    public refreshComponentTick(component: DIVEComponent): void {
        if (!this._scene) return;

        if (component.tick && component.tickEnabled) {
            this._scene.enlistComponent(component);
        } else {
            this._scene.withdrawComponent(component);
        }
    }

    public setPosition(position: Vector3Like): void {
        if (this._writeTransform({ position })) this.onMove();
    }

    public setRotation(rotation: Vector3Like): void {
        if (this._writeTransform({ rotation })) this.onMove();
    }

    public setScale(scale: Vector3Like): void {
        if (this._writeTransform({ scale })) this.onMove();
    }

    /**
     * Writes a transform **without reporting it for this node**.
     *
     * For a caller that announces the change itself: the state's apply path
     * writes a whole patch and its action announces it once. Going through
     * `setPosition`, `setRotation` and `setScale` there meant three reports for
     * one patch, on top of the action's own — which is what this exists to avoid.
     *
     * Members are still woken, because nothing else tells them: their own
     * transform did not change, but their world transform did, and no caller
     * knows about them.
     *
     * @param patch - The parts of the transform to write. Anything absent is left
     * alone.
     */
    public applyTransform(patch: {
        position?: Vector3Like | null;
        rotation?: Vector3Like | null;
        scale?: Vector3Like | null;
    }): void {
        if (this._writeTransform(patch)) this._reportMembers();
    }

    /**
     * Reports this node's transform, and its members' new world transforms.
     *
     * One event for every kind of move, so a listener never has to ask what
     * caused it: a gizmo drag and a `setPosition` both arrive as
     * `object-transform`.
     *
     * Can be called when the object is moved from a foreign object (gizmo,
     * parent, etc.) to update the object's position.
     */
    public onMove(): void {
        this.dispatchEvent({
            type: 'object-transform',
            position: this.getWorldPosition(this._positionWorldBuffer),
            rotation: this.rotation,
            scale: this.scale,
        });

        this._reportMembers();
    }

    /**
     * Writes whatever the patch carries, guarded field by field.
     *
     * @returns Whether anything actually changed. Nothing reports otherwise, so
     * a patch that repeats the current transform stays silent.
     */
    private _writeTransform(patch: {
        position?: Vector3Like | null;
        rotation?: Vector3Like | null;
        scale?: Vector3Like | null;
    }): boolean {
        let changed = false;

        const { position, rotation, scale } = patch;

        if (position !== undefined && position !== null) {
            // if there is no parent, the object will be attached later and keep it's world position
            if (!this.parent) {
                this.position.set(position.x, position.y, position.z);
                // Not a change to report: without a parent there is no world
                // position yet, and attaching will produce the real one.
            } else {
                // if we have a parent, we have to calculate the position in the parent's coordinate system to keep the world position
                const target = this.parent.worldToLocal(
                    new Vector3(position.x, position.y, position.z),
                );

                // A tolerance rather than `equals`, because the target came
                // through a matrix: an unchanged world position does not map back
                // to a bit-identical local one.
                if (this.position.distanceToSquared(target) >= 1e-12) {
                    this.position.copy(target);
                    changed = true;
                }
            }
        }

        // Exact, unlike the position: these are written straight through with no
        // matrix in between.
        if (rotation !== undefined && rotation !== null) {
            if (
                this.rotation.x !== rotation.x ||
                this.rotation.y !== rotation.y ||
                this.rotation.z !== rotation.z
            ) {
                this.rotation.set(rotation.x, rotation.y, rotation.z);
                changed = true;
            }
        }

        if (scale !== undefined && scale !== null) {
            if (
                this.scale.x !== scale.x ||
                this.scale.y !== scale.y ||
                this.scale.z !== scale.z
            ) {
                this.scale.set(scale.x, scale.y, scale.z);
                changed = true;
            }
        }

        return changed;
    }

    /**
     * Has every member report its new world transform, recursively.
     *
     * Members are reached through their own `onMove`, so a nested group carries
     * on down its own members.
     */
    private _reportMembers(): void {
        this.nodes.forEach((node) => node.onMove());
    }

    /**
     * Rests this node on the highest surface below it, and never below the
     * ground plane.
     *
     * The floor is deliberately not a raycast target: it is a flat plane at
     * y = 0, so "hit the floor" and "hit nothing" produce the same answer. The
     * clamp to y = 0 covers the remaining case, geometry parked below the floor,
     * which must not drag this node underground.
     */
    public dropIt(): void {
        if (!this.parent) {
            console.warn(
                'DIVENode: dropIt() called on a node that is not in the scene.',
                this,
            );
            return;
        }

        const scene = findSceneRecursive(this);
        if (!scene) return;

        this.updateWorldMatrix(true, true);

        const worldPos = this.getWorldPosition(this._positionWorldBuffer);
        const oldWorldPosY = worldPos.y;

        const box = computeProductBounds(this);
        if (box.isEmpty()) return;

        // cast down from the bottom centre, which keeps this node's own geometry
        // out of the results
        const bottomCenter = box.getCenter(new Vector3());
        bottomCenter.y = box.min.y;

        const raycaster = new Raycaster(bottomCenter, new Vector3(0, -1, 0));
        raycaster.layers.mask = PRODUCT_LAYER_MASK;
        const intersections = raycaster.intersectObjects(
            scene.root.children,
            true,
        );

        const hitY =
            intersections.length > 0
                ? computeProductBounds(intersections[0].object).max.y
                : 0;

        const restY = Math.max(hitY, 0);
        const delta = restY - box.min.y;

        // skip any action when delta is too small
        if (Math.abs(delta) < 1e-9) return;

        worldPos.y += delta;

        // skip any action when the position did not change
        if (worldPos.y === oldWorldPosY) return;

        // setPosition reports the move itself now
        this.setPosition(worldPos);
    }

    public setVisibility(visible: boolean): void {
        this.visible = visible;
    }

    public setToWorldOrigin(): void {
        this.position.set(0, 0, 0);
        this.onMove();
    }

    public onSelect(): void {
        this.dispatchEvent({ type: 'object-select' });
    }

    public onDeselect(): void {
        this.dispatchEvent({ type: 'object-deselect' });
    }

    private _handleAddedToTree(): void {
        const scene = findSceneRecursive(this);
        if (!scene) return;

        // three dispatches `added` only on the object that was added, not on its
        // descendants, so a pre-built subtree arrives as a single event.
        this.traverse((object) => {
            if (!('isDIVENode' in object)) return;
            (object as unknown as DIVENode)._attachToScene(scene);
        });
    }

    private _handleRemovedFromTree(): void {
        this.traverse((object) => {
            if (!('isDIVENode' in object)) return;
            (object as unknown as DIVENode)._detachFromScene();
        });
    }

    private _attachToScene(scene: DIVEScene): void {
        this._scene = scene;
        this._components.forEach((component) =>
            this.refreshComponentTick(component),
        );
    }

    private _detachFromScene(): void {
        const scene = this._scene;
        if (!scene) return;

        this._components.forEach((component) =>
            scene.withdrawComponent(component),
        );
        this._scene = null;
    }
}
