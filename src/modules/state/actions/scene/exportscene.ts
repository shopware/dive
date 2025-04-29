import { Action } from '../action';
import { ActionDependencies } from '../types';
import { type DIVESceneFileType } from '../../../../types';

export const ExportSceneAction = Action.define<
    { type: keyof DIVESceneFileType },
    Pick<ActionDependencies, 'engine' | 'AssetExporter'>,
    Promise<ArrayBuffer | null>
>({
    description: 'Exports the current scene to a blob and returns the URL.',
    execute: async (payload, { engine, AssetExporter }) => {
        return AssetExporter.instantiate().then((assetExporter) => {
            return assetExporter.export(engine.scene.Root, payload.type);
        });
    },
});

declare global {
    interface ActionClasses {
        EXPORT_SCENE: typeof ExportSceneAction;
    }
}
