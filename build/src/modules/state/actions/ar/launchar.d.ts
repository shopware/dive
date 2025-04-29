import { Action } from '../action.ts';
import { ActionDependencies } from '../../types/index.ts';
import { ARSystemOptions } from '../../../ar/ARSystem';
export declare const LaunchARAction: new (payload: {
    uri: string;
    options?: ARSystemOptions;
}, dependencies: Pick<ActionDependencies, "ARSystem">) => Action<{
    uri: string;
    options?: ARSystemOptions;
}, Pick<ActionDependencies, "ARSystem">, Promise<void>>;
declare global {
    interface ActionTypes {
        LAUNCH_AR: typeof LaunchARAction;
    }
}
