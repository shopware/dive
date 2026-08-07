import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';
import { type EntitySchema } from '@shopware-ag/dive';

export const GetObjectsAction = Action.define<
    { ids: string[] },
    Pick<ActionDependencies, 'gateway' | 'registered'>,
    EntitySchema[]
>({
    description: 'Returns a list of objects of given IDs.',
    execute: (payload, { registered }) => {
        if (payload.ids.length === 0) return [];

        return Array.from(registered.values()).filter((object) =>
            payload.ids.includes(object.id),
        );
    },
});

declare global {
    interface ActionTypes {
        GET_OBJECTS: typeof GetObjectsAction;
    }
}

registerAction<'GET_OBJECTS'>('GET_OBJECTS', GetObjectsAction);
