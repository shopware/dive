import { Box3, Object3D, Vector3, type Vector3Like } from 'three/webgpu';
import { PRODUCT_LAYER_MASK } from '../../constants/VisibilityLayerMask.ts';

import { DIVEMovable } from '../../interfaces/Movable.ts';
import { DIVESelectable } from '../../interfaces/Selectable.ts';
import { type TransformControls } from 'three/examples/jsm/controls/TransformControls.ts';
import { type DIVEEntityEventMap } from '../../types/events/index.ts';
import { type DIVEGroup } from '../group/Group.ts';
import {
    type DIVEComponent,
    type DIVEComponentClass,
} from '../component/Component.ts';
import { findSceneRecursive } from '../../helpers/findSceneRecursive/findSceneRecursive.ts';
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

        // The component registry is maintained from three's own events rather
        // than from addComponent/removeComponent, so that clear(), attach(),
        // removeFromParent() and re-parenting cannot desync it.
        this.addEventListener('childadded', (event) =>
            this._handleChildAdded(event.child),
        );
        this.addEventListener('childremoved', (event) =>
            this._handleChildRemoved(event.child),
        );

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
        this.add(component);
        return component;
    }

    /**
     * Detaches a component from this node.
     *
     * @param component - The component to detach.
     */
    public removeComponent(component: DIVEComponent): this {
        this.remove(component);
        return this;
    }

    /**
     * Finds the first attached component of the given type.
     *
     * Matches with `instanceof`, so a base class finds its subclasses -- asking
     * for `MeshComponent` also returns a `PrimitiveMeshComponent`, and asking
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
     * Removes all child nodes and raw children, keeping components attached.
     *
     * `Object3D.clear()` would detach the components too, which would silently
     * strip a node of its geometry or its light.
     */
    public clear(): this {
        const detachable = this.children.filter(
            (child) => !('isDIVEComponent' in child),
        );
        this.remove(...detachable);
        return this;
    }

    /**
     * Copies another node, without duplicating components.
     *
     * `Object3D.copy` re-adds clones of every source child. Since a node's
     * components are attached by its own constructor, that would leave the copy
     * with two of each.
     *
     * @param source - The node to copy from.
     * @param recursive - Whether to copy children.
     */
    public copy(source: this, recursive: boolean = true): this {
        super.copy(source, false);

        if (recursive) {
            source.children
                .filter((child) => !('isDIVEComponent' in child))
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
        // if there is no parent, the object will be attached later and keep it's world position
        if (!this.parent) {
            this.position.set(position.x, position.y, position.z);
            return;
        }

        // if we have a parent, we have to calculate the position in the parent's coordinate system to keep the world position
        const newPosition = new Vector3(position.x, position.y, position.z);
        this.position.copy(this.parent.worldToLocal(newPosition));

        this._notifyTransformChanged();
    }

    public setRotation(rotation: Vector3Like): void {
        this.rotation.set(rotation.x, rotation.y, rotation.z);
        this._notifyTransformChanged();
    }

    public setScale(scale: Vector3Like): void {
        this.scale.set(scale.x, scale.y, scale.z);
        this._notifyTransformChanged();
    }

    public setVisibility(visible: boolean): void {
        this.visible = visible;
    }

    public setToWorldOrigin(): void {
        this.position.set(0, 0, 0);
        this.onMove();
    }

    /**
     * Can be called when the object is moved from a foreign object (gizmo, parent, etc.) to update the object's position.
     */
    public onMove(): void {
        this.dispatchEvent({
            type: 'object-transform',
            position: this.getWorldPosition(this._positionWorldBuffer),
            rotation: this.rotation,
            scale: this.scale,
        });
    }

    public onSelect(): void {
        this.dispatchEvent({ type: 'object-select' });
    }

    public onDeselect(): void {
        this.dispatchEvent({ type: 'object-deselect' });
    }

    /**
     * Tells the parent's components that this node moved, so a group can redraw
     * its member links without this node needing to know what a group is.
     */
    private _notifyTransformChanged(): void {
        const parent = this.parent;
        if (!parent || !('isDIVENode' in parent)) return;

        (parent as unknown as DIVENode)._components.forEach((component) =>
            component.onChildNodeTransform?.(this),
        );

        // Transitional: DIVEGroup still keeps its member links itself. Once they
        // move into a component this branch goes away, since that component gets
        // the notification above.
        if ('isDIVEGroup' in parent) {
            (parent as unknown as DIVEGroup).updateLineTo(this);
        }
    }

    private _handleChildAdded(child: Object3D): void {
        if (!('isDIVEComponent' in child)) return;

        const component = child as unknown as DIVEComponent;
        this._components.push(component);
        this.refreshComponentTick(component);
    }

    private _handleChildRemoved(child: Object3D): void {
        if (!('isDIVEComponent' in child)) return;

        const component = child as unknown as DIVEComponent;
        const index = this._components.indexOf(component);
        if (index !== -1) this._components.splice(index, 1);

        this._scene?.withdrawComponent(component);
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
