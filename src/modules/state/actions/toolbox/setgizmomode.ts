import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { ActionDependencies } from '../../types/index.ts';

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
    interface ActionTypes {
        SET_GIZMO_MODE: typeof SetGizmoModeAction;
    }
}

registerAction('SET_GIZMO_MODE', SetGizmoModeAction);
