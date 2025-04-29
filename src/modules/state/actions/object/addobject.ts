import { Action } from '../action';
import { ActionDependencies } from '../types';
import { type COMEntity } from '../../types';

export const AddObjectAction = Action.define<
    COMEntity,
    Pick<ActionDependencies, 'engine' | 'registered'>,
    void
>({
    description: 'Adds an object to the scene.',
    execute: (payload, { engine, registered }) => {
        if (registered.get(payload.id)) return;

        if (payload.parentId === undefined) payload.parentId = null;

        registered.set(payload.id, payload);

        engine.scene.AddSceneObject(payload);
    },
});

declare global {
    interface ActionClasses {
        ADD_OBJECT: typeof AddObjectAction;
    }
}
