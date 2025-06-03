import { RaycasterIntersectObjectMock } from '../../../../__mocks__/three.ts';

import { DIVEModel } from '../Model.ts';
import { DIVEScene } from '../../../engine/scene/Scene.ts';
import {
    Vector3,
    Box3,
    Mesh,
    MeshStandardMaterial,
    type Texture,
    Object3D,
} from 'three';
import { type MaterialSchema } from '@shopware-ag/dive';

vi.mock('@shopware-ag/dive/state', () => ({
    State: {
        get: vi.fn().mockReturnValue({
            performAction: vi.fn(),
        }),
    },
}));

const object = new Object3D();
object.children.push(new Mesh());

let model: DIVEModel;

describe('dive/model/DIVEModel', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        RaycasterIntersectObjectMock.mockClear();
        model = new DIVEModel();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should instantiate', () => {
        expect(model).toBeDefined();
    });

    it('should set model', () => {
        expect(() => model.setFromGLTF(object)).not.toThrow();
    });

    it('should place on floor', async () => {
        const State = await import('@shopware-ag/dive/state').then(
            ({ State }) => State,
        );

        model.setFromGLTF(object);

        const com = State.get('id')!;
        const spyperformAction = vi.spyOn(com, 'performAction');

        model.userData.id = 'something';
        model.position.set(0, 4, 0);

        vi.spyOn(model['_mesh']!, 'localToWorld').mockReturnValueOnce(
            new Vector3(0, 2, 0),
        );

        const scene = {
            parent: null,
            root: {
                children: [
                    model,
                ],
            },
        } as unknown as DIVEScene;
        scene.root.parent = scene;
        model.parent = scene.root;

        model.placeOnFloor();
        await new Promise(setImmediate);
        expect(spyperformAction).toHaveBeenCalledWith(
            'UPDATE_OBJECT',
            expect.objectContaining({
                position: expect.objectContaining({
                    y: 2,
                }),
            }),
        );
    });

    it('should drop it', async () => {
        const State = await import('@shopware-ag/dive/state').then(
            ({ State }) => State,
        );

        const spy = vi.spyOn(model, 'onMove').mockImplementation(() => {});

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
            getCenter: vi.fn(() => {
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
            root: {
                children: [
                    model,
                ],
            },
        } as unknown as DIVEScene;
        scene.root.parent = scene;

        // test when parent is not set
        console.warn = vi.fn();
        expect(() => model.dropIt()).not.toThrow();
        expect(console.warn).toHaveBeenCalledTimes(1);

        model.parent = scene.root;

        expect(() => model.dropIt()).not.toThrow();
        expect(model.position.y).toBe(2.5);
        expect(spy).toHaveBeenCalledTimes(1);

        expect(() => model.dropIt()).not.toThrow();
        expect(spy).toHaveBeenCalledTimes(1);

        // alter position so onMove will be called again
        model.position.y = 2;
        vi.spyOn(State, 'get').mockReturnValueOnce(undefined);
        expect(() => model.dropIt()).not.toThrow();
        expect(spy).toHaveBeenCalledTimes(2);
    });

    it('should set material', () => {
        // apply invalid material should not crash
        expect(() => model.setMaterial({} as MaterialSchema)).not.toThrow();
        expect(model['_material']).not.toBeNull();

        expect(() =>
            model.setMaterial({
                color: 0xffffff,
                roughness: 0,
                metalness: 1,
            } as MaterialSchema),
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
            model.setMaterial({
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
        model.setMaterial({ roughness: 0.5 } as MaterialSchema);
        expect(() => model.setFromGLTF(object)).not.toThrow();
        expect(
            (model['_mesh']?.material as MeshStandardMaterial).roughness,
        ).toBe(0.5);
    });

    it('should set material to model when model already set before', () => {
        model.setFromGLTF(object);
        expect(() =>
            model.setMaterial({ roughness: 0.5 } as MaterialSchema),
        ).not.toThrow();
        expect(
            (model['_mesh']?.material as MeshStandardMaterial).roughness,
        ).toBe(0.5);
    });

    it('should handle placeOnFloor with no mesh or geometry', () => {
        model.userData.id = 'something';
        expect(() => model.placeOnFloor()).not.toThrow();

        // Set mesh but no geometry
        model['_mesh'] = new Mesh();
        expect(() => model.placeOnFloor()).not.toThrow();
    });

    it('should handle placeOnFloor when position does not change', async () => {
        const State = await import('@shopware-ag/dive/state').then(
            ({ State }) => State,
        );

        model.setFromGLTF(object);
        model.userData.id = 'something';

        // Mock localToWorld to return same Y value as current position
        vi.spyOn(model['_mesh']!, 'localToWorld').mockReturnValueOnce(
            new Vector3(0, model.position.y, 0),
        );

        const com = State.get('id')!;
        const spyperformAction = vi.spyOn(com, 'performAction');

        model.placeOnFloor();
        expect(spyperformAction).not.toHaveBeenCalled();
    });

    it('should handle setMaterial with null material and mesh', () => {
        // Test with null material and mesh
        (model['_material'] as unknown) = null;
        (model['_mesh'] as unknown) = null;
        expect(() =>
            model.setMaterial({ roughness: 0.5 } as MaterialSchema),
        ).not.toThrow();

        // Verify new material was created
        expect(model['_material']).toBeInstanceOf(MeshStandardMaterial);
        expect((model['_material'] as MeshStandardMaterial).roughness).toBe(
            0.5,
        );
    });
});
