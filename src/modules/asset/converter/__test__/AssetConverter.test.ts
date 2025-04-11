import { AssetConverter } from '../AssetConverter';
import { AssetLoader } from '../../loader/AssetLoader';
import { AssetExporter } from '../../exporter/AssetExporter';
import { Object3D } from 'three';
import { FileType } from '../../../../types/file';

// Mock the Loader class
jest.mock('../../loader/AssetLoader', () => {
    const mockLoad = jest.fn();
    return {
        AssetLoader: jest.fn().mockImplementation(() => ({
            load: mockLoad,
        })),
    };
});

// Mock the Exporter class
jest.mock('../../exporter/AssetExporter', () => {
    const mockExport = jest.fn();
    return {
        AssetExporter: jest.fn().mockImplementation(() => ({
            export: mockExport,
        })),
    };
});

describe('AssetConverter', () => {
    let mockLoaderLoad: jest.Mock<Promise<Object3D>, [string]>;
    let mockExporterExport: jest.Mock<
        Promise<ArrayBuffer>,
        [Object3D, FileType, any?]
    >;
    let mockLoader: AssetLoader;
    let mockExporter: AssetExporter;
    const testUri = 'https://example.com/model.glb';
    const mockObject3D = new Object3D();
    const mockArrayBuffer = new ArrayBuffer(8);

    beforeEach(() => {
        // Get the mocked function and reset them before each test
        const loaderModule = require('../../loader/AssetLoader');
        const exporterModule = require('../../exporter/AssetExporter');

        mockLoader = new loaderModule.AssetLoader();
        mockExporter = new exporterModule.AssetExporter();

        mockLoaderLoad = mockLoader.load as jest.Mock<
            Promise<Object3D>,
            [string]
        >;
        mockExporterExport = mockExporter.export as jest.Mock<
            Promise<ArrayBuffer>,
            [Object3D, FileType, any?]
        >;

        // Reset mocks
        jest.clearAllMocks();

        // Setup default mock implementations
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
