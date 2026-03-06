/* eslint-disable @typescript-eslint/no-explicit-any */
import { Group, Tween, Easing } from '@tweenjs/tween.js';
import { Animator } from './Animator.ts';
import { TAnimatorLoopMode, TAnimatorState } from '../types/AnimatorTypes.ts';

type EasingFunction = (amount: number) => number;

export type AnimationTarget = {
    object: any;
    to: any;
};

export type TargetAnimatorOptions = {
    easing?: EasingFunction;
    onUpdate?: () => void;
    onComplete?: () => void;
};

/**
 * Animator for programmatic target-based animations.
 *
 * Bundles multiple animation targets into a single logical animation unit
 * using an isolated TWEEN.Group per instance.
 *
 * @module
 */
export class TargetAnimator extends Animator {
    private _group: Group = new Group();
    private _tweens: Tween<any>[] = [];
    private _snapshots: { object: any; values: Record<string, any> }[] = [];
    private _state: TAnimatorState = 'idle';
    private _duration: number;
    private _loop: TAnimatorLoopMode = 'once';
    private _options?: TargetAnimatorOptions;
    private _completedCount: number = 0;

    constructor(
        targets: AnimationTarget | AnimationTarget[],
        duration: number,
        options?: TargetAnimatorOptions,
    ) {
        super();
        this._duration = duration;
        this._options = options;

        const targetsArray = Array.isArray(targets) ? targets : [targets];

        for (const target of targetsArray) {
            const snapshot: Record<string, any> = {};
            for (const key of Object.keys(target.to)) {
                snapshot[key] = target.object[key];
            }
            this._snapshots.push({ object: target.object, values: snapshot });

            const tween = new Tween(target.object, this._group)
                .to(target.to, duration)
                .easing(options?.easing ?? Easing.Quadratic.Out)
                .onComplete(() => {
                    this._completedCount++;
                    if (this._completedCount >= this._tweens.length) {
                        this._state = 'idle';
                        this._options?.onComplete?.();
                        this.dispatchEvent({ type: 'complete', target: this });
                    }
                });

            this._tweens.push(tween);
        }
    }

    public get state(): TAnimatorState {
        return this._state;
    }

    public get duration(): number {
        return this._duration;
    }

    public get loop(): TAnimatorLoopMode {
        return this._loop;
    }

    public set loop(value: TAnimatorLoopMode) {
        this._loop = value;
        this._tweens.forEach((t) => {
            t.repeat(value === 'once' ? 0 : Infinity);
            t.yoyo(value === 'pingpong');
        });
    }

    public get time(): number {
        return this._tweens.length > 0 ? this._tweens[0].getDuration() : 0;
    }

    public set time(_value: number) {
        // Seeking not natively supported by TWEEN groups
    }

    public play(): this {
        this._tweens.forEach((t) => t.stop());
        this._state = 'playing';
        this._completedCount = 0;
        this._restoreSnapshots();
        this._tweens.forEach((t) => t.start());
        this.dispatchEvent({ type: 'play', target: this });
        return this;
    }

    public pause(): this {
        this._state = 'paused';
        this._tweens.forEach((t) => t.pause());
        this.dispatchEvent({ type: 'pause', target: this });
        return this;
    }

    public resume(): this {
        this._state = 'playing';
        this._tweens.forEach((t) => t.resume());
        this.dispatchEvent({ type: 'resume', target: this });
        return this;
    }

    public stop(): this {
        this._state = 'idle';
        this._tweens.forEach((t) => t.stop());
        this._restoreSnapshots();
        this.dispatchEvent({ type: 'stop', target: this });
        return this;
    }

    public update(): void {
        if (this._state === 'idle') return;

        this._group.update();

        if (this._state === 'playing') {
            this._options?.onUpdate?.();
        }
    }

    private _restoreSnapshots(): void {
        for (const { object, values } of this._snapshots) {
            for (const key of Object.keys(values)) {
                object[key] = values[key];
            }
        }
    }

    public dispose(): void {
        this._tweens.forEach((t) => t.stop());
        this._tweens = [];
        this._group.removeAll();
        this._state = 'idle';
    }
}
