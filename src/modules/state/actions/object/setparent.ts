import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../types/index.ts';
import { UpdateObjectAction } from './updateobject.ts';
import { type COMEntity } from '../../types/index.ts';

export const SetParentAction = Action.define<
    {
        object: Partial<COMEntity> & { id: string };
        parent: (Partial<COMEntity> & { id: string }) | null;
    },
    Pick<ActionDependencies, 'engine' | 'registered'>,
    void
>({
    description: 'Attach an object to another object.',
    execute: (payload, { engine, registered }) => {
        const object = registered.get(payload.object.id);
        if (!object) throw new Error('Object not found.');

        const sceneObject = engine.scene.GetSceneObject(object);
        if (!sceneObject) throw new Error('Object not found in scene.');

        if (payload.parent === null) {
            // detach from current parent
            engine.scene.Root.attach(sceneObject);
            // Update registration to reflect no parent
            new UpdateObjectAction(
                {
                    id: object.id,
                    parentId: null,
                },
                { engine, registered },
            );
            throw new Error('Object not found in scene.');
        }

        if (payload.object.id === payload.parent.id) {
            // cannot attach object to itself
            throw new Error('Cannot attach object to itself.');
        }

        const parent = registered.get(payload.parent.id);
        if (!parent) {
            // detach from current parent
            engine.scene.Root.attach(sceneObject);
            // Update registration to reflect no parent
            new UpdateObjectAction(
                {
                    id: object.id,
                    parentId: null,
                },
                { engine, registered },
            );
            throw new Error('Parent object not found.');
        }

        // attach to new parent
        const parentObject = engine.scene.GetSceneObject(parent);
        if (!parentObject) {
            // detach from current parent
            engine.scene.Root.attach(sceneObject);
            // Update registration to reflect no parent
            new UpdateObjectAction(
                {
                    id: object.id,
                    parentId: null,
                },
                { engine, registered },
            );
            throw new Error('Parent object not found in scene.');
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
        );
    },
});

declare global {
    interface ActionTypes {
        SET_PARENT: typeof SetParentAction;
    }
}

registerAction('SET_PARENT', SetParentAction);
