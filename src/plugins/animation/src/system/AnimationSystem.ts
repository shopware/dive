import { Easing as TWEENEasing } from '@tweenjs/tween.js';
import { AnimationClip, MathUtils, Object3D } from 'three';
import { DIVETicker } from '@shopware-ag/dive';

type Animator = import('../animator/Animator.ts').Animator;
type ClipAnimator = import('../animator/ClipAnimator.ts').ClipAnimator;
type TargetAnimator = import('../animator/TargetAnimator.ts').TargetAnimator;
type TargetAnimatorOptions =
    import('../animator/TargetAnimator.ts').TargetAnimatorOptions;
type AnimationTarget = import('../animator/TargetAnimator.ts').AnimationTarget;

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

    /**
     * Convenience shorthand: creates a TargetAnimator and immediately starts playback.
     */
    public async animate(
        targets: AnimationTarget | AnimationTarget[],
        duration: number,
        options?: TargetAnimatorOptions,
    ): Promise<TargetAnimator> {
        const animator = await this.fromTargets(targets, duration, options);
        animator.play();
        return animator;
    }

    public async fromTargets(
        targets: AnimationTarget | AnimationTarget[],
        duration: number,
        options?: TargetAnimatorOptions,
    ): Promise<TargetAnimator> {
        const { TargetAnimator } = await import(
            '../animator/TargetAnimator.ts'
        );
        const animator = new TargetAnimator(targets, duration, options);
        this._animators.set(animator.uuid, animator);
        return animator;
    }

    public async fromClips(
        root: Object3D,
        clips: AnimationClip[],
    ): Promise<ClipAnimator> {
        const { ClipAnimator } = await import('../animator/ClipAnimator.ts');
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
}
