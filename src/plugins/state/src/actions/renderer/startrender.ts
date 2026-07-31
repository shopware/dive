import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { ActionDependencies } from '../../../types/index.ts';

export const StartRenderAction = Action.define<
    void,
    Pick<ActionDependencies, 'engine'>,
    Promise<void>
>({
    description: 'Starts the render process.',
    execute: async (_, { engine }) => {
        return engine.startAsync();
    },
});

declare global {
    interface ActionTypes {
        START_RENDER: typeof StartRenderAction;
    }
}

registerAction('START_RENDER', StartRenderAction);
