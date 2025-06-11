import { DracoLoader } from '../DracoLoader.ts';

// Mock dynamic imports
vi.mock('three/examples/jsm/libs/draco/draco_decoder.js?raw', () => ({
    default: 'mock-draco-js-decoder-content',
}));

vi.mock('three/examples/jsm/libs/draco/draco_wasm_wrapper.js?raw', () => ({
    default: 'mock-draco-wasm-wrapper-content',
}));

vi.mock('three/examples/jsm/libs/draco/draco_decoder.wasm?url', () => ({
    default: 'mock-wasm-url',
}));

// Mock DRACOWorker
vi.mock('../worker/DracoWorker.js', () => ({
    DRACOWorker: {
        toString: vi
            .fn()
            .mockReturnValue(
                'function DRACOWorker() { console.log("worker"); }',
            ),
    },
}));

// Mock fetch
global.fetch = vi.fn().mockResolvedValue({
    arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(1024)),
} as unknown as Response);

// Mock URL and Blob
global.URL = {
    createObjectURL: vi.fn().mockReturnValue('blob:mock-url'),
} as any;

global.Blob = vi.fn().mockImplementation((content) => ({ content })) as any;

// Mock WebAssembly
Object.defineProperty(global, 'WebAssembly', {
    value: { compile: vi.fn() },
    writable: true,
});

