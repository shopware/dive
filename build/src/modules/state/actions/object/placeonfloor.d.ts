import { Action } from '../action.ts';
import { ActionDependencies } from '../../types/index.ts';
export declare const PlaceOnFloorAction: new (payload: {
    id: string;
}, dependencies: Pick<ActionDependencies, "registered" | "engine">) => Action<{
    id: string;
}, Pick<ActionDependencies, "registered" | "engine">, void>;
declare global {
    interface ActionTypes {
        PLACE_ON_FLOOR: typeof PlaceOnFloorAction;
    }
}
