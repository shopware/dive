import { makeActionDeps } from '../../../__test__/actionDeps.ts';
import { GetAllObjectsAction } from '../getallobjects.ts';
import { type EntitySchema } from '../../../../types/index.ts';

describe('GetAllObjectsAction', () => {
    const deps = makeActionDeps();

    beforeEach(() => {
        deps.registry.clear();
    });

    it('should return all registered objects', () => {
        // Arrange
        const object1: EntitySchema = {
            id: 'object1',
            name: 'Object 1',
            entityType: 'primitive',
            visible: true,
            parentId: null,
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            geometry: {
                name: 'cube',
                width: 1,
                height: 1,
                depth: 1,
            },
        };

        const object2: EntitySchema = {
            id: 'object2',
            name: 'Object 2',
            entityType: 'group',
            visible: true,
            parentId: null,
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
        };

        deps.registry.register(object1);
        deps.registry.register(object2);

        // Act
        const action = new GetAllObjectsAction(undefined, {
            ...deps,
        });
        const result = action.execute();

        // Assert
        expect(result.size).toBe(2);
        expect(result.get('object1')).toBe(object1);
        expect(result.get('object2')).toBe(object2);
    });

    it('should return empty map when no objects are registered', () => {
        // Act
        const action = new GetAllObjectsAction(undefined, {
            ...deps,
        });
        const result = action.execute();

        // Assert
        expect(result.size).toBe(0);
    });
});
