import { UpdateSceneAction } from '../updatescene.ts';
import {
    type EngineGateway,
    type SceneSettings,
} from '../../../EngineGateway.ts';

/**
 * What the scene actually holds is the gateway's business and is covered in
 * its own tests. What matters here is that the action writes the patch and
 * then reports back what the scene ended up with, rather than echoing the
 * patch it was handed.
 */
const settled: SceneSettings = {
    name: 'Updated Scene',
    background: '#ff0000',
    backgroundColor: '#ff0000',
    imageBasedLight: null,
    gridEnabled: false,
    floorEnabled: false,
    floorColor: '#00ff00',
};

describe('UpdateSceneAction', () => {
    it('should apply the patch and fill the payload with the result', async () => {
        const mockGateway = {
            applySceneSettings: vi.fn().mockResolvedValue(undefined),
            readSceneSettings: vi.fn(() => settled),
        } as unknown as EngineGateway;

        const payload = {
            name: 'Updated Scene',
            backgroundColor: '#ff0000',
            gridEnabled: false,
            floorEnabled: false,
            floorColor: '#00ff00',
        };

        const action = new UpdateSceneAction(payload, {
            gateway: mockGateway,
        });

        await action.execute();

        expect(mockGateway.applySceneSettings).toHaveBeenCalledWith(payload);
        expect(payload).toEqual(settled);
    });

    it('should report the scene state even for properties it did not touch', async () => {
        const mockGateway = {
            applySceneSettings: vi.fn().mockResolvedValue(undefined),
            readSceneSettings: vi.fn(() => settled),
        } as unknown as EngineGateway;

        const payload: Partial<SceneSettings> = { name: 'Updated Scene' };

        await new UpdateSceneAction(payload, {
            gateway: mockGateway,
        }).execute();

        // gridEnabled was never in the patch and still comes back — this is
        // the property setstate used to drop
        expect(payload.gridEnabled).toBe(false);
        expect(payload.floorColor).toBe('#00ff00');
    });

    it('should read the scene back only once its images have loaded', async () => {
        let resolve!: () => void;
        const mockGateway = {
            applySceneSettings: vi.fn(
                () => new Promise<void>((r) => (resolve = r)),
            ),
            readSceneSettings: vi.fn(() => settled),
        } as unknown as EngineGateway;

        const done = new UpdateSceneAction(
            { background: { image: 'panorama.jpg' } },
            { gateway: mockGateway },
        ).execute();
        await Promise.resolve();
        expect(mockGateway.readSceneSettings).not.toHaveBeenCalled();

        resolve();
        await done;
        expect(mockGateway.readSceneSettings).toHaveBeenCalled();
    });
});
