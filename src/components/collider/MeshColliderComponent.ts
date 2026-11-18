import {
    Matrix4,
    Ray,
    Vector3,
    type BufferGeometry,
    type Intersection,
    type Mesh,
    type Raycaster,
    type SkinnedMesh,
} from 'three/webgpu';
import { MeshBVH } from 'three-mesh-bvh';
import {
    ColliderComponent,
    type ColliderHit,
} from '../../engine/collider/ColliderComponent.ts';
import { forEachTestedMesh, toOwnerSpace } from './forEachTestedMesh.ts';
import { pushSegment } from '../../engine/collider/outline.ts';

const _intersects: Intersection[] = [];
const _toOwner = new Matrix4();
const _a = new Vector3();
const _b = new Vector3();
const _c = new Vector3();
const _inverse = new Matrix4();
const _ray = new Ray();
const _scale = new Vector3();
const _direction = new Vector3();

/**
 * One acceleration structure per geometry, shared by every mesh using it.
 * A swapped geometry is a new key; a disposed one drops its entry.
 */
const _structures = new WeakMap<BufferGeometry, MeshBVH>();

function _dropStructure(geometry: BufferGeometry): void {
    if (!_structures.delete(geometry)) return;
    geometry.removeEventListener('dispose', _onDispose);
}

function _onDispose(event: { target: BufferGeometry }): void {
    _dropStructure(event.target);
}

function _structureOf(geometry: BufferGeometry): MeshBVH {
    let structure = _structures.get(geometry);
    if (structure) return structure;

    // indirect, so the geometry's index stays untouched
    structure = new MeshBVH(geometry, { indirect: true });
    _structures.set(geometry, structure);
    geometry.addEventListener('dispose', _onDispose);

    return structure;
}

/** skinning and morph targets move vertices away from what a structure holds */
function _isDeformed(mesh: Mesh): boolean {
    return (
        (mesh as SkinnedMesh).isSkinnedMesh === true ||
        mesh.geometry.morphAttributes.position !== undefined
    );
}

/** the nearest hit on one mesh through its geometry's structure, in world space */
function _raycastStructure(
    mesh: Mesh,
    raycaster: Raycaster,
    intersects: Intersection[],
): void {
    if (!mesh.geometry.attributes.position) return;

    _inverse.copy(mesh.matrixWorld).invert();
    _ray.copy(raycaster.ray).applyMatrix4(_inverse);

    // near and far measured along the local ray
    _scale.setFromMatrixScale(mesh.matrixWorld);
    const factor = _direction.copy(_ray.direction).multiply(_scale).length();

    const hit = _structureOf(mesh.geometry).raycastFirst(
        _ray,
        mesh.material,
        raycaster.near / factor,
        raycaster.far / factor,
    );
    if (!hit) return;

    hit.point.applyMatrix4(mesh.matrixWorld);
    hit.distance = hit.point.distanceTo(raycaster.ray.origin);
    hit.object = mesh;
    intersects.push(hit);
}

/**
 * Calls `callback` with the vertex indices of every triangle `Mesh.raycast`
 * tests: within the draw range, and only in groups that have a material.
 */
function forEachTriangle(
    mesh: Mesh,
    callback: (a: number, b: number, c: number) => void,
): void {
    const { geometry, material } = mesh;
    const index = geometry.getIndex();
    const position = geometry.getAttribute('position');
    if (!position) return;

    const count = index ? index.count : position.count;
    const vertex = (i: number): number => (index ? index.getX(i) : i);
    const range = (start: number, end: number): void => {
        const from = Math.max(start, geometry.drawRange.start);
        const to = Math.min(
            end,
            count,
            geometry.drawRange.start + geometry.drawRange.count,
        );
        for (let i = from; i + 2 < to; i += 3) {
            callback(vertex(i), vertex(i + 1), vertex(i + 2));
        }
    };

    if (Array.isArray(material)) {
        for (const group of geometry.groups) {
            if (!material[group.materialIndex ?? 0]) continue;
            range(group.start, group.start + group.count);
        }
        return;
    }

    range(0, count);
}

/**
 * Makes its owner hittable exactly where its surfaces are.
 *
 * Tests the visible product-layer meshes the owner's components contribute,
 * read live on every raycast, so a finished asset load or a swapped geometry
 * is hit without any refresh. A hidden mesh or a mesh below a hidden object is
 * never hit. Meshes of child nodes answer for their own node, not this one.
 * Each mesh's `material.side` is honoured, and only the nearest hit is
 * reported.
 *
 * Triangles are tested through an acceleration structure built on first use
 * and shared by every mesh using the same geometry. Call {@link refresh} after
 * editing a geometry in place. Skinned meshes and meshes with morph targets
 * are tested triangle by triangle, so they are hit in their current pose.
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
     * Picks up in-place edits of the owner's geometries, which nothing
     * announces. A swapped geometry needs no refresh.
     */
    public refresh(): this {
        if (!this.isAttached) return this;

        forEachTestedMesh(this.owner, (mesh) => _dropStructure(mesh.geometry));

        return this;
    }

    /**
     * @internal the wireframe of the tested triangles, in their current pose
     */
    public outline(target: number[]): void {
        forEachTestedMesh(this.owner, (mesh) => {
            toOwnerSpace(mesh, this.owner, _toOwner);

            forEachTriangle(mesh, (a, b, c) => {
                const corner = (index: number, point: Vector3): Vector3 =>
                    mesh.getVertexPosition(index, point).applyMatrix4(_toOwner);
                corner(a, _a);
                corner(b, _b);
                corner(c, _c);
                pushSegment(target, _a, _b);
                pushSegment(target, _b, _c);
                pushSegment(target, _c, _a);
            });
        });
    }

    protected intersectRay(raycaster: Raycaster): ColliderHit | null {
        _intersects.length = 0;

        forEachTestedMesh(this.owner, (mesh) => {
            if (_isDeformed(mesh)) {
                // three caches a skinned mesh's sphere from the first pose it saw
                if ((mesh as SkinnedMesh).isSkinnedMesh) {
                    (mesh as SkinnedMesh).computeBoundingSphere();
                }
                // three evaluates the current pose
                mesh.raycast(raycaster, _intersects);
            } else {
                _raycastStructure(mesh, raycaster, _intersects);
            }
        });

        // the base replaces object with the owner
        _intersects.sort((a, b) => a.distance - b.distance);
        const nearest = _intersects[0] ?? null;
        _intersects.length = 0;

        return nearest;
    }
}
