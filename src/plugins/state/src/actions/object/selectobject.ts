import { type Object3D } from 'three';
import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';
import { type EntitySchema, type DIVESelectable } from '@shopware-ag/dive';

export const SelectObjectAction = Action.define<
    Partial<EntitySchema> & { id: string },
    Pick<ActionDependencies, 'engine' | 'getToolbox' | 'registered'>,
    Promise<void>
>({
    description: 'Selects an existing object.',
    execute: async (payload, { engine, getToolbox, registered }) => {
        const object = registered.get(payload.id);
        if (!object) throw new Error('Object not found.');

        const sceneObject = engine.scene.root.getSceneObject(object);
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
