import { Action } from '../action';
import { ActionDependencies } from '../types';
import { type COMEntity } from '../../types';

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
    interface ActionClasses {
        GET_ALL_OBJECTS: typeof GetAllObjectsAction;
    }
}
