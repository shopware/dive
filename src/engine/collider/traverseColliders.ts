import { type Object3D } from 'three/webgpu';
import { contributedBy } from '../component/Component.ts';
import { type DIVENode } from '../node/Node.ts';
import { type ColliderComponent } from './ColliderComponent.ts';

/**
 * Calls `callback` for every collider on `object` and, if `recursive`, below it.
 *
 * `object` is always entered; below it the walk descends only into nodes that
 * no component contributed, and it stops at `visible === false`. Internal: the
 * collider raycaster and the collider debug view share it.
 */
export function traverseColliders(
    object: Object3D,
    callback: (collider: ColliderComponent) => void,
    recursive: boolean = true,
): void {
    if (!object.visible) return;

    if ('isDIVENode' in object) {
        for (const component of (object as DIVENode).components) {
            if (!('isColliderComponent' in component)) continue;
            callback(component as ColliderComponent);
        }
    }

    if (!recursive) return;

    for (const child of object.children) {
        if (!('isDIVENode' in child)) continue;
        if (contributedBy(child)) continue;
        traverseColliders(child, callback, true);
    }
}
