import { SetBackgroundAction } from '../setbackground';
import { DIVEEngine } from '../../../../../engine';
import { DIVEScene } from '../../../../../engine/scene/Scene';

describe('SetBackgroundAction', () => {
    it('should set scene background', async () => {
        // Mock dependencies
        const mockScene = {
            setBackground: vi.fn(),
        } as unknown as DIVEScene;

        const mockEngine = {
            scene: mockScene,
        } as unknown as DIVEEngine;

        const action = new SetBackgroundAction(
            { color: '#ff0000' },
            {
                engine: mockEngine,
            },
        );

        // Execute action
        await action.execute();

        // Verify results
        expect(mockScene.setBackground).toHaveBeenCalledWith('#ff0000');
    });
});
