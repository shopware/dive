import { DIVEEngine, EntitySchema } from '../../../index.ts';
import { OrbitController } from '../../orbitcontroller/index.ts';
export type ActionPayload<T> = T extends new (payload: infer P, dependencies: infer D) => unknown ? P : never;
export type ActionReturn<T> = T extends new (payload: infer P, dependencies: infer D) => infer ClassInstance ? ClassInstance extends {
    execute(): infer E;
} ? E : never : never;
export type ActionDeps<T> = T extends new (payload: unknown, dependencies: infer D) => unknown ? D extends Partial<ActionDependencies> ? D : never : never;
export interface ActionDependencies {
    registered: Map<string, EntitySchema>;
    engine: DIVEEngine;
    controller: OrbitController;
    getAnimationSystem: () => Promise<import('../../animation/index.ts').AnimationSystem>;
    getARSystem: () => Promise<import('../../ar/index.ts').ARSystem>;
    getAssetExporter: () => Promise<import('../../assetexporter/index.ts').AssetExporter>;
    getMediaCreator: () => Promise<import('../../mediacreator/index.ts').MediaCreator>;
    getToolbox: () => Promise<import('../../toolbox/index.ts').Toolbox>;
}
