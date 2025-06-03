import { DIVEEngine, DIVEScene } from '@shopware-ag/dive';
import { UpdateObjectAction } from '../updateobject.ts';
import { COMEntity } from '../../../../types/index.ts';

// Mock dependencies
const mockEngine = {
    scene: {
        root: {
            updateSceneObject: vi.fn(),
        },
    } as unknown as DIVEScene,
} as unknown as DIVEEngine;

const mockRegistered = new Map<string, COMEntity>();

describe('UpdateObjectAction', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockRegistered.clear();
    });

    it('should update an existing object', async () => {
        const originalObject: COMEntity = {
            id: 'test-object',
            entityType: 'model',
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            name: 'Test Object',
            visible: true,
        } as unknown as COMEntity;

        const updatePayload = {
            id: 'test-object',
            position: { x: 1, y: 1, z: 1 },
        };

        // Add the original object first
        mockRegistered.set(originalObject.id, originalObject);

        const action = new UpdateObjectAction(updatePayload, {
            engine: mockEngine,
            registered: mockRegistered,
        });

        // Execute action
        action.execute();

        // Verify results
        expect(mockEngine.scene.root.updateSceneObject).toHaveBeenCalledWith({
            ...updatePayload,
            entityType: 'model',
        });
        expect(mockRegistered.get('test-object')).toEqual({
            ...originalObject,
            ...updatePayload,
        });
    });

    it('should return false if object does not exist', async () => {
        const updatePayload = {
            id: 'non-existent-object',
            position: { x: 1, y: 1, z: 1 },
        };

        const action = new UpdateObjectAction(updatePayload, {
            engine: mockEngine,
            registered: mockRegistered,
        });

        // Execute action and expect error
        expect(() => action.execute()).toThrow('Object not found.');

        // Verify results
        expect(mockEngine.scene.root.updateSceneObject).not.toHaveBeenCalled();
    });
});
