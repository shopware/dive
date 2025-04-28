import { LaunchARAction } from '../launchar';
import { type ARSystemOptions } from '../../../../ar/ARSystem';
import { type ModuleImporter } from '../../../../_system/ModuleImporter';

describe('LaunchARAction', () => {
    const mockARSystem = {
        launch: jest.fn(),
    };

    const mockARSystemModule = {
        instantiate: jest.fn().mockResolvedValue(mockARSystem),
    } as unknown as ModuleImporter<'ARSystem'>;

    it('should launch AR mode with default options', async () => {
        const action = new LaunchARAction(
            {
                uri: 'https://example.com/model.glb',
            },
            {
                ARSystem: mockARSystemModule,
            },
        );

        // Execute action
        await action.execute();

        // Verify results
        expect(mockARSystemModule.instantiate).toHaveBeenCalled();
        expect(mockARSystem.launch).toHaveBeenCalledWith(
            'https://example.com/model.glb',
            undefined,
        );
    });

    it('should launch AR mode with custom options', async () => {
        const options: ARSystemOptions = {
            arPlacement: 'horizontal',
            arScale: 'auto',
        };

        const action = new LaunchARAction(
            {
                uri: 'https://example.com/model.glb',
                options,
            },
            {
                ARSystem: mockARSystemModule,
            },
        );

        // Execute action
        await action.execute();

        // Verify results
        expect(mockARSystemModule.instantiate).toHaveBeenCalled();
        expect(mockARSystem.launch).toHaveBeenCalledWith(
            'https://example.com/model.glb',
            options,
        );
    });
});
