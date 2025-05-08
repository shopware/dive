import { Action } from '../action.ts';
import { ActionDependencies } from '../../types/index.ts';
import { ToolType } from '../../../toolbox/Toolbox.ts';
export declare const UseToolAction: new (payload: {
    tool: ToolType;
}, dependencies: Pick<ActionDependencies, "getToolbox">) => Action<{
    tool: ToolType;
}, Pick<ActionDependencies, "getToolbox">, Promise<void>>;
declare global {
    interface ActionTypes {
        USE_TOOL: typeof UseToolAction;
    }
}
