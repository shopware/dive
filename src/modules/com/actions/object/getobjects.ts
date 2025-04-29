import { Action } from '../action';
import { ActionDependencies } from '../types';
import { type COMEntity } from '../../types';

export const GetObjectsAction = Action.define<
    { ids: string[] },
    Pick<ActionDependencies, 'engine' | 'registered'>,
    COMEntity[]
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
    interface ActionClasses {
        GET_OBJECTS: typeof GetObjectsAction;
    }
}
