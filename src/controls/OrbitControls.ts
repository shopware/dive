import { OrbitControls } from "three/examples/jsm/Addons.js";
import DIVEPerspectiveCamera from "../camera/PerspectiveCamera.ts";
import { DIVERenderer } from "../renderer/Renderer.ts";
import { type Box3, MathUtils, Vector3, Vector3Like } from "three";
import { Easing, Tween } from "@tweenjs/tween.js";

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

    private last: { pos: Vector3Like, target: Vector3Like } | null = null;

    private animating: boolean = false;
    private locked: boolean = false;

    private stopMoveTo: () => void = () => { };
    private stopRevertLast: () => void = () => { };

    public object: DIVEPerspectiveCamera;
    public domElement: HTMLCanvasElement;

    constructor(camera: DIVEPerspectiveCamera, renderer: DIVERenderer, settings: DIVEOrbitControlsSettings = DIVEOrbitControlsDefaultSettings) {
        super(camera, renderer.domElement);

        this.domElement = renderer.domElement;

        this.object = camera;

        renderer.AddPreRenderCallback(() => {
            this.preRenderCallback();
        });

        this.enableDamping = settings.enableDamping;
        this.dampingFactor = settings.dampingFactor;
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

        const tweenPos = new Tween(this.object.position)
            .to(toPosition, duration)
            .easing(Easing.Quadratic.Out)
            .start();

        const tweenQuat = new Tween(this.target)
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

        const tweenPos = new Tween(this.object.position)
            .to(pos, duration)
            .easing(Easing.Quadratic.Out)
            .start();

        const tweenQuat = new Tween(this.target)
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