import { Object3D } from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { USDZExporter } from 'three/examples/jsm/exporters/USDZExporter';
import {
    type FileType,
    type GLTFExporterOptions,
    type USDZExporterOptions,
    type ExportOptions,
} from '../types';

export class Exporter {
    private _gltfExporter: GLTFExporter;
    private _usdzExporter: USDZExporter;

    constructor() {
        this._gltfExporter = new GLTFExporter();
        this._usdzExporter = new USDZExporter();
    }

    public async export<T extends FileType>(
        object: Object3D,
        type: T,
        options?: ExportOptions<T>,
    ): Promise<ArrayBuffer> {
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
                throw new Error(`Unsupported file type: ${type}`);
        }
    }

    private async _exportGlb(
        object: Object3D,
        options?: GLTFExporterOptions,
    ): Promise<ArrayBuffer> {
        const result = await this._gltfExporter.parseAsync(object, {
            ...options,
            binary: true,
        });
        if (result instanceof ArrayBuffer) {
            return result;
        }
        throw new Error('Failed to export GLB: expected ArrayBuffer');
    }

    private async _exportGltf(
        object: Object3D,
        options?: GLTFExporterOptions,
    ): Promise<ArrayBuffer> {
        const json = await this._gltfExporter.parseAsync(object, {
            ...options,
            binary: false,
        });
        const text = JSON.stringify(json);
        const encoder = new TextEncoder();
        const bytes = encoder.encode(text);
        return bytes.buffer as ArrayBuffer;
    }

    private async _exportUsdz(
        object: Object3D,
        options?: USDZExporterOptions,
    ): Promise<ArrayBuffer> {
        const result = await this._usdzExporter.parse(object, options);
        return result.buffer as ArrayBuffer;
    }
}
