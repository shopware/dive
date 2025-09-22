import { DIVEPrimitive } from '../Primitive.ts';
import {
    Vector3,
    Box3,
    Mesh,
    type Texture,
    type MeshStandardMaterial,
} from 'three';
import { RaycasterIntersectObjectMock } from '../../../../__mocks__/three.ts';
import { type State } from '@shopware-ag/dive/state';
import {
    type DIVEScene,
    type GeometryTypeSchema,
    type GeometrySchema,
    type MaterialSchema,
} from '@shopware-ag/dive';

vi.mock('@shopware-ag/dive/state', () => ({
    State: {
        get: vi.fn().mockReturnValue({
            performAction: vi.fn(),
        }),
    },
}));

let primitive: DIVEPrimitive;

describe('dive/primitive/DIVEPrimitive', () => {
    beforeEach(() => {
        primitive = new DIVEPrimitive();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should instantiate', () => {
        expect(primitive).toBeDefined();
    });

    it('should set geometry', () => {
        vi.spyOn(console, 'warn');
        const geometry = {
            name: 'cube' as GeometryTypeSchema,
        } as GeometrySchema;
        expect(() => primitive.setGeometry(geometry)).not.toThrow();
        expect(console.warn).not.toHaveBeenCalled();
    });

    it('should warn when geometry is invalid', () => {
        vi.spyOn(console, 'warn').mockImplementation(() => {});
        const geometry = {
            name: 'INVALID' as GeometryTypeSchema,
        } as GeometrySchema;
        expect(() => primitive.setGeometry(geometry)).not.toThrow();
        expect(console.warn).toHaveBeenCalled();
    });

    it('should place on floor', async () => {
        const State = await import('@shopware-ag/dive/state').then(
            ({ State }) => State,
        );

        const com = State.get('id')!;
        const spyperformAction = vi.spyOn(com, 'performAction');

        // ensure placeOnFloor uses a gltf reference
        (primitive as any)['_gltf'] = primitive;

        primitive.userData.id = 'something';
        primitive.position.set(0, 4, 0);

        (Box3 as any).mockImplementationOnce(function (this: any) {
            this.min = new Vector3(0, -2, 0);
            this.max = new Vector3(0, 2, 0);
            this.getCenter = vi.fn(() => new Vector3());
            this.setFromObject = vi.fn(() => this);
            return this;
        });

        const scene = {
            parent: null,
            root: {
                children: [
                    primitive,
                ],
            },
        } as unknown as DIVEScene;
        scene.root.parent = scene;
        primitive.parent = scene.root;
        (scene.root as any).worldToLocal = (v: Vector3) => v;

        primitive.placeOnFloor();
        await new Promise(setImmediate);
        expect(spyperformAction).toHaveBeenCalledWith(
            'UPDATE_OBJECT',
            expect.objectContaining({
                position: expect.objectContaining({
                    y: 6,
                }),
            }),
        );
    });

    it('should drop it', async () => {
        const State = await import('@shopware-ag/dive/state').then(
            ({ State }) => State,
        );

        const spy = vi.spyOn(primitive, 'onMove').mockImplementation(() => {});

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

        // prepare Box3 mocks AFTER mesh construction
        (Box3 as any)
            .mockImplementationOnce(function (this: any) {
                (this.min = new Vector3(
                    -size.x / 2,
                    -size.y / 2,
                    -size.z / 2,
                )).add(primitive.position);
                (this.max = new Vector3(
                    size.x / 2,
                    size.y / 2,
                    size.z / 2,
                )).add(primitive.position);
                this.getCenter = vi.fn(() => new Vector3());
                this.setFromObject = vi.fn(() => this);
                return this;
            })
            .mockImplementationOnce(function (this: any) {
                this.min = new Vector3(0, 0, 0);
                this.max = new Vector3(0, 2, 0);
                this.getCenter = vi.fn(() => new Vector3());
                this.setFromObject = vi.fn(() => this);
                return this;
            });

        const scene = {
            parent: null,
            root: {
                children: [
                    primitive,
                ],
            },
        } as unknown as DIVEScene;
        scene.root.parent = scene;
        (scene.root as any).worldToLocal = (v: Vector3) => v;

        // test when parent is not set
        console.warn = vi.fn();
        expect(() => primitive.dropIt()).not.toThrow();
        expect(console.warn).toHaveBeenCalledTimes(1);

        primitive.parent = scene.root;

        const com = State.get('id')!;
        const spyPerform = vi.spyOn(com, 'performAction');
        expect(() => primitive.dropIt()).not.toThrow();
        await new Promise(setImmediate);
        expect(spyPerform).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);

        // second drop with zero delta -> no move
        (Box3 as any)
            .mockImplementationOnce(function (this: any) {
                const size = { x: 1, y: 1, z: 1 };
                (this.min = new Vector3(
                    -size.x / 2,
                    -size.y / 2,
                    -size.z / 2,
                )).add(primitive.position);
                (this.max = new Vector3(
                    size.x / 2,
                    size.y / 2,
                    size.z / 2,
                )).add(primitive.position);
                this.getCenter = vi.fn(() => new Vector3());
                this.setFromObject = vi.fn(() => this);
                return this;
            })
            .mockImplementationOnce(function (this: any) {
                this.min = new Vector3(0, 0, 0);
                this.max = new Vector3(0, primitive.position.y - 0.5, 0);
                this.getCenter = vi.fn(() => new Vector3());
                this.setFromObject = vi.fn(() => this);
                return this;
            });
        expect(() => primitive.dropIt()).not.toThrow();
        expect(spy).toHaveBeenCalledTimes(1);

        // third drop with movement again
        primitive.position.y = 2;
        (Box3 as any)
            .mockImplementationOnce(function (this: any) {
                const size = { x: 1, y: 1, z: 1 };
                (this.min = new Vector3(
                    -size.x / 2,
                    -size.y / 2,
                    -size.z / 2,
                )).add(primitive.position);
                (this.max = new Vector3(
                    size.x / 2,
                    size.y / 2,
                    size.z / 2,
                )).add(primitive.position);
                this.getCenter = vi.fn(() => new Vector3());
                this.setFromObject = vi.fn(() => this);
                return this;
            })
            .mockImplementationOnce(function (this: any) {
                this.min = new Vector3(0, 0, 0);
                this.max = new Vector3(0, 2, 0);
                this.getCenter = vi.fn(() => new Vector3());
                this.setFromObject = vi.fn(() => this);
                return this;
            });
        vi.spyOn(State, 'get').mockReturnValueOnce(undefined as any);
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
        } as GeometrySchema;
        expect(() => primitive.setGeometry(cylinder)).not.toThrow();

        // sphere
        const sphere = {
            name: 'sphere',
            width: 1,
            height: 1,
            depth: 1,
        } as GeometrySchema;
        expect(() => primitive.setGeometry(sphere)).not.toThrow();

        // pyramid
        const pyramid = {
            name: 'pyramid',
            width: 1,
            height: 1.5,
            depth: 1,
        } as GeometrySchema;
        expect(() => primitive.setGeometry(pyramid)).not.toThrow();

        // box
        const box = {
            name: 'box',
            width: 1,
            height: 1,
            depth: 1,
        } as GeometrySchema;
        expect(() => primitive.setGeometry(box)).not.toThrow();

        // cone
        const cone = {
            name: 'cone',
            width: 1,
            height: 1.5,
            depth: 1,
        } as GeometrySchema;
        expect(() => primitive.setGeometry(cone)).not.toThrow();

        // wall
        const wall = {
            name: 'wall',
            width: 1,
            height: 1.5,
            depth: 0.1,
        } as GeometrySchema;
        expect(() => primitive.setGeometry(wall)).not.toThrow();

        const wallWithoutDepth = {
            name: 'wall',
            width: 1,
            height: 1.5,
        } as GeometrySchema;
        expect(() => primitive.setGeometry(wallWithoutDepth)).not.toThrow();

        // plane
        const plane = {
            name: 'plane',
            width: 1,
            height: 0.1,
            depth: 1,
        } as GeometrySchema;
        expect(() => primitive.setGeometry(plane)).not.toThrow();
    });

    it('should set material', () => {
        const material = primitive['_mesh'].material as MeshStandardMaterial;

        // apply invalid material should not crash
        expect(() => primitive.setMaterial({} as MaterialSchema)).not.toThrow();
        expect(material).toBeDefined();

        expect(() =>
            primitive.setMaterial({
                color: 0xffffff,
                roughness: 0,
                metalness: 1,
            } as MaterialSchema),
        ).not.toThrow();
        expect((material as MeshStandardMaterial).roughness).toBe(0);
        expect((material as MeshStandardMaterial).roughnessMap).toBeUndefined();
        expect((material as MeshStandardMaterial).metalness).toBe(1);
        expect((material as MeshStandardMaterial).metalnessMap).toBeUndefined();

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
            } as MaterialSchema),
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
        const State = await import('@shopware-ag/dive/state').then(
            ({ State }) => State,
        );

        primitive.userData.id = 'something';
        (primitive as any)['_gltf'] = primitive;

        (Box3 as any).mockImplementationOnce(function (this: any) {
            this.min = new Vector3(0, 0, 0);
            this.max = new Vector3(0, 0, 0);
            this.getCenter = vi.fn(() => new Vector3());
            this.setFromObject = vi.fn(() => this);
            return this;
        });

        const comMock = {
            performAction: vi.fn(),
        } as unknown as State;
        vi.spyOn(State, 'get').mockReturnValue(comMock);

        primitive.placeOnFloor();
        expect(comMock.performAction).not.toHaveBeenCalled();
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
