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
    Pick<ActionDependencies, 'gateway' | 'registry'>,
    void
>({
    description: 'Attach an object to another object.',
    execute: (payload, { gateway, registry }) => {
        const entry = registry.read(payload.object.id);
        if (!entry) throw new Error('Object not found.');

        const object = entry.schema;
        const sceneObject = entry.node;
        if (!sceneObject) throw new Error('Object is not in the scene.');

        if (payload.parent === null) {
            // detach from current parent
            gateway.root.attach(sceneObject);
            // Update registration to reflect no parent
            new UpdateObjectAction(
                {
                    id: object.id,
                    parentId: null,
                },
                { gateway, registry },
            ).execute();
            return;
        }

        if (payload.object.id === payload.parent.id) {
            // cannot attach object to itself
            console.warn('Cannot attach object to itself.');
            return;
        }

        const parentEntry = registry.read(payload.parent.id);
        if (!parentEntry) {
            console.warn('Parent object not found.');
            return;
        }

        const parent = parentEntry.schema;
        const parentObject = parentEntry.node;
        if (!parentObject) {
            console.warn('Parent object is not in the scene.');
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
            { gateway, registry },
        ).execute();
    },
});

declare global {
    interface ActionTypes {
        SET_PARENT: typeof SetParentAction;
    }
}

registerAction<'SET_PARENT'>('SET_PARENT', SetParentAction);
