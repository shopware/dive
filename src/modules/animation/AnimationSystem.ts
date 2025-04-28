import { Tween, update as updateTween } from '@tweenjs/tween.js';
import { DIVETicker } from '../../engine/clock/Clock';

/**
 * Updates all animations.
 * DIVE uses Tween.js to handle animations.
 *
 * @module
 */

export class DIVEAnimationSystem implements DIVETicker {
    public Dispose(): void {
        // nothing to do here
    }

    public tick(): void {
        updateTween();
    }

    public Update(): void {
        updateTween();
    }

    public Animate<T extends object>(object: T): Tween<T> {
        return new Tween<T>(object);
    }
}
