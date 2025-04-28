/* eslint-disable @typescript-eslint/no-explicit-any */
import { Easing, Tween, update as updateTween } from '@tweenjs/tween.js';
import { Animator } from './animator/Animator';
import { UUID } from '../../types/index.ts';
import { DIVETicker } from '../../engine/clock/Clock.ts';

export * from './animator/Animator.ts';

type CallbackTuple<T> = {
    onUpdate: (object: T, elapsed: number) => void;
    onComplete: (object: T) => void;
};

/**
 * Updates all animations.
 * DIVE uses Tween.js to handle animations.
 *
 * @module
 */

export class DIVEAnimationSystem implements DIVETicker {
    private static _instance: DIVEAnimationSystem | null = null;
    public static get instance(): DIVEAnimationSystem {
        if (!this._instance) {
            this._instance = new DIVEAnimationSystem();
        }
        return this._instance;
    }

    // private _worker: Worker = new Worker(new URL('./AnimationWorker.ts', import.meta.url));
    private _callbackMap: Map<UUID, CallbackTuple<any>> = new Map();

    // will be moved to worker thread in the future
    private _tweens: Map<UUID, Tween<any>> = new Map();

    public register<T extends object>(animator: Animator<T>): void {
        this._callbackMap.set(animator.uuid, {
            onUpdate: animator.options?.onUpdate ?? (() => {}),
            onComplete: animator.options?.onComplete ?? (() => {}),
        });

        this._setupTween(animator);
    }

    public unregister(uuid: UUID): void {
        this._callbackMap.delete(uuid);
        this._tweens.delete(uuid);
    }

    // private _handleWorkerMessage(event: any): void {

    // }

    public Dispose(): void {
        // nothing to do here
    }

    public tick(): void {
        updateTween();
    }

    public Animate<T extends object>(object: T): Tween<T> {
        return new Tween<T>(object);
    }

    private _setupTween<T extends object>(animator: Animator<T>): void {
        // following code will be moved to worker thread in the future
        const tween = new Tween<T>(animator.object)
            .to(animator.to, animator.duration)
            .easing(animator.options?.easing ?? Easing.Quadratic.Out)
            .onUpdate((object, elapsed) => {
                this._callbackMap.get(animator.uuid)?.onUpdate(object, elapsed);
            })
            .onComplete((object) => {
                this._callbackMap.get(animator.uuid)?.onComplete(object);
            });

        // add event listeners to the animator
        animator.addEventListener('play', () => {
            tween.start();
        });

        animator.addEventListener('stop', () => {
            tween.stop();
        });

        this._tweens.set(animator.uuid, tween);
    }
}
