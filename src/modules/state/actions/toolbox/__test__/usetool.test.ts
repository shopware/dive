import { UseToolAction } from '../usetool';
import { DIVEEngine } from '../../../../../engine/Engine';
import { OrbitController } from '../../../../controller/orbit/OrbitController';
import { ModuleImporter } from '../../../../_system/ModuleImporter';

const mockEngine = {
    scene: {
        getSceneObject: jest.fn(),
    },
} as unknown as DIVEEngine;

const mockController = {} as unknown as OrbitController;

const mockUseTool = jest.fn();
const mockToolbox = {
    instantiate: jest.fn().mockResolvedValue({
        UseTool: mockUseTool,
    }),
} as unknown as ModuleImporter<'Toolbox'>;

describe('UseToolAction', () => {
    it('should use a tool', async () => {
        const action = new UseToolAction(
            { tool: 'select' },
            {
                engine: mockEngine,
                controller: mockController,
                Toolbox: mockToolbox,
            },
        );

        // Execute action
        await action.execute();

        // Verify results
        expect(mockUseTool).toHaveBeenCalledWith('select');
    });
});
