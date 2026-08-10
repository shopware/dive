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
