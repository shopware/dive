import { type Mesh } from 'three/webgpu';
import { type DIVENode } from '../../engine/node/Node.ts';
import { PRODUCT_LAYER_MASK } from '../../constants/VisibilityLayerMask.ts';

/**
 * Calls `callback` for every mesh a geometry-based collider covers: the
 * visible product-layer meshes the owner's components contribute, read live.
 *
 * A hidden mesh or a mesh below a hidden object is skipped, and meshes of
 * child nodes belong to their own node, not this one.
 *
 * @param owner - The collider's owner node.
 * @param callback - Called once per mesh.
 */
export function forEachProductMesh(
    owner: DIVENode,
    callback: (mesh: Mesh) => void,
): void {
    owner.components.forEach((component) =>
        component.contributions.forEach((object) =>
            object.traverseVisible((child) => {
                if (!(child as Mesh).isMesh) return;
                if ((child.layers.mask & PRODUCT_LAYER_MASK) === 0) return;

                callback(child as Mesh);
            }),
        ),
    );
}
