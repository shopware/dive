import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../types/index.ts';

export const SetGizmoModeAction = Action.define<
    { mode: 'translate' | 'rotate' | 'scale' },
    Pick<ActionDependencies, 'getToolbox'>,
    Promise<void>
>({
    description: "Sets the gizmo's mode.",
    execute: async (payload, { getToolbox }) => {
        const instance = await getToolbox();
        instance.SetGizmoMode(payload.mode);
    },
});

declare global {
    interface ActionTypes {
        SET_GIZMO_MODE: typeof SetGizmoModeAction;
    }
}

registerAction('SET_GIZMO_MODE', SetGizmoModeAction);
