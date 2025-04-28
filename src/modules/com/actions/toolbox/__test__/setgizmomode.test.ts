import { SetGizmoModeAction } from '../setgizmomode';
import { DIVEToolbox } from '../../../../toolbox/Toolbox';

describe('SetGizmoModeAction', () => {
    it('should set gizmo mode', async () => {
        // Mock dependencies
        const mockToolbox = {
            SetGizmoMode: jest.fn(),
        } as unknown as DIVEToolbox;

        const action = new SetGizmoModeAction(
            { mode: 'translate' },
            {
                toolbox: mockToolbox,
            },
        );

        // Execute action
        await action.execute();

        // Verify results
        expect(mockToolbox.SetGizmoMode).toHaveBeenCalledWith('translate');
    });
});
