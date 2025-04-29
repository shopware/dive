import { Action } from '../action';
import { ActionDependencies } from '../types';

export const SetBackgroundAction = Action.define<
    { color: string | number },
    Pick<ActionDependencies, 'engine'>,
    void
>({
    description: 'Set the background color of the scene.',
    execute: (payload, { engine }) => {
        engine.scene.SetBackground(payload.color);
    },
});

declare global {
    interface ActionClasses {
        SET_BACKGROUND: typeof SetBackgroundAction;
    }
}
