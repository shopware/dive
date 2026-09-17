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

        /**
         * the scene object is never asked for: applyDeselection clears whatever
         * is selected, so an entity with none of its own (as in camera for now)
         * deselects just as well as one that has one
         */
        const instance = await getToolbox();
        /**
         * applyDeselection, not deselect, performAction announces this action
         * when it returns and the object announcing it too would reach
         * subscribers twice
         */
        instance.selectionState.applyDeselection();
    },
});

declare global {
    interface ActionTypes {
        DESELECT_OBJECT: typeof DeselectObjectAction;
    }
}

registerAction<'DESELECT_OBJECT'>('DESELECT_OBJECT', DeselectObjectAction);
