import { SetCameraLayerAction } from '../setcameralayer';
import { DIVEOrbitController } from '../../../../controller/orbit/OrbitController';

describe('SetCameraLayerAction', () => {
    it('should set camera layer', async () => {
        // Mock dependencies
        const mockController = {
            object: {
                setCameraLayer: jest.fn(),
            },
        } as unknown as DIVEOrbitController;

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
