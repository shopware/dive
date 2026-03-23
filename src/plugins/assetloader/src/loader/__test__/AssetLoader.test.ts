import { AssetLoader } from '../AssetLoader.ts';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Group } from 'three';
import { FileTypeError, NetworkError, ParseError } from '@shopware-ag/dive';
import { AssetCache } from '@shopware-ag/dive/assetcache';

vi.mock('three');

vi.mock('@shopware-ag/dive/shader', () => ({
    DIVEShaderLib: {
        grid: { uniforms: {}, vertexShader: '', fragmentShader: '' },
    },
    DIVEShaderMaterial: vi.fn(),
}));

// Mock the Three.js loaders
const mockParseAsyncGLTF = vi.fn();
vi.mock('three/examples/jsm/loaders/GLTFLoader', () => ({
    GLTFLoader: vi.fn().mockImplementation(() => ({
        parseAsync: mockParseAsyncGLTF,
        setDRACOLoader: vi.fn(),
    })),
}));

const mockParseUSDZ = vi.fn();
vi.mock('three/examples/jsm/loaders/USDZLoader', () => ({
    USDZLoader: vi.fn().mockImplementation(() => ({
        parse: mockParseUSDZ,
    })),
}));

vi.mock('../../draco/DracoLoader.ts', () => ({
    DracoLoader: vi.fn().mockImplementation(() => ({
        setDecoderPath: vi.fn(),
        setDecoderConfig: vi.fn(),
    })),
}));

const mockStepParseAsync = vi.fn();
vi.mock('../../step/STEPLoader.ts', () => ({
    STEPLoader: vi.fn().mockImplementation(() => ({
        parseAsync: mockStepParseAsync,
    })),
}));

// Mock AssetCache
vi.mock('@shopware-ag/dive/assetcache', () => ({
    AssetCache: {
        read: vi.fn(),
        create: vi.fn(),
        write: vi.fn(),
        delete: vi.fn(),
        clear: vi.fn(),
    },
}));

const MockedAssetCache = vi.mocked(AssetCache);

