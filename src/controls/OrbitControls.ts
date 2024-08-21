import { OrbitControls } from "three/examples/jsm/Addons.js";
import DIVEPerspectiveCamera from "../camera/PerspectiveCamera.ts";
import { DIVERenderer } from "../renderer/Renderer.ts";
import { type Box3, MathUtils, Vector3, Vector3Like } from "three";
import { Easing } from "@tweenjs/tween.js";
import { type DIVEAnimationSystem } from "../animation/AnimationSystem.ts";

export type DIVEOrbitControlsSettings = {
    enableDamping: boolean;
    dampingFactor: number;
}

export const DIVEOrbitControlsDefaultSettings: DIVEOrbitControlsSettings = {
    enableDamping: true,
    dampingFactor: 0.04,
}

/**
 * Orbit Controls. Basic functionality to orbit around a given target point in the scene.
 *
 * @module
 */

export default class DIVEOrbitControls extends OrbitControls {
    public static readonly DEFAULT_ZOOM_FACTOR = 1;

    private _animationSystem: DIVEAnimationSystem;

    private last: { pos: Vector3Like, target: Vector3Like } | null = null;

    private animating: boolean = false;
    private locked: boolean = false;

    private stopMoveTo: () => void = () => { };
    private stopRevertLast: () => void = () => { };

    public object: DIVEPerspectiveCamera;
    public domElement: HTMLCanvasElement;

    private _removePreRenderCallback: () => void = () => { };

    constructor(camera: DIVEPerspectiveCamera, renderer: DIVERenderer, animationSystem: DIVEAnimationSystem, settings: Partial<DIVEOrbitControlsSettings> = DIVEOrbitControlsDefaultSettings) {
        super(camera, renderer.domElement);

        this._animationSystem = animationSystem;

        this.domElement = renderer.domElement;

        this.object = camera;

        const id = renderer.AddPreRenderCallback(() => {
            this.preRenderCallback();
        });

        this._removePreRenderCallback = () => {
            renderer.RemovePreRenderCallback(id);
        }

        this.enableDamping = settings.enableDamping || DIVEOrbitControlsDefaultSettings.enableDamping;
        this.dampingFactor = settings.dampingFactor || DIVEOrbitControlsDefaultSettings.dampingFactor;

        // initialize camera transformation
        this.object.position.set(0, 2, 2);
        this.target.copy({ x: 0, y: 0.5, z: 0 });
        this.update();
    }

    public Dispose(): void {
        this._removePreRenderCallback();
        this.dispose();
    }

    public ComputeEncompassingView(bb: Box3): { position: Vector3Like, target: Vector3Like } {
        const center = bb.getCenter(new Vector3());
        const size = bb.getSize(new Vector3());
        const distance = Math.max(size.x, size.y, size.z) * 1.25;
        const direction = this.object.position.clone().normalize();

        return {
            position: direction.multiplyScalar(distance),
            target: center,
        };
    }

    public ZoomIn(by?: number): void {
        const zoomBy = by || DIVEOrbitControls.DEFAULT_ZOOM_FACTOR;
        const { minDistance, maxDistance } = this;
        this.minDistance = this.maxDistance = MathUtils.clamp(this.getDistance() - zoomBy, minDistance + zoomBy, maxDistance - zoomBy);
        this.update();
        this.minDistance = minDistance;
        this.maxDistance = maxDistance;
    }

    public ZoomOut(by?: number): void {
        const zoomBy = by || DIVEOrbitControls.DEFAULT_ZOOM_FACTOR;
        const { minDistance, maxDistance } = this;
        this.minDistance = this.maxDistance = MathUtils.clamp(this.getDistance() + zoomBy, minDistance + zoomBy, maxDistance - zoomBy);
        this.update();
        this.minDistance = minDistance;
        this.maxDistance = maxDistance;
    }

    public MoveTo(pos: Vector3Like | undefined, target: Vector3Like | undefined, duration: number, lock: boolean): void {
        if (this.animating) return;

        const toPosition = pos || this.object.position.clone();
        const toTarget = target || this.target.clone();

        this.stopRevertLast();

        if (!this.locked) this.last = { pos: this.object.position.clone(), target: this.target.clone() };

        this.animating = duration > 0;
        this.locked = lock;
        this.enabled = false;

        const tweenPos = this._animationSystem.Animate(this.object.position)
            .to(toPosition, duration)
            .easing(Easing.Quadratic.Out)
            .start();

        const tweenQuat = this._animationSystem.Animate(this.target)
            .to(toTarget, duration)
            .easing(Easing.Quadratic.Out)
            .onUpdate(() => {
                this.object.lookAt(this.target);
            })
            .onComplete(() => {
                this.animating = false;
                this.enabled = !lock;
            })
            .start();

        this.stopMoveTo = () => {
            tweenPos.stop();
            tweenQuat.stop();
        }
    }

    public RevertLast(duration: number): void {
        if (this.animating || !this.locked) return;

        this.stopMoveTo();

        this.animating = duration > 0;
        this.enabled = false;

        const { pos, target } = this.last!;

        const tweenPos = this._animationSystem.Animate(this.object.position)
            .to(pos, duration)
            .easing(Easing.Quadratic.Out)
            .start();

        const tweenQuat = this._animationSystem.Animate(this.target)
            .to(target, duration)
            .easing(Easing.Quadratic.Out)
            .onUpdate(() => {
                this.object.lookAt(this.target);
            })
            .onComplete(() => {
                this.animating = false;
                this.locked = false;
                this.enabled = true;
            })
            .start();

        this.stopRevertLast = () => {
            tweenPos.stop();
            tweenQuat.stop();
        }
    }

    private preRenderCallback = (): void => {
        if (this.locked) return;
        this.update();
    }
}