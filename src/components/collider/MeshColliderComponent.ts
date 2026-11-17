import { type Intersection, type Mesh, type Raycaster } from 'three/webgpu';
import {
    ColliderComponent,
    type ColliderHit,
} from '../../engine/collider/ColliderComponent.ts';
import { PRODUCT_LAYER_MASK } from '../../constants/VisibilityLayerMask.ts';

const _intersects: Intersection[] = [];

/**
 * Makes its owner hittable exactly where its surfaces are.
 *
 * Tests the visible product-layer meshes the owner's components contribute,
 * read live on every raycast, so a finished asset load or a swapped geometry
 * is hit without any refresh. A hidden mesh or a mesh below a hidden object is
 * never hit. Meshes of child nodes answer for their own node, not this one.
 * Each mesh's `material.side` is honoured, and only the nearest hit is
 * reported. How triangles are tested is internal, so an acceleration structure
 * can be added without an API change.
 *
 * @module
 */
export class MeshColliderComponent extends ColliderComponent {
    readonly isMeshColliderComponent: true = true;

    constructor() {
        super();

        this.name = 'MeshColliderComponent';
    }

    protected intersectRay(raycaster: Raycaster): ColliderHit | null {
        _intersects.length = 0;

        this.owner.components.forEach((component) =>
            component.contributions.forEach((object) =>
                object.traverseVisible((child) => {
                    if (!(child as Mesh).isMesh) return;
                    if ((child.layers.mask & PRODUCT_LAYER_MASK) === 0) return;

                    // three's own triangle test, honouring material.side
                    child.raycast(raycaster, _intersects);
                }),
            ),
        );

        // the base replaces object with the owner
        _intersects.sort((a, b) => a.distance - b.distance);
        const nearest = _intersects[0] ?? null;
        _intersects.length = 0;

        return nearest;
    }
}
