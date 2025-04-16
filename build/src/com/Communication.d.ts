import { Actions } from './actions/index.ts';
import { DIVEScene } from '../engine/scene/Scene';
import { default as DIVEToolbox } from '../toolbox/Toolbox';
import { default as DIVEOrbitControls } from '../controls/OrbitControls';
import { DIVERenderer } from '../engine/renderer/Renderer';
type EventListener<Action extends keyof Actions> = (payload: Actions[Action]['PAYLOAD']) => void;
type Unsubscribe = () => boolean;
/**
 * Main class for communicating with DIVE.
 *
 * You can subscribe to actions and perform them from outside and inside DIVE.
 *
 * ```ts
 * import { DIVE } from "@shopware-ag/dive";
 *
 * const dive = new DIVE();
 *
 * dive.Communication.Subscribe('GET_ALL_SCENE_DATA', () => {
 *  // do something
 * });
 *
 * dive.Communication.PerformAction('GET_ALL_SCENE_DATA', {});
 * ```
 *
 * @module
 */
export declare class DIVECommunication {
    private static __instances;
    static get(id: string): DIVECommunication | undefined;
    private _id;
    get id(): string;
    private renderer;
    private scene;
    private controller;
    private toolbox;
    private _mediaCreator;
    private _arSystem;
    private _assetExporter;
    private registered;
    private listeners;
    constructor(renderer: DIVERenderer, scene: DIVEScene, controls: DIVEOrbitControls, toolbox: DIVEToolbox);
    DestroyInstance(): boolean;
    PerformAction<Action extends keyof Actions>(action: Action, payload?: Actions[Action]['PAYLOAD']): Actions[Action]['RETURN'];
    Subscribe<Action extends keyof Actions>(type: Action, listener: EventListener<Action>): Unsubscribe;
    private dispatch;
    private getAllSceneData;
    private getAllObjects;
    private getObjects;
    private addObject;
    private updateObject;
    private deleteObject;
    private selectObject;
    private deselectObject;
    private setBackground;
    private dropIt;
    private placeOnFloor;
    private setCameraTransform;
    private getCameraTransform;
    private moveCamera;
    private setCameraLayer;
    private resetCamera;
    private computeEncompassingView;
    private zoomCamera;
    private setGizmoMode;
    private setGizmoVisibility;
    private setGizmoScaleLinked;
    private useTool;
    private modelLoaded;
    private updateScene;
    private generateMedia;
    private setParent;
    private exportScene;
}
export type { Actions } from './actions/index.ts';
