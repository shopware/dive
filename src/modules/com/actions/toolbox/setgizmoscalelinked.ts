import { Action } from '../action';
import { ActionDependencies } from '../types';

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
    interface ActionClasses {
        SET_GIZMO_SCALE_LINKED: typeof SetGizmoScaleLinkedAction;
    }
}
