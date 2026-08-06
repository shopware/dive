import { AddObjectAction } from '../addobject.ts';
import { DIVE, DIVEScene, type EntitySchema } from '@shopware-ag/dive';

const mockEngine = {
    scene: {
        root: {
            addSceneObject: vi.fn(),
            getSceneObject: vi.fn(),
        },
    } as unknown as DIVEScene,
} as unknown as DIVE;

const mockRegistered = new Map<string, EntitySchema>();

describe('AddObjectAction', () => {
    beforeEach(() => {
        mockRegistered.clear();
        vi.clearAllMocks();
    });

    it('should add an object to the scene', async () => {
        const testObject: EntitySchema = {
            id: 'test-object',
            entityType: 'model',
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            name: 'Test Object',
            visible: true,
        } as unknown as EntitySchema;

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
        const testObject: EntitySchema = {
            id: 'test-object',
            entityType: 'model',
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            name: 'Test Object',
            visible: true,
        } as unknown as EntitySchema;

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
