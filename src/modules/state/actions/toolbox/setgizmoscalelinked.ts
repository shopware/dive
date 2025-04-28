import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { ActionDependencies } from '../../types/index.ts';

export const SetGizmoScaleLinkedAction = Action.define<
    boolean,
    Pick<ActionDependencies, 'toolbox'>,
    void
>({
    description: "Sets the gizmo's unified scale mode.",
    execute: (payload, { toolbox }) => {
        toolbox.SetGizmoScaleLinked(payload);
    },
});

declare global {
    interface ActionTypes {
        SET_GIZMO_SCALE_LINKED: typeof SetGizmoScaleLinkedAction;
    }
}

registerAction('SET_GIZMO_SCALE_LINKED', SetGizmoScaleLinkedAction);
