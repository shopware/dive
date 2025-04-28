import { Action } from '../action';
import { Vector3Like } from 'three';
import { ActionDependencies } from '../types';

export const ComputeEncompassingViewAction = Action.define<
    void,
    {
        position: Vector3Like;
        target: Vector3Like;
    },
    Pick<ActionDependencies, 'scene' | 'controller'>
>({
    description:
        'Calculates the camera position and target to view the whole scene. (experimental).',
    execute: (_payload, { scene, controller }) => {
        const sceneBB = scene.ComputeSceneBB();
        return controller.ComputeEncompassingView(sceneBB);
    },
});

declare global {
    interface ActionClasses {
        COMPUTE_ENCOMPASSING_VIEW: typeof ComputeEncompassingViewAction;
    }
}
