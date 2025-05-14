import { Action } from '../action.ts';
import { ActionDependencies } from '../../types/index.ts';
import { DIVESceneFileType } from '../../../../types/index.ts';
export declare const ExportSceneAction: new (payload: {
    type: keyof DIVESceneFileType;
}, dependencies: Pick<ActionDependencies, "engine" | "getAssetExporter">) => Action<{
    type: keyof DIVESceneFileType;
}, Pick<ActionDependencies, "engine" | "getAssetExporter">, Promise<ArrayBuffer | null>>;
declare global {
    interface ActionTypes {
        EXPORT_SCENE: typeof ExportSceneAction;
    }
}
