import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';
import { type EntitySchema } from '@shopware-ag/dive';

export const AddObjectAction = Action.define<
    EntitySchema,
    Pick<ActionDependencies, 'engine' | 'registered'>,
    void
>({
    description: 'Adds an object to the scene.',
    execute: (payload, { engine, registered }) => {
        if (registered.get(payload.id)) return;

        if (payload.parentId === undefined) payload.parentId = null;

        registered.set(payload.id, payload);

        engine.scene.root.addSceneObject(payload);
    },
});

declare global {
    interface ActionTypes {
        ADD_OBJECT: typeof AddObjectAction;
    }
}

registerAction<'ADD_OBJECT'>('ADD_OBJECT', AddObjectAction);
