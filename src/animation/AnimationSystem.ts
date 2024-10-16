import { Tween, update as updateTween } from "@tweenjs/tween.js";
import { DIVERenderer } from "../renderer/Renderer";

/**
 * Updates all animations.
 * DIVE uses Tween.js to handle animations.
 *
 * @module
 */

export class DIVEAnimationSystem {
    private _renderer: DIVERenderer;
    private _rendererCallbackId: string;

    constructor(renderer: DIVERenderer) {
        this._renderer = renderer;

        this._rendererCallbackId = this._renderer.AddPreRenderCallback(() => {
            this.Update();
        })
    }

    public Dispose(): void {
        this._renderer.RemovePreRenderCallback(this._rendererCallbackId);
    }

    public Update(): void {
        updateTween();
    }

    public Animate<T extends object>(object: T): Tween<T> {
        return new Tween<T>(object);
    }
}