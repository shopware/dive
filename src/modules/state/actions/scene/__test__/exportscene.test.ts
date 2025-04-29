import { ExportSceneAction } from '../exportscene';
import { DIVEEngine } from '../../../../../engine';
import { DIVEScene } from '../../../../../engine/scene/Scene';
import { ModuleImporter } from '../../../../_system/ModuleImporter';
import { AssetExporter } from '../../../../asset/exporter/AssetExporter';

describe('ExportSceneAction', () => {
    it('should export scene', async () => {
        // Mock dependencies
        const mockAssetExporter = {
            export: jest.fn().mockResolvedValue('exported-scene-data'),
        } as unknown as AssetExporter;

        const mockEngine = {
            scene: {
                Root: {},
            },
        } as unknown as DIVEEngine;

        const mockAssetExporterModule = {
            instantiate: jest.fn().mockResolvedValue(mockAssetExporter),
        } as unknown as ModuleImporter<'AssetExporter'>;

        const action = new ExportSceneAction(
            { type: 'glb' },
            {
                engine: mockEngine,
                AssetExporter: mockAssetExporterModule,
            },
        );

        // Execute action
        const result = await action.execute();

        // Verify results
        expect(mockAssetExporterModule.instantiate).toHaveBeenCalled();
        expect(mockAssetExporter.export).toHaveBeenCalled();
        expect(result).toBe('exported-scene-data');
    });
});
