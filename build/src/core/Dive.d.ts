import { OrbitControllerSettings } from '../modules/controller/orbit/OrbitController.ts';
import { DIVEEngine, EngineSettings } from '../engine/Engine.ts';
export type DIVESettings = EngineSettings & {
    /** Settings for the orbit controls */
    orbitController: Partial<OrbitControllerSettings>;
};
export declare const DIVEDefaultSettings: Required<DIVESettings>;
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
export declare class DIVE {
    static QuickView(uri: string, settings?: Partial<DIVESettings>): Promise<DIVE>;
    private _settings;
    get engine(): DIVEEngine;
    private _engine;
    private orbitController;
    private axisCamera;
    get canvas(): HTMLCanvasElement;
    constructor(settings?: Partial<DIVESettings>);
    Dispose(): Promise<void>;
}
