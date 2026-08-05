import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';
import { type EntitySchema, type DIVESceneObject } from '@shopware-ag/dive';

export const AddObjectAction = Action.define<
    EntitySchema,
    Pick<ActionDependencies, 'engine' | 'registered'>,
    Promise<DIVESceneObject | undefined>
>({
    description: 'Adds an object to the scene.',
    execute: async (payload, { engine, registered }) => {
        const existing = registered.get(payload.id);
        if (existing) return engine.scene.root.getSceneObject(existing);

        if (payload.parentId === undefined) payload.parentId = null;

        registered.set(payload.id, payload);

        return engine.scene.root.addSceneObject(payload);
    },
});

declare global {
    interface ActionTypes {
        ADD_OBJECT: typeof AddObjectAction;
    }
}

registerAction<'ADD_OBJECT'>('ADD_OBJECT', AddObjectAction);
