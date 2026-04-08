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
    DIVERenderer,
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
    /**
     * @deprecated This static method will be removed in a future version. Please use `import { QuickView, QuickViewSettings, QuickViewDefaultSettings } from '@shopware-ag/dive/quickview'` instead.
     */
    public static async QuickView(
        uri: string,
        settings?: Partial<
            import('@shopware-ag/dive/quickview').QuickViewSettings
        >,
    ): Promise<import('@shopware-ag/dive/quickview').QuickView> {
        return import('@shopware-ag/dive/quickview').then(({ QuickView }) =>
            QuickView(uri, settings),
        );
    }

    // descriptive members
    private _instanceId: string = MathUtils.generateUUID();
    private _settings: DIVESettings;

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

    /**
     * @deprecated This property will be removed in a future version. Please use properties on the DIVE instance and mainView directly.
     */
    public get engine(): {
        scene: DIVEScene;
        camera: DIVEPerspectiveCamera;
        renderer: DIVERenderer;
        setCanvas: (canvas: HTMLCanvasElement) => void;
        clock: DIVEClock;
        start: () => void;
        startAsync: () => Promise<void>;
        stop: () => void;
        dispose: () => void;
    } {
        return {
            scene: this.scene,
            camera: this.mainView.camera,
            renderer: this.mainView.renderer,
            setCanvas: (canvas: HTMLCanvasElement) => {
                this.mainView.setCanvas(canvas);
            },
            clock: this.clock,
            start: () => {
                this.start();
            },
            startAsync: () => {
                return this.startAsync();
            },
            stop: () => {
                this.stop();
            },
            dispose: () => {
                this.dispose();
            },
        };
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
        void this.startAsync().catch((error) => {
            console.error(
                'DIVE.start: Failed to initialize the WebGPU renderer.',
                error,
            );
        });
    }

    public async startAsync(): Promise<void> {
        if (!this.mainView.renderer.initialized) {
            await this.mainView.renderer.init();
        }
        this._clock.start();
    }

    public stop(): void {
        this._clock.stop();
    }

    public async dispose(): Promise<void> {
        return new Promise((resolve) => {
            this._views.forEach((view) => {
                view.dispose();
            });
            this._views = [];

            if (this._orientationDisplay) {
                this._clock.removeTicker(this._orientationDisplay);
                this._orientationDisplay.dispose();
            }

            this.scene.dispose();

            window.DIVE.instances = window.DIVE.instances.filter(
                (instance) => instance._instanceId !== this._instanceId,
            );

            resolve();
        });
    }

    /**
     * @deprecated This method will be removed in a future version. To create a new view, use `QuickView` instead.
     */
    public createView(camera?: DIVEPerspectiveCamera): DIVEView {
        const view = new DIVEView(
            this._scene,
            camera ?? new DIVEPerspectiveCamera(),
            {
                ...this._settings,
                canvas: undefined, // instantiate new canvas for created view
            },
        );

        this._views.push(view);
        this._clock.addTicker(view);

        if (this._views.length === 1) {
            this._mainView = view;
        }

        return view;
    }

    /**
     * @deprecated This method will be removed in a future version.
     */
    public disposeView(view: DIVEView): void {
        this._views = this._views.filter((v) => v !== view);
        this._clock.removeTicker(view);

        if (this._mainView === view) {
            this._mainView = this._views[0];
        }

        view.dispose();
    }
}

/**
 * @deprecated Use `import { DIVE } from '@shopware-ag/dive'` instead.
 */
export const DIVEEngine = DIVE;
