import { AnimationSystem } from '../AnimationSystem.ts';

vi.mock('@tweenjs/tween.js', () => {
    class MockTween {
        private _group: any;
        constructor(object: any, group: any) {
            this._group = group;
            if (group && group.add) group.add(this);
        }
        to() {
            return this;
        }
        easing() {
            return this;
        }
        onUpdate() {
            return this;
        }
        onComplete() {
            return this;
        }
        start() {
            return this;
        }
        stop() {
            return this;
        }
        pause() {
            return this;
        }
        resume() {
            return this;
        }
        repeat() {
            return this;
        }
        getDuration() {
            return 0;
        }
    }

    class MockGroup {
        private _tweens: any[] = [];
        add(tween: any) {
            this._tweens.push(tween);
        }
        remove(tween: any) {
            this._tweens = this._tweens.filter((t) => t !== tween);
        }
        removeAll() {
            this._tweens = [];
        }
        getAll() {
            return [...this._tweens];
        }
        update() {
            return true;
        }
        allStopped() {
            return true;
        }
    }

    return {
        Tween: MockTween,
        Group: MockGroup,
        Easing: {
            Quadratic: { Out: (k: number) => k * (2 - k) },
            Linear: { None: (k: number) => k },
        },
    };
});

vi.mock('three', async (importOriginal) => {
    const actual = (await importOriginal()) as any;
    return {
        ...actual,
        AnimationMixer: vi.fn().mockImplementation(function (this: any) {
            this.clipAction = vi.fn().mockImplementation((clip: any) => ({
                clampWhenFinished: false,
                loop: 0,
                paused: false,
                time: 0,
                play: vi.fn().mockReturnThis(),
                stop: vi.fn().mockReturnThis(),
                reset: vi.fn().mockReturnThis(),
                fadeIn: vi.fn().mockReturnThis(),
                fadeOut: vi.fn().mockReturnThis(),
                getClip: vi.fn().mockReturnValue(clip),
            }));
            this.stopAllAction = vi.fn();
            this.uncacheRoot = vi.fn();
            this.getRoot = vi.fn();
            this.update = vi.fn();
            this.addEventListener = vi.fn();
            return this;
        }),
    };
});

