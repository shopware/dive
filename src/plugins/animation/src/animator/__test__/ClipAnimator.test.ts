import { ClipAnimator } from '../ClipAnimator.ts';

vi.mock('three', async (importOriginal) => {
    const actual = (await importOriginal()) as any;
    return {
        ...actual,
        AnimationMixer: vi.fn().mockImplementation(function (this: any) {
            this._actions = [];
            this._listeners = {} as any;
            this.clipAction = vi.fn().mockImplementation((clip: any) => {
                const action = {
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
                };
                this._actions.push(action);
                return action;
            });
            this.stopAllAction = vi.fn();
            this.uncacheRoot = vi.fn();
            this.getRoot = vi.fn();
            this.update = vi.fn();
            this.addEventListener = vi.fn().mockImplementation(
                (type: string, cb: any) => {
                    if (!this._listeners) this._listeners = {};
                    this._listeners[type] = cb;
                },
            );
            return this;
        }),
        AnimationClip: vi.fn().mockImplementation(function (
            this: any,
            name: string,
            duration: number,
        ) {
            this.name = name;
            this.duration = duration;
            return this;
        }),
        Object3D: vi.fn().mockImplementation(function (this: any) {
            return this;
        }),
    };
});

function createClip(name: string, duration: number): any {
    return { name, duration };
}

describe('ClipAnimator', () => {
    let animator: ClipAnimator;
    let root: any;
    let clips: any[];

    beforeEach(() => {
        root = {};
        clips = [
            createClip('Walk', 2),
            createClip('Idle', 1),
            createClip('Jump', 0.5),
        ];
        animator = new ClipAnimator(root, clips);
    });

    afterEach(() => {
        animator.dispose();
    });

    describe('Instance', () => {
        it('should create instance', () => {
            expect(animator).toBeDefined();
        });

        it('should have a unique uuid', () => {
            expect(animator.uuid).toBeDefined();
            expect(typeof animator.uuid).toBe('string');
        });

        it('should start in idle state', () => {
            expect(animator.state).toBe('idle');
        });

        it('should default loop to once', () => {
            expect(animator.loop).toBe('once');
        });
    });

    describe('Clip Names', () => {
        it('should return all clip names', () => {
            expect(animator.clipNames).toEqual(['Walk', 'Idle', 'Jump']);
        });

        it('should return null for currentClipName when idle', () => {
            expect(animator.currentClipName).toBeNull();
        });
    });

    describe('Playback Control', () => {
        it('should play the first clip by default', () => {
            animator.play();
            expect(animator.state).toBe('playing');
            expect(animator.currentClipName).toBe('Walk');
        });

        it('should play a specific clip by name', () => {
            animator.play('Idle');
            expect(animator.state).toBe('playing');
            expect(animator.currentClipName).toBe('Idle');
        });

        it('should return this when clip not found', () => {
            const result = animator.play('NonExistent');
            expect(result).toBe(animator);
        });

        it('should set state to paused on pause()', () => {
            animator.play();
            animator.pause();
            expect(animator.state).toBe('paused');
        });

        it('should set state to playing on resume()', () => {
            animator.play();
            animator.pause();
            animator.resume();
            expect(animator.state).toBe('playing');
        });

        it('should set state to idle on stop()', () => {
            animator.play();
            animator.stop();
            expect(animator.state).toBe('idle');
            expect(animator.currentClipName).toBeNull();
        });

        it('should return this for chaining', () => {
            expect(animator.play()).toBe(animator);
            expect(animator.pause()).toBe(animator);
            expect(animator.resume()).toBe(animator);
            expect(animator.stop()).toBe(animator);
        });
    });

    describe('Duration', () => {
        it('should return 0 when no clip is playing', () => {
            expect(animator.duration).toBe(0);
        });

        it('should return clip duration when playing', () => {
            animator.play('Walk');
            expect(animator.duration).toBe(2);
        });
    });

    describe('Loop', () => {
        it('should set loop modes', () => {
            animator.loop = 'repeat';
            expect(animator.loop).toBe('repeat');

            animator.loop = 'pingpong';
            expect(animator.loop).toBe('pingpong');

            animator.loop = 'once';
            expect(animator.loop).toBe('once');
        });
    });

    describe('Events', () => {
        it('should dispatch play event', () => {
            const listener = vi.fn();
            animator.addEventListener('play', listener);
            animator.play();
            expect(listener).toHaveBeenCalledTimes(1);
        });

        it('should dispatch pause event', () => {
            const listener = vi.fn();
            animator.addEventListener('pause', listener);
            animator.play();
            animator.pause();
            expect(listener).toHaveBeenCalledTimes(1);
        });

        it('should dispatch resume event', () => {
            const listener = vi.fn();
            animator.addEventListener('resume', listener);
            animator.play();
            animator.pause();
            animator.resume();
            expect(listener).toHaveBeenCalledTimes(1);
        });

        it('should dispatch stop event', () => {
            const listener = vi.fn();
            animator.addEventListener('stop', listener);
            animator.play();
            animator.stop();
            expect(listener).toHaveBeenCalledTimes(1);
        });
    });

    describe('Update', () => {
        it('should not throw on update', () => {
            animator.play();
            expect(() => animator.update(0.016)).not.toThrow();
        });
    });

    describe('Dispose', () => {
        it('should set state to idle on dispose', () => {
            animator.play();
            animator.dispose();
            expect(animator.state).toBe('idle');
            expect(animator.currentClipName).toBeNull();
        });
    });
});
