import { ResetCameraAction } from '../resetcamera';
import { OrbitController } from '../../../../controller/orbit/OrbitController';

describe('ResetCameraAction', () => {
    it('should reset the camera', async () => {
        // Mock dependencies
        const mockController = {
            RevertLast: jest.fn(),
        } as unknown as OrbitController;

        const action = new ResetCameraAction(
            { duration: 1000 },
            {
                controller: mockController,
            },
        );

        // Execute action
        await action.execute();

        // Verify results
        expect(mockController.RevertLast).toHaveBeenCalledWith(1000);
    });
});
