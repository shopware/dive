import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { ActionDependencies } from '../../types/index.ts';

export const SetGizmoModeAction = Action.define<
    { mode: 'translate' | 'rotate' | 'scale' },
    Pick<ActionDependencies, 'engine' | 'controller' | 'Toolbox'>,
    Promise<void>
>({
    description: "Sets the gizmo's mode.",
    execute: async (payload, { engine, controller, Toolbox }) => {
        const instance = await Toolbox.instantiate(engine.scene, controller);
        instance.SetGizmoMode(payload.mode);
    },
});

declare global {
    interface ActionTypes {
        SET_GIZMO_MODE: typeof SetGizmoModeAction;
    }
}

registerAction('SET_GIZMO_MODE', SetGizmoModeAction);
