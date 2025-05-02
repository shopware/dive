import { DIVEEngine } from '../../../../../engine';
import { DIVEScene } from '../../../../../engine/scene/Scene';
import { PlaceOnFloorAction } from '../placeonfloor';
import { COMEntity } from '../../../types';
import { DIVEModel } from '../../../../../components/model/Model';

describe('PlaceOnFloorAction', () => {
    it('should place an object on the floor', async () => {
        // Mock dependencies
        const mockModel = {
            PlaceOnFloor: vi.fn(),
        } as unknown as DIVEModel;

        const mockScene = {
            GetSceneObject: vi.fn().mockReturnValue(mockModel),
        } as unknown as DIVEScene;

        const mockEngine = {
            scene: mockScene,
        } as unknown as DIVEEngine;

        const mockRegistered = new Map<string, COMEntity>();

        const testObject: COMEntity = {
            id: 'test-object',
            entityType: 'model',
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            name: 'Test Object',
            visible: true,
        } as unknown as COMEntity;

        // Add the object first
        mockRegistered.set(testObject.id, testObject);

        const action = new PlaceOnFloorAction(
            { id: 'test-object' },
            {
                engine: mockEngine,
                registered: mockRegistered,
            },
        );

        // Execute action
        action.execute();

        // Verify results
        expect(mockScene.GetSceneObject).toHaveBeenCalledWith(testObject);
        expect(mockModel.PlaceOnFloor).toHaveBeenCalled();
    });

    it('should throw error if object is not registered', async () => {
        // Mock dependencies
        const mockScene = {
            GetSceneObject: vi.fn(),
        } as unknown as DIVEScene;

        const mockEngine = {
            scene: mockScene,
        } as unknown as DIVEEngine;

        const mockRegistered = new Map<string, COMEntity>();

        const action = new PlaceOnFloorAction(
            { id: 'non-existent-object' },
            {
                engine: mockEngine,
                registered: mockRegistered,
            },
        );

        // Execute action and expect error
        expect(() => action.execute()).toThrow(
            'Object with id non-existent-object not registered',
        );
    });

    it('should throw error if object is not found in scene', async () => {
        // Mock dependencies
        const mockScene = {
            GetSceneObject: vi.fn().mockReturnValue(null),
        } as unknown as DIVEScene;

        const mockEngine = {
            scene: mockScene,
        } as unknown as DIVEEngine;

        const mockRegistered = new Map<string, COMEntity>();

        const testObject: COMEntity = {
            id: 'test-object',
            entityType: 'model',
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            name: 'Test Object',
            visible: true,
        } as unknown as COMEntity;

        // Add the object first
        mockRegistered.set(testObject.id, testObject);

        const action = new PlaceOnFloorAction(
            { id: 'test-object' },
            {
                engine: mockEngine,
                registered: mockRegistered,
            },
        );

        // Execute action and expect error
        expect(() => action.execute()).toThrow(
            'Object with id test-object is not found in the scene',
        );
    });
});
