import {
    DIVEOrbitController,
    DIVEOrbitControllerDefaultSettings,
    DIVEOrbitControllerSettings,
} from '../modules/controller/orbit/OrbitController.ts';
import { DIVEToolbox } from '../modules/toolbox/Toolbox.ts';
import { DIVEAnimationSystem } from '../modules/animation/AnimationSystem.ts';
import { DIVEAxisCamera } from '../modules/axiscamera/AxisCamera.ts';
import { MathUtils } from 'three';
import pkgjson from '../../package.json';
import {
    DIVEEngine,
    EngineDefaultSettings,
    EngineSettings,
} from '../engine/Engine.ts';
import { ModuleImporter } from '../modules/index.ts';

export type DIVESettings = EngineSettings & {
    /** Settings for the orbit controls */
    orbitController: Partial<DIVEOrbitControllerSettings>;
};

export const DIVEDefaultSettings: Required<DIVESettings> = {
    ...EngineDefaultSettings,
    orbitController: DIVEOrbitControllerDefaultSettings,
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
 * dive.Communication.PerformAction('GET_ALL_SCENE_DATA', {});
 * ```
 * @module
 */

export class DIVE {
    // static members
    public static async QuickView(
        uri: string,
        settings?: Partial<DIVESettings>,
    ): Promise<DIVE> {
        return new Promise((resolve) => {
            const dive = new DIVE(settings);
            new ModuleImporter<'State'>('State')
                .instantiate(dive._engine, dive.orbitControls, dive.toolbox)
                .then((state) => {
                    // set scene properties
                    state.PerformAction('UPDATE_SCENE', {
                        backgroundColor: 0xffffff,
                        gridEnabled: false,
                        floorColor: 0xffffff,
                    });

                    state.PerformAction('SET_CAMERA_TRANSFORM', {
                        position: { x: 0, y: 2, z: 2 },
                        target: { x: 0, y: 0.5, z: 0 },
                    });

                    // generate scene light id
                    const lightid = MathUtils.generateUUID();

                    // add scene light
                    state.PerformAction('ADD_OBJECT', {
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
                    const modelid = MathUtils.generateUUID();

                    // add loaded listener
                    state.Subscribe('MODEL_LOADED', (data) => {
                        if (data.id !== modelid) return;

                        const transform = state.PerformAction(
                            'COMPUTE_ENCOMPASSING_VIEW',
                        );

                        state.PerformAction('SET_CAMERA_TRANSFORM', {
                            position: transform.position,
                            target: transform.target,
                        });

                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (window as any).DIVE.instances.push(dive);

                        resolve(dive);
                    });

                    // instantiate model
                    state.PerformAction('ADD_OBJECT', {
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
        });
    }

    // descriptive members
    private _settings: DIVESettings;

    public get engine(): DIVEEngine {
        return this._engine;
    }

    private _engine: DIVEEngine;

    private orbitControls: DIVEOrbitController;
    private toolbox: DIVEToolbox;

    // additional components
    private animationSystem: DIVEAnimationSystem;
    private axisCamera: DIVEAxisCamera | null;

    public get canvas(): HTMLCanvasElement {
        return this._engine.renderer.webglrenderer.domElement;
    }

    constructor(settings?: Partial<DIVESettings>) {
        this._settings = {
            ...DIVEDefaultSettings,
            ...(settings ?? {}),
        };

        this._engine = new DIVEEngine(settings);

        // initialize animation system
        this.animationSystem = new DIVEAnimationSystem();
        this._engine.clock.addTicker(this.animationSystem);

        this.orbitControls = new DIVEOrbitController(
            this._engine.camera,
            this._engine.renderer.webglrenderer.domElement,
            this.animationSystem,
            this._settings.orbitController,
        );
        this._engine.clock.addTicker(this.orbitControls);
        this.toolbox = new DIVEToolbox(this._engine.scene, this.orbitControls);

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

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).DIVE = {
            instances: [],
            PrintScene: () => {
                return this._engine.scene;
            },
        };

        console.log(`DIVE ${pkgjson.version} initialized successfully!`);
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
    }

    public async Dispose(): Promise<void> {
        return new Promise((resolve) => {
            this._engine.clock.removeTicker(this.orbitControls);
            this.orbitControls.Dispose();

            if (this.axisCamera) {
                this._engine.clock.removeTicker(this.axisCamera);
                this.axisCamera.Dispose();
            }

            this._engine.clock.removeTicker(this.animationSystem);
            this.animationSystem.Dispose();

            this.toolbox.Dispose();
            resolve();
        });
    }
}
