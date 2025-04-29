import { Action } from '../action.ts';
import { ActionDependencies } from '../../types/index.ts';
import { COMEntity } from '../../types';
export declare const GetAllObjectsAction: new (payload: void, dependencies: Pick<ActionDependencies, "registered">) => Action<void, Pick<ActionDependencies, "registered">, Map<string, COMEntity>>;
declare global {
    interface ActionTypes {
        GET_ALL_OBJECTS: typeof GetAllObjectsAction;
    }
}
