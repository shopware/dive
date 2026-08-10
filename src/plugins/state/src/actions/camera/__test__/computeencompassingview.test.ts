import { type EngineGateway } from '../../../EngineGateway.ts';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { ComputeEncompassingViewAction } from '../computeencompassingview.ts';

vi.mock('../../../../../../components/boundingbox/BoundingBox.ts', () => ({
    BoundingBox: vi.fn(),
}));
import { Vector3 } from 'three/webgpu';

describe('modules/state/actions/camera/computeEncompassingView', () => {
    it('should compute encompassing view for a scene', async () => {
        // Mock dependencies
        const root = {
            computeSceneBB: vi.fn().mockReturnValue({
                min: new Vector3(0, 0, 0),
                max: new Vector3(10, 10, 10),
            }),
            add: vi.fn(),
        };

        const mockController = {
            computeEncompassingView: vi.fn().mockReturnValue({
                position: new Vector3(5, 5, 5),
                target: new Vector3(5, 5, 0),
            }),
        } as unknown as OrbitController;

        const mockGateway = { root } as unknown as EngineGateway;

        const action = new ComputeEncompassingViewAction(undefined, {
            gateway: mockGateway,
            controller: mockController,
        });

        // Execute action
        const result = await action.execute();

        // Verify results
        expect(mockController.computeEncompassingView).toHaveBeenCalled();
        expect(result).toEqual(
            expect.objectContaining({
                position: expect.objectContaining({ x: 5, y: 5, z: 5 }),
                target: expect.objectContaining({ x: 5, y: 5, z: 0 }),
            }),
        );
    });
});
