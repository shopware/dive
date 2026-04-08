import { UseToolAction } from '../usetool.ts';

const mockEnableTool = vi.fn();
const mockGetToolbox = vi.fn().mockResolvedValue({
    enableTool: mockEnableTool,
});

describe('UseToolAction', () => {
    it('should use a tool', async () => {
        const action = new UseToolAction(
            { tool: 'select' },
            {
                getToolbox: mockGetToolbox,
            },
        );

        // Execute action
        await action.execute();

        // Verify results
        expect(mockEnableTool).toHaveBeenCalledWith('select');
    });
});
