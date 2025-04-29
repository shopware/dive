import { EventDispatcher, MathUtils, Event } from 'three';
import { UUID } from '../../../types/index.ts';
import { TAnimatorParameters } from '../types/AnimatorParameters';

type TAnimatorEventMap = {
    play: Event;
    // pause: Event;
    // resume: Event;
    stop: Event;
};

export class Animator<
    T extends object,
> extends EventDispatcher<TAnimatorEventMap> {
    private _uuid: UUID = MathUtils.generateUUID();
    private _playing: boolean = false;
    private _stopped: boolean = false;
    private _completed: boolean = false;

    constructor(
        readonly object: T,
        readonly to: T,
        readonly duration: number,
        readonly options?: TAnimatorParameters<T>,
    ) {
        super();
    }

    public get uuid(): UUID {
        return this._uuid;
    }

    public get playing(): boolean {
        return this._playing;
    }

    public get stopped(): boolean {
        return this._stopped;
    }

    public get completed(): boolean {
        return this._completed;
    }

    public dispose(): void {
        this._playing = false;
        this._stopped = false;
        this._completed = false;
    }

    public play(): this {
        this._playing = true;
        this._stopped = false;
        this.dispatchEvent({ type: 'play', target: this });
        console.log('play', this);
        return this;
    }

    public stop(): this {
        this._playing = false;
        this._stopped = true;
        this.dispatchEvent({ type: 'stop', target: this });
        return this;
    }
}
