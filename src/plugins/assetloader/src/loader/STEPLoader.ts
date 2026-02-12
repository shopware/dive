import {
    BufferAttribute,
    BufferGeometry,
    Group,
    Mesh,
    MeshStandardMaterial,
    Object3D,
} from 'three';

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
 * Schema name mappings for STEP files.
 * OCCT's parser expects full MIM schema names; many exporters use short names.
 */
const STEP_SCHEMA_NORMALIZATIONS: Array<[RegExp, string]> = [
    // AP203: CONFIG_CONTROL_DESIGN → full MIM name (CATIA, older exporters)
    [
        /'CONFIG_CONTROL_DESIGN'\s*\)/g,
        "'AP203_CONFIGURATION_CONTROLLED_3D_DESIGN_OF_MECHANICAL_PARTS_AND_ASSEMBLIES_MIM_LF')",
    ],
    // AP242: strip schema version block that some parsers reject (FreeCAD, etc.)
    [
        /'AP242_MANAGED_MODEL_BASED_3D_ENGINEERING_MIM_LF\.\s*\{[\s\S]*?\}\s*'/g,
        "'AP242_MANAGED_MODEL_BASED_3D_ENGINEERING_MIM_LF'",
    ],
];

/**
 * Loader for STEP, STP, IGES, and IGS CAD files using occt-import-js.
 * Converts OpenCASCADE output to Three.js Object3D hierarchy.
 */
export class STEPLoader {
    private _occt: {
        ReadStepFile: (content: Uint8Array, params: null) => OcctImportResult;
        ReadIgesFile: (content: Uint8Array, params: null) => OcctImportResult;
    } | null = null;

    private async _getOcct(): Promise<{
        ReadStepFile: (content: Uint8Array, params: null) => OcctImportResult;
        ReadIgesFile: (content: Uint8Array, params: null) => OcctImportResult;
    }> {
        if (!this._occt) {
            const [
                occtImportJsModule,
                wasmUrl,
            ] = await Promise.all([
                import('occt-import-js'),
                import('occt-import-js/dist/occt-import-js.wasm?url'),
            ]);
            const occtImportJs = occtImportJsModule.default as (opts?: {
                locateFile?: (path: string) => string;
            }) => Promise<{
                ReadStepFile: (
                    content: Uint8Array,
                    params: null,
                ) => OcctImportResult;
                ReadIgesFile: (
                    content: Uint8Array,
                    params: null,
                ) => OcctImportResult;
            }>;
            this._occt = await occtImportJs({
                locateFile: () => wasmUrl.default,
            });
        }
        return this._occt;
    }

    /**
     * Parse STEP file. Applies schema normalization first for broader format support,
     * then retries with original if normalized parse fails (for edge cases).
     */
    private _parseStepWithFallback(
        occt: {
            ReadStepFile: (
                content: Uint8Array,
                params: null,
            ) => OcctImportResult;
        },
        fileBuffer: Uint8Array,
    ): OcctImportResult {
        const normalized = this._normalizeStepSchema(fileBuffer);
        let result: OcctImportResult;
        try {
            result = occt.ReadStepFile(normalized, null);
            if (result.success && result.root) {
                return result;
            }
        } catch {
            // Normalized parse threw; try original as fallback
        }
        try {
            result = occt.ReadStepFile(fileBuffer, null);
        } catch {
            result = {
                success: false,
                root: { meshes: [], children: [] },
                meshes: [],
            };
        }
        return result;
    }

    /**
     * Normalize STEP FILE_SCHEMA names for broader format compatibility.
     * OCCT expects full MIM names; many CAD exporters use short or versioned names.
     */
    private _normalizeStepSchema(buffer: Uint8Array): Uint8Array {
        const decoder = new TextDecoder('utf-8', { fatal: false });
        const encoder = new TextEncoder();
        let text = decoder.decode(buffer);
        for (const [
            pattern,
            replacement,
        ] of STEP_SCHEMA_NORMALIZATIONS) {
            text = text.replace(pattern, replacement);
        }
        return new Uint8Array(encoder.encode(text));
    }

    /**
     * Parse STEP or IGES file content and return a Three.js Object3D
     */
    public async parse(
        arrayBuffer: ArrayBuffer,
        fileType: 'step' | 'stp' | 'iges' | 'igs',
    ): Promise<Object3D> {
        const occt = await this._getOcct();
        const fileBuffer = new Uint8Array(arrayBuffer);

        let result: OcctImportResult;
        if (fileType === 'step' || fileType === 'stp') {
            result = this._parseStepWithFallback(occt, fileBuffer);
        } else {
            result = occt.ReadIgesFile(fileBuffer, null);
        }

        if (!result.success || !result.root) {
            throw new Error('Failed to parse CAD file');
        }

        return this._buildScene(result);
    }

    private _buildScene(result: OcctImportResult): Object3D {
        const root = new Group();
        root.name = result.root.name ?? 'CAD Model';

        this._buildNode(result.root, result.meshes, root);

        // STEP/OpenCASCADE uses Z-up (CAD convention); Three.js uses Y-up.
        // Rotate -90° around X to convert: (x,y,z) → (x,z,-y)
        root.rotation.x = -Math.PI / 2;

        // Orient so the model's side faces the camera (default view) instead of the back
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
