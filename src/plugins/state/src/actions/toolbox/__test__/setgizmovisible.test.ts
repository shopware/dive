import { SetGizmoVisibilityAction } from '../setgizmovisible.ts';

const mockSetGizmoVisibility = vi.fn();
const mockGetToolbox = vi.fn().mockResolvedValue({
    setGizmoVisibility: mockSetGizmoVisibility,
});

describe('SetGizmoVisibilityAction', () => {
    it('should set gizmo visibility', async () => {
        const action = new SetGizmoVisibilityAction(true, {
            getToolbox: mockGetToolbox,
        });

        // Execute action
        await action.execute();

        // Verify results
        expect(mockSetGizmoVisibility).toHaveBeenCalledWith(true);
    });
});
