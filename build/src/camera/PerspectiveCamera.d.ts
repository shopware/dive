import { PerspectiveCamera } from 'three';
export type DIVEPerspectiveCameraSettings = {
    fov: number;
    near: number;
    far: number;
};
export declare const DIVEPerspectiveCameraDefaultSettings: DIVEPerspectiveCameraSettings;
/**
 * A Perspective camera. Can change the layer mask to show different objects.
 *
 * @module
 */
export default class DIVEPerspectiveCamera extends PerspectiveCamera {
    static readonly EDITOR_VIEW_LAYER_MASK: number;
    static readonly LIVE_VIEW_LAYER_MASK = 16;
    onSetCameraLayer: (mask: number) => void;
    constructor(settings?: Partial<DIVEPerspectiveCameraSettings>);
    OnResize(width: number, height: number): void;
    SetCameraLayer(layer: 'LIVE' | 'EDITOR'): void;
}
