import { Mesh, MeshStandardMaterial } from 'three/webgpu';
import { MeshComponent } from '../MeshComponent.ts';
import { PrimitiveMeshComponent } from '../PrimitiveMeshComponent.ts';
import { DIVENode } from '../../node/Node.ts';
import { type DIVEGeometryType } from '../../../types/geometry/DIVEGeometryType.ts';

describe('dive/mesh/PrimitiveMeshComponent', () => {
    let node: DIVENode;
    let primitive: PrimitiveMeshComponent;

    beforeEach(() => {
        node = new DIVENode();
        primitive = node.addComponent(new PrimitiveMeshComponent());
    });

    it('should be findable as a MeshComponent', () => {
        // shares the material path with models through the base class
        expect(node.getComponent(MeshComponent)).toBe(primitive);
    });

    it('should own a mesh from the start', () => {
        expect(primitive.mesh).toBeInstanceOf(Mesh);
        expect(primitive.material).toBeInstanceOf(MeshStandardMaterial);
    });

    const shapes: DIVEGeometryType[] = [
        'cylinder',
        'sphere',
        'pyramid',
        'cube',
        'box',
        'cone',
        'wall',
        'plane',
    ];

    it('should keep every shape cheap enough to raycast per pointer move', () => {
        // `Mesh.raycast` has no acceleration structure: once the pointer is over
        // a shape it tests every triangle, and the toolbox raycasts on every
        // `pointermove`. A sphere at 256 x 256 segments was 130 560 triangles and
        // 8 ms per raycast, which saturated the main thread while orbiting.
        const BUDGET = 10_000;

        shapes.forEach((name) => {
            primitive.setGeometry({ name, width: 1, height: 2, depth: 1 });

            const geometry = primitive.mesh!.geometry;
            const triangles = geometry.index
                ? geometry.index.count / 3
                : geometry.attributes.position.count / 3;

            expect(
                triangles,
                `${name} has ${triangles} triangles`,
            ).toBeLessThan(BUDGET);
        });
    });

    shapes.forEach((name) => {
        it(`should build ${name} geometry`, () => {
            primitive.setGeometry({ name, width: 1, height: 2, depth: 1 });

            expect(primitive.mesh?.geometry.attributes.position).toBeDefined();
            expect(primitive.mesh?.geometry.boundingBox).not.toBeNull();
        });
    });

    it('should use flat shading for a pyramid only', () => {
        primitive.setGeometry({
            name: 'pyramid',
            width: 1,
            height: 1,
            depth: 1,
        });
        expect(primitive.material?.flatShading).toBe(true);

        primitive.setGeometry({ name: 'cube', width: 1, height: 1, depth: 1 });
        expect(primitive.material?.flatShading).toBe(false);
    });

    it('should default the wall depth', () => {
        primitive.setGeometry({ name: 'wall', width: 1, height: 2, depth: 0 });

        expect(primitive.mesh?.geometry.boundingBox?.max.z).toBeCloseTo(0.025);
    });

    it('should warn and keep the geometry for an unknown shape', () => {
        console.warn = vi.fn();
        primitive.setGeometry({ name: 'cube', width: 1, height: 1, depth: 1 });
        const before = primitive.mesh?.geometry;

        primitive.setGeometry({
            name: 'dodecahedron' as DIVEGeometryType,
            width: 1,
            height: 1,
            depth: 1,
        });

        expect(console.warn).toHaveBeenCalled();
        expect(primitive.mesh?.geometry).toBe(before);
    });
});
