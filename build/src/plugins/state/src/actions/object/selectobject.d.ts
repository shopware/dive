import { Action } from '../action.ts';
import { ActionDependencies } from '../../../types/index.ts';
import { EntitySchema } from '../../../../../index.ts';
export declare const SelectObjectAction: new (payload: Partial<EntitySchema> & {
    id: string;
}, dependencies: Pick<ActionDependencies, "registered" | "engine" | "getToolbox">) => Action<Partial<EntitySchema> & {
    id: string;
}, Pick<ActionDependencies, "registered" | "engine" | "getToolbox">, Promise<void>>;
declare global {
    interface ActionTypes {
        SELECT_OBJECT: typeof SelectObjectAction;
    }
}
