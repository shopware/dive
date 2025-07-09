import { Action } from '../action.ts';
import { ActionDependencies } from '../../../types/index.ts';
import { ARSystemOptions } from '../../../../ar/index.ts';
export declare const LaunchARAction: new (payload: {
    uri: string;
    options?: ARSystemOptions;
}, dependencies: Pick<ActionDependencies, "getARSystem">) => Action<{
    uri: string;
    options?: ARSystemOptions;
}, Pick<ActionDependencies, "getARSystem">, Promise<void>>;
declare global {
    interface ActionTypes {
        LAUNCH_AR: typeof LaunchARAction;
    }
}
