import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../types/index.ts';

export const SetGizmoVisibilityAction = Action.define<
    boolean,
    Pick<ActionDependencies, 'getToolbox'>,
    Promise<void>
>({
    description: "Sets the gizmo's visibility.",
    execute: async (payload, { getToolbox }) => {
        const instance = await getToolbox();
        instance.SetGizmoVisibility(payload);
    },
});

declare global {
    interface ActionTypes {
        SET_GIZMO_VISIBILITY: typeof SetGizmoVisibilityAction;
    }
}

registerAction('SET_GIZMO_VISIBILITY', SetGizmoVisibilityAction);
