import { Mesh, MeshStandardMaterial } from 'three/webgpu';
import { MeshComponent } from '../../MeshComponent.ts';
import { PrimitiveComponent } from '../PrimitiveComponent.ts';
import { DIVENode } from '../../../../engine/node/Node.ts';
import { type DIVEGeometry } from '../../../../types/geometry/DIVEGeometry.ts';
import { type DIVEGeometryType } from '../../../../types/geometry/DIVEGeometryType.ts';

describe('dive/mesh/PrimitiveComponent', () => {
    let node: DIVENode;
    let primitive: PrimitiveComponent;

    beforeEach(() => {
        node = new DIVENode();
        primitive = node.addComponent(new PrimitiveComponent());
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
        /**
         * Mesh.raycast tests every triangle and the toolbox raycasts on every
         * pointermove, so a 130k triangle sphere cost 8 ms per pointer move
         */
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

    it('should remember the shape it was built from', () => {
        const descriptor: DIVEGeometry = {
            name: 'cube',
            width: 2,
            height: 3,
            depth: 4,
        };

        primitive.setGeometry(descriptor);

        expect(primitive.geometry).toEqual(descriptor);
    });

    it('should not remember a shape it could not build', () => {
        console.warn = vi.fn();

        primitive.setGeometry({
            name: 'dodecahedron' as DIVEGeometryType,
            width: 1,
            height: 1,
            depth: 1,
        });

        expect(primitive.geometry).toBeNull();
    });

    it('should rebuild its shape in a clone rather than share it', () => {
        // sharing the built geometry would have both components dispose it
        primitive.setGeometry({ name: 'cube', width: 2, height: 3, depth: 4 });

        const copy = primitive.clone();

        expect(copy.geometry).toEqual(primitive.geometry);
        expect(copy.mesh?.geometry).not.toBe(primitive.mesh?.geometry);
        expect(copy.mesh?.geometry.boundingBox?.max.x).toBeCloseTo(1);
        expect(copy.mesh?.geometry.boundingBox?.max.y).toBeCloseTo(3);
    });

    it('should carry flat shading along to a clone', () => {
        // the descriptor decides it, so rebuilding has to decide it again
        primitive.setGeometry({
            name: 'pyramid',
            width: 1,
            height: 1,
            depth: 1,
        });

        expect(primitive.clone().material?.flatShading).toBe(true);
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
