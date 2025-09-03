import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';

export const SetCameraLayerAction = Action.define<
    { layer: 'LIVE' | 'EDITOR' },
    Pick<ActionDependencies, 'controller'>,
    void
>({
    description: 'Sets the camera layer to a certain layer.',
    execute: (payload, { controller }) => {
        // will be removed in the future when DIVEOrthographicCamera will be implemented
        if ('setCameraLayer' in controller.object) {
            controller.object.setCameraLayer(payload.layer);
        }
    },
});

declare global {
    interface ActionTypes {
        SET_CAMERA_LAYER: typeof SetCameraLayerAction;
    }
}

registerAction<'SET_CAMERA_LAYER'>('SET_CAMERA_LAYER', SetCameraLayerAction);
