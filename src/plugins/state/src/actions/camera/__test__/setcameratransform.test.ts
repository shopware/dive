import { Vector3 } from 'three/webgpu';
import { SetCameraTransformAction } from '../setcameratransform.ts';
import { makeCameraController } from '../../../__test__/actionDeps.ts';

describe('SetCameraTransformAction', () => {
    it('should place the camera through its node', () => {
        const controller = makeCameraController();

        new SetCameraTransformAction(
            {
                position: new Vector3(1, 2, 3),
                target: new Vector3(4, 5, 6),
            },
            { controller },
        ).execute();

        /**
         * the node, not the component: a component carries no transform, so a write
         * that landed there would be silently lost
         */
        expect(controller.object.owner!.position).toMatchObject({
            x: 1,
            y: 2,
            z: 3,
        });
        expect(controller.target).toMatchObject({ x: 4, y: 5, z: 6 });
    });

    it('should leave the component itself where it is', () => {
        const controller = makeCameraController();

        new SetCameraTransformAction(
            { position: new Vector3(1, 2, 3), target: new Vector3() },
            { controller },
        ).execute();

        /**
         * the camera sits at its node's origin, and the component has no
         * transform at all to be written by mistake
         */
        expect(controller.object.camera.position).toMatchObject({
            x: 0,
            y: 0,
            z: 0,
        });
    });

    it('should tell the controller that the position moved', () => {
        /**
         * without this the controller keeps deriving from the old position and the
         * next frame pulls the camera back
         */
        const controller = makeCameraController();

        new SetCameraTransformAction(
            { position: new Vector3(1, 2, 3), target: new Vector3() },
            { controller },
        ).execute();

        expect(controller.update).toHaveBeenCalled();
    });
});
