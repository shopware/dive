import { Action } from '../action';
import { ActionDependencies } from '../types';
import { type Vector3Like } from 'three';

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
        controller.object.position.copy(payload.position);
        controller.target.copy(payload.target);
        controller.update();
    },
});

declare global {
    interface ActionClasses {
        SET_CAMERA_TRANSFORM: typeof SetCameraTransformAction;
    }
}
