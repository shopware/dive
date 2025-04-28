import { Action } from '../action';
import { ActionDependencies } from '../types';
import { type ToolType } from '../../../toolbox/Toolbox';

export const UseToolAction = Action.define<
    { tool: ToolType },
    Pick<ActionDependencies, 'toolbox'>,
    void
>({
    description: 'Activates a specific tool from the toolbox.',
    execute: (payload, { toolbox }) => {
        toolbox.UseTool(payload.tool);
    },
});

declare global {
    interface ActionClasses {
        USE_TOOL: typeof UseToolAction;
    }
}