describe('AnimationSystem', () => {
    let animationSystem: AnimationSystem;

    beforeEach(() => {
        animationSystem = new AnimationSystem();
    });

    afterEach(() => {
        animationSystem.dispose();
    });

    describe('Instance Management', () => {
        it('should create instance', () => {
            expect(animationSystem).toBeDefined();
        });

        it('should have a unique uuid', () => {
            expect(animationSystem.uuid).toBeDefined();
            expect(typeof animationSystem.uuid).toBe('string');
        });

        it('should expose Easing', () => {
            expect(animationSystem.Easing).toBeDefined();
            expect(animationSystem.Easing.Quadratic.Out).toBeDefined();
            expect(typeof animationSystem.Easing.Quadratic.Out).toBe(
                'function',
            );
        });
    });

    describe('fromTargets()', () => {
        it('should create a TargetAnimator', async () => {
            const animator = await animationSystem.fromTargets(
                [{ object: { x: 0 }, to: { x: 100 } }],
                1000,
            );
            expect(animator).toBeDefined();
            expect(animator.uuid).toBeDefined();
            expect(animator.state).toBe('idle');
        });

        it('should register the animator internally', async () => {
            const animator = await animationSystem.fromTargets(
                [{ object: { x: 0 }, to: { x: 100 } }],
                1000,
            );
            expect(
                animationSystem['_animators'].has(animator.uuid),
            ).toBeTruthy();
        });

        it('should accept multiple targets', async () => {
            const animator = await animationSystem.fromTargets(
                [
                    { object: { x: 0 }, to: { x: 100 } },
                    { object: { y: 0 }, to: { y: 200 } },
                ],
                1000,
            );
            expect(animator).toBeDefined();
        });

        it('should accept a single target without array', async () => {
            const animator = await animationSystem.fromTargets(
                { object: { x: 0 }, to: { x: 100 } },
                1000,
            );
            expect(animator).toBeDefined();
        });

        it('should accept options with easing', async () => {
            const animator = await animationSystem.fromTargets(
                [{ object: { x: 0 }, to: { x: 100 } }],
                1000,
                { easing: animationSystem.Easing.Quadratic.Out },
            );
            expect(animator).toBeDefined();
        });
    });

    describe('animate()', () => {
        it('should create and auto-play a TargetAnimator', async () => {
            const animator = await animationSystem.animate(
                [{ object: { x: 0 }, to: { x: 100 } }],
                1000,
            );
            expect(animator).toBeDefined();
            expect(animator.state).toBe('playing');
        });

        it('should register the animator internally', async () => {
            const animator = await animationSystem.animate(
                [{ object: { x: 0 }, to: { x: 100 } }],
                1000,
            );
            expect(
                animationSystem['_animators'].has(animator.uuid),
            ).toBeTruthy();
        });
    });

    describe('ClipAnimator Creation', () => {
        it('should create a ClipAnimator via fromClips()', async () => {
            const root = {};
            const clip = { name: 'test', duration: 1 };

            const animator = await animationSystem.fromClips(root as any, [
                clip as any,
            ]);
            expect(animator).toBeDefined();
            expect(animator.clipNames).toEqual(['test']);
        });

        it('should register the clip animator internally', async () => {
            const root = {};
            const clip = { name: 'test', duration: 1 };

            const animator = await animationSystem.fromClips(root as any, [
                clip as any,
            ]);
            expect(
                animationSystem['_animators'].has(animator.uuid),
            ).toBeTruthy();
        });
    });

    describe('Remove', () => {
        it('should remove an animator', async () => {
            const animator = await animationSystem.fromTargets(
                [{ object: { x: 0 }, to: { x: 100 } }],
                1000,
            );
            const uuid = animator.uuid;

            animationSystem.remove(uuid);
            expect(animationSystem['_animators'].has(uuid)).toBeFalsy();
        });

        it('should warn when removing non-existent animator', () => {
            const consoleSpy = vi
                .spyOn(console, 'warn')
                .mockImplementation(() => {});

            animationSystem.remove('non-existent-uuid');
            expect(consoleSpy).toHaveBeenCalledWith(
                'Animator with uuid non-existent-uuid not found',
            );

            consoleSpy.mockRestore();
        });
    });

    describe('Tick', () => {
        it('should call update on all registered animators', async () => {
            const animator = await animationSystem.fromTargets(
                [{ object: { x: 0 }, to: { x: 100 } }],
                1000,
            );

            const updateSpy = vi.spyOn(animator, 'update');

            animationSystem.tick(0.016);

            expect(updateSpy).toHaveBeenCalledWith(0.016);
        });

        it('should call update on both tween and clip animators', async () => {
            const tweenAnimator = await animationSystem.fromTargets(
                [{ object: { x: 0 }, to: { x: 100 } }],
                1000,
            );

            const root = {};
            const clip = { name: 'test', duration: 1 };
            const clipAnimator = await animationSystem.fromClips(root as any, [
                clip as any,
            ]);

            const tweenUpdateSpy = vi.spyOn(tweenAnimator, 'update');
            const clipUpdateSpy = vi.spyOn(clipAnimator, 'update');

            animationSystem.tick(0.016);

            expect(tweenUpdateSpy).toHaveBeenCalledWith(0.016);
            expect(clipUpdateSpy).toHaveBeenCalledWith(0.016);
        });
    });

    describe('Dispose', () => {
        it('should clear all animators', async () => {
            await animationSystem.fromTargets(
                [{ object: { x: 0 }, to: { x: 100 } }],
                1000,
            );
            await animationSystem.fromTargets(
                [{ object: { y: 0 }, to: { y: 200 } }],
                500,
            );

            expect(animationSystem['_animators'].size).toBe(2);

            animationSystem.dispose();

            expect(animationSystem['_animators'].size).toBe(0);
        });
    });
});
