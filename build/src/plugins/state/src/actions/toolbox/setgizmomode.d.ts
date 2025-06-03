import { Action } from '../action.ts';
import { ActionDependencies } from '../../../types/index.ts';
export declare const SetGizmoModeAction: new (payload: {
    mode: "translate" | "rotate" | "scale";
}, dependencies: Pick<ActionDependencies, "getToolbox">) => Action<{
    mode: "translate" | "rotate" | "scale";
}, Pick<ActionDependencies, "getToolbox">, Promise<void>>;
declare global {
    interface ActionTypes {
        SET_GIZMO_MODE: typeof SetGizmoModeAction;
    }
}
