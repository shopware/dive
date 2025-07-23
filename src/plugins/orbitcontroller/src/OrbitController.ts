import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Vector3, Vector3Like } from 'three/src/math/Vector3.js';
import { MathUtils } from 'three/src/math/MathUtils.js';
import { Object3D } from 'three/src/core/Object3D.js';
import { DIVEPerspectiveCamera, DIVETicker } from '@shopware-ag/dive';
import { BoundingBox } from 'src/components/boundingbox/BoundingBox.ts';
import { OrbitControllerState } from '../types/index.ts';

export type OrbitControllerSettings = {
    /** Whether to enable damping for smooth camera movement */
    enableDamping: boolean;
    /** Damping factor for camera movement */
    dampingFactor: number;
};

export const OrbitControllerDefaultSettings: Required<OrbitControllerSettings> =
    {
        enableDamping: true,
        dampingFactor: 0.05,
    };

/**
 * Orbit Controls. Basic functionality to orbit around a given target point in the scene.
 *
 * @module
 */

export class OrbitController extends OrbitControls implements DIVETicker {
    public static readonly DEFAULT_ZOOM_FACTOR = 1;

    public uuid: string = MathUtils.generateUUID();

    public object: DIVEPerspectiveCamera;

    private _domElements: HTMLCanvasElement[] = [];

    constructor(
        camera: DIVEPerspectiveCamera,
        public domElement: HTMLCanvasElement,
        settings: Partial<OrbitControllerSettings> = OrbitControllerDefaultSettings,
    ) {
        super(camera, domElement);

        this.domElement = domElement;
        this._domElements.push(domElement);

        this.object = camera;

        this.enableDamping =
            settings.enableDamping ??
            OrbitControllerDefaultSettings.enableDamping;
        this.dampingFactor =
            settings.dampingFactor ??
            OrbitControllerDefaultSettings.dampingFactor;

        // initialize camera transformation
        this.object.position.set(0, 2, 2);
        this.target.copy({ x: 0, y: 0.5, z: 0 });
        this.update();
    }

    public tick(): void {
        if (!this.enabled) return;
        this.update();
    }

    /**
     * Computes the camera position and target to perfectly fit a bounding sphere into the camera's frustum.
     * This robust approach ensures the entire object is always visible, regardless of rotation or aspect ratio.
     *
     * @param bb - The bounding box to encompass
     * @param padding - Optional padding factor to add space around the object depending on the object's bounding sphere diameter (default: 0.0 = no padding)
     * @returns Object containing the calculated camera position and target
     */
    public computeEncompassingView(
        bb: BoundingBox,
        padding: number = 0.0,
    ): {
        position: Vector3Like;
        target: Vector3Like;
    } {
        const center = bb.center;
        const sphere = bb.sphere;
        const radius = sphere.radius;

        // Camera FOVs
        const fov = (this.object.fov * Math.PI) / 180;
        const aspect = this.object.aspect;
        const verticalTheta = fov / 2;
        const horizontalTheta = Math.atan(Math.tan(verticalTheta) * aspect);

        // Compute required distances for both FOVs
        const distanceV = radius / Math.sin(verticalTheta);
        const distanceH = radius / Math.sin(horizontalTheta);
        const distance = Math.max(distanceV, distanceH) * (1.0 + padding);

        // Camera direction
        const currentDirection = this.object.position
            .clone()
            .sub(this.target)
            .normalize();
        const direction =
            currentDirection.length() > 0.001
                ? currentDirection
                : new Vector3(0, 0, 1);
        const position = center.clone().add(direction.multiplyScalar(distance));

        return {
            position,
            target: center,
        };
    }

    /**
     * Focus the camera on a specific object by computing its bounding box
     * @param object - The object to focus on
     * @param padding - Optional padding factor to add space around the object depending on the object's bounding sphere diameter (default: 0.0 = no padding)
     */
    public focusOnObject(object: Object3D, padding: number = 0.0): void {
        const bb = new BoundingBox(object, false, 0x00ff00);
        const transform = this.computeEncompassingView(bb, padding);

        this.object.position.copy(transform.position);
        this.target.copy(transform.target);
        this.update();
    }

    public zoomIn(by?: number): void {
        const zoomBy = by || OrbitController.DEFAULT_ZOOM_FACTOR;
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

    public zoomOut(by?: number): void {
        const zoomBy = by || OrbitController.DEFAULT_ZOOM_FACTOR;
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

    public getState(): OrbitControllerState {
        return {
            target: this.target.clone(),
            azimuthalAngle: this.getAzimuthalAngle(),
            polarAngle: this.getPolarAngle(),
            distance: this.getDistance(),
            position: this.object.position.clone(),
            quaternion: this.object.quaternion.clone(),
        };
    }

    public setState(state: OrbitControllerState): void {
        this.target.copy(state.target);
        this.minAzimuthAngle = state.azimuthalAngle;
        this.maxAzimuthAngle = state.azimuthalAngle;
        this.minPolarAngle = state.polarAngle;
        this.maxPolarAngle = state.polarAngle;
        this.minDistance = state.distance;
        this.maxDistance = state.distance;
        this.object.position.copy(state.position);
        this.object.quaternion.copy(state.quaternion);

        this.update();

        this.minAzimuthAngle = Infinity;
        this.maxAzimuthAngle = Infinity;
        this.minPolarAngle = 0;
        this.maxPolarAngle = Math.PI;
        this.minDistance = 0;
        this.maxDistance = Infinity;
    }

    public addCanvas(canvas: HTMLCanvasElement): void {
        this._domElements.push(canvas);
        this._addListeners(canvas);
    }

    private _addListeners(canvas: HTMLCanvasElement): void {
        // copy all event listeners from parent class
    }

    private _removeListeners(canvas: HTMLCanvasElement): void {
        // remove all event listeners
    }
}
