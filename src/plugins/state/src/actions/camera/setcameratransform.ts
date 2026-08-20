import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';
import { type Vector3Like } from 'three/webgpu';

export const SetCameraTransformAction = Action.define<
    {
        position: Vector3Like;
        target: Vector3Like;
    },
    Pick<ActionDependencies, 'controller'>,
    void
>({
    description: 'Sets the camera position and target.',
    execute: (payload, { controller }) => {
        controller.object.owner.position.copy(payload.position);
        controller.target.copy(payload.target);
        controller.update();
    },
});

declare global {
    interface ActionTypes {
        SET_CAMERA_TRANSFORM: typeof SetCameraTransformAction;
    }
}

registerAction<'SET_CAMERA_TRANSFORM'>(
    'SET_CAMERA_TRANSFORM',
    SetCameraTransformAction,
);
