import { TargetAnimator, AnimationTarget } from '../TargetAnimator.ts';

vi.mock('@tweenjs/tween.js', () => {
    class MockTween {
        private _object: any;
        private _to: any;
        private _group: any;
        public _onUpdateCb: any;
        public _onCompleteCb: any;
        private _repeat = 0;
        constructor(object: any, group: any) {
            this._object = object;
            this._group = group;
            if (group && group.add) group.add(this);
        }
        to(target: any, _duration: number) {
            this._to = target;
            return this;
        }
        easing() {
            return this;
        }
        onUpdate(cb: any) {
            this._onUpdateCb = cb;
            return this;
        }
        onComplete(cb: any) {
            this._onCompleteCb = cb;
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
        repeat(n: number) {
            this._repeat = n;
            return this;
        }
        yoyo() {
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

describe('TargetAnimator', () => {
    let animator: TargetAnimator;
    const targets: AnimationTarget[] = [
        { object: { x: 0, y: 0 }, to: { x: 100, y: 200 } },
    ];

    beforeEach(() => {
        animator = new TargetAnimator(targets, 1000);
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

        it('should have the correct duration', () => {
            expect(animator.duration).toBe(1000);
        });

        it('should default loop to once', () => {
            expect(animator.loop).toBe('once');
        });
    });

    describe('Playback Control', () => {
        it('should set state to playing on play()', () => {
            animator.play();
            expect(animator.state).toBe('playing');
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
        });

        it('should return this for chaining', () => {
            expect(animator.play()).toBe(animator);
            expect(animator.pause()).toBe(animator);
            expect(animator.resume()).toBe(animator);
            expect(animator.stop()).toBe(animator);
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

    describe('Multiple Targets', () => {
        it('should accept multiple targets', () => {
            const multiTargets: AnimationTarget[] = [
                { object: { x: 0 }, to: { x: 100 } },
                { object: { y: 0 }, to: { y: 200 } },
                { object: { z: 0 }, to: { z: 300 } },
            ];

            const multiAnimator = new TargetAnimator(multiTargets, 500);
            expect(multiAnimator).toBeDefined();
            multiAnimator.dispose();
        });
    });

    describe('Time', () => {
        it('should return time from first tween', () => {
            expect(animator.time).toBe(0);
        });

        it('should be a no-op on set (seeking not supported)', () => {
            animator.time = 500;
            expect(animator.time).toBe(0);
        });
    });

    describe('Update', () => {
        it('should not throw on update', () => {
            animator.play();
            expect(() => animator.update(0.016)).not.toThrow();
        });

        it('should skip group update when idle', () => {
            expect(() => animator.update(0.016)).not.toThrow();
        });
    });

    describe('Callbacks', () => {
        it('should call onUpdate callback and dispatch update event', () => {
            const onUpdate = vi.fn();
            const updateListener = vi.fn();
            const anim = new TargetAnimator(targets, 1000, { onUpdate });
            anim.addEventListener('update', updateListener);
            anim.play();

            const tweens = (anim as any)._tweens;
            tweens[0]._onUpdateCb();

            expect(onUpdate).toHaveBeenCalledTimes(1);
            expect(updateListener).toHaveBeenCalledTimes(1);
            anim.dispose();
        });

        it('should call onComplete callback and dispatch complete event when all tweens finish', () => {
            const onComplete = vi.fn();
            const completeListener = vi.fn();
            const anim = new TargetAnimator(targets, 1000, { onComplete });
            anim.addEventListener('complete', completeListener);
            anim.play();

            const tweens = (anim as any)._tweens;
            tweens[0]._onCompleteCb();

            expect(anim.state).toBe('idle');
            expect(onComplete).toHaveBeenCalledTimes(1);
            expect(completeListener).toHaveBeenCalledTimes(1);
            anim.dispose();
        });

        it('should not complete until all tweens finish with multiple targets', () => {
            const onComplete = vi.fn();
            const multiTargets: AnimationTarget[] = [
                { object: { x: 0 }, to: { x: 100 } },
                { object: { y: 0 }, to: { y: 200 } },
            ];
            const anim = new TargetAnimator(multiTargets, 1000, { onComplete });
            anim.play();

            const tweens = (anim as any)._tweens;
            tweens[0]._onCompleteCb();
            expect(anim.state).toBe('playing');
            expect(onComplete).not.toHaveBeenCalled();

            tweens[1]._onCompleteCb();
            expect(anim.state).toBe('idle');
            expect(onComplete).toHaveBeenCalledTimes(1);
            anim.dispose();
        });
    });

    describe('Dispose', () => {
        it('should set state to idle on dispose', () => {
            animator.play();
            animator.dispose();
            expect(animator.state).toBe('idle');
        });
    });
});
