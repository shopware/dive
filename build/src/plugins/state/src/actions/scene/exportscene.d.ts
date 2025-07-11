import { Action } from '../action.ts';
import { ActionDependencies } from '../../../types/index.ts';
import { StateExportFileType } from '../../../types/StateExportFileType.ts';
export declare const ExportSceneAction: new (payload: {
    type: keyof StateExportFileType;
}, dependencies: Pick<ActionDependencies, "engine" | "getAssetExporter">) => Action<{
    type: keyof StateExportFileType;
}, Pick<ActionDependencies, "engine" | "getAssetExporter">, Promise<ArrayBuffer | null>>;
declare global {
    interface ActionTypes {
        EXPORT_SCENE: typeof ExportSceneAction;
    }
}
