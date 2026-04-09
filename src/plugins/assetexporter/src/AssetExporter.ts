import { Object3D, Mesh } from 'three/webgpu';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import type { GLTFExporterOptions as THREEGLTFExporterOptions } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { USDZExporter } from 'three/examples/jsm/exporters/USDZExporter.js';
import type { USDZExporterOptions as THREEUSDZExporterOptions } from 'three/examples/jsm/exporters/USDZExporter.js';
import { type FileType } from '../../../types/file/FileTypes.ts';
import { FileTypeError } from '../../../error/file-type/file-type-error.ts';
import { ParseError } from '../../../error/parse/parse-error.ts';

export type USDZExporterOptions = THREEUSDZExporterOptions & {
    ar?: {
        anchoring: { type: 'plane' | 'image' | 'face' | 'none' }; // source: https://developer.apple.com/documentation/realitykit/preliminary-anchoring-type
        planeAnchoring: { alignment: 'horizontal' | 'vertical' | 'any' }; // source: https://developer.apple.com/documentation/arkit/planeanchor
    };
};

export type GLTFExporterOptions = THREEGLTFExporterOptions;

// Map file types to their corresponding exporter options
// CAD formats (step, stp, iges, igs) are import-only - export throws FileTypeError
export type FileTypeToExporterOptions = {
    glb: GLTFExporterOptions;
    gltf: GLTFExporterOptions;
    usdz: USDZExporterOptions;
    step: undefined;
    stp: undefined;
    iges: undefined;
    igs: undefined;
};

export class AssetExporter {
    private _gltfExporter: GLTFExporter;
    private _usdzExporter: USDZExporter;

    constructor() {
        this._gltfExporter = new GLTFExporter();
        this._usdzExporter = new USDZExporter();
    }

    public async export<T extends FileType>(
        object: Object3D,
        type: T,
        options?: FileTypeToExporterOptions[T],
    ): Promise<ArrayBuffer> {
        // ensure normals are computed before export
        this._computeNormals(object);

        switch (type) {
            case 'glb': {
                return this._exportGlb(object, options);
            }
            case 'gltf': {
                return this._exportGltf(object, options);
            }
            case 'usdz': {
                return this._exportUsdz(object, options);
            }
            default:
                throw new FileTypeError(`Unsupported file type: ${type}`, type);
        }
    }

    private async _exportGlb(
        object: Object3D,
        options?: GLTFExporterOptions,
    ): Promise<ArrayBuffer> {
        try {
            const result = await this._gltfExporter.parseAsync(object, {
                animations:
                    object.animations.length > 0
                        ? object.animations
                        : undefined,
                ...options,
                binary: true,
            });
            if (result instanceof ArrayBuffer) {
                return result;
            }
            throw new ParseError('Failed to export GLB: expected ArrayBuffer');
        } catch (error) {
            if (error instanceof ParseError) {
                throw error;
            }
            throw new ParseError('Failed to export GLB', error);
        }
    }

    private async _exportGltf(
        object: Object3D,
        options?: GLTFExporterOptions,
    ): Promise<ArrayBuffer> {
        try {
            const json = await this._gltfExporter.parseAsync(object, {
                animations: object.animations || [],
                ...options,
                binary: false,
            });
            const text = JSON.stringify(json);
            const encoder = new TextEncoder();
            const bytes = encoder.encode(text);
            return bytes.buffer as ArrayBuffer;
        } catch (error) {
            if (error instanceof ParseError) {
                throw error;
            }
            throw new ParseError('Failed to export GLTF', error);
        }
    }

    private async _exportUsdz(
        object: Object3D,
        options?: USDZExporterOptions,
    ): Promise<ArrayBuffer> {
        try {
            const result = await this._usdzExporter.parseAsync(object, options);
            return result.buffer as ArrayBuffer;
        } catch (error) {
            if (error instanceof ParseError) {
                throw error;
            }
            throw new ParseError('Failed to export USDZ', error);
        }
    }

    private _computeNormals(object: Object3D): void {
        object.traverse((child) => {
            if (child instanceof Mesh && child.geometry) {
                if (!child.geometry.getAttribute('normal')) {
                    child.geometry.computeVertexNormals();
                }
            }
        });
    }
}
