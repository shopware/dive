import { DIVETicker } from '../../../../index.ts';
import { Animator } from '../animator/Animator.ts';
import { TAnimatorParameters } from '../types/AnimatorParameters.ts';
import * as TWEEN from '@tweenjs/tween.js';
export declare class AnimationSystem implements DIVETicker {
    uuid: string;
    TWEEN: typeof TWEEN;
    private _callbackMap;
    private _tweens;
    /**
     * Creates a new animator and registers it.
     * @param object - The object to animate.
     * @param to - The target value.
     * @param duration - The duration of the animation in milliseconds.
     * @param options - The options for the animation.
     * @returns The animator.
     */
    animate<T extends object>(object: T, to: T, duration: number, options?: TAnimatorParameters<T>): Animator<T>;
    remove(uuid: string): void;
    dispose(): void;
    tick(): void;
    private _createTween;
}
