import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../types/index.ts';

export const ZoomCameraAction = Action.define<
    { direction: 'IN' | 'OUT'; by: number },
    Pick<ActionDependencies, 'controller'>,
    void
>({
    description: 'Zooms the camera in or out by a certain amount.',
    execute: (payload, { controller }) => {
        if (payload.direction === 'IN') controller.zoomIn(payload.by);
        if (payload.direction === 'OUT') controller.zoomOut(payload.by);
    },
});

declare global {
    interface ActionTypes {
        ZOOM_CAMERA: typeof ZoomCameraAction;
    }
}

registerAction('ZOOM_CAMERA', ZoomCameraAction);
