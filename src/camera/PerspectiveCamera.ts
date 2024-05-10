import { PerspectiveCamera } from "three";
import { DEFAULT_LAYER_MASK, HELPER_LAYER_MASK, PRODUCT_LAYER_MASK, UI_LAYER_MASK } from "../constant/VisibilityLayerMask.ts";

export type DIVEPerspectiveCameraSettings = {
    fov: number;
    near: number;
    far: number;
}

export const DIVEPerspectiveCameraDefaultSettings: DIVEPerspectiveCameraSettings = {
    fov: 80,
    near: 0.1,
    far: 1000,
}

/**
 * A Perspective camera. Can change the layer mask to show different objects.
 *
 * @module
 */

export default class DIVEPerspectiveCamera extends PerspectiveCamera {
    public static readonly EDITOR_VIEW_LAYER_MASK = DEFAULT_LAYER_MASK | UI_LAYER_MASK | HELPER_LAYER_MASK | PRODUCT_LAYER_MASK;
    public static readonly LIVE_VIEW_LAYER_MASK = PRODUCT_LAYER_MASK;

    public onSetCameraLayer: (mask: number) => void = () => { };

    constructor(settings: DIVEPerspectiveCameraSettings = DIVEPerspectiveCameraDefaultSettings) {
        super(settings.fov, 1, settings.near, settings.far);

        this.layers.mask = DIVEPerspectiveCamera.EDITOR_VIEW_LAYER_MASK;
    }

    public OnResize(width: number, height: number): void {
        this.aspect = width / height;
        this.updateProjectionMatrix();
    }

    public SetCameraLayer(layer: 'LIVE' | 'EDITOR'): void {
        this.layers.mask = layer === 'LIVE' ? DIVEPerspectiveCamera.LIVE_VIEW_LAYER_MASK : DIVEPerspectiveCamera.EDITOR_VIEW_LAYER_MASK;
        this.onSetCameraLayer(this.layers.mask);
    }
}
