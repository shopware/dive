import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';

export const SetBackgroundAction = Action.define<
    { color: string | number },
    Pick<ActionDependencies, 'gateway'>,
    void
>({
    description: 'Set the background color of the scene.',
    execute: (payload, { gateway }) => {
        gateway.setBackground(payload.color);
    },
});

declare global {
    interface ActionTypes {
        SET_BACKGROUND: typeof SetBackgroundAction;
    }
}

registerAction<'SET_BACKGROUND'>('SET_BACKGROUND', SetBackgroundAction);
