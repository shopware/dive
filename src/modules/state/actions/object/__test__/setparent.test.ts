import { DIVEEngine } from '../../../../../engine';
import { DIVEScene } from '../../../../../engine/scene/Scene';
import { SetParentAction } from '../setparent';
import { COMEntity } from '../../../types';
import { Object3D } from 'three';
import { type DIVESceneObject } from '../../../../../types/SceneObjects';

describe('SetParentAction', () => {
    // Mock dependencies
    const mockSceneObject = {
        attach: jest.fn(),
    } as unknown as Object3D;

    const mockParentObject = {
        attach: jest.fn(),
    } as unknown as Object3D;

    const mockScene = {
        GetSceneObject: jest
            .fn()
            .mockImplementation((obj: Partial<COMEntity> & { id: string }) => {
                if (obj.id === 'test-object') return mockSceneObject;
                if (obj.id === 'parent-object') return mockParentObject;
                return null;
            }),
        Root: {
            attach: jest.fn(),
        },
    } as unknown as DIVEScene;

    const mockEngine = {
        scene: mockScene,
    } as unknown as DIVEEngine;

    const mockRegistered = new Map<string, COMEntity>();

    beforeEach(() => {
        mockRegistered.clear();
        jest.clearAllMocks();
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
        (mockScene.GetSceneObject as jest.Mock).mockReturnValueOnce(null);

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
        (mockScene.GetSceneObject as jest.Mock).mockImplementation(
            (obj: Partial<COMEntity> & { id: string }) => {
                if (obj.id === 'test-object') return mockSceneObject;
                if (obj.id === 'parent-object') return null;
                return null;
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
