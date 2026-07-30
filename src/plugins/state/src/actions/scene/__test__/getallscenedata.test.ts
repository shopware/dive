import { GetAllSceneDataAction } from '../getallscenedata.ts';
import {
    DIVE,
    DIVEScene,
    type GroupSchema,
    type LightSchema,
    type ModelSchema,
    type CameraSchema,
    type PrimitiveSchema,
} from '@shopware-ag/dive';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { Color, MeshStandardMaterial, Vector3 } from 'three/webgpu';

describe('GetAllSceneDataAction', () => {
    it('should get all scene data', async () => {
        // Mock dependencies
        const mockScene = {
            name: 'Test Scene',
            background: new Color(0x000000),
            root: {
                floor: {
                    visible: true,
                    material: new MeshStandardMaterial({ color: 0xffffff }),
                },
            },
            objects: [],
            settings: {},
        } as unknown as DIVEScene;

        const mockEngine = {
            scene: mockScene,
        } as unknown as DIVE;

        const mockController = {
            object: {
                position: new Vector3(0, 0, 0),
            },
            target: new Vector3(0, 0, 0),
        } as unknown as OrbitController;

        const mockRegistered = new Map();

        mockRegistered.set('light', {
            entityType: 'light',
            position: new Vector3(0, 0, 0),
            target: new Vector3(0, 0, 0),
        } as unknown as LightSchema);

        mockRegistered.set('model', {
            entityType: 'model',
            position: new Vector3(0, 0, 0),
            target: new Vector3(0, 0, 0),
        } as unknown as ModelSchema);

        mockRegistered.set('camera', {
            entityType: 'camera',
            position: new Vector3(0, 0, 0),
            target: new Vector3(0, 0, 0),
        } as unknown as CameraSchema);

        mockRegistered.set('primitive', {
            entityType: 'primitive',
            position: new Vector3(0, 0, 0),
            target: new Vector3(0, 0, 0),
        } as unknown as PrimitiveSchema);

        mockRegistered.set('group', {
            entityType: 'group',
            position: new Vector3(0, 0, 0),
            target: new Vector3(0, 0, 0),
        } as unknown as GroupSchema);

        const action = new GetAllSceneDataAction(
            {},
            {
                engine: mockEngine,
                controller: mockController,
                registered: mockRegistered,
            },
        );

        // Execute action
        const result = await action.execute();

        // Verify results
        expect(result).toMatchObject({
            name: 'Test Scene',
            backgroundColor: '#000000',
            floorEnabled: true,
            floorColor: '#ffffff',
            cameras: [
                {
                    entityType: 'camera',
                    position: { x: 0, y: 0, z: 0 },
                    target: { x: 0, y: 0, z: 0 },
                },
            ],
            lights: [
                {
                    entityType: 'light',
                    position: { x: 0, y: 0, z: 0 },
                    target: { x: 0, y: 0, z: 0 },
                },
            ],
            objects: [
                {
                    entityType: 'model',
                    position: { x: 0, y: 0, z: 0 },
                    target: { x: 0, y: 0, z: 0 },
                },
            ],
            primitives: [
                {
                    entityType: 'primitive',
                    position: { x: 0, y: 0, z: 0 },
                    target: { x: 0, y: 0, z: 0 },
                },
            ],
            groups: [
                {
                    entityType: 'group',
                    position: { x: 0, y: 0, z: 0 },
                    target: { x: 0, y: 0, z: 0 },
                },
            ],
            spotmarks: [],
            mediaItem: null,
            userCamera: {
                position: { x: 0, y: 0, z: 0 },
                target: { x: 0, y: 0, z: 0 },
            },
        });
    });
});
