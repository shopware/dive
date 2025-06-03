import { SetCameraLayerAction } from '../setcameralayer.ts';
import { OrbitController } from 'src/plugins/orbitcontroller/index.ts';

describe('SetCameraLayerAction', () => {
    it('should set camera layer', async () => {
        // Mock dependencies
        const mockController = {
            object: {
                setCameraLayer: vi.fn(),
            },
        } as unknown as OrbitController;

        const action = new SetCameraLayerAction(
            { layer: 'LIVE' },
            {
                controller: mockController,
            },
        );

        // Execute action
        action.execute();

        // Verify results
        expect(mockController.object.setCameraLayer).toHaveBeenCalledWith(
            'LIVE',
        );
    });
});
