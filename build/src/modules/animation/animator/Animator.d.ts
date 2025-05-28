import { EventDispatcher, Event } from 'three';
import { UUID } from '../../../types/index.ts';
import { TAnimatorParameters } from '../types/AnimatorParameters.ts';
type TAnimatorEventMap = {
    play: Event;
    stop: Event;
};
export declare class Animator<T extends object> extends EventDispatcher<TAnimatorEventMap> {
    readonly object: T;
    readonly to: T;
    readonly duration: number;
    readonly options?: TAnimatorParameters<T> | undefined;
    private _uuid;
    private _playing;
    private _stopped;
    private _completed;
    constructor(object: T, to: T, duration: number, options?: TAnimatorParameters<T> | undefined);
    get uuid(): UUID;
    get playing(): boolean;
    get stopped(): boolean;
    get completed(): boolean;
    dispose(): void;
    play(): this;
    stop(): this;
}
export {};
