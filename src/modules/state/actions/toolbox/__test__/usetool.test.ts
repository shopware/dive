import { UseToolAction } from '../usetool.ts';

const mockUseTool = vi.fn();
const mockGetToolbox = vi.fn().mockResolvedValue({
    UseTool: mockUseTool,
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
        expect(mockUseTool).toHaveBeenCalledWith('select');
    });
});
