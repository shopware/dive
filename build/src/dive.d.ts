import { DIVEOrbitControlsSettings } from './controls/OrbitControls.ts';
import { DIVECommunication } from './com/Communication.ts';
import { Engine, EngineSettings } from './engine/Engine.ts';
export type DIVESettings = EngineSettings & {
    orbitControls: Partial<DIVEOrbitControlsSettings>;
};
export declare const DIVEDefaultSettings: DIVESettings;
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
    static QuickView(uri: string, settings?: Partial<DIVESettings>): Promise<DIVE>;
    private _settings;
    get engine(): Engine;
    private _engine;
    private orbitControls;
    private toolbox;
    private _communication;
    private animationSystem;
    private axisCamera;
    get communication(): DIVECommunication;
    get canvas(): HTMLCanvasElement;
    constructor(settings?: Partial<DIVESettings>);
    Dispose(): void;
}
export { DIVE, DIVECommunication };
export { DIVEMath as DiveMath } from './math/index.ts';
export * from './com/actions/index.ts';
export * from './com/types';
export * from './types';
