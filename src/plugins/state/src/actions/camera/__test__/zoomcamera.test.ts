import { ZoomCameraAction } from '../zoomcamera.ts';
import { OrbitController } from 'src/plugins/orbitcontroller/index.ts';

describe('ZoomCameraAction', () => {
    it('should zoom the camera', async () => {
        // Mock dependencies
        const mockController = {
            zoomIn: vi.fn(),
            zoomOut: vi.fn(),
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
        expect(mockController.zoomIn).toHaveBeenCalledWith(1);
    });

    it('should zoom out the camera', async () => {
        // Mock dependencies
        const mockController = {
            zoomIn: vi.fn(),
            zoomOut: vi.fn(),
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
        expect(mockController.zoomOut).toHaveBeenCalledWith(1);
    });
});
