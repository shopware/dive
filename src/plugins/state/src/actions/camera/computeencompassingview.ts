import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type Vector3Like } from 'three/webgpu';
import { type ActionDependencies } from '../../../types/index.ts';
import { BoundingBox } from '../../../../../components/boundingbox/BoundingBox.ts';

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
        const sceneBB = new BoundingBox(engine.scene.root, false, 0x00ff00);
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
