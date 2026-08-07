import { type Object3D } from 'three/webgpu';
import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';
import { type DIVESelectable } from '@shopware-ag/dive';
import { type EntitySchema } from '@shopware-ag/dive';

export const SelectObjectAction = Action.define<
    Partial<EntitySchema> & { id: string },
    Pick<ActionDependencies, 'gateway' | 'getToolbox' | 'registered'>,
    Promise<void>
>({
    description: 'Selects an existing object.',
    execute: async (payload, { gateway, getToolbox, registered }) => {
        const object = registered.get(payload.id);
        if (!object) throw new Error('Object not found.');

        const sceneObject = gateway.findEntity(object);
        if (!sceneObject) throw new Error('Object not found in scene.');

        if (!('isSelectable' in sceneObject))
            throw new Error('Object is not selectable.');

        const instance = await getToolbox();
        // Use SelectionState to select the object
        // TransformTool will automatically attach gizmo via selection change listener
        instance.selectionState.select(
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
