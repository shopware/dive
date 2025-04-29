import { MoveCameraAction } from '../movecamera';
import { COMEntity } from '../../../types';
import { OrbitController } from '../../../../controller/orbit/OrbitController';
import { Vector3 } from 'three';
import { DIVEEngine } from '../../../../../engine';
import { ModuleImporter } from '../../../..';

const mockStop = jest.fn();
const mockCreateAnimator = jest.fn().mockReturnValue({
    play: jest.fn(),
    stop: mockStop,
});

const mockAnimationSystem = {
    instantiate: jest.fn().mockResolvedValue({
        createAnimator: mockCreateAnimator,
    }),
} as unknown as ModuleImporter<'AnimationSystem'>;

const mockEngine = {
    clock: {
        addTicker: jest.fn(),
    },
} as unknown as DIVEEngine;

const mockController = {
    object: {
        position: new Vector3(1, 1, 1),
        lookAt: jest.fn(),
    },
    target: new Vector3(0, 0, 0),
    enabled: true,
} as unknown as OrbitController;

describe('MoveCameraAction', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Direct Position Movement', () => {
        it('should move camera to a new position and target', async () => {
            const mockRegistered = new Map<string, COMEntity>();

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

            const result = await action.execute();

            // Verify animation system initialization
            expect(mockAnimationSystem.instantiate).toHaveBeenCalled();
            expect(mockEngine.clock.addTicker).toHaveBeenCalled();

            // Verify animator creation for position
            expect(mockCreateAnimator).toHaveBeenNthCalledWith(
                1,
                mockController.object.position,
                expect.objectContaining({ x: 1, y: 1, z: 1 }),
                1000,
                expect.objectContaining({ easing: expect.any(Function) }),
            );

            // Verify animator creation for target
            expect(mockCreateAnimator).toHaveBeenNthCalledWith(
                2,
                mockController.target,
                expect.objectContaining({ x: 0, y: 0, z: 0 }),
                1000,
                expect.objectContaining({
                    easing: expect.any(Function),
                    onComplete: expect.any(Function),
                    onUpdate: expect.any(Function),
                }),
            );

            // Verify stop function
            expect(result.stop).toBeDefined();
            expect(typeof result.stop).toBe('function');
        });

        it('should handle unlocked camera movement', async () => {
            const mockRegistered = new Map<string, COMEntity>();

            const action = new MoveCameraAction(
                {
                    position: new Vector3(1, 1, 1),
                    target: new Vector3(0, 0, 0),
                    locked: false,
                    duration: 1000,
                },
                {
                    controller: mockController,
                    registered: mockRegistered,
                    AnimationSystem: mockAnimationSystem,
                    engine: mockEngine,
                },
            );

            await action.execute();

            // Get the onComplete callback from the second animator call
            const onCompleteCallback =
                mockCreateAnimator.mock.calls[1][3].onComplete;
            onCompleteCallback();

            // Verify controller is enabled when unlocked
            expect(mockController.enabled).toBe(true);
        });
    });

    describe('POV-based Movement', () => {
        it('should move camera to a POV position and target', async () => {
            const mockRegistered = new Map<string, COMEntity>();

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

            const result = await action.execute();

            // Verify animator creation with POV values
            expect(mockCreateAnimator).toHaveBeenNthCalledWith(
                1,
                mockController.object.position,
                expect.objectContaining({ x: 1, y: 1, z: 1 }),
                1000,
                expect.objectContaining({ easing: expect.any(Function) }),
            );

            expect(mockCreateAnimator).toHaveBeenNthCalledWith(
                2,
                mockController.target,
                expect.objectContaining({ x: 0, y: 0, z: 0 }),
                1000,
                expect.objectContaining({
                    easing: expect.any(Function),
                    onComplete: expect.any(Function),
                    onUpdate: expect.any(Function),
                }),
            );

            // Verify stop function
            expect(result.stop).toBeDefined();
            expect(typeof result.stop).toBe('function');
        });

        it('should throw error if POV is not registered', async () => {
            const mockRegistered = new Map<string, COMEntity>();

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

            await expect(action.execute()).rejects.toThrow(
                'POV with id non-existent-pov not registered',
            );
        });

        it('should throw error if object is not a POV', async () => {
            const mockRegistered = new Map<string, COMEntity>();

            const testObject: COMEntity = {
                id: 'test-object',
                entityType: 'model',
                position: new Vector3(1, 1, 1),
                target: new Vector3(0, 0, 0),
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            } as unknown as COMEntity;

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

            await expect(action.execute()).rejects.toThrow(
                'Object with id test-object is not a POV',
            );
        });
    });

    describe('Animation Callbacks', () => {
        it('should call lookAt on update', async () => {
            const mockRegistered = new Map<string, COMEntity>();

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

            await action.execute();

            // Get the onUpdate callback from the second animator call
            const onUpdateCallback =
                mockCreateAnimator.mock.calls[1][3].onUpdate;
            onUpdateCallback();

            // Verify lookAt was called
            expect(mockController.object.lookAt).toHaveBeenCalledWith(
                mockController.target,
            );
        });

        it('should handle animation stop', async () => {
            const mockRegistered = new Map<string, COMEntity>();
            const mockAnimators = [
                { play: jest.fn().mockReturnThis(), stop: mockStop },
                { play: jest.fn().mockReturnThis(), stop: mockStop },
            ];
            mockCreateAnimator
                .mockReturnValueOnce(mockAnimators[0])
                .mockReturnValueOnce(mockAnimators[1]);
            (
                mockAnimationSystem.instantiate as jest.Mock
            ).mockResolvedValueOnce({
                createAnimator: mockCreateAnimator,
                addTicker: jest.fn(),
            });

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

            const result = await action.execute();
            expect(result).toBeDefined();
            expect(result.stop).toBeDefined();
            result.stop();

            // Verify both animators were stopped
            expect(mockStop).toHaveBeenCalledTimes(2);
        });
    });
});
