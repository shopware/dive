/* eslint-disable @typescript-eslint/no-explicit-any */
import { Easing, Tween, update as updateTween } from '@tweenjs/tween.js';
import { Animator } from './animator/Animator';
import { UUID } from '../../types/index.ts';
import { DIVETicker } from '../../engine/clock/Clock.ts';
import { TAnimatorParameters } from './types/AnimatorParameters.ts';
import { MathUtils } from 'three';

export type * from './animator/Animator.ts';

type CallbackTuple<T> = {
    onUpdate: (object: T, elapsed: number) => void;
    onComplete: (object: T) => void;
};

declare global {
    interface ModuleClasses {
        AnimationSystem: typeof AnimationSystem;
    }
}

/**
 * @module AnimationSystem
 *
 * Updates all animations.
 * DIVE uses Tween.js to handle animations.
 */

export class AnimationSystem implements DIVETicker {
    public uuid: string = MathUtils.generateUUID();

    private _callbackMap: Map<UUID, CallbackTuple<any>> = new Map();
    private _tweens: Map<UUID, Tween<any>> = new Map();

    /**
     * Creates a new animator and registers it.
     * @param object - The object to animate.
     * @param to - The target object.
     * @param duration - The duration of the animation.
     * @param options - The options for the animation.
     * @returns The animator.
     */
    public createAnimator<T extends object>(
        object: T,
        to: T,
        duration: number,
        options?: TAnimatorParameters<T>,
    ): Animator<T> {
        const animator = new Animator(object, to, duration, options);
        this._callbackMap.set(animator.uuid, {
            onUpdate: animator.options?.onUpdate ?? (() => {}),
            onComplete: animator.options?.onComplete ?? (() => {}),
        });

        this._setupTween(animator);
        return animator;
    }

    public unregister(uuid: UUID): void {
        if (!this._callbackMap.has(uuid)) {
            console.warn(`Animator with uuid ${uuid} not registered`);
            return;
        }

        this._callbackMap.delete(uuid);
        this._tweens.delete(uuid);
    }

    public Dispose(): void {
        this._callbackMap.clear();
        this._tweens.clear();
    }

    public tick(): void {
        updateTween();
    }

    public Animate<T extends object>(object: T): Tween<T> {
        return new Tween<T>(object);
    }

    private _setupTween<T extends object>(animator: Animator<T>): void {
        const tween = new Tween<T>(animator.object)
            .to(animator.to, animator.duration)
            .easing(animator.options?.easing ?? Easing.Quadratic.Out)
            .onUpdate((object, elapsed) => {
                this._callbackMap.get(animator.uuid)?.onUpdate(object, elapsed);
            })
            .onComplete((object) => {
                this._callbackMap.get(animator.uuid)?.onComplete(object);
            });

        animator.addEventListener('play', () => {
            tween.start();
        });

        animator.addEventListener('stop', () => {
            tween.stop();
        });

        this._tweens.set(animator.uuid, tween);
    }
}
