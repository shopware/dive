import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DIVEPerspectiveCamera } from '../../../engine/camera/PerspectiveCamera';
import { type Box3, MathUtils, Vector3, Vector3Like } from 'three';
import { DIVETicker } from '../../../engine/clock/Clock';

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
    public domElement: HTMLCanvasElement;

    constructor(
        camera: DIVEPerspectiveCamera,
        domElement: HTMLCanvasElement,
        settings: Partial<OrbitControllerSettings> = OrbitControllerDefaultSettings,
    ) {
        super(camera, domElement);

        this.domElement = domElement;

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

    public dispose(): void {
        this.dispose();
    }

    public computeEncompassingView(bb: Box3): {
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
}
