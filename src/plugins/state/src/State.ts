// type imports
import { type DIVE } from '@shopware-ag/dive';
import { type OrbitController } from '@shopware-ag/dive/orbitcontroller';
import {
    ActionDependencies,
    ActionPayload,
    ActionReturn,
} from '../types/index.ts';
import { getActionClass } from './ActionRegistry.ts';
import { EntityRegistry } from './EntityRegistry.ts';
import { EngineGateway } from './EngineGateway.ts';

export type ActionSubscriber<ActionType extends keyof ActionTypes> = (
    payload: ActionPayload<ActionTypes[ActionType]>,
) => void;

export type ActionUnsubscribe = () => void;

export class State {
    private static __instances: State[] = [];

    private engine: DIVE;
    private controller: OrbitController;

    /** The only way from here into the engine, see {@link EngineGateway}. */
    private gateway: EngineGateway;

    /**
     * modules, each loaded on first use
     * the promise is cached, not the instance, and stored before anything is
     * awaited, or two callers in the same tick each build their own
     */

    private _mediaCreator?: Promise<
        import('@shopware-ag/dive/mediacreator').MediaCreator
    >;

    private getMediaCreator(): Promise<
        import('@shopware-ag/dive/mediacreator').MediaCreator
    > {
        this._mediaCreator ??= import('@shopware-ag/dive/mediacreator').then(
            (module) =>
                new module.MediaCreator(
                    this.engine.mainView.renderer,
                    this.engine.scene,
                    this.controller,
                ),
        );

        return this._mediaCreator;
    }

    private _arSystem?: Promise<import('@shopware-ag/dive/ar').ARSystem>;

    private getARSystem(): Promise<import('@shopware-ag/dive/ar').ARSystem> {
        this._arSystem ??= import('@shopware-ag/dive/ar').then(
            (module) => new module.ARSystem(),
        );

        return this._arSystem;
    }

    private _assetExplorer?: Promise<
        import('@shopware-ag/dive/assetexporter').AssetExporter
    >;

    private getAssetExporter(): Promise<
        import('@shopware-ag/dive/assetexporter').AssetExporter
    > {
        this._assetExplorer ??= import('@shopware-ag/dive/assetexporter').then(
            (module) => new module.AssetExporter(),
        );

        return this._assetExplorer;
    }

    private _animationSystem?: Promise<
        import('@shopware-ag/dive/animation').AnimationSystem
    >;

    private getAnimationSystem(): Promise<
        import('@shopware-ag/dive/animation').AnimationSystem
    > {
        this._animationSystem ??= import('@shopware-ag/dive/animation').then(
            (module) => new module.AnimationSystem(),
        );

        return this._animationSystem;
    }

    private _toolbox?: Promise<import('@shopware-ag/dive/toolbox').Toolbox>;

    private getToolbox(): Promise<import('@shopware-ag/dive/toolbox').Toolbox> {
        this._toolbox ??= import('@shopware-ag/dive/toolbox').then(
            (module) => new module.Toolbox(this.engine.scene, this.controller),
        );

        return this._toolbox;
    }

    // registered entities
    /** Every entity this state holds. See {@link EntityRegistry}. */
    private registry: EntityRegistry = new EntityRegistry();

    private listeners: Map<
        keyof ActionTypes,
        ActionSubscriber<keyof ActionTypes>[]
    > = new Map();

    constructor(dive: DIVE, controller: OrbitController) {
        this.engine = dive;
        this.controller = controller;
        this.gateway = new EngineGateway(dive);

        State.__instances.push(this);
    }

    /**
     * Tears this state down and forgets it.
     *
     * @returns Whether it was still registered.
     */
    public destroyInstance(): boolean {
        const existingIndex = State.__instances.indexOf(this);
        if (existingIndex === -1) return false;
        State.__instances.splice(existingIndex, 1);
        this.gateway.dispose();
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
            registry: this.registry,
            dispatch: (type, payload) => this.dispatch(type, payload),
            gateway: this.gateway,
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
export * from './EngineGateway.ts';
export * from './actions/index.ts';
export * from '../types/index.ts';
export type { ActionTypes };
