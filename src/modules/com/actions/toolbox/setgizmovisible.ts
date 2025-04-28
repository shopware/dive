import { Action } from '../action';
import { ActionDependencies } from '../types';

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
    interface ActionClasses {
        SET_GIZMO_VISIBILITY: typeof SetGizmoVisibilityAction;
    }
}
