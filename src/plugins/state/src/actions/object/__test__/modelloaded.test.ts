import { makeActionDeps } from '../../../__test__/actionDeps.ts';
import { ModelLoadedAction } from '../modelloaded.ts';
import {
    type EntitySchema,
    type ModelSchema,
} from '../../../../types/index.ts';

describe('ModelLoadedAction', () => {
    it('should mark a model as loaded', async () => {
        // Mock dependencies
        const deps = makeActionDeps();

        const testObject: EntitySchema = {
            id: 'test-object',
            entityType: 'model',
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            loaded: false,
            name: 'Test Object',
            visible: true,
        } as unknown as EntitySchema;

        // Add the object first
        deps.registry.register(testObject);

        const action = new ModelLoadedAction(
            { id: 'test-object' },
            {
                ...deps,
            },
        );

        // Execute action
        action.execute();

        // Verify results
        expect(
            (deps.registry.read('test-object')?.schema as ModelSchema).loaded,
        ).toBe(true);
    });

    it('should throw error if model is not registered', async () => {
        // Mock dependencies
        const deps = makeActionDeps();

        const action = new ModelLoadedAction(
            { id: 'non-existent-object' },
            {
                ...deps,
            },
        );

        // Execute action and expect error
        expect(() => action.execute()).toThrow(
            'Model with id non-existent-object not found',
        );
    });

    it('should throw error if object is not a model', async () => {
        // Mock dependencies
        const deps = makeActionDeps();

        const testObject: EntitySchema = {
            id: 'test-object',
            entityType: 'camera',
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            name: 'Test Object',
            visible: true,
        } as unknown as EntitySchema;

        // Add the object first
        deps.registry.register(testObject);

        const action = new ModelLoadedAction(
            { id: 'test-object' },
            {
                ...deps,
            },
        );

        // Execute action and expect error
        expect(() => action.execute()).toThrow(
            'Model with id test-object is not a ModelSchema',
        );
    });
});
