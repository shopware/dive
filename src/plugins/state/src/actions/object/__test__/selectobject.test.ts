import {
    DIVE,
    DIVESceneObject,
    DIVESelectable,
    type EntitySchema,
} from '@shopware-ag/dive';
import { SelectObjectAction } from '../selectobject.ts';
import { Object3D } from 'three';
import { DIVESelectTool, Toolbox } from '@shopware-ag/dive/toolbox';

const mockSceneObject = {
    attach: vi.fn(),
    isSelectable: true,
} as unknown as Object3D & DIVESelectable;

const mockEngine = {
    scene: {
        root: {
            getSceneObject: vi.fn().mockReturnValue(mockSceneObject),
        },
    },
} as unknown as DIVE;

const mockSelectTool = {
    isSelectTool: true,
    attachGizmo: vi.fn().mockImplementation(() => {}),
} as unknown as DIVESelectTool;

const mockGetActiveTool = vi.fn().mockReturnValue(mockSelectTool);
const mockGetToolbox = () => {
    return Promise.resolve({
        getActiveTool: mockGetActiveTool,
    } as unknown as Toolbox);
};

const mockRegistered = new Map<string, EntitySchema>();

describe('SelectObjectAction', () => {
    beforeEach(() => {
        mockRegistered.clear();
        vi.clearAllMocks();
    });

    it('should select an object', async () => {
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
        expect(mockSelectTool.attachGizmo).toHaveBeenCalledWith(
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
        vi.mocked(mockEngine.scene.root.getSceneObject).mockReturnValueOnce(
            undefined,
        );

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
        vi.mocked(mockEngine.scene.root.getSceneObject).mockReturnValueOnce(
            {} as DIVESceneObject,
        );

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
        expect(mockSelectTool.attachGizmo).not.toHaveBeenCalled();
    });
});
