import { AssetLoader } from '../AssetLoader';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { USDZLoader } from 'three/examples/jsm/loaders/USDZLoader';
import { Group } from 'three';
import { FileTypeError, NetworkError, ParseError } from '../../../../error';

// Mock fetch
global.fetch = jest.fn().mockImplementation(async (uri) => ({
    ok: true,
    arrayBuffer: async () => new ArrayBuffer(0),
}));

// Mock the Three.js loaders
jest.mock('three/examples/jsm/loaders/GLTFLoader', () => {
    const mockLoadAsync = jest.fn();
    const mockParseAsync = jest.fn();
    return {
        GLTFLoader: jest.fn().mockImplementation(() => ({
            loadAsync: mockLoadAsync,
            parseAsync: mockParseAsync,
        })),
    };
});

jest.mock('three/examples/jsm/loaders/USDZLoader', () => {
    const mockLoadAsync = jest.fn();
    const mockParse = jest.fn();
    return {
        USDZLoader: jest.fn().mockImplementation(() => ({
            loadAsync: mockLoadAsync,
            parse: mockParse,
        })),
    };
});

describe('AssetLoader', () => {
    let loader: AssetLoader;
    let mockGLTFLoader: jest.Mocked<GLTFLoader>;
    let mockUSDZLoader: jest.Mocked<USDZLoader>;

    beforeEach(() => {
        jest.clearAllMocks();
        loader = new AssetLoader();
        mockGLTFLoader = new GLTFLoader() as jest.Mocked<GLTFLoader>;
        mockUSDZLoader = new USDZLoader() as jest.Mocked<USDZLoader>;
        (global.fetch as jest.Mock).mockClear();
    });

    it('should load a glTF file successfully', async () => {
        const mockScene = { type: 'Group' };
        mockGLTFLoader.parseAsync.mockResolvedValue({
            scene: mockScene,
        } as unknown as GLTF);

        const result = await loader.load('model.glb');

        expect(mockGLTFLoader.parseAsync).toHaveBeenCalled();
        expect(result).toBe(mockScene);
    });

    it('should load a USDZ file successfully', async () => {
        const mockObject = new Group();
        mockUSDZLoader.parse.mockReturnValue(mockObject);

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
        (global.fetch as jest.Mock).mockImplementationOnce(async () => ({
            ok: false,
        }));

        await expect(loader.load('model.glb')).rejects.toThrow(NetworkError);
    });

    it('should throw NetworkError when arrayBuffer extraction fails', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(async () => ({
            ok: true,
            arrayBuffer: async () => {
                throw new Error('Failed to extract arrayBuffer');
            },
        }));

        await expect(loader.load('model.glb')).rejects.toThrow(NetworkError);
    });

    it('should throw ParseError when glTF parsing fails', async () => {
        mockGLTFLoader.parseAsync.mockRejectedValue(new Error('Parse error'));

        await expect(loader.load('model.glb')).rejects.toThrow(ParseError);
    });

    it('should throw ParseError when USDZ parsing fails', async () => {
        mockUSDZLoader.parse.mockImplementation(() => {
            throw new Error('Parse error');
        });

        await expect(loader.load('model.usdz')).rejects.toThrow(ParseError);
    });

    it('should throw ParseError when non-Error object is thrown', async () => {
        mockGLTFLoader.parseAsync.mockImplementation(() => {
            throw 'String error'; // Throwing a non-Error object
        });

        await expect(loader.load('model.glb')).rejects.toThrow(ParseError);
    });

    it('should load a gltf file successfully', async () => {
        const mockScene = { type: 'Group' };
        mockGLTFLoader.parseAsync.mockResolvedValue({
            scene: mockScene,
        } as unknown as GLTF);

        const result = await loader.load('model.gltf');

        expect(mockGLTFLoader.parseAsync).toHaveBeenCalled();
        expect(result).toBe(mockScene);
    });

    it('should attempt to load the file from the provided URI', async () => {
        mockGLTFLoader.parseAsync.mockResolvedValue({
            scene: { type: 'Group' },
        } as unknown as GLTF);

        const testUri = 'https://example.com/model.glb';
        await loader.load(testUri);

        expect(global.fetch).toHaveBeenCalledWith(testUri);
    });

    it('should recognize glb as a supported file type', async () => {
        mockGLTFLoader.parseAsync.mockResolvedValue({
            scene: { type: 'Group' },
        } as unknown as GLTF);

        await loader.load('model.glb');

        expect(true).toBeTruthy();
    });

    it('should recognize gltf as a supported file type', async () => {
        mockGLTFLoader.parseAsync.mockResolvedValue({
            scene: { type: 'Group' },
        } as unknown as GLTF);

        await loader.load('model.gltf');

        expect(true).toBeTruthy();
    });

    it('should recognize usdz as a supported file type', async () => {
        mockUSDZLoader.parse.mockReturnValue(new Group());

        await loader.load('model.usdz');

        expect(true).toBeTruthy();
    });

    it('should correctly get file extension from URI with mixed case', async () => {
        mockGLTFLoader.parseAsync.mockResolvedValue({
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
