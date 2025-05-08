import { Action } from '../action.ts';
import { ActionDependencies } from '../../types/index.ts';
import { Vector3Like } from 'three';
export declare const GetCameraTransformAction: new (payload: void, dependencies: Pick<ActionDependencies, "controller">) => Action<void, Pick<ActionDependencies, "controller">, {
    position: Vector3Like;
    target: Vector3Like;
}>;
declare global {
    interface ActionTypes {
        GET_CAMERA_TRANSFORM: typeof GetCameraTransformAction;
    }
}
