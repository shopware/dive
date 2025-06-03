import { DIVEEngine } from '../../../engine/Engine.ts';
import { type OrbitController } from '../../controller/orbit/OrbitController.ts';
import { type COMEntity } from '../types/index.ts';

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
    registered: Map<string, COMEntity>;
    engine: DIVEEngine;
    controller: OrbitController;
    getAnimationSystem: () => Promise<
        import('../../animation/index.ts').AnimationSystem
    >;
    getARSystem: () => Promise<import('../../ar/ARSystem.ts').ARSystem>;
    getAssetExporter: () => Promise<
        import('../../assetexporter/AssetExporter.ts').AssetExporter
    >;
    getMediaCreator: () => Promise<
        import('../../mediacreator/MediaCreator.ts').MediaCreator
    >;
    getToolbox: () => Promise<import('../../toolbox/Toolbox.ts').Toolbox>;
}
