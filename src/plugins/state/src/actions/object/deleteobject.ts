import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';
import { SetParentAction } from './setparent.ts';
import { UpdateObjectAction } from './updateobject.ts';
import { type EntitySchema } from '@shopware-ag/dive';

export const DeleteObjectAction = Action.define<
    Partial<EntitySchema> & { id: string },
    Pick<ActionDependencies, 'engine' | 'registered'>,
    void
>({
    description: 'Deletes an object from the scene.',
    execute: (payload, { engine, registered }) => {
        const deletedObject = registered.get(payload.id);
        if (!deletedObject) return false;

        // If the object has a parent, detach it first
        if (deletedObject.parentId) {
            // First detach from parent group
            new SetParentAction(
                {
                    object: { id: deletedObject.id },
                    parent: null,
                },
                {
                    engine,
                    registered,
                },
            ).execute();
        }

        // If deleting a group, update all children to have no parent
        if (deletedObject.entityType === 'group') {
            registered.forEach((object) => {
                if (object.parentId === deletedObject.id) {
                    new UpdateObjectAction(
                        {
                            id: object.id,
                            parentId: null,
                        },
                        {
                            engine,
                            registered,
                        },
                    ).execute();
                }
            });
        }

        // copy object to payload to use later
        Object.assign(payload, deletedObject);

        registered.delete(payload.id);

        engine.scene.root.deleteSceneObject(deletedObject);
    },
});

declare global {
    interface ActionTypes {
        DELETE_OBJECT: typeof DeleteObjectAction;
    }
}

registerAction<'DELETE_OBJECT'>('DELETE_OBJECT', DeleteObjectAction);
