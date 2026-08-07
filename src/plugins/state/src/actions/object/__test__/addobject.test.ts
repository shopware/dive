import { type EngineGateway } from '../../../EngineGateway.ts';
import { type DIVESceneObject } from '@shopware-ag/dive';
import { AddObjectAction } from '../addobject.ts';
import { DIVE, DIVEScene } from '@shopware-ag/dive';
import { type EntitySchema } from '@shopware-ag/dive';

const existingSceneObject = { name: 'already there' } as DIVESceneObject;

const mockGateway = {
    addEntity: vi.fn(),
    findEntity: vi.fn().mockReturnValue(existingSceneObject),
} as unknown as EngineGateway;

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
            gateway: mockGateway,
            registered: mockRegistered,
        });

        // Execute action
        await action.execute();

        // Verify results
        expect(mockGateway.addEntity).toHaveBeenCalledWith(testObject);
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
            gateway: mockGateway,
            registered: mockRegistered,
        });

        // awaited, so a rejection surfaces here instead of going unhandled
        const result = await action.execute();

        // Verify results
        expect(mockGateway.addEntity).not.toHaveBeenCalled();
        expect(mockGateway.findEntity).toHaveBeenCalledWith(testObject);
        expect(result).toBe(existingSceneObject);
    });
});
