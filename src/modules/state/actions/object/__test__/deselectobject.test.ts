import { DIVEEngine } from '../../../../../engine/Engine.ts';
import { DIVEScene } from '../../../../../engine/scene/Scene.ts';
import { DeselectObjectAction } from '../deselectobject.ts';
import { type COMEntity } from '../../../types/index.ts';
import { Object3D } from 'three';
import { type DIVESelectable } from '../../../../../interfaces/Selectable.ts';
import { type DIVESelectTool } from '../../../../toolbox/select/SelectTool.ts';

const mockSceneObject = {
    attach: vi.fn(),
    isSelectable: true,
} as unknown as Object3D & DIVESelectable;

const mockGetSceneObject = vi.fn().mockReturnValue(mockSceneObject);
const mockScene = {
    GetSceneObject: mockGetSceneObject,
} as unknown as DIVEScene;

const mockEngine = {
    scene: mockScene,
} as unknown as DIVEEngine;

const mockDetachGizmo = vi.fn();
const mockSelectTool = {
    isSelectTool: true,
    DetachGizmo: mockDetachGizmo,
} as unknown as DIVESelectTool;

const mockGetActiveTool = vi.fn().mockReturnValue(mockSelectTool);
const mockGetToolbox = vi.fn().mockResolvedValue({
    GetActiveTool: mockGetActiveTool,
});

const mockRegistered = new Map<string, COMEntity>();
describe('DeselectObjectAction', () => {
    beforeEach(() => {
        mockRegistered.clear();
        vi.clearAllMocks();
    });

    it('should deselect an object', async () => {
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

        // Act
        const action = new DeselectObjectAction(
            { id: 'test-object' },
            {
                engine: mockEngine,
                getToolbox: mockGetToolbox,
                registered: mockRegistered,
            },
        );
        await action.execute();

        // Assert
        expect(mockSelectTool.DetachGizmo).toHaveBeenCalled();
    });

    it('should return false if object does not exist', async () => {
        // Act
        const action = new DeselectObjectAction(
            { id: 'non-existent-object' },
            {
                engine: mockEngine,
                getToolbox: mockGetToolbox,
                registered: mockRegistered,
            },
        );

        // Assert
        await expect(action.execute()).rejects.toThrow('Object not found.');
    });

    it('should return false if object is not found in scene', async () => {
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
        mockGetSceneObject.mockReturnValueOnce(null);

        // Act
        const action = new DeselectObjectAction(
            { id: 'test-object' },
            {
                engine: mockEngine,
                getToolbox: mockGetToolbox,
                registered: mockRegistered,
            },
        );

        // Assert
        await expect(action.execute()).rejects.toThrow(
            'Object not found in scene.',
        );
    });

    it('should return false if object is not selectable', async () => {
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
        mockGetSceneObject.mockReturnValueOnce({} as Object3D);

        // Act
        const action = new DeselectObjectAction(
            { id: 'test-object' },
            {
                engine: mockEngine,
                getToolbox: mockGetToolbox,
                registered: mockRegistered,
            },
        );

        // Assert
        await expect(action.execute()).rejects.toThrow(
            'Object is not selectable.',
        );
    });

    it('should not throw if no select tool is active', async () => {
        mockGetActiveTool.mockReturnValueOnce(null);

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

        // Act
        const action = new DeselectObjectAction(
            { id: 'test-object' },
            {
                engine: mockEngine,
                getToolbox: mockGetToolbox,
                registered: mockRegistered,
            },
        );
        await action.execute();

        // Assert
        expect(mockDetachGizmo).not.toHaveBeenCalled();
    });
});
