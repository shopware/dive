import { Action } from '../action.ts';
import { ActionDependencies } from '../../types/index.ts';
import { COMEntity } from '../../types';
export declare const AddObjectAction: new (payload: COMEntity, dependencies: Pick<ActionDependencies, "registered" | "engine">) => Action<COMEntity, Pick<ActionDependencies, "registered" | "engine">, void>;
declare global {
    interface ActionTypes {
        ADD_OBJECT: typeof AddObjectAction;
    }
}
