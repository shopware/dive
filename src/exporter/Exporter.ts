import { Object3D } from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { USDZExporter } from 'three/examples/jsm/exporters/USDZExporter';
import { type FileType } from '../types';

export class Exporter {
    private _gltfExporter: GLTFExporter;
    private _usdzExporter: USDZExporter;

    constructor() {
        this._gltfExporter = new GLTFExporter();
        this._usdzExporter = new USDZExporter();
    }

    public async export(
        object: Object3D,
        type: FileType,
    ): Promise<ArrayBuffer> {
        switch (type) {
            case 'glb':
                return this._exportGlb(object);
            case 'gltf':
                return this._exportGltf(object);
            case 'usdz':
                return this._exportUsdz(object);
        }
    }

    private async _exportGlb(object: Object3D): Promise<ArrayBuffer> {
        const result = await this._gltfExporter.parseAsync(object, {
            binary: true,
        });
        if (result instanceof ArrayBuffer) {
            return result;
        }
        throw new Error('Failed to export GLB: expected ArrayBuffer');
    }

    private async _exportGltf(object: Object3D): Promise<ArrayBuffer> {
        const json = await this._gltfExporter.parseAsync(object, {
            binary: false,
        });
        const text = JSON.stringify(json);
        const encoder = new TextEncoder();
        const bytes = encoder.encode(text);
        return bytes.buffer as ArrayBuffer;
    }

    private async _exportUsdz(object: Object3D): Promise<ArrayBuffer> {
        const result = await this._usdzExporter.parse(object);
        return result.buffer as ArrayBuffer;
    }
}
