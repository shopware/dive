import { DIVEEngine } from '../../../../../engine/Engine.ts';
import { DIVEScene } from '../../../../../engine/scene/Scene.ts';
import { SelectObjectAction } from '../selectobject.ts';
import { COMEntity } from '../../../types/index.ts';
import { Object3D } from 'three';
import { DIVESelectable } from '../../../../../interfaces/Selectable.ts';
import { DIVESelectTool } from '../../../../toolbox/select/SelectTool.ts';
import { ModuleImporter } from '../../../../_system/ModuleImporter.ts';
import { OrbitController } from '../../../../controller/orbit/OrbitController.ts';
import { Toolbox } from '../../../../toolbox/Toolbox.ts';

const mockController = {} as unknown as OrbitController;

const mockSceneObject = {
    attach: vi.fn(),
    isSelectable: true,
} as unknown as Object3D & DIVESelectable;

const mockScene = {
    GetSceneObject: vi.fn().mockReturnValue(mockSceneObject),
};

const mockEngine = {
    scene: mockScene,
} as unknown as DIVEEngine;

const mockSelectTool = {
    isSelectTool: true,
    AttachGizmo: vi.fn().mockImplementation(() => {}),
} as unknown as DIVESelectTool;

const mockGetActiveTool = vi.fn().mockReturnValue(mockSelectTool);
const mockGetToolbox = () => {
    return Promise.resolve({
        GetActiveTool: mockGetActiveTool,
    } as unknown as Toolbox);
};

const mockRegistered = new Map<string, COMEntity>();

describe('SelectObjectAction', () => {
    beforeEach(() => {
        mockRegistered.clear();
        vi.clearAllMocks();
    });

    it('should select an object', async () => {
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
        const action = new SelectObjectAction(
            { id: 'test-object' },
            {
                engine: mockEngine,
                getToolbox: mockGetToolbox,
                registered: mockRegistered,
            },
        );
        await action.execute();

        // Assert
        expect(mockSelectTool.AttachGizmo).toHaveBeenCalledWith(
            mockSceneObject,
        );
    });

    it('should return false if object does not exist', async () => {
        // Act
        const action = new SelectObjectAction(
            { id: 'non-existent-object' },
            {
                engine: mockEngine,
                getToolbox: mockGetToolbox,
                registered: mockRegistered,
            },
        );
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
        mockScene.GetSceneObject.mockReturnValueOnce(undefined);

        // Act
        const action = new SelectObjectAction(
            { id: 'test-object' },
            {
                engine: mockEngine,
                getToolbox: mockGetToolbox,
                registered: mockRegistered,
            },
        );
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
        mockScene.GetSceneObject.mockReturnValueOnce({} as Object3D);

        // Act
        const action = new SelectObjectAction(
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

    it('should not throw if no select tool is active', () => {
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
        mockGetActiveTool.mockReturnValueOnce(null);

        // Act
        const action = new SelectObjectAction(
            { id: 'test-object' },
            {
                engine: mockEngine,
                getToolbox: mockGetToolbox,
                registered: mockRegistered,
            },
        );
        action.execute();

        // Assert
        expect(mockSelectTool.AttachGizmo).not.toHaveBeenCalled();
    });
});
