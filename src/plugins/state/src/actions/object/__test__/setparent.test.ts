import { makeActionDeps } from '../../../__test__/actionDeps.ts';
import { SetParentAction } from '../setparent.ts';
import { DIVESceneObject } from '@shopware-ag/dive';
import { type EngineGateway } from '../../../EngineGateway.ts';
import { type EntitySchema } from '../../../../types/index.ts';
import { Object3D } from 'three/webgpu';

describe('SetParentAction', () => {
    // Mock dependencies
    const mockSceneObject = {
        attach: vi.fn(),
    } as unknown as DIVESceneObject;

    const mockParentObject = {
        attach: vi.fn(),
    } as unknown as Object3D;

    const mockGateway = {
        root: { attach: vi.fn() },
        updateEntity: vi.fn(),
    } as unknown as EngineGateway;

    const deps = makeActionDeps();

    beforeEach(() => {
        deps.registry.clear();
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

        deps.registry.register(testObject, mockSceneObject);
        deps.registry.register(
            parentObject,
            mockParentObject as unknown as DIVESceneObject,
        );

        // Act
        const action = new SetParentAction(
            {
                object: { id: 'test-object' },
                parent: { id: 'parent-object' },
            },
            { gateway: mockGateway, ...deps },
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

        deps.registry.register(testObject, mockSceneObject);

        // Act
        const action = new SetParentAction(
            {
                object: { id: 'test-object' },
                parent: null,
            },
            { gateway: mockGateway, ...deps },
        );

        // Assert
        action.execute();

        // Assert
        expect(mockGateway.root.attach).toHaveBeenCalledWith(mockSceneObject);
    });

    it('should throw error if object does not exist', () => {
        // Act & Assert
        const action = new SetParentAction(
            {
                object: { id: 'non-existent-object' },
                parent: { id: 'parent-object' },
            },
            { gateway: mockGateway, ...deps },
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

        // registered, but with no scene object of its own
        deps.registry.register(testObject);

        // Act & Assert
        const action = new SetParentAction(
            {
                object: { id: 'test-object' },
                parent: { id: 'parent-object' },
            },
            { gateway: mockGateway, ...deps },
        );

        expect(() => action.execute()).toThrow('Object is not in the scene.');
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

        deps.registry.register(testObject, mockSceneObject);

        // Act & Assert
        const action = new SetParentAction(
            {
                object: { id: 'test-object' },
                parent: { id: 'non-existent-parent' },
            },
            { gateway: mockGateway, ...deps },
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

        deps.registry.register(testObject, mockSceneObject);
        // the parent is registered, but has no scene object
        deps.registry.register(parentObject);

        // Act & Assert
        const action = new SetParentAction(
            {
                object: { id: 'test-object' },
                parent: { id: 'parent-object' },
            },
            { gateway: mockGateway, ...deps },
        );

        action.execute();
        expect(warnSpy).toHaveBeenCalledWith(
            'Parent object is not in the scene.',
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

        deps.registry.register(testObject, mockSceneObject);

        // Act & Assert
        const action = new SetParentAction(
            {
                object: { id: 'test-object' },
                parent: { id: 'test-object' },
            },
            { gateway: mockGateway, ...deps },
        );

        action.execute();
        expect(warnSpy).toHaveBeenCalledWith('Cannot attach object to itself.');
    });
});
