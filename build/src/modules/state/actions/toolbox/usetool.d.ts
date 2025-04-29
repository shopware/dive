import { Action } from '../action.ts';
import { ActionDependencies } from '../../types/index.ts';
import { ToolType } from '../../../toolbox/Toolbox';
export declare const UseToolAction: new (payload: {
    tool: ToolType;
}, dependencies: Pick<ActionDependencies, "Toolbox" | "engine" | "controller">) => Action<{
    tool: ToolType;
}, Pick<ActionDependencies, "Toolbox" | "engine" | "controller">, Promise<void>>;
declare global {
    interface ActionTypes {
        USE_TOOL: typeof UseToolAction;
    }
}
