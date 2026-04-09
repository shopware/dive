import { DeselectObjectAction } from '../deselectobject.ts';
import { Object3D } from 'three/webgpu';
import {
    DIVE,
    type DIVESelectable,
    DIVESceneObject,
    type EntitySchema,
} from '@shopware-ag/dive';
import { type Toolbox, type SelectionState } from '@shopware-ag/dive/toolbox';

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

const mockSelectionState = {
    select: vi.fn(),
    deselect: vi.fn(),
} as unknown as SelectionState;

const mockGetToolbox = vi.fn().mockResolvedValue({
    selectionState: mockSelectionState,
} as unknown as Toolbox);

const mockRegistered = new Map<string, EntitySchema>();

describe('DeselectObjectAction', () => {
    beforeEach(() => {
        mockRegistered.clear();
        vi.clearAllMocks();
    });

    it('should deselect an object', async () => {
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
        } as unknown as EntitySchema;

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
        expect(mockSelectionState.deselect).toHaveBeenCalled();
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
        } as unknown as EntitySchema;

        mockRegistered.set(testObject.id, testObject);
        vi.mocked(mockEngine.scene.root.getSceneObject).mockReturnValueOnce(
            undefined,
        );

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
        } as unknown as EntitySchema;

        mockRegistered.set(testObject.id, testObject);
        vi.mocked(mockEngine.scene.root.getSceneObject).mockReturnValueOnce(
            {} as DIVESceneObject,
        );

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
});
