import { AssetConverter } from '../AssetConverter.ts';
import { AssetLoader } from '@shopware-ag/dive/assetloader';
import { AssetExporter } from '@shopware-ag/dive/assetexporter';
import { Object3D } from 'three/webgpu';

const mockLoaderLoad = vi.fn();
vi.mock('@shopware-ag/dive/assetloader', () => {
    return {
        AssetLoader: vi.fn().mockImplementation(() => ({
            load: mockLoaderLoad,
        })),
    };
});

// Mock the Exporter class
const mockExporterExport = vi.fn();
vi.mock('@shopware-ag/dive/assetexporter', () => {
    return {
        AssetExporter: vi.fn().mockImplementation(() => ({
            export: mockExporterExport,
        })),
    };
});

const mockLoader = new AssetLoader();
const mockExporter = new AssetExporter();

describe('AssetConverter', () => {
    const testUri = 'https://example.com/model.glb';
    const mockObject3D = new Object3D();
    const mockArrayBuffer = new ArrayBuffer(8);

    beforeEach(async () => {
        mockLoaderLoad.mockResolvedValue(mockObject3D);
        mockExporterExport.mockResolvedValue(mockArrayBuffer);
    });

    describe('constructor', () => {
        it('should initialize with the provided loader and exporter', () => {
            const converter = new AssetConverter(mockLoader, mockExporter);
            expect(converter).toBeInstanceOf(AssetConverter);
        });
    });

    describe('convert method', () => {
        it('should return an object with a to method', () => {
            const converter = new AssetConverter(mockLoader, mockExporter);
            const result = converter.convert(testUri);
            expect(result).toHaveProperty('to');
            expect(typeof result.to).toBe('function');
        });

        it('should load the model and export it to the requested format', async () => {
            const converter = new AssetConverter(mockLoader, mockExporter);
            const result = await converter.convert(testUri).to('glb');

            expect(mockLoaderLoad).toHaveBeenCalledWith(testUri);
            expect(mockExporterExport).toHaveBeenCalledWith(
                mockObject3D,
                'glb',
                undefined,
            );
            expect(result).toBe(mockArrayBuffer);
        });

        it('should pass options to the exporter', async () => {
            const options = { binary: true };
            const converter = new AssetConverter(mockLoader, mockExporter);
            await converter.convert(testUri).to('glb', options);

            expect(mockExporterExport).toHaveBeenCalledWith(
                mockObject3D,
                'glb',
                options,
            );
        });

        it('should support different file types', async () => {
            const converter = new AssetConverter(mockLoader, mockExporter);

            await converter.convert(testUri).to('gltf');
            expect(mockExporterExport).toHaveBeenCalledWith(
                mockObject3D,
                'gltf',
                undefined,
            );

            await converter.convert(testUri).to('usdz');
            expect(mockExporterExport).toHaveBeenCalledWith(
                mockObject3D,
                'usdz',
                undefined,
            );
        });

        it('should propagate loader errors', async () => {
            const error = new Error('Loader error');
            mockLoaderLoad.mockRejectedValueOnce(error);

            const converter = new AssetConverter(mockLoader, mockExporter);
            await expect(converter.convert(testUri).to('glb')).rejects.toThrow(
                'Loader error',
            );
        });

        it('should propagate exporter errors', async () => {
            const error = new Error('Exporter error');
            mockExporterExport.mockRejectedValueOnce(error);

            const converter = new AssetConverter(mockLoader, mockExporter);
            await expect(converter.convert(testUri).to('glb')).rejects.toThrow(
                'Exporter error',
            );
        });
    });
});
