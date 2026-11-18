import { Raycaster, type Intersection, type Object3D } from 'three/webgpu';
import { contributedBy } from '../component/Component.ts';
import { type DIVENode } from '../node/Node.ts';
import { type ColliderComponent } from '../collider/ColliderComponent.ts';

/**
 * The collider raycaster: three's `Raycaster` API, but it tests colliders only.
 *
 * `intersectObject`/`intersectObjects` enter what they are given and walk down
 * through nodes only, call the `raycast` of every collider on each node they
 * reach and never the `raycast` of a mesh. Plain three content below, such as
 * a gizmo, is not walked, content a component contributed is skipped and
 * hidden subtrees are not entered, so the cost follows the number of nodes, not of
 * meshes. Each hit is a {@link ColliderIntersection}: `object` is the owner
 * node, at most one hit per collider, sorted by distance.
 *
 * Not a drop-in for three code that expects mesh hits (no `face`, no `uv` on
 * box and sphere hits, `object` is never a mesh): hand such code a plain
 * `Raycaster`.
 *
 * `setFromCamera`, `near`, `far` and `layers` behave as in three; `layers` are
 * tested against each collider's `layers`. World matrices are read as they
 * are, so update them first, as three expects too.
 */
export class DIVERaycaster extends Raycaster {
    readonly isDIVERaycaster: true = true;

    /**
     * Hits of the colliders on `object` and, if `recursive`, below it.
     *
     * @param object - A scene, a root or a single node.
     * @param recursive - Whether to walk down. Default `true`.
     * @param optionalTarget - Where the hits are appended. Default `[]`.
     */
    public intersectObject<TIntersected extends Object3D = DIVENode>(
        object: Object3D,
        recursive: boolean = true,
        optionalTarget: Intersection<TIntersected>[] = [],
    ): Intersection<TIntersected>[] {
        this._collect(object, recursive, optionalTarget as Intersection[]);
        optionalTarget.sort(byDistance);

        return optionalTarget;
    }

    /**
     * Hits of the colliders on each of `objects` and, if `recursive`, below.
     *
     * @param objects - Scenes, roots or nodes.
     * @param recursive - Whether to walk down. Default `true`.
     * @param optionalTarget - Where the hits are appended. Default `[]`.
     */
    public intersectObjects<TIntersected extends Object3D = DIVENode>(
        objects: Object3D[],
        recursive: boolean = true,
        optionalTarget: Intersection<TIntersected>[] = [],
    ): Intersection<TIntersected>[] {
        for (const object of objects) {
            this._collect(object, recursive, optionalTarget as Intersection[]);
        }
        optionalTarget.sort(byDistance);

        return optionalTarget;
    }

    private _collect(
        object: Object3D,
        recursive: boolean,
        intersects: Intersection[],
    ): void {
        if (!object.visible) return;

        if ('isDIVENode' in object) {
            for (const component of (object as DIVENode).components) {
                if (!('isColliderComponent' in component)) continue;
                (component as ColliderComponent).raycast(this, intersects);
            }
        }

        if (!recursive) return;

        for (const child of object.children) {
            if (!('isDIVENode' in child)) continue;
            if (contributedBy(child)) continue;
            this._collect(child, true, intersects);
        }
    }
}

const byDistance = (a: Intersection, b: Intersection): number =>
    a.distance - b.distance;
