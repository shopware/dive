import { SetGizmoModeAction } from '../setgizmomode';
import { ModuleImporter } from '../../../../index.ts';
import { DIVEEngine } from '../../../../../engine/Engine.ts';
import { OrbitController } from '../../../../controller/orbit/OrbitController.ts';

const mockEngine = {
    scene: {
        getSceneObject: jest.fn(),
    },
} as unknown as DIVEEngine;

const mockController = {} as unknown as OrbitController;

const mockSetGizmoMode = jest.fn();
const mockToolbox = {
    instantiate: jest.fn().mockResolvedValue({
        SetGizmoMode: mockSetGizmoMode,
    }),
} as unknown as ModuleImporter<'Toolbox'>;

describe('SetGizmoModeAction', () => {
    it('should set gizmo mode', async () => {
        const action = new SetGizmoModeAction(
            { mode: 'translate' },
            {
                engine: mockEngine,
                controller: mockController,
                Toolbox: mockToolbox,
            },
        );

        // Execute action
        await action.execute();

        // Verify results
        expect(mockSetGizmoMode).toHaveBeenCalledWith('translate');
    });
});
