import { DeleteObjectAction } from '../deleteobject.ts';
import { DIVEEngine, DIVEScene, type EntitySchema } from '@shopware-ag/dive';
import { SetParentAction } from '../setparent.ts';
import { UpdateObjectAction } from '../updateobject.ts';

vi.mock('../setparent');
vi.mock('../updateobject');

describe('DeleteObjectAction', () => {
    // Mock dependencies
    const mockScene = {
        root: {
            deleteSceneObject: vi.fn(),
        },
    } as unknown as DIVEScene;

    const mockEngine = {
        scene: mockScene,
    } as unknown as DIVEEngine;

    const mockRegistered = new Map<string, EntitySchema>();

    beforeEach(() => {
        mockRegistered.clear();
        vi.clearAllMocks();
        vi.mocked(SetParentAction).mockClear();
        vi.mocked(UpdateObjectAction).mockClear();
    });

    it('should delete a standalone object', () => {
        // Arrange
        const object: EntitySchema = {
            id: 'test-object',
            name: 'Test Object',
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
        mockRegistered.set(object.id, object);

        // Act
        const action = new DeleteObjectAction(
            { id: object.id },
            { engine: mockEngine, registered: mockRegistered },
        );
        action.execute();

        // Assert
        expect(mockEngine.scene.root.deleteSceneObject).toHaveBeenCalledWith(
            object,
        );
        expect(mockRegistered.has(object.id)).toBe(false);
    });

    it('should detach from parent before deleting', () => {
        // Arrange
        const object: EntitySchema = {
            id: 'test-object',
            name: 'Test Object',
            entityType: 'primitive',
            visible: true,
            parentId: 'parent-id',
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
        mockRegistered.set(object.id, object);

        // Act
        const action = new DeleteObjectAction(
            { id: object.id },
            { engine: mockEngine, registered: mockRegistered },
        );
        action.execute();

        // Assert
        expect(SetParentAction).toHaveBeenCalledWith(
            {
                object: { id: object.id },
                parent: null,
            },
            {
                engine: mockEngine,
                registered: mockRegistered,
            },
        );
        expect(mockEngine.scene.root.deleteSceneObject).toHaveBeenCalledWith(
            object,
        );
        expect(mockRegistered.has(object.id)).toBe(false);
    });

    it('should update children when deleting a group', () => {
        // Arrange
        const group: EntitySchema = {
            id: 'test-group',
            name: 'Test Group',
            entityType: 'group',
            visible: true,
            parentId: null,
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
        };
        const child1: EntitySchema = {
            id: 'child1',
            name: 'Child 1',
            entityType: 'primitive',
            visible: true,
            parentId: 'test-group',
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
        const child2: EntitySchema = {
            id: 'child2',
            name: 'Child 2',
            entityType: 'primitive',
            visible: true,
            parentId: 'test-group',
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

        mockRegistered.set(group.id, group);
        mockRegistered.set(child1.id, child1);
        mockRegistered.set(child2.id, child2);

        // Act
        const action = new DeleteObjectAction(
            { id: group.id },
            { engine: mockEngine, registered: mockRegistered },
        );
        action.execute();

        // Assert
        expect(UpdateObjectAction).toHaveBeenCalledTimes(2);
        expect(UpdateObjectAction).toHaveBeenCalledWith(
            {
                id: 'child1',
                parentId: null,
            },
            {
                engine: mockEngine,
                registered: mockRegistered,
            },
        );
        expect(UpdateObjectAction).toHaveBeenCalledWith(
            {
                id: 'child2',
                parentId: null,
            },
            {
                engine: mockEngine,
                registered: mockRegistered,
            },
        );
        expect(mockEngine.scene.root.deleteSceneObject).toHaveBeenCalledWith(
            group,
        );
        expect(mockRegistered.has(group.id)).toBe(false);
    });

    it('should return false when object does not exist', () => {
        // Act
        const action = new DeleteObjectAction(
            { id: 'non-existent' },
            { engine: mockEngine, registered: mockRegistered },
        );
        const result = action.execute();

        // Assert
        expect(result).toBe(false);
        expect(mockEngine.scene.root.deleteSceneObject).not.toHaveBeenCalled();
    });
});
