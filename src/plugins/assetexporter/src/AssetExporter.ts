import { Object3D, Mesh } from 'three/webgpu';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import type { GLTFExporterOptions as THREEGLTFExporterOptions } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { USDZExporter } from 'three/examples/jsm/exporters/USDZExporter.js';
import type { USDZExporterOptions as THREEUSDZExporterOptions } from 'three/examples/jsm/exporters/USDZExporter.js';
import { type FileType } from '../../../types/file/FileTypes.ts';
import { FileTypeError } from '../../../error/file-type/file-type-error.ts';
import { ParseError } from '../../../error/parse/parse-error.ts';
import { contributesToBounds } from '../../../helpers/contributesToBounds/contributesToBounds.ts';

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

        /**
         * both exporters honour onlyVisible, so hiding everything that is not
         * real geometry keeps it out of the file
         */
        const restore = this._hideNonProductGeometry(object);

        try {
            return await this._exportByType(object, type, options);
        } finally {
            restore();
        }
    }

    private async _exportByType<T extends FileType>(
        object: Object3D,
        type: T,
        options?: FileTypeToExporterOptions[T],
    ): Promise<ArrayBuffer> {
        switch (type) {
            case 'glb': {
                return this._exportGlb(object, options);
            }
            case 'gltf': {
                return this._exportGltf(object, options);
            }
            case 'usdz': {
                // `options` is FileTypeToExporterOptions[T]; TS can't correlate it
                // with the runtime `type` switch, so narrow to the usdz variant here.
                return this._exportUsdz(
                    object,
                    options as USDZExporterOptions | undefined,
                );
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
                animations: object.animations || [],
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

    /**
     * Temporarily hides every mesh that does not count as real geometry.
     *
     * @returns A function that restores the previous visibility.
     */
    private _hideNonProductGeometry(object: Object3D): () => void {
        const hidden: Object3D[] = [];

        object.traverse((child) => {
            /**
             * only leaves carry geometry, and visible is inherited, so hiding a
             * container would take its whole subtree with it
             */
            if (!(child instanceof Mesh)) return;
            if (contributesToBounds(child)) return;
            if (!child.visible) return;

            child.visible = false;
            hidden.push(child);
        });

        return () => {
            hidden.forEach((child) => {
                child.visible = true;
            });
        };
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
