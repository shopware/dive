import {
    Box3,
    Line3,
    Matrix4,
    Plane,
    Vector3,
    type Raycaster,
} from 'three/webgpu';
import { ConvexHull } from 'three/examples/jsm/math/ConvexHull.js';
import {
    ColliderComponent,
    type ColliderHit,
} from '../../engine/collider/ColliderComponent.ts';
import { type DIVENode } from '../../engine/node/Node.ts';
import { forEachTestedMesh, toOwnerSpace } from './forEachTestedMesh.ts';
import { pushBox, pushSegment } from '../../engine/collider/outline.ts';

const _matrix = new Matrix4();
const _line = new Line3();
const _plane = new Plane();
const _closest = new Vector3();
const _size = new Vector3();

/** points closer than this fraction of their extent count as one line or plane */
const FLATNESS = 1e-6;

/**
 * Makes its owner hittable as the convex hull of its meshes.
 *
 * A cheap stand-in for heavy content where precision does not matter. Takes
 * the meshes {@link MeshColliderComponent} tests (the visible product-layer
 * meshes the owner's components contribute, not those of child nodes), with
 * skinned meshes in their bind pose, and wraps them in three's `ConvexHull`
 * in the owner's space, so it follows the owner's position, rotation and
 * scale.
 *
 * Built on the first raycast and rebuilt after the owner reports a child or
 * component added or removed, which covers a finished asset load. Call
 * {@link refresh} after changes nothing announces, such as a geometry edited
 * or swapped in place or a part shown or hidden.
 *
 * Without meshes it is empty and never hit. Flat content (a plane, a logo)
 * has no volume, so it is tested as the box of its points instead, which is
 * hit even when flat. A ray starting inside reports where it leaves.
 *
 * @module
 */
export class ConvexColliderComponent extends ColliderComponent {
    readonly isConvexColliderComponent: true = true;

    private _hull: ConvexHull = new ConvexHull();
    private _box: Box3 = new Box3();
    private _flat: boolean = false;
    private _stale: boolean = true;

    private _invalidate = (): void => {
        this._stale = true;
    };

    constructor() {
        super();

        this.name = 'ConvexColliderComponent';
    }

    /** Rebuilds the hull on the next raycast, for changes nothing announces. */
    public refresh(): this {
        this._stale = true;

        return this;
    }

    protected onAttach(owner: DIVENode): void {
        owner.addEventListener('childadded', this._invalidate);
        owner.addEventListener('childremoved', this._invalidate);
        owner.addEventListener('componentadded', this._invalidate);
        owner.addEventListener('componentremoved', this._invalidate);

        this._stale = true;
    }

    protected onDetach(previousOwner: DIVENode): void {
        previousOwner.removeEventListener('childadded', this._invalidate);
        previousOwner.removeEventListener('childremoved', this._invalidate);
        previousOwner.removeEventListener('componentadded', this._invalidate);
        previousOwner.removeEventListener('componentremoved', this._invalidate);

        this._stale = true;
    }

    /** @internal the hull's edges, or the box of flat content */
    public outline(target: number[]): void {
        if (this._stale) this._build();

        if (this._flat) {
            pushBox(target, this._box);
            return;
        }

        // each edge once, though both of its faces list it
        const drawn = new Set<object>();
        for (const face of this._hull.faces) {
            let edge = face.edge;
            do {
                if (!drawn.has(edge.twin)) {
                    drawn.add(edge);
                    pushSegment(target, edge.tail().point, edge.head().point);
                }
                edge = edge.next;
            } while (edge !== face.edge);
        }
    }

    protected intersectRay(raycaster: Raycaster): ColliderHit | null {
        if (this._stale) this._build();

        if (this._flat) {
            return this.intersectInOwnerSpace(raycaster, (ray, target) =>
                ray.intersectBox(this._box, target),
            );
        }

        // a ConvexHull without faces reports a point at infinity
        if (this._hull.faces.length === 0) return null;

        return this.intersectInOwnerSpace(raycaster, (ray, target) =>
            this._hull.intersectRay(ray, target),
        );
    }

    private _build(): void {
        this._stale = false;

        const points: Vector3[] = [];
        forEachTestedMesh(this.owner, (mesh) => {
            toOwnerSpace(mesh, this.owner, _matrix);

            // the raw attribute, so a skinned mesh counts in its bind pose
            const position = mesh.geometry.getAttribute('position');
            for (let i = 0; i < position.count; i++) {
                points.push(
                    new Vector3()
                        .fromBufferAttribute(position, i)
                        .applyMatrix4(_matrix),
                );
            }
        });

        this._hull.makeEmpty();
        this._box.setFromPoints(points);
        this._flat = points.length > 0 && isFlat(points, this._box);

        if (points.length > 0 && !this._flat) this._hull.setFromPoints(points);
    }
}

/**
 * Whether `points` lie on one plane, which `ConvexHull` cannot wrap.
 *
 * Finds the line through the two points furthest apart from the first, the
 * point furthest from that line and the point furthest from their plane.
 */
function isFlat(points: Vector3[], box: Box3): boolean {
    const epsilon = box.getSize(_size).length() * FLATNESS;
    if (epsilon === 0) return true;

    const furthest = (
        distance: (point: Vector3) => number,
    ): { point: Vector3; distance: number } => {
        let best = points[0];
        let max = -1;
        for (const point of points) {
            const d = distance(point);
            if (d > max) {
                max = d;
                best = point;
            }
        }
        return { point: best, distance: max };
    };

    const start = furthest((p) => p.distanceTo(points[0])).point;
    const end = furthest((p) => p.distanceTo(start)).point;
    _line.set(start, end);
    const off = furthest((p) =>
        _line.closestPointToPoint(p, false, _closest).distanceTo(p),
    );
    if (off.distance <= epsilon) return true;

    _plane.setFromCoplanarPoints(start, end, off.point);

    return (
        furthest((p) => Math.abs(_plane.distanceToPoint(p))).distance <= epsilon
    );
}
