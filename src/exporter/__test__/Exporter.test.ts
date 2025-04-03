import { Exporter } from '../Exporter';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { USDZExporter } from 'three/examples/jsm/exporters/USDZExporter';
import { Object3D } from 'three';
import { FileType } from '../../types/file/FileTypes';

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
jest.mock('three/examples/jsm/exporters/GLTFExporter', () => {
    const mockParseAsync = jest.fn();
    return {
        GLTFExporter: jest.fn().mockImplementation(() => ({
            parseAsync: mockParseAsync,
        })),
    };
});

jest.mock('three/examples/jsm/exporters/USDZExporter', () => {
    const mockParse = jest.fn();
    return {
        USDZExporter: jest.fn().mockImplementation(() => ({
            parse: mockParse,
        })),
    };
});

describe('Exporter', () => {
    let exporter: Exporter;
    let mockGLTFExporter: jest.Mocked<GLTFExporter>;
    let mockUSDZExporter: jest.Mocked<USDZExporter>;
    let mockObject3D: Object3D;

    beforeEach(() => {
        jest.clearAllMocks();
        exporter = new Exporter();
        mockGLTFExporter = new GLTFExporter() as jest.Mocked<GLTFExporter>;
        mockUSDZExporter = new USDZExporter() as jest.Mocked<USDZExporter>;
        mockObject3D = new Object3D();
    });

    describe('export functionality', () => {
        it('should export to GLB format', async () => {
            const mockBuffer = new ArrayBuffer(100);
            mockGLTFExporter.parseAsync.mockResolvedValue(mockBuffer);

            const result = await exporter.export(mockObject3D, 'glb');

            expect(result).toBe(mockBuffer);
            expect(mockGLTFExporter.parseAsync).toHaveBeenCalledWith(
                mockObject3D,
                expect.any(Object),
            );
            expect(mockUSDZExporter.parse).not.toHaveBeenCalled();
        });

        it('should export to GLTF format', async () => {
            const mockBuffer = new ArrayBuffer(100);
            mockGLTFExporter.parseAsync.mockResolvedValue(mockBuffer);

            const result = await exporter.export(mockObject3D, 'gltf');

            expect(result).toEqual(mockBuffer);
            expect(mockGLTFExporter.parseAsync).toHaveBeenCalledWith(
                mockObject3D,
                { binary: false },
            );
            expect(mockUSDZExporter.parse).not.toHaveBeenCalled();
        });

        it('should export to USDZ format', async () => {
            const mockBuffer = new Uint8Array(100);
            mockUSDZExporter.parse.mockResolvedValue(mockBuffer);

            const result = await exporter.export(mockObject3D, 'usdz', {});

            expect(result).toBe(mockBuffer.buffer);
            expect(mockUSDZExporter.parse).toHaveBeenCalledWith(
                mockObject3D,
                {},
            );
            expect(mockGLTFExporter.parseAsync).not.toHaveBeenCalled();
        });
    });

    describe('options handling', () => {
        it('should pass GLTF options correctly', async () => {
            const mockBuffer = new ArrayBuffer(100);
            const options = {
                onlyVisible: true,
                maxTextureSize: 2048,
                includeCustomExtensions: true,
            };

            mockGLTFExporter.parseAsync.mockResolvedValue(mockBuffer);

            await exporter.export(mockObject3D, 'gltf', options);

            expect(mockGLTFExporter.parseAsync).toHaveBeenCalledWith(
                mockObject3D,
                { ...options, binary: false },
            );
        });

        it('should pass USDZ options correctly', async () => {
            const mockBuffer = new Uint8Array(100);
            const options = {
                ar: {
                    anchoring: { type: 'plane' as const },
                    planeAnchoring: { alignment: 'horizontal' as const },
                },
            };

            mockUSDZExporter.parse.mockResolvedValue(mockBuffer);

            await exporter.export(mockObject3D, 'usdz', options);

            expect(mockUSDZExporter.parse).toHaveBeenCalledWith(
                mockObject3D,
                options,
            );
        });
    });

    describe('error handling', () => {
        it('should handle GLTFExporter errors', async () => {
            const mockError = new Error('GLTF export failed');
            mockGLTFExporter.parseAsync.mockRejectedValue(mockError);

            await expect(exporter.export(mockObject3D, 'glb')).rejects.toThrow(
                mockError,
            );
        });

        it('should handle GLB format when result is not ArrayBuffer', async () => {
            mockGLTFExporter.parseAsync.mockResolvedValue({ some: 'data' });

            await expect(exporter.export(mockObject3D, 'glb')).rejects.toThrow(
                'Failed to export GLB: expected ArrayBuffer',
            );
        });

        it('should handle GLTF format errors', async () => {
            const mockError = new Error('GLTF format export failed');
            mockGLTFExporter.parseAsync.mockRejectedValue(mockError);

            await expect(exporter.export(mockObject3D, 'gltf')).rejects.toThrow(
                mockError,
            );
        });

        it('should handle USDZExporter errors', async () => {
            const mockError = new Error('USDZ export failed');
            mockUSDZExporter.parse.mockRejectedValue(mockError);

            await expect(exporter.export(mockObject3D, 'usdz')).rejects.toThrow(
                mockError,
            );
        });

        it('should handle invalid file types', async () => {
            const invalidType = 'invalid' as FileType;
            await expect(
                exporter.export(mockObject3D, invalidType),
            ).rejects.toThrow(`Unsupported file type: ${invalidType}`);
        });
    });
});
