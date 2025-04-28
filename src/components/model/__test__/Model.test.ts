import { RaycasterIntersectObjectMock } from '../../../../__mocks__/three';

import { DIVEModel } from '../Model';
import { State } from '../../../modules/state/State';
import { DIVEScene } from '../../../engine/scene/Scene';
import {
    Vector3,
    Box3,
    Mesh,
    MeshStandardMaterial,
    type Texture,
    Object3D,
} from 'three';
import { type COMMaterial } from '../../../modules/state/types';

jest.mock('../../../modules/state/State.ts', () => {
    return {
        State: {
            get: jest.fn(() => {
                return {
                    PerformAction: jest.fn(),
                };
            }),
        },
    };
});

const object = new Object3D();
object.children.push(new Mesh());

jest.spyOn(State, 'get').mockReturnValue({
    PerformAction: jest.fn(),
} as unknown as State);

let model: DIVEModel;

describe('dive/model/DIVEModel', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        RaycasterIntersectObjectMock.mockClear();
        model = new DIVEModel();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should instantiate', () => {
        expect(model).toBeDefined();
    });

    it('should set model', () => {
        expect(() => model.SetModel(object)).not.toThrow();
    });

    it('should place on floor', () => {
        model.SetModel(object);

        const com = State.get('id')!;
        const spyPerformAction = jest.spyOn(com, 'PerformAction');

        model.userData.id = 'something';
        model.position.set(0, 4, 0);

        jest.spyOn(model['_mesh']!, 'localToWorld').mockReturnValueOnce(
            new Vector3(0, 2, 0),
        );

        const scene = {
            parent: null,
            Root: {
                children: [
                    model,
                ],
            },
        } as unknown as DIVEScene;
        scene.Root.parent = scene;
        model.parent = scene.Root;

        expect(() => model.PlaceOnFloor()).not.toThrow();
        expect(spyPerformAction).toHaveBeenCalledWith(
            'UPDATE_OBJECT',
            expect.objectContaining({
                position: expect.objectContaining({
                    y: 2,
                }),
            }),
        );
    });

    it('should drop it', () => {
        const comMock = {
            PerformAction: jest.fn(),
        } as unknown as State;
        jest.spyOn(State, 'get').mockReturnValue(comMock);

        const spy = jest.spyOn(model, 'onMove').mockImplementation(() => {});

        const size = {
            x: 1,
            y: 1,
            z: 1,
        };

        model.userData.id = 'something';
        model.position.set(0, 4, 0);
        model['_boundingBox'] = {
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
                    model,
                ],
            },
        } as unknown as DIVEScene;
        scene.Root.parent = scene;

        // test when parent is not set
        console.warn = jest.fn();
        expect(() => model.DropIt()).not.toThrow();
        expect(console.warn).toHaveBeenCalledTimes(1);

        model.parent = scene.Root;

        expect(() => model.DropIt()).not.toThrow();
        expect(model.position.y).toBe(2.5);
        expect(spy).toHaveBeenCalledTimes(1);

        expect(() => model.DropIt()).not.toThrow();
        expect(spy).toHaveBeenCalledTimes(1);

        // alter position so onMove will be called again
        model.position.y = 2;
        jest.spyOn(State, 'get').mockReturnValueOnce(undefined);
        expect(() => model.DropIt()).not.toThrow();
        expect(spy).toHaveBeenCalledTimes(2);
    });

    it('should set material', () => {
        // apply invalid material should not crash
        expect(() => model.SetMaterial({} as COMMaterial)).not.toThrow();
        expect(model['_material']).not.toBeNull();

        expect(() =>
            model.SetMaterial({
                color: 0xffffff,
                roughness: 0,
                metalness: 1,
            } as COMMaterial),
        ).not.toThrow();
        expect((model['_material'] as MeshStandardMaterial).roughness).toBe(0);
        expect(
            (model['_material'] as MeshStandardMaterial).roughnessMap,
        ).toBeUndefined();
        expect((model['_material'] as MeshStandardMaterial).metalness).toBe(1);
        expect(
            (model['_material'] as MeshStandardMaterial).metalnessMap,
        ).toBeUndefined();

        expect(() =>
            model.SetMaterial({
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
        expect((model['_material'] as MeshStandardMaterial).roughness).toBe(1);
        expect(
            (model['_material'] as MeshStandardMaterial).roughnessMap,
        ).toBeDefined();
        expect((model['_material'] as MeshStandardMaterial).metalness).toBe(1);
        expect(
            (model['_material'] as MeshStandardMaterial).metalnessMap,
        ).toBeDefined();
    });

    it('should set model material when material already set before', () => {
        model.SetMaterial({ roughness: 0.5 } as COMMaterial);
        expect(() => model.SetModel(object)).not.toThrow();
        expect(
            (model['_mesh']?.material as MeshStandardMaterial).roughness,
        ).toBe(0.5);
    });

    it('should set material to model when model already set before', () => {
        model.SetModel(object);
        expect(() =>
            model.SetMaterial({ roughness: 0.5 } as COMMaterial),
        ).not.toThrow();
        expect(
            (model['_mesh']?.material as MeshStandardMaterial).roughness,
        ).toBe(0.5);
    });

    it('should handle PlaceOnFloor with no mesh or geometry', () => {
        model.userData.id = 'something';
        expect(() => model.PlaceOnFloor()).not.toThrow();

        // Set mesh but no geometry
        model['_mesh'] = new Mesh();
        expect(() => model.PlaceOnFloor()).not.toThrow();
    });

    it('should handle PlaceOnFloor when position does not change', () => {
        model.SetModel(object);
        model.userData.id = 'something';

        // Mock localToWorld to return same Y value as current position
        jest.spyOn(model['_mesh']!, 'localToWorld').mockReturnValueOnce(
            new Vector3(0, model.position.y, 0),
        );

        const com = State.get('id')!;
        const spyPerformAction = jest.spyOn(com, 'PerformAction');

        model.PlaceOnFloor();
        expect(spyPerformAction).not.toHaveBeenCalled();
    });

    it('should handle SetMaterial with null material and mesh', () => {
        // Test with null material and mesh
        (model['_material'] as unknown) = null;
        (model['_mesh'] as unknown) = null;
        expect(() => model.SetMaterial({ roughness: 0.5 })).not.toThrow();

        // Verify new material was created
        expect(model['_material']).toBeInstanceOf(MeshStandardMaterial);
        expect((model['_material'] as MeshStandardMaterial).roughness).toBe(
            0.5,
        );
    });
});
