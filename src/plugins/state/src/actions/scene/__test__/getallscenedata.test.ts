import { type EngineGateway } from '../../../EngineGateway.ts';
import { GetAllSceneDataAction } from '../getallscenedata.ts';
import {
    type GroupSchema,
    type LightSchema,
    type ModelSchema,
    type CameraSchema,
    type PrimitiveSchema,
} from '../../../../types/index.ts';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { Vector3 } from 'three/webgpu';

describe('GetAllSceneDataAction', () => {
    it('should get all scene data', async () => {
        // Mock dependencies
        const mockGateway = {
            readSceneSettings: vi.fn(() => ({
                name: 'Test Scene',
                backgroundColor: '#000000',
                gridEnabled: true,
                floorEnabled: true,
                floorColor: '#ffffff',
            })),
        } as unknown as EngineGateway;

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
                gateway: mockGateway,
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
