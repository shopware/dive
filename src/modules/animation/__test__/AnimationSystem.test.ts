import { AnimationSystem } from '../AnimationSystem';
import { Animator } from '../animator/Animator';
import { Tween, Easing } from '@tweenjs/tween.js';
import { TAnimatorParameters } from '../types/AnimatorParameters';

jest.mock('@tweenjs/tween.js');
jest.mock('../animator/Animator', () => ({
    Animator: jest.fn().mockImplementation((object, to, duration, options) => ({
        uuid: 'mock-animator-uuid',
        object,
        to,
        duration,
        options,
        addEventListener: jest.fn(),
        play: jest.fn(),
        stop: jest.fn(),
    })),
}));

describe('dive/animation/DIVEAnimationSystem', () => {
    let animationSystem: AnimationSystem;
    let mockTween: jest.Mocked<Tween<any>> & {
        updateCallback: (object: any, elapsed: number) => void;
        completeCallback: (object: any) => void;
    };

    beforeEach(() => {
        animationSystem = new AnimationSystem();
        mockTween = {
            to: jest.fn().mockReturnThis(),
            easing: jest.fn().mockReturnThis(),
            onUpdate: jest
                .fn()
                .mockImplementation(
                    (cb: (object: any, elapsed: number) => void) => {
                        mockTween.updateCallback = cb;
                        return mockTween;
                    },
                ),
            onComplete: jest
                .fn()
                .mockImplementation((cb: (object: any) => void) => {
                    mockTween.completeCallback = cb;
                    return mockTween;
                }),
            start: jest.fn(),
            stop: jest.fn(),
            updateCallback: jest.fn(),
            completeCallback: jest.fn(),
        } as unknown as jest.Mocked<Tween<any>> & {
            updateCallback: (object: any, elapsed: number) => void;
            completeCallback: (object: any) => void;
        };
        (Tween as jest.Mock).mockReturnValue(mockTween);
        jest.clearAllMocks();
    });

    afterEach(() => {
        animationSystem.Dispose();
    });

    describe('Instance Management', () => {
        it('should create instance', () => {
            const instance1 = new AnimationSystem();
            expect(instance1).toBeDefined();
        });

        it('should have a unique uuid', () => {
            const uuid = animationSystem.uuid;
            expect(uuid).toBeDefined();
            expect(typeof uuid).toBe('string');
        });
    });

    describe('Animator Creation', () => {
        it('should create an animator', () => {
            const object = { x: 0 };
            const to = { x: 100 };
            const duration = 1000;
            const options: TAnimatorParameters<typeof object> = {
                easing: Easing.Quadratic.Out,
                onUpdate: jest.fn(),
                onComplete: jest.fn(),
            };

            const animator = animationSystem.createAnimator(
                object,
                to,
                duration,
                options,
            );
            expect(animator).toBeDefined();
        });

        it('should use default easing when not provided', () => {
            const object = { x: 0 };
            const to = { x: 100 };
            const duration = 1000;

            const animator = animationSystem.createAnimator(
                object,
                to,
                duration,
            );

            expect(mockTween.easing).toHaveBeenCalledWith(Easing.Quadratic.Out);
        });

        it('should register animator callbacks', () => {
            const object = { x: 0 };
            const to = { x: 100 };
            const duration = 1000;
            const animator = animationSystem.createAnimator(
                object,
                to,
                duration,
            );

            expect(
                animationSystem['_callbackMap'].has(animator.uuid),
            ).toBeTruthy();
            expect(animationSystem['_tweens'].has(animator.uuid)).toBeTruthy();
        });
    });

    describe('Animation Control', () => {
        it('should create a basic tween', () => {
            const target = { x: 0 };
            const tween = animationSystem.Animate(target);
            expect(Tween).toHaveBeenCalledWith(target);
        });

        it('should create tweens for different object types', () => {
            const numberTarget = { value: 0 };
            const vectorTarget = { x: 0, y: 0, z: 0 };
            const colorTarget = { r: 0, g: 0, b: 0 };

            const numberTween = animationSystem.Animate(numberTarget);
            const vectorTween = animationSystem.Animate(vectorTarget);
            const colorTween = animationSystem.Animate(colorTarget);

            expect(Tween).toHaveBeenCalledWith(numberTarget);
            expect(Tween).toHaveBeenCalledWith(vectorTarget);
            expect(Tween).toHaveBeenCalledWith(colorTarget);
        });

        it('should handle tick updates with active tweens', () => {
            const object = { x: 0 };
            const to = { x: 100 };
            const duration = 1000;
            const animator = animationSystem.createAnimator(
                object,
                to,
                duration,
            );

            // Verify tween is in the map
            expect(animationSystem['_tweens'].size).toBe(1);

            // Call tick
            animationSystem.tick();

            // updateTween from @tweenjs/tween.js should be called
            expect(
                jest.requireMock('@tweenjs/tween.js').update,
            ).toHaveBeenCalled();
        });
    });

    describe('Callback Management', () => {
        it('should unregister callbacks and tweens', () => {
            const object = { x: 0 };
            const to = { x: 100 };
            const duration = 1000;
            const animator = animationSystem.createAnimator(
                object,
                to,
                duration,
            );
            const uuid = animator.uuid;

            animationSystem.unregister(uuid);
            expect(animationSystem['_callbackMap'].has(uuid)).toBeFalsy();
            expect(animationSystem['_tweens'].has(uuid)).toBeFalsy();
        });

        it('should warn when unregistering non-existent animator', () => {
            const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
            const nonExistentUuid = 'non-existent-uuid';

            animationSystem.unregister(nonExistentUuid);
            expect(consoleSpy).toHaveBeenCalledWith(
                `Animator with uuid ${nonExistentUuid} not registered`,
            );
        });
    });

    describe('Disposal', () => {
        it('should have a Dispose method', () => {
            const object = { x: 0 };
            const to = { x: 100 };
            const duration = 1000;
            const animator = animationSystem.createAnimator(
                object,
                to,
                duration,
            );

            // Add some data to the maps
            expect(animationSystem['_callbackMap'].size).toBe(1);
            expect(animationSystem['_tweens'].size).toBe(1);

            // Call dispose
            animationSystem.Dispose();

            // Verify maps are cleared
            expect(animationSystem['_callbackMap'].size).toBe(0);
            expect(animationSystem['_tweens'].size).toBe(0);
        });
    });

    describe('Event Handling', () => {
        it('should handle play event', () => {
            const object = { x: 0 };
            const to = { x: 100 };
            const duration = 1000;
            const animator = animationSystem.createAnimator(
                object,
                to,
                duration,
            );

            // Get the play event listener callback
            const playCallback = (
                animator.addEventListener as jest.Mock
            ).mock.calls.find((call) => call[0] === 'play')[1];

            // Trigger the play event
            playCallback();

            expect(mockTween.start).toHaveBeenCalled();
        });

        it('should handle stop event', () => {
            const object = { x: 0 };
            const to = { x: 100 };
            const duration = 1000;
            const animator = animationSystem.createAnimator(
                object,
                to,
                duration,
            );

            // Get the stop event listener callback
            const stopCallback = (
                animator.addEventListener as jest.Mock
            ).mock.calls.find((call) => call[0] === 'stop')[1];

            // Trigger the stop event
            stopCallback();

            expect(mockTween.stop).toHaveBeenCalled();
        });

        it('should call update and complete callbacks', () => {
            const object = { x: 0 };
            const to = { x: 100 };
            const duration = 1000;
            const onUpdate = jest.fn();
            const onComplete = jest.fn();
            const options: TAnimatorParameters<typeof object> = {
                onUpdate,
                onComplete,
            };

            const animator = animationSystem.createAnimator(
                object,
                to,
                duration,
                options,
            );

            // Get the callback tuple from the map
            const callbackTuple = animationSystem['_callbackMap'].get(
                animator.uuid,
            );
            expect(callbackTuple).toBeDefined();

            // Get the update and complete callbacks from the mock tween
            const updateCallback = (mockTween.onUpdate as jest.Mock).mock
                .calls[0][0];
            const completeCallback = (mockTween.onComplete as jest.Mock).mock
                .calls[0][0];

            // Trigger the callbacks
            updateCallback(object, 0.5);
            expect(onUpdate).toHaveBeenCalledWith(object, 0.5);

            completeCallback(object);
            expect(onComplete).toHaveBeenCalledWith(object);
        });

        it('should handle missing callbacks gracefully', () => {
            const object = { x: 0 };
            const to = { x: 100 };
            const duration = 1000;
            const animator = animationSystem.createAnimator(
                object,
                to,
                duration,
            );

            // Get the update and complete callbacks from the mock tween
            const updateCallback = (mockTween.onUpdate as jest.Mock).mock
                .calls[0][0];
            const completeCallback = (mockTween.onComplete as jest.Mock).mock
                .calls[0][0];

            // Remove the animator from the callback map to test edge case
            animationSystem['_callbackMap'].delete(animator.uuid);

            // Should not throw when callbacks are missing
            expect(() => updateCallback(object, 0.5)).not.toThrow();
            expect(() => completeCallback(object)).not.toThrow();
        });

        it('should create default empty callbacks when none provided', () => {
            const object = { x: 0 };
            const to = { x: 100 };
            const duration = 1000;
            const animator = animationSystem.createAnimator(
                object,
                to,
                duration,
            );

            // Get the callback tuple from the map
            const callbackTuple = animationSystem['_callbackMap'].get(
                animator.uuid,
            );
            expect(callbackTuple).toBeDefined();

            // Get the update and complete callbacks from the mock tween
            const updateCallback = (mockTween.onUpdate as jest.Mock).mock
                .calls[0][0];
            const completeCallback = (mockTween.onComplete as jest.Mock).mock
                .calls[0][0];

            // Should not throw when calling the default callbacks
            expect(() => updateCallback(object, 0.5)).not.toThrow();
            expect(() => completeCallback(object)).not.toThrow();

            // The default callbacks should be empty functions
            expect(typeof callbackTuple?.onUpdate).toBe('function');
            expect(typeof callbackTuple?.onComplete).toBe('function');
        });
    });
});
