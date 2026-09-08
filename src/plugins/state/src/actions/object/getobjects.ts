import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';
import { type EntitySchema } from '../../../types/index.ts';

export const GetObjectsAction = Action.define<
    { ids: string[] },
    Pick<ActionDependencies, 'gateway' | 'registry'>,
    EntitySchema[]
>({
    description: 'Returns a list of objects of given IDs.',
    // look each id up rather than scanning every entity, unknown ids drop out
    execute: (payload, { registry }) =>
        payload.ids
            .map((id) => registry.read(id)?.schema)
            .filter((schema): schema is EntitySchema => schema !== undefined),
});

declare global {
    interface ActionTypes {
        GET_OBJECTS: typeof GetObjectsAction;
    }
}

registerAction<'GET_OBJECTS'>('GET_OBJECTS', GetObjectsAction);
