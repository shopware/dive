import { SetGizmoVisibilityAction } from '../setgizmovisible';
import { Toolbox } from '../../../../toolbox/Toolbox';
import { OrbitController } from '../../../../controller/orbit/OrbitController';
import { ModuleImporter } from '../../../../_system/ModuleImporter';
import { DIVEEngine } from '../../../../../engine/Engine';

const mockEngine = {
    scene: {
        getSceneObject: jest.fn(),
    },
} as unknown as DIVEEngine;

const mockController = {} as unknown as OrbitController;

const mockSetGizmoVisibility = jest.fn();
const mockToolbox = {
    instantiate: jest.fn().mockResolvedValue({
        SetGizmoVisibility: mockSetGizmoVisibility,
    }),
} as unknown as ModuleImporter<'Toolbox'>;

describe('SetGizmoVisibilityAction', () => {
    it('should set gizmo visibility', async () => {
        const action = new SetGizmoVisibilityAction(true, {
            engine: mockEngine,
            controller: mockController,
            Toolbox: mockToolbox,
        });

        // Execute action
        await action.execute();

        // Verify results
        expect(mockSetGizmoVisibility).toHaveBeenCalledWith(true);
    });
});
