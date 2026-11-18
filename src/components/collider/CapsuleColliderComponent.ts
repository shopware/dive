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
import { pushArc, pushSegment } from '../../engine/collider/outline.ts';

const _axis = new Vector3();
const _back = new Vector3();
const _u = new Vector3();
const _v = new Vector3();
const _middle = new Vector3();
const _a = new Vector3();
const _b = new Vector3();
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

    /** @internal rings at both ends and the middle, side lines and caps */
    public outline(target: number[]): void {
        if (this.isEmpty()) return;

        const { start, end, radius } = this;
        const length = _axis.subVectors(end, start).length();
        if (length === 0) _axis.set(0, 1, 0);
        else _axis.divideScalar(length);
        _back.copy(_axis).negate();

        // two unit vectors across the axis
        _u.set(
            Math.abs(_axis.x) < 0.9 ? 1 : 0,
            Math.abs(_axis.x) < 0.9 ? 0 : 1,
            0,
        )
            .cross(_axis)
            .normalize();
        _v.crossVectors(_axis, _u);

        if (length > 0) {
            _middle.addVectors(start, end).multiplyScalar(0.5);
            pushArc(target, start, _u, _v, radius);
            pushArc(target, _middle, _u, _v, radius);
            for (const side of [_u, _v]) {
                for (const sign of [1, -1]) {
                    _a.copy(start).addScaledVector(side, sign * radius);
                    _b.copy(end).addScaledVector(side, sign * radius);
                    pushSegment(target, _a, _b);
                }
            }
        }
        pushArc(target, end, _u, _v, radius);

        // half circles over each cap, from one side across the tip to the other
        pushArc(target, end, _u, _axis, radius, 0, Math.PI);
        pushArc(target, end, _v, _axis, radius, 0, Math.PI);
        pushArc(target, start, _u, _back, radius, 0, Math.PI);
        pushArc(target, start, _v, _back, radius, 0, Math.PI);
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

        return solveQuadratic(1, 2 * b, c);
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

        // the end spheres cover a ray parallel to the axis
        const a = _direction.lengthSq();
        if (a < 1e-12) return null;

        const side = solveQuadratic(
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
function solveQuadratic(a: number, b: number, c: number): Span | null {
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) return null;

    const root = Math.sqrt(discriminant);

    return { enter: (-b - root) / (2 * a), leave: (-b + root) / (2 * a) };
}
