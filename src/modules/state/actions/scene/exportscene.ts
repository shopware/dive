import { Action } from '../action.ts';
import { ActionDependencies } from '../../types/index.ts';
import { type DIVESceneFileType } from '../../../../types';
import { registerAction } from '../../ActionRegistry.ts';

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
    interface ActionTypes {
        EXPORT_SCENE: typeof ExportSceneAction;
    }
}

registerAction('EXPORT_SCENE', ExportSceneAction);
