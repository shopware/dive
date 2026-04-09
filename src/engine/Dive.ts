import { MathUtils } from 'three/webgpu';
import { DIVEClock } from './clock/Clock.ts';
import { DIVEView } from './view/View.ts';
import {
    DIVEScene,
    DIVESceneDefaultSettings,
    DIVESceneSettings,
} from './scene/Scene.ts';
import {
    DIVEPerspectiveCamera,
    DIVEPerspectiveCameraDefaultSettings,
    DIVEPerspectiveCameraSettings,
} from './camera/PerspectiveCamera.ts';
import {
    DIVERendererDefaultSettings,
    DIVERendererSettings,
} from './renderer/Renderer.ts';
import {
    OrbitControllerDefaultSettings,
    OrbitControllerSettings,
} from '@shopware-ag/dive/orbitcontroller';
import { DIVE_ASCII_ART } from './AsciiArt.ts';

declare global {
    interface Window {
        DIVE: {
            /**
             * All instances of DIVE
             */
            instances: DIVE[];
            /**
             * Get the first instance of DIVE
             */
            get instance(): DIVE | undefined;
        };
    }
}

window.DIVE = {
    instances: [],
    get instance() {
        return window.DIVE.instances[0];
    },
};

export type DIVESettings = {
    /**
     * Whether the engine should start automatically after initialization.
     *
     * @default true
     */
    autoStart: boolean;
    /**
     * Whether to display coordinate axes in the scene.
     *
     * @default false
     */
    displayAxes: boolean;
} & DIVESceneSettings &
    DIVEPerspectiveCameraSettings &
    DIVERendererSettings &
    OrbitControllerSettings;

export const DIVEDefaultSettings: Required<DIVESettings> = {
    autoStart: true,
    displayAxes: false,
    ...DIVESceneDefaultSettings,
    ...DIVEPerspectiveCameraDefaultSettings,
    ...DIVERendererDefaultSettings,
    ...OrbitControllerDefaultSettings,
};

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
 * dive.Communication.subscribe('GET_ALL_SCENE_DATA', () => {
 *  // do something
 * }));
 *
 * dive.Communication.performAction('GET_ALL_SCENE_DATA', {});
 * ```
 * @module
 */

export class DIVE {
    // descriptive members
    private _instanceId: string = MathUtils.generateUUID();
    private _settings: DIVESettings;
    private _disposed: boolean = false;

    private _views: DIVEView[];
    private _mainView: DIVEView;
    private _scene: DIVEScene;
    private _clock: DIVEClock;

    private _orientationDisplay:
        | import('@shopware-ag/dive/orientationdisplay').OrientationDisplay
        | null = null;

    constructor(settings?: Partial<DIVESettings>) {
        this._settings = {
            ...DIVEDefaultSettings,
            ...(settings ?? {}),
        };
        // set up the clock to define the tick
        this._clock = new DIVEClock();

        // set up scene
        this._scene = new DIVEScene({
            backgroundColor:
                settings?.backgroundColor ??
                DIVEDefaultSettings.backgroundColor,
            displayGrid:
                settings?.displayGrid ?? DIVEDefaultSettings.displayGrid,
            displayFloor:
                settings?.displayFloor ?? DIVEDefaultSettings.displayFloor,
        });

        // set up main view
        const mainView = new DIVEView(
            this._scene,
            new DIVEPerspectiveCamera(),
            this._settings,
        );
        this._clock.addTicker(mainView);
        this._views = [mainView];
        this._mainView = mainView;

        if (this._settings.displayAxes) {
            import('@shopware-ag/dive/orientationdisplay').then(
                ({ OrientationDisplay }) => {
                    if (this._disposed) {
                        return;
                    }

                    this._orientationDisplay = new OrientationDisplay(
                        this.mainView.renderer,
                        this.scene,
                        this.mainView.camera,
                    );
                    this._clock.addTicker(this._orientationDisplay);
                },
            );
        }

        if (this._settings.autoStart) {
            this.start();
        }

        // Load version info
        console.log(
            `DIVE ${__APP_VERSION__}${__DEV_MODE__ ? '[DEV]' : ''} initialized successfully!`,
        );
        console.log(DIVE_ASCII_ART);

        window.DIVE.instances.push(this);
    }

    public get views(): DIVEView[] {
        return this._views;
    }

    public get mainView(): DIVEView {
        return this._mainView;
    }

    public get canvas(): HTMLCanvasElement {
        return this.mainView.canvas;
    }

    public get scene(): DIVEScene {
        return this._scene;
    }

    public get clock(): DIVEClock {
        return this._clock;
    }

    public start(): void {
        if (this._disposed) {
            return;
        }

        void this.startAsync().catch((error) => {
            console.error(
                'DIVE.start: Failed to initialize the WebGPU renderer.',
                error,
            );
        });
    }

    public async startAsync(): Promise<void> {
        if (this._disposed) {
            return;
        }

        if (!this.mainView.renderer.initialized) {
            await this.mainView.renderer.init();
        }

        if (this._disposed) {
            return;
        }

        this._clock.start();
    }

    public stop(): void {
        this._clock.stop();
    }

    public async dispose(): Promise<void> {
        this._disposed = true;

        return new Promise((resolve) => {
            this._clock.dispose();

            this._views.forEach((view) => {
                view.dispose();
            });
            this._views = [];

            if (this._orientationDisplay) {
                this._orientationDisplay.dispose();
                this._orientationDisplay = null;
            }

            this.scene.dispose();

            window.DIVE.instances = window.DIVE.instances.filter(
                (instance) => instance._instanceId !== this._instanceId,
            );

            resolve();
        });
    }
}
