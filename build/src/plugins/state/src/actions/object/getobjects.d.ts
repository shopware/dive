import { Action } from '../action.ts';
import { ActionDependencies } from '../../../types/index.ts';
import { EntitySchema } from '../../../../../index.ts';
export declare const GetObjectsAction: new (payload: {
    ids: string[];
}, dependencies: Pick<ActionDependencies, "registered" | "engine">) => Action<{
    ids: string[];
}, Pick<ActionDependencies, "registered" | "engine">, EntitySchema[]>;
declare global {
    interface ActionTypes {
        GET_OBJECTS: typeof GetObjectsAction;
    }
}
