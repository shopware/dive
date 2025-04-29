import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { ActionDependencies } from '../../types/index.ts';
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
    interface ActionTypes {
        USE_TOOL: typeof UseToolAction;
    }
}

registerAction('USE_TOOL', UseToolAction);
