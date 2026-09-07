import { makeActionDeps } from '../../../__test__/actionDeps.ts';
import { type EngineGateway } from '../../../EngineGateway.ts';
import { type DIVESceneObject } from '@shopware-ag/dive';
import { AddObjectAction } from '../addobject.ts';
import { DIVE, DIVEScene } from '@shopware-ag/dive';
import { type EntitySchema } from '../../../../types/index.ts';

const existingSceneObject = { name: 'already there' } as DIVESceneObject;

const mockGateway = {
    addEntity: vi.fn(),
} as unknown as EngineGateway;

const deps = makeActionDeps();

describe('AddObjectAction', () => {
    beforeEach(() => {
        deps.registry.clear();
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
            ...deps,
        });

        // Execute action
        await action.execute();

        // Verify results
        expect(mockGateway.addEntity).toHaveBeenCalledWith(testObject);
        expect(deps.registry.read(testObject.id)?.schema).toEqual(testObject);
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

        // already there, node included — that node is what comes back
        deps.registry.register(testObject, existingSceneObject);

        const action = new AddObjectAction(testObject, {
            gateway: mockGateway,
            ...deps,
        });

        // awaited, so a rejection surfaces here instead of going unhandled
        const result = await action.execute();

        // Verify results
        expect(mockGateway.addEntity).not.toHaveBeenCalled();
        expect(result).toBe(existingSceneObject);
    });
});
