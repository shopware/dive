import { MathUtils } from 'three';
import { EventDispatcher } from 'three/src/core/EventDispatcher.js';
import {
    TAnimatorEventMap,
    TAnimatorLoopMode,
    TAnimatorState,
} from '../types/AnimatorTypes.ts';

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

    public abstract get state(): TAnimatorState;
    public abstract get duration(): number;
    public abstract get loop(): TAnimatorLoopMode;
    public abstract set loop(value: TAnimatorLoopMode);
    public abstract get time(): number;
    public abstract set time(value: number);

    public abstract play(): this;
    public abstract pause(): this;
    public abstract resume(): this;
    public abstract stop(): this;

    public abstract update(deltaTime: number): void;
    public abstract dispose(): void;
}
