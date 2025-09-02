import { MathUtils } from 'three';
import { DIVEClock } from './clock/Clock.ts';
import { DIVEView } from './view/View.ts';
import {
    DIVEScene,
    DIVESceneDefaultSettings,
    DIVESceneSettings,
} from './scene/Scene.ts';
import { DIVEModel } from '../components/model/Model.ts';
import { DIVESceneLight } from '../components/light/SceneLight.ts';
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
    OrbitController,
    OrbitControllerDefaultSettings,
    OrbitControllerSettings,
} from '@shopware-ag/dive/orbitcontroller';
import { OrientationDisplay } from '@shopware-ag/dive/orientationdisplay';

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
} & Partial<DIVESceneSettings> &
    Partial<DIVEPerspectiveCameraSettings> &
    Partial<DIVERendererSettings> &
    Partial<OrbitControllerSettings>;

export const DIVEDefaultSettings: DIVESettings = {
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

export type QuickView = DIVE & { orbitController: OrbitController };

export class DIVE {
    // static members
    public static async QuickView(
        uri: string,
        settings?: Partial<DIVESettings & Partial<{ lightIntensity: number }>>,
    ): Promise<QuickView> {
        const dive = new DIVE(settings);
        dive.mainView.camera.position.set(0, 1, 2);

        // set scene properties
        dive.scene.setBackground(
            settings?.backgroundColor ??
                DIVESceneDefaultSettings.backgroundColor,
        );
        dive.scene.grid.setVisibility(
            settings?.displayGrid ?? DIVESceneDefaultSettings.displayGrid,
        );
        dive.scene.root.floor.setVisibility(
            settings?.displayFloor ?? DIVESceneDefaultSettings.displayFloor,
        );

        // add scene light
        const light = new DIVESceneLight();
        light.setIntensity(settings?.lightIntensity ?? 1);
        dive.scene.root.add(light);

        // instantiate model
        const model = await new DIVEModel().setFromURL(uri);
        dive.scene.root.add(model);

        const orbitController = new OrbitController(
            dive.mainView.camera,
            dive.mainView.canvas,
        );
        orbitController.focusObject(model);
        dive.clock.addTicker(orbitController);

        return Object.assign(dive, { orbitController });
    }

    // descriptive members
    private _instanceId: string = MathUtils.generateUUID();
    private _settings: DIVESettings;

    private _views: DIVEView[];
    private _mainView: DIVEView;
    private _scene: DIVEScene;
    private _clock: DIVEClock;

    private orientationDisplay: OrientationDisplay | null;

    constructor(settings?: Partial<DIVESettings>) {
        this._settings = {
            ...DIVEDefaultSettings,
            ...(settings ?? {}),
        };
        // set up the clock to define the tick
        this._clock = new DIVEClock();

        // set up scene
        this._scene = new DIVEScene();

        // set up main view
        const mainView = new DIVEView(
            this._scene,
            new DIVEPerspectiveCamera(),
            this._settings,
        );
        this._clock.addTicker(mainView);
        this._views = [mainView];
        this._mainView = mainView;

        if (this._settings.autoStart) {
            this.start();
        }

        // initialize axis camera
        if (this._settings.displayAxes) {
            console.log('displayAxes', this._settings.displayAxes);
            this.orientationDisplay = new OrientationDisplay(
                this.mainView.renderer,
                this.scene,
                this.mainView.camera,
            );
            this.clock.addTicker(this.orientationDisplay);
        } else {
            this.orientationDisplay = null;
        }

        // Load version info
        import('../../package.json').then((pkgjson) => {
            console.log(
                `DIVE ${pkgjson.default.version} initialized successfully!`,
            );
            console.log(`
                    @@@@@@@@@@@@@@@@@@@@@@@              @@@@@@@@@@@@@@@@@@@@@@@
               @@@@+-:::::::---------------------==------------------------------=#@@@@
            @@%=::::.......::---------------------------------------------------------+@@
          @@+:::...........::-----------------------------------------------------------#@@
        @@=:::.........::::::-------------------------------------------------------------%@
       @%:::.......:::::::-----------------------------------------------------------------#@
      @*:::.....:::::-----------------------------------------------------------------------*@
     @%::::::.::::---------------------------------------------------------------------------@@
    @@-:::::::::-----------------------------------------------------------------------------=@
    @%::::::::--------------------------------------------------------------------------------%@
    @+::::::::--------------------------------=@@@@@%-----------------------------------------%@
    @=:::::::--------------------------------*@@    @@+---------------------------------------#@
    @+:::::::-------------------------------*@        @*--------------------------------------%@
    @#::::::::-----------------------------=@@        @@=-------------------------------------%@
    @@-::::::::----------------------------@@          @@------------------------------------=@
     @%:::::::::--------------------------*@            @*-----------------------------------@@
      @*:::::::::-------------------------@@            @@----------------------------------%@
       @#::::::::::----------------------%@              @%--------------------------------%@
        @#:::::::::::-------------------=@@              @@=------------------------------%@
         @@-::::::::::::----------------%@                @%----------------------------=@@
          @@#::::::::::::::------------*@                  @*--------------------------#@@
            @@+::::::::::::::::--------@@                  @@------------------------+@@
              @@*:::::::::::::::::----@@                    @@---------------------+@@
                @@@-:::::::::::::::--#@                      @#-----------------=%@@
                   @@%-::::::::::::-%@                        @%-------------=%@@
                      @@@@+:::::::#@@                          @@*-------*@@@@
                           @@@@@@@                                @@@@@@

        `);
        });

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
        stop: () => void;
        dispose: () => void;
    } {
        return {
            ...this,
            camera: this.mainView.camera,
            renderer: this.mainView.renderer,
            setCanvas: (canvas: HTMLCanvasElement) => {
                this.mainView.setCanvas(canvas);
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

            if (this.orientationDisplay) {
                this._clock.removeTicker(this.orientationDisplay);
                this.orientationDisplay.dispose();
            }

            window.DIVE.instances = window.DIVE.instances.filter(
                (instance) => instance._instanceId !== this._instanceId,
            );

            resolve();
        });
    }

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

    public disposeView(view: DIVEView): void {
        this._views = this._views.filter((v) => v !== view);
        this._clock.removeTicker(view);

        if (this._mainView === view) {
            this._mainView = this._views[0];
        }

        view.dispose();
    }
}
