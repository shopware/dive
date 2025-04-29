import { SetGizmoScaleLinkedAction } from '../setgizmoscalelinked';
import { DIVEToolbox } from '../../../../toolbox/Toolbox';

describe('SetGizmoScaleLinkedAction', () => {
    it('should set gizmo scale linking', async () => {
        // Mock dependencies
        const mockToolbox = {
            SetGizmoScaleLinked: jest.fn(),
        } as unknown as DIVEToolbox;

        const action = new SetGizmoScaleLinkedAction(true, {
            toolbox: mockToolbox,
        });

        // Execute action
        await action.execute();

        // Verify results
        expect(mockToolbox.SetGizmoScaleLinked).toHaveBeenCalledWith(true);
    });
});
