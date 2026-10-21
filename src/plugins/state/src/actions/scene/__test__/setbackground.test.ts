import { SetBackgroundAction } from '../setbackground.ts';
import { type EngineGateway } from '../../../EngineGateway.ts';

/**
 * What the scene ends up holding is the gateway's business, tested there.
 * Here it only matters what is handed on, through the one way into the scene
 * properties rather than a second one just for the background.
 */
const makeGateway = () =>
    ({
        applySceneSettings: vi.fn().mockResolvedValue(undefined),
    }) as unknown as EngineGateway;

describe('SetBackgroundAction', () => {
    it.each([
        ['a colour', '#ff0000'],
        ['an image', { image: 'panorama.jpg', rotation: 1 }],
        ['transparent', null],
    ])('should hand on %s', async (_, background) => {
        const gateway = makeGateway();

        await new SetBackgroundAction({ background }, { gateway }).execute();

        expect(gateway.applySceneSettings).toHaveBeenCalledWith({
            background,
        });
    });

    it('should still take the deprecated colour payload', async () => {
        const gateway = makeGateway();

        await new SetBackgroundAction(
            { color: '#ff0000' },
            { gateway },
        ).execute();

        expect(gateway.applySceneSettings).toHaveBeenCalledWith({
            backgroundColor: '#ff0000',
        });
    });

    it('should resolve once the scene has the background', async () => {
        const gateway = makeGateway();
        let resolve!: () => void;
        vi.mocked(gateway.applySceneSettings).mockReturnValue(
            new Promise<void>((r) => (resolve = r)),
        );
        const settled = vi.fn();

        const done = new SetBackgroundAction(
            { background: { image: 'panorama.jpg' } },
            { gateway },
        )
            .execute()
            .then(settled);
        await Promise.resolve();
        expect(settled).not.toHaveBeenCalled();

        resolve();
        await done;
        expect(settled).toHaveBeenCalled();
    });
});
