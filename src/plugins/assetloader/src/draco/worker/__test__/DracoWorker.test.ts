import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { DRACOWorker } from '../DracoWorker.js';

// Mock global variables and functions
const mockPostMessage = vi.fn();
const mockOnMessage = vi.fn();
const mockDracoDecoderModule = vi.fn();

// Mock self object
const mockSelf = {
    postMessage: mockPostMessage,
    Float32Array: Float32Array,
    Int8Array: Int8Array,
    Int16Array: Int16Array,
    Int32Array: Int32Array,
    Uint8Array: Uint8Array,
    Uint16Array: Uint16Array,
    Uint32Array: Uint32Array,
};

// Mock DRACO objects
const mockDraco = {
    TRIANGULAR_MESH: 1,
    POINT_CLOUD: 2,
    DT_FLOAT32: 1,
    DT_INT8: 2,
    DT_INT16: 3,
    DT_INT32: 4,
    DT_UINT8: 5,
    DT_UINT16: 6,
    DT_UINT32: 7,
    POSITION: 0,
    NORMAL: 1,
    COLOR: 2,
    HEAPF32: {
        buffer: new ArrayBuffer(4096), // Larger buffer to accommodate tests
    },
    Decoder: vi.fn(),
    Mesh: vi.fn(),
    PointCloud: vi.fn(),
    destroy: vi.fn(),
    _malloc: vi.fn(),
    _free: vi.fn(),
};

const mockDecoder = {
    GetEncodedGeometryType: vi.fn(),
    DecodeArrayToMesh: vi.fn(),
    DecodeArrayToPointCloud: vi.fn(),
    GetAttributeId: vi.fn(),
    GetAttributeByUniqueId: vi.fn(),
    GetAttribute: vi.fn(),
    GetAttributeDataArrayForAllPoints: vi.fn(),
    GetTrianglesUInt32Array: vi.fn(),
};

const mockGeometry = {
    ptr: 123,
    num_faces: vi.fn(),
    num_points: vi.fn(),
};

const mockAttribute = {
    num_components: vi.fn(),
};

const mockDecodingStatus = {
    ok: vi.fn(),
    error_msg: vi.fn(),
};

// Global mocks
(globalThis as any).self = mockSelf;
(globalThis as any).onmessage = null;
(globalThis as any).DracoDecoderModule = mockDracoDecoderModule;

