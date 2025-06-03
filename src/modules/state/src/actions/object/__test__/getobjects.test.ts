import { GetObjectsAction } from '../getobjects.ts';
import { COMEntity } from '../../../../types/index.ts';

describe('GetObjectsAction', () => {
    const mockRegistered = new Map<string, COMEntity>();

    beforeEach(() => {
        mockRegistered.clear();
    });

    it('should return objects with specified IDs', () => {
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

        const object3: COMEntity = {
            id: 'object3',
            name: 'Object 3',
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

        mockRegistered.set(object1.id, object1);
        mockRegistered.set(object2.id, object2);
        mockRegistered.set(object3.id, object3);

        // Act
        const action = new GetObjectsAction(
            {
                ids: [
                    'object1',
                    'object3',
                ],
            },
            { engine: {} as any, registered: mockRegistered },
        );
        const result = action.execute();

        // Assert
        expect(result).toHaveLength(2);
        expect(result).toContainEqual(object1);
        expect(result).toContainEqual(object3);
        expect(result).not.toContainEqual(object2);
    });

    it('should return empty array when no IDs are provided', () => {
        // Act
        const action = new GetObjectsAction(
            { ids: [] },
            { engine: {} as any, registered: mockRegistered },
        );
        const result = action.execute();

        // Assert
        expect(result).toHaveLength(0);
    });

    it('should return empty array when no matching objects are found', () => {
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

        mockRegistered.set(object1.id, object1);

        // Act
        const action = new GetObjectsAction(
            { ids: ['non-existent'] },
            { engine: {} as any, registered: mockRegistered },
        );
        const result = action.execute();

        // Assert
        expect(result).toHaveLength(0);
    });
});
