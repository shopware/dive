import { Event } from 'three/src/core/EventDispatcher.js';

export type TAnimatorState = 'idle' | 'playing' | 'paused';

export type TAnimatorEventMap = {
    play: Event;
    pause: Event;
    resume: Event;
    stop: Event;
    update: Event;
    complete: Event;
};

export type TAnimatorLoopMode = 'once' | 'repeat' | 'pingpong';
