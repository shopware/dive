import { ExportSceneAction } from '../exportscene.ts';
import { DIVEEngine } from '../../../../../engine/Engine.ts';

const mockExport = vi.fn().mockResolvedValue('exported-scene-data');
const mockGetAssetExporter = vi.fn().mockResolvedValue({
    export: mockExport,
});

const mockEngine = {
    scene: {
        root: {},
    },
} as unknown as DIVEEngine;

describe('ExportSceneAction', () => {
    it('should export scene', async () => {
        const mockEngine = {
            scene: {
                root: {},
            },
        } as unknown as DIVEEngine;

        const action = new ExportSceneAction(
            { type: 'glb' },
            {
                engine: mockEngine,
                getAssetExporter: mockGetAssetExporter,
            },
        );

        // Execute action
        const result = await action.execute();

        // Verify results
        expect(mockGetAssetExporter).toHaveBeenCalled();
        expect(mockExport).toHaveBeenCalledWith(mockEngine.scene.root, 'glb');
        expect(result).toBe('exported-scene-data');
    });
});
