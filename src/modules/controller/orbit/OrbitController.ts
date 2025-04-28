import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DIVEPerspectiveCamera } from '../../../engine/camera/PerspectiveCamera';
import { type Box3, MathUtils, Vector3, Vector3Like } from 'three';
import { Easing } from '@tweenjs/tween.js';
import { Animator } from '../../animation/AnimationSystem';

export type DIVEOrbitControllerSettings = {
    /** Whether to enable damping for smooth camera movement */
    enableDamping: boolean;
    /** Damping factor for camera movement */
    dampingFactor: number;
};

export const DIVEOrbitControllerDefaultSettings: Required<DIVEOrbitControllerSettings> =
    {
        enableDamping: true,
        dampingFactor: 0.05,
    };

/**
 * Orbit Controls. Basic functionality to orbit around a given target point in the scene.
 *
 * @module
 */

export class DIVEOrbitController extends OrbitControls {
    public static readonly DEFAULT_ZOOM_FACTOR = 1;

    private last: { pos: Vector3Like; target: Vector3Like } | null = null;

    private animating: boolean = false;
    private locked: boolean = false;

    private stopMoveTo: () => void = () => {};
    private stopRevertLast: () => void = () => {};

    public object: DIVEPerspectiveCamera;
    public domElement: HTMLCanvasElement;

    constructor(
        camera: DIVEPerspectiveCamera,
        domElement: HTMLCanvasElement,
        settings: Partial<DIVEOrbitControllerSettings> = DIVEOrbitControllerDefaultSettings,
    ) {
        super(camera, domElement);

        this.domElement = domElement;

        this.object = camera;

        this.enableDamping =
            settings.enableDamping ||
            DIVEOrbitControllerDefaultSettings.enableDamping;
        this.dampingFactor =
            settings.dampingFactor ||
            DIVEOrbitControllerDefaultSettings.dampingFactor;

        // initialize camera transformation
        this.object.position.set(0, 2, 2);
        this.target.copy({ x: 0, y: 0.5, z: 0 });
        this.update();
    }

    public Dispose(): void {
        this.dispose();
    }

    public ComputeEncompassingView(bb: Box3): {
        position: Vector3Like;
        target: Vector3Like;
    } {
        const center = bb.getCenter(new Vector3());
        const size = bb.getSize(new Vector3());
        const distance = Math.max(size.x, size.y, size.z) * 1.25;
        const direction = this.object.position.clone().normalize();

        return {
            position: direction.clone().multiplyScalar(distance),
            target: center.clone(),
        };
    }

    public ZoomIn(by?: number): void {
        const zoomBy = by || DIVEOrbitController.DEFAULT_ZOOM_FACTOR;
        const { minDistance, maxDistance } = this;
        this.minDistance = this.maxDistance = MathUtils.clamp(
            this.getDistance() - zoomBy,
            minDistance + zoomBy,
            maxDistance - zoomBy,
        );
        this.update();
        this.minDistance = minDistance;
        this.maxDistance = maxDistance;
    }

    public ZoomOut(by?: number): void {
        const zoomBy = by || DIVEOrbitController.DEFAULT_ZOOM_FACTOR;
        const { minDistance, maxDistance } = this;
        this.minDistance = this.maxDistance = MathUtils.clamp(
            this.getDistance() + zoomBy,
            minDistance + zoomBy,
            maxDistance - zoomBy,
        );
        this.update();
        this.minDistance = minDistance;
        this.maxDistance = maxDistance;
    }

    public MoveTo(
        pos: Vector3Like | undefined,
        target: Vector3Like | undefined,
        duration: number,
        lock: boolean,
    ): void {
        this.enabled = false;

        if (this.animating) return;

        const toPosition = pos || this.object.position.clone();
        const toTarget = target || this.target.clone();

        this.stopRevertLast();

        if (!this.locked)
            this.last = {
                pos: this.object.position.clone(),
                target: this.target.clone(),
            };

        this.animating = duration > 0;
        this.locked = lock;
        this.enabled = false;

        const animatorPosition = new Animator(
            this.object.position,
            toPosition,
            duration,
            {
                easing: Easing.Quadratic.Out,
            },
        ).play();

        const animatorTarget = new Animator(this.target, toTarget, duration, {
            easing: Easing.Quadratic.Out,
            onUpdate: () => {
                this.object.lookAt(this.target);
            },
            onComplete: () => {
                this.animating = false;
                this.enabled = !lock;
            },
        }).play();

        this.stopMoveTo = () => {
            animatorPosition.stop();
            animatorTarget.stop();
        };
    }

    public RevertLast(duration: number): void {
        if (this.animating || !this.locked) return;

        this.stopMoveTo();

        this.animating = duration > 0;
        this.enabled = false;

        const { pos, target } = this.last!;

        const animatorPosition = new Animator(
            this.object.position,
            pos,
            duration,
            {
                easing: Easing.Quadratic.Out,
            },
        ).play();

        const animatorTarget = new Animator(this.target, target, duration, {
            easing: Easing.Quadratic.Out,
            onUpdate: () => {
                this.object.lookAt(this.target);
            },
            onComplete: () => {
                this.animating = false;
                this.locked = false;
                this.enabled = true;
            },
        }).play();

        this.stopRevertLast = () => {
            animatorPosition.stop();
            animatorTarget.stop();
        };
    }

    public tick(): void {
        if (this.locked) return;
        this.update();
    }
}
