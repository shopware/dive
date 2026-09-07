import { makeActionDeps } from '../../../__test__/actionDeps.ts';
import { DeselectObjectAction } from '../deselectobject.ts';
import { Object3D } from 'three/webgpu';
import { DIVE, type DIVESelectable, DIVESceneObject } from '@shopware-ag/dive';
import { type EntitySchema } from '../../../../types/index.ts';
import { type Toolbox, type SelectionState } from '@shopware-ag/dive/toolbox';

const mockSceneObject = {
    attach: vi.fn(),
    isSelectable: true,
} as unknown as Object3D & DIVESelectable;

const mockSelectionState = {
    // the silent variants: the action announces the change itself, through
    // performAction, so the object must not announce it as well
    applySelection: vi.fn(),
    applyDeselection: vi.fn(),
} as unknown as SelectionState;

const mockGetToolbox = vi.fn().mockResolvedValue({
    selectionState: mockSelectionState,
} as unknown as Toolbox);

const deps = makeActionDeps();

describe('DeselectObjectAction', () => {
    beforeEach(() => {
        deps.registry.clear();
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

        deps.registry.register(
            testObject,
            mockSceneObject as unknown as DIVESceneObject,
        );

        // Act
        const action = new DeselectObjectAction(
            { id: 'test-object' },
            {
                getToolbox: mockGetToolbox,
                ...deps,
            },
        );
        await action.execute();

        // Assert
        expect(mockSelectionState.applyDeselection).toHaveBeenCalled();
    });

    it('should return false if object does not exist', async () => {
        // Act
        const action = new DeselectObjectAction(
            { id: 'non-existent-object' },
            {
                getToolbox: mockGetToolbox,
                ...deps,
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

        // registered, but with no scene object of its own
        deps.registry.register(testObject);

        // Act
        const action = new DeselectObjectAction(
            { id: 'test-object' },
            {
                getToolbox: mockGetToolbox,
                ...deps,
            },
        );

        // Assert
        await expect(action.execute()).rejects.toThrow(
            'Object is not in the scene.',
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

        deps.registry.register(testObject, {} as DIVESceneObject);

        // Act
        const action = new DeselectObjectAction(
            { id: 'test-object' },
            {
                getToolbox: mockGetToolbox,
                ...deps,
            },
        );

        // Assert
        await expect(action.execute()).rejects.toThrow(
            'Object is not selectable.',
        );
    });
});
