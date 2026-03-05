import { Easing as TWEENEasing } from '@tweenjs/tween.js';
import { AnimationClip, MathUtils, Object3D } from 'three';
import { DIVETicker } from '@shopware-ag/dive';
import { Animator } from '../animator/Animator.ts';
import {
    TargetAnimator,
    TargetAnimatorOptions,
    AnimationTarget,
} from '../animator/TargetAnimator.ts';
import { ClipAnimator } from '../animator/ClipAnimator.ts';

/**
 * Central animation system that manages all animators (tween-based and clip-based).
 *
 * Implements DIVETicker so it can be registered with DIVEClock for per-frame updates.
 *
 * @module
 */
export class AnimationSystem implements DIVETicker {
    public uuid: string = MathUtils.generateUUID();
    public readonly Easing = TWEENEasing;

    private _animators: Map<string, Animator> = new Map();

    /**
     * Convenience shorthand: creates a TargetAnimator and immediately starts playback.
     */
    public animate(
        targets: AnimationTarget | AnimationTarget[],
        duration: number,
        options?: TargetAnimatorOptions,
    ): TargetAnimator {
        return this.fromTargets(targets, duration, options).play();
    }

    public fromTargets(
        targets: AnimationTarget | AnimationTarget[],
        duration: number,
        options?: TargetAnimatorOptions,
    ): TargetAnimator {
        const animator = new TargetAnimator(targets, duration, options);
        this._animators.set(animator.uuid, animator);
        return animator;
    }

    public fromClips(root: Object3D, clips: AnimationClip[]): ClipAnimator {
        const animator = new ClipAnimator(root, clips);
        this._animators.set(animator.uuid, animator);
        return animator;
    }

    public remove(uuid: string): void {
        const animator = this._animators.get(uuid);
        if (!animator) {
            console.warn(`Animator with uuid ${uuid} not found`);
            return;
        }
        animator.dispose();
        this._animators.delete(uuid);
    }

    public dispose(): void {
        for (const animator of this._animators.values()) {
            animator.dispose();
        }
        this._animators.clear();
    }

    public tick(deltaTime: number): void {
        for (const animator of this._animators.values()) {
            animator.update(deltaTime);
        }
    }
}
