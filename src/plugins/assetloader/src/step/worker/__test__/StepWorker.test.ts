import { describe, it, expect, beforeEach, vi } from 'vitest';
import { STEPWorker } from '../StepWorker.js';

// Mock global variables and functions
const mockPostMessage = vi.fn();
const mockOcctimportjs = vi.fn();

// Mock self object
const mockSelf = {
    postMessage: mockPostMessage,
};

// Mock OCCT module returned by occtimportjs()
const mockOcct = {
    ReadStepFile: vi.fn(),
    ReadIgesFile: vi.fn(),
};

// Global mocks
(globalThis as any).self = mockSelf;
(globalThis as any).onmessage = null;
(globalThis as any).occtimportjs = mockOcctimportjs;

describe('STEPWorker', () => {
    let onmessageHandler: (e: MessageEvent) => void;

    beforeEach(() => {
        vi.clearAllMocks();

        // Reset global onmessage
        (globalThis as any).onmessage = null;

        // Setup default mock: occtimportjs resolves to mockOcct
        mockOcctimportjs.mockReturnValue(Promise.resolve(mockOcct));

        // Default successful result
        mockOcct.ReadStepFile.mockReturnValue({
            success: true,
            root: { name: 'Model', meshes: [0], children: [] },
            meshes: [
                {
                    attributes: {
                        position: {
                            array: [0, 0, 0],
                        },
                    },
                },
            ],
        });

        mockOcct.ReadIgesFile.mockReturnValue({
            success: true,
            root: { name: 'Model', meshes: [0], children: [] },
            meshes: [
                {
                    attributes: {
                        position: {
                            array: [0, 0, 0],
                        },
                    },
                },
            ],
        });

        // Initialize the worker
        STEPWorker();
        onmessageHandler = (globalThis as any).onmessage;
    });

    describe('initialization', () => {
        it('should set onmessage handler on globalThis', () => {
            expect(onmessageHandler).toBeTypeOf('function');
        });

        it('should not call occtimportjs during initialization', () => {
            expect(mockOcctimportjs).not.toHaveBeenCalled();
        });
    });

    describe('init message handling', () => {
        it('should store wasmUrl from init message', async () => {
            const message = {
                data: {
                    type: 'init',
                    wasmUrl: 'http://localhost/occt.wasm',
                },
            };

            onmessageHandler(message as MessageEvent);

            // wasmUrl is stored internally; verify by triggering a parse
            // that causes occtimportjs to be called with locateFile
            const parseMessage = {
                data: {
                    type: 'parse',
                    id: 1,
                    buffer: new ArrayBuffer(10),
                    fileType: 'step',
                },
            };

            onmessageHandler(parseMessage as MessageEvent);
            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(mockOcctimportjs).toHaveBeenCalledWith(
                expect.objectContaining({
                    locateFile: expect.any(Function),
                }),
            );

            // Verify locateFile returns the stored wasmUrl
            const config = mockOcctimportjs.mock.calls[0][0];
            expect(config.locateFile()).toBe('http://localhost/occt.wasm');
        });

        it('should not post any message on init', () => {
            const message = {
                data: {
                    type: 'init',
                    wasmUrl: 'http://localhost/occt.wasm',
                },
            };

            onmessageHandler(message as MessageEvent);

            expect(mockPostMessage).not.toHaveBeenCalled();
        });
    });

    describe('parse message handling – STEP files', () => {
        it('should parse step files using ReadStepFile', async () => {
            const buffer = new ArrayBuffer(16);
            const message = {
                data: {
                    type: 'parse',
                    id: 42,
                    buffer: buffer,
                    fileType: 'step',
                },
            };

            onmessageHandler(message as MessageEvent);
            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(mockOcct.ReadStepFile).toHaveBeenCalled();
            expect(mockOcct.ReadIgesFile).not.toHaveBeenCalled();
        });

        it('should parse stp files using ReadStepFile', async () => {
            const buffer = new ArrayBuffer(16);
            const message = {
                data: {
                    type: 'parse',
                    id: 43,
                    buffer: buffer,
                    fileType: 'stp',
                },
            };

            onmessageHandler(message as MessageEvent);
            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(mockOcct.ReadStepFile).toHaveBeenCalled();
            expect(mockOcct.ReadIgesFile).not.toHaveBeenCalled();
        });

        it('should post result message on successful parse', async () => {
            const expectedResult = {
                success: true,
                root: { name: 'CAD', meshes: [0], children: [] },
                meshes: [
                    {
                        attributes: {
                            position: {
                                array: [1, 2, 3],
                            },
                        },
                    },
                ],
            };
            mockOcct.ReadStepFile.mockReturnValue(expectedResult);

            const message = {
                data: {
                    type: 'parse',
                    id: 10,
                    buffer: new ArrayBuffer(16),
                    fileType: 'step',
                },
            };

            onmessageHandler(message as MessageEvent);
            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(mockPostMessage).toHaveBeenCalledWith({
                type: 'result',
                id: 10,
                result: expectedResult,
            });
        });
    });

    describe('parse message handling – IGES files', () => {
        it('should parse iges files using ReadIgesFile', async () => {
            const buffer = new ArrayBuffer(16);
            const message = {
                data: {
                    type: 'parse',
                    id: 50,
                    buffer: buffer,
                    fileType: 'iges',
                },
            };

            onmessageHandler(message as MessageEvent);
            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(mockOcct.ReadIgesFile).toHaveBeenCalled();
            expect(mockOcct.ReadStepFile).not.toHaveBeenCalled();
        });

        it('should parse igs files using ReadIgesFile', async () => {
            const buffer = new ArrayBuffer(16);
            const message = {
                data: {
                    type: 'parse',
                    id: 51,
                    buffer: buffer,
                    fileType: 'igs',
                },
            };

            onmessageHandler(message as MessageEvent);
            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(mockOcct.ReadIgesFile).toHaveBeenCalled();
            expect(mockOcct.ReadStepFile).not.toHaveBeenCalled();
        });

        it('should post result message for iges parse', async () => {
            const expectedResult = {
                success: true,
                root: { name: 'IGES Model', meshes: [], children: [] },
                meshes: [],
            };
            mockOcct.ReadIgesFile.mockReturnValue(expectedResult);

            const message = {
                data: {
                    type: 'parse',
                    id: 52,
                    buffer: new ArrayBuffer(16),
                    fileType: 'iges',
                },
            };

            onmessageHandler(message as MessageEvent);
            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(mockPostMessage).toHaveBeenCalledWith({
                type: 'result',
                id: 52,
                result: expectedResult,
            });
        });
    });

    describe('OCCT module lazy initialization', () => {
        it('should call occtimportjs only once for multiple parses', async () => {
            const msg1 = {
                data: {
                    type: 'parse',
                    id: 1,
                    buffer: new ArrayBuffer(8),
                    fileType: 'step',
                },
            };
            const msg2 = {
                data: {
                    type: 'parse',
                    id: 2,
                    buffer: new ArrayBuffer(8),
                    fileType: 'step',
                },
            };

            onmessageHandler(msg1 as MessageEvent);
            onmessageHandler(msg2 as MessageEvent);
            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(mockOcctimportjs).toHaveBeenCalledTimes(1);
        });

        it('should pass locateFile to occtimportjs config', async () => {
            // Set wasmUrl first
            onmessageHandler({
                data: { type: 'init', wasmUrl: 'https://cdn/occt.wasm' },
            } as MessageEvent);

            // Trigger parse to init occt
            onmessageHandler({
                data: {
                    type: 'parse',
                    id: 1,
                    buffer: new ArrayBuffer(8),
                    fileType: 'step',
                },
            } as MessageEvent);
            await new Promise((resolve) => setTimeout(resolve, 0));

            const config = mockOcctimportjs.mock.calls[0][0];
            expect(config.locateFile).toBeTypeOf('function');
            expect(config.locateFile()).toBe('https://cdn/occt.wasm');
        });
    });

    describe('schema normalization (parseStepWithFallback)', () => {
        it('should normalize CONFIG_CONTROL_DESIGN schema', async () => {
            const stepContent =
                "ISO-10303-21;\nFILE_SCHEMA(('CONFIG_CONTROL_DESIGN' ));\nDATA;";
            const encoder = new TextEncoder();
            const buffer = encoder.encode(stepContent).buffer;

            const message = {
                data: {
                    type: 'parse',
                    id: 100,
                    buffer: buffer,
                    fileType: 'step',
                },
            };

            onmessageHandler(message as MessageEvent);
            await new Promise((resolve) => setTimeout(resolve, 0));

            // First call is with normalized buffer
            const firstCall = mockOcct.ReadStepFile.mock.calls[0];
            const normalizedBytes = firstCall[0];
            const normalizedText = new TextDecoder().decode(normalizedBytes);

            expect(normalizedText).toContain(
                'AP203_CONFIGURATION_CONTROLLED_3D_DESIGN_OF_MECHANICAL_PARTS_AND_ASSEMBLIES_MIM_LF',
            );
            expect(normalizedText).not.toContain('CONFIG_CONTROL_DESIGN');
        });

        it('should normalize AP242 schema with version block', async () => {
            const stepContent =
                "ISO-10303-21;\nFILE_SCHEMA(('AP242_MANAGED_MODEL_BASED_3D_ENGINEERING_MIM_LF. { 1 2 3 }'));\nDATA;";
            const encoder = new TextEncoder();
            const buffer = encoder.encode(stepContent).buffer;

            const message = {
                data: {
                    type: 'parse',
                    id: 101,
                    buffer: buffer,
                    fileType: 'step',
                },
            };

            onmessageHandler(message as MessageEvent);
            await new Promise((resolve) => setTimeout(resolve, 0));

            const firstCall = mockOcct.ReadStepFile.mock.calls[0];
            const normalizedBytes = firstCall[0];
            const normalizedText = new TextDecoder().decode(normalizedBytes);

            expect(normalizedText).toContain(
                "'AP242_MANAGED_MODEL_BASED_3D_ENGINEERING_MIM_LF'",
            );
            // Version block should be stripped
            expect(normalizedText).not.toContain('{ 1 2 3 }');
        });

        it('should fall back to original buffer when normalized parse fails', async () => {
            const stepContent = 'ISO-10303-21;\nDATA;\nENDSEC;';
            const encoder = new TextEncoder();
            const buffer = encoder.encode(stepContent).buffer;

            // First call (normalized) fails, second call (original) succeeds
            mockOcct.ReadStepFile.mockReturnValueOnce({
                success: false,
                root: null,
                meshes: [],
            }).mockReturnValueOnce({
                success: true,
                root: { name: 'Fallback', meshes: [], children: [] },
                meshes: [],
            });

            const message = {
                data: {
                    type: 'parse',
                    id: 102,
                    buffer: buffer,
                    fileType: 'step',
                },
            };

            onmessageHandler(message as MessageEvent);
            await new Promise((resolve) => setTimeout(resolve, 0));

            // ReadStepFile called twice: normalized then original
            expect(mockOcct.ReadStepFile).toHaveBeenCalledTimes(2);

            expect(mockPostMessage).toHaveBeenCalledWith({
                type: 'result',
                id: 102,
                result: expect.objectContaining({
                    success: true,
                    root: expect.objectContaining({ name: 'Fallback' }),
                }),
            });
        });

        it('should fall back to original when normalized parse throws', async () => {
            const stepContent = 'ISO-10303-21;\nDATA;';
            const encoder = new TextEncoder();
            const buffer = encoder.encode(stepContent).buffer;

            // First call throws, second succeeds
            mockOcct.ReadStepFile.mockImplementationOnce(() => {
                throw new Error('Normalized parse error');
            }).mockReturnValueOnce({
                success: true,
                root: { name: 'OK', meshes: [], children: [] },
                meshes: [],
            });

            const message = {
                data: {
                    type: 'parse',
                    id: 103,
                    buffer: buffer,
                    fileType: 'step',
                },
            };

            onmessageHandler(message as MessageEvent);
            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(mockOcct.ReadStepFile).toHaveBeenCalledTimes(2);
            expect(mockPostMessage).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'result',
                    id: 103,
                }),
            );
        });

        it('should return failure result when both normalized and original throw', async () => {
            const stepContent = 'ISO-10303-21;\nDATA;';
            const encoder = new TextEncoder();
            const buffer = encoder.encode(stepContent).buffer;

            mockOcct.ReadStepFile.mockImplementation(() => {
                throw new Error('Cannot parse');
            });

            const message = {
                data: {
                    type: 'parse',
                    id: 104,
                    buffer: buffer,
                    fileType: 'step',
                },
            };

            onmessageHandler(message as MessageEvent);
            await new Promise((resolve) => setTimeout(resolve, 0));

            // Both calls throw → parseStepWithFallback returns { success: false }
            // → worker sends error because !result.success
            expect(mockPostMessage).toHaveBeenCalledWith({
                type: 'error',
                id: 104,
                error: 'Failed to parse CAD file',
            });
        });
    });

    describe('error handling', () => {
        it('should post error when result.success is false', async () => {
            mockOcct.ReadStepFile.mockReturnValue({
                success: false,
                root: { meshes: [], children: [] },
                meshes: [],
            });

            const message = {
                data: {
                    type: 'parse',
                    id: 200,
                    buffer: new ArrayBuffer(8),
                    fileType: 'step',
                },
            };

            onmessageHandler(message as MessageEvent);
            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(mockPostMessage).toHaveBeenCalledWith({
                type: 'error',
                id: 200,
                error: 'Failed to parse CAD file',
            });
        });

        it('should post error when result.root is null', async () => {
            mockOcct.ReadStepFile.mockReturnValue({
                success: true,
                root: null,
                meshes: [],
            });

            const message = {
                data: {
                    type: 'parse',
                    id: 201,
                    buffer: new ArrayBuffer(8),
                    fileType: 'step',
                },
            };

            onmessageHandler(message as MessageEvent);
            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(mockPostMessage).toHaveBeenCalledWith({
                type: 'error',
                id: 201,
                error: 'Failed to parse CAD file',
            });
        });

        it('should post error with message when occt throws an Error', async () => {
            mockOcctimportjs.mockReturnValue(
                Promise.reject(new Error('WASM load failed')),
            );

            // Need a fresh worker since occtPending is already set
            (globalThis as any).onmessage = null;
            STEPWorker();
            onmessageHandler = (globalThis as any).onmessage;

            const message = {
                data: {
                    type: 'parse',
                    id: 300,
                    buffer: new ArrayBuffer(8),
                    fileType: 'step',
                },
            };

            onmessageHandler(message as MessageEvent);
            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(mockPostMessage).toHaveBeenCalledWith({
                type: 'error',
                id: 300,
                error: 'WASM load failed',
            });
        });

        it('should post error with stringified value when non-Error is thrown', async () => {
            mockOcctimportjs.mockReturnValue(Promise.reject('string error'));

            (globalThis as any).onmessage = null;
            STEPWorker();
            onmessageHandler = (globalThis as any).onmessage;

            const message = {
                data: {
                    type: 'parse',
                    id: 301,
                    buffer: new ArrayBuffer(8),
                    fileType: 'step',
                },
            };

            onmessageHandler(message as MessageEvent);
            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(mockPostMessage).toHaveBeenCalledWith({
                type: 'error',
                id: 301,
                error: 'string error',
            });
        });

        it('should post error for failed IGES parse', async () => {
            mockOcct.ReadIgesFile.mockReturnValue({
                success: false,
                root: null,
                meshes: [],
            });

            const message = {
                data: {
                    type: 'parse',
                    id: 400,
                    buffer: new ArrayBuffer(8),
                    fileType: 'iges',
                },
            };

            onmessageHandler(message as MessageEvent);
            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(mockPostMessage).toHaveBeenCalledWith({
                type: 'error',
                id: 400,
                error: 'Failed to parse CAD file',
            });
        });
    });

    describe('buffer handling', () => {
        it('should convert ArrayBuffer to Uint8Array for STEP parsing', async () => {
            const data = new Uint8Array([73, 83, 79]); // "ISO"
            const buffer = data.buffer;

            const message = {
                data: {
                    type: 'parse',
                    id: 500,
                    buffer: buffer,
                    fileType: 'step',
                },
            };

            onmessageHandler(message as MessageEvent);
            await new Promise((resolve) => setTimeout(resolve, 0));

            // ReadStepFile is called with a Uint8Array (the normalized version)
            const firstCallArg = mockOcct.ReadStepFile.mock.calls[0][0];
            expect(firstCallArg).toBeInstanceOf(Uint8Array);
        });

        it('should convert ArrayBuffer to Uint8Array for IGES parsing', async () => {
            const data = new Uint8Array([0x53]); // 'S'
            const buffer = data.buffer;

            const message = {
                data: {
                    type: 'parse',
                    id: 501,
                    buffer: buffer,
                    fileType: 'iges',
                },
            };

            onmessageHandler(message as MessageEvent);
            await new Promise((resolve) => setTimeout(resolve, 0));

            const firstCallArg = mockOcct.ReadIgesFile.mock.calls[0][0];
            expect(firstCallArg).toBeInstanceOf(Uint8Array);
        });
    });

    describe('unknown message types', () => {
        it('should ignore unknown message types', () => {
            const message = {
                data: {
                    type: 'unknown',
                    id: 999,
                },
            };

            // Should not throw
            onmessageHandler(message as MessageEvent);

            expect(mockPostMessage).not.toHaveBeenCalled();
            expect(mockOcctimportjs).not.toHaveBeenCalled();
        });
    });
});
