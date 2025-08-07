import { StartRenderAction } from '../startrender.ts';
import { DIVE } from '@shopware-ag/dive';

describe('StartRenderAction', () => {
    it('should start the renderer', async () => {
        // Mock dependencies
        const mockEngine = {
            start: vi.fn(),
        } as unknown as DIVE;

        const action = new StartRenderAction(undefined, {
            engine: mockEngine,
        });

        // Execute action
        action.execute();

        // Verify results
        expect(mockEngine.start).toHaveBeenCalled();
    });
});
