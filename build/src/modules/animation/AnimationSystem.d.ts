import { Tween } from '@tweenjs/tween.js';
import { Animator } from './animator/Animator';
import { UUID } from '../../types/index.ts';
import { DIVETicker } from '../../engine/clock/Clock.ts';
import { TAnimatorParameters } from './types/AnimatorParameters.ts';
export type * from './animator/Animator.ts';
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
export declare class AnimationSystem implements DIVETicker {
    uuid: string;
    private _callbackMap;
    private _tweens;
    /**
     * Creates a new animator and registers it.
     * @param object - The object to animate.
     * @param to - The target object.
     * @param duration - The duration of the animation.
     * @param options - The options for the animation.
     * @returns The animator.
     */
    createAnimator<T extends object>(object: T, to: T, duration: number, options?: TAnimatorParameters<T>): Animator<T>;
    unregister(uuid: UUID): void;
    Dispose(): void;
    tick(): void;
    Animate<T extends object>(object: T): Tween<T>;
    private _setupTween;
}
