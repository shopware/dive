import { Converter } from '../Converter';
import { Loader } from '../../loader/Loader';
import { Exporter } from '../../exporter/Exporter';
import { Object3D } from 'three';

// Mock the Loader class
jest.mock('../../loader/Loader', () => {
    const mockLoad = jest.fn();
    return {
        Loader: jest.fn().mockImplementation(() => ({
            load: mockLoad,
        })),
    };
});

// Mock the Exporter class
jest.mock('../../exporter/Exporter', () => {
    const mockExport = jest.fn();
    return {
        Exporter: jest.fn().mockImplementation(() => ({
            export: mockExport,
        })),
    };
});

describe('Converter', () => {
    let mockLoaderLoad: jest.Mock;
    let mockExporterExport: jest.Mock;
    const testUri = 'https://example.com/model.glb';
    const mockObject3D = new Object3D();
    const mockArrayBuffer = new ArrayBuffer(8);

    beforeEach(() => {
        // Get the mocked function and reset them before each test
        mockLoaderLoad = require('../../loader/Loader').Loader().load;
        mockExporterExport = require('../../exporter/Exporter').Exporter()
            .export;

        // Reset mocks
        jest.clearAllMocks();

        // Setup default mock implementations
        mockLoaderLoad.mockResolvedValue(mockObject3D);
        mockExporterExport.mockResolvedValue(mockArrayBuffer);
    });

    describe('constructor', () => {
        it('should initialize with the provided URI', () => {
            const converter = new Converter(testUri);
            expect(require('../../loader/Loader').Loader).toHaveBeenCalled();
            expect(
                require('../../exporter/Exporter').Exporter,
            ).toHaveBeenCalled();
        });
    });

    describe('convert static method', () => {
        it('should return a new converter instance', () => {
            const converter = Converter.convert(testUri);
            expect(converter).toBeInstanceOf(Converter);
        });
    });

    describe('to method', () => {
        it('should load the model and export it to the requested format', async () => {
            const converter = new Converter(testUri);
            const result = await converter.to('glb');

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
            const converter = new Converter(testUri);
            await converter.to('glb', options);

            expect(mockExporterExport).toHaveBeenCalledWith(
                mockObject3D,
                'glb',
                options,
            );
        });

        it('should support different file types', async () => {
            const converter = new Converter(testUri);

            await converter.to('gltf');
            expect(mockExporterExport).toHaveBeenCalledWith(
                mockObject3D,
                'gltf',
                undefined,
            );

            await converter.to('usdz');
            expect(mockExporterExport).toHaveBeenCalledWith(
                mockObject3D,
                'usdz',
                undefined,
            );
        });

        it('should propagate loader errors', async () => {
            const error = new Error('Loader error');
            mockLoaderLoad.mockRejectedValueOnce(error);

            const converter = new Converter(testUri);
            await expect(converter.to('glb')).rejects.toThrow('Loader error');
        });

        it('should propagate exporter errors', async () => {
            const error = new Error('Exporter error');
            mockExporterExport.mockRejectedValueOnce(error);

            const converter = new Converter(testUri);
            await expect(converter.to('glb')).rejects.toThrow('Exporter error');
        });
    });
});
