import { MoveCameraAction } from '../movecamera.ts';
import { EntitySchema } from '@shopware-ag/dive';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { Vector3 } from 'three';
import { DIVE } from '@shopware-ag/dive';

vi.mock('three');

const mockStop = vi.fn();
const mockPlay = vi.fn().mockReturnThis();
const mockAnimator = {
    play: mockPlay,
    stop: mockStop,
};
const mockAnimate = vi.fn().mockReturnValue(mockAnimator);

const mockGetAnimationSystem = vi.fn().mockResolvedValue({
    animate: mockAnimate,
    Easing: {
        Quadratic: {
            Out: vi.fn(),
        },
    },
});

const mockEngine = {
    clock: {
        addTicker: vi.fn(),
        hasTicker: vi.fn(),
    },
} as unknown as DIVE;

const mockController = {
    object: {
        position: new Vector3(1, 1, 1),
        lookAt: vi.fn(),
    },
    target: new Vector3(0, 0, 0),
    enabled: true,
} as unknown as OrbitController;

describe('MoveCameraAction', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockAnimate.mockReturnValue(mockAnimator);
    });

    describe('Direct Position Movement', () => {
        it('should move camera to a new position and target', async () => {
            const mockRegistered = new Map<string, EntitySchema>();

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
                    getAnimationSystem: mockGetAnimationSystem,
                    engine: mockEngine,
                },
            );

            const result = await action.execute();

            expect(mockGetAnimationSystem).toHaveBeenCalled();
            expect(mockEngine.clock.addTicker).toHaveBeenCalled();

            expect(mockAnimate).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        object: mockController.object.position,
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

            expect(result.stop).toBeDefined();
            expect(typeof result.stop).toBe('function');
        });

        it('should handle unlocked camera movement', async () => {
            const mockRegistered = new Map<string, EntitySchema>();

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
                    getAnimationSystem: mockGetAnimationSystem,
                    engine: mockEngine,
                },
            );

            await action.execute();

            const onCompleteCallback =
                mockAnimate.mock.calls[0][2].onComplete;
            onCompleteCallback();

            expect(mockController.enabled).toBe(true);
        });
    });

    describe('POV-based Movement', () => {
        it('should move camera to a POV position and target', async () => {
            const mockRegistered = new Map<string, EntitySchema>();

            const testPOV: EntitySchema = {
                id: 'test-pov',
                entityType: 'pov',
                position: new Vector3(1, 1, 1),
                target: new Vector3(0, 0, 0),
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                name: 'Test POV',
                visible: true,
            } as unknown as EntitySchema;

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
                    getAnimationSystem: mockGetAnimationSystem,
                    engine: mockEngine,
                },
            );

            const result = await action.execute();

            expect(mockAnimate).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        object: mockController.object.position,
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

        it('should throw error if POV is not registered', async () => {
            const mockRegistered = new Map<string, EntitySchema>();

            const action = new MoveCameraAction(
                {
                    id: 'non-existent-pov',
                    locked: true,
                    duration: 1000,
                },
                {
                    controller: mockController,
                    registered: mockRegistered,
                    getAnimationSystem: mockGetAnimationSystem,
                    engine: mockEngine,
                },
            );

            await expect(action.execute()).rejects.toThrow(
                'POV with id non-existent-pov not registered',
            );
        });

        it('should throw error if object is not a POV', async () => {
            const mockRegistered = new Map<string, EntitySchema>();

            const testObject: EntitySchema = {
                id: 'test-object',
                entityType: 'model',
                position: new Vector3(1, 1, 1),
                target: new Vector3(0, 0, 0),
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            } as unknown as EntitySchema;

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
                    getAnimationSystem: mockGetAnimationSystem,
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
            const mockRegistered = new Map<string, EntitySchema>();

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
                    getAnimationSystem: mockGetAnimationSystem,
                    engine: mockEngine,
                },
            );

            await action.execute();

            const options = mockAnimate.mock.calls[0][2];
            options.onUpdate();

            expect(mockController.object.lookAt).toHaveBeenCalledWith(
                mockController.target,
            );
        });

        it('should handle animation stop', async () => {
            const mockRegistered = new Map<string, EntitySchema>();

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
                    getAnimationSystem: mockGetAnimationSystem,
                    engine: mockEngine,
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
