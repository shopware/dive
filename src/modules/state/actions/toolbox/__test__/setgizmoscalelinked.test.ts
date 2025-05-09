import { SetGizmoScaleLinkedAction } from '../setgizmoscalelinked.ts';

const mockSetGizmoScaleLinked = vi.fn();
const mockGetToolbox = vi.fn().mockResolvedValue({
    setGizmoScaleLinked: mockSetGizmoScaleLinked,
});

describe('SetGizmoScaleLinkedAction', () => {
    it('should set gizmo scale linking', async () => {
        const action = new SetGizmoScaleLinkedAction(true, {
            getToolbox: mockGetToolbox,
        });

        // Execute action
        await action.execute();

        // Verify results
        expect(mockSetGizmoScaleLinked).toHaveBeenCalledWith(true);
    });
});
