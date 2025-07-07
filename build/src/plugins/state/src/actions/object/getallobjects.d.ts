import { Action } from '../action.ts';
import { ActionDependencies } from '../../../types/index.ts';
import { EntitySchema } from '../../../../../index.ts';
export declare const GetAllObjectsAction: new (payload: void, dependencies: Pick<ActionDependencies, "registered">) => Action<void, Pick<ActionDependencies, "registered">, Map<string, EntitySchema>>;
declare global {
    interface ActionTypes {
        GET_ALL_OBJECTS: typeof GetAllObjectsAction;
    }
}
