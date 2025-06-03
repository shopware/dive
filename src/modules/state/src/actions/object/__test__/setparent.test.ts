import { DIVEEngine, DIVEScene, DIVESceneObject } from '@shopware-ag/dive';
import { SetParentAction } from '../setparent.ts';
import { COMEntity } from '../../../../types/index.ts';
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
                    (obj: Partial<COMEntity> & { id: string }) => {
                        if (obj.id === 'test-object') return mockSceneObject;
                        if (obj.id === 'parent-object') return mockParentObject;
                        return null;
                    },
                ),
            attach: vi.fn(),
        },
    } as unknown as DIVEScene;

    const mockEngine = {
        scene: mockScene,
    } as unknown as DIVEEngine;

    const mockRegistered = new Map<string, COMEntity>();

    beforeEach(() => {
        mockRegistered.clear();
        vi.clearAllMocks();
    });

    it('should set a parent for an object', () => {
        // Arrange
        const testObject: COMEntity = {
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

        const parentObject: COMEntity = {
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
        const testObject: COMEntity = {
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
        expect(() => action.execute()).toThrow('Object not found in scene.');
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
        const testObject: COMEntity = {
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

    it('should throw error if parent does not exist', () => {
        // Arrange
        const testObject: COMEntity = {
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

        expect(() => action.execute()).toThrow('Parent object not found.');
    });

    it('should throw error if parent is not found in scene', () => {
        // Arrange
        const testObject: COMEntity = {
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

        const parentObject: COMEntity = {
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
        vi.mocked(mockScene.root.getSceneObject).mockImplementation(
            (obj: Partial<COMEntity> & { id: string }) => {
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

        expect(() => action.execute()).toThrow(
            'Parent object not found in scene.',
        );
    });

    it('should throw error if object tries to attach to itself', () => {
        // Arrange
        const testObject: COMEntity = {
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

        expect(() => action.execute()).toThrow(
            'Cannot attach object to itself.',
        );
    });
});
