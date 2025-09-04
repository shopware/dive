import { SetParentAction } from '../setparent.ts';
import {
    DIVE,
    DIVEScene,
    DIVESceneObject,
    type EntitySchema,
} from '@shopware-ag/dive';
import { Object3D } from 'three';

describe('SetParentAction', () => {
    // Mock dependencies
    const mockSceneObject = {
        attach: vi.fn(),
    } as unknown as DIVESceneObject;

    const mockParentObject = {
        attach: vi.fn(),
    } as unknown as Object3D;

    const mockScene = {
        root: {
            getSceneObject: vi
                .fn()
                .mockImplementation(
                    (obj: Partial<EntitySchema> & { id: string }) => {
                        if (obj.id === 'test-object') return mockSceneObject;
                        if (obj.id === 'parent-object') return mockParentObject;
                        return null;
                    },
                ),
            attach: vi.fn(),
            updateSceneObject: vi.fn(),
        },
    } as unknown as DIVEScene;

    const mockEngine = {
        scene: mockScene,
    } as unknown as DIVE;

    const mockRegistered = new Map<string, EntitySchema>();

    beforeEach(() => {
        mockRegistered.clear();
        vi.clearAllMocks();
    });

    it('should set a parent for an object', () => {
        // Arrange
        const testObject: EntitySchema = {
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

        const parentObject: EntitySchema = {
            id: 'parent-object',
            name: 'Parent Object',
            entityType: 'group',
            visible: true,
            parentId: null,
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
        };

        mockRegistered.set(testObject.id, testObject);
        mockRegistered.set(parentObject.id, parentObject);

        // Act
        const action = new SetParentAction(
            {
                object: { id: 'test-object' },
                parent: { id: 'parent-object' },
            },
            {
                engine: mockEngine,
                registered: mockRegistered,
            },
        );
        action.execute();

        // Assert
        expect(mockParentObject.attach).toHaveBeenCalledWith(mockSceneObject);
    });

    it('should detach object from parent when parent is null', () => {
        // Arrange
        const testObject: EntitySchema = {
            id: 'test-object',
            name: 'Test Object',
            entityType: 'primitive',
            visible: true,
            parentId: 'old-parent',
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

        mockRegistered.set(testObject.id, testObject);

        // Act
        const action = new SetParentAction(
            {
                object: { id: 'test-object' },
                parent: null,
            },
            {
                engine: mockEngine,
                registered: mockRegistered,
            },
        );

        // Assert
        action.execute();

        // Assert
        expect(mockScene.root.attach).toHaveBeenCalledWith(mockSceneObject);
    });

    it('should throw error if object does not exist', () => {
        // Act & Assert
        const action = new SetParentAction(
            {
                object: { id: 'non-existent-object' },
                parent: { id: 'parent-object' },
            },
            {
                engine: mockEngine,
                registered: mockRegistered,
            },
        );

        expect(() => action.execute()).toThrow('Object not found.');
    });

    it('should throw error if object is not found in scene', () => {
        // Arrange
        const testObject: EntitySchema = {
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

        mockRegistered.set(testObject.id, testObject);
        vi.mocked(mockScene.root.getSceneObject).mockReturnValueOnce(undefined);

        // Act & Assert
        const action = new SetParentAction(
            {
                object: { id: 'test-object' },
                parent: { id: 'parent-object' },
            },
            {
                engine: mockEngine,
                registered: mockRegistered,
            },
        );

        expect(() => action.execute()).toThrow('Object not found in scene.');
    });

    it('should warn if parent does not exist', () => {
        // Arrange
        const testObject: EntitySchema = {
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

        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

        mockRegistered.set(testObject.id, testObject);

        // Act & Assert
        const action = new SetParentAction(
            {
                object: { id: 'test-object' },
                parent: { id: 'non-existent-parent' },
            },
            {
                engine: mockEngine,
                registered: mockRegistered,
            },
        );

        action.execute();
        expect(warnSpy).toHaveBeenCalledWith('Parent object not found.');
    });

    it('should warn if parent is not found in scene', () => {
        // Arrange
        const testObject: EntitySchema = {
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

        const parentObject: EntitySchema = {
            id: 'parent-object',
            name: 'Parent Object',
            entityType: 'group',
            visible: true,
            parentId: null,
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
        };

        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

        mockRegistered.set(testObject.id, testObject);
        mockRegistered.set(parentObject.id, parentObject);
        vi.mocked(mockScene.root.getSceneObject).mockImplementation(
            (obj: Partial<EntitySchema> & { id: string }) => {
                if (obj.id === 'test-object') return mockSceneObject;
                if (obj.id === 'parent-object') return undefined;
                return undefined;
            },
        );

        // Act & Assert
        const action = new SetParentAction(
            {
                object: { id: 'test-object' },
                parent: { id: 'parent-object' },
            },
            {
                engine: mockEngine,
                registered: mockRegistered,
            },
        );

        action.execute();
        expect(warnSpy).toHaveBeenCalledWith(
            'Parent object not found in scene.',
        );
    });

    it('should warn if object tries to attach to itself', () => {
        // Arrange
        const testObject: EntitySchema = {
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

        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

        mockRegistered.set(testObject.id, testObject);

        // Act & Assert
        const action = new SetParentAction(
            {
                object: { id: 'test-object' },
                parent: { id: 'test-object' },
            },
            {
                engine: mockEngine,
                registered: mockRegistered,
            },
        );

        action.execute();
        expect(warnSpy).toHaveBeenCalledWith('Cannot attach object to itself.');
    });
});
