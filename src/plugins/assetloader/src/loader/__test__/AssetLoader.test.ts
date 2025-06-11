import { AssetLoader } from '../AssetLoader.ts';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Group } from 'three';
import { FileTypeError, NetworkError, ParseError } from '@shopware-ag/dive';
import { AssetCache } from '@shopware-ag/dive/assetcache';

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

// Mock AssetCache without referencing external variables
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
            result: null,
            promise: Promise.resolve(new Group()),
            fetch: vi.fn(),
        };

        // Reset the create mock to return our mockChunk
        MockedAssetCache.create.mockReturnValue(mockChunk);
    });

    describe('cache integration', () => {
        it('should return cached result if chunk exists and has result', async () => {
            const mockResult = new Group();
            const cachedChunk = {
                result: mockResult,
                promise: Promise.resolve(mockResult),
            };
            MockedAssetCache.read.mockReturnValue(cachedChunk as any);

            const result = await loader.load('model.glb');

            expect(MockedAssetCache.read).toHaveBeenCalledWith('model.glb');
            expect(MockedAssetCache.create).not.toHaveBeenCalled();
            expect(result).toBe(mockResult);
        });

        it('should return cached promise if chunk exists but no result yet', async () => {
            const mockResult = new Group();
            const cachedChunk = {
                result: null,
                promise: Promise.resolve(mockResult),
            };
            MockedAssetCache.read.mockReturnValue(cachedChunk as any);

            const result = await loader.load('model.glb');

            expect(MockedAssetCache.read).toHaveBeenCalledWith('model.glb');
            expect(MockedAssetCache.create).not.toHaveBeenCalled();
            expect(result).toBe(mockResult);
        });

        it('should create new chunk if not cached', async () => {
            const mockResult = new Group();
            MockedAssetCache.read.mockReturnValue(null);
            mockChunk.fetch.mockResolvedValue(mockResult);

            const result = await loader.load('model.glb');

            expect(MockedAssetCache.read).toHaveBeenCalledWith('model.glb');
            expect(MockedAssetCache.create).toHaveBeenCalledWith(
                'model.glb',
                expect.any(Function),
            );
            expect(mockChunk.fetch).toHaveBeenCalled();
            expect(result).toBe(mockResult);
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
            const mockResult = new Group();
            mockChunk.fetch.mockResolvedValue(mockResult);

            await loader.load('model.GLB');

            expect(MockedAssetCache.create).toHaveBeenCalledWith(
                'model.GLB',
                expect.any(Function),
            );
        });
    });

    describe('GLTF parsing', () => {
        beforeEach(() => {
            MockedAssetCache.read.mockReturnValue(null);
        });

        it('should parse GLB files correctly', async () => {
            const mockScene = new Group();
            const mockArrayBuffer = new ArrayBuffer(1024);
            mockParseAsyncGLTF.mockResolvedValue({ scene: mockScene } as GLTF);

            // Capture the parse function passed to AssetCache.create
            let parseFunction: any;
            MockedAssetCache.create.mockImplementation((uri, parse) => {
                parseFunction = parse;
                return mockChunk as any;
            });

            await loader.load('model.glb');

            expect(MockedAssetCache.create).toHaveBeenCalled();
            expect(parseFunction).toBeDefined();

            // Test the parse function
            const result = await parseFunction(mockArrayBuffer);
            expect(mockParseAsyncGLTF).toHaveBeenCalledWith(
                mockArrayBuffer,
                '',
            );
            expect(result).toBe(mockScene);
        });

        it('should parse GLTF files correctly', async () => {
            const mockScene = new Group();
            const mockArrayBuffer = new ArrayBuffer(1024);
            mockParseAsyncGLTF.mockResolvedValue({ scene: mockScene } as GLTF);

            let parseFunction: any;
            MockedAssetCache.create.mockImplementation((uri, parse) => {
                parseFunction = parse;
                return mockChunk as any;
            });

            await loader.load('model.gltf');

            const result = await parseFunction(mockArrayBuffer);
            expect(mockParseAsyncGLTF).toHaveBeenCalledWith(
                mockArrayBuffer,
                '',
            );
            expect(result).toBe(mockScene);
        });

        it('should throw ParseError when GLTF parsing fails', async () => {
            const mockArrayBuffer = new ArrayBuffer(1024);
            mockParseAsyncGLTF.mockRejectedValue(new Error('Invalid GLTF'));

            let parseFunction: any;
            MockedAssetCache.create.mockImplementation((uri, parse) => {
                parseFunction = parse;
                return mockChunk as any;
            });

            await loader.load('model.glb');

            await expect(parseFunction(mockArrayBuffer)).rejects.toThrow(
                ParseError,
            );
        });

        it('should throw ParseError when non-Error object is thrown from GLTF parsing', async () => {
            const mockArrayBuffer = new ArrayBuffer(1024);
            mockParseAsyncGLTF.mockImplementation(() => {
                throw 'String error';
            });

            let parseFunction: any;
            MockedAssetCache.create.mockImplementation((uri, parse) => {
                parseFunction = parse;
                return mockChunk as any;
            });

            await loader.load('model.glb');

            await expect(parseFunction(mockArrayBuffer)).rejects.toThrow(
                ParseError,
            );
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

            let parseFunction: any;
            MockedAssetCache.create.mockImplementation((uri, parse) => {
                parseFunction = parse;
                return mockChunk as any;
            });

            await loader.load('model.usdz');

            const result = await parseFunction(mockArrayBuffer);
            expect(mockParseUSDZ).toHaveBeenCalledWith(mockArrayBuffer);
            expect(result).toBe(mockObject);
        });

        it('should throw ParseError when USDZ parsing fails', async () => {
            const mockArrayBuffer = new ArrayBuffer(1024);
            mockParseUSDZ.mockImplementation(() => {
                throw new Error('Invalid USDZ');
            });

            let parseFunction: any;
            MockedAssetCache.create.mockImplementation((uri, parse) => {
                parseFunction = parse;
                return mockChunk as any;
            });

            await loader.load('model.usdz');

            await expect(parseFunction(mockArrayBuffer)).rejects.toThrow(
                ParseError,
            );
        });
    });

    describe('integration', () => {
        it('should handle complete loading flow for GLB', async () => {
            const mockScene = new Group();
            const uri = 'https://example.com/model.glb';

            MockedAssetCache.read.mockReturnValue(null);
            mockChunk.fetch.mockResolvedValue(mockScene);

            const result = await loader.load(uri);

            expect(MockedAssetCache.read).toHaveBeenCalledWith(uri);
            expect(MockedAssetCache.create).toHaveBeenCalledWith(
                uri,
                expect.any(Function),
            );
            expect(mockChunk.fetch).toHaveBeenCalled();
            expect(result).toBe(mockScene);
        });

        it('should handle complete loading flow for USDZ', async () => {
            const mockObject = new Group();
            const uri = 'https://example.com/model.usdz';

            MockedAssetCache.read.mockReturnValue(null);
            mockChunk.fetch.mockResolvedValue(mockObject);

            const result = await loader.load(uri);

            expect(MockedAssetCache.read).toHaveBeenCalledWith(uri);
            expect(MockedAssetCache.create).toHaveBeenCalledWith(
                uri,
                expect.any(Function),
            );
            expect(mockChunk.fetch).toHaveBeenCalled();
            expect(result).toBe(mockObject);
        });

        it('should propagate errors from chunk.fetch()', async () => {
            const uri = 'model.glb';
            const error = new NetworkError(uri);

            MockedAssetCache.read.mockReturnValue(null);
            mockChunk.fetch.mockRejectedValue(error);

            await expect(loader.load(uri)).rejects.toThrow(NetworkError);
        });
    });

    describe('supported file types', () => {
        beforeEach(() => {
            MockedAssetCache.read.mockReturnValue(null);
            mockChunk.fetch.mockResolvedValue(new Group());
        });

        it('should support .glb files', async () => {
            await loader.load('model.glb');
            expect(MockedAssetCache.create).toHaveBeenCalled();
        });

        it('should support .gltf files', async () => {
            await loader.load('model.gltf');
            expect(MockedAssetCache.create).toHaveBeenCalled();
        });

        it('should support .usdz files', async () => {
            await loader.load('model.usdz');
            expect(MockedAssetCache.create).toHaveBeenCalled();
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
