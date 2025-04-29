import { Action } from '../action.ts';
import { ActionDependencies } from '../../types/index.ts';
export declare const SetGizmoModeAction: new (payload: {
    mode: "translate" | "rotate" | "scale";
}, dependencies: Pick<ActionDependencies, "Toolbox" | "engine" | "controller">) => Action<{
    mode: "translate" | "rotate" | "scale";
}, Pick<ActionDependencies, "Toolbox" | "engine" | "controller">, Promise<void>>;
declare global {
    interface ActionTypes {
        SET_GIZMO_MODE: typeof SetGizmoModeAction;
    }
}
