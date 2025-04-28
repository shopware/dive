import { MoveCameraAction } from '../movecamera';
import { COMEntity } from '../../../types';
import { OrbitController } from '../../../../controller/orbit/OrbitController';
import { Vector3 } from 'three';
import { DIVEEngine } from '../../../../../engine';
import { ModuleImporter } from '../../../..';

describe('MoveCameraAction', () => {
    it('should move camera to a new position and target', async () => {
        // Mock dependencies
        const mockController = {
            MoveTo: jest.fn(),
        } as unknown as OrbitController;

        const mockRegistered = new Map<string, COMEntity>();

        const mockAnimationSystem = {
            instantiate: jest.fn().mockResolvedValue({
                createAnimator: jest.fn(),
            }),
        } as unknown as ModuleImporter<'AnimationSystem'>;

        const mockEngine = {
            pipeline: {
                addPreRenderStep: jest.fn(),
                removePreRenderStep: jest.fn(),
            },
        } as unknown as DIVEEngine;

        const action = new MoveCameraAction(
            {
                position: new Vector3(1, 1, 1),
                target: new Vector3(0, 0, 0),
                locked: true,
                duration: 1000,
            },
            {
                controller: mockController,
                registered: mockRegistered,
                AnimationSystem: mockAnimationSystem,
                engine: mockEngine,
            },
        );

        // Execute action
        action.execute();

        // Verify results
        expect(mockController.MoveTo).toHaveBeenCalledWith(
            expect.objectContaining({ x: 1, y: 1, z: 1 }),
            expect.objectContaining({ x: 0, y: 0, z: 0 }),
            1000,
            true,
        );
    });

    it('should move camera to a POV position and target', async () => {
        // Mock dependencies
        const mockController = {
            MoveTo: jest.fn(),
        } as unknown as OrbitController;

        const mockRegistered = new Map<string, COMEntity>();

        const mockAnimationSystem = {
            instantiate: jest.fn().mockResolvedValue({
                createAnimator: jest.fn(),
            }),
        } as unknown as ModuleImporter<'AnimationSystem'>;

        const mockEngine = {
            pipeline: {
                addPreRenderStep: jest.fn(),
                removePreRenderStep: jest.fn(),
            },
        } as unknown as DIVEEngine;

        const testPOV: COMEntity = {
            id: 'test-pov',
            entityType: 'pov',
            position: new Vector3(1, 1, 1),
            target: new Vector3(0, 0, 0),
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            name: 'Test POV',
            visible: true,
        } as unknown as COMEntity;

        // Add the POV first
        mockRegistered.set(testPOV.id, testPOV);

        const action = new MoveCameraAction(
            {
                id: 'test-pov',
                locked: true,
                duration: 1000,
            },
            {
                controller: mockController,
                registered: mockRegistered,
                AnimationSystem: mockAnimationSystem,
                engine: mockEngine,
            },
        );

        // Execute action
        action.execute();

        // Verify results
        expect(mockController.MoveTo).toHaveBeenCalledWith(
            expect.objectContaining({ x: 1, y: 1, z: 1 }),
            expect.objectContaining({ x: 0, y: 0, z: 0 }),
            1000,
            true,
        );
    });

    it('should throw error if POV is not registered', async () => {
        // Mock dependencies
        const mockController = {
            MoveTo: jest.fn(),
        } as unknown as OrbitController;

        const mockRegistered = new Map<string, COMEntity>();

        const mockAnimationSystem = {
            instantiate: jest.fn().mockResolvedValue({
                createAnimator: jest.fn(),
            }),
        } as unknown as ModuleImporter<'AnimationSystem'>;

        const mockEngine = {
            pipeline: {
                addPreRenderStep: jest.fn(),
                removePreRenderStep: jest.fn(),
            },
        } as unknown as DIVEEngine;

        const action = new MoveCameraAction(
            {
                id: 'non-existent-pov',
                locked: true,
                duration: 1000,
            },
            {
                controller: mockController,
                registered: mockRegistered,
                AnimationSystem: mockAnimationSystem,
                engine: mockEngine,
            },
        );

        // Execute action and expect error
        expect(() => action.execute()).toThrow(
            'POV with id non-existent-pov not registered. Registered: [object Map]',
        );
    });

    it('should throw error if object is not a POV', async () => {
        // Mock dependencies
        const mockController = {
            MoveTo: jest.fn(),
        } as unknown as OrbitController;

        const mockRegistered = new Map<string, COMEntity>();

        const mockAnimationSystem = {
            instantiate: jest.fn().mockResolvedValue({
                createAnimator: jest.fn(),
            }),
        } as unknown as ModuleImporter<'AnimationSystem'>;

        const mockEngine = {
            pipeline: {
                addPreRenderStep: jest.fn(),
                removePreRenderStep: jest.fn(),
            },
        } as unknown as DIVEEngine;

        const testObject: COMEntity = {
            id: 'test-object',
            entityType: 'model',
            position: new Vector3(1, 1, 1),
            target: new Vector3(0, 0, 0),
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
        } as unknown as COMEntity;

        // Add the object first
        mockRegistered.set(testObject.id, testObject);

        const action = new MoveCameraAction(
            {
                id: 'test-object',
                locked: true,
                duration: 1000,
            },
            {
                controller: mockController,
                registered: mockRegistered,
                AnimationSystem: mockAnimationSystem,
                engine: mockEngine,
            },
        );

        // Execute action and expect error
        expect(() => action.execute()).toThrow(
            'Object with id test-object is not a POV. Object: [object Object]',
        );
    });
});
