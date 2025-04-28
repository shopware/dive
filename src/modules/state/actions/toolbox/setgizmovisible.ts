import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { ActionDependencies } from '../../types/index.ts';

export const SetGizmoVisibilityAction = Action.define<
    boolean,
    Pick<ActionDependencies, 'toolbox'>,
    void
>({
    description: "Sets the gizmo's visibility.",
    execute: (payload, { toolbox }) => {
        toolbox.SetGizmoVisibility(payload);
    },
});

declare global {
    interface ActionTypes {
        SET_GIZMO_VISIBILITY: typeof SetGizmoVisibilityAction;
    }
}

registerAction('SET_GIZMO_VISIBILITY', SetGizmoVisibilityAction);
