import { DIVERenderer, DIVERendererDefaultSettings, DIVERendererSettings } from "./renderer/Renderer.ts";
import { DIVEScene } from "./scene/Scene.ts";
import DIVEPerspectiveCamera, { DIVEPerspectiveCameraDefaultSettings, DIVEPerspectiveCameraSettings } from "./camera/PerspectiveCamera.ts";
import DIVEOrbitControls, { DIVEOrbitControlsDefaultSettings, DIVEOrbitControlsSettings } from "./controls/OrbitControls.ts";
import DIVEToolbox from "./toolbox/Toolbox.ts";
import { DIVECommunication } from "./com/Communication.ts";
import { DIVEAnimationSystem } from "./animation/AnimationSystem.ts";
import DIVEAxisCamera from "./axiscamera/AxisCamera.ts";
import { getObjectDelta } from "./helper/getObjectDelta/getObjectDelta.ts";

import type { Actions } from './com/actions/index.ts';
import type { COMPov, COMLight, COMModel, COMEntity, COMPrimitive } from './com/types';
import { DIVEMath } from './math/index.ts';
import { generateUUID } from "three/src/math/MathUtils";
import { DIVEInfo } from "./info/Info.ts";

export type DIVESettings = {
    autoResize: boolean;
    displayAxes: boolean;
    renderer: Partial<DIVERendererSettings>;
    perspectiveCamera: Partial<DIVEPerspectiveCameraSettings>;
    orbitControls: Partial<DIVEOrbitControlsSettings>;
}

export const DIVEDefaultSettings: DIVESettings = {
    autoResize: true,
    displayAxes: false,
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
    // static members
    public static QuickView(uri: string): DIVE {
        const dive = new DIVE();

        dive.Communication.PerformAction('SET_CAMERA_TRANSFORM', {
            position: { x: 0, y: 2, z: 2 },
            target: { x: 0, y: 0.5, z: 0 },
        });

        // generate scene light id
        const lightid = generateUUID();

        // add scene light
        dive.Communication.PerformAction('ADD_OBJECT', {
            entityType: 'light',
            type: 'scene',
            name: 'light',
            id: lightid,
            enabled: true,
            visible: true,
            intensity: 1,
            color: 0xffffff,
        });

        // generate model id
        const modelid = generateUUID();

        // add loaded listener
        dive.Communication.Subscribe('MODEL_LOADED', (data) => {
            if (data.id !== modelid) return;
            dive.Communication.PerformAction('PLACE_ON_FLOOR', {
                id: modelid,
            });

            const transform = dive.Communication.PerformAction('COMPUTE_ENCOMPASSING_VIEW', {});

            dive.Communication.PerformAction('SET_CAMERA_TRANSFORM', {
                position: transform.position,
                target: transform.target,
            });
        });

        // instantiate model
        dive.Communication.PerformAction('ADD_OBJECT', {
            entityType: 'model',
            name: 'object',
            id: modelid,
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            uri: uri,
            visible: true,
            loaded: false,
        });

        // set scene properties
        dive.Communication.PerformAction('UPDATE_SCENE', {
            backgroundColor: 0xffffff,
            gridEnabled: false,
            floorColor: 0xffffff,
        });

        return dive;
    }

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
    private toolbox: DIVEToolbox;
    private communication: DIVECommunication;

    // additional components
    private animationSystem: DIVEAnimationSystem;
    private axisCamera: DIVEAxisCamera | null;

    // getters
    public get Communication(): DIVECommunication {
        return this.communication;
    }

    public get Canvas(): HTMLCanvasElement {
        return this.renderer.domElement;
    }

    public get Info(): DIVEInfo {
        return DIVEInfo;
    }

    // setters
    public set Settings(settings: Partial<DIVESettings>) {
        const settingsDelta = getObjectDelta(this._settings, settings);

        // apply renderer settings (we have to rebuild the renderer to apply the settings)
        if (settingsDelta.renderer) this.renderer = new DIVERenderer(this._settings.renderer);

        // apply perspective camera settings
        if (settingsDelta.perspectiveCamera) {
            if (settingsDelta.perspectiveCamera.fov !== undefined) this.perspectiveCamera.fov = settingsDelta.perspectiveCamera.fov;
            if (settingsDelta.perspectiveCamera.near !== undefined) this.perspectiveCamera.near = settingsDelta.perspectiveCamera.near;
            if (settingsDelta.perspectiveCamera.far !== undefined) this.perspectiveCamera.far = settingsDelta.perspectiveCamera.far;
            this.perspectiveCamera.OnResize(this.renderer.domElement.width, this.renderer.domElement.height);
        }
        // apply orbit controls settings
        if (settingsDelta.orbitControls) {
            if (settingsDelta.orbitControls.enableDamping !== undefined) this.orbitControls.enableDamping = settingsDelta.orbitControls.enableDamping;
            if (settingsDelta.orbitControls.dampingFactor !== undefined) this.orbitControls.dampingFactor = settingsDelta.orbitControls.dampingFactor;
        }

        if (settingsDelta.autoResize !== this._settings.autoResize) {
            if (settingsDelta.autoResize) {
                this.addResizeObserver();
            } else {
                this.removeResizeObserver();
            }
        }

        if (settingsDelta.displayAxes) {
            this.axisCamera = new DIVEAxisCamera(this.renderer, this.scene, this.orbitControls);
        } else {
            this.axisCamera?.Dispose();
            this.axisCamera = null;
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

        // initialize animation system
        this.animationSystem = new DIVEAnimationSystem(this.renderer);

        this.orbitControls = new DIVEOrbitControls(this.perspectiveCamera, this.renderer, this.animationSystem, this._settings.orbitControls);
        this.toolbox = new DIVEToolbox(this.scene, this.orbitControls);
        this.communication = new DIVECommunication(this.renderer, this.scene, this.orbitControls, this.toolbox);


        // initialize axis camera
        if (this._settings.displayAxes) {
            this.axisCamera = new DIVEAxisCamera(this.renderer, this.scene, this.orbitControls);
        } else {
            this.axisCamera = null;
        }

        // add resize observer if autoResize is enabled
        if (this._settings.autoResize) {
            this.addResizeObserver();
        }

        // whene everything is done, start the renderer
        this.renderer.StartRenderer(this.scene, this.perspectiveCamera);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).DIVE = {
            PrintScene: () => {
                console.log(this.scene);
            },
        }

        console.log('DIVE initialized');
    }

    public Dispose(): void {
        this.removeResizeObserver();
        this.renderer.Dispose();
        this.orbitControls.Dispose();
        this.axisCamera?.Dispose();
        this.animationSystem.Dispose();
        this.toolbox.Dispose();
        this.communication.DestroyInstance();
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

export type {
    Actions,
    COMPov,
    COMLight,
    COMModel,
    COMPrimitive,
    COMEntity,
};

export {
    DIVE,
    DIVECommunication,
    DIVEMath,
}