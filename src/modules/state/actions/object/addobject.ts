import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../types/index.ts';
import { type COMEntity } from '../../types/index.ts';

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
    interface ActionTypes {
        ADD_OBJECT: typeof AddObjectAction;
    }
}

registerAction('ADD_OBJECT', AddObjectAction);
