import { MathUtils } from 'three/webgpu';
import { DIVEClock } from './clock/Clock.ts';
import { DIVEView } from './view/View.ts';
import {
    DIVEScene,
    DIVESceneDefaultSettings,
    DIVESceneSettings,
} from './scene/Scene.ts';
import {
    DIVEPerspectiveCameraDefaultSettings,
    DIVEPerspectiveCameraSettings,
    PerspectiveCameraComponent,
} from '../components/camera/PerspectiveCameraComponent.ts';
import { DIVENode } from '../components/node/Node.ts';
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
            /**
             * Maximum amount of DIVE instances that can be created. This is checked on initialization of a new instance.
             *
             * You can change this value to allow more instances, but be aware that this can lead to performance issues and crashes.
             */
            instanceLimit: number;
        };
    }
}

window.DIVE = {
    instances: [],
    get instance() {
        return window.DIVE.instances[0];
    },
    instanceLimit: 8,
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
 * An instance of this class delivers a complete 3D environment with a perspective camera and orbit controls.
 * ```ts
 * import { DIVE } from "@shopware-ag/dive";
 *
 * const myWrapper = document.getElementById('myWrapper');
 *
 * const dive = new DIVE();
 *
 * myWrapper.appendChild(dive.canvas);
 * ```
 *
 * Driving a scene from data is the job of the state plugin, which wraps a
 * DIVE instance rather than being part of it:
 * ```ts
 * import { State } from "@shopware-ag/dive/state";
 *
 * const state = new State(dive, orbitController);
 * await state.performAction('SET_STATE', sceneData);
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

        // check for instance limit
        if (window.DIVE.instances.length == window.DIVE.instanceLimit) {
            throw new Error(
                `DIVE instance limit exceeded! Maximum allowed instances: ${window.DIVE.instanceLimit}. Current instances: ${window.DIVE.instances.length}.`,
            );
        }

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

        /**
         * the scene ticks its components, registered before the view so they see
         * the frame they affect
         */
        this._clock.addTicker(this._scene);

        // set up main view

        /**
         * the camera node goes into the scene, because three only updates a
         * camera's world matrix itself while the camera has no parent
         * into the scene and not into root, this camera belongs to the viewer
         */
        const cameraNode = new DIVENode();
        cameraNode.name = 'DIVECamera';
        const cameraComponent = cameraNode.addComponent(
            new PerspectiveCameraComponent(),
        );
        cameraComponent.applySettings(this._settings);
        this._scene.add(cameraNode);

        const mainView = new DIVEView(
            this._scene,
            cameraComponent,
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
                        this.mainView.cameraComponent,
                    );
                    this._clock.addTicker(this._orientationDisplay);
                },
            );
        }

        // Load version info
        console.log(
            `DIVE ${__APP_VERSION__}${__DEV_MODE__ ? '[DEV]' : ''} initialized successfully!`,
        );
        console.log(DIVE_ASCII_ART);

        window.DIVE.instances.push(this);

        if (this._settings.autoStart) {
            this.startAsync();
        }
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

    public async startAsync(): Promise<void> {
        if (this._disposed) {
            return;
        }

        // start clock (internally wait for first tick done)
        await this._clock.startAsync();

        // await init main view
        await this.mainView.initAsync();
    }

    public stop(): void {
        this._clock.stop();
    }

    public async disposeAsync(): Promise<void> {
        return new Promise<void>((resolve) => {
            if (this._disposed) {
                resolve();
                return;
            }

            this._disposed = true;

            this._clock.dispose();

            if (this._orientationDisplay) {
                this._orientationDisplay.dispose();
                this._orientationDisplay = null;
            }

            this.scene.dispose();

            this._views.forEach((view) => {
                view.dispose();
            });
            this._views = [];

            window.DIVE.instances = window.DIVE.instances.filter(
                (instance) => instance._instanceId !== this._instanceId,
            );

            resolve();
        });
    }
}
