import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Vector3Like } from 'three/src/math/Vector3.js';
import { Object3D } from 'three/src/core/Object3D.js';
import { DIVEPerspectiveCamera, DIVETicker } from '../../../index.ts';
import { BoundingBox } from 'src/components/boundingbox/BoundingBox.ts';
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
    domElement: HTMLCanvasElement;
    static readonly DEFAULT_ZOOM_FACTOR = 1;
    uuid: string;
    object: DIVEPerspectiveCamera;
    constructor(camera: DIVEPerspectiveCamera, domElement: HTMLCanvasElement, settings?: Partial<OrbitControllerSettings>);
    tick(): void;
    /**
     * Computes the camera position and target to perfectly fit a bounding sphere into the camera's frustum.
     * This robust approach ensures the entire object is always visible, regardless of rotation or aspect ratio.
     *
     * @param bb - The bounding box to encompass
     * @param padding - Optional padding factor to add space around the object depending on the object's bounding sphere diameter (default: 0.0 = no padding)
     * @returns Object containing the calculated camera position and target
     */
    computeEncompassingView(bb: BoundingBox, padding?: number): {
        position: Vector3Like;
        target: Vector3Like;
    };
    /**
     * Focus the camera on a specific object by computing its bounding box
     * @param object - The object to focus on
     * @param padding - Optional padding factor to add space around the object depending on the object's bounding sphere diameter (default: 0.0 = no padding)
     */
    focusOnObject(object: Object3D, padding?: number): void;
    zoomIn(by?: number): void;
    zoomOut(by?: number): void;
}