describe('DRACOWorker', () => {
    let onmessageHandler: (e: MessageEvent) => void;
    let consoleSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
        vi.clearAllMocks();

        // Mock console.error to suppress expected error messages in test output
        consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        // Reset global onmessage
        (globalThis as any).onmessage = null;

        // Setup default mock returns
        mockDraco.Decoder.mockReturnValue(mockDecoder);
        mockDraco.Mesh.mockReturnValue(mockGeometry);
        mockDraco.PointCloud.mockReturnValue(mockGeometry);
        mockDecoder.GetEncodedGeometryType.mockReturnValue(
            mockDraco.TRIANGULAR_MESH,
        );
        mockDecoder.DecodeArrayToMesh.mockReturnValue(mockDecodingStatus);
        mockDecoder.DecodeArrayToPointCloud.mockReturnValue(mockDecodingStatus);
        mockDecodingStatus.ok.mockReturnValue(true);
        mockGeometry.num_faces.mockReturnValue(2);
        mockGeometry.num_points.mockReturnValue(3);
        mockAttribute.num_components.mockReturnValue(3);
        mockDecoder.GetAttributeId.mockReturnValue(0);
        mockDecoder.GetAttribute.mockReturnValue(mockAttribute);
        mockDraco._malloc.mockReturnValue(1000);

        // Initialize the worker
        DRACOWorker();
        onmessageHandler = (globalThis as any).onmessage;
    });

    afterEach(() => {
        // Restore console.error
        consoleSpy.mockRestore();
    });

    describe('init message handling', () => {
        it('should handle init message and setup decoder config', () => {
            const decoderConfig = {
                wasmBinary: new ArrayBuffer(8),
                onModuleLoaded: vi.fn(),
            };

            const message = {
                data: {
                    type: 'init',
                    decoderConfig: decoderConfig,
                },
            };

            // Setup DracoDecoderModule to call onModuleLoaded
            mockDracoDecoderModule.mockImplementation((config: any) => {
                setTimeout(() => config.onModuleLoaded(mockDraco), 0);
            });

            onmessageHandler(message as MessageEvent);

            expect(mockDracoDecoderModule).toHaveBeenCalledWith(decoderConfig);
        });
    });

    describe('decode message handling', () => {
        beforeEach(() => {
            // Initialize decoder first
            const initMessage = {
                data: {
                    type: 'init',
                    decoderConfig: { onModuleLoaded: vi.fn() },
                },
            };

            mockDracoDecoderModule.mockImplementation((config: any) => {
                config.onModuleLoaded(mockDraco);
            });

            onmessageHandler(initMessage as MessageEvent);
        });

        it('should handle decode message for triangular mesh', async () => {
            const buffer = new ArrayBuffer(16);
            const taskConfig = {
                attributeIDs: { position: 'POSITION' },
                attributeTypes: { position: 'Float32Array' },
                useUniqueIDs: false,
            };

            const message = {
                data: {
                    type: 'decode',
                    id: 'test-id',
                    buffer: buffer,
                    taskConfig: taskConfig,
                },
            };

            // Setup mocks for successful decoding
            const mockAttributeArray = new Float32Array([
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
            ]);
            const mockIndexArray = new Uint32Array([
                0,
                1,
                2,
                3,
                4,
                5,
            ]);

            mockDecoder.GetAttributeDataArrayForAllPoints.mockImplementation(
                () => {
                    // Simulate copying data to HEAP - create a view that will work
                    const byteOffset = 1000;
                    const length = 9;
                    const view = new Float32Array(
                        mockDraco.HEAPF32.buffer,
                        byteOffset,
                        length,
                    );
                    view.set(mockAttributeArray);
                },
            );

            mockDecoder.GetTrianglesUInt32Array.mockImplementation(() => {
                // Simulate copying index data to HEAP - use different offset to avoid overlap
                const byteOffset = 2000;
                const length = 6;
                const view = new Uint32Array(
                    mockDraco.HEAPF32.buffer,
                    byteOffset,
                    length,
                );
                view.set(mockIndexArray);
            });

            onmessageHandler(message as MessageEvent);

            // Wait for promise resolution
            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(mockDecoder.GetEncodedGeometryType).toHaveBeenCalled();
            expect(mockDecoder.DecodeArrayToMesh).toHaveBeenCalled();
            expect(mockPostMessage).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'decode',
                    id: 'test-id',
                    geometry: expect.objectContaining({
                        attributes: expect.any(Array),
                        index: expect.any(Object),
                    }),
                }),
                expect.any(Array),
            );
        });

        it('should handle decode message for point cloud', async () => {
            const buffer = new ArrayBuffer(16);
            const taskConfig = {
                attributeIDs: { position: 'POSITION' },
                attributeTypes: { position: 'Float32Array' },
                useUniqueIDs: false,
            };

            mockDecoder.GetEncodedGeometryType.mockReturnValue(
                mockDraco.POINT_CLOUD,
            );

            const message = {
                data: {
                    type: 'decode',
                    id: 'test-id',
                    buffer: buffer,
                    taskConfig: taskConfig,
                },
            };

            const mockAttributeArray = new Float32Array([
                1,
                2,
                3,
                4,
                5,
                6,
            ]);
            mockDecoder.GetAttributeDataArrayForAllPoints.mockImplementation(
                () => {
                    const byteOffset = 1000;
                    const length = 6;
                    const view = new Float32Array(
                        mockDraco.HEAPF32.buffer,
                        byteOffset,
                        length,
                    );
                    view.set(mockAttributeArray);
                },
            );

            onmessageHandler(message as MessageEvent);

            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(mockDecoder.DecodeArrayToPointCloud).toHaveBeenCalled();
            expect(mockPostMessage).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'decode',
                    id: 'test-id',
                    geometry: expect.objectContaining({
                        attributes: expect.any(Array),
                        index: null,
                    }),
                }),
                expect.any(Array),
            );
        });

        it('should handle unique IDs in task config', async () => {
            const buffer = new ArrayBuffer(16);
            const taskConfig = {
                attributeIDs: { position: 12345 },
                attributeTypes: { position: 'Float32Array' },
                useUniqueIDs: true,
            };

            const message = {
                data: {
                    type: 'decode',
                    id: 'test-id',
                    buffer: buffer,
                    taskConfig: taskConfig,
                },
            };

            mockDecoder.GetAttributeByUniqueId.mockReturnValue(mockAttribute);

            const mockAttributeArray = new Float32Array([
                1,
                2,
                3,
            ]);
            mockDecoder.GetAttributeDataArrayForAllPoints.mockImplementation(
                () => {
                    const byteOffset = 1000;
                    const length = 3;
                    const view = new Float32Array(
                        mockDraco.HEAPF32.buffer,
                        byteOffset,
                        length,
                    );
                    view.set(mockAttributeArray);
                },
            );

            onmessageHandler(message as MessageEvent);

            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(mockDecoder.GetAttributeByUniqueId).toHaveBeenCalledWith(
                mockGeometry,
                12345,
            );
        });

        it('should handle color attribute with vertex color space', async () => {
            const buffer = new ArrayBuffer(16);
            const taskConfig = {
                attributeIDs: { color: 'COLOR' },
                attributeTypes: { color: 'Float32Array' },
                useUniqueIDs: false,
                vertexColorSpace: 'srgb',
            };

            const message = {
                data: {
                    type: 'decode',
                    id: 'test-id',
                    buffer: buffer,
                    taskConfig: taskConfig,
                },
            };

            const mockAttributeArray = new Float32Array([
                1,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                1,
            ]);
            mockDecoder.GetAttributeDataArrayForAllPoints.mockImplementation(
                () => {
                    const byteOffset = 1000;
                    const length = 9;
                    const view = new Float32Array(
                        mockDraco.HEAPF32.buffer,
                        byteOffset,
                        length,
                    );
                    view.set(mockAttributeArray);
                },
            );

            onmessageHandler(message as MessageEvent);

            await new Promise((resolve) => setTimeout(resolve, 0));

            const call = mockPostMessage.mock.calls[0];
            const geometry = call[0].geometry;
            const colorAttribute = geometry.attributes.find(
                (attr: any) => attr.name === 'color',
            );

            expect(colorAttribute.vertexColorSpace).toBe('srgb');
        });

        it('should include stride metadata for decoded attributes', async () => {
            const buffer = new ArrayBuffer(16);
            const taskConfig = {
                attributeIDs: { position: 'POSITION' },
                attributeTypes: { position: 'Float32Array' },
                useUniqueIDs: false,
            };

            const message = {
                data: {
                    type: 'decode',
                    id: 'test-id',
                    buffer: buffer,
                    taskConfig: taskConfig,
                },
            };

            const mockAttributeArray = new Float32Array([
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
            ]);
            mockDecoder.GetAttributeDataArrayForAllPoints.mockImplementation(
                () => {
                    const byteOffset = 1000;
                    const length = 9;
                    const view = new Float32Array(
                        mockDraco.HEAPF32.buffer,
                        byteOffset,
                        length,
                    );
                    view.set(mockAttributeArray);
                },
            );

            onmessageHandler(message as MessageEvent);

            await new Promise((resolve) => setTimeout(resolve, 0));

            const call = mockPostMessage.mock.calls[0];
            const geometry = call[0].geometry;

            expect(geometry.attributes[0]).toMatchObject({
                name: 'position',
                count: 3,
                itemSize: 3,
                stride: 3,
            });
        });

        it('should pad attributes to a 4-byte stride when needed', async () => {
            const buffer = new ArrayBuffer(16);
            const taskConfig = {
                attributeIDs: { color: 'COLOR' },
                attributeTypes: { color: 'Uint8Array' },
                useUniqueIDs: false,
            };

            const message = {
                data: {
                    type: 'decode',
                    id: 'test-id',
                    buffer: buffer,
                    taskConfig: taskConfig,
                },
            };

            mockGeometry.num_points.mockReturnValue(2);
            mockAttribute.num_components.mockReturnValue(3);

            mockDecoder.GetAttributeDataArrayForAllPoints.mockImplementation(
                () => {
                    const byteOffset = 1000;
                    const view = new Uint8Array(
                        mockDraco.HEAPF32.buffer,
                        byteOffset,
                        6,
                    );
                    view.set([
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                    ]);
                },
            );

            onmessageHandler(message as MessageEvent);

            await new Promise((resolve) => setTimeout(resolve, 0));

            const call = mockPostMessage.mock.calls[0];
            const geometry = call[0].geometry;
            const colorAttribute = geometry.attributes[0];

            expect(colorAttribute).toMatchObject({
                name: 'color',
                count: 2,
                itemSize: 3,
                stride: 4,
            });
            expect(Array.from(colorAttribute.array)).toEqual([
                1,
                2,
                3,
                0,
                4,
                5,
                6,
                0,
            ]);
        });

        it('should handle decoding errors', async () => {
            const buffer = new ArrayBuffer(16);
            const taskConfig = {
                attributeIDs: { position: 'POSITION' },
                attributeTypes: { position: 'Float32Array' },
                useUniqueIDs: false,
            };

            mockDecodingStatus.ok.mockReturnValue(false);
            mockDecodingStatus.error_msg.mockReturnValue('Decoding failed');

            const message = {
                data: {
                    type: 'decode',
                    id: 'test-id',
                    buffer: buffer,
                    taskConfig: taskConfig,
                },
            };

            onmessageHandler(message as MessageEvent);

            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(mockPostMessage).toHaveBeenCalledWith({
                type: 'error',
                id: 'test-id',
                error: 'THREE.DRACOLoader: Decoding failed: Decoding failed',
            });
        });

        it('should handle unknown geometry type error', async () => {
            const buffer = new ArrayBuffer(16);
            const taskConfig = {
                attributeIDs: { position: 'POSITION' },
                attributeTypes: { position: 'Float32Array' },
                useUniqueIDs: false,
            };

            mockDecoder.GetEncodedGeometryType.mockReturnValue(999); // Unknown type

            const message = {
                data: {
                    type: 'decode',
                    id: 'test-id',
                    buffer: buffer,
                    taskConfig: taskConfig,
                },
            };

            onmessageHandler(message as MessageEvent);

            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(mockPostMessage).toHaveBeenCalledWith({
                type: 'error',
                id: 'test-id',
                error: 'THREE.DRACOLoader: Unexpected geometry type.',
            });
        });

        it('should skip attributes that are not found', async () => {
            const buffer = new ArrayBuffer(16);
            const taskConfig = {
                attributeIDs: {
                    position: 'POSITION',
                    normal: 'NORMAL', // This will return -1 (not found)
                },
                attributeTypes: {
                    position: 'Float32Array',
                    normal: 'Float32Array',
                },
                useUniqueIDs: false,
            };

            // Make normal attribute return -1 (not found)
            mockDecoder.GetAttributeId.mockImplementation(
                (geometry: any, attributeType: any) => {
                    if (attributeType === mockDraco.NORMAL) return -1;
                    return 0;
                },
            );

            const message = {
                data: {
                    type: 'decode',
                    id: 'test-id',
                    buffer: buffer,
                    taskConfig: taskConfig,
                },
            };

            const mockAttributeArray = new Float32Array([
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
            ]);
            mockDecoder.GetAttributeDataArrayForAllPoints.mockImplementation(
                () => {
                    const byteOffset = 1000;
                    const length = 9;
                    const view = new Float32Array(
                        mockDraco.HEAPF32.buffer,
                        byteOffset,
                        length,
                    );
                    view.set(mockAttributeArray);
                },
            );

            onmessageHandler(message as MessageEvent);

            await new Promise((resolve) => setTimeout(resolve, 0));

            const call = mockPostMessage.mock.calls[0];
            const geometry = call[0].geometry;

            // Should only have position attribute, normal should be skipped
            expect(geometry.attributes).toHaveLength(1);
            expect(geometry.attributes[0].name).toBe('position');
        });
    });

    describe('data type mapping', () => {
        beforeEach(() => {
            // Initialize decoder for data type mapping tests
            const initMessage = {
                data: {
                    type: 'init',
                    decoderConfig: { onModuleLoaded: vi.fn() },
                },
            };

            mockDracoDecoderModule.mockImplementation((config: any) => {
                config.onModuleLoaded(mockDraco);
            });

            onmessageHandler(initMessage as MessageEvent);
        });

        const testCases = [
            { type: Float32Array, expected: mockDraco.DT_FLOAT32 },
            { type: Int8Array, expected: mockDraco.DT_INT8 },
            { type: Int16Array, expected: mockDraco.DT_INT16 },
            { type: Int32Array, expected: mockDraco.DT_INT32 },
            { type: Uint8Array, expected: mockDraco.DT_UINT8 },
            { type: Uint16Array, expected: mockDraco.DT_UINT16 },
            { type: Uint32Array, expected: mockDraco.DT_UINT32 },
        ];

        testCases.forEach(({ type, expected }) => {
            it(`should map ${type.name} to correct DRACO data type`, async () => {
                const buffer = new ArrayBuffer(16);
                const taskConfig = {
                    attributeIDs: { test: 'POSITION' },
                    attributeTypes: { test: type.name },
                    useUniqueIDs: false,
                };

                const message = {
                    data: {
                        type: 'decode',
                        id: 'test-id',
                        buffer: buffer,
                        taskConfig: taskConfig,
                    },
                };

                mockDecoder.GetAttributeDataArrayForAllPoints.mockImplementation(
                    () => {
                        const byteOffset = 1000;
                        const length = 3;
                        const view = new (type as any)(
                            mockDraco.HEAPF32.buffer,
                            byteOffset,
                            length,
                        );
                        view.set(
                            type === Float32Array
                                ? [
                                      1.0,
                                      2.0,
                                      3.0,
                                  ]
                                : [
                                      1,
                                      2,
                                      3,
                                  ],
                        );
                    },
                );

                onmessageHandler(message as MessageEvent);

                await new Promise((resolve) => setTimeout(resolve, 0));

                expect(
                    mockDecoder.GetAttributeDataArrayForAllPoints,
                ).toHaveBeenCalledWith(
                    mockGeometry,
                    mockAttribute,
                    expected,
                    expect.any(Number),
                    1000,
                );
            });
        });
    });

    describe('memory management', () => {
        beforeEach(() => {
            // Initialize decoder for memory management tests
            const initMessage = {
                data: {
                    type: 'init',
                    decoderConfig: { onModuleLoaded: vi.fn() },
                },
            };

            mockDracoDecoderModule.mockImplementation((config: any) => {
                config.onModuleLoaded(mockDraco);
            });

            onmessageHandler(initMessage as MessageEvent);
        });

        it('should free allocated memory after decoding', async () => {
            const buffer = new ArrayBuffer(16);
            const taskConfig = {
                attributeIDs: { position: 'POSITION' },
                attributeTypes: { position: 'Float32Array' },
                useUniqueIDs: false,
            };

            const message = {
                data: {
                    type: 'decode',
                    id: 'test-id',
                    buffer: buffer,
                    taskConfig: taskConfig,
                },
            };

            const mockAttributeArray = new Float32Array([
                1,
                2,
                3,
            ]);
            mockDecoder.GetAttributeDataArrayForAllPoints.mockImplementation(
                () => {
                    const byteOffset = 1000;
                    const length = 3;
                    const view = new Float32Array(
                        mockDraco.HEAPF32.buffer,
                        byteOffset,
                        length,
                    );
                    view.set(mockAttributeArray);
                },
            );

            onmessageHandler(message as MessageEvent);

            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(mockDraco._free).toHaveBeenCalledWith(1000);
            expect(mockDraco.destroy).toHaveBeenCalledWith(mockDecoder);
            expect(mockDraco.destroy).toHaveBeenCalledWith(mockGeometry);
        });

        it('should cleanup resources even when error occurs', async () => {
            const buffer = new ArrayBuffer(16);
            const taskConfig = {
                attributeIDs: { position: 'POSITION' },
                attributeTypes: { position: 'Float32Array' },
                useUniqueIDs: false,
            };

            mockDecodingStatus.ok.mockReturnValue(false);
            mockDecodingStatus.error_msg.mockReturnValue('Decoding failed');

            const message = {
                data: {
                    type: 'decode',
                    id: 'test-id',
                    buffer: buffer,
                    taskConfig: taskConfig,
                },
            };

            onmessageHandler(message as MessageEvent);

            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(mockDraco.destroy).toHaveBeenCalledWith(mockDecoder);
        });
    });
});
