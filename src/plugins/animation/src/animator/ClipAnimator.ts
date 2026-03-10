import {
    AnimationMixer,
    AnimationClip,
    AnimationAction,
    LoopOnce,
    LoopRepeat,
    LoopPingPong,
    Object3D,
} from 'three';
import { Animator } from './Animator.ts';
import { TAnimatorLoopMode, TAnimatorState } from '../types/AnimatorTypes.ts';

/**
 * Animator for mesh-embedded AnimationClip playback (e.g. character animations, keyframe animations).
 *
 * Wraps Three.js AnimationMixer and AnimationAction into the unified Animator interface.
 *
 * @module
 */
export class ClipAnimator extends Animator {
    private _mixer: AnimationMixer;
    private _actions: Map<string, AnimationAction> = new Map();
    private _currentAction: AnimationAction | null = null;
    private _state: TAnimatorState = 'idle';
    private _loop: TAnimatorLoopMode = 'once';

    constructor(root: Object3D, clips: AnimationClip[]) {
        super();
        this._mixer = new AnimationMixer(root);

        for (const clip of clips) {
            const action = this._mixer.clipAction(clip);
            action.clampWhenFinished = true;
            action.loop = LoopOnce;
            this._actions.set(clip.name, action);
        }

        this._mixer.addEventListener('finished', () => {
            this._state = 'idle';
            this.dispatchEvent({ type: 'complete', target: this });
        });
    }

    public get state(): TAnimatorState {
        return this._state;
    }

    public get duration(): number {
        return this._currentAction?.getClip().duration ?? 0;
    }

    public get loop(): TAnimatorLoopMode {
        return this._loop;
    }

    public set loop(value: TAnimatorLoopMode) {
        this._loop = value;
        if (this._currentAction) {
            this._currentAction.loop = this._resolveLoopConstant(value);
        }
    }

    private _resolveLoopConstant(
        mode: TAnimatorLoopMode,
    ): typeof LoopOnce | typeof LoopRepeat | typeof LoopPingPong {
        switch (mode) {
            case 'repeat':
                return LoopRepeat;
            case 'pingpong':
                return LoopPingPong;
            default:
                return LoopOnce;
        }
    }

    public get time(): number {
        return this._currentAction?.time ?? 0;
    }

    public set time(value: number) {
        if (this._currentAction) {
            this._currentAction.time = value;
        }
    }

    public get clipNames(): string[] {
        return [...this._actions.keys()];
    }

    public get currentClipName(): string | null {
        if (!this._currentAction) return null;
        return this._currentAction.getClip().name;
    }

    public play(clipName?: string): this {
        const name = clipName ?? this._actions.keys().next().value ?? undefined;
        if (name === undefined) return this;

        const action = this._actions.get(name);
        if (!action) return this;

        // case switch animation
        if (this._currentAction && this._currentAction !== action) {
            this._currentAction.fadeOut(0.3);
            action.reset().fadeIn(0.3);
        }
        // case start animation after it stopped (e.g. in loop mode "once" or after a pause)
        else if (this._state === 'idle') {
            action.reset();
        }

        action.loop = this._resolveLoopConstant(this._loop);
        action.play();
        this._currentAction = action;
        this._state = 'playing';
        this.dispatchEvent({ type: 'play', target: this });
        return this;
    }

    public pause(): this {
        this._state = 'paused';
        if (this._currentAction) {
            this._currentAction.paused = true;
        }
        this.dispatchEvent({ type: 'pause', target: this });
        return this;
    }

    public resume(): this {
        this._state = 'playing';
        if (this._currentAction) {
            this._currentAction.paused = false;
        }
        this.dispatchEvent({ type: 'resume', target: this });
        return this;
    }

    public stop(): this {
        this._state = 'idle';
        this._mixer.stopAllAction();
        this._currentAction = null;
        this.dispatchEvent({ type: 'stop', target: this });
        return this;
    }

    public update(deltaTime: number): void {
        this._mixer.update(deltaTime);
    }

    public dispose(): void {
        this._mixer.stopAllAction();
        this._mixer.uncacheRoot(this._mixer.getRoot());
        this._actions.clear();
        this._currentAction = null;
        this._state = 'idle';
    }
}
