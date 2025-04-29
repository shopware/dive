import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { ActionDependencies } from '../../types/index.ts';
import { type ToolType } from '../../../toolbox/Toolbox';

export const UseToolAction = Action.define<
    { tool: ToolType },
    Pick<ActionDependencies, 'engine' | 'controller' | 'Toolbox'>,
    Promise<void>
>({
    description: 'Activates a specific tool from the toolbox.',
    execute: async (payload, { engine, controller, Toolbox }) => {
        const instance = await Toolbox.instantiate(engine.scene, controller);
        instance.UseTool(payload.tool);
    },
});

declare global {
    interface ActionTypes {
        USE_TOOL: typeof UseToolAction;
    }
}

registerAction('USE_TOOL', UseToolAction);
