import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';
import { type EntitySchema } from '@shopware-ag/dive';
import { merge } from 'lodash';

export const UpdateObjectAction = Action.define<
    Partial<EntitySchema> & { id: string },
    Pick<ActionDependencies, 'engine' | 'registered'>,
    void
>({
    description: 'Updates an existing object.',
    execute: (payload, { engine, registered }) => {
        const objectToUpdate = registered.get(payload.id);
        if (!objectToUpdate) throw new Error('Object not found.');

        const updatedObject = merge(objectToUpdate, payload);
        registered.set(payload.id, updatedObject);

        engine.scene.root.updateSceneObject({
            ...payload,
            id: updatedObject.id,
            entityType: updatedObject.entityType,
        } as EntitySchema);
    },
});

declare global {
    interface ActionTypes {
        UPDATE_OBJECT: typeof UpdateObjectAction;
    }
}

registerAction<'UPDATE_OBJECT'>('UPDATE_OBJECT', UpdateObjectAction);
