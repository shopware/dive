import { ZoomCameraAction } from '../zoomcamera';
import { OrbitController } from '../../../../controller/orbit/OrbitController';

describe('ZoomCameraAction', () => {
    it('should zoom the camera', async () => {
        // Mock dependencies
        const mockController = {
            ZoomIn: jest.fn(),
            ZoomOut: jest.fn(),
        } as unknown as OrbitController;

        const action = new ZoomCameraAction(
            { direction: 'IN', by: 1 },
            {
                controller: mockController,
            },
        );

        // Execute action
        await action.execute();

        // Verify results
        expect(mockController.ZoomIn).toHaveBeenCalledWith(1);
    });

    it('should zoom out the camera', async () => {
        // Mock dependencies
        const mockController = {
            ZoomIn: jest.fn(),
            ZoomOut: jest.fn(),
        } as unknown as OrbitController;

        const action = new ZoomCameraAction(
            { direction: 'OUT', by: 1 },
            {
                controller: mockController,
            },
        );

        // Execute action
        await action.execute();

        // Verify results
        expect(mockController.ZoomOut).toHaveBeenCalledWith(1);
    });
});
