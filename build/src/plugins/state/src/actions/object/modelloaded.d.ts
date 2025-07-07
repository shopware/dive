import { Action } from '../action.ts';
import { ActionDependencies } from '../../../types/index.ts';
export declare const ModelLoadedAction: new (payload: {
    id: string;
}, dependencies: Pick<ActionDependencies, "registered">) => Action<{
    id: string;
}, Pick<ActionDependencies, "registered">, void>;
declare global {
    interface ActionTypes {
        MODEL_LOADED: typeof ModelLoadedAction;
    }
}
