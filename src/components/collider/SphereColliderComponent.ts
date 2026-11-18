import {
    Sphere,
    Vector3,
    type Raycaster,
    type Vector3Like,
} from 'three/webgpu';
import {
    ColliderComponent,
    type ColliderHit,
} from '../../engine/collider/ColliderComponent.ts';

/**
 * Makes its owner hittable as a sphere.
 *
 * Sized like a `Sphere`, in the owner's space, and tested analytically there,
 * so it follows the owner's position, rotation and scale. An empty sphere
 * (negative radius) is never hit. Looks the same from every angle, which suits
 * a billboard. Nothing resizes it on its own.
 *
 * @module
 */
export class SphereColliderComponent extends ColliderComponent {
    readonly isSphereColliderComponent: true = true;

    private _sphere: Sphere = new Sphere(new Vector3(), 0.5);

    constructor() {
        super();

        this.name = 'SphereColliderComponent';
    }

    /** Like `Sphere.radius`, in the owner's space. Negative means empty. */
    public get radius(): number {
        return this._sphere.radius;
    }

    public set radius(radius: number) {
        this._sphere.radius = radius;
    }

    /**
     * Like `Sphere.set`.
     *
     * @param center - Centre, in the owner's space.
     * @param radius - Radius, in the owner's space; negative means empty.
     */
    public set(center: Vector3Like, radius: number): this {
        this._sphere.center.set(center.x, center.y, center.z);
        this._sphere.radius = radius;

        return this;
    }

    /** Copies the centre, in the owner's space, into `target`. */
    public getCenter(target: Vector3): Vector3 {
        return target.copy(this._sphere.center);
    }

    /** Like `Sphere.isEmpty`. */
    public isEmpty(): boolean {
        return this._sphere.isEmpty();
    }

    public copy(source: this): this {
        super.copy(source);

        this.set(source._sphere.center, source._sphere.radius);

        return this;
    }

    protected intersectRay(raycaster: Raycaster): ColliderHit | null {
        if (this._sphere.isEmpty()) return null;

        return this.intersectInOwnerSpace(raycaster, (ray, target) =>
            ray.intersectSphere(this._sphere, target),
        );
    }
}
