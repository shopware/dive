import { type EngineGateway } from '../../../EngineGateway.ts';
import { StartRenderAction } from '../startrender.ts';
import { DIVE } from '@shopware-ag/dive';

describe('StartRenderAction', () => {
    it('should start the renderer', async () => {
        // Mock dependencies
        const mockGateway = {
            startRendering: vi.fn(),
        } as unknown as EngineGateway;

        const action = new StartRenderAction(undefined, {
            gateway: mockGateway,
        });

        // Execute action
        action.execute();

        // Verify results
        expect(mockGateway.startRendering).toHaveBeenCalled();
    });
});
