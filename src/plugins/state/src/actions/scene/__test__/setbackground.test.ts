import { SetBackgroundAction } from '../setbackground.ts';
import { type EngineGateway } from '../../../EngineGateway.ts';

describe('SetBackgroundAction', () => {
    it('should set scene background', async () => {
        const mockGateway = {
            setBackground: vi.fn(),
        } as unknown as EngineGateway;

        const action = new SetBackgroundAction(
            { color: '#ff0000' },
            {
                gateway: mockGateway,
            },
        );

        await action.execute();

        expect(mockGateway.setBackground).toHaveBeenCalledWith('#ff0000');
    });
});
