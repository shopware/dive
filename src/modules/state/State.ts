import { generateUUID } from 'three/src/math/MathUtils';

// type imports
import { type COMEntity } from './types/index.ts';
import { type OrbitController } from '../controller/orbit/OrbitController.ts';
import { ModuleImporter } from '../index.ts';
import { DIVEEngine } from '../../engine/Engine.ts';
import {
    ActionDependencies,
    ActionPayload,
    ActionReturn,
} from './types/index.ts';
import { getActionClass } from './ActionRegistry.ts';

export type ActionSubscriber<ActionType extends keyof ActionTypes> = (
    payload: ActionPayload<ActionTypes[ActionType]>,
) => void;

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

export class State {
    private static __instances: State[] = [];

    public static get(id: string): State | undefined {
        const fromComID = this.__instances.find(
            (instance) => instance.id === id,
        );
        if (fromComID) return fromComID;
        return this.__instances.find((instance) =>
            Array.from(instance.registered.values()).find(
                (object) => object.id === id,
            ),
        );
    }

    private _id: string;
    public get id(): string {
        return this._id;
    }

    private engine: DIVEEngine;
    private controller: OrbitController;

    // modules
    private _mediaCreator: ModuleImporter<'MediaCreator'>;
    private _arSystem: ModuleImporter<'ARSystem'>;
    private _assetExporter: ModuleImporter<'AssetExporter'>;
    private _animationSystem: ModuleImporter<'AnimationSystem'>;
    private _toolbox: ModuleImporter<'Toolbox'>;

    // registered entities
    private registered: Map<string, COMEntity> = new Map();

    private listeners: Map<
        keyof ActionTypes,
        ActionSubscriber<keyof ActionTypes>[]
    > = new Map();

    constructor(engine: DIVEEngine, controller: OrbitController) {
        this._id = generateUUID();
        this.engine = engine;
        this.controller = controller;

        this._mediaCreator = new ModuleImporter<'MediaCreator'>('MediaCreator');

        this._arSystem = new ModuleImporter<'ARSystem'>('ARSystem');

        this._assetExporter = new ModuleImporter<'AssetExporter'>(
            'AssetExporter',
        );

        this._animationSystem = new ModuleImporter<'AnimationSystem'>(
            'AnimationSystem',
        );

        this._toolbox = new ModuleImporter<'Toolbox'>('Toolbox');

        State.__instances.push(this);
    }

    public destroyInstance(): boolean {
        const existingIndex = State.__instances.findIndex(
            (entry) => entry.id === this.id,
        );
        if (existingIndex === -1) return false;
        State.__instances.splice(existingIndex, 1);
        return true;
    }

    public performAction<ActionType extends keyof ActionTypes>(
        action: ActionType,
        ...args: ActionPayload<ActionTypes[ActionType]> extends void
            ? []
            : [ActionPayload<ActionTypes[ActionType]>]
    ): ActionReturn<ActionTypes[ActionType]> {
        // This makes sure that nobody performs a non-existing action (even if it is forbidden by TS).
        const ActionClass = getActionClass(action);
        if (!ActionClass) {
            throw new Error(`Action ${action} is not defined.`);
        }

        // Get only the dependencies this action needs
        const requiredDeps = this.getDependencies();

        // We can safely use the first argument as the payload since it is the only one that is in the args array.
        const payload = args[0] as ActionPayload<ActionTypes[ActionType]>;

        const actionInstance = new ActionClass(payload as never, requiredDeps);

        try {
            // Execute the action and get the result
            const result = actionInstance.execute() as ActionReturn<
                ActionTypes[ActionType]
            >;

            // Handle both sync and async actions
            if (result && typeof result === 'object' && 'then' in result) {
                // For async actions, dispatch after the promise resolves
                return result
                    .then((resolvedResult) => {
                        this.dispatch(action, payload);
                        return resolvedResult;
                    })
                    .catch((error) => {
                        throw new Error(`Failed to execute ${action}`, {
                            cause: error,
                        });
                    }) as ActionReturn<ActionTypes[ActionType]>;
            } else {
                // For sync actions, dispatch immediately
                this.dispatch(action, payload);
                return result;
            }
        } catch (error) {
            throw new Error(`Failed to execute ${action}`, { cause: error });
        }
    }

    public subscribe<ActionType extends keyof ActionTypes>(
        type: ActionType,
        listener: ActionSubscriber<ActionType>,
    ): ActionUnsubscribe {
        if (!this.listeners.get(type)) this.listeners.set(type, []);

        // casting to any because of typescript not finding between Action and typeof Actions being equal in this case
        this.listeners.get(type)!.push(listener);

        return () => {
            const listenerArray = this.listeners.get(type);
            if (!listenerArray) return;

            const existingIndex = listenerArray.findIndex(
                (entry) => entry === listener,
            );
            if (existingIndex === -1) return;

            listenerArray.splice(existingIndex, 1);
        };
    }

    private dispatch<ActionType extends keyof ActionTypes>(
        type: ActionType,
        payload: ActionPayload<ActionTypes[ActionType]>,
    ): void {
        const listenerArray = this.listeners.get(type);
        if (!listenerArray) return;

        listenerArray.forEach((listener) => listener(payload));
    }

    private getDependencies(): ActionDependencies {
        return {
            registered: this.registered,
            engine: this.engine,
            controller: this.controller,
            Toolbox: this._toolbox,
            MediaCreator: this._mediaCreator,
            ARSystem: this._arSystem,
            AssetExporter: this._assetExporter,
            AnimationSystem: this._animationSystem,
        };
    }
}

export * from './ActionRegistry.ts';
export * from './actions/index.ts';
export * from './types/index.ts';
export type { ActionTypes };
