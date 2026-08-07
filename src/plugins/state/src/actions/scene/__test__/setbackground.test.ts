import { SetBackgroundAction } from '../setbackground.ts';
import { type EngineGateway } from '../../../EngineGateway.ts';

describe('SetBackgroundAction', () => {
    it('should set scene background', async () => {
        const mockGateway = {
            applySceneSettings: vi.fn(),
        } as unknown as EngineGateway;

        const action = new SetBackgroundAction(
            { color: '#ff0000' },
            {
                gateway: mockGateway,
            },
        );

        await action.execute();

        // there is one way into the scene properties, not a second one just
        // for the background
        expect(mockGateway.applySceneSettings).toHaveBeenCalledWith({
            backgroundColor: '#ff0000',
        });
    });
});
