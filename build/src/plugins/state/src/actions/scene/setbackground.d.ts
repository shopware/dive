import { Action } from '../action.ts';
import { ActionDependencies } from '../../../types/index.ts';
export declare const SetBackgroundAction: new (payload: {
    color: string | number;
}, dependencies: Pick<ActionDependencies, "engine">) => Action<{
    color: string | number;
}, Pick<ActionDependencies, "engine">, void>;
declare global {
    interface ActionTypes {
        SET_BACKGROUND: typeof SetBackgroundAction;
    }
}
