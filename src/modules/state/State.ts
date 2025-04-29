import { generateUUID } from 'three/src/math/MathUtils';

// type imports
import { type COMEntity } from './types/index.ts';
import { type DIVEToolbox } from '../toolbox/Toolbox.ts';
import { type DIVEOrbitController } from '../controller/orbit/OrbitController.ts';
import { Actions } from './actions/index.ts';
import { ModuleImporter } from '../index.ts';
import { DIVEEngine } from '../../engine/Engine.ts';
import {
    ActionDependencies,
    ActionDeps,
    ActionPayload,
    ActionReturn,
} from './actions/types.ts';

type ActionSubscriber<ActionType extends keyof ActionClasses> = (
    payload: ActionPayload<ActionClasses[ActionType]>,
) => void;

type ActionUnsubscribe = () => void;

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
 * dive.State.PerformAction('GET_ALL_SCENE_DATA', {});
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
    private controller: DIVEOrbitController;
    private toolbox: DIVEToolbox;

    // modules
    private _mediaCreator: ModuleImporter<'MediaCreator'>;
    private _arSystem: ModuleImporter<'ARSystem'>;
    private _assetExporter: ModuleImporter<'AssetExporter'>;

    private registered: Map<string, COMEntity> = new Map();

    private listeners: Map<
        keyof ActionClasses,
        ActionSubscriber<keyof ActionClasses>[]
    > = new Map();

    constructor(
        engine: DIVEEngine,
        controller: DIVEOrbitController,
        toolbox: DIVEToolbox,
    ) {
        this._id = generateUUID();
        this.engine = engine;
        this.controller = controller;
        this.toolbox = toolbox;

        this._mediaCreator = new ModuleImporter<'MediaCreator'>(
            'src/modules/mediacreator/MediaCreator.ts',
        );

        this._arSystem = new ModuleImporter<'ARSystem'>(
            'src/modules/ar/ARSystem.ts',
        );

        this._assetExporter = new ModuleImporter<'AssetExporter'>(
            'src/modules/asset/exporter/AssetExporter.ts',
        );

        State.__instances.push(this);
    }

    public DestroyInstance(): boolean {
        const existingIndex = State.__instances.findIndex(
            (entry) => entry.id === this.id,
        );
        if (existingIndex === -1) return false;
        State.__instances.splice(existingIndex, 1);
        return true;
    }

    public PerformAction<ActionType extends keyof ActionClasses>(
        action: ActionType,
        ...args: ActionPayload<ActionClasses[ActionType]> extends void
            ? []
            : [ActionPayload<ActionClasses[ActionType]>]
    ): ActionReturn<ActionClasses[ActionType]> {
        const ActionClass = Actions[action] as unknown as {
            new (
                payload: ActionPayload<ActionClasses[ActionType]>,
                dependencies: ActionDeps<ActionClasses[ActionType]>,
            ): InstanceType<ActionClasses[ActionType]>;
        };

        // Get only the dependencies this action needs
        const requiredDeps = this.getDependencies<
            ActionDeps<ActionClasses[ActionType]>
        >({} as ActionDeps<ActionClasses[ActionType]>);

        const payload = args[0] as ActionPayload<ActionClasses[ActionType]>;
        const actionInstance = new ActionClass(payload, requiredDeps);

        try {
            const result = actionInstance.execute() as ActionReturn<
                ActionClasses[ActionType]
            >;

            // Handle both sync and async actions
            if (result && typeof result === 'object' && 'then' in result) {
                // For async actions, dispatch after the promise resolves
                return result.then((resolvedResult) => {
                    this.dispatch(action, payload);
                    return resolvedResult;
                }) as ActionReturn<ActionClasses[ActionType]>;
            } else {
                // For sync actions, dispatch immediately
                this.dispatch(action, payload);
                return result;
            }
        } catch (error) {
            throw new Error(`Failed to execute ${action}`, { cause: error });
        }
    }

    public Subscribe<ActionType extends keyof ActionClasses>(
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

    private dispatch<ActionType extends keyof ActionClasses>(
        type: ActionType,
        payload: ActionPayload<ActionClasses[ActionType]>,
    ): void {
        const listenerArray = this.listeners.get(type);
        if (!listenerArray) return;

        listenerArray.forEach((listener) => listener(payload));
    }

    private getDependencies<D extends Partial<ActionDependencies>>(
        requiredDeps: D,
    ): D {
        const deps: Partial<ActionDependencies> = {};

        // Only load the dependencies that are actually needed
        if ('registered' in requiredDeps) deps.registered = this.registered;
        if ('engine' in requiredDeps) deps.engine = this.engine;
        if ('controller' in requiredDeps) deps.controller = this.controller;
        if ('toolbox' in requiredDeps) deps.toolbox = this.toolbox;
        if ('mediaCreator' in requiredDeps)
            deps.MediaCreator = this._mediaCreator;
        if ('ar' in requiredDeps) {
            deps.ARSystem = this._arSystem;
        }
        if ('AssetExporter' in requiredDeps) {
            deps.AssetExporter = this._assetExporter;
        }

        return deps as D;
    }
}

export type { Actions } from './actions/index.ts';