describe('DracoLoader', () => {
    let loader: DracoLoader;

    beforeEach(() => {
        vi.clearAllMocks();
        loader = new DracoLoader();
    });

    describe('constructor', () => {
        it('should create a DracoLoader instance', () => {
            expect(loader).toBeInstanceOf(DracoLoader);
        });

        it('should initialize with default decoder configuration', () => {
            expect(loader['decoderConfig']).toEqual({
                type: 'js',
                wasmBinary: null,
            });
            expect(loader['decoderPending']).toBeNull();
            expect(loader['workerSourceURL']).toBe('');
        });
    });

    describe('decoder configuration', () => {
        it('should have JS as default decoder type', () => {
            expect(loader['decoderConfig'].type).toBe('js');
            expect(loader['decoderConfig'].wasmBinary).toBeNull();
        });

        it('should allow changing decoder configuration', () => {
            // Test that we can access the decoderConfig property
            const initialConfig = loader['decoderConfig'];
            expect(initialConfig.type).toBe('js');

            // Manually set the config to test the structure
            loader['decoderConfig'] = { type: 'wasm', wasmBinary: null };
            expect(loader['decoderConfig'].type).toBe('wasm');
        });
    });

    describe('_initDecoder integration', () => {
        it('should handle JS decoder initialization', async () => {
            loader['decoderConfig'].type = 'js';

            await loader['_initDecoder']();

            // Should not fetch WASM for JS decoder
            expect(global.fetch).not.toHaveBeenCalled();
            // Should create worker URL
            expect(global.URL.createObjectURL).toHaveBeenCalled();
            expect(loader['workerSourceURL']).toBe('blob:mock-url');
            expect(loader['decoderPending']).toBeDefined();
        });

        it('should handle WASM decoder initialization', async () => {
            loader['decoderConfig'].type = 'wasm';

            await loader['_initDecoder']();

            // Should fetch WASM binary
            expect(global.fetch).toHaveBeenCalledWith('mock-wasm-url');
            // Should create worker URL
            expect(global.URL.createObjectURL).toHaveBeenCalled();
            expect(loader['workerSourceURL']).toBe('blob:mock-url');
            expect(loader['decoderConfig'].wasmBinary).toBeInstanceOf(
                ArrayBuffer,
            );
            expect(loader['decoderPending']).toBeDefined();
        });

        it('should fallback to JS when WebAssembly is not available', async () => {
            // Mock WebAssembly as undefined
            Object.defineProperty(global, 'WebAssembly', {
                value: undefined,
                writable: true,
            });

            loader['decoderConfig'].type = 'wasm';

            await loader['_initDecoder']();

            // Should not fetch WASM binary
            expect(global.fetch).not.toHaveBeenCalled();
            expect(loader['decoderConfig'].wasmBinary).toBeNull();

            // Restore WebAssembly for other tests
            Object.defineProperty(global, 'WebAssembly', {
                value: { compile: vi.fn() },
                writable: true,
            });
        });

        it('should reuse existing pending promise', async () => {
            const firstCall = loader['_initDecoder']();
            const secondCall = loader['_initDecoder']();

            expect(firstCall).toStrictEqual(secondCall);

            await firstCall;
            await secondCall;
        });
    });

    describe('worker creation', () => {
        it('should create worker blob with correct structure', async () => {
            await loader['_initDecoder']();

            expect(global.Blob).toHaveBeenCalledWith([
                expect.stringContaining('/* draco decoder */'),
            ]);

            const blobCall = vi.mocked(global.Blob).mock.calls[0];
            const blobContent = blobCall?.[0]?.[0] as string;

            // Should contain decoder content
            expect(blobContent).toContain('/* draco decoder */');
            expect(blobContent).toContain('mock-draco-js-decoder-content');

            // Should contain worker content
            expect(blobContent).toContain('/* worker */');
            expect(blobContent).toContain('console.log("worker")');
        });

        it('should extract function body from DRACOWorker', async () => {
            await loader['_initDecoder']();

            const blobCall = vi.mocked(global.Blob).mock.calls[0];
            const blobContent = blobCall?.[0]?.[0] as string;

            // Should extract the function body, not the full function
            expect(blobContent).toContain(' console.log("worker"); ');
            expect(blobContent).not.toContain('function DRACOWorker()');
        });
    });

    describe('error handling', () => {
        it('should handle fetch errors gracefully', async () => {
            loader['decoderConfig'].type = 'wasm';
            vi.mocked(global.fetch).mockRejectedValue(
                new Error('Network error'),
            );

            await expect(loader['_initDecoder']()).rejects.toThrow(
                'Network error',
            );
        });

        it('should handle arrayBuffer extraction errors', async () => {
            loader['decoderConfig'].type = 'wasm';
            const mockResponse = {
                arrayBuffer: vi
                    .fn()
                    .mockRejectedValue(new Error('ArrayBuffer error')),
            };
            vi.mocked(global.fetch).mockResolvedValue(mockResponse as any);

            await expect(loader['_initDecoder']()).rejects.toThrow(
                'ArrayBuffer error',
            );
        });
    });

    describe('state management', () => {
        it('should track decoder pending state correctly', async () => {
            expect(loader['decoderPending']).toBeNull();

            const initPromise = loader['_initDecoder']();
            expect(loader['decoderPending']).toStrictEqual(initPromise);

            await initPromise;
            expect(loader['decoderPending']).toStrictEqual(initPromise);
        });

        it('should update worker source URL after initialization', async () => {
            expect(loader['workerSourceURL']).toBe('');

            await loader['_initDecoder']();

            expect(loader['workerSourceURL']).toBe('blob:mock-url');
        });
    });

    describe('WASM binary handling', () => {
        it('should set wasmBinary for WASM decoder', async () => {
            loader['decoderConfig'].type = 'wasm';
            const mockArrayBuffer = new ArrayBuffer(2048);

            vi.mocked(global.fetch).mockResolvedValue({
                arrayBuffer: vi.fn().mockResolvedValue(mockArrayBuffer),
            } as unknown as Response);

            await loader['_initDecoder']();

            expect(loader['decoderConfig'].wasmBinary).toBe(mockArrayBuffer);
        });

        it('should not set wasmBinary for JS decoder', async () => {
            loader['decoderConfig'].type = 'js';

            await loader['_initDecoder']();

            expect(loader['decoderConfig'].wasmBinary).toBeNull();
        });
    });
});
