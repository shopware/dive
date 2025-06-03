import { Action } from '../action.ts';
import { ActionDependencies, COMEntity } from '../../types/index.ts';
export declare const SelectObjectAction: new (payload: Partial<COMEntity> & {
    id: string;
}, dependencies: Pick<ActionDependencies, "engine" | "registered" | "getToolbox">) => Action<Partial<COMEntity> & {
    id: string;
}, Pick<ActionDependencies, "engine" | "registered" | "getToolbox">, Promise<void>>;
declare global {
    interface ActionTypes {
        SELECT_OBJECT: typeof SelectObjectAction;
    }
}
