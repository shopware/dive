import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';
import { type ToolType } from 'src/plugins/toolbox/index.ts';

export const UseToolAction = Action.define<
    { tool: ToolType },
    Pick<ActionDependencies, 'getToolbox'>,
    Promise<void>
>({
    description: 'Activates a specific tool from the toolbox.',
    execute: async (payload, { getToolbox }) => {
        const instance = await getToolbox();
        instance.useTool(payload.tool);
    },
});

declare global {
    interface ActionTypes {
        USE_TOOL: typeof UseToolAction;
    }
}

registerAction<'USE_TOOL'>('USE_TOOL', UseToolAction);