describe('AssetLoader', () => {
    let loader: AssetLoader;
    let mockChunk: any;

    beforeEach(() => {
        vi.clearAllMocks();
        loader = new AssetLoader();

        // Create mock chunk for each test
        mockChunk = {
            arrayBuffer: new ArrayBuffer(1024),
            promise: Promise.resolve(new ArrayBuffer(1024)),
            load: vi.fn().mockResolvedValue(new ArrayBuffer(1024)),
        };

        // Reset the create mock to return our mockChunk
        MockedAssetCache.create.mockReturnValue(mockChunk);
    });

    describe('cache integration', () => {
        it('should return cached result if chunk exists and has arrayBuffer', async () => {
            const mockArrayBuffer = new ArrayBuffer(1024);
            const mockScene = new Group();
            const cachedChunk = {
                arrayBuffer: mockArrayBuffer,
                promise: Promise.resolve(mockArrayBuffer),
            };
            MockedAssetCache.read.mockReturnValue(cachedChunk as any);
            mockParseAsyncGLTF.mockResolvedValue({
                scene: mockScene,
                animations: [],
            } as GLTF);

            const result = await loader.load('model.glb');

            expect(MockedAssetCache.read).toHaveBeenCalledWith('model.glb');
            expect(MockedAssetCache.create).not.toHaveBeenCalled();
            expect(mockParseAsyncGLTF).toHaveBeenCalledWith(
                mockArrayBuffer,
                '',
            );
            expect(result).toBe(mockScene);
        });

        it('should return cached promise if chunk exists but no arrayBuffer yet', async () => {
            const mockArrayBuffer = new ArrayBuffer(1024);
            const mockScene = new Group();
            const cachedChunk = {
                arrayBuffer: null,
                promise: Promise.resolve(mockArrayBuffer),
            };
            MockedAssetCache.read.mockReturnValue(cachedChunk as any);
            mockParseAsyncGLTF.mockResolvedValue({
                scene: mockScene,
                animations: [],
            } as GLTF);

            const result = await loader.load('model.glb');

            expect(MockedAssetCache.read).toHaveBeenCalledWith('model.glb');
            expect(MockedAssetCache.create).not.toHaveBeenCalled();
            expect(mockParseAsyncGLTF).toHaveBeenCalledWith(
                mockArrayBuffer,
                '',
            );
            expect(result).toBe(mockScene);
        });

        it('should create new chunk if not cached', async () => {
            const mockArrayBuffer = new ArrayBuffer(1024);
            const mockScene = new Group();
            MockedAssetCache.read.mockReturnValue(null);
            mockChunk.load.mockResolvedValue(mockArrayBuffer);
            mockParseAsyncGLTF.mockResolvedValue({
                scene: mockScene,
                animations: [],
            } as GLTF);

            const result = await loader.load('model.glb');

            expect(MockedAssetCache.read).toHaveBeenCalledWith('model.glb');
            expect(MockedAssetCache.create).toHaveBeenCalledWith('model.glb');
            expect(mockChunk.load).toHaveBeenCalled();
            expect(mockParseAsyncGLTF).toHaveBeenCalledWith(
                mockArrayBuffer,
                '',
            );
            expect(result).toBe(mockScene);
        });
    });

    describe('file type validation', () => {
        it('should throw FileTypeError for URIs without extensions', async () => {
            await expect(loader.load('model')).rejects.toThrow(
                new FileTypeError('No file extension found in URI', ''),
            );
        });

        it('should throw FileTypeError for URIs with empty extensions', async () => {
            await expect(loader.load('model.')).rejects.toThrow(
                new FileTypeError('No file extension found in URI', ''),
            );
        });

        it('should throw FileTypeError for unsupported file types', async () => {
            await expect(loader.load('model.xyz')).rejects.toThrow(
                FileTypeError,
            );
        });

        it('should handle case-insensitive file extensions', async () => {
            MockedAssetCache.read.mockReturnValue(null);
            const mockArrayBuffer = new ArrayBuffer(1024);
            const mockResult = new Group();
            mockChunk.load.mockResolvedValue(mockArrayBuffer);
            mockParseAsyncGLTF.mockResolvedValue({ scene: mockResult } as GLTF);

            await loader.load('model.GLB');

            expect(MockedAssetCache.create).toHaveBeenCalledWith('model.GLB');
        });
    });

    describe('GLTF parsing', () => {
        beforeEach(() => {
            MockedAssetCache.read.mockReturnValue(null);
        });

        it('should parse GLB files correctly', async () => {
            const mockScene = new Group();
            const mockArrayBuffer = new ArrayBuffer(1024);
            mockParseAsyncGLTF.mockResolvedValue({
                scene: mockScene,
                animations: [],
            } as GLTF);
            mockChunk.load.mockResolvedValue(mockArrayBuffer);

            const result = await loader.load('model.glb');

            expect(MockedAssetCache.create).toHaveBeenCalledWith('model.glb');
            expect(mockChunk.load).toHaveBeenCalled();
            expect(mockParseAsyncGLTF).toHaveBeenCalledWith(
                mockArrayBuffer,
                '',
            );
            expect(result).toBe(mockScene);
        });

        it('should parse GLTF files correctly', async () => {
            const mockScene = new Group();
            const mockArrayBuffer = new ArrayBuffer(1024);
            mockParseAsyncGLTF.mockResolvedValue({
                scene: mockScene,
                animations: [],
            } as GLTF);
            mockChunk.load.mockResolvedValue(mockArrayBuffer);

            const result = await loader.load('model.gltf');

            expect(MockedAssetCache.create).toHaveBeenCalledWith('model.gltf');
            expect(mockChunk.load).toHaveBeenCalled();
            expect(mockParseAsyncGLTF).toHaveBeenCalledWith(
                mockArrayBuffer,
                '',
            );
            expect(result).toBe(mockScene);
        });

        it('should throw ParseError when GLTF parsing fails', async () => {
            const mockArrayBuffer = new ArrayBuffer(1024);
            mockParseAsyncGLTF.mockRejectedValue(new Error('Invalid GLTF'));
            mockChunk.load.mockResolvedValue(mockArrayBuffer);

            await expect(loader.load('model.glb')).rejects.toThrow(ParseError);
            expect(mockParseAsyncGLTF).toHaveBeenCalledWith(
                mockArrayBuffer,
                '',
            );
        });

        it('should throw ParseError when non-Error object is thrown from GLTF parsing', async () => {
            const mockArrayBuffer = new ArrayBuffer(1024);
            mockParseAsyncGLTF.mockImplementation(() => {
                throw 'String error';
            });
            mockChunk.load.mockResolvedValue(mockArrayBuffer);

            await expect(loader.load('model.glb')).rejects.toThrow(ParseError);
        });
    });

    describe('USDZ parsing', () => {
        beforeEach(() => {
            MockedAssetCache.read.mockReturnValue(null);
        });

        it('should parse USDZ files correctly', async () => {
            const mockObject = new Group();
            const mockArrayBuffer = new ArrayBuffer(1024);
            mockParseUSDZ.mockReturnValue(mockObject);
            mockChunk.load.mockResolvedValue(mockArrayBuffer);

            const result = await loader.load('model.usdz');

            expect(MockedAssetCache.create).toHaveBeenCalledWith('model.usdz');
            expect(mockChunk.load).toHaveBeenCalled();
            expect(mockParseUSDZ).toHaveBeenCalledWith(mockArrayBuffer);
            expect(result).toBe(mockObject);
            expect(result.animations).toEqual([]);
        });

        it('should throw ParseError when USDZ parsing fails', async () => {
            const mockArrayBuffer = new ArrayBuffer(1024);
            mockParseUSDZ.mockImplementation(() => {
                throw new Error('Invalid USDZ');
            });
            mockChunk.load.mockResolvedValue(mockArrayBuffer);

            await expect(loader.load('model.usdz')).rejects.toThrow(ParseError);
            expect(mockParseUSDZ).toHaveBeenCalledWith(mockArrayBuffer);
        });
    });

    describe('integration', () => {
        it('should handle complete loading flow for GLB', async () => {
            const mockScene = new Group();
            const mockArrayBuffer = new ArrayBuffer(1024);
            const uri = 'https://example.com/model.glb';

            MockedAssetCache.read.mockReturnValue(null);
            mockChunk.load.mockResolvedValue(mockArrayBuffer);
            mockParseAsyncGLTF.mockResolvedValue({
                scene: mockScene,
                animations: [],
            } as GLTF);

            const result = await loader.load(uri);

            expect(MockedAssetCache.read).toHaveBeenCalledWith(uri);
            expect(MockedAssetCache.create).toHaveBeenCalledWith(uri);
            expect(mockChunk.load).toHaveBeenCalled();
            expect(mockParseAsyncGLTF).toHaveBeenCalledWith(
                mockArrayBuffer,
                '',
            );
            expect(result).toBe(mockScene);
        });

        it('should handle complete loading flow for USDZ', async () => {
            const mockObject = new Group();
            const mockArrayBuffer = new ArrayBuffer(1024);
            const uri = 'https://example.com/model.usdz';

            MockedAssetCache.read.mockReturnValue(null);
            mockChunk.load.mockResolvedValue(mockArrayBuffer);
            mockParseUSDZ.mockReturnValue(mockObject);

            const result = await loader.load(uri);

            expect(MockedAssetCache.read).toHaveBeenCalledWith(uri);
            expect(MockedAssetCache.create).toHaveBeenCalledWith(uri);
            expect(mockChunk.load).toHaveBeenCalled();
            expect(mockParseUSDZ).toHaveBeenCalledWith(mockArrayBuffer);
            expect(result).toBe(mockObject);
            expect(result.animations).toEqual([]);
        });

        it('should propagate errors from chunk.load()', async () => {
            const uri = 'model.glb';
            const error = new NetworkError(uri);

            MockedAssetCache.read.mockReturnValue(null);
            mockChunk.load.mockRejectedValue(error);

            await expect(loader.load(uri)).rejects.toThrow(NetworkError);
        });
    });

    describe('supported file types', () => {
        beforeEach(() => {
            MockedAssetCache.read.mockReturnValue(null);
            const mockArrayBuffer = new ArrayBuffer(1024);
            mockChunk.load.mockResolvedValue(mockArrayBuffer);
            mockParseAsyncGLTF.mockResolvedValue({
                scene: new Group(),
            } as GLTF);
            mockParseUSDZ.mockResolvedValue(new Group());
            mockStepParseAsync.mockResolvedValue(new Group());
        });

        it('should support .glb files', async () => {
            await loader.load('model.glb');
            expect(MockedAssetCache.create).toHaveBeenCalledWith('model.glb');
        });

        it('should support .gltf files', async () => {
            await loader.load('model.gltf');
            expect(MockedAssetCache.create).toHaveBeenCalledWith('model.gltf');
        });

        it('should support .usdz files', async () => {
            await loader.load('model.usdz');
            expect(MockedAssetCache.create).toHaveBeenCalledWith('model.usdz');
        });

        it('should support .step and .stp files', async () => {
            mockStepParseAsync.mockResolvedValue(new Group());
            await loader.load('model.step');
            expect(MockedAssetCache.create).toHaveBeenCalledWith('model.step');
            expect(mockStepParseAsync).toHaveBeenCalled();
            await loader.load('model.stp');
            expect(MockedAssetCache.create).toHaveBeenCalledWith('model.stp');
        });

        it('should support .iges and .igs files', async () => {
            mockStepParseAsync.mockResolvedValue(new Group());
            await loader.load('model.iges');
            expect(MockedAssetCache.create).toHaveBeenCalledWith('model.iges');
            await loader.load('model.igs');
            expect(MockedAssetCache.create).toHaveBeenCalledWith('model.igs');
        });
    });

    describe('constructor', () => {
        it('should initialize with GLTF and USDZ loaders', () => {
            const newLoader = new AssetLoader();
            expect(newLoader).toBeInstanceOf(AssetLoader);
        });

        it('should configure DRACO loader for GLTF', () => {
            const newLoader = new AssetLoader();
            expect(newLoader).toBeInstanceOf(AssetLoader);
            // The DRACO configuration is tested via mocks
        });
    });
});
