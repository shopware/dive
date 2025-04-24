import { Tween, update as updateTween } from '@tweenjs/tween.js';

/**
 * Updates all animations.
 * DIVE uses Tween.js to handle animations.
 *
 * @module
 */

export class DIVEAnimationSystem {
    public Dispose(): void {
        // nothing to do here
    }

    public Update(): void {
        updateTween();
    }

    public Animate<T extends object>(object: T): Tween<T> {
        return new Tween<T>(object);
    }
}
