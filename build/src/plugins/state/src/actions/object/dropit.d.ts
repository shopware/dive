import { Action } from '../action.ts';
import { ActionDependencies } from '../../../types/index.ts';
export declare const DropItAction: new (payload: {
    id: string;
}, dependencies: Pick<ActionDependencies, "registered" | "engine">) => Action<{
    id: string;
}, Pick<ActionDependencies, "registered" | "engine">, void>;
declare global {
    interface ActionTypes {
        DROP_IT: typeof DropItAction;
    }
}
