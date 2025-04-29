import { UseToolAction } from '../usetool';
import { DIVEToolbox } from '../../../../toolbox/Toolbox';

describe('UseToolAction', () => {
    it('should use a tool', async () => {
        // Mock dependencies
        const mockToolbox = {
            UseTool: jest.fn(),
        } as unknown as DIVEToolbox;

        const action = new UseToolAction(
            { tool: 'select' },
            {
                toolbox: mockToolbox,
            },
        );

        // Execute action
        await action.execute();

        // Verify results
        expect(mockToolbox.UseTool).toHaveBeenCalledWith('select');
    });
});
