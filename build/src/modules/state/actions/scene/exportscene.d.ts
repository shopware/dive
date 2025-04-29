import { Action } from '../action.ts';
import { ActionDependencies } from '../../types/index.ts';
import { DIVESceneFileType } from '../../../../types';
export declare const ExportSceneAction: new (payload: {
    type: keyof DIVESceneFileType;
}, dependencies: Pick<ActionDependencies, "AssetExporter" | "engine">) => Action<{
    type: keyof DIVESceneFileType;
}, Pick<ActionDependencies, "AssetExporter" | "engine">, Promise<ArrayBuffer | null>>;
declare global {
    interface ActionTypes {
        EXPORT_SCENE: typeof ExportSceneAction;
    }
}
