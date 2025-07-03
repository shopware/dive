import { SetGizmoModeAction } from '../setgizmomode.ts';

const mockSetGizmoMode = vi.fn();
const mockGetToolbox = vi.fn().mockResolvedValue({
    setGizmoMode: mockSetGizmoMode,
});

describe('SetGizmoModeAction', () => {
    it('should set gizmo mode', async () => {
        const action = new SetGizmoModeAction(
            { mode: 'translate' },
            {
                getToolbox: mockGetToolbox,
            },
        );

        // Execute action
        await action.execute();

        // Verify results
        expect(mockSetGizmoMode).toHaveBeenCalledWith('translate');
    });
});
