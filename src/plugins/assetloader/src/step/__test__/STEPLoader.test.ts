import { BufferGeometry, Color, Group, MeshStandardMaterial } from 'three';
import { STEPLoader } from '../STEPLoader.ts';

// Group needs add/children/name/rotation so _buildScene / _buildNode work.
vi.mocked(Group).mockImplementation(function (this: any) {
    this.isGroup = true;
    this.children = [];
    this.name = '';
    this.rotation = { x: 0, y: 0, z: 0 };
    this.add = vi.fn((obj: any) => {
        this.children.push(obj);
        return this;
    });
    return this;
});

// Color needs setRGB / setHex which the STEPLoader calls on MeshStandardMaterial.color.
const _origColorImpl = vi.mocked(Color).getMockImplementation()!;
vi.mocked(Color).mockImplementation(function (this: any, ...args: any[]) {
    const proxy = _origColorImpl.apply(this, args as [number, number, number]);
    const self = this;
    this.setRGB = vi.fn((rv: number, gv: number, bv: number) => {
        self.r = rv;
        self.g = gv;
        self.b = bv;
        return self;
    });
    this.setHex = vi.fn((hex: number) => {
        self.r = ((hex >> 16) & 255) / 255;
        self.g = ((hex >> 8) & 255) / 255;
        self.b = (hex & 255) / 255;
        return self;
    });
    return proxy;
});

// Mock dynamic imports
vi.mock('occt-import-js/dist/occt-import-js.js?raw', () => ({
    default: 'mock-occt-js-content',
}));

vi.mock('occt-import-js/dist/occt-import-js.wasm?url', () => ({
    default: 'mock-wasm-url',
}));

// Mock STEPWorker
vi.mock('../worker/StepWorker.js', () => ({
    STEPWorker: {
        toString: vi
            .fn()
            .mockReturnValue(
                'function STEPWorker() { console.log("worker"); }',
            ),
    },
}));

// Mock URL.createObjectURL (preserve native URL constructor for `new URL(...)`)
const NativeURL = globalThis.URL;
(NativeURL as any).createObjectURL = vi.fn().mockReturnValue('blob:mock-url');

global.Blob = vi.fn().mockImplementation((content) => ({ content })) as any;

// Shared mock worker instance (created fresh each test via beforeEach)
let mockWorkerInstance: {
    postMessage: ReturnType<typeof vi.fn>;
    terminate: ReturnType<typeof vi.fn>;
    onmessage: ((e: MessageEvent) => void) | null;
    onerror: ((e: ErrorEvent) => void) | null;
};

// Mock Worker constructor
const MockWorker = vi.fn().mockImplementation(() => mockWorkerInstance);
global.Worker = MockWorker as any;

