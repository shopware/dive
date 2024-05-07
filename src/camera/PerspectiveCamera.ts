import { PerspectiveCamera } from "three";
import { DEFAULT_LAYER_MASK, HELPER_LAYER_MASK, PRODUCT_LAYER_MASK, UI_LAYER_MASK } from "../constant/VisibilityLayerMask.ts";

export default class DIVEPerspectiveCamera extends PerspectiveCamera {
    public static readonly EDITOR_VIEW_LAYER_MASK = DEFAULT_LAYER_MASK | UI_LAYER_MASK | HELPER_LAYER_MASK | PRODUCT_LAYER_MASK;
    public static readonly LIVE_VIEW_LAYER_MASK = PRODUCT_LAYER_MASK;

    public onSetCameraLayer: (mask: number) => void = () => { };

    constructor(fov: number, aspect: number) {
        super(fov, aspect, 0.1, 1000);

        this.layers.mask = DIVEPerspectiveCamera.EDITOR_VIEW_LAYER_MASK;
    }

    public SetCameraLayer(layer: 'LIVE' | 'EDITOR'): void {
        this.layers.mask = layer === 'LIVE' ? DIVEPerspectiveCamera.LIVE_VIEW_LAYER_MASK : DIVEPerspectiveCamera.EDITOR_VIEW_LAYER_MASK;
        this.onSetCameraLayer(this.layers.mask);
    }
}
