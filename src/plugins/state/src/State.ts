import { MathUtils } from 'three/webgpu';

// type imports
import { type EntitySchema, type DIVE } from '@shopware-ag/dive';
import { type OrbitController } from '@shopware-ag/dive/orbitcontroller';
import {
    ActionDependencies,
    ActionPayload,
    ActionReturn,
} from '../types/index.ts';
import { getActionClass } from './ActionRegistry.ts';

export type ActionSubscriber<ActionType extends keyof ActionTypes> = (
    payload: ActionPayload<ActionTypes[ActionType]>,
) => void;

export type ActionUnsubscribe = () => void;

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

    private engine: DIVE;
    private controller: OrbitController;

    // modules
    private _mediaCreator:
        import('@shopware-ag/dive/mediacreator').MediaCreator | null = null;

    private async getMediaCreator(): Promise<
        import('@shopware-ag/dive/mediacreator').MediaCreator
    > {
        if (!this._mediaCreator) {
            this._mediaCreator = new (
                await import('@shopware-ag/dive/mediacreator')
            ).MediaCreator(
                this.engine.mainView.renderer,
                this.engine.scene,
                this.controller,
            );
        }
        return this._mediaCreator;
    }

    private _arSystem: import('@shopware-ag/dive/ar').ARSystem | null = null;

    private async getARSystem(): Promise<
        import('@shopware-ag/dive/ar').ARSystem
    > {
        if (!this._arSystem) {
            this._arSystem = new (
                await import('@shopware-ag/dive/ar')
            ).ARSystem();
        }
        return this._arSystem;
    }

    private _assetExplorer:
        import('@shopware-ag/dive/assetexporter').AssetExporter | null = null;

    private async getAssetExporter(): Promise<
        import('@shopware-ag/dive/assetexporter').AssetExporter
    > {
        if (!this._assetExplorer) {
            this._assetExplorer = new (
                await import('@shopware-ag/dive/assetexporter')
            ).AssetExporter();
        }
        return this._assetExplorer;
    }

    private _animationSystem:
        import('@shopware-ag/dive/animation').AnimationSystem | null = null;

    private async getAnimationSystem(): Promise<
        import('@shopware-ag/dive/animation').AnimationSystem
    > {
        if (!this._animationSystem) {
            this._animationSystem = new (
                await import('@shopware-ag/dive/animation')
            ).AnimationSystem();
        }
        return this._animationSystem;
    }

    private _toolbox: import('@shopware-ag/dive/toolbox').Toolbox | null = null;

    private async getToolbox(): Promise<
        import('@shopware-ag/dive/toolbox').Toolbox
    > {
        if (!this._toolbox) {
            this._toolbox = new (
                await import('@shopware-ag/dive/toolbox')
            ).Toolbox(this.engine.scene, this.controller);
        }
        return this._toolbox;
    }

    // registered entities
    private registered: Map<string, EntitySchema> = new Map();

    private listeners: Map<
        keyof ActionTypes,
        ActionSubscriber<keyof ActionTypes>[]
    > = new Map();

    constructor(dive: DIVE, controller: OrbitController) {
        this._id = MathUtils.generateUUID();
        this.engine = dive;
        this.controller = controller;

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
            getARSystem: () => this.getARSystem(),
            getAssetExporter: () => this.getAssetExporter(),
            getAnimationSystem: () => this.getAnimationSystem(),
            getMediaCreator: () => this.getMediaCreator(),
            getToolbox: () => this.getToolbox(),
        };
    }
}

export * from './ActionRegistry.ts';
export * from './actions/index.ts';
export * from '../types/index.ts';
export type { ActionTypes };
