import { SetGizmoVisibleAction } from '../setgizmovisible.ts';

const mockSetGizmoVisible = vi.fn();
const mockGetToolbox = vi.fn().mockResolvedValue({
    getTool: vi.fn().mockReturnValue({
        setGizmoVisible: mockSetGizmoVisible,
    }),
});

describe('SetGizmoVisibleAction', () => {
    it('should set gizmo visibility', async () => {
        const action = new SetGizmoVisibleAction(true, {
            getToolbox: mockGetToolbox,
        });

        // Execute action
        await action.execute();

        // Verify results
        expect(mockSetGizmoVisible).toHaveBeenCalledWith(true);
    });
});
