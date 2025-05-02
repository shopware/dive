import { LaunchARAction } from '../launchar.ts';
import { type ARSystemOptions } from '../../../../ar/ARSystem.ts';

const mockARSystem = {
    launch: vi.fn(),
};
const mockGetARSystem = vi.fn().mockResolvedValue(mockARSystem);

describe('LaunchARAction', () => {
    it('should launch AR mode with default options', async () => {
        const action = new LaunchARAction(
            {
                uri: 'https://example.com/model.glb',
            },
            {
                getARSystem: mockGetARSystem,
            },
        );

        // Execute action
        await action.execute();

        // Verify results
        expect(mockGetARSystem).toHaveBeenCalled();
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
                getARSystem: mockGetARSystem,
            },
        );

        // Execute action
        await action.execute();

        // Verify results
        expect(mockGetARSystem).toHaveBeenCalled();
        expect(mockARSystem.launch).toHaveBeenCalledWith(
            'https://example.com/model.glb',
            options,
        );
    });
});
