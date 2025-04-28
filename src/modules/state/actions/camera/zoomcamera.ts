import { Action } from '../action';
import { ActionDependencies } from '../types';

export const ZoomCameraAction = Action.define<
    { direction: 'IN' | 'OUT'; by: number },
    Pick<ActionDependencies, 'controller'>,
    void
>({
    description: 'Zooms the camera in or out by a certain amount.',
    execute: (payload, { controller }) => {
        if (payload.direction === 'IN') controller.ZoomIn(payload.by);
        if (payload.direction === 'OUT') controller.ZoomOut(payload.by);
    },
});

declare global {
    interface ActionClasses {
        ZOOM_CAMERA: typeof ZoomCameraAction;
    }
}
