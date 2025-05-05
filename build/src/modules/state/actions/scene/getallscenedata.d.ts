import { Action } from '../action.ts';
import { ActionDependencies } from '../../types/index.ts';
import { DIVESceneData } from '../../../../types/index.ts';
export declare const GetAllSceneDataAction: new (payload: object, dependencies: Pick<ActionDependencies, "registered" | "engine" | "controller">) => Action<object, Pick<ActionDependencies, "registered" | "engine" | "controller">, DIVESceneData>;
declare global {
    interface ActionTypes {
        GET_ALL_SCENE_DATA: typeof GetAllSceneDataAction;
    }
}
