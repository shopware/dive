import {
    Layers,
    type Intersection,
    type Raycaster,
    type Vector3,
} from 'three/webgpu';
import { PRODUCT_LAYER_MASK } from '../../constants/VisibilityLayerMask.ts';
import { DIVEComponent } from '../../engine/component/Component.ts';
import { type DIVENode } from '../../engine/node/Node.ts';

/**
 * A collider hit: a three `Intersection` whose `object` is the owner node,
 * plus the collider that was hit.
 */
export interface ColliderIntersection extends Intersection<DIVENode> {
    collider: ColliderComponent;
}

/**
 * What a collider's shape test finds, in world space.
 *
 * Everything of an `Intersection` except `object`, which the base fills in.
 */
export type ColliderHit = Omit<Intersection, 'object'> & {
    distance: number;
    point: Vector3;
};

/**
 * What can be hit on the owner node, separate from what is rendered.
 *
 * Not a render object: a collider is invisible, has no helper and contributes
 * nothing on its own account. Picking asks colliders instead of meshes.
 *
 * {@link raycast} mirrors three's `Object3D.raycast(raycaster, intersects)`,
 * but pushes at most one hit, the nearest, with the owner node as `object`.
 * A subclass only implements the shape test, {@link intersectRay}.
 *
 * @module
 */
export abstract class ColliderComponent extends DIVEComponent {
    readonly isColliderComponent: true = true;

    /**
     * Which raycasts may hit this collider, tested against `raycaster.layers`.
     * Defaults to `PRODUCT_LAYER_MASK`.
     */
    public layers: Layers = new Layers();

    constructor() {
        super();

        this.name = 'ColliderComponent';
        this.layers.mask = PRODUCT_LAYER_MASK;
    }

    /**
     * Like `Object3D.raycast`: appends the nearest hit, if any, to `intersects`.
     *
     * Reads the owner's `matrixWorld` as it is, like three does, so update it
     * first. Detached colliders and colliders on other layers are never hit.
     *
     * @param raycaster - The ray, its `near`/`far` and its `layers`.
     * @param intersects - Where the hit is appended.
     */
    public raycast(raycaster: Raycaster, intersects: Intersection[]): void {
        if (!this.isAttached) return;
        if (!raycaster.layers.test(this.layers)) return;

        const hit = this.intersectRay(raycaster);
        if (!hit) return;
        if (hit.distance < raycaster.near || hit.distance > raycaster.far)
            return;

        const intersection: ColliderIntersection = {
            ...hit,
            object: this.owner,
            collider: this,
        };
        intersects.push(intersection);
    }

    public copy(source: this): this {
        super.copy(source);

        this.layers.mask = source.layers.mask;

        return this;
    }

    /**
     * The shape test: the nearest hit of the ray in world space, or `null`.
     *
     * Only called while attached, so `this.owner` is safe.
     *
     * @param raycaster - The ray to test.
     */
    protected abstract intersectRay(raycaster: Raycaster): ColliderHit | null;
}
