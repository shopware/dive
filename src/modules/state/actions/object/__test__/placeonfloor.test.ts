import { DIVEEngine } from '../../../../../engine/Engine.ts';
import { DIVEScene } from '../../../../../engine/scene/Scene.ts';
import { PlaceOnFloorAction } from '../placeonfloor.ts';
import { COMEntity } from '../../../types/index.ts';
import { DIVEModel } from '../../../../../components/model/Model.ts';

const mockModel = {
    placeOnFloor: vi.fn(),
} as unknown as DIVEModel;

const mockEngine = {
    scene: {
        root: {
            getSceneObject: vi.fn().mockReturnValue(mockModel),
        },
    },
} as unknown as DIVEEngine;

const mockRegistered = new Map<string, COMEntity>();

describe('PlaceOnFloorAction', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockRegistered.clear();
    });

    it('should place an object on the floor', async () => {
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
        expect(mockEngine.scene.root.getSceneObject).toHaveBeenCalledWith(
            testObject,
        );
        expect(mockModel.placeOnFloor).toHaveBeenCalled();
    });

    it('should throw error if object is not registered', async () => {
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
        vi.mocked(mockEngine.scene.root.getSceneObject).mockReturnValue(
            undefined,
        );

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
