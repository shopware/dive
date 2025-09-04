import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';
import { UpdateObjectAction } from './updateobject.ts';
import { type EntitySchema } from '@shopware-ag/dive';

export const SetParentAction = Action.define<
    {
        object: Partial<EntitySchema> & { id: string };
        parent: (Partial<EntitySchema> & { id: string }) | null;
    },
    Pick<ActionDependencies, 'engine' | 'registered'>,
    void
>({
    description: 'Attach an object to another object.',
    execute: (payload, { engine, registered }) => {
        const object = registered.get(payload.object.id);
        if (!object) throw new Error('Object not found.');

        const sceneObject = engine.scene.root.getSceneObject(object);
        if (!sceneObject) throw new Error('Object not found in scene.');

        if (payload.parent === null) {
            // detach from current parent
            engine.scene.root.attach(sceneObject);
            // Update registration to reflect no parent
            new UpdateObjectAction(
                {
                    id: object.id,
                    parentId: null,
                },
                { engine, registered },
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
        const parentObject = engine.scene.root.getSceneObject(parent);
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
            { engine, registered },
        ).execute();
    },
});

declare global {
    interface ActionTypes {
        SET_PARENT: typeof SetParentAction;
    }
}

registerAction<'SET_PARENT'>('SET_PARENT', SetParentAction);
