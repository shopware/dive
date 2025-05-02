import { DIVEEngine } from '../../../../../engine';
import { DIVEScene } from '../../../../../engine/scene/Scene';
import { UpdateObjectAction } from '../updateobject';
import { COMEntity } from '../../../types';

describe('UpdateObjectAction', () => {
    it('should update an existing object', async () => {
        // Mock dependencies
        const mockScene = {
            UpdateSceneObject: vi.fn(),
        } as unknown as DIVEScene;

        const mockEngine = {
            scene: mockScene,
        } as unknown as DIVEEngine;

        const mockRegistered = new Map<string, COMEntity>();

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
        expect(mockScene.UpdateSceneObject).toHaveBeenCalledWith({
            ...updatePayload,
            entityType: 'model',
        });
        expect(mockRegistered.get('test-object')).toEqual({
            ...originalObject,
            ...updatePayload,
        });
    });

    it('should return false if object does not exist', async () => {
        // Mock dependencies
        const mockScene = {
            UpdateSceneObject: vi.fn(),
        } as unknown as DIVEScene;

        const mockEngine = {
            scene: mockScene,
        } as unknown as DIVEEngine;

        const mockRegistered = new Map<string, COMEntity>();

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
        expect(mockScene.UpdateSceneObject).not.toHaveBeenCalled();
    });
});
