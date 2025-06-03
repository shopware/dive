import { DIVEEngine } from '@shopware-ag/dive';
import { type OrbitController } from 'src/plugins/orbitcontroller/index.ts';
import { type EntitySchema } from '@shopware-ag/dive';

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
    registered: Map<string, EntitySchema>;
    engine: DIVEEngine;
    controller: OrbitController;
    getAnimationSystem: () => Promise<
        import('src/plugins/animation/index.ts').AnimationSystem
    >;
    getARSystem: () => Promise<import('src/plugins/ar/index.ts').ARSystem>;
    getAssetExporter: () => Promise<
        import('src/plugins/assetexporter/index.ts').AssetExporter
    >;
    getMediaCreator: () => Promise<
        import('src/plugins/mediacreator/index.ts').MediaCreator
    >;
    getToolbox: () => Promise<import('src/plugins/toolbox/index.ts').Toolbox>;
}
