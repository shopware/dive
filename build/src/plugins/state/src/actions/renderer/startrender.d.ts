import { Action } from '../action.ts';
import { ActionDependencies } from '../../../types/index.ts';
export declare const StartRenderAction: new (payload: void, dependencies: Pick<ActionDependencies, "engine">) => Action<void, Pick<ActionDependencies, "engine">, void>;
declare global {
    interface ActionTypes {
        START_RENDER: typeof StartRenderAction;
    }
}
