import { Action } from '../action';
import { ActionDependencies } from '../types';
import { SetParentAction } from './setparent';
import { UpdateObjectAction } from './updateobject';
import { type COMEntity } from '../../types';

export const DeleteObjectAction = Action.define<
    Partial<COMEntity> & { id: string },
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

        engine.scene.DeleteSceneObject(deletedObject);
    },
});

declare global {
    interface ActionClasses {
        DELETE_OBJECT: typeof DeleteObjectAction;
    }
}
