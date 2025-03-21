import { Tween } from '@tweenjs/tween.js';
import { DIVERenderer } from '../renderer/Renderer';
/**
 * Updates all animations.
 * DIVE uses Tween.js to handle animations.
 *
 * @module
 */
export declare class DIVEAnimationSystem {
    private _renderer;
    private _rendererCallbackId;
    constructor(renderer: DIVERenderer);
    Dispose(): void;
    Update(): void;
    Animate<T extends object>(object: T): Tween<T>;
}
