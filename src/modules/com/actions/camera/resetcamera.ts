import { Action } from '../action';
import { ActionDependencies } from '../types';

export const ResetCameraAction = Action.define<
    { duration: number },
    Pick<ActionDependencies, 'controller'>,
    void
>({
    description: 'Reset the camera to its initial position and rotation.',
    execute: (payload, { controller }) => {
        controller.RevertLast(payload.duration);
    },
});

declare global {
    interface ActionClasses {
        RESET_CAMERA: typeof ResetCameraAction;
    }
}
