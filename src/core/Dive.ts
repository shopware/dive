import {
    DIVEOrbitController,
    DIVEOrbitControllerDefaultSettings,
    DIVEOrbitControllerSettings,
} from '../modules/controller/orbit/OrbitController.ts';
import { DIVEToolbox } from '../modules/toolbox/Toolbox.ts';
import { DIVECommunication } from '../modules/com/Communication.ts';
import { DIVEAnimationSystem } from '../modules/animation/AnimationSystem.ts';
import { DIVEAxisCamera } from '../modules/axiscamera/AxisCamera.ts';
import { MathUtils } from 'three';
import pkgjson from '../../package.json';
import {
    DIVEEngine,
    EngineDefaultSettings,
    EngineSettings,
} from '../engine/Engine.ts';

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

            // set scene properties
            dive._communication.PerformAction('UPDATE_SCENE', {
                backgroundColor: 0xffffff,
                gridEnabled: false,
                floorColor: 0xffffff,
            });

            dive._communication.PerformAction('SET_CAMERA_TRANSFORM', {
                position: { x: 0, y: 2, z: 2 },
                target: { x: 0, y: 0.5, z: 0 },
            });

            // generate scene light id
            const lightid = MathUtils.generateUUID();

            // add scene light
            dive._communication.PerformAction('ADD_OBJECT', {
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
            dive._communication.Subscribe('MODEL_LOADED', async (data) => {
                if (data.id !== modelid) return;

                const transform = dive._communication.PerformAction(
                    'COMPUTE_ENCOMPASSING_VIEW',
                );

                dive._communication.PerformAction('SET_CAMERA_TRANSFORM', {
                    position: transform.position,
                    target: transform.target,
                });

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (window as any).DIVE.instances.push(dive);

                resolve(dive);
            });

            // instantiate model
            dive._communication.PerformAction('ADD_OBJECT', {
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

    private orbitControls: DIVEOrbitController;
    private toolbox: DIVEToolbox;
    private _communication: DIVECommunication;

    // additional components
    private animationSystem: DIVEAnimationSystem;
    private axisCamera: DIVEAxisCamera | null;

    // getters
    public get communication(): DIVECommunication {
        return this._communication;
    }

    public get canvas(): HTMLCanvasElement {
        return this._engine.renderPipeline.webglrenderer.domElement;
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
        this._communication = new DIVECommunication(
            this._engine,
            this.orbitControls,
            this.toolbox,
        );

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
                return this._engine.renderPipeline.scene;
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

    public Dispose(): void {
        this._engine.clock.removeTicker(this.orbitControls);
        this.orbitControls.Dispose();

        if (this.axisCamera) {
            this._engine.clock.removeTicker(this.axisCamera);
            this.axisCamera.Dispose();
        }

        this._engine.clock.removeTicker(this.animationSystem);
        this.animationSystem.Dispose();

        this.toolbox.Dispose();
        this._communication.DestroyInstance();
    }
}
