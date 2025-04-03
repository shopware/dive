import { DIVERendererSettings } from './renderer/Renderer.ts';
import { DIVEPerspectiveCameraSettings } from './camera/PerspectiveCamera.ts';
import { DIVEOrbitControlsSettings } from './controls/OrbitControls.ts';
import { DIVECommunication } from './com/Communication.ts';
import { SystemInfo } from './info/Info.ts';
export type DIVESettings = {
    autoResize: boolean;
    autoStart: boolean;
    displayAxes: boolean;
    renderer: Partial<DIVERendererSettings>;
    perspectiveCamera: Partial<DIVEPerspectiveCameraSettings>;
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
    static QuickView(uri: string, settings?: Partial<DIVESettings>): DIVE;
    private _settings;
    private _resizeObserverId;
    private _width;
    private _height;
    private renderer;
    private scene;
    private perspectiveCamera;
    private orbitControls;
    private toolbox;
    private communication;
    private animationSystem;
    private axisCamera;
    get Communication(): DIVECommunication;
    get Canvas(): HTMLCanvasElement;
    get Info(): SystemInfo;
    set Settings(settings: Partial<DIVESettings>);
    constructor(settings?: Partial<DIVESettings>);
    Dispose(): void;
    OnResize(width: number, height: number): void;
    private addResizeObserver;
    private removeResizeObserver;
}
export { DIVE, DIVECommunication };
export * from './math/index.ts';
export * from './ar/AR';
export type * from './com/actions/index.ts';
export type * from './com/types';
export type * from './types';
