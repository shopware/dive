import { Action } from '../action.ts';
import { ActionDependencies, COMEntity } from '../../types/index.ts';
export declare const AddObjectAction: new (payload: COMEntity, dependencies: Pick<ActionDependencies, "engine" | "registered">) => Action<COMEntity, Pick<ActionDependencies, "engine" | "registered">, void>;
declare global {
    interface ActionTypes {
        ADD_OBJECT: typeof AddObjectAction;
    }
}
