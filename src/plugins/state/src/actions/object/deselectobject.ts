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
        // Use SelectionState to deselect
        // TransformTool will automatically detach gizmo via selection change listener
        instance.selectionState.deselect();
    },
});

declare global {
    interface ActionTypes {
        DESELECT_OBJECT: typeof DeselectObjectAction;
    }
}

registerAction<'DESELECT_OBJECT'>('DESELECT_OBJECT', DeselectObjectAction);
