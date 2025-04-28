import { StartRenderAction } from '../startrender';
import { DIVEEngine } from '../../../../../engine';

describe('StartRenderAction', () => {
    it('should start the renderer', async () => {
        // Mock dependencies
        const mockEngine = {
            start: jest.fn(),
        } as unknown as DIVEEngine;

        const action = new StartRenderAction(undefined, {
            engine: mockEngine,
        });

        // Execute action
        action.execute();

        // Verify results
        expect(mockEngine.start).toHaveBeenCalled();
    });
});
