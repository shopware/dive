import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';
import { UpdateObjectAction } from './updateobject.ts';
import { type EntitySchema } from '../../../types/index.ts';

export const SetParentAction = Action.define<
    {
        object: Partial<EntitySchema> & { id: string };
        parent: (Partial<EntitySchema> & { id: string }) | null;
    },
    Pick<ActionDependencies, 'gateway' | 'registered'>,
    void
>({
    description: 'Attach an object to another object.',
    execute: (payload, { gateway, registered }) => {
        const object = registered.get(payload.object.id);
        if (!object) throw new Error('Object not found.');

        const sceneObject = gateway.findEntity(object);
        if (!sceneObject) throw new Error('Object not found in scene.');

        if (payload.parent === null) {
            // detach from current parent
            gateway.root.attach(sceneObject);
            // Update registration to reflect no parent
            new UpdateObjectAction(
                {
                    id: object.id,
                    parentId: null,
                },
                { gateway, registered },
            ).execute();
            return;
        }

        if (payload.object.id === payload.parent.id) {
            // cannot attach object to itself
            console.warn('Cannot attach object to itself.');
            return;
        }

        const parent = registered.get(payload.parent.id);
        if (!parent) {
            console.warn('Parent object not found.');
            return;
        }

        // attach to new parent
        const parentObject = gateway.findEntity(parent);
        if (!parentObject) {
            console.warn('Parent object not found in scene.');
            return;
        }

        // attach to new parent
        parentObject.attach(sceneObject);
        // Update registration to reflect new parent
        new UpdateObjectAction(
            {
                id: object.id,
                parentId: parent.id,
            },
            { gateway, registered },
        ).execute();
    },
});

declare global {
    interface ActionTypes {
        SET_PARENT: typeof SetParentAction;
    }
}

registerAction<'SET_PARENT'>('SET_PARENT', SetParentAction);
