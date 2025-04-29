import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DIVEPerspectiveCamera } from '../../../engine/camera/PerspectiveCamera';
import { Box3, Vector3Like } from 'three';
import { DIVETicker } from '../../../engine/clock/Clock';
export type OrbitControllerSettings = {
    /** Whether to enable damping for smooth camera movement */
    enableDamping: boolean;
    /** Damping factor for camera movement */
    dampingFactor: number;
};
export declare const OrbitControllerDefaultSettings: Required<OrbitControllerSettings>;
/**
 * Orbit Controls. Basic functionality to orbit around a given target point in the scene.
 *
 * @module
 */
export declare class OrbitController extends OrbitControls implements DIVETicker {
    static readonly DEFAULT_ZOOM_FACTOR = 1;
    uuid: string;
    object: DIVEPerspectiveCamera;
    domElement: HTMLCanvasElement;
    constructor(camera: DIVEPerspectiveCamera, domElement: HTMLCanvasElement, settings?: Partial<OrbitControllerSettings>);
    tick(): void;
    computeEncompassingView(bb: Box3): {
        position: Vector3Like;
        target: Vector3Like;
    };
    zoomIn(by?: number): void;
    zoomOut(by?: number): void;
}
