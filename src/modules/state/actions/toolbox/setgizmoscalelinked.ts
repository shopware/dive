import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../types/index.ts';

export const SetGizmoScaleLinkedAction = Action.define<
    boolean,
    Pick<ActionDependencies, 'getToolbox'>,
    Promise<void>
>({
    description: "Sets the gizmo's unified scale mode.",
    execute: async (payload, { getToolbox }) => {
        const instance = await getToolbox();
        instance.SetGizmoScaleLinked(payload);
    },
});

declare global {
    interface ActionTypes {
        SET_GIZMO_SCALE_LINKED: typeof SetGizmoScaleLinkedAction;
    }
}

registerAction<'SET_GIZMO_SCALE_LINKED'>(
    'SET_GIZMO_SCALE_LINKED',
    SetGizmoScaleLinkedAction,
);
