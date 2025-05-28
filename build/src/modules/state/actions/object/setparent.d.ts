import { Action } from '../action.ts';
import { ActionDependencies, COMEntity } from '../../types/index.ts';
export declare const SetParentAction: new (payload: {
    object: Partial<COMEntity> & {
        id: string;
    };
    parent: (Partial<COMEntity> & {
        id: string;
    }) | null;
}, dependencies: Pick<ActionDependencies, "engine" | "registered">) => Action<{
    object: Partial<COMEntity> & {
        id: string;
    };
    parent: (Partial<COMEntity> & {
        id: string;
    }) | null;
}, Pick<ActionDependencies, "engine" | "registered">, void>;
declare global {
    interface ActionTypes {
        SET_PARENT: typeof SetParentAction;
    }
}
