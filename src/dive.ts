import DIVEOrbitControls, {
    DIVEOrbitControlsDefaultSettings,
    DIVEOrbitControlsSettings,
} from './controls/OrbitControls.ts';
import DIVEToolbox from './toolbox/Toolbox.ts';
import { DIVECommunication } from './com/Communication.ts';
import { DIVEAnimationSystem } from './animation/AnimationSystem.ts';
import DIVEAxisCamera from './axiscamera/AxisCamera.ts';
import { MathUtils } from 'three';
import pkgjson from '../package.json';
import {
    Engine,
    EngineDefaultSettings,
    EngineSettings,
} from './engine/Engine.ts';

export type DIVESettings = EngineSettings & {
    orbitControls: Partial<DIVEOrbitControlsSettings>;
};

export const DIVEDefaultSettings: DIVESettings = {
    ...EngineDefaultSettings,
    orbitControls: DIVEOrbitControlsDefaultSettings,
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

export default class DIVE {
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
            dive._communication.Subscribe('MODEL_LOADED', (data) => {
                if (data.id !== modelid) return;

                const transform = dive._communication.PerformAction(
                    'COMPUTE_ENCOMPASSING_VIEW',
                    {},
                );

                dive._communication.PerformAction('SET_CAMERA_TRANSFORM', {
                    position: transform.position,
                    target: transform.target,
                });

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if (!(window as any).DIVE.instances) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (window as any).DIVE.instances = [];
                }

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

    public get engine(): Engine {
        return this._engine;
    }

    private _engine: Engine;

    private orbitControls: DIVEOrbitControls;
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
        return this._engine.renderer.domElement;
    }

    constructor(settings?: Partial<DIVESettings>) {
        this._settings = {
            ...DIVEDefaultSettings,
            ...(settings ?? {}),
        };

        this._engine = new Engine(settings);

        // initialize animation system
        this.animationSystem = new DIVEAnimationSystem(this._engine.renderer);

        this.orbitControls = new DIVEOrbitControls(
            this._engine.perspectiveCamera,
            this._engine.renderer,
            this.animationSystem,
            this._settings.orbitControls,
        );
        this.toolbox = new DIVEToolbox(this._engine.scene, this.orbitControls);
        this._communication = new DIVECommunication(
            this._engine.renderer,
            this._engine.scene,
            this.orbitControls,
            this.toolbox,
        );

        // initialize axis camera
        if (this._settings.displayAxes) {
            this.axisCamera = new DIVEAxisCamera(
                this._engine.renderer,
                this._engine.scene,
                this.orbitControls,
            );
        } else {
            this.axisCamera = null;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).DIVE = {
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

    public Dispose(): void {
        this.orbitControls.Dispose();
        this.axisCamera?.Dispose();
        this.animationSystem.Dispose();
        this.toolbox.Dispose();
        this._communication.DestroyInstance();
    }
}

export { DIVE, DIVECommunication };

export { DIVEMath as DiveMath } from './math/index.ts';

export * from './com/actions/index.ts';
export * from './com/types';
export * from './types';
