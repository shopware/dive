import { Action } from '../action.ts';
import { ActionDependencies } from '../../types/index.ts';
import { COMEntity } from '../../types';
export declare const SelectObjectAction: new (payload: Partial<COMEntity> & {
    id: string;
}, dependencies: Pick<ActionDependencies, "Toolbox" | "registered" | "engine" | "controller">) => Action<Partial<COMEntity> & {
    id: string;
}, Pick<ActionDependencies, "Toolbox" | "registered" | "engine" | "controller">, Promise<void>>;
declare global {
    interface ActionTypes {
        SELECT_OBJECT: typeof SelectObjectAction;
    }
}
