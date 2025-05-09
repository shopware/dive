import { Action } from '../action.ts';
import { ActionDependencies } from '../../types/index.ts';
export declare const PlaceOnFloorAction: new (payload: {
    id: string;
}, dependencies: Pick<ActionDependencies, "engine" | "registered">) => Action<{
    id: string;
}, Pick<ActionDependencies, "engine" | "registered">, void>;
declare global {
    interface ActionTypes {
        PLACE_ON_FLOOR: typeof PlaceOnFloorAction;
    }
}
