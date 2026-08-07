import { DIVEPrimitive } from '../Primitive.ts';
import {
    Vector3,
    Box3,
    Mesh,
    type Texture,
    type MeshStandardMaterial,
} from 'three/webgpu';
import { DIVEScene } from 'src/engine/scene/Scene.ts';
import { DIVEGeometry } from '../../../types/geometry/DIVEGeometry.ts';
import { DIVEMaterial } from '../../../types/material/DIVEMaterial.ts';
import { DIVEGeometryType } from '../../../types/geometry/DIVEGeometryType.ts';

const RaycasterIntersectObjectMock = vi.fn().mockReturnValue([]);

vi.mock('three', async () => {
    const actual = await vi.importActual<typeof import('three')>('three');

    const Raycaster = vi.fn(function (this: any) {
        this.layers = { mask: 0 };
        this.intersectObjects = RaycasterIntersectObjectMock;
        return this;
    });

    return {
        ...actual,
        Raycaster,
    };
});

let primitive: DIVEPrimitive;

describe('dive/primitive/DIVEPrimitive', () => {
    beforeEach(() => {
        primitive = new DIVEPrimitive();
        RaycasterIntersectObjectMock.mockReturnValue([]);
        vi.spyOn(primitive, 'updateWorldMatrix').mockImplementation(() => {});
        vi.spyOn(primitive, 'getWorldPosition').mockImplementation(
            (target?: Vector3) => {
                if (target) return target.copy(primitive.position);
                return primitive.position.clone();
            },
        );
    });

    afterEach(() => {
        RaycasterIntersectObjectMock.mockReset();
        vi.restoreAllMocks();
    });

    it('should instantiate', () => {
        expect(primitive).toBeDefined();
    });

    it('should set geometry', () => {
        vi.spyOn(console, 'warn');
        const geometry = {
            name: 'cube' as DIVEGeometryType,
            width: 1,
            height: 1,
            depth: 1,
        } as DIVEGeometry;
        expect(() => primitive.setGeometry(geometry)).not.toThrow();
        expect(console.warn).not.toHaveBeenCalled();
    });

    it('should warn when geometry is invalid', () => {
        vi.spyOn(console, 'warn').mockImplementation(() => {});
        const geometry = {
            name: 'INVALID' as DIVEGeometryType,
        } as DIVEGeometry;
        expect(() => primitive.setGeometry(geometry)).not.toThrow();
        expect(console.warn).toHaveBeenCalled();
    });

    it('should place on floor', async () => {
        const onTransform = vi.fn();
        primitive.addEventListener('object-transform', onTransform);

        // ensure placeOnFloor uses a gltf reference
        (primitive as any)['_gltf'] = primitive;

        primitive.userData.id = 'something';
        primitive.position.set(0, 4, 0);

        vi.spyOn(Box3.prototype, 'expandByObject').mockImplementationOnce(
            function (this: Box3) {
                this.min.set(0, -2, 0);
                this.max.set(0, 2, 0);
                return this;
            },
        );

        const scene = {
            parent: null,
            root: {
                children: [primitive],
            },
        } as unknown as DIVEScene;
        scene.root.parent = scene;
        primitive.parent = scene.root;
        (scene.root as any).worldToLocal = (v: Vector3) => v;
        (scene.root as any).updateWorldMatrix = vi.fn();

        primitive.placeOnFloor();

        // exactly one report: the explicit dispatch beside onMove is gone
        expect(onTransform).toHaveBeenCalledTimes(1);
        expect(onTransform).toHaveBeenCalledWith(
            expect.objectContaining({
                position: expect.objectContaining({ y: 6 }),
            }),
        );
    });

    it('should drop it', async () => {
        // spied but not stubbed, so the real dispatch still happens
        const spy = vi.spyOn(primitive, 'onMove');

        const size = {
            x: 1,
            y: 1,
            z: 1,
        };

        primitive.userData.id = 'something';
        (primitive as any)['_gltf'] = primitive;
        primitive.position.set(0, 6, 0);

        const hitObject = new Mesh();
        RaycasterIntersectObjectMock.mockReturnValue([
            {
                object: hitObject,
            },
        ]);

        const expandByObjectSpy = vi.spyOn(Box3.prototype, 'expandByObject');
        const setFromObjectSpy = vi.spyOn(Box3.prototype, 'setFromObject');

        expandByObjectSpy.mockImplementationOnce(function (this: Box3) {
            this.min
                .set(-size.x / 2, -size.y / 2, -size.z / 2)
                .add(primitive.position);
            this.max
                .set(size.x / 2, size.y / 2, size.z / 2)
                .add(primitive.position);
            return this;
        });
        setFromObjectSpy.mockImplementationOnce(function (this: Box3) {
            this.min.set(0, 0, 0);
            this.max.set(0, 2, 0);
            return this;
        });

        const scene = {
            parent: null,
            root: {
                children: [primitive],
            },
        } as unknown as DIVEScene;
        scene.root.parent = scene;
        (scene.root as any).worldToLocal = (v: Vector3) => v;
        (scene.root as any).updateWorldMatrix = vi.fn();

        // test when parent is not set
        console.warn = vi.fn();
        expect(() => primitive.dropIt()).not.toThrow();
        expect(console.warn).toHaveBeenCalledTimes(1);

        primitive.parent = scene.root;

        const onTransform = vi.fn();
        primitive.addEventListener('object-transform', onTransform);
        expect(() => primitive.dropIt()).not.toThrow();
        expect(onTransform).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledTimes(1);

        // second drop with zero delta -> no move
        expandByObjectSpy.mockImplementationOnce(function (this: Box3) {
            this.min
                .set(-size.x / 2, -size.y / 2, -size.z / 2)
                .add(primitive.position);
            this.max
                .set(size.x / 2, size.y / 2, size.z / 2)
                .add(primitive.position);
            return this;
        });
        setFromObjectSpy.mockImplementationOnce(function (this: Box3) {
            this.min.set(0, 0, 0);
            this.max.set(0, primitive.position.y - 0.5, 0);
            return this;
        });
        expect(() => primitive.dropIt()).not.toThrow();
        expect(spy).toHaveBeenCalledTimes(1);

        // third drop with movement again
        primitive.position.y = 2;
        expandByObjectSpy.mockImplementationOnce(function (this: Box3) {
            this.min
                .set(-size.x / 2, -size.y / 2, -size.z / 2)
                .add(primitive.position);
            this.max
                .set(size.x / 2, size.y / 2, size.z / 2)
                .add(primitive.position);
            return this;
        });
        setFromObjectSpy.mockImplementationOnce(function (this: Box3) {
            this.min.set(0, 0, 0);
            this.max.set(0, 2, 0);
            return this;
        });
        expect(() => primitive.dropIt()).not.toThrow();
        expect(spy).toHaveBeenCalledTimes(2);
    });

    it('should set geometry', () => {
        primitive.userData.id = 'something';

        // cylinder
        const cylinder = {
            name: 'cylinder',
            width: 1,
            height: 1.5,
            depth: 1,
        } as DIVEGeometry;
        expect(() => primitive.setGeometry(cylinder)).not.toThrow();

        // sphere
        const sphere = {
            name: 'sphere',
            width: 1,
            height: 1,
            depth: 1,
        } as DIVEGeometry;
        expect(() => primitive.setGeometry(sphere)).not.toThrow();

        // pyramid
        const pyramid = {
            name: 'pyramid',
            width: 1,
            height: 1.5,
            depth: 1,
        } as DIVEGeometry;
        expect(() => primitive.setGeometry(pyramid)).not.toThrow();

        // box
        const box = {
            name: 'box',
            width: 1,
            height: 1,
            depth: 1,
        } as DIVEGeometry;
        expect(() => primitive.setGeometry(box)).not.toThrow();

        // cone
        const cone = {
            name: 'cone',
            width: 1,
            height: 1.5,
            depth: 1,
        } as DIVEGeometry;
        expect(() => primitive.setGeometry(cone)).not.toThrow();

        // wall
        const wall = {
            name: 'wall',
            width: 1,
            height: 1.5,
            depth: 0.1,
        } as DIVEGeometry;
        expect(() => primitive.setGeometry(wall)).not.toThrow();

        const wallWithoutDepth = {
            name: 'wall',
            width: 1,
            height: 1.5,
        } as DIVEGeometry;
        expect(() => primitive.setGeometry(wallWithoutDepth)).not.toThrow();

        // plane
        const plane = {
            name: 'plane',
            width: 1,
            height: 0.1,
            depth: 1,
        } as DIVEGeometry;
        expect(() => primitive.setGeometry(plane)).not.toThrow();
    });

    it('should set material', () => {
        const material = primitive['_mesh'].material as MeshStandardMaterial;

        // apply invalid material should not crash
        expect(() => primitive.setMaterial({} as DIVEMaterial)).not.toThrow();
        expect(material).toBeDefined();

        expect(() =>
            primitive.setMaterial({
                color: 0xffffff,
                roughness: 0,
                metalness: 1,
            } as DIVEMaterial),
        ).not.toThrow();
        expect((material as MeshStandardMaterial).roughness).toBe(0);
        expect((material as MeshStandardMaterial).roughnessMap).toBeNull();
        expect((material as MeshStandardMaterial).metalness).toBe(1);
        expect((material as MeshStandardMaterial).metalnessMap).toBeNull();

        expect(() =>
            primitive.setMaterial({
                color: 0xff00ff,
                vertexColors: true,
                map: 'This_Is_A_Texture' as unknown as Texture,
                normalMap: 'This_Is_A_Texture' as unknown as Texture,
                roughness: 0,
                roughnessMap: 'This_Is_A_Texture' as unknown as Texture,
                metalness: 1,
                metalnessMap: 'This_Is_A_Texture' as unknown as Texture,
            } as DIVEMaterial),
        ).not.toThrow();
        expect((material as MeshStandardMaterial).roughness).toBe(1.0);
        expect((material as MeshStandardMaterial).roughnessMap).toBeDefined();
        expect((material as MeshStandardMaterial).metalness).toBe(1.0);
        expect((material as MeshStandardMaterial).metalnessMap).toBeDefined();
    });

    it.skip('should handle placeOnFloor with no mesh or geometry', () => {
        primitive.userData.id = 'something';

        // Test with no geometry
        (primitive['_mesh'].geometry as unknown) = null;
        expect(() => primitive.placeOnFloor()).not.toThrow();

        // Test with no mesh
        (primitive['_mesh'] as unknown) = null;
        expect(() => primitive.placeOnFloor()).not.toThrow();
    });

    it('should handle placeOnFloor when position does not change', async () => {
        primitive.userData.id = 'something';
        (primitive as any)['_gltf'] = primitive;

        vi.spyOn(Box3.prototype, 'expandByObject').mockImplementationOnce(
            function (this: Box3) {
                this.min.set(0, 0, 0);
                this.max.set(0, 0, 0);
                return this;
            },
        );

        const onTransform = vi.fn();
        primitive.addEventListener('object-transform', onTransform);

        primitive.placeOnFloor();
        expect(onTransform).not.toHaveBeenCalled();
    });

    it('should set material with all properties', () => {
        const material = {
            vertexColors: true,
            color: 0xff0000,
            map: {} as Texture,
            normalMap: {} as Texture,
            roughness: 0.5,
            roughnessMap: {} as Texture,
            metalness: 0.7,
            metalnessMap: {} as Texture,
        };

        primitive.setMaterial(material);

        const primitiveMaterial = primitive['_mesh']
            .material as MeshStandardMaterial;
        expect(primitiveMaterial.vertexColors).toBe(true);
        expect(primitiveMaterial.color.getHex()).toBe(0xff0000);
        expect(primitiveMaterial.map).toBeDefined();
        expect(primitiveMaterial.normalMap).toBeDefined();
        expect(primitiveMaterial.roughness).toBe(1.0); // Should be 1.0 because roughnessMap is set
        expect(primitiveMaterial.roughnessMap).toBeDefined();
        expect(primitiveMaterial.metalness).toBe(1.0); // Should be 1.0 because metalnessMap is set
        expect(primitiveMaterial.metalnessMap).toBeDefined();
    });
});
