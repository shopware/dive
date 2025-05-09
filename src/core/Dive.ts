import {
    OrbitController,
    OrbitControllerDefaultSettings,
    OrbitControllerSettings,
} from '../modules/controller/orbit/OrbitController.ts';
import { DIVEAxisCamera } from '../modules/axiscamera/AxisCamera.ts';
import { Color, MathUtils } from 'three';
import {
    DIVEEngine,
    EngineDefaultSettings,
    EngineSettings,
} from '../engine/Engine.ts';
import { DIVEModel, DIVESceneLight } from '../components/index.ts';

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

export type DIVESettings = EngineSettings & {
    /** Settings for modules */
    useLocalDRACOLoader?: boolean;
} & Partial<OrbitControllerSettings>;

export const DIVEDefaultSettings: DIVESettings = {
    ...EngineDefaultSettings,
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
        window.DIVE.instances.push(dive);

        // set scene properties
        dive.engine.scene.background = new Color(0xffffff);
        dive.engine.scene.grid.setVisibility(false);
        dive.engine.scene.root.floor.setVisibility(false);
        dive.engine.scene.root.floor.setColor(0xffffff);

        dive.engine.camera.position.set(0, 2, 2);
        dive.orbitController.target.set(0, 0.5, 0);

        // add scene light
        const light = new DIVESceneLight();
        light.name = 'SceneLight';
        light.userData.id = MathUtils.generateUUID();
        light.setEnabled(true);
        light.visible = true;
        light.setIntensity(settings?.lightIntensity ?? 1);
        light.setColor(new Color(0xffffff));
        dive.engine.scene.root.add(light);

        // instantiate model
        const model = new DIVEModel();
        model.name = 'object';
        model.userData.id = MathUtils.generateUUID();
        model.userData.uri = uri;
        model.visible = true;
        dive.engine.scene.root.add(model);

        await model.setFromURL(uri);

        // set camera to encompass the loaded model
        const sceneBB = dive.engine.scene.computeSceneBB();
        const transform = dive.orbitController.computeEncompassingView(sceneBB);
        dive.engine.camera.position.copy(transform.position);
        dive.orbitController.target.copy(transform.target);

        return dive;
    }

    // descriptive members
    private _settings: DIVESettings;

    public get engine(): DIVEEngine {
        return this._engine;
    }

    private _engine: DIVEEngine;

    private orbitController: OrbitController;

    private axisCamera: DIVEAxisCamera | null;

    public get canvas(): HTMLCanvasElement {
        return this._engine.renderer.webglrenderer.domElement;
    }

    public setCanvas(canvas: HTMLCanvasElement): void {
        this._engine.setCanvas(canvas);

        // remove old orbit controller
        this._engine.clock.removeTicker(this.orbitController);
        this.orbitController.dispose();

        // create new orbit controller
        this.orbitController = new OrbitController(
            this._engine.camera,
            canvas,
            this._settings,
        );
        this._engine.clock.addTicker(this.orbitController);
    }

    constructor(settings?: Partial<DIVESettings>) {
        this._settings = {
            ...DIVEDefaultSettings,
            ...(settings ?? {}),
        };

        this._engine = new DIVEEngine(settings);

        this.orbitController = new OrbitController(
            this._engine.camera,
            this._engine.renderer.webglrenderer.domElement,
            this._settings,
        );
        this._engine.clock.addTicker(this.orbitController);

        // initialize axis camera
        if (this._settings.displayAxes) {
            this.axisCamera = new DIVEAxisCamera(
                this._engine.renderer,
                this._engine.scene,
                this._engine.camera,
            );
            this._engine.clock.addTicker(this.axisCamera);
        } else {
            this.axisCamera = null;
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
    }

    public async dispose(): Promise<void> {
        return new Promise((resolve) => {
            this._engine.clock.removeTicker(this.orbitController);
            this.orbitController.dispose();

            if (this.axisCamera) {
                this._engine.clock.removeTicker(this.axisCamera);
                this.axisCamera.dispose();
            }

            resolve();
        });
    }
}
