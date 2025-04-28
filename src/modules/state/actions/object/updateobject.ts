import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { ActionDependencies } from '../../types/index.ts';
import { type COMEntity } from '../../types';
import { merge } from 'lodash';

export const UpdateObjectAction = Action.define<
    Partial<COMEntity> & { id: string },
    Pick<ActionDependencies, 'engine' | 'registered'>,
    void
>({
    description: 'Updates an existing object.',
    execute: (payload, { engine, registered }) => {
        const objectToUpdate = registered.get(payload.id);
        if (!objectToUpdate) throw new Error('Object not found.');

        registered.set(payload.id, merge(objectToUpdate, payload));

        const updatedObject = registered.get(payload.id)!;
        engine.scene.UpdateSceneObject({
            ...payload,
            id: updatedObject.id,
            entityType: updatedObject.entityType,
        });
    },
});

declare global {
    interface ActionTypes {
        UPDATE_OBJECT: typeof UpdateObjectAction;
    }
}

registerAction('UPDATE_OBJECT', UpdateObjectAction);
