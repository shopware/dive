import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../types/index.ts';
import { type Vector3Like } from 'three';

export const GetCameraTransformAction = Action.define<
    void,
    Pick<ActionDependencies, 'controller'>,
    {
        position: Vector3Like;
        target: Vector3Like;
    }
>({
    description: 'Gets the current camera position and target.',
    execute: (_payload, { controller }) => {
        return {
            position: controller.object.position.clone(),
            target: controller.target.clone(),
        };
    },
});

declare global {
    interface ActionTypes {
        GET_CAMERA_TRANSFORM: typeof GetCameraTransformAction;
    }
}

registerAction('GET_CAMERA_TRANSFORM', GetCameraTransformAction);
