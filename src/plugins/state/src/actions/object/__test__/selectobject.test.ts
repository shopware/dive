import { makeActionDeps } from '../../../__test__/actionDeps.ts';
import { DIVE, DIVESceneObject, DIVESelectable } from '@shopware-ag/dive';
import { type EntitySchema } from '../../../../types/index.ts';
import { SelectObjectAction } from '../selectobject.ts';
import { Object3D } from 'three/webgpu';
import { Toolbox, SelectionState } from '@shopware-ag/dive/toolbox';

const mockSceneObject = {
    attach: vi.fn(),
    isSelectable: true,
} as unknown as Object3D & DIVESelectable;

const mockSelectionState = {
    select: vi.fn(),
    deselect: vi.fn(),
} as unknown as SelectionState;

const mockGetToolbox = () => {
    return Promise.resolve({
        selectionState: mockSelectionState,
    } as unknown as Toolbox);
};

const deps = makeActionDeps();

describe('SelectObjectAction', () => {
    beforeEach(() => {
        deps.registry.clear();
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

        deps.registry.register(
            testObject,
            mockSceneObject as unknown as DIVESceneObject,
        );

        // Act
        const action = new SelectObjectAction(
            { id: 'test-object' },
            {
                getToolbox: mockGetToolbox,
                ...deps,
            },
        );
        await action.execute();

        // Assert
        expect(mockSelectionState.select).toHaveBeenCalledWith(mockSceneObject);
    });

    it('should return false if object does not exist', async () => {
        // Act
        const action = new SelectObjectAction(
            { id: 'non-existent-object' },
            {
                getToolbox: mockGetToolbox,
                ...deps,
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

        // registered, but with no scene object of its own
        deps.registry.register(testObject);

        // Act
        const action = new SelectObjectAction(
            { id: 'test-object' },
            {
                getToolbox: mockGetToolbox,
                ...deps,
            },
        );
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
        };

        deps.registry.register(testObject, {} as DIVESceneObject);

        // Act
        const action = new SelectObjectAction(
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
