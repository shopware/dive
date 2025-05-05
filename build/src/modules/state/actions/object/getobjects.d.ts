import { Action } from '../action.ts';
import { ActionDependencies, COMEntity } from '../../types/index.ts';
export declare const GetObjectsAction: new (payload: {
    ids: string[];
}, dependencies: Pick<ActionDependencies, "registered" | "engine">) => Action<{
    ids: string[];
}, Pick<ActionDependencies, "registered" | "engine">, COMEntity[]>;
declare global {
    interface ActionTypes {
        GET_OBJECTS: typeof GetObjectsAction;
    }
}
