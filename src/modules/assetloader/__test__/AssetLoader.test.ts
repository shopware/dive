import { AssetLoader } from '../AssetLoader.ts';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { USDZLoader } from 'three/examples/jsm/loaders/USDZLoader.js';
import { Group } from 'three';
import { FileTypeError } from '../../../error/file-type/file-type-error.ts';
import { NetworkError } from '../../../error/network/network-error.ts';
import { ParseError } from '../../../error/parse/parse-error.ts';
import { DRACOLoader } from 'three/examples/jsm/Addons.js';

// Mock fetch
global.fetch = vi.fn().mockImplementation(async (uri) => ({
    ok: true,
    arrayBuffer: async () => new ArrayBuffer(0),
}));

// Mock the Three.js loaders
const mockLoadAsyncGLTF = vi.fn();
const mockParseAsyncGLTF = vi.fn();
vi.mock('three/examples/jsm/loaders/GLTFLoader', () => {
    return {
        GLTFLoader: vi.fn().mockImplementation(() => ({
            loadAsync: mockLoadAsyncGLTF,
            parseAsync: mockParseAsyncGLTF,
            setDRACOLoader: vi.fn(),
        })),
    };
});

const mockLoadAsyncUSDZ = vi.fn();
const mockParseUSDZ = vi.fn();
vi.mock('three/examples/jsm/loaders/USDZLoader', () => {
    return {
        USDZLoader: vi.fn().mockImplementation(() => ({
            loadAsync: mockLoadAsyncUSDZ,
            parse: mockParseUSDZ,
        })),
    };
});

vi.mock('three/examples/jsm/loaders/DRACOLoader.js', () => {
    return {
        DRACOLoader: vi.fn().mockImplementation(() => ({
            setDecoderPath: vi.fn(),
            setDecoderConfig: vi.fn(),
        })),
    };
});

describe('AssetLoader', () => {
    let loader: AssetLoader;
    let mockGLTFLoader: GLTFLoader;
    let mockUSDZLoader: USDZLoader;

    beforeEach(() => {
        vi.clearAllMocks();
        loader = new AssetLoader();
        mockGLTFLoader = new GLTFLoader();
        mockUSDZLoader = new USDZLoader();
        vi.mocked(global.fetch).mockClear();
    });

    it('should load a glTF file successfully', async () => {
        const mockScene = { type: 'Group' };
        mockParseAsyncGLTF.mockResolvedValue({
            scene: mockScene,
        } as unknown as GLTF);

        const result = await loader.load('model.glb');

        expect(mockGLTFLoader.parseAsync).toHaveBeenCalled();
        expect(result).toBe(mockScene);
    });

    it('should load a USDZ file successfully', async () => {
        const mockObject = new Group();
        mockParseUSDZ.mockReturnValue(mockObject);

        const result = await loader.load('model.usdz');

        expect(mockUSDZLoader.parse).toHaveBeenCalled();
        expect(result).toBe(mockObject);
    });

    it('should throw FileTypeError for unsupported file types', async () => {
        await expect(loader.load('model.xyz')).rejects.toThrow(FileTypeError);
    });

    it('should throw FileTypeError for URIs without extensions', async () => {
        await expect(loader.load('model')).rejects.toThrow(FileTypeError);
    });

    it('should throw NetworkError when fetch fails', async () => {
        vi.mocked(global.fetch).mockImplementationOnce(
            async () =>
                ({
                    ok: false,
                }) as unknown as Response,
        );

        await expect(loader.load('model.glb')).rejects.toThrow(NetworkError);
    });

    it('should throw NetworkError when arrayBuffer extraction fails', async () => {
        vi.mocked(global.fetch).mockImplementationOnce(
            async () =>
                ({
                    ok: true,
                    arrayBuffer: async () => {
                        throw new Error('Failed to extract arrayBuffer');
                    },
                }) as unknown as Response,
        );

        await expect(loader.load('model.glb')).rejects.toThrow(NetworkError);
    });

    it('should throw ParseError when glTF parsing fails', async () => {
        mockParseAsyncGLTF.mockRejectedValue(new Error('Parse error'));

        await expect(loader.load('model.glb')).rejects.toThrow(ParseError);
    });

    it('should throw ParseError when USDZ parsing fails', async () => {
        mockParseUSDZ.mockImplementation(() => {
            throw new Error('Parse error');
        });

        await expect(loader.load('model.usdz')).rejects.toThrow(ParseError);
    });

    it('should throw ParseError when non-Error object is thrown', async () => {
        mockParseAsyncGLTF.mockImplementation(() => {
            throw 'String error'; // Throwing a non-Error object
        });

        await expect(loader.load('model.glb')).rejects.toThrow(ParseError);
    });

    it('should load a gltf file successfully', async () => {
        const mockScene = { type: 'Group' };
        mockParseAsyncGLTF.mockResolvedValue({
            scene: mockScene,
        } as unknown as GLTF);

        const result = await loader.load('model.gltf');

        expect(mockGLTFLoader.parseAsync).toHaveBeenCalled();
        expect(result).toBe(mockScene);
    });

    it('should attempt to load the file from the provided URI', async () => {
        mockParseAsyncGLTF.mockResolvedValue({
            scene: { type: 'Group' },
        } as unknown as GLTF);

        const testUri = 'https://example.com/model.glb';
        await loader.load(testUri);

        expect(global.fetch).toHaveBeenCalledWith(testUri);
    });

    it('should recognize glb as a supported file type', async () => {
        mockParseAsyncGLTF.mockResolvedValue({
            scene: { type: 'Group' },
        } as unknown as GLTF);

        await loader.load('model.glb');

        expect(true).toBeTruthy();
    });

    it('should recognize gltf as a supported file type', async () => {
        mockParseAsyncGLTF.mockResolvedValue({
            scene: { type: 'Group' },
        } as unknown as GLTF);

        await loader.load('model.gltf');

        expect(true).toBeTruthy();
    });

    it('should recognize usdz as a supported file type', async () => {
        mockParseUSDZ.mockReturnValue(new Group());

        await loader.load('model.usdz');

        expect(true).toBeTruthy();
    });

    it('should correctly get file extension from URI with mixed case', async () => {
        mockParseAsyncGLTF.mockResolvedValue({
            scene: { type: 'Group' },
        } as unknown as GLTF);

        await loader.load('model.GLB');

        expect(mockGLTFLoader.parseAsync).toHaveBeenCalled();
    });

    it('should throw FileTypeError for a URI without a dot', async () => {
        // When the URI doesn't have a dot, getFileTypeFromUri returns an empty string
        // which should result in a "No file extension found in URI" error
        await expect(loader.load('modelwithoutextension')).rejects.toThrow(
            new FileTypeError('No file extension found in URI', ''),
        );
    });

    it('should throw FileTypeError for a URI with a dot but no extension', async () => {
        // This test targets the case when a URI ends with a dot, resulting in an empty extension
        await expect(loader.load('model.')).rejects.toThrow(
            new FileTypeError('No file extension found in URI', ''),
        );
    });
});
