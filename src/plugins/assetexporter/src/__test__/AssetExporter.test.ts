import { AssetExporter } from '../AssetExporter.ts';
import { Object3D, Mesh } from 'three';
import { ParseError } from '../../../../error/parse/parse-error.ts';

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
const mockGltfParseAsync = vi.fn();
const mockUsdzParseAsync = vi.fn();

vi.mock('three/examples/jsm/exporters/GLTFExporter.js', () => {
    return {
        GLTFExporter: vi.fn().mockImplementation(() => ({
            parseAsync: mockGltfParseAsync,
        })),
    };
});

vi.mock('three/examples/jsm/exporters/USDZExporter.js', () => {
    return {
        USDZExporter: vi.fn().mockImplementation(() => ({
            parseAsync: mockUsdzParseAsync,
        })),
    };
});

describe('AssetExporter', () => {
    let exporter: AssetExporter;
    let mockObject: Object3D;
    const mockArrayBuffer = new ArrayBuffer(8);
    const mockJson = { scene: {} };

    beforeEach(() => {
        // Reset all mocks
        mockGltfParseAsync.mockReset();
        mockUsdzParseAsync.mockReset();

        exporter = new AssetExporter();
        mockObject = new Object3D();
        mockObject.animations = [];
    });

    describe('export', () => {
        it('should directly test the default case in the switch statement', async () => {
            // We need to bypass TypeScript's type checking to test this case
            // Create a subclass that allows us to call export with any string
            class TestableExporter extends AssetExporter {
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

        it('should pass animations when object has animations', async () => {
            const clip = { name: 'test', duration: 1, tracks: [] };
            mockObject.animations = [clip as any];
            mockGltfParseAsync.mockResolvedValue(mockArrayBuffer);

            await exporter.export(mockObject, 'glb');

            expect(mockGltfParseAsync).toHaveBeenCalledWith(
                mockObject,
                expect.objectContaining({
                    animations: [clip],
                    binary: true,
                }),
            );
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

        it('should pass animations when object has animations', async () => {
            const clip = { name: 'test', duration: 1, tracks: [] };
            mockObject.animations = [clip as any];
            mockGltfParseAsync.mockResolvedValue(mockJson);

            await exporter.export(mockObject, 'gltf');

            expect(mockGltfParseAsync).toHaveBeenCalledWith(
                mockObject,
                expect.objectContaining({
                    animations: [clip],
                    binary: false,
                }),
            );
        });
    });

    describe('_exportUsdz', () => {
        it('should export object as USDZ', async () => {
            mockUsdzParseAsync.mockResolvedValue(
                new Uint8Array(mockArrayBuffer),
            );

            const result = await exporter.export(mockObject, 'usdz');

            expect(mockUsdzParseAsync).toHaveBeenCalledWith(
                mockObject,
                undefined,
            );
            expect(result).toBeInstanceOf(ArrayBuffer);
        });

        it('should handle export errors', async () => {
            mockUsdzParseAsync.mockRejectedValue(new Error('Export failed'));

            await expect(exporter.export(mockObject, 'usdz')).rejects.toThrow(
                ParseError,
            );
            expect(mockUsdzParseAsync).toHaveBeenCalled();
        });

        it('should pass AR options to exporter', async () => {
            mockUsdzParseAsync.mockResolvedValue(
                new Uint8Array(mockArrayBuffer),
            );

            const options = {
                ar: {
                    anchoring: { type: 'plane' as const },
                    planeAnchoring: { alignment: 'horizontal' as const },
                },
            };

            await exporter.export(mockObject, 'usdz', options);

            expect(mockUsdzParseAsync).toHaveBeenCalledWith(
                mockObject,
                options,
            );
        });

        it('should re-throw ParseError if already a ParseError', async () => {
            const originalError = new ParseError('Original error');
            mockUsdzParseAsync.mockRejectedValue(originalError);

            const result = exporter.export(mockObject, 'usdz');

            await expect(result).rejects.toBe(originalError);
            expect(mockUsdzParseAsync).toHaveBeenCalled();
        });
    });

    describe('_computeNormals', () => {
        it('should compute vertex normals for meshes without normals', async () => {
            const computeVertexNormals = vi.fn();
            const mesh = new Mesh();
            mesh.geometry.getAttribute = vi.fn().mockReturnValue(null);
            mesh.geometry.computeVertexNormals = computeVertexNormals;
            mockObject.add(mesh);

            mockGltfParseAsync.mockResolvedValue(mockArrayBuffer);
            await exporter.export(mockObject, 'glb');

            expect(computeVertexNormals).toHaveBeenCalled();
        });

        it('should skip meshes that already have normals', async () => {
            const computeVertexNormals = vi.fn();
            const mesh = new Mesh();
            mesh.geometry.getAttribute = vi.fn().mockReturnValue({ count: 3 });
            mesh.geometry.computeVertexNormals = computeVertexNormals;
            mockObject.add(mesh);

            mockGltfParseAsync.mockResolvedValue(mockArrayBuffer);
            await exporter.export(mockObject, 'glb');

            expect(computeVertexNormals).not.toHaveBeenCalled();
        });
    });
});
