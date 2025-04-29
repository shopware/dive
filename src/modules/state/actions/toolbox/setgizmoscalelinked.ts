import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { ActionDependencies } from '../../types/index.ts';

export const SetGizmoScaleLinkedAction = Action.define<
    boolean,
    Pick<ActionDependencies, 'engine' | 'controller' | 'Toolbox'>,
    Promise<void>
>({
    description: "Sets the gizmo's unified scale mode.",
    execute: async (payload, { engine, controller, Toolbox }) => {
        const instance = await Toolbox.instantiate(engine.scene, controller);
        instance.SetGizmoScaleLinked(payload);
    },
});

declare global {
    interface ActionTypes {
        SET_GIZMO_SCALE_LINKED: typeof SetGizmoScaleLinkedAction;
    }
}

registerAction('SET_GIZMO_SCALE_LINKED', SetGizmoScaleLinkedAction);
