import { DIVEPrimitive } from '../Primitive';
import { DIVECommunication } from '../../../com/Communication';
import {
    Vector3,
    Box3,
    Mesh,
    type Texture,
    type MeshStandardMaterial,
} from 'three';
import type { DIVEScene } from '../../../engine/scene/Scene';
import {
    type COMMaterial,
    type COMGeometry,
    type COMGeometryType,
} from '../../../com/types/index.ts';
import { RaycasterIntersectObjectMock } from '../../../../__mocks__/three';

jest.mock('../../../com/Communication.ts', () => {
    return {
        DIVECommunication: {
            get: jest.fn(() => {
                return {
                    PerformAction: jest.fn(),
                };
            }),
        },
    };
});

jest.spyOn(DIVECommunication, 'get').mockReturnValue({
    PerformAction: jest.fn(),
} as unknown as DIVECommunication);

let primitive: DIVEPrimitive;

describe('dive/primitive/DIVEPrimitive', () => {
    beforeEach(() => {
        primitive = new DIVEPrimitive();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should instantiate', () => {
        expect(primitive).toBeDefined();
    });

    it('should set geometry', () => {
        jest.spyOn(console, 'warn');
        const geometry = {
            name: 'cube' as COMGeometryType,
        } as COMGeometry;
        expect(() => primitive.SetGeometry(geometry)).not.toThrow();
        expect(console.warn).not.toHaveBeenCalled();
    });

    it('should warn when geometry is invalid', () => {
        jest.spyOn(console, 'warn').mockImplementation(() => {});
        const geometry = {
            name: 'INVALID' as COMGeometryType,
        } as COMGeometry;
        expect(() => primitive.SetGeometry(geometry)).not.toThrow();
        expect(console.warn).toHaveBeenCalled();
    });

    it('should place on floor', () => {
        const com = DIVECommunication.get('id')!;
        const spyPerformAction = jest.spyOn(com, 'PerformAction');

        jest.spyOn(primitive['_mesh']!, 'localToWorld').mockReturnValueOnce(
            new Vector3(0, 2, 0),
        );

        primitive.userData.id = 'something';
        primitive.position.set(0, 2, 0);
        primitive['_boundingBox'] = {
            min: new Vector3(0, -2, 0),
            setFromObject: jest.fn(),
        } as unknown as Box3;

        const scene = {
            parent: null,
            Root: {
                children: [
                    primitive,
                ],
            },
        } as unknown as DIVEScene;
        scene.Root.parent = scene;

        primitive.parent = scene.Root;

        expect(() => primitive.PlaceOnFloor()).not.toThrow();
        expect(spyPerformAction).toHaveBeenCalledWith(
            'UPDATE_OBJECT',
            expect.objectContaining({
                position: expect.objectContaining({
                    y: 0,
                }),
            }),
        );
    });

    it('should drop it', () => {
        const comMock = {
            PerformAction: jest.fn(),
        } as unknown as DIVECommunication;
        jest.spyOn(DIVECommunication, 'get').mockReturnValue(comMock);

        const spy = jest
            .spyOn(primitive, 'onMove')
            .mockImplementation(() => {});

        const size = {
            x: 1,
            y: 1,
            z: 1,
        };

        primitive.userData.id = 'something';
        primitive.position.set(0, 4, 0);
        primitive['_boundingBox'] = {
            min: new Vector3(-size.x / 2, -size.y / 2, -size.z / 2),
            max: new Vector3(size.x / 2, size.y / 2, size.z / 2),
            getCenter: jest.fn(() => {
                return new Vector3(0, 0, 0);
            }),
        } as unknown as Box3;

        const hitObject = new Mesh();
        hitObject.geometry.boundingBox = new Box3();
        hitObject.geometry.boundingBox.max = new Vector3(0, 2, 0);
        RaycasterIntersectObjectMock.mockReturnValue([
            {
                object: hitObject,
            },
        ]);

        const scene = {
            parent: null,
            Root: {
                children: [
                    primitive,
                ],
            },
        } as unknown as DIVEScene;
        scene.Root.parent = scene;

        // test when parent is not set
        console.warn = jest.fn();
        expect(() => primitive.DropIt()).not.toThrow();
        expect(console.warn).toHaveBeenCalledTimes(1);

        primitive.parent = scene.Root;

        expect(() => primitive.DropIt()).not.toThrow();
        expect(primitive.position.y).toBe(2.5);
        expect(spy).toHaveBeenCalledTimes(1);

        expect(() => primitive.DropIt()).not.toThrow();
        expect(spy).toHaveBeenCalledTimes(1);

        // alter position so onMove will be called again
        primitive.position.y = 2;
        jest.spyOn(DIVECommunication, 'get').mockReturnValueOnce(undefined);
        expect(() => primitive.DropIt()).not.toThrow();
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
        } as COMGeometry;
        expect(() => primitive.SetGeometry(cylinder)).not.toThrow();

        // sphere
        const sphere = {
            name: 'sphere',
            width: 1,
            height: 1,
            depth: 1,
        } as COMGeometry;
        expect(() => primitive.SetGeometry(sphere)).not.toThrow();

        // pyramid
        const pyramid = {
            name: 'pyramid',
            width: 1,
            height: 1.5,
            depth: 1,
        } as COMGeometry;
        expect(() => primitive.SetGeometry(pyramid)).not.toThrow();

        // box
        const box = {
            name: 'box',
            width: 1,
            height: 1,
            depth: 1,
        } as COMGeometry;
        expect(() => primitive.SetGeometry(box)).not.toThrow();

        // cone
        const cone = {
            name: 'cone',
            width: 1,
            height: 1.5,
            depth: 1,
        } as COMGeometry;
        expect(() => primitive.SetGeometry(cone)).not.toThrow();

        // wall
        const wall = {
            name: 'wall',
            width: 1,
            height: 1.5,
            depth: 0.1,
        } as COMGeometry;
        expect(() => primitive.SetGeometry(wall)).not.toThrow();

        const wallWithoutDepth = {
            name: 'wall',
            width: 1,
            height: 1.5,
        } as COMGeometry;
        expect(() => primitive.SetGeometry(wallWithoutDepth)).not.toThrow();

        // plane
        const plane = {
            name: 'plane',
            width: 1,
            height: 0.1,
            depth: 1,
        } as COMGeometry;
        expect(() => primitive.SetGeometry(plane)).not.toThrow();
    });

    it('should set material', () => {
        const material = primitive['_mesh'].material as MeshStandardMaterial;

        // apply invalid material should not crash
        expect(() => primitive.SetMaterial({} as COMMaterial)).not.toThrow();
        expect(material).toBeDefined();

        expect(() =>
            primitive.SetMaterial({
                color: 0xffffff,
                roughness: 0,
                metalness: 1,
            } as COMMaterial),
        ).not.toThrow();
        expect((material as MeshStandardMaterial).roughness).toBe(0);
        expect((material as MeshStandardMaterial).roughnessMap).toBeUndefined();
        expect((material as MeshStandardMaterial).metalness).toBe(1);
        expect((material as MeshStandardMaterial).metalnessMap).toBeUndefined();

        expect(() =>
            primitive.SetMaterial({
                color: 0xff00ff,
                vertexColors: true,
                map: 'This_Is_A_Texture' as unknown as Texture,
                normalMap: 'This_Is_A_Texture' as unknown as Texture,
                roughness: 0,
                roughnessMap: 'This_Is_A_Texture' as unknown as Texture,
                metalness: 1,
                metalnessMap: 'This_Is_A_Texture' as unknown as Texture,
            } as COMMaterial),
        ).not.toThrow();
        expect((material as MeshStandardMaterial).roughness).toBe(1);
        expect((material as MeshStandardMaterial).roughnessMap).toBeDefined();
        expect((material as MeshStandardMaterial).metalness).toBe(0);
        expect((material as MeshStandardMaterial).metalnessMap).toBeDefined();
    });
});
