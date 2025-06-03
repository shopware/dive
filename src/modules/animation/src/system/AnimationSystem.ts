/* eslint-disable @typescript-eslint/no-explicit-any */
import { Easing, Tween, update as updateTween } from '@tweenjs/tween.js';
import { MathUtils } from 'three/src/math/MathUtils.js';
import { DIVETicker } from '@shopware-ag/dive';
import { Animator } from '../animator/Animator.js';
import { TAnimatorParameters } from '../types/AnimatorParameters.js';

export type * from '../animator/Animator.js';

type CallbackTuple<T> = {
    onUpdate: (object: T, elapsed: number) => void;
    onComplete: (object: T) => void;
};

declare global {
    interface ModuleClasses {
        AnimationSystem: typeof AnimationSystem;
    }
}

export class AnimationSystem implements DIVETicker {
    public uuid: string = MathUtils.generateUUID();

    private _callbackMap: Map<string, CallbackTuple<any>> = new Map();
    private _tweens: Map<string, Tween<any>> = new Map();

    /**
     * Creates a new animator and registers it.
     * @param object - The object to animate.
     * @param to - The target value.
     * @param duration - The duration of the animation in milliseconds.
     * @param options - The options for the animation.
     * @returns The animator.
     */
    public animate<T extends object>(
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

        this._createTween(animator);
        return animator;
    }

    public remove(uuid: string): void {
        if (!this._callbackMap.has(uuid)) {
            console.warn(`Animator with uuid ${uuid} not found`);
            return;
        }

        this._callbackMap.delete(uuid);
        this._tweens.delete(uuid);
    }

    public dispose(): void {
        this._callbackMap.clear();
        this._tweens.clear();
    }

    public tick(): void {
        updateTween();
    }

    private _createTween<T extends object>(animator: Animator<T>): void {
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
