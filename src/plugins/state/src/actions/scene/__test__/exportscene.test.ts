import { ExportSceneAction } from '../exportscene.ts';
import { Object3D } from 'three/webgpu';
import { type EngineGateway } from '../../../EngineGateway.ts';

const mockExport = vi.fn().mockResolvedValue('exported-scene-data');
const mockGetAssetExporter = vi.fn().mockResolvedValue({
    export: mockExport,
});

describe('ExportSceneAction', () => {
    it('should export scene', async () => {
        const root = new Object3D();
        const mockGateway = { root } as unknown as EngineGateway;

        const action = new ExportSceneAction(
            { type: 'glb' },
            {
                gateway: mockGateway,
                getAssetExporter: mockGetAssetExporter,
            },
        );

        const result = await action.execute();

        expect(mockGetAssetExporter).toHaveBeenCalled();
        expect(mockExport).toHaveBeenCalledWith(root, 'glb');
        expect(result).toBe('exported-scene-data');
    });
});
