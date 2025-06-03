import { Action } from '../action.ts';
import { ActionDependencies } from '../../types/index.ts';
export declare const SetCameraLockedAction: new (payload: boolean, dependencies: Pick<ActionDependencies, "controller">) => Action<boolean, Pick<ActionDependencies, "controller">, void>;
declare global {
    interface ActionTypes {
        SET_CAMERA_LOCKED: typeof SetCameraLockedAction;
    }
}
