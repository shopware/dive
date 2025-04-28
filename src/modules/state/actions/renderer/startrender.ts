import { Action } from '../action';
import { ActionDependencies } from '../types';

export const StartRenderAction = Action.define<
    void,
    Pick<ActionDependencies, 'engine'>,
    void
>({
    description: 'Starts the render process.',
    execute: (_, { engine }) => {
        engine.start();
    },
});

declare global {
    interface ActionClasses {
        START_RENDER: typeof StartRenderAction;
    }
}
