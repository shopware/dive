import { GetAllObjectsAction } from '../getallobjects';
import { COMEntity } from '../../../types';

describe('GetAllObjectsAction', () => {
    const mockRegistered = new Map<string, COMEntity>();

    beforeEach(() => {
        mockRegistered.clear();
    });

    it('should return all registered objects', () => {
        // Arrange
        const object1: COMEntity = {
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

        const object2: COMEntity = {
            id: 'object2',
            name: 'Object 2',
            entityType: 'group',
            visible: true,
            parentId: null,
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
        };

        mockRegistered.set(object1.id, object1);
        mockRegistered.set(object2.id, object2);

        // Act
        const action = new GetAllObjectsAction(undefined, {
            registered: mockRegistered,
        });
        const result = action.execute();

        // Assert
        expect(result).toBe(mockRegistered);
        expect(result.size).toBe(2);
        expect(result.get('object1')).toBe(object1);
        expect(result.get('object2')).toBe(object2);
    });

    it('should return empty map when no objects are registered', () => {
        // Act
        const action = new GetAllObjectsAction(undefined, {
            registered: mockRegistered,
        });
        const result = action.execute();

        // Assert
        expect(result).toBe(mockRegistered);
        expect(result.size).toBe(0);
    });
});
