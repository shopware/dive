import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type Vector3Like } from 'three';
import { type ActionDependencies } from '../../types/index.ts';

export const ComputeEncompassingViewAction = Action.define<
    void,
    Pick<ActionDependencies, 'engine' | 'controller'>,
    {
        position: Vector3Like;
        target: Vector3Like;
    }
>({
    description:
        'Calculates the camera position and target to view the whole scene. (experimental).',
    execute: (_payload, { engine, controller }) => {
        const sceneBB = engine.scene.computeSceneBB();
        return controller.computeEncompassingView(sceneBB);
    },
});

declare global {
    interface ActionTypes {
        COMPUTE_ENCOMPASSING_VIEW: typeof ComputeEncompassingViewAction;
    }
}

registerAction('COMPUTE_ENCOMPASSING_VIEW', ComputeEncompassingViewAction);
