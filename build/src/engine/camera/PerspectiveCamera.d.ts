import { PerspectiveCamera } from 'three';
export type DIVEPerspectiveCameraSettings = {
    /** Field of view in degrees */
    fov: number;
    /** Near clipping plane */
    near: number;
    /** Far clipping plane */
    far: number;
};
export declare const DIVEPerspectiveCameraDefaultSettings: Required<DIVEPerspectiveCameraSettings>;
/**
 * A Perspective camera. Can change the layer mask to show different objects.
 *
 * @module
 */
export declare class DIVEPerspectiveCamera extends PerspectiveCamera {
    static readonly EDITOR_VIEW_LAYER_MASK: number;
    static readonly LIVE_VIEW_LAYER_MASK = 16;
    onSetCameraLayer: (mask: number) => void;
    constructor(settings?: Partial<DIVEPerspectiveCameraSettings>);
    onResize(width: number, height: number): void;
    setCameraLayer(layer: 'LIVE' | 'EDITOR'): void;
}
