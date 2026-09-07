import { PerspectiveCamera } from 'three/webgpu';
import { DIVECameraComponent } from '../CameraComponent.ts';

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
 * Gives a node a perspective view of the scene.
 *
 * Settings arrive through {@link applySettings} rather than the constructor, which
 * takes no arguments: `Object3D.clone()` calls `new this.constructor()`, so a
 * required parameter would make cloning a node throw.
 *
 * @module
 */
export class PerspectiveCameraComponent extends DIVECameraComponent {
    readonly isPerspectiveCameraComponent: true = true;

    constructor() {
        super(
            new PerspectiveCamera(
                DIVEPerspectiveCameraDefaultSettings.fov,
                1,
                DIVEPerspectiveCameraDefaultSettings.near,
                DIVEPerspectiveCameraDefaultSettings.far,
            ),
        );

        this.name = 'PerspectiveCameraComponent';
    }

    public get camera(): PerspectiveCamera {
        return this._camera as PerspectiveCamera;
    }

    /**
     * Applies whatever the settings carry, leaving the rest as it is.
     *
     * @param settings - Field of view, near and far plane.
     */
    public applySettings(
        settings: Partial<DIVEPerspectiveCameraSettings>,
    ): void {
        const camera = this.camera;

        if (settings.fov !== undefined) camera.fov = settings.fov;
        if (settings.near !== undefined) camera.near = settings.near;
        if (settings.far !== undefined) camera.far = settings.far;

        camera.updateProjectionMatrix();
    }

    public onResize(width: number, height: number): void {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }
}
