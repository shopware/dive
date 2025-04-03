import { Loader } from '../Loader';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { USDZLoader } from 'three/examples/jsm/loaders/USDZLoader';
import { Group, Mesh } from 'three';
import { FileTypeError } from '../../types/error';

// Mock the Three.js loaders
jest.mock('three/examples/jsm/loaders/GLTFLoader', () => {
    const mockLoadAsync = jest.fn();
    return {
        GLTFLoader: jest.fn().mockImplementation(() => ({
            loadAsync: mockLoadAsync,
        })),
    };
});

jest.mock('three/examples/jsm/loaders/USDZLoader', () => {
    const mockLoadAsync = jest.fn();
    return {
        USDZLoader: jest.fn().mockImplementation(() => ({
            loadAsync: mockLoadAsync,
        })),
    };
});

describe('Loader', () => {
    let loader: Loader;
    let mockGLTFLoader: jest.Mocked<GLTFLoader>;
    let mockUSDZLoader: jest.Mocked<USDZLoader>;

    beforeEach(() => {
        jest.clearAllMocks();
        loader = new Loader();
        mockGLTFLoader = new GLTFLoader() as jest.Mocked<GLTFLoader>;
        mockUSDZLoader = new USDZLoader() as jest.Mocked<USDZLoader>;
    });

    describe('file type validation', () => {
        it('should throw error when no extension is found', async () => {
            await expect(
                loader.load('https://example.com/file'),
            ).rejects.toThrow(FileTypeError);
        });

        it('should throw error for unsupported file types', async () => {
            const unsupportedTypes = [
                'obj',
                'fbx',
                'txt',
            ];
            for (const type of unsupportedTypes) {
                await expect(
                    loader.load(`https://example.com/model.${type}`),
                ).rejects.toThrow(FileTypeError);
            }
        });

        it('should handle case-insensitive extensions', async () => {
            const mockGLTFObject = new Group();
            const mockUSDZObject = new Mesh();

            mockGLTFLoader.loadAsync.mockResolvedValue({
                scene: mockGLTFObject,
            } as GLTF);
            mockUSDZLoader.loadAsync.mockResolvedValue(mockUSDZObject);

            const testCases = [
                {
                    uri: 'https://example.com/model.GLB',
                    expected: mockGLTFObject,
                },
                {
                    uri: 'https://example.com/model.GLTF',
                    expected: mockGLTFObject,
                },
                {
                    uri: 'https://example.com/model.USDZ',
                    expected: mockUSDZObject,
                },
            ];

            for (const { uri, expected } of testCases) {
                const result = await loader.load(uri);
                expect(result).toBe(expected);
            }
        });
    });

    describe('loading functionality', () => {
        it('should load GLB files correctly', async () => {
            const mockObject3D = new Group();
            mockGLTFLoader.loadAsync.mockResolvedValue({
                scene: mockObject3D,
            } as GLTF);

            const result = await loader.load('https://example.com/model.glb');

            expect(result).toBe(mockObject3D);
            expect(mockGLTFLoader.loadAsync).toHaveBeenCalledWith(
                'https://example.com/model.glb',
            );
            expect(mockUSDZLoader.loadAsync).not.toHaveBeenCalled();
        });

        it('should load GLTF files correctly', async () => {
            const mockObject3D = new Group();
            mockGLTFLoader.loadAsync.mockResolvedValue({
                scene: mockObject3D,
            } as GLTF);

            const result = await loader.load('https://example.com/model.gltf');

            expect(result).toBe(mockObject3D);
            expect(mockGLTFLoader.loadAsync).toHaveBeenCalledWith(
                'https://example.com/model.gltf',
            );
            expect(mockUSDZLoader.loadAsync).not.toHaveBeenCalled();
        });

        it('should load USDZ files correctly', async () => {
            const mockObject3D = new Mesh();
            mockUSDZLoader.loadAsync.mockResolvedValue(mockObject3D);

            const result = await loader.load('https://example.com/model.usdz');

            expect(result).toBe(mockObject3D);
            expect(mockUSDZLoader.loadAsync).toHaveBeenCalledWith(
                'https://example.com/model.usdz',
            );
            expect(mockGLTFLoader.loadAsync).not.toHaveBeenCalled();
        });
    });

    describe('error handling', () => {
        it('should handle GLTFLoader errors', async () => {
            const mockError = new Error('GLTF loading failed');
            mockGLTFLoader.loadAsync.mockRejectedValue(mockError);

            await expect(
                loader.load('https://example.com/model.glb'),
            ).rejects.toThrow(mockError);
        });

        it('should handle USDZLoader errors', async () => {
            const mockError = new Error('USDZ loading failed');
            mockUSDZLoader.loadAsync.mockRejectedValue(mockError);

            await expect(
                loader.load('https://example.com/model.usdz'),
            ).rejects.toThrow(mockError);
        });

        it('should handle URI without extension', async () => {
            await expect(
                loader.load('http://example.com/file'),
            ).rejects.toThrow(FileTypeError);
        });

        it('should handle empty URI', async () => {
            await expect(loader.load('')).rejects.toThrow(FileTypeError);
        });

        it('should handle URI with only domain', async () => {
            await expect(loader.load('http://example.com')).rejects.toThrow(
                FileTypeError,
            );
        });

        it('should handle URI with trailing slash', async () => {
            await expect(loader.load('http://example.com/')).rejects.toThrow(
                FileTypeError,
            );
        });

        it('should handle URI with dot without extension', async () => {
            await expect(loader.load('http://example.com/.')).rejects.toThrow(
                FileTypeError,
            );
        });

        it('should handle URI with parent directory', async () => {
            await expect(loader.load('http://example.com/..')).rejects.toThrow(
                FileTypeError,
            );
        });
    });
});
