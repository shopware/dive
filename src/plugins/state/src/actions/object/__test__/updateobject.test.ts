import { makeActionDeps } from '../../../__test__/actionDeps.ts';
import { type EngineGateway } from '../../../EngineGateway.ts';
import { DIVE, DIVEScene } from '@shopware-ag/dive';
import { type EntitySchema } from '../../../../types/index.ts';
import { UpdateObjectAction } from '../updateobject.ts';

// Mock dependencies
const mockGateway = {
    updateEntity: vi.fn(),
} as unknown as EngineGateway;

const deps = makeActionDeps();

describe('UpdateObjectAction', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        deps.registry.clear();
    });

    it('should update an existing object', async () => {
        const originalObject: EntitySchema = {
            id: 'test-object',
            entityType: 'model',
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            name: 'Test Object',
            visible: true,
        } as unknown as EntitySchema;

        const updatePayload = {
            id: 'test-object',
            position: { x: 1, y: 1, z: 1 },
        };

        // Add the original object first
        deps.registry.register(originalObject);

        const action = new UpdateObjectAction(updatePayload, {
            gateway: mockGateway,
            ...deps,
        });

        // Execute action
        action.execute();

        // Verify results
        expect(mockGateway.updateEntity).toHaveBeenCalledWith({
            ...updatePayload,
            entityType: 'model',
        });
        expect(deps.registry.read('test-object')?.schema).toEqual({
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
            gateway: mockGateway,
            ...deps,
        });

        // the action is async now, so the error surfaces as a rejection
        await expect(action.execute()).rejects.toThrow('Object not found.');

        // Verify results
        expect(mockGateway.updateEntity).not.toHaveBeenCalled();
    });
});
