import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../types/index.ts';

export const SetCameraLockedAction = Action.define<
    boolean,
    Pick<ActionDependencies, 'controller'>,
    void
>({
    description: 'Set the camera locked state.',
    execute: (payload, { controller }) => {
        controller.enabled = payload;
    },
});

declare global {
    interface ActionTypes {
        SET_CAMERA_LOCKED: typeof SetCameraLockedAction;
    }
}

registerAction<'SET_CAMERA_LOCKED'>('SET_CAMERA_LOCKED', SetCameraLockedAction);
