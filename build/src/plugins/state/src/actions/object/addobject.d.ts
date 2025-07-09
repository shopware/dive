import { Action } from '../action.ts';
import { ActionDependencies } from '../../../types/index.ts';
import { EntitySchema } from '../../../../../index.ts';
export declare const AddObjectAction: new (payload: EntitySchema, dependencies: Pick<ActionDependencies, "registered" | "engine">) => Action<EntitySchema, Pick<ActionDependencies, "registered" | "engine">, void>;
declare global {
    interface ActionTypes {
        ADD_OBJECT: typeof AddObjectAction;
    }
}
