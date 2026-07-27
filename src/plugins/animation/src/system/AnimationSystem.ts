import { Easing as TWEENEasing } from '@tweenjs/tween.js';
import { AnimationClip, MathUtils, Object3D } from 'three/webgpu';
import { DIVETicker } from '@shopware-ag/dive';

type Animator = import('../animator/Animator.ts').Animator;
type ClipAnimator = import('../animator/ClipAnimator.ts').ClipAnimator;
type TargetAnimator = import('../animator/TargetAnimator.ts').TargetAnimator;
type TargetAnimatorOptions =
    import('../animator/TargetAnimator.ts').TargetAnimatorOptions;
type AnimationTarget = import('../animator/TargetAnimator.ts').AnimationTarget;

/**
 * Central animation system that manages all animators (target-based and clip-based).
 *
 * Create "to-target" animators with `fromTargets()` and "animation-clip" animators with `fromClips()`.
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
     * Creates a TargetAnimator and returns it asynchronously.
     *
     * @example
     * // Animate a single target (e.g. position).
     * const animator = await animationSystem.fromTargets(
     *     { position: { x: 0, y: 0, z: 0 }, to: { x: 10, y: 10, z: 10 } },
     *     1000,
     * );
     * // animate the target
     * animator.play();
     *
     * @example
     * // Animate multiple targets (e.g. position and rotation) at once using an array.
     * const animator = await animationSystem.fromTargets(
     *     [
     *         { position: { x: 0, y: 0, z: 0 }, to: { x: 10, y: 10, z: 10 } },
     *         { rotation: { x: 0, y: 0, z: 0 }, to: { x: 0, y: Math.PI / 2, z: 0 } },
     *     ],
     *     1000,
     * );
     * // animate all targets in the array at once
     * animator.play();
     * @param targets - The targets to animate.
     * @param duration - The duration of the animation in milliseconds.
     * @param options - The options for the animation.
     * @returns Promise<TargetAnimator>.
     */
    public async fromTargets(
        targets: AnimationTarget | AnimationTarget[],
        duration: number,
        options?: TargetAnimatorOptions,
    ): Promise<TargetAnimator> {
        const { TargetAnimator } =
            await import('../animator/TargetAnimator.ts');
        const animator = new TargetAnimator(targets, duration, options);
        this._animators.set(animator.uuid, animator);
        return animator;
    }

    /**
     * Creates a ClipAnimator and returns it asynchronously.
     *
     * @example
     * // Animate a single clip (e.g. a single animation) at once.
     * const animator = await animationSystem.fromClips(
     *     model,
     *     model.animations,
     * );
     * // plays first clip by default
     * animator.play();
     * // plays plays "Idle" clip by name
     * animator.play("Idle");
     *
     * @param root - The root object to animate.
     * @param clips - The animation clips to animate.
     * @returns Promise<ClipAnimator>.
     */
    public async fromClips(
        root: Object3D,
        clips: AnimationClip[],
    ): Promise<ClipAnimator> {
        const { ClipAnimator } = await import('../animator/ClipAnimator.ts');
        const animator = new ClipAnimator(root, clips);
        this._animators.set(animator.uuid, animator);
        return animator;
    }

    /**
     * Removes an animator from the system.
     *
     * @param uuid - The UUID of the animator to remove.
     */
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
