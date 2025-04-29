import { Action } from '../action';
import { Vector3Like } from 'three';
import { ActionDependencies } from '../types';

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
        const sceneBB = engine.scene.ComputeSceneBB();
        return controller.ComputeEncompassingView(sceneBB);
    },
});

declare global {
    interface ActionClasses {
        COMPUTE_ENCOMPASSING_VIEW: typeof ComputeEncompassingViewAction;
    }
}
