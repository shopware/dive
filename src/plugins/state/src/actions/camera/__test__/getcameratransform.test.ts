import { Vector3 } from 'three/webgpu';
import { GetCameraTransformAction } from '../getcameratransform.ts';
import { makeCameraController } from '../../../__test__/actionDeps.ts';

describe('GetCameraTransformAction', () => {
    it('should get camera transform', () => {
        const controller = makeCameraController(
            new Vector3(1, 1, 1),
            new Vector3(0, 0, 0),
        );

        const result = new GetCameraTransformAction(undefined, {
            controller,
        }).execute();

        expect(result).toMatchObject({
            position: { x: 1, y: 1, z: 1 },
            target: { x: 0, y: 0, z: 0 },
        });
    });

    it('should read the node rather than the component', () => {
        /**
         * the camera and its component sit at the node's origin, so reading either
         * of them would report (0,0,0) no matter where the camera actually is
         */
        const controller = makeCameraController(new Vector3(4, 5, 6));

        const result = new GetCameraTransformAction(undefined, {
            controller,
        }).execute();

        expect(result.position).toMatchObject({ x: 4, y: 5, z: 6 });
    });

    it('should hand out a copy, not the live vector', () => {
        const controller = makeCameraController(new Vector3(1, 2, 3));

        const result = new GetCameraTransformAction(undefined, {
            controller,
        }).execute();
        controller.object.owner!.position.set(9, 9, 9);

        expect(result.position).toMatchObject({ x: 1, y: 2, z: 3 });
    });
});
