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
import { DIVENode } from '../../node/Node.ts';
import { type MaterialSchema } from '../../../types/schema/MaterialSchema.ts';

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

        (Box3 as any).mockImplementationOnce(function (this: any) {
            this.min = new Vector3(0, -2, 0);
            (this.max = new Vector3(0, 2, 0)),
                (this.getCenter = vi.fn(() => new Vector3()));
            this.expandByObject = vi.fn(() => this);
            this.setFromObject = vi.fn(() => this);
            return this;
        });

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

        vi.spyOn(DIVENode.prototype, 'setPosition').mockImplementationOnce(
            () => {},
        );
        const onMoveSpy = vi
            .spyOn(model, 'onMove')
            .mockImplementation(() => {});
        model.placeOnFloor();
        await new Promise(setImmediate);
        expect(spyperformAction).toHaveBeenCalledWith(
            'UPDATE_OBJECT',
            expect.objectContaining({
                position: expect.objectContaining({
                    y: 6,
                }),
            }),
        );
        expect(onMoveSpy).toHaveBeenCalledTimes(1);
    });

    it('should drop it', async () => {
        const State = await import('@shopware-ag/dive/state').then(
            ({ State }) => State,
        );

        const spyOnMove = vi
            .spyOn(model, 'onMove')
            .mockImplementation(() => {});

        const size = {
            x: 1,
            y: 1,
            z: 1,
        };

        model.userData.id = 'something';
        model.setFromGLTF(object);
        model.position.set(0, 6, 0);

        const hitObject = new Mesh();
        RaycasterIntersectObjectMock.mockReturnValue([
            {
                object: hitObject,
            },
        ]);

        // prepare Box3 mocks AFTER mesh construction (mesh constructor creates its own Box3)
        (Box3 as any)
            .mockImplementationOnce(function (this: any) {
                (this.min = new Vector3(
                    -size.x / 2,
                    -size.y / 2,
                    -size.z / 2,
                )).add(model.position);
                (this.max = new Vector3(
                    size.x / 2,
                    size.y / 2,
                    size.z / 2,
                )).add(model.position);
                this.getCenter = vi.fn(() => new Vector3());
                this.expandByObject = vi.fn(() => this);
                this.setFromObject = vi.fn(() => this);
                return this;
            })
            .mockImplementationOnce(function (this: any) {
                this.min = new Vector3(0, 0, 0);
                this.max = new Vector3(0, 2, 0);
                this.getCenter = vi.fn(() => new Vector3());
                this.expandByObject = vi.fn(() => this);
                this.setFromObject = vi.fn(() => this);
                return this;
            });

        const scene = {
            parent: null,
            root: {
                children: [
                    model,
                ],
            },
        } as unknown as DIVEScene;
        scene.root.parent = scene;
        // ensure worldToLocal exists and is identity so setPosition works
        (scene.root as any).worldToLocal = (v: Vector3) => v;

        // test when parent is not set
        console.warn = vi.fn();
        expect(() => model.dropIt()).not.toThrow();
        expect(console.warn).toHaveBeenCalledTimes(1);

        model.parent = scene.root;

        // first drop with movement
        const com = State.get('id')!;
        const spyPerform = vi.spyOn(com, 'performAction');
        expect(() => model.dropIt()).not.toThrow();
        await new Promise(setImmediate);
        expect(spyPerform).toHaveBeenCalledWith(
            'UPDATE_OBJECT',
            expect.objectContaining({
                position: expect.objectContaining({ y: 2.5 }),
            }),
        );
        expect(spyOnMove).toHaveBeenCalledTimes(1);

        // second drop with zero delta -> no move
        (Box3 as any)
            .mockImplementationOnce(function (this: any) {
                // use updated position (2.5) to compute model box
                const size = { x: 1, y: 1, z: 1 };
                (this.min = new Vector3(
                    -size.x / 2,
                    -size.y / 2,
                    -size.z / 2,
                )).add(model.position);
                (this.max = new Vector3(
                    size.x / 2,
                    size.y / 2,
                    size.z / 2,
                )).add(model.position);
                this.getCenter = vi.fn(() => new Vector3());
                this.expandByObject = vi.fn(() => this);
                this.setFromObject = vi.fn(() => this);
                return this;
            })
            .mockImplementationOnce(function (this: any) {
                // target box with top exactly at current model bottom -> delta 0
                this.min = new Vector3(0, 0, 0);
                this.max = new Vector3(0, model.position.y - 0.5, 0);
                this.getCenter = vi.fn(() => new Vector3());
                this.expandByObject = vi.fn(() => this);
                this.setFromObject = vi.fn(() => this);
                return this;
            });
        expect(() => model.dropIt()).not.toThrow();
        expect(spyOnMove).toHaveBeenCalledTimes(1);

        // alter position so onMove will be called again
        model.position.y = 2;
        // mock boxes for third drop with positive delta -> move again
        (Box3 as any)
            .mockImplementationOnce(function (this: any) {
                const size = { x: 1, y: 1, z: 1 };
                (this.min = new Vector3(
                    -size.x / 2,
                    -size.y / 2,
                    -size.z / 2,
                )).add(model.position);
                (this.max = new Vector3(
                    size.x / 2,
                    size.y / 2,
                    size.z / 2,
                )).add(model.position);
                this.getCenter = vi.fn(() => new Vector3());
                this.expandByObject = vi.fn(() => this);
                this.setFromObject = vi.fn(() => this);
                return this;
            })
            .mockImplementationOnce(function (this: any) {
                this.min = new Vector3(0, 0, 0);
                this.max = new Vector3(0, 2, 0);
                this.getCenter = vi.fn(() => new Vector3());
                this.expandByObject = vi.fn(() => this);
                this.setFromObject = vi.fn(() => this);
                return this;
            });
        vi.spyOn(State, 'get').mockReturnValueOnce(undefined as any);
        expect(() => model.dropIt()).not.toThrow();
        expect(spyOnMove).toHaveBeenCalledTimes(2);
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

        // Make Box3 report min.y = 0 so delta = 0 -> no change
        (Box3 as any).mockImplementationOnce(function (this: any) {
            this.min = new Vector3(0, 0, 0);
            this.max = new Vector3(0, 0, 0);
            this.getCenter = vi.fn(() => new Vector3());
            this.expandByObject = vi.fn(() => this);
            return this;
        });

        const com = State.get('id')!;
        const spyperformAction = vi.spyOn(com, 'performAction');
        const onMoveSpy = vi
            .spyOn(model, 'onMove')
            .mockImplementation(() => {});

        model.placeOnFloor();
        expect(spyperformAction).not.toHaveBeenCalled();
        expect(onMoveSpy).not.toHaveBeenCalled();
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
