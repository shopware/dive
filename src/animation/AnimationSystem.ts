import { update as updateTween } from "@tweenjs/tween.js";

export default class DIVEAnimationSystem {
    public update(): void {
        updateTween();
    }
}