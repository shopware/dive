import { Action } from '../action.ts';
import { ActionDependencies } from '../../types/index.ts';
export declare const DropItAction: new (payload: {
    id: string;
}, dependencies: Pick<ActionDependencies, "engine" | "registered">) => Action<{
    id: string;
}, Pick<ActionDependencies, "engine" | "registered">, void>;
declare global {
    interface ActionTypes {
        DROP_IT: typeof DropItAction;
    }
}
