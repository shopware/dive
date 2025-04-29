import { SetGizmoScaleLinkedAction } from '../setgizmoscalelinked';
import { Toolbox } from '../../../../toolbox/Toolbox';
import { ModuleImporter } from '../../../../_system/ModuleImporter';
import { DIVEEngine } from '../../../../../engine/Engine';
import { OrbitController } from '../../../../controller/orbit/OrbitController';

const mockEngine = {
    scene: {
        getSceneObject: jest.fn(),
    },
} as unknown as DIVEEngine;

const mockController = {} as unknown as OrbitController;

const mockSetGizmoScaleLinked = jest.fn();
const mockToolbox = {
    instantiate: jest.fn().mockResolvedValue({
        SetGizmoScaleLinked: mockSetGizmoScaleLinked,
    }),
} as unknown as ModuleImporter<'Toolbox'>;

describe('SetGizmoScaleLinkedAction', () => {
    it('should set gizmo scale linking', async () => {
        const action = new SetGizmoScaleLinkedAction(true, {
            engine: mockEngine,
            controller: mockController,
            Toolbox: mockToolbox,
        });

        // Execute action
        await action.execute();

        // Verify results
        expect(mockSetGizmoScaleLinked).toHaveBeenCalledWith(true);
    });
});
