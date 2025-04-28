import { type DIVEScene } from '../../../engine/scene/Scene';
import { type DIVERenderer } from '../../../engine/renderer/Renderer';
import { type DIVEOrbitController } from '../../controller/orbit/OrbitController';
import { type DIVEToolbox } from '../../toolbox/Toolbox';
import { ModuleImporter } from '../../_system/ModuleImporter';

// Extracted types for PerformAction_new
export type ActionPayload<T> = T extends new (
    payload: infer P,
    dependencies: infer D,
) => unknown
    ? P
    : never;

export type ActionReturn<T> = T extends new (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dependencies: any,
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
    scene: DIVEScene;
    renderer: DIVERenderer;
    controller: DIVEOrbitController;
    toolbox: DIVEToolbox;
    mediaCreator: ModuleImporter<'MediaCreator'>;
    ar: ModuleImporter<'ARSystem'>;
}
