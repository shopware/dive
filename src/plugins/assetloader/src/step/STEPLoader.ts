import {
    BufferAttribute,
    BufferGeometry,
    Group,
    Mesh,
    MeshStandardMaterial,
    Object3D,
} from 'three/webgpu';
import { STEPWorker } from '../step/worker/StepWorker.js';

/**
 * OCCT import result structure from occt-import-js.
 * Note: index is at top level (mesh.index.array), not in attributes.
 */
interface OcctMesh {
    name?: string;
    color?: [number, number, number];
    brep_faces?: unknown[];
    index?: { array: number[] };
    attributes: {
        position: { array: number[] };
        normal?: { array: number[] };
        index?: { array: number[] };
    };
}

interface OcctNode {
    name?: string;
    meshes: number[];
    children: OcctNode[];
}

interface OcctImportResult {
    success: boolean;
    root: OcctNode;
    meshes: OcctMesh[];
}

/**
 * Lazily load occt-import-js assets for the worker.
 */
const STEP_LOADER_REGISTRY = {
    LOAD_OCCT_JS: async () =>
        (await import('occt-import-js/dist/occt-import-js.js?raw')).default,
    LOAD_OCCT_WASM_URL: async () =>
        (await import('occt-import-js/dist/occt-import-js.wasm?url')).default,
};

/**
 * Loader for STEP, STP, IGES, and IGS CAD files using occt-import-js.
 * Parsing runs in a blob-URL Web Worker (same pattern as DracoLoader).
 * Converts OpenCASCADE output to Three.js Object3D hierarchy.
 */
export class STEPLoader {
    private _workerPending: Promise<Worker> | null = null;
    private _worker: Worker | null = null;
    private _nextId = 0;
    private _pending = new Map<
        number,
        { resolve: (r: Object3D) => void; reject: (e: Error) => void }
    >();

    /**
     * Create (or return existing) blob-URL worker.
     * Loads occt-import-js JS as raw text, concatenates with STEPWorker
     * function body, and creates a classic (non-module) worker.
     */
    private _getWorker(): Promise<Worker> {
        if (this._workerPending) return this._workerPending;

        this._workerPending = (async () => {
            const [
                occtJs,
                wasmUrl,
            ] = await Promise.all([
                STEP_LOADER_REGISTRY.LOAD_OCCT_JS(),
                STEP_LOADER_REGISTRY.LOAD_OCCT_WASM_URL(),
            ]);

            // Extract function body from STEPWorker (same as DracoWorker pattern)
            const fn = STEPWorker.toString();
            const body = [
                '/* occt-import-js */',
                occtJs,
                '',
                '/* step worker */',
                fn.substring(fn.indexOf('{') + 1, fn.lastIndexOf('}')),
            ].join('\n');

            const blobUrl = URL.createObjectURL(new Blob([body]));
            const worker = new Worker(blobUrl);

            // Resolve WASM URL to absolute so fetch() works from blob: origin
            const absoluteWasmUrl = new URL(wasmUrl, window.location.href).href;

            // Send init message with WASM URL
            worker.postMessage({ type: 'init', wasmUrl: absoluteWasmUrl });

            worker.onmessage = (e: MessageEvent) => {
                const { type, id, result, error } = e.data;
                const pending = this._pending.get(id);
                if (!pending) return;
                this._pending.delete(id);
                if (type === 'result') {
                    try {
                        pending.resolve(this._buildScene(result));
                    } catch (err) {
                        pending.reject(
                            err instanceof Error ? err : new Error(String(err)),
                        );
                    }
                } else {
                    pending.reject(new Error(error ?? 'Worker error'));
                }
            };

            worker.onerror = (e) => {
                for (const [
                    ,
                    { reject },
                ] of this._pending) {
                    reject(new Error(e.message ?? 'Worker error'));
                }
                this._pending.clear();
            };

            this._worker = worker;
            return worker;
        })();

        return this._workerPending;
    }

    /**
     * Parse STEP or IGES file content and return a Three.js Object3D
     */
    public async parseAsync(
        arrayBuffer: ArrayBuffer,
        fileType: 'step' | 'stp' | 'iges' | 'igs',
    ): Promise<Object3D> {
        const id = this._nextId++;
        const worker = await this._getWorker();
        return new Promise<Object3D>((resolve, reject) => {
            this._pending.set(id, { resolve, reject });
            const copy = arrayBuffer.slice(0);
            worker.postMessage({ type: 'parse', id, buffer: copy, fileType }, [
                copy,
            ]);
        });
    }

    /**
     * Dispose the worker. Call when the loader is no longer needed.
     */
    public dispose(): void {
        if (this._worker) {
            for (const [
                ,
                { reject },
            ] of this._pending) {
                reject(new Error('STEPLoader disposed'));
            }
            this._pending.clear();
            this._worker.terminate();
            this._worker = null;
            this._workerPending = null;
        }
    }

    private _buildScene(result: OcctImportResult): Object3D {
        const root = new Group();
        root.name = result.root.name ?? 'CAD Model';

        this._buildNode(result.root, result.meshes, root);

        root.rotation.x = -Math.PI / 2;
        root.rotation.z = Math.PI / 2;

        return root;
    }

    private _buildNode(
        node: OcctNode,
        meshes: OcctMesh[],
        parent: Object3D,
    ): void {
        const nodeGroup = new Group();
        nodeGroup.name = node.name ?? 'Part';

        for (const meshIndex of node.meshes) {
            const occtMesh = meshes[meshIndex];
            if (occtMesh?.attributes) {
                const mesh = this._createMesh(occtMesh);
                nodeGroup.add(mesh);
            }
        }

        for (const child of node.children) {
            this._buildNode(child, meshes, nodeGroup);
        }

        parent.add(nodeGroup);
    }

    private _createMesh(occtMesh: OcctMesh): Mesh {
        const { position, normal } = occtMesh.attributes;
        // occt-import-js puts index at top level (mesh.index), not in attributes
        const index = occtMesh.index ?? occtMesh.attributes.index;

        const geometry = new BufferGeometry();

        geometry.setAttribute(
            'position',
            new BufferAttribute(new Float32Array(position.array), 3),
        );

        if (normal?.array?.length) {
            geometry.setAttribute(
                'normal',
                new BufferAttribute(new Float32Array(normal.array), 3),
            );
        } else {
            geometry.computeVertexNormals();
        }

        if (index?.array?.length) {
            geometry.setIndex(
                new BufferAttribute(new Uint32Array(index.array), 1),
            );
        }

        const color = occtMesh.color;
        const material = new MeshStandardMaterial({
            metalness: 0.3,
            roughness: 0.6,
        });
        if (color && color.length >= 3) {
            // OCCT returns RGB in 0-1 range
            material.color.setRGB(color[0], color[1], color[2]);
        } else {
            material.color.setHex(0xcccccc);
        }

        const mesh = new Mesh(geometry, material);
        mesh.name = occtMesh.name ?? 'Mesh';
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        return mesh;
    }
}
