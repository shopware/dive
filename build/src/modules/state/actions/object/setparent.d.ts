import { Action } from '../action.ts';
import { ActionDependencies } from '../../types/index.ts';
import { COMEntity } from '../../types';
export declare const SetParentAction: new (payload: {
    object: Partial<COMEntity> & {
        id: string;
    };
    parent: (Partial<COMEntity> & {
        id: string;
    }) | null;
}, dependencies: Pick<ActionDependencies, "registered" | "engine">) => Action<{
    object: Partial<COMEntity> & {
        id: string;
    };
    parent: (Partial<COMEntity> & {
        id: string;
    }) | null;
}, Pick<ActionDependencies, "registered" | "engine">, void>;
declare global {
    interface ActionTypes {
        SET_PARENT: typeof SetParentAction;
    }
}
