import { Action } from '../action';
import { ActionDependencies } from '../types';

export const SetCameraLayerAction = Action.define<
    { layer: 'LIVE' | 'EDITOR' },
    Pick<ActionDependencies, 'controller'>,
    void
>({
    description: 'Sets the camera layer to a certain layer.',
    execute: (payload, { controller }) => {
        controller.object.setCameraLayer(payload.layer);
    },
});

declare global {
    interface ActionClasses {
        SET_CAMERA_LAYER: typeof SetCameraLayerAction;
    }
}
