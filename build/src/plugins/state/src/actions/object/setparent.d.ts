import { Action } from '../action.ts';
import { ActionDependencies } from '../../../types/index.ts';
import { EntitySchema } from '../../../../../index.ts';
export declare const SetParentAction: new (payload: {
    object: Partial<EntitySchema> & {
        id: string;
    };
    parent: (Partial<EntitySchema> & {
        id: string;
    }) | null;
}, dependencies: Pick<ActionDependencies, "registered" | "engine">) => Action<{
    object: Partial<EntitySchema> & {
        id: string;
    };
    parent: (Partial<EntitySchema> & {
        id: string;
    }) | null;
}, Pick<ActionDependencies, "registered" | "engine">, void>;
declare global {
    interface ActionTypes {
        SET_PARENT: typeof SetParentAction;
    }
}
