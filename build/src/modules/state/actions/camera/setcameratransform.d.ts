import { Action } from '../action.ts';
import { ActionDependencies } from '../../types/index.ts';
import { Vector3Like } from 'three';
export declare const SetCameraTransformAction: new (payload: {
    position: Vector3Like;
    target: Vector3Like;
}, dependencies: Pick<ActionDependencies, "controller">) => Action<{
    position: Vector3Like;
    target: Vector3Like;
}, Pick<ActionDependencies, "controller">, void>;
declare global {
    interface ActionTypes {
        SET_CAMERA_TRANSFORM: typeof SetCameraTransformAction;
    }
}
