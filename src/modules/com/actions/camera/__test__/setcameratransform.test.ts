import { SetCameraTransformAction } from '../setcameratransform';
import { DIVEOrbitController } from '../../../../controller/orbit/OrbitController';
import { Vector3 } from 'three';

describe('SetCameraTransformAction', () => {
    it('should set camera transform', async () => {
        // Mock dependencies
        const mockController = {
            object: {
                position: new Vector3(0, 0, 0),
            },
            target: new Vector3(1, 1, 1),
            update: jest.fn(),
        } as unknown as DIVEOrbitController;

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
