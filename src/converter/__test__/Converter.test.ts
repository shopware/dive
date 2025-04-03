import {
    Converter,
    FileTypeError,
    NetworkError,
    ConversionError,
} from '../Converter';
import { SUPPORTED_FILE_TYPES } from '../../types/file/FileTypes';
import { Loader } from '../../loader/Loader';
import {
    Exporter,
    type FileTypeToExporterOptions,
} from '../../exporter/Exporter';
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
        FileTypeToExporterOptions: {},
    };
});

describe('Converter', () => {
    describe('file type handling', () => {
        it('should correctly identify supported file types', () => {
            const uris = [
                'https://example.com/model.glb',
                'https://example.com/model.gltf',
                'https://example.com/model.usdz',
            ];

            uris.forEach((uri) => {
                const converter = Converter.convert(uri);
                // This should not throw an error
                expect(() => converter['_getFileTypeFromUri']()).not.toThrow();
            });
        });

        it('should throw FileTypeError for unsupported file types', () => {
            const uris = [
                'https://example.com/model.obj',
                'https://example.com/model.fbx',
                'https://example.com/model.txt',
            ];

            uris.forEach((uri) => {
                const converter = Converter.convert(uri);
                expect(() => converter['_getFileTypeFromUri']()).toThrow(
                    `Unsupported file type: ${uri.split('.').pop()}. Supported types: ${SUPPORTED_FILE_TYPES.join(', ')}`,
                );
            });
        });

        it('should handle file names with multiple dots', () => {
            const uris = [
                'https://example.com/model.v1.glb',
                'https://example.com/model.v2.gltf',
                'https://example.com/model.v3.usdz',
            ];

            uris.forEach((uri) => {
                const converter = Converter.convert(uri);
                // This should not throw an error
                expect(() => converter['_getFileTypeFromUri']()).not.toThrow();
            });
        });

        it('should handle case-insensitive file extensions', () => {
            const uris = [
                'https://example.com/model.GLB',
                'https://example.com/model.GLTF',
                'https://example.com/model.USDZ',
            ];

            uris.forEach((uri) => {
                const converter = Converter.convert(uri);
                // This should not throw an error
                expect(() => converter['_getFileTypeFromUri']()).not.toThrow();
            });
        });

        it('should throw FileTypeError for file without any extension', () => {
            const converter = Converter.convert('https://example.com/model');
            expect(() => converter['_getFileTypeFromUri']()).toThrow(
                FileTypeError,
            );
        });

        it('should throw FileTypeError for file with trailing slash', () => {
            const converter = Converter.convert('https://example.com/model/');
            expect(() => converter['_getFileTypeFromUri']()).toThrow(
                FileTypeError,
            );
        });

        it('should throw FileTypeError for file ending with a dot', () => {
            const converter = Converter.convert('https://example.com/model.');
            expect(() => converter['_getFileTypeFromUri']()).toThrow(
                FileTypeError,
            );
        });

        it('should throw FileTypeError for file ending with a dot and slash', () => {
            const converter = Converter.convert('https://example.com/model./');
            expect(() => converter['_getFileTypeFromUri']()).toThrow(
                FileTypeError,
            );
        });

        it('should throw FileTypeError for file ending with multiple dots', () => {
            const converter = Converter.convert('https://example.com/model..');
            expect(() => converter['_getFileTypeFromUri']()).toThrow(
                FileTypeError,
            );
        });

        it('should throw FileTypeError for file ending with multiple dots and slash', () => {
            const converter = Converter.convert('https://example.com/model../');
            expect(() => converter['_getFileTypeFromUri']()).toThrow(
                FileTypeError,
            );
        });

        it('should throw FileTypeError for files with unsupported extensions', () => {
            const uris = [
                'https://example.com/model.obj',
                'https://example.com/model.obj/',
                'https://example.com/model.fbx',
                'https://example.com/model.fbx/',
                'https://example.com/model.txt',
                'https://example.com/model.txt/',
            ];

            uris.forEach((uri) => {
                const converter = Converter.convert(uri);
                expect(() => converter['_getFileTypeFromUri']()).toThrow(
                    FileTypeError,
                );
            });
        });

        it('should throw FileTypeError for empty URI', () => {
            const converter = Converter.convert('');
            expect(() => converter['_getFileTypeFromUri']()).toThrow(
                FileTypeError,
            );
        });

        it('should throw FileTypeError for URI with only slashes', () => {
            const converter = Converter.convert('///');
            expect(() => converter['_getFileTypeFromUri']()).toThrow(
                FileTypeError,
            );
        });
    });

    describe('conversion', () => {
        let mockLoader: jest.Mocked<Loader>;
        let mockExporter: jest.Mocked<Exporter>;

        beforeEach(() => {
            jest.clearAllMocks();
            mockLoader = new Loader() as jest.Mocked<Loader>;
            mockExporter = new Exporter() as jest.Mocked<Exporter>;
        });

        it('should return file content directly when source and target types match', async () => {
            const mockBuffer = new ArrayBuffer(100);
            const mockResponse = {
                ok: true,
                arrayBuffer: () => Promise.resolve(mockBuffer),
            };
            global.fetch = jest.fn().mockResolvedValue(mockResponse);

            const converter = Converter.convert(
                'https://example.com/model.glb',
            );
            const result = await converter.to('glb');

            expect(result).toEqual(mockBuffer);
            expect(mockLoader.load).not.toHaveBeenCalled();
            expect(mockExporter.export).not.toHaveBeenCalled();
        });

        it('should convert through Object3D when source and target types differ', async () => {
            const mockObject3D = new Object3D();
            const mockBuffer = new ArrayBuffer(100);

            mockLoader.load.mockResolvedValue(mockObject3D);
            mockExporter.export.mockResolvedValue(mockBuffer);

            const converter = Converter.convert(
                'https://example.com/model.glb',
            );
            const result = await converter.to('usdz');

            expect(result).toEqual(mockBuffer);
            expect(mockLoader.load).toHaveBeenCalledWith(
                'https://example.com/model.glb',
            );
            expect(mockExporter.export).toHaveBeenCalledWith(
                mockObject3D,
                'usdz',
                undefined,
            );
        });

        it('should pass export options to exporter', async () => {
            const mockObject3D = new Object3D();
            const mockBuffer = new ArrayBuffer(100);
            const mockOptions: FileTypeToExporterOptions['usdz'] = {
                quickLookCompatible: true,
                ar: {
                    anchoring: { type: 'plane' },
                    planeAnchoring: { alignment: 'horizontal' },
                },
            };

            mockLoader.load.mockResolvedValue(mockObject3D);
            mockExporter.export.mockResolvedValue(mockBuffer);

            const converter = Converter.convert(
                'https://example.com/model.glb',
            );
            const result = await converter.to('usdz', mockOptions);

            expect(result).toEqual(mockBuffer);
            expect(mockLoader.load).toHaveBeenCalledWith(
                'https://example.com/model.glb',
            );
            expect(mockExporter.export).toHaveBeenCalledWith(
                mockObject3D,
                'usdz',
                mockOptions,
            );
        });

        it('should handle network errors when loading file', async () => {
            const mockResponse = { ok: false, status: 404 };
            global.fetch = jest.fn().mockResolvedValue(mockResponse);

            const converter = Converter.convert(
                'https://example.com/model.glb',
            );
            await expect(converter.to('glb')).rejects.toThrow(
                'Failed to fetch file from https://example.com/model.glb',
            );
        });

        it('should handle loader errors', async () => {
            const mockError = new Error('Loader error');
            mockLoader.load.mockRejectedValue(mockError);

            const converter = Converter.convert(
                'https://example.com/model.glb',
            );
            await expect(converter.to('usdz')).rejects.toThrow(
                'Failed to convert file',
            );
        });

        it('should handle exporter errors', async () => {
            const mockObject3D = new Object3D();
            const mockError = new Error('Exporter error');

            mockLoader.load.mockResolvedValue(mockObject3D);
            mockExporter.export.mockRejectedValue(mockError);

            const converter = Converter.convert(
                'https://example.com/model.glb',
            );
            await expect(converter.to('usdz')).rejects.toThrow(
                'Failed to convert file',
            );
        });

        it('should rethrow NetworkError when it occurs', async () => {
            const mockError = new NetworkError(
                'https://example.com/model.glb',
                'Network error',
            );
            const mockResponse = {
                ok: true,
                arrayBuffer: () => Promise.reject(mockError),
            };
            global.fetch = jest.fn().mockResolvedValue(mockResponse);

            const converter = Converter.convert(
                'https://example.com/model.glb',
            );
            await expect(converter.to('glb')).rejects.toThrow(mockError);
        });

        it('should wrap any error in NetworkError', async () => {
            const mockError = new Error('any error');
            const mockResponse = {
                ok: true,
                arrayBuffer: () => Promise.reject(mockError),
            };
            global.fetch = jest.fn().mockResolvedValue(mockResponse);

            const converter = Converter.convert(
                'https://example.com/model.glb',
            );
            const error = await converter.to('glb').catch((e) => e);
            expect(error).toBeInstanceOf(NetworkError);
            expect(error.message).toBe(
                'Failed to fetch file from https://example.com/model.glb',
            );
            expect(error.cause).toBe(mockError);
        });

        it('should propagate ConversionError from conversion path', async () => {
            const mockObject3D = new Object3D();
            const mockError = new ConversionError('Conversion failed');
            mockLoader.load.mockResolvedValue(mockObject3D);
            mockExporter.export.mockRejectedValue(mockError);

            const converter = Converter.convert(
                'https://example.com/model.glb',
            );
            const error = await converter.to('usdz').catch((e) => e);
            expect(error).toBe(mockError);
            expect(error.message).toBe('Conversion failed');
        });
    });
});
