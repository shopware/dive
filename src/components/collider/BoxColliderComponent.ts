import { Box3, Vector3, type Raycaster, type Vector3Like } from 'three/webgpu';
import {
    ColliderComponent,
    type ColliderHit,
} from '../../engine/collider/ColliderComponent.ts';
import { pushBox } from '../../engine/collider/outline.ts';

/**
 * Makes its owner hittable as a box.
 *
 * Sized like a `Box3`, in the owner's space, and tested analytically there, so
 * it follows the owner's position, rotation and scale. An empty box is never
 * hit, a flat one is. Nothing resizes it on its own: a caller that changes what
 * it encloses sets it again.
 *
 * @module
 */
export class BoxColliderComponent extends ColliderComponent {
    readonly isBoxColliderComponent: true = true;

    private _box: Box3 = new Box3(
        new Vector3(-0.5, -0.5, -0.5),
        new Vector3(0.5, 0.5, 0.5),
    );

    constructor() {
        super();

        this.name = 'BoxColliderComponent';
    }

    /**
     * Like `Box3.set`. An empty box (`min` above `max`) is not hit at all.
     *
     * @param min - Lower corner, in the owner's space.
     * @param max - Upper corner, in the owner's space.
     */
    public set(min: Vector3Like, max: Vector3Like): this {
        this._box.min.set(min.x, min.y, min.z);
        this._box.max.set(max.x, max.y, max.z);

        return this;
    }

    /**
     * Like `Box3.setFromCenterAndSize`.
     *
     * @param center - Centre, in the owner's space.
     * @param size - Extent along each axis.
     */
    public setFromCenterAndSize(center: Vector3Like, size: Vector3Like): this {
        this._box.setFromCenterAndSize(
            new Vector3(center.x, center.y, center.z),
            new Vector3(size.x, size.y, size.z),
        );

        return this;
    }

    /** Like `Box3.getCenter`. */
    public getCenter(target: Vector3): Vector3 {
        return this._box.getCenter(target);
    }

    /** Like `Box3.getSize`. */
    public getSize(target: Vector3): Vector3 {
        return this._box.getSize(target);
    }

    /** Like `Box3.isEmpty`. */
    public isEmpty(): boolean {
        return this._box.isEmpty();
    }

    public copy(source: this): this {
        super.copy(source);

        this.set(source._box.min, source._box.max);

        return this;
    }

    /** @internal */
    public outline(target: number[]): void {
        if (!this._box.isEmpty()) pushBox(target, this._box);
    }

    protected intersectRay(raycaster: Raycaster): ColliderHit | null {
        if (this._box.isEmpty()) return null;

        return this.intersectInOwnerSpace(raycaster, (ray, target) =>
            ray.intersectBox(this._box, target),
        );
    }
}
