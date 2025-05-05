import { Action } from '../action.ts';
import { ActionDependencies, COMEntity } from '../../types/index.ts';
export declare const GetAllObjectsAction: new (payload: void, dependencies: Pick<ActionDependencies, "registered">) => Action<void, Pick<ActionDependencies, "registered">, Map<string, COMEntity>>;
declare global {
    interface ActionTypes {
        GET_ALL_OBJECTS: typeof GetAllObjectsAction;
    }
}
