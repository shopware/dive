import { Action } from '../action.ts';
import { ActionDependencies } from '../../types/index.ts';
export declare const SetGizmoVisibilityAction: new (payload: boolean, dependencies: Pick<ActionDependencies, "getToolbox">) => Action<boolean, Pick<ActionDependencies, "getToolbox">, Promise<void>>;
declare global {
    interface ActionTypes {
        SET_GIZMO_VISIBILITY: typeof SetGizmoVisibilityAction;
    }
}