describe('STEPLoader', () => {
    let loader: STEPLoader;

    beforeEach(() => {
        vi.clearAllMocks();

        mockWorkerInstance = {
            postMessage: vi.fn(),
            terminate: vi.fn(),
            onmessage: null,
            onerror: null,
        };
        MockWorker.mockImplementation(() => mockWorkerInstance);

        loader = new STEPLoader();
    });

    describe('constructor', () => {
        it('should create a STEPLoader instance', () => {
            expect(loader).toBeInstanceOf(STEPLoader);
        });

        it('should initialize with default state', () => {
            expect(loader['_workerPending']).toBeNull();
            expect(loader['_worker']).toBeNull();
            expect(loader['_nextId']).toBe(0);
            expect(loader['_pending'].size).toBe(0);
        });
    });

    describe('_getWorker', () => {
        it('should create a blob worker on first call', async () => {
            const worker = await loader['_getWorker']();

            expect(global.Blob).toHaveBeenCalledWith([
                expect.stringContaining('/* occt-import-js */'),
            ]);
            expect((NativeURL as any).createObjectURL).toHaveBeenCalled();
            expect(MockWorker).toHaveBeenCalledWith('blob:mock-url');
            expect(worker).toBe(mockWorkerInstance);
        });

        it('should send init message with absolute WASM URL', async () => {
            await loader['_getWorker']();

            expect(mockWorkerInstance.postMessage).toHaveBeenCalledWith({
                type: 'init',
                wasmUrl: expect.stringContaining('mock-wasm-url'),
            });
        });

        it('should extract function body from STEPWorker', async () => {
            await loader['_getWorker']();

            const blobCall = vi.mocked(global.Blob).mock.calls[0];
            const blobContent = blobCall?.[0]?.[0] as string;

            expect(blobContent).toContain('/* occt-import-js */');
            expect(blobContent).toContain('mock-occt-js-content');
            expect(blobContent).toContain('/* step worker */');
            expect(blobContent).toContain(' console.log("worker"); ');
            expect(blobContent).not.toContain('function STEPWorker()');
        });

        it('should reuse existing pending promise', async () => {
            const firstCall = loader['_getWorker']();
            const secondCall = loader['_getWorker']();

            expect(firstCall).toStrictEqual(secondCall);

            await firstCall;
            await secondCall;

            expect(MockWorker).toHaveBeenCalledTimes(1);
        });

        it('should set onmessage and onerror handlers', async () => {
            await loader['_getWorker']();

            expect(mockWorkerInstance.onmessage).toBeTypeOf('function');
            expect(mockWorkerInstance.onerror).toBeTypeOf('function');
        });

        it('should store worker reference', async () => {
            expect(loader['_worker']).toBeNull();

            await loader['_getWorker']();

            expect(loader['_worker']).toBe(mockWorkerInstance);
        });
    });

    describe('parseAsync', () => {
        it('should send parse message with transferable buffer', async () => {
            const buffer = new ArrayBuffer(100);
            const promise = loader.parseAsync(buffer, 'step');

            await vi.waitFor(() => {
                expect(mockWorkerInstance.postMessage).toHaveBeenCalledTimes(2);
            });

            const parseCall = mockWorkerInstance.postMessage.mock.calls[1];
            expect(parseCall[0]).toMatchObject({
                type: 'parse',
                id: 0,
                fileType: 'step',
            });
            expect(parseCall[0].buffer).toBeInstanceOf(ArrayBuffer);
            expect(parseCall[1]).toHaveLength(1);

            loader.dispose();
            await promise.catch(() => {});
        });

        it('should increment ids for multiple calls', async () => {
            const buf1 = new ArrayBuffer(10);
            const buf2 = new ArrayBuffer(10);

            const p1 = loader.parseAsync(buf1, 'step');
            const p2 = loader.parseAsync(buf2, 'stp');

            await vi.waitFor(() => {
                expect(mockWorkerInstance.postMessage).toHaveBeenCalledTimes(3);
            });

            const call1 = mockWorkerInstance.postMessage.mock.calls[1];
            const call2 = mockWorkerInstance.postMessage.mock.calls[2];
            expect(call1[0].id).toBe(0);
            expect(call2[0].id).toBe(1);

            loader.dispose();
            await p1.catch(() => {});
            await p2.catch(() => {});
        });

        it('should support iges and igs file types', async () => {
            const buffer = new ArrayBuffer(10);
            const p = loader.parseAsync(buffer, 'iges');

            await vi.waitFor(() => {
                expect(mockWorkerInstance.postMessage).toHaveBeenCalledTimes(2);
            });

            const parseCall = mockWorkerInstance.postMessage.mock.calls[1];
            expect(parseCall[0].fileType).toBe('iges');

            loader.dispose();
            await p.catch(() => {});
        });

        it('should copy the buffer before posting', async () => {
            const buffer = new ArrayBuffer(100);
            const p = loader.parseAsync(buffer, 'step');

            await vi.waitFor(() => {
                expect(mockWorkerInstance.postMessage).toHaveBeenCalledTimes(2);
            });

            const parseCall = mockWorkerInstance.postMessage.mock.calls[1];
            expect(parseCall[0].buffer).not.toBe(buffer);
            expect(parseCall[0].buffer.byteLength).toBe(100);

            loader.dispose();
            await p.catch(() => {});
        });
    });

    describe('worker onmessage', () => {
        const mockResult = {
            success: true,
            root: {
                name: 'TestModel',
                meshes: [0],
                children: [],
            },
            meshes: [
                {
                    name: 'TestMesh',
                    color: [
                        0.8,
                        0.2,
                        0.1,
                    ] as [number, number, number],
                    attributes: {
                        position: {
                            array: [
                                0,
                                0,
                                0,
                                1,
                                0,
                                0,
                                0,
                                1,
                                0,
                            ],
                        },
                        normal: {
                            array: [
                                0,
                                0,
                                1,
                                0,
                                0,
                                1,
                                0,
                                0,
                                1,
                            ],
                        },
                    },
                    index: {
                        array: [
                            0,
                            1,
                            2,
                        ],
                    },
                },
            ],
        };

        it('should resolve pending promise on result message', async () => {
            const buffer = new ArrayBuffer(10);
            const promise = loader.parseAsync(buffer, 'step');

            await vi.waitFor(() => {
                expect(mockWorkerInstance.onmessage).toBeTypeOf('function');
                expect(mockWorkerInstance.postMessage).toHaveBeenCalledTimes(2);
            });

            mockWorkerInstance.onmessage!({
                data: { type: 'result', id: 0, result: mockResult },
            } as MessageEvent);

            const result = await promise;
            expect(result).toBeDefined();
            expect(result.name).toBe('TestModel');
        });

        it('should reject pending promise on error message', async () => {
            const buffer = new ArrayBuffer(10);
            const promise = loader.parseAsync(buffer, 'step');

            await vi.waitFor(() => {
                expect(mockWorkerInstance.onmessage).toBeTypeOf('function');
                expect(mockWorkerInstance.postMessage).toHaveBeenCalledTimes(2);
            });

            mockWorkerInstance.onmessage!({
                data: { type: 'error', id: 0, error: 'Parse failed' },
            } as MessageEvent);

            await expect(promise).rejects.toThrow('Parse failed');
        });

        it('should reject with default message when error is undefined', async () => {
            const buffer = new ArrayBuffer(10);
            const promise = loader.parseAsync(buffer, 'step');

            await vi.waitFor(() => {
                expect(mockWorkerInstance.onmessage).toBeTypeOf('function');
                expect(mockWorkerInstance.postMessage).toHaveBeenCalledTimes(2);
            });

            mockWorkerInstance.onmessage!({
                data: { type: 'error', id: 0 },
            } as MessageEvent);

            await expect(promise).rejects.toThrow('Worker error');
        });

        it('should ignore messages for unknown ids', async () => {
            await loader['_getWorker']();

            // Should not throw
            mockWorkerInstance.onmessage!({
                data: { type: 'result', id: 999, result: mockResult },
            } as MessageEvent);
        });

        it('should reject if _buildScene throws', async () => {
            const buffer = new ArrayBuffer(10);
            const promise = loader.parseAsync(buffer, 'step');

            await vi.waitFor(() => {
                expect(mockWorkerInstance.onmessage).toBeTypeOf('function');
                expect(mockWorkerInstance.postMessage).toHaveBeenCalledTimes(2);
            });

            // Spy on _buildScene to force a throw
            vi.spyOn(loader as any, '_buildScene').mockImplementation(() => {
                throw new Error('Build scene failed');
            });

            mockWorkerInstance.onmessage!({
                data: { type: 'result', id: 0, result: mockResult },
            } as MessageEvent);

            await expect(promise).rejects.toThrow('Build scene failed');
        });

        it('should remove pending entry after resolution', async () => {
            const buffer = new ArrayBuffer(10);
            const promise = loader.parseAsync(buffer, 'step');

            await vi.waitFor(() => {
                expect(mockWorkerInstance.onmessage).toBeTypeOf('function');
            });

            expect(loader['_pending'].size).toBe(1);

            mockWorkerInstance.onmessage!({
                data: { type: 'result', id: 0, result: mockResult },
            } as MessageEvent);

            await promise;
            expect(loader['_pending'].size).toBe(0);
        });
    });

    describe('worker onerror', () => {
        it('should reject all pending promises on worker error', async () => {
            const buf1 = new ArrayBuffer(10);
            const buf2 = new ArrayBuffer(10);
            const p1 = loader.parseAsync(buf1, 'step');
            const p2 = loader.parseAsync(buf2, 'stp');

            await vi.waitFor(() => {
                expect(mockWorkerInstance.onerror).toBeTypeOf('function');
                expect(mockWorkerInstance.postMessage).toHaveBeenCalledTimes(3);
            });

            mockWorkerInstance.onerror!({
                message: 'Fatal worker error',
            } as ErrorEvent);

            await expect(p1).rejects.toThrow('Fatal worker error');
            await expect(p2).rejects.toThrow('Fatal worker error');
            expect(loader['_pending'].size).toBe(0);
        });

        it('should use default message when error message is empty', async () => {
            const buffer = new ArrayBuffer(10);
            const promise = loader.parseAsync(buffer, 'step');

            await vi.waitFor(() => {
                expect(mockWorkerInstance.onerror).toBeTypeOf('function');
                expect(mockWorkerInstance.postMessage).toHaveBeenCalledTimes(2);
            });

            mockWorkerInstance.onerror!({
                message: '',
            } as ErrorEvent);

            // '' ?? 'Worker error' → '' because '' is not null/undefined
            await expect(promise).rejects.toThrow('');
        });
    });

    describe('dispose', () => {
        it('should terminate worker and clear state', async () => {
            await loader['_getWorker']();

            loader.dispose();

            expect(mockWorkerInstance.terminate).toHaveBeenCalled();
            expect(loader['_worker']).toBeNull();
            expect(loader['_workerPending']).toBeNull();
            expect(loader['_pending'].size).toBe(0);
        });

        it('should reject all pending promises on dispose', async () => {
            const buffer = new ArrayBuffer(10);
            const promise = loader.parseAsync(buffer, 'step');

            await vi.waitFor(() => {
                expect(mockWorkerInstance.postMessage).toHaveBeenCalledTimes(2);
            });

            loader.dispose();

            await expect(promise).rejects.toThrow('STEPLoader disposed');
        });

        it('should be safe to call dispose without a worker', () => {
            expect(() => loader.dispose()).not.toThrow();
        });

        it('should allow creating a new worker after dispose', async () => {
            await loader['_getWorker']();
            loader.dispose();

            expect(loader['_workerPending']).toBeNull();
            expect(loader['_worker']).toBeNull();

            const worker = await loader['_getWorker']();
            expect(worker).toBeDefined();
            expect(MockWorker).toHaveBeenCalledTimes(2);
        });
    });

    describe('_buildScene', () => {
        it('should create a root with the correct name', () => {
            const result = {
                success: true,
                root: { name: 'MyModel', meshes: [], children: [] },
                meshes: [],
            };

            const scene = loader['_buildScene'](result);

            expect(scene).toBeDefined();
            expect(scene.name).toBe('MyModel');
        });

        it('should default root name to "CAD Model"', () => {
            const result = {
                success: true,
                root: { meshes: [], children: [] },
                meshes: [],
            };

            const scene = loader['_buildScene'](result);

            expect(scene.name).toBe('CAD Model');
        });

        it('should apply correct rotation for CAD coordinate system', () => {
            const result = {
                success: true,
                root: { name: 'Model', meshes: [], children: [] },
                meshes: [],
            };

            const scene = loader['_buildScene'](result);

            expect(scene.rotation.x).toBe(-Math.PI / 2);
            expect(scene.rotation.z).toBe(Math.PI / 2);
        });

        it('should build child nodes from result', () => {
            const result = {
                success: true,
                root: {
                    name: 'Root',
                    meshes: [],
                    children: [
                        { name: 'Child1', meshes: [], children: [] },
                        { name: 'Child2', meshes: [], children: [] },
                    ],
                },
                meshes: [],
            };

            const scene = loader['_buildScene'](result);

            expect(scene.add).toHaveBeenCalled();
        });
    });

    describe('_buildNode', () => {
        it('should create a group and add it to parent', () => {
            const node = { name: 'Part1', meshes: [], children: [] };
            const parent = { add: vi.fn(), children: [] } as any;

            loader['_buildNode'](node, [], parent);

            expect(parent.add).toHaveBeenCalledTimes(1);
            const nodeGroup = parent.add.mock.calls[0][0];
            expect(nodeGroup.name).toBe('Part1');
        });

        it('should default node name to "Part"', () => {
            const node = { meshes: [], children: [] } as any;
            const parent = { add: vi.fn(), children: [] } as any;

            loader['_buildNode'](node, [], parent);

            const nodeGroup = parent.add.mock.calls[0][0];
            expect(nodeGroup.name).toBe('Part');
        });

        it('should create meshes for valid mesh indices', () => {
            const node = { name: 'Part', meshes: [0], children: [] };
            const meshes = [
                {
                    name: 'Mesh0',
                    attributes: {
                        position: {
                            array: [
                                0,
                                0,
                                0,
                                1,
                                0,
                                0,
                                0,
                                1,
                                0,
                            ],
                        },
                    },
                },
            ];
            const parent = { add: vi.fn(), children: [] } as any;

            loader['_buildNode'](node, meshes as any, parent);

            const nodeGroup = parent.add.mock.calls[0][0];
            expect(nodeGroup.add).toHaveBeenCalledTimes(1);
        });

        it('should handle nested children recursively', () => {
            const node = {
                name: 'Root',
                meshes: [],
                children: [
                    {
                        name: 'Child',
                        meshes: [],
                        children: [
                            {
                                name: 'GrandChild',
                                meshes: [],
                                children: [],
                            },
                        ],
                    },
                ],
            };
            const parent = { add: vi.fn(), children: [] } as any;

            loader['_buildNode'](node, [], parent);

            expect(parent.add).toHaveBeenCalledTimes(1);
            const rootGroup = parent.add.mock.calls[0][0];
            expect(rootGroup.name).toBe('Root');

            expect(rootGroup.add).toHaveBeenCalledTimes(1);
            const childGroup = rootGroup.add.mock.calls[0][0];
            expect(childGroup.name).toBe('Child');

            expect(childGroup.add).toHaveBeenCalledTimes(1);
            const grandChildGroup = childGroup.add.mock.calls[0][0];
            expect(grandChildGroup.name).toBe('GrandChild');
        });

        it('should skip meshes with null attributes', () => {
            const node = { name: 'Part', meshes: [0], children: [] };
            const meshes = [{ name: 'BadMesh', attributes: null }];
            const parent = { add: vi.fn(), children: [] } as any;

            loader['_buildNode'](node, meshes as any, parent);

            const nodeGroup = parent.add.mock.calls[0][0];
            expect(nodeGroup.add).not.toHaveBeenCalled();
        });

        it('should handle multiple mesh indices', () => {
            const node = {
                name: 'Part',
                meshes: [
                    0,
                    1,
                ],
                children: [],
            };
            const meshes = [
                {
                    name: 'Mesh0',
                    attributes: {
                        position: {
                            array: [
                                0,
                                0,
                                0,
                            ],
                        },
                    },
                },
                {
                    name: 'Mesh1',
                    attributes: {
                        position: {
                            array: [
                                1,
                                1,
                                1,
                            ],
                        },
                    },
                },
            ];
            const parent = { add: vi.fn(), children: [] } as any;

            loader['_buildNode'](node, meshes as any, parent);

            const nodeGroup = parent.add.mock.calls[0][0];
            expect(nodeGroup.add).toHaveBeenCalledTimes(2);
        });
    });

    describe('_createMesh', () => {
        // Helper to get a created instance from a mock constructor.
        // index defaults to 0 (first instance after mockClear).
        function getInstance(MockCtor: any, index = 0): any {
            return MockCtor.mock.results[index]?.value;
        }

        it('should create a Mesh with correct name', () => {
            const occtMesh = {
                name: 'TestMesh',
                attributes: {
                    position: {
                        array: [
                            0,
                            0,
                            0,
                            1,
                            0,
                            0,
                            0,
                            1,
                            0,
                        ],
                    },
                },
            };

            const mesh = loader['_createMesh'](occtMesh as any);

            expect(mesh).toBeDefined();
            expect(mesh.name).toBe('TestMesh');
        });

        it('should default mesh name to "Mesh"', () => {
            const occtMesh = {
                attributes: {
                    position: {
                        array: [
                            0,
                            0,
                            0,
                            1,
                            0,
                            0,
                            0,
                            1,
                            0,
                        ],
                    },
                },
            };

            const mesh = loader['_createMesh'](occtMesh as any);

            expect(mesh.name).toBe('Mesh');
        });

        it('should set position attribute on BufferGeometry', () => {
            vi.mocked(BufferGeometry).mockClear();

            const occtMesh = {
                name: 'TestMesh',
                attributes: {
                    position: {
                        array: [
                            0,
                            0,
                            0,
                            1,
                            0,
                            0,
                            0,
                            1,
                            0,
                        ],
                    },
                },
            };

            loader['_createMesh'](occtMesh as any);

            const geom = getInstance(BufferGeometry);
            expect(geom.setAttribute).toHaveBeenCalledWith(
                'position',
                expect.anything(),
            );
        });

        it('should set normal attribute when provided', () => {
            vi.mocked(BufferGeometry).mockClear();

            const occtMesh = {
                name: 'WithNormals',
                attributes: {
                    position: {
                        array: [
                            0,
                            0,
                            0,
                            1,
                            0,
                            0,
                            0,
                            1,
                            0,
                        ],
                    },
                    normal: {
                        array: [
                            0,
                            0,
                            1,
                            0,
                            0,
                            1,
                            0,
                            0,
                            1,
                        ],
                    },
                },
            };

            loader['_createMesh'](occtMesh as any);

            const geom = getInstance(BufferGeometry);
            expect(geom.setAttribute).toHaveBeenCalledWith(
                'normal',
                expect.anything(),
            );
        });

        it('should compute vertex normals when normals not provided', () => {
            vi.mocked(BufferGeometry).mockClear();

            const occtMesh = {
                name: 'NoNormals',
                attributes: {
                    position: {
                        array: [
                            0,
                            0,
                            0,
                            1,
                            0,
                            0,
                            0,
                            1,
                            0,
                        ],
                    },
                },
                index: {
                    array: [
                        0,
                        1,
                        2,
                    ],
                },
            };

            loader['_createMesh'](occtMesh as any);

            const geom = getInstance(BufferGeometry);
            expect(geom.computeVertexNormals).toHaveBeenCalled();
        });

        it('should set index buffer from top-level index', () => {
            vi.mocked(BufferGeometry).mockClear();

            const occtMesh = {
                name: 'WithIndex',
                index: {
                    array: [
                        0,
                        1,
                        2,
                        1,
                        2,
                        3,
                    ],
                },
                attributes: {
                    position: {
                        array: [
                            0,
                            0,
                            0,
                            1,
                            0,
                            0,
                            0,
                            1,
                            0,
                            1,
                            1,
                            0,
                        ],
                    },
                },
            };

            loader['_createMesh'](occtMesh as any);

            const geom = getInstance(BufferGeometry);
            expect(geom.setIndex).toHaveBeenCalled();
        });

        it('should fall back to attributes.index when top-level index is absent', () => {
            vi.mocked(BufferGeometry).mockClear();

            const occtMesh = {
                name: 'AttribIndex',
                attributes: {
                    position: {
                        array: [
                            0,
                            0,
                            0,
                            1,
                            0,
                            0,
                            0,
                            1,
                            0,
                        ],
                    },
                    index: {
                        array: [
                            0,
                            1,
                            2,
                        ],
                    },
                },
            };

            loader['_createMesh'](occtMesh as any);

            const geom = getInstance(BufferGeometry);
            expect(geom.setIndex).toHaveBeenCalled();
        });

        it('should not set index when no index is available', () => {
            vi.mocked(BufferGeometry).mockClear();

            const occtMesh = {
                name: 'NoIndex',
                attributes: {
                    position: {
                        array: [
                            0,
                            0,
                            0,
                            1,
                            0,
                            0,
                            0,
                            1,
                            0,
                        ],
                    },
                },
            };

            loader['_createMesh'](occtMesh as any);

            const geom = getInstance(BufferGeometry);
            expect(geom.setIndex).not.toHaveBeenCalled();
        });

        it('should apply color from OCCT result via setRGB', () => {
            vi.mocked(MeshStandardMaterial).mockClear();

            const occtMesh = {
                name: 'Colored',
                color: [
                    0.5,
                    0.3,
                    0.8,
                ] as [number, number, number],
                attributes: {
                    position: {
                        array: [
                            0,
                            0,
                            0,
                            1,
                            0,
                            0,
                            0,
                            1,
                            0,
                        ],
                    },
                },
            };

            loader['_createMesh'](occtMesh as any);

            // First MSM instance (index 0) is from _createMesh; the Mesh mock creates a second one
            const mat = getInstance(MeshStandardMaterial);
            expect(mat.color.setRGB).toHaveBeenCalledWith(0.5, 0.3, 0.8);
        });

        it('should use default grey color when no color provided', () => {
            vi.mocked(MeshStandardMaterial).mockClear();

            const occtMesh = {
                name: 'NoColor',
                attributes: {
                    position: {
                        array: [
                            0,
                            0,
                            0,
                            1,
                            0,
                            0,
                            0,
                            1,
                            0,
                        ],
                    },
                },
            };

            loader['_createMesh'](occtMesh as any);

            const mat = getInstance(MeshStandardMaterial);
            expect(mat.color.setHex).toHaveBeenCalledWith(0xcccccc);
        });

        it('should enable shadow casting and receiving', () => {
            const occtMesh = {
                name: 'Shadows',
                attributes: {
                    position: {
                        array: [
                            0,
                            0,
                            0,
                            1,
                            0,
                            0,
                            0,
                            1,
                            0,
                        ],
                    },
                },
            };

            const mesh = loader['_createMesh'](occtMesh as any);

            expect(mesh.castShadow).toBe(true);
            expect(mesh.receiveShadow).toBe(true);
        });

        it('should create a MeshStandardMaterial with correct properties', () => {
            vi.mocked(MeshStandardMaterial).mockClear();

            const occtMesh = {
                name: 'MatProps',
                attributes: {
                    position: {
                        array: [
                            0,
                            0,
                            0,
                            1,
                            0,
                            0,
                            0,
                            1,
                            0,
                        ],
                    },
                },
            };

            loader['_createMesh'](occtMesh as any);

            expect(MeshStandardMaterial).toHaveBeenCalledWith({
                metalness: 0.3,
                roughness: 0.6,
            });
        });
    });
});
