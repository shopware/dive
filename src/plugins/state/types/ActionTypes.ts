import { type OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { type EngineGateway } from '../src/EngineGateway.ts';
import { type Registry } from '../src/Registry.ts';

// Extracted types for performAction_new
export type ActionPayload<T> = T extends new (
    payload: infer P,
    dependencies: infer D,
) => unknown
    ? P
    : never;

export type ActionReturn<T> = T extends new (
    payload: infer P,
    dependencies: infer D,
) => infer ClassInstance
    ? ClassInstance extends { execute(): infer E }
        ? E
        : never
    : never;

export type ActionDeps<T> = T extends new (
    payload: unknown,
    dependencies: infer D,
) => unknown
    ? D extends Partial<ActionDependencies>
        ? D
        : never
    : never;

export interface ActionDependencies {
    /**
     * Every entity the state holds: data, scene object, listener teardown.
     *
     * Handed out as an object rather than as a map, so that how an entity is
     * stored stays the registry's business — and so `write` stays the only way
     * into a schema, which is what makes the vector-copy rule enforceable.
     */
    registry: Registry;

    /**
     * Notifies subscribers without performing an action.
     *
     * This is what an engine-to-state report uses: the state already changed, so
     * running a command would write it back into the engine it came from.
     */
    dispatch: <ActionType extends keyof ActionTypes>(
        type: ActionType,
        payload: ActionPayload<ActionTypes[ActionType]>,
    ) => void;

    gateway: EngineGateway;
    controller: OrbitController;
    getAnimationSystem: () => Promise<
        import('@shopware-ag/dive/animation').AnimationSystem
    >;
    getARSystem: () => Promise<import('@shopware-ag/dive/ar').ARSystem>;
    getAssetExporter: () => Promise<
        import('@shopware-ag/dive/assetexporter').AssetExporter
    >;
    getMediaCreator: () => Promise<
        import('@shopware-ag/dive/mediacreator').MediaCreator
    >;
    getToolbox: () => Promise<import('@shopware-ag/dive/toolbox').Toolbox>;
}
