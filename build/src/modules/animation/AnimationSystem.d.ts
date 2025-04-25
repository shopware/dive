import { Tween } from '@tweenjs/tween.js';
/**
 * Updates all animations.
 * DIVE uses Tween.js to handle animations.
 *
 * @module
 */
export declare class DIVEAnimationSystem {
    Dispose(): void;
    Update(): void;
    Animate<T extends object>(object: T): Tween<T>;
}
