import { Action } from '../action';
import { ActionDependencies } from '../types';

export const SetGizmoModeAction = Action.define<
    { mode: 'translate' | 'rotate' | 'scale' },
    Pick<ActionDependencies, 'toolbox'>,
    void
>({
    description: "Sets the gizmo's mode.",
    execute: (payload, { toolbox }) => {
        toolbox.SetGizmoMode(payload.mode);
    },
});

declare global {
    interface ActionClasses {
        SET_GIZMO_MODE: typeof SetGizmoModeAction;
    }
}
