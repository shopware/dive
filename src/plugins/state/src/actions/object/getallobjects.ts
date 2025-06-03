import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { ActionDependencies } from '../../../types/index.ts';
import { type EntitySchema } from '@shopware-ag/dive';

export const GetAllObjectsAction = Action.define<
    void,
    Pick<ActionDependencies, 'registered'>,
    Map<string, EntitySchema>
>({
    description: 'Retrieves all objects in the state.',
    execute: (_, { registered }) => {
        return registered;
    },
});

declare global {
    interface ActionTypes {
        GET_ALL_OBJECTS: typeof GetAllObjectsAction;
    }
}

registerAction<'GET_ALL_OBJECTS'>('GET_ALL_OBJECTS', GetAllObjectsAction);
