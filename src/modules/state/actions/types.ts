import { DIVEEngine } from '../../../engine/Engine';
import { type OrbitController } from '../../controller/orbit/OrbitController';
import { type Toolbox } from '../../toolbox/Toolbox';
import { ModuleImporter } from '../../_system/ModuleImporter';
import { COMEntity } from '../types';

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
    toolbox: Toolbox;
    MediaCreator: ModuleImporter<'MediaCreator'>;
    ARSystem: ModuleImporter<'ARSystem'>;
    AssetExporter: ModuleImporter<'AssetExporter'>;
}
