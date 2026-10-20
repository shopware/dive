import { Texture } from 'three/webgpu';
import { SetImageBasedLightAction } from '../setimagebasedlight.ts';
import { type EngineGateway } from '../../../EngineGateway.ts';

/** what the scene ends up holding is the gateway's business, tested there */
const makeGateway = () =>
    ({
        applySceneSettings: vi.fn().mockResolvedValue(undefined),
    }) as unknown as EngineGateway;

describe('SetImageBasedLightAction', () => {
    it.each([
        ['a full setting', { image: 'studio.hdr', rotation: 1, intensity: 2 }],
        ['a rotation only', { rotation: 1 }],
        ['a texture', { image: new Texture() }],
        ['the default image', { image: null }],
        ['off', null],
    ])('should hand on %s', async (_, imageBasedLight) => {
        const gateway = makeGateway();

        await new SetImageBasedLightAction(
            { imageBasedLight },
            { gateway },
        ).execute();

        expect(gateway.applySceneSettings).toHaveBeenCalledWith({
            imageBasedLight,
        });
    });

    it('should reject when the image does not load', async () => {
        const gateway = makeGateway();
        const error = new Error('404');
        vi.mocked(gateway.applySceneSettings).mockRejectedValue(error);

        await expect(
            new SetImageBasedLightAction(
                { imageBasedLight: { image: 'missing.hdr' } },
                { gateway },
            ).execute(),
        ).rejects.toBe(error);
    });
});
