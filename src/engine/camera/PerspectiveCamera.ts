import { PerspectiveCamera } from 'three/webgpu';
import {
    DEFAULT_LAYER_MASK,
    FLOOR_LAYER_MASK,
    HELPER_LAYER_MASK,
    PRODUCT_LAYER_MASK,
    PROXY_LAYER_MASK,
    UI_LAYER_MASK,
} from '../../constants/VisibilityLayerMask.ts';

export type DIVEPerspectiveCameraSettings = {
    /** Field of view in degrees */
    fov: number;
    /** Near clipping plane */
    near: number;
    /** Far clipping plane */
    far: number;
};

export const DIVEPerspectiveCameraDefaultSettings: Required<DIVEPerspectiveCameraSettings> =
    {
        fov: 70,
        near: 0.001,
        far: 1000,
    };

/**
 * A Perspective camera. Can change the layer mask to show different objects.
 *
 * @module
 */

export class DIVEPerspectiveCamera extends PerspectiveCamera {
    public readonly isDIVEPerspectiveCamera: true = true;

    /**
     * Everything this camera can show.
     *
     * Deliberately every layer, including `DEFAULT_LAYER_MASK` — three puts an
     * object on layer 0 unless someone says otherwise, and the transform gizmo is
     * one of them, so an editor that left it out would hide whatever never picked
     * a layer.
     *
     * `COORDINATE_LAYER_MASK` is the one exception. The orientation display adds
     * its axes to the same scene and draws them with its own orthographic camera
     * in the corner; having that bit here would draw them a second time in the
     * middle of the viewport.
     */
    public static readonly EDITOR_VIEW_LAYER_MASK =
        DEFAULT_LAYER_MASK |
        UI_LAYER_MASK |
        HELPER_LAYER_MASK |
        PRODUCT_LAYER_MASK |
        PROXY_LAYER_MASK |
        FLOOR_LAYER_MASK;

    /**
     * What an end user sees: the content and the ground it stands on.
     *
     * A short list on purpose, and one that has to be opted into. Everything that
     * exists to help build a scene stays out — the gizmo, the helper lines, the
     * proxies for entities without geometry — and so does `DEFAULT_LAYER_MASK`,
     * because it is the catch-all: anything that never chose a layer is a thing
     * nobody decided to show an end user.
     */
    public static readonly LIVE_VIEW_LAYER_MASK =
        PRODUCT_LAYER_MASK | FLOOR_LAYER_MASK;

    public onSetCameraLayer: (mask: number) => void = () => {};

    constructor(
        settings: Partial<DIVEPerspectiveCameraSettings> = DIVEPerspectiveCameraDefaultSettings,
    ) {
        super(
            settings.fov || DIVEPerspectiveCameraDefaultSettings.fov,
            1,
            settings.near || DIVEPerspectiveCameraDefaultSettings.near,
            settings.far || DIVEPerspectiveCameraDefaultSettings.far,
        );

        this.layers.mask = DIVEPerspectiveCamera.EDITOR_VIEW_LAYER_MASK;
    }

    public onResize(width: number, height: number): void {
        this.aspect = width / height;
        this.updateProjectionMatrix();
    }

    public setCameraLayer(layer: 'LIVE' | 'EDITOR'): void {
        this.layers.mask =
            layer === 'LIVE'
                ? DIVEPerspectiveCamera.LIVE_VIEW_LAYER_MASK
                : DIVEPerspectiveCamera.EDITOR_VIEW_LAYER_MASK;
        this.onSetCameraLayer(this.layers.mask);
    }
}
