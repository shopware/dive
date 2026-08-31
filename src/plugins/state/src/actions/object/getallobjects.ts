import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { ActionDependencies } from '../../../types/index.ts';
import { type EntitySchema } from '../../../types/index.ts';

export const GetAllObjectsAction = Action.define<
    void,
    Pick<ActionDependencies, 'registry'>,
    Map<string, EntitySchema>
>({
    description: 'Retrieves all objects in the state.',
    execute: (_, { registry }) => {
        /**
         * schemas only: the nodes beside them are engine objects and have no
         * business leaving the state layer
         */
        return new Map(
            registry.read().map(({ schema }) => [schema.id, schema]),
        );
    },
});

declare global {
    interface ActionTypes {
        GET_ALL_OBJECTS: typeof GetAllObjectsAction;
    }
}

registerAction<'GET_ALL_OBJECTS'>('GET_ALL_OBJECTS', GetAllObjectsAction);
