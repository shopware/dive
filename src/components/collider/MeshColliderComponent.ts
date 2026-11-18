import {
    Matrix4,
    Vector3,
    type Intersection,
    type Raycaster,
} from 'three/webgpu';
import {
    ColliderComponent,
    type ColliderHit,
} from '../../engine/collider/ColliderComponent.ts';
import { forEachTestedMesh } from './forEachTestedMesh.ts';
import { pushSegment } from '../../engine/collider/outline.ts';

const _intersects: Intersection[] = [];
const _toOwner = new Matrix4();
const _corners = [new Vector3(), new Vector3(), new Vector3()];

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

    /**
     * @internal the wireframe of the tested triangles, read from world
     * matrices, so the caller updates them first
     */
    public outline(target: number[]): void {
        const toOwnerSpace = _toOwner.copy(this.owner.matrixWorld).invert();

        forEachTestedMesh(this.owner, (mesh) => {
            const matrix = new Matrix4().multiplyMatrices(
                toOwnerSpace,
                mesh.matrixWorld,
            );
            const position = mesh.geometry.getAttribute('position');
            const index = mesh.geometry.getIndex();
            const count = index ? index.count : position.count;

            for (let i = 0; i + 2 < count; i += 3) {
                _corners.forEach((corner, k) =>
                    corner
                        .fromBufferAttribute(
                            position,
                            index ? index.getX(i + k) : i + k,
                        )
                        .applyMatrix4(matrix),
                );
                pushSegment(target, _corners[0], _corners[1]);
                pushSegment(target, _corners[1], _corners[2]);
                pushSegment(target, _corners[2], _corners[0]);
            }
        });
    }

    protected intersectRay(raycaster: Raycaster): ColliderHit | null {
        _intersects.length = 0;

        // three's own triangle test, honouring material.side
        forEachTestedMesh(this.owner, (mesh) =>
            mesh.raycast(raycaster, _intersects),
        );

        // the base replaces object with the owner
        _intersects.sort((a, b) => a.distance - b.distance);
        const nearest = _intersects[0] ?? null;
        _intersects.length = 0;

        return nearest;
    }
}
