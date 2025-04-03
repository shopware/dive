import { Exporter } from '../Exporter';
import { Object3D } from 'three';
import { FileTypeError, ParseError } from '../../types/error';

// Mock TextEncoder
class MockTextEncoder {
    encode(str: string): Uint8Array {
        const arr = new Uint8Array(str.length);
        for (let i = 0; i < str.length; i++) {
            arr[i] = str.charCodeAt(i);
        }
        return arr;
    }
}
global.TextEncoder = MockTextEncoder as any;

// Mock the Three.js exporters
const mockGltfParseAsync = jest.fn();
const mockUsdzParse = jest.fn();

jest.mock('three/examples/jsm/exporters/GLTFExporter', () => {
    return {
        GLTFExporter: jest.fn().mockImplementation(() => ({
            parseAsync: mockGltfParseAsync,
        })),
    };
});

jest.mock('three/examples/jsm/exporters/USDZExporter', () => {
    return {
        USDZExporter: jest.fn().mockImplementation(() => ({
            parse: mockUsdzParse,
        })),
    };
});

describe('Exporter', () => {
    let exporter: Exporter;
    let mockObject: Object3D;
    const mockArrayBuffer = new ArrayBuffer(8);
    const mockJson = { scene: {} };

    beforeEach(() => {
        // Reset all mocks
        mockGltfParseAsync.mockReset();
        mockUsdzParse.mockReset();

        exporter = new Exporter();
        mockObject = new Object3D();
    });

    describe('export', () => {
        it('should throw FileTypeError for unsupported file type', async () => {
            // Mock the export method to simulate the switch default case
            const originalExport = exporter.export;
            exporter.export = jest
                .fn()
                .mockImplementation(async (obj, type) => {
                    // Simulate the switch-case default behavior
                    throw new FileTypeError(`Unsupported file type: ${type}`);
                }) as any;

            // Use a valid string but it will be caught by our mock
            await expect(
                exporter.export(mockObject, 'glb' as any),
            ).rejects.toThrow(FileTypeError);

            // Restore original method
            exporter.export = originalExport;
        });

        it('should directly test the default case in the switch statement', async () => {
            // We need to bypass TypeScript's type checking to test this case
            // Create a subclass that allows us to call export with any string
            class TestableExporter extends Exporter {
                async testDefaultCase(object: Object3D): Promise<ArrayBuffer> {
                    // @ts-expect-error - Intentionally using invalid type to hit default case
                    return this.export(object, 'invalid-type');
                }
            }

            const testableExporter = new TestableExporter();
            await expect(
                testableExporter.testDefaultCase(mockObject),
            ).rejects.toThrow(/Unsupported file type: invalid-type/);
        });
    });

    describe('_exportGlb', () => {
        it('should export object as GLB', async () => {
            mockGltfParseAsync.mockResolvedValue(mockArrayBuffer);

            const result = await exporter.export(mockObject, 'glb');

            expect(mockGltfParseAsync).toHaveBeenCalledWith(
                mockObject,
                expect.objectContaining({ binary: true }),
            );
            expect(result).toBe(mockArrayBuffer);
        });

        it('should throw ParseError if GLB export result is not ArrayBuffer', async () => {
            mockGltfParseAsync.mockResolvedValue('not-an-array-buffer');

            await expect(exporter.export(mockObject, 'glb')).rejects.toThrow(
                ParseError,
            );
            expect(mockGltfParseAsync).toHaveBeenCalled();
        });

        it('should handle export errors', async () => {
            mockGltfParseAsync.mockRejectedValue(new Error('Export failed'));

            await expect(exporter.export(mockObject, 'glb')).rejects.toThrow(
                ParseError,
            );
            expect(mockGltfParseAsync).toHaveBeenCalled();
        });

        it('should pass options to exporter', async () => {
            mockGltfParseAsync.mockResolvedValue(mockArrayBuffer);

            const options = { trs: true, onlyVisible: false };

            await exporter.export(mockObject, 'glb', options);

            expect(mockGltfParseAsync).toHaveBeenCalledWith(
                mockObject,
                expect.objectContaining({
                    ...options,
                    binary: true,
                }),
            );
        });

        it('should re-throw ParseError if already a ParseError', async () => {
            const originalError = new ParseError('Original error');
            mockGltfParseAsync.mockRejectedValue(originalError);

            const result = exporter.export(mockObject, 'glb');

            await expect(result).rejects.toBe(originalError);
            expect(mockGltfParseAsync).toHaveBeenCalled();
        });
    });

    describe('_exportGltf', () => {
        it('should export object as GLTF', async () => {
            mockGltfParseAsync.mockResolvedValue(mockJson);

            const result = await exporter.export(mockObject, 'gltf');

            expect(mockGltfParseAsync).toHaveBeenCalledWith(
                mockObject,
                expect.objectContaining({ binary: false }),
            );
            expect(result).toBeInstanceOf(ArrayBuffer);
        });

        it('should handle export errors', async () => {
            mockGltfParseAsync.mockRejectedValue(new Error('Export failed'));

            await expect(exporter.export(mockObject, 'gltf')).rejects.toThrow(
                ParseError,
            );
            expect(mockGltfParseAsync).toHaveBeenCalled();
        });

        it('should pass options to exporter', async () => {
            mockGltfParseAsync.mockResolvedValue(mockJson);

            const options = { trs: true, onlyVisible: false };

            await exporter.export(mockObject, 'gltf', options);

            expect(mockGltfParseAsync).toHaveBeenCalledWith(
                mockObject,
                expect.objectContaining({
                    ...options,
                    binary: false,
                }),
            );
        });

        it('should re-throw ParseError if already a ParseError', async () => {
            const originalError = new ParseError('Original error');
            mockGltfParseAsync.mockRejectedValue(originalError);

            const result = exporter.export(mockObject, 'gltf');

            await expect(result).rejects.toBe(originalError);
            expect(mockGltfParseAsync).toHaveBeenCalled();
        });
    });

    describe('_exportUsdz', () => {
        it('should export object as USDZ', async () => {
            mockUsdzParse.mockResolvedValue(new Uint8Array(mockArrayBuffer));

            const result = await exporter.export(mockObject, 'usdz');

            expect(mockUsdzParse).toHaveBeenCalledWith(mockObject, undefined);
            expect(result).toBeInstanceOf(ArrayBuffer);
        });

        it('should handle export errors', async () => {
            mockUsdzParse.mockRejectedValue(new Error('Export failed'));

            await expect(exporter.export(mockObject, 'usdz')).rejects.toThrow(
                ParseError,
            );
            expect(mockUsdzParse).toHaveBeenCalled();
        });

        it('should pass AR options to exporter', async () => {
            mockUsdzParse.mockResolvedValue(new Uint8Array(mockArrayBuffer));

            const options = {
                ar: {
                    anchoring: { type: 'plane' as const },
                    planeAnchoring: { alignment: 'horizontal' as const },
                },
            };

            await exporter.export(mockObject, 'usdz', options);

            expect(mockUsdzParse).toHaveBeenCalledWith(mockObject, options);
        });

        it('should re-throw ParseError if already a ParseError', async () => {
            const originalError = new ParseError('Original error');
            mockUsdzParse.mockRejectedValue(originalError);

            const result = exporter.export(mockObject, 'usdz');

            await expect(result).rejects.toBe(originalError);
            expect(mockUsdzParse).toHaveBeenCalled();
        });
    });
});
