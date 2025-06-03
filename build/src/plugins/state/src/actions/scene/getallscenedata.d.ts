import { Action } from '../action.ts';
import { ActionDependencies } from '../../../types/index.ts';
import { StateSceneData } from '../../../types/StateSceneData.ts';
export declare const GetAllSceneDataAction: new (payload: object, dependencies: Pick<ActionDependencies, "registered" | "engine" | "controller">) => Action<object, Pick<ActionDependencies, "registered" | "engine" | "controller">, StateSceneData>;
declare global {
    interface ActionTypes {
        GET_ALL_SCENE_DATA: typeof GetAllSceneDataAction;
    }
}
