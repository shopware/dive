import { type Object3D } from 'three/webgpu';

/**
 * Checks whether an object is visible, taking its ancestors into account.
 *
 * `Raycaster` deliberately ignores `visible` — it only tests `layers`. So a ray
 * still reports a hit on a visible mesh whose parent node was hidden, and any
 * picking code has to apply the hierarchy rule itself.
 *
 * @param object - The object to check.
 * @returns True when the object and every one of its ancestors are visible.
 */
export function isVisibleInHierarchy(
    object: Object3D | null | undefined,
): boolean {
    if (!object) return false;

    // iterative on purpose: this runs per intersection per pointer event, and
    // glTF hierarchies get deep.
    let current: Object3D | null = object;
    while (current) {
        if (!current.visible) return false;
        current = current.parent;
    }

    return true;
}
