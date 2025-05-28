import { GetCameraTransformAction } from '../getcameratransform.ts';
import { type OrbitController } from '../../../../controller/orbit/OrbitController.js';
import { Vector3 } from 'three';

describe('GetCameraTransformAction', () => {
    it('should get camera transform', async () => {
        // Mock dependencies
        const mockController = {
            object: {
                position: new Vector3(1, 1, 1),
            },
            target: new Vector3(0, 0, 0),
        } as unknown as OrbitController;

        const action = new GetCameraTransformAction(undefined, {
            controller: mockController,
        });

        // Execute action
        const result = action.execute();

        // Verify results
        expect(result).toMatchObject({
            position: { x: 1, y: 1, z: 1 },
            target: { x: 0, y: 0, z: 0 },
        });
    });
});
