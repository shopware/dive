import { SetGizmoVisibilityAction } from '../setgizmovisible';
import { DIVEToolbox } from '../../../../toolbox/Toolbox';

describe('SetGizmoVisibilityAction', () => {
    it('should set gizmo visibility', async () => {
        // Mock dependencies
        const mockToolbox = {
            SetGizmoVisibility: jest.fn(),
        } as unknown as DIVEToolbox;

        const action = new SetGizmoVisibilityAction(true, {
            toolbox: mockToolbox,
        });

        // Execute action
        await action.execute();

        // Verify results
        expect(mockToolbox.SetGizmoVisibility).toHaveBeenCalledWith(true);
    });
});
