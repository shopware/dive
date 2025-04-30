import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { ActionDependencies } from '../../types/index.ts';
import { type COMEntity } from '../../types/index.ts';

export const GetAllObjectsAction = Action.define<
    void,
    Pick<ActionDependencies, 'registered'>,
    Map<string, COMEntity>
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

registerAction('GET_ALL_OBJECTS', GetAllObjectsAction);
