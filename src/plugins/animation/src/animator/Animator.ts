import { MathUtils } from 'three';
import { EventDispatcher } from 'three/src/core/EventDispatcher.js';
import { TAnimatorEventMap, TAnimatorLoopMode, TAnimatorState } from '../types/AnimatorTypes.ts';

/**
 * Abstract base class for all animation types.
 *
 * Provides a unified interface for controlling animations,
 * regardless of the underlying implementation (Tween or AnimationClip).
 *
 * @module
 */
export abstract class Animator extends EventDispatcher<TAnimatorEventMap> {
    private _uuid: string = MathUtils.generateUUID();

    public get uuid(): string {
        return this._uuid;
    }

    abstract get state(): TAnimatorState;
    abstract get duration(): number;
    abstract get loop(): TAnimatorLoopMode;
    abstract set loop(value: TAnimatorLoopMode);
    abstract get time(): number;
    abstract set time(value: number);

    abstract play(): this;
    abstract pause(): this;
    abstract resume(): this;
    abstract stop(): this;

    abstract update(deltaTime: number): void;
    abstract dispose(): void;
}
