import { Action } from '../action.ts';
import { ActionDependencies } from '../../types/index.ts';
export declare const ZoomCameraAction: new (payload: {
    direction: "IN" | "OUT";
    by: number;
}, dependencies: Pick<ActionDependencies, "controller">) => Action<{
    direction: "IN" | "OUT";
    by: number;
}, Pick<ActionDependencies, "controller">, void>;
declare global {
    interface ActionTypes {
        ZOOM_CAMERA: typeof ZoomCameraAction;
    }
}
