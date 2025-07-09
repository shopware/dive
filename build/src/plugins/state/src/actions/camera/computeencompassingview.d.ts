import { Action } from '../action.ts';
import { Vector3Like } from 'three';
import { ActionDependencies } from '../../../types/index.ts';
export declare const ComputeEncompassingViewAction: new (payload: void, dependencies: Pick<ActionDependencies, "engine" | "controller">) => Action<void, Pick<ActionDependencies, "engine" | "controller">, {
    position: Vector3Like;
    target: Vector3Like;
}>;
declare global {
    interface ActionTypes {
        COMPUTE_ENCOMPASSING_VIEW: typeof ComputeEncompassingViewAction;
    }
}
