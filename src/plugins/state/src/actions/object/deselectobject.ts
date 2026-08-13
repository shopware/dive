import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';
import { type EntitySchema } from '../../../types/index.ts';

export const DeselectObjectAction = Action.define<
    Partial<EntitySchema> & { id: string },
    Pick<ActionDependencies, 'getToolbox' | 'registry'>,
    Promise<void>
>({
    description: 'Deselects an existing object.',
    execute: async (payload, { getToolbox, registry }) => {
        const entry = registry.read(payload.id);
        if (!entry) throw new Error('Object not found.');

        const sceneObject = entry.node;
        if (!sceneObject) throw new Error('Object is not in the scene.');

        if (!('isSelectable' in sceneObject))
            throw new Error('Object is not selectable.');

        const instance = await getToolbox();
        // applyDeselection, not deselect: performAction announces this action when
        // it returns, and having the object announce it too would reach
        // subscribers twice. TransformTool still detaches the gizmo -- it listens
        // through onChange, which fires either way.
        instance.selectionState.applyDeselection();
    },
});

declare global {
    interface ActionTypes {
        DESELECT_OBJECT: typeof DeselectObjectAction;
    }
}

registerAction<'DESELECT_OBJECT'>('DESELECT_OBJECT', DeselectObjectAction);
