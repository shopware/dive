import { Box3, type BufferGeometry, type Object3D } from 'three/webgpu';
import { contributesToBounds } from '../contributesToBounds/contributesToBounds.ts';

/**
 * Computes the world-space bounding box of everything in a subtree that counts
 * as real geometry, as decided by {@link contributesToBounds}.
 *
 * Prefer this over `Box3.expandByObject`: that method recurses through the whole
 * subtree itself and knows nothing about layers, so combining it with a
 * `traverse` (as the previous call sites did) walks every node once per ancestor
 * and pulls helper geometry into the result.
 *
 * @param object - Root of the subtree to measure.
 * @param target - Optional box to write into, so callers can avoid allocating.
 * @returns The bounding box; empty when the subtree holds no real geometry.
 */
export function computeProductBounds(
    object: Object3D,
    target: Box3 = new Box3(),
): Box3 {
    target.makeEmpty();

    object.updateWorldMatrix(false, true);

    // one scratch box per call, reused across the traversal
    const scratch = new Box3();

    object.traverse((child) => {
        if (!contributesToBounds(child)) return;

        const geometry = (child as Object3D & { geometry?: BufferGeometry })
            .geometry;
        if (!geometry) return;

        if (!geometry.boundingBox) geometry.computeBoundingBox();
        if (!geometry.boundingBox) return;

        target.union(
            scratch.copy(geometry.boundingBox).applyMatrix4(child.matrixWorld),
        );
    });

    return target;
}
