import { Action } from '../action.ts';
import { ActionDependencies } from '../../../types/index.ts';
import { EntitySchema } from '../../../../../index.ts';
export declare const DeleteObjectAction: new (payload: Partial<EntitySchema> & {
    id: string;
}, dependencies: Pick<ActionDependencies, "registered" | "engine">) => Action<Partial<EntitySchema> & {
    id: string;
}, Pick<ActionDependencies, "registered" | "engine">, void>;
declare global {
    interface ActionTypes {
        DELETE_OBJECT: typeof DeleteObjectAction;
    }
}
