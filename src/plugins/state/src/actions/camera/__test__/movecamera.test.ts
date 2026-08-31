import {
    makeActionDeps,
    makeCameraController,
} from '../../../__test__/actionDeps.ts';
import { type EngineGateway } from '../../../EngineGateway.ts';
import { MoveCameraAction } from '../movecamera.ts';
import { EntitySchema } from '../../../../types/index.ts';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { Vector3 } from 'three/webgpu';
import { DIVE } from '@shopware-ag/dive';

const mockStop = vi.fn();
const mockPlay = vi.fn().mockReturnThis();
const mockAnimator = {
    play: mockPlay,
    stop: mockStop,
};
const mockFromTargets = vi.fn().mockResolvedValue(mockAnimator);

const mockGetAnimationSystem = vi.fn().mockResolvedValue({
    fromTargets: mockFromTargets,
    Easing: {
        Quadratic: {
            Out: vi.fn(),
        },
    },
});

const mockGateway = {
    registerTicker: vi.fn(),
} as unknown as EngineGateway;

/**
 * a real node and camera component rather than a spy: what matters is where the
 * camera ends up looking, and a recorded call cannot tell that
 */
const mockController = Object.assign(
    makeCameraController(new Vector3(1, 1, 1), new Vector3(0, 0, 0)),
    { enabled: true },
) as unknown as OrbitController;

describe('MoveCameraAction', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockFromTargets.mockResolvedValue(mockAnimator);
    });

    describe('Direct Position Movement', () => {
        it('should move camera to a new position and target', async () => {
            const deps = makeActionDeps();

            const action = new MoveCameraAction(
                {
                    position: new Vector3(1, 1, 1),
                    target: new Vector3(0, 0, 0),
                    locked: true,
                    duration: 1000,
                },
                {
                    controller: mockController,
                    ...deps,
                    getAnimationSystem: mockGetAnimationSystem,
                    gateway: mockGateway,
                },
            );

            const result = await action.execute();

            expect(mockGetAnimationSystem).toHaveBeenCalled();
            expect(mockGateway.registerTicker).toHaveBeenCalled();

            expect(mockFromTargets).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        object: mockController.object.owner!.position,
                        to: expect.objectContaining({ x: 1, y: 1, z: 1 }),
                    }),
                    expect.objectContaining({
                        object: mockController.target,
                        to: expect.objectContaining({ x: 0, y: 0, z: 0 }),
                    }),
                ]),
                1000,
                expect.objectContaining({
                    easing: expect.any(Function),
                    onUpdate: expect.any(Function),
                    onComplete: expect.any(Function),
                }),
            );
            expect(mockPlay).toHaveBeenCalledTimes(1);

            expect(result.stop).toBeDefined();
            expect(typeof result.stop).toBe('function');
        });

        it('should handle unlocked camera movement', async () => {
            const deps = makeActionDeps();

            const action = new MoveCameraAction(
                {
                    position: new Vector3(1, 1, 1),
                    target: new Vector3(0, 0, 0),
                    locked: false,
                    duration: 1000,
                },
                {
                    controller: mockController,
                    ...deps,
                    getAnimationSystem: mockGetAnimationSystem,
                    gateway: mockGateway,
                },
            );

            await action.execute();

            const onCompleteCallback =
                mockFromTargets.mock.calls[0][2].onComplete;
            onCompleteCallback();

            expect(mockController.enabled).toBe(true);
        });
    });

    describe('CAMERA-based Movement', () => {
        it('should move camera to a CAMERA position and target', async () => {
            const deps = makeActionDeps();

            const testCAMERA: EntitySchema = {
                id: 'test-camera',
                entityType: 'camera',
                position: new Vector3(1, 1, 1),
                target: new Vector3(0, 0, 0),
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                name: 'Test CAMERA',
                visible: true,
            } as unknown as EntitySchema;

            deps.registry.register(testCAMERA);

            const action = new MoveCameraAction(
                {
                    id: 'test-camera',
                    locked: true,
                    duration: 1000,
                },
                {
                    controller: mockController,
                    ...deps,
                    getAnimationSystem: mockGetAnimationSystem,
                    gateway: mockGateway,
                },
            );

            const result = await action.execute();

            expect(mockFromTargets).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        object: mockController.object.owner!.position,
                    }),
                    expect.objectContaining({
                        object: mockController.target,
                    }),
                ]),
                1000,
                expect.objectContaining({
                    easing: expect.any(Function),
                    onComplete: expect.any(Function),
                }),
            );

            expect(result.stop).toBeDefined();
            expect(typeof result.stop).toBe('function');
        });

        it('should throw error if CAMERA is not registered', async () => {
            const deps = makeActionDeps();

            const action = new MoveCameraAction(
                {
                    id: 'non-existent-camera',
                    locked: true,
                    duration: 1000,
                },
                {
                    controller: mockController,
                    ...deps,
                    getAnimationSystem: mockGetAnimationSystem,
                    gateway: mockGateway,
                },
            );

            await expect(action.execute()).rejects.toThrow(
                'CAMERA with id non-existent-camera not registered',
            );
        });

        it('should throw error if object is not a CAMERA', async () => {
            const deps = makeActionDeps();

            const testObject: EntitySchema = {
                id: 'test-object',
                entityType: 'model',
                position: new Vector3(1, 1, 1),
                target: new Vector3(0, 0, 0),
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            } as unknown as EntitySchema;

            deps.registry.register(testObject);

            const action = new MoveCameraAction(
                {
                    id: 'test-object',
                    locked: true,
                    duration: 1000,
                },
                {
                    controller: mockController,
                    ...deps,
                    getAnimationSystem: mockGetAnimationSystem,
                    gateway: mockGateway,
                },
            );

            await expect(action.execute()).rejects.toThrow(
                'Object with id test-object is not a CAMERA',
            );
        });
    });

    describe('Animation Callbacks', () => {
        it('should turn the camera towards the target on update', async () => {
            const deps = makeActionDeps();

            const action = new MoveCameraAction(
                {
                    position: new Vector3(1, 1, 1),
                    target: new Vector3(0, 0, 0),
                    locked: true,
                    duration: 1000,
                },
                {
                    controller: mockController,
                    ...deps,
                    getAnimationSystem: mockGetAnimationSystem,
                    gateway: mockGateway,
                },
            );

            await action.execute();

            const options = mockFromTargets.mock.calls[0][2];
            options.onUpdate();

            /**
             * the camera stands at (1,1,1) looking at the origin, so it faces
             * down the diagonal -- and not the other way along it
             */
            const direction = new Vector3(0, 0, -1).applyQuaternion(
                mockController.object.owner.quaternion,
            );
            expect(direction.x).toBeCloseTo(-1 / Math.sqrt(3), 5);
            expect(direction.y).toBeCloseTo(-1 / Math.sqrt(3), 5);
            expect(direction.z).toBeCloseTo(-1 / Math.sqrt(3), 5);
        });

        it('should handle animation stop', async () => {
            const deps = makeActionDeps();

            const action = new MoveCameraAction(
                {
                    position: new Vector3(1, 1, 1),
                    target: new Vector3(0, 0, 0),
                    locked: true,
                    duration: 1000,
                },
                {
                    controller: mockController,
                    ...deps,
                    getAnimationSystem: mockGetAnimationSystem,
                    gateway: mockGateway,
                },
            );

            const result = await action.execute();
            expect(result).toBeDefined();
            expect(result.stop).toBeDefined();
            result.stop();

            expect(mockStop).toHaveBeenCalledTimes(1);
        });
    });
});
