import {
    OrbitController,
    OrbitControllerDefaultSettings,
    OrbitControllerSettings,
} from '../modules/controller/orbit/OrbitController.ts';
import { DIVEAxisCamera } from '../modules/axiscamera/AxisCamera.ts';
import { MathUtils } from 'three';
import {
    DIVEEngine,
    EngineDefaultSettings,
    EngineSettings,
} from '../engine/Engine.ts';
import { getModule } from '../modules/ModuleRegistry.ts';

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
    /** Settings for the orbit controls */
    orbitController: Partial<OrbitControllerSettings>;
};

export const DIVEDefaultSettings: Required<DIVESettings> = {
    ...EngineDefaultSettings,
    orbitController: OrbitControllerDefaultSettings,
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
 * dive.Communication.Subscribe('GET_ALL_SCENE_DATA', () => {
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

        const state = new (await getModule('State'))(
            dive._engine,
            dive.orbitController,
        );

        // set scene properties
        state.performAction('UPDATE_SCENE', {
            backgroundColor: 0xffffff,
            gridEnabled: false,
            floorEnabled: true,
            floorColor: 0xffffff,
        });

        state.performAction('SET_CAMERA_TRANSFORM', {
            position: { x: 0, y: 2, z: 2 },
            target: { x: 0, y: 0.5, z: 0 },
        });

        // generate scene light id
        const lightid = MathUtils.generateUUID();

        // add scene light
        state.performAction('ADD_OBJECT', {
            entityType: 'light',
            type: 'scene',
            name: 'light',
            id: lightid,
            enabled: true,
            visible: true,
            intensity: settings?.lightIntensity ?? 1,
            color: 0xffffff,
        });

        // generate model id
        const modelid = MathUtils.generateUUID();

        return new Promise((resolve) => {
            // add loaded listener
            state.subscribe('MODEL_LOADED', (data) => {
                if (data.id !== modelid) return;

                const transform = state.performAction(
                    'COMPUTE_ENCOMPASSING_VIEW',
                );

                state.performAction('SET_CAMERA_TRANSFORM', {
                    position: transform.position,
                    target: transform.target,
                });

                resolve(dive);
            });

            // instantiate model
            state.performAction('ADD_OBJECT', {
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
        });
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
            this._settings.orbitController,
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
            this._settings.orbitController,
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

    public async Dispose(): Promise<void> {
        return new Promise((resolve) => {
            this._engine.clock.removeTicker(this.orbitController);
            this.orbitController.dispose();

            if (this.axisCamera) {
                this._engine.clock.removeTicker(this.axisCamera);
                this.axisCamera.Dispose();
            }

            resolve();
        });
    }
}
