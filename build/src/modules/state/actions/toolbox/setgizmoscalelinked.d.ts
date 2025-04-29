import { Action } from '../action.ts';
import { ActionDependencies } from '../../types/index.ts';
export declare const SetGizmoScaleLinkedAction: new (payload: boolean, dependencies: Pick<ActionDependencies, "Toolbox" | "engine" | "controller">) => Action<boolean, Pick<ActionDependencies, "Toolbox" | "engine" | "controller">, Promise<void>>;
declare global {
    interface ActionTypes {
        SET_GIZMO_SCALE_LINKED: typeof SetGizmoScaleLinkedAction;
    }
}
