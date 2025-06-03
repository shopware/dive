import { Action } from '../action.ts';
import { ActionDependencies } from '../../types/index.ts';
export declare const SetCameraLayerAction: new (payload: {
    layer: "LIVE" | "EDITOR";
}, dependencies: Pick<ActionDependencies, "controller">) => Action<{
    layer: "LIVE" | "EDITOR";
}, Pick<ActionDependencies, "controller">, void>;
declare global {
    interface ActionTypes {
        SET_CAMERA_LAYER: typeof SetCameraLayerAction;
    }
}
