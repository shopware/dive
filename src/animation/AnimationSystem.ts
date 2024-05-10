import { update as updateTween } from "@tweenjs/tween.js";

/**
 * Updates all animations.
 * DIVE uses Tween.js to handle animations.
 *
 * @module
 */

export default class DIVEAnimationSystem {
    public update(): void {
        updateTween();
    }
}