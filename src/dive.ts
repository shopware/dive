import { Vector4 } from "three";
import DIVERenderer, { DIVERendererDefaultSettings, DIVERendererSettings } from "./renderer/Renderer.ts";
import DIVEScene from "./scene/Scene.ts";
import DIVEPerspectiveCamera, { DIVEPerspectiveCameraDefaultSettings, DIVEPerspectiveCameraSettings } from "./camera/PerspectiveCamera.ts";
import DIVEOrbitControls, { DIVEOrbitControlsDefaultSettings, DIVEOrbitControlsSettings } from "./controls/OrbitControls.ts";
import DIVEMediaCreator from "./mediacreator/MediaCreator.ts";
import DIVEToolbox from "./toolbox/Toolbox.ts";
import DIVECommunication from "./com/Communication.ts";
import DIVEAnimationSystem from "./animation/AnimationSystem.ts";
import DIVEAxisCamera from "./axiscamera/AxisCamera.ts";
import { getObjectDelta } from "./helper/getObjectDelta/getObjectDelta.ts";

export type DIVESettings = {
    autoResize: boolean;
    renderer: DIVERendererSettings;
    perspectiveCamera: DIVEPerspectiveCameraSettings;
    orbitControls: DIVEOrbitControlsSettings;
}

export const DIVEDefaultSettings: DIVESettings = {
    autoResize: true,
    renderer: DIVERendererDefaultSettings,
    perspectiveCamera: DIVEPerspectiveCameraDefaultSettings,
    orbitControls: DIVEOrbitControlsDefaultSettings,
}

/**
 * #### DIVE
 * is the main class of the DIVE framework.
 *
 * An instance of this class delivers a complete 3D environment with a perspective camera, orbit controls, a toolbox, and a communication system.
 * ```ts
 * import { DIVE } from "@shopware-ag/dive";
 *
 * const myWrapper = document.getElementById('myWrapper');
 *
 * const dive = new DIVE();
 *
 * myWrapper.appendChild(dive.Canvas);
 *
 * dive.Communication.Subscribe('GET_ALL_SCENE_DATA', () => {
 *  // do something
 * }));
 *
 * dive.Communication.PerformAction('GET_ALL_SCENE_DATA', {});
 * ```
 * @module
 */

export default class DIVE {
    // descriptive members
    private _settings: DIVESettings;
    private _resizeObserverId: string;
    private _width: number;
    private _height: number;

    // functional components
    private renderer: DIVERenderer;
    private scene: DIVEScene;
    private perspectiveCamera: DIVEPerspectiveCamera;
    private orbitControls: DIVEOrbitControls;
    private mediaCreator: DIVEMediaCreator;
    private toolbox: DIVEToolbox;
    private communication: DIVECommunication;

    // additional components
    private animationSystem: DIVEAnimationSystem;
    private axisCamera: DIVEAxisCamera;

    // getters
    public get Communication(): DIVECommunication {
        return this.communication;
    }

    public get Canvas(): HTMLCanvasElement {
        return this.renderer.domElement;
    }

    // setters
    public set Settings(settings: Partial<DIVESettings>) {
        const settingsDelta = getObjectDelta(this._settings, settings);

        // apply renderer settings (we have to rebuild the renderer to apply the settings)
        if (settingsDelta.renderer) this.renderer = new DIVERenderer(this._settings.renderer);

        // apply perspective camera settings
        if (settingsDelta.perspectiveCamera) {
            this.perspectiveCamera.fov = settingsDelta.perspectiveCamera.fov;
            this.perspectiveCamera.near = settingsDelta.perspectiveCamera.near;
            this.perspectiveCamera.far = settingsDelta.perspectiveCamera.far;
            this.perspectiveCamera.OnResize(this.renderer.domElement.width, this.renderer.domElement.height);
        }
        // apply orbit controls settings
        if (settingsDelta.orbitControls) {
            this.orbitControls.enableDamping = settingsDelta.orbitControls.enableDamping;
            this.orbitControls.dampingFactor = settingsDelta.orbitControls.dampingFactor;
        }

        if (settingsDelta.autoResize !== this._settings.autoResize) {
            if (settingsDelta.autoResize) {
                this.addResizeObserver();
            } else {
                this.removeResizeObserver();
            }
        }

        Object.assign(this._settings, settings);
    }

    constructor(settings?: Partial<DIVESettings>) {
        this._settings = { ...DIVEDefaultSettings, ...(settings !== undefined ? settings : {}) };

        this._resizeObserverId = '';
        this._width = 0;
        this._height = 0;

        // initialize functional components
        this.renderer = new DIVERenderer(this._settings.renderer);
        this.scene = new DIVEScene();
        this.perspectiveCamera = new DIVEPerspectiveCamera(this._settings.perspectiveCamera);
        this.orbitControls = new DIVEOrbitControls(this.perspectiveCamera, this.renderer, this._settings.orbitControls);
        this.mediaCreator = new DIVEMediaCreator(this.renderer, this.scene, this.orbitControls);
        this.toolbox = new DIVEToolbox(this.scene, this.orbitControls);
        this.communication = new DIVECommunication(this.scene, this.orbitControls, this.toolbox, this.mediaCreator);

        // initialize animation system
        this.animationSystem = new DIVEAnimationSystem();
        this.renderer.AddPreRenderCallback(() => {
            this.animationSystem.update();
        })

        // initialize axis camera
        this.axisCamera = new DIVEAxisCamera();
        this.scene.add(this.axisCamera);
        const restoreViewport = new Vector4();

        this.renderer.AddPostRenderCallback(() => {
            const restoreBackground = this.scene.background;
            this.scene.background = null;

            this.renderer.getViewport(restoreViewport);
            this.renderer.setViewport(0, 0, 150, 150);
            this.renderer.autoClear = false;

            this.axisCamera.SetFromCameraMatrix(this.perspectiveCamera.matrix);

            this.renderer.render(this.scene, this.axisCamera);

            this.renderer.setViewport(restoreViewport);
            this.renderer.autoClear = true;

            this.scene.background = restoreBackground;
        });

        // add resize observer if autoResize is enabled
        if (this._settings.autoResize) {
            this.addResizeObserver();
        }

        // whene everything is done, start the renderer
        this.renderer.StartRenderer(this.scene, this.perspectiveCamera);
    }

    // methods
    public OnResize(width: number, height: number): void {
        // resize renderer
        this.renderer.OnResize(width, height);

        // resize camera
        this.perspectiveCamera.OnResize(width, height);
    }

    private addResizeObserver(): void {
        this._resizeObserverId = this.renderer.AddPreRenderCallback(() => {
            // check if the canvas is mounted
            const canvasWrapper = this.renderer.domElement.parentElement;
            if (!canvasWrapper) return;

            const { clientWidth, clientHeight } = canvasWrapper;
            if (clientWidth === this._width && clientHeight === this._height) return;

            this.OnResize(clientWidth, clientHeight);

            this._width = clientWidth;
            this._height = clientHeight;
        });
    }

    private removeResizeObserver(): void {
        this.renderer.RemovePreRenderCallback(this._resizeObserverId);
    }
}
