import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type Vector3Like } from 'three/webgpu';
import { type ActionDependencies } from '../../../types/index.ts';
import { BoundsComponent } from '@shopware-ag/dive';

export const ComputeEncompassingViewAction = Action.define<
    void,
    Pick<ActionDependencies, 'gateway' | 'controller'>,
    {
        position: Vector3Like;
        target: Vector3Like;
    }
>({
    description:
        'Calculates the camera position and target to view the whole scene. (experimental).',
    execute: (_payload, { gateway, controller }) => {
        const sceneBB = new BoundsComponent().setTarget(gateway.root);
        return controller.computeEncompassingView(sceneBB);
    },
});

declare global {
    interface ActionTypes {
        COMPUTE_ENCOMPASSING_VIEW: typeof ComputeEncompassingViewAction;
    }
}

registerAction<'COMPUTE_ENCOMPASSING_VIEW'>(
    'COMPUTE_ENCOMPASSING_VIEW',
    ComputeEncompassingViewAction,
);
