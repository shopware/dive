import { type Object3D } from 'three/webgpu';
import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';
import { type DIVESelectable } from '@shopware-ag/dive';
import { type EntitySchema } from '../../../types/index.ts';

export const SelectObjectAction = Action.define<
    Partial<EntitySchema> & { id: string },
    Pick<ActionDependencies, 'getToolbox' | 'registry'>,
    Promise<void>
>({
    description: 'Selects an existing object.',
    execute: async (payload, { getToolbox, registry }) => {
        const entry = registry.read(payload.id);
        if (!entry) throw new Error('Object not found.');

        const sceneObject = entry.node;
        if (!sceneObject) throw new Error('Object is not in the scene.');

        if (!('isSelectable' in sceneObject))
            throw new Error('Object is not selectable.');

        const instance = await getToolbox();
        /**
         * applySelection, not select, performAction announces this action when
         * it returns and the object announcing it too would reach subscribers
         * twice
         */
        instance.selectionState.applySelection(
            sceneObject as Object3D & DIVESelectable,
        );
    },
});

declare global {
    interface ActionTypes {
        SELECT_OBJECT: typeof SelectObjectAction;
    }
}

registerAction<'SELECT_OBJECT'>('SELECT_OBJECT', SelectObjectAction);
