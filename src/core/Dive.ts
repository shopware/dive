import { Color, MathUtils } from 'three';
import { DIVEClock } from '../engine/clock/Clock.ts';
import { DIVEView } from '../engine/view/View.ts';
import { DIVEScene } from '../engine/scene/Scene.ts';
import { DIVEModel } from '../components/model/Model.ts';
import { DIVESceneLight } from '../components/light/SceneLight.ts';
import { BoundingBox } from '../components/boundingbox/BoundingBox.ts';
import {
    OrbitController,
    OrbitControllerDefaultSettings,
    OrbitControllerSettings,
} from '@shopware-ag/dive/orbitcontroller';
import { OrientationDisplay } from '@shopware-ag/dive/orientationdisplay';
import {
    DIVEPerspectiveCamera,
    DIVEPerspectiveCameraDefaultSettings,
    DIVEPerspectiveCameraSettings,
} from '../engine/camera/PerspectiveCamera.ts';
import {
    DIVERenderer,
    DIVERendererDefaultSettings,
    DIVERendererSettings,
} from '../engine/renderer/Renderer.ts';

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
} & Partial<DIVEPerspectiveCameraSettings> &
    Partial<DIVERendererSettings> &
    Partial<OrbitControllerSettings>;

export const DIVEDefaultSettings: DIVESettings = {
    autoStart: true,
    displayAxes: false,
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
    // static members
    public static async QuickView(
        uri: string,
        settings?: Partial<DIVESettings & { lightIntensity?: number }>,
    ): Promise<DIVE> {
        const dive = new DIVE(settings);

        // set scene properties
        dive.scene.background = new Color(0xffffff);
        dive.scene.grid.setVisibility(false);
        dive.scene.root.floor.setVisibility(true);

        dive.mainView.camera.position.set(0, 2, 2);
        dive.orbitController.target.set(0, 0.5, 0);

        // add scene light
        const light = new DIVESceneLight();
        light.name = 'SceneLight';
        light.userData.id = MathUtils.generateUUID();
        light.setEnabled(true);
        light.visible = true;
        light.setIntensity(settings?.lightIntensity ?? 1);
        light.setColor(new Color(0xffffff));
        dive.scene.root.add(light);

        // instantiate model
        const model = new DIVEModel();
        model.name = 'object';
        model.userData.id = MathUtils.generateUUID();
        model.userData.uri = uri;
        model.visible = true;
        dive.scene.root.add(model);

        await model.setFromURL(uri);

        // set camera to encompass the loaded model
        const sceneBB = new BoundingBox(model);
        dive.scene.add(sceneBB);

        const transform = dive.orbitController.computeEncompassingView(sceneBB);
        dive.mainView.camera.position.copy(transform.position);
        dive.orbitController.target.copy(transform.target);

        return dive;
    }

    // descriptive members
    private _instanceId: string = MathUtils.generateUUID();
    private _settings: DIVESettings;

    private _views: DIVEView[];
    private _scene: DIVEScene;
    private _clock: DIVEClock;

    private orbitController: OrbitController;

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
        const mainViewCamera = new DIVEPerspectiveCamera();
        const mainView = new DIVEView(
            this._scene,
            mainViewCamera,
            this._settings,
        );
        this._clock.addTicker(mainView);
        this._views = [mainView];

        if (this._settings.autoStart) {
            this.start();
        }

        // set up the controller
        this.orbitController = new OrbitController(
            this.mainView.camera,
            this.mainView.canvas,
            this._settings,
        );
        this.clock.addTicker(this.orbitController);

        // initialize axis camera
        if (this._settings.displayAxes) {
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
                const state = this.orbitController.getState();

                this.clock.removeTicker(this.orbitController);
                this.orbitController.dispose();

                this.orbitController = new OrbitController(
                    this.mainView.camera,
                    canvas,
                    this._settings,
                );
                this.orbitController.setState(state);
                this.clock.addTicker(this.orbitController);

                this.mainView.setCanvas(canvas);
            },
        };
    }

    public get views(): DIVEView[] {
        return this._views;
    }

    public get mainView(): DIVEView {
        return this._views[0];
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

            this._clock.removeTicker(this.orbitController);
            this.orbitController.dispose();

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

    public createView(camera: DIVEPerspectiveCamera): DIVEView {
        const view = new DIVEView(this._scene, camera, {
            ...this._settings,
            canvas: undefined,
        });
        this._views.push(view);
        this._clock.addTicker(view);
        return view;
    }

    // public cloneCanvas(): HTMLCanvasElement {
    //     const canvas = this._renderer.createView();
    //     const state = this.orbitController.getState();
    //     const orbitController = new OrbitController(
    //         this._renderer.mainView.camera,
    //         this._renderer.mainView.canvas,
    //         this._settings,
    //     );
    //     orbitController.setState(state);
    //     this._clock.addTicker(orbitController);
    //     return canvas;
    // }

    // public setCanvas(canvas: HTMLCanvasElement): void {
    //     this._engine.setCanvas(canvas);

    //     // save state of orbit controller
    //     const state = this.orbitController.getState();

    //     // remove old orbit controller
    //     this._engine.clock.removeTicker(this.orbitController);
    //     this.orbitController.dispose();

    //     // create new orbit controller
    //     this.orbitController = new OrbitController(
    //         this._engine.camera,
    //         canvas,
    //         this._settings,
    //     );

    //     // set state of new orbit controller
    //     this.orbitController.setState(state);
    //     this._engine.clock.addTicker(this.orbitController);
    // }
}
