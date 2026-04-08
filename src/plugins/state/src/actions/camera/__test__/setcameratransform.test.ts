import { SetCameraTransformAction } from '../setcameratransform.ts';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { Vector3 } from 'three/webgpu';

describe('SetCameraTransformAction', () => {
    it('should set camera transform', async () => {
        // Mock dependencies
        const mockController = {
            object: {
                position: new Vector3(0, 0, 0),
            },
            target: new Vector3(1, 1, 1),
            update: vi.fn(),
        } as unknown as OrbitController;

        const action = new SetCameraTransformAction(
            {
                position: new Vector3(1, 1, 1),
                target: new Vector3(0, 0, 0),
            },
            {
                controller: mockController,
            },
        );

        // Execute action
        action.execute();

        // Verify results
        expect(mockController.object.position).toMatchObject({
            x: 1,
            y: 1,
            z: 1,
        });
        expect(mockController.target).toMatchObject({
            x: 0,
            y: 0,
            z: 0,
        });
    });
});
