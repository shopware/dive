import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';

export const SetGizmoVisibleAction = Action.define<
    boolean,
    Pick<ActionDependencies, 'getToolbox'>,
    Promise<void>
>({
    description: "Sets the gizmo's visibility.",
    execute: async (payload, { getToolbox }) => {
        const instance = await getToolbox();
        instance.getTool('transform').setGizmoVisible(payload);
    },
});

declare global {
    interface ActionTypes {
        SET_GIZMO_VISIBILITY: typeof SetGizmoVisibleAction;
    }
}

registerAction<'SET_GIZMO_VISIBILITY'>(
    'SET_GIZMO_VISIBILITY',
    SetGizmoVisibleAction,
);
