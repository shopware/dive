import { type Mesh } from 'three/webgpu';
import { PRODUCT_LAYER_MASK } from '../../constants/VisibilityLayerMask.ts';
import { type DIVENode } from '../../engine/node/Node.ts';

/**
 * Calls `callback` for every mesh a mesh-based collider tests on `owner`.
 *
 * Those are the visible product-layer meshes the owner's components
 * contribute; a mesh below a hidden object and meshes of child nodes are left
 * out.
 *
 * @internal
 */
export function forEachTestedMesh(
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
