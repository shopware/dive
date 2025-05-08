import { Action } from '../action.ts';
import { ActionDependencies } from '../../types/index.ts';
export declare const UpdateSceneAction: new (payload: Partial<{
    name: string;
    backgroundColor: string | number;
    gridEnabled: boolean;
    floorEnabled: boolean;
    floorColor: string | number;
}>, dependencies: Pick<ActionDependencies, "engine">) => Action<Partial<{
    name: string;
    backgroundColor: string | number;
    gridEnabled: boolean;
    floorEnabled: boolean;
    floorColor: string | number;
}>, Pick<ActionDependencies, "engine">, void>;
declare global {
    interface ActionTypes {
        UPDATE_SCENE: typeof UpdateSceneAction;
    }
}
