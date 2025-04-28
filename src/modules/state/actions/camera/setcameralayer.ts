import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { ActionDependencies } from '../../types/index.ts';

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
    interface ActionTypes {
        SET_CAMERA_LAYER: typeof SetCameraLayerAction;
    }
}

registerAction('SET_CAMERA_LAYER', SetCameraLayerAction);
