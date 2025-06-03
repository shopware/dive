import { Action } from '../action.ts';
import { type ActionDependencies } from '../../../types/index.ts';
import { type StateExportFileType } from '@shopware-ag/dive';
import { registerAction } from '../../ActionRegistry.ts';

export const ExportSceneAction = Action.define<
    { type: keyof StateExportFileType },
    Pick<ActionDependencies, 'engine' | 'getAssetExporter'>,
    Promise<ArrayBuffer | null>
>({
    description: 'Exports the current scene to a blob and returns the URL.',
    execute: async (payload, { engine, getAssetExporter }) => {
        return getAssetExporter().then((assetExporter) => {
            return assetExporter.export(engine.scene.root, payload.type);
        });
    },
});

declare global {
    interface ActionTypes {
        EXPORT_SCENE: typeof ExportSceneAction;
    }
}

registerAction<'EXPORT_SCENE'>('EXPORT_SCENE', ExportSceneAction);
