import { DIVEEngine } from '../../../../../../engine/Engine.ts';
import { DIVEScene } from '../../../../../../engine/scene/Scene.ts';
import { AddObjectAction } from '../addobject.ts';
import { COMEntity } from '../../../../types/index.ts';

const mockEngine = {
    scene: {
        root: {
            addSceneObject: vi.fn(),
        },
    } as unknown as DIVEScene,
} as unknown as DIVEEngine;

const mockRegistered = new Map<string, COMEntity>();

describe('AddObjectAction', () => {
    beforeEach(() => {
        mockRegistered.clear();
        vi.clearAllMocks();
    });

    it('should add an object to the scene', async () => {
        const testObject: COMEntity = {
            id: 'test-object',
            entityType: 'model',
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            name: 'Test Object',
            visible: true,
        } as unknown as COMEntity;

        const action = new AddObjectAction(testObject, {
            engine: mockEngine,
            registered: mockRegistered,
        });

        // Execute action
        action.execute();

        // Verify results
        expect(mockEngine.scene.root.addSceneObject).toHaveBeenCalledWith(
            testObject,
        );
        expect(mockRegistered.get(testObject.id)).toEqual(testObject);
    });

    it('should not add an object if it already exists', async () => {
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

        const action = new AddObjectAction(testObject, {
            engine: mockEngine,
            registered: mockRegistered,
        });

        // Execute action
        action.execute();

        // Verify results
        expect(mockEngine.scene.root.addSceneObject).not.toHaveBeenCalled();
    });
});
