import {
    Vector3,
    type Ray,
    type Raycaster,
    type Vector3Like,
} from 'three/webgpu';
import {
    ColliderComponent,
    type ColliderHit,
} from '../../engine/collider/ColliderComponent.ts';

const _axis = new Vector3();
const _offset = new Vector3();
const _direction = new Vector3();

/** where a ray enters and leaves a shape, along the ray */
interface Span {
    enter: number;
    leave: number;
}

/**
 * Makes its owner hittable as a capsule: a cylinder between two end points,
 * capped by half spheres.
 *
 * Sized like three's `Capsule`, in the owner's space, and tested
 * analytically there, so it follows the owner's position, rotation and scale.
 * Suits elongated content. Start equal to end is a sphere; a negative radius
 * is empty and never hit. Nothing resizes it on its own.
 *
 * @module
 */
export class CapsuleColliderComponent extends ColliderComponent {
    readonly isCapsuleColliderComponent: true = true;

    /** Like `Capsule.start`, in the owner's space. */
    public readonly start: Vector3 = new Vector3(0, 0, 0);

    /** Like `Capsule.end`, in the owner's space. */
    public readonly end: Vector3 = new Vector3(0, 1, 0);

    /** Like `Capsule.radius`, in the owner's space. Negative means empty. */
    public radius: number = 0.5;

    constructor() {
        super();

        this.name = 'CapsuleColliderComponent';
    }

    /**
     * Like `Capsule.set`.
     *
     * @param start - First end point, in the owner's space.
     * @param end - Second end point, in the owner's space.
     * @param radius - Radius, in the owner's space; negative means empty.
     */
    public set(start: Vector3Like, end: Vector3Like, radius: number): this {
        this.start.set(start.x, start.y, start.z);
        this.end.set(end.x, end.y, end.z);
        this.radius = radius;

        return this;
    }

    /** True for a negative radius. */
    public isEmpty(): boolean {
        return this.radius < 0;
    }

    public copy(source: this): this {
        super.copy(source);

        this.set(source.start, source.end, source.radius);

        return this;
    }

    protected intersectRay(raycaster: Raycaster): ColliderHit | null {
        if (this.isEmpty()) return null;

        return this.intersectInOwnerSpace(raycaster, (ray, target) =>
            this._intersectCapsule(ray, target),
        );
    }

    /**
     * The capsule is convex, so the ray meets it in one span: from the
     * earliest entry to the latest exit over its three parts.
     */
    private _intersectCapsule(ray: Ray, target: Vector3): Vector3 | null {
        const spans = [
            this._intersectSphere(ray, this.start),
            this._intersectSphere(ray, this.end),
            this._intersectCylinder(ray),
        ].filter((span): span is Span => span !== null);
        if (spans.length === 0) return null;

        const enter = Math.min(...spans.map((span) => span.enter));
        const leave = Math.max(...spans.map((span) => span.leave));
        if (leave < 0) return null;

        // a ray starting inside reports where it leaves
        return ray.at(enter >= 0 ? enter : leave, target);
    }

    private _intersectSphere(ray: Ray, center: Vector3): Span | null {
        _offset.subVectors(ray.origin, center);
        const b = _offset.dot(ray.direction);
        const c = _offset.lengthSq() - this.radius * this.radius;

        return solve(1, 2 * b, c);
    }

    /** the finite cylinder between the end points, without its caps */
    private _intersectCylinder(ray: Ray): Span | null {
        const length = _axis.subVectors(this.end, this.start).length();
        if (length === 0) return null;
        _axis.divideScalar(length);

        // split origin and direction into along the axis and across it
        _offset.subVectors(ray.origin, this.start);
        const offsetAlong = _offset.dot(_axis);
        const directionAlong = ray.direction.dot(_axis);
        _offset.addScaledVector(_axis, -offsetAlong);
        _direction.copy(ray.direction).addScaledVector(_axis, -directionAlong);

        // parallel to the axis: the end spheres cover it
        const a = _direction.lengthSq();
        if (a < 1e-12) return null;

        const side = solve(
            a,
            2 * _offset.dot(_direction),
            _offset.lengthSq() - this.radius * this.radius,
        );
        if (!side) return null;

        // clip to the slab between the end points
        if (Math.abs(directionAlong) < 1e-12) {
            return offsetAlong >= 0 && offsetAlong <= length ? side : null;
        }
        const t0 = -offsetAlong / directionAlong;
        const t1 = (length - offsetAlong) / directionAlong;
        const enter = Math.max(side.enter, Math.min(t0, t1));
        const leave = Math.min(side.leave, Math.max(t0, t1));

        return enter <= leave ? { enter, leave } : null;
    }
}

/** the roots of `a t² + b t + c = 0`, or `null` without real ones */
function solve(a: number, b: number, c: number): Span | null {
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) return null;

    const root = Math.sqrt(discriminant);

    return { enter: (-b - root) / (2 * a), leave: (-b + root) / (2 * a) };
}
