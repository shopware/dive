import { DIVEEngine } from '../../../../../engine';
import { DIVEScene } from '../../../../../engine/scene/Scene';
import { SelectObjectAction } from '../selectobject';
import { COMEntity } from '../../../types';
import { Object3D } from 'three';
import { DIVESelectable } from '../../../../../interfaces/Selectable';
import { DIVESelectTool } from '../../../../../modules/toolbox/select/SelectTool';
import { DIVEToolbox } from '../../../../../modules/toolbox/Toolbox';

describe('SelectObjectAction', () => {
    // Mock dependencies
    const mockSceneObject = {
        attach: jest.fn(),
        isSelectable: true,
    } as unknown as Object3D & DIVESelectable;

    const mockScene = {
        GetSceneObject: jest.fn().mockReturnValue(mockSceneObject),
    } as unknown as DIVEScene;

    const mockEngine = {
        scene: mockScene,
    } as unknown as DIVEEngine;

    const mockSelectTool = {
        isSelectTool: true,
        AttachGizmo: jest.fn().mockImplementation(() => {}),
    } as unknown as DIVESelectTool;

    const mockToolbox = {
        GetActiveTool: jest.fn().mockReturnValue(mockSelectTool),
    } as unknown as DIVEToolbox;

    const mockRegistered = new Map<string, COMEntity>();

    beforeEach(() => {
        mockRegistered.clear();
        jest.clearAllMocks();
    });

    it('should select an object', () => {
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
                toolbox: mockToolbox,
                registered: mockRegistered,
            },
        );
        action.execute();

        // Assert
        expect(mockSelectTool.AttachGizmo).toHaveBeenCalledWith(
            mockSceneObject,
        );
    });

    it('should return false if object does not exist', () => {
        // Act
        const action = new SelectObjectAction(
            { id: 'non-existent-object' },
            {
                engine: mockEngine,
                toolbox: mockToolbox,
                registered: mockRegistered,
            },
        );
        expect(() => action.execute()).toThrow('Object not found.');
    });

    it('should return false if object is not found in scene', () => {
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

        // Act
        const action = new SelectObjectAction(
            { id: 'test-object' },
            {
                engine: mockEngine,
                toolbox: mockToolbox,
                registered: mockRegistered,
            },
        );
        expect(() => action.execute()).toThrow('Object not found in scene.');
    });

    it('should return false if object is not selectable', () => {
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
        (mockScene.GetSceneObject as jest.Mock).mockReturnValueOnce(
            {} as Object3D,
        );

        // Act
        const action = new SelectObjectAction(
            { id: 'test-object' },
            {
                engine: mockEngine,
                toolbox: mockToolbox,
                registered: mockRegistered,
            },
        );

        // Assert
        expect(() => action.execute()).toThrow('Object is not selectable.');
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
        (mockToolbox.GetActiveTool as jest.Mock).mockReturnValueOnce(null);

        // Act
        const action = new SelectObjectAction(
            { id: 'test-object' },
            {
                engine: mockEngine,
                toolbox: mockToolbox,
                registered: mockRegistered,
            },
        );
        action.execute();

        // Assert
        expect(mockSelectTool.AttachGizmo).not.toHaveBeenCalled();
    });
});
