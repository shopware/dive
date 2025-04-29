import { OrbitController } from '../controller/orbit/OrbitController.ts';
import { DIVEEngine } from '../../engine/Engine.ts';
import { ActionPayload, ActionReturn } from './types/index.ts';
export type ActionSubscriber<ActionType extends keyof ActionTypes> = (payload: ActionPayload<ActionTypes[ActionType]>) => void;
export type ActionUnsubscribe = () => void;
declare global {
    interface ModuleClasses {
        State: typeof State;
    }
}
/**
 * @module State
 * State class for communicating with DIVE.
 *
 * You can subscribe to actions and perform them from outside and inside DIVE.
 *
 * ```ts
 * import { DIVE } from "@shopware-ag/dive";
 *
 * const dive = new DIVE();
 *
 * dive.State.Subscribe('GET_ALL_SCENE_DATA', () => {
 *  // do something
 * });
 *
 * dive.State.performAction('GET_ALL_SCENE_DATA', {});
 * ```
 */
export declare class State {
    private static __instances;
    static get(id: string): State | undefined;
    private _id;
    get id(): string;
    private engine;
    private controller;
    private _mediaCreator;
    private _arSystem;
    private _assetExporter;
    private _animationSystem;
    private _toolbox;
    private registered;
    private listeners;
    constructor(engine: DIVEEngine, controller: OrbitController);
    destroyInstance(): boolean;
    performAction<ActionType extends keyof ActionTypes>(action: ActionType, ...args: ActionPayload<ActionTypes[ActionType]> extends void ? [] : [ActionPayload<ActionTypes[ActionType]>]): ActionReturn<ActionTypes[ActionType]>;
    subscribe<ActionType extends keyof ActionTypes>(type: ActionType, listener: ActionSubscriber<ActionType>): ActionUnsubscribe;
    private dispatch;
    private getDependencies;
}
export * from './ActionRegistry.ts';
export * from './actions/index.ts';
export * from './types/index.ts';
export type { ActionTypes };
