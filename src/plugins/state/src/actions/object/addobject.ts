import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';
import { type EntitySchema } from '@shopware-ag/dive';

export const AddObjectAction = Action.define<
    EntitySchema,
    Pick<ActionDependencies, 'engine' | 'registered'>,
    Promise<void>
>({
    description: 'Adds an object to the scene.',
    execute: async (payload, { engine, registered }) => {
        if (registered.get(payload.id)) return;

        if (payload.parentId === undefined) payload.parentId = null;

        registered.set(payload.id, payload);

        // awaited, so a model is fully loaded once this action settles
        await engine.scene.root.addSceneObject(payload);
    },
});

declare global {
    interface ActionTypes {
        ADD_OBJECT: typeof AddObjectAction;
    }
}

registerAction<'ADD_OBJECT'>('ADD_OBJECT', AddObjectAction);
