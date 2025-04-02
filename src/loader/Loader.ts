import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { USDZLoader } from 'three/examples/jsm/loaders/USDZLoader';
import { Object3D } from 'three';
import { type FileType, SUPPORTED_FILE_TYPES } from '../types';

export class Loader {
    private _gltfLoader: GLTFLoader;
    private _usdzLoader: USDZLoader;

    constructor() {
        this._gltfLoader = new GLTFLoader();
        this._usdzLoader = new USDZLoader();
    }

    public async load(uri: string): Promise<Object3D> {
        const type = this._getFileTypeFromUri(uri);
        return this._load(uri, type);
    }

    private _getFileTypeFromUri(uri: string): FileType {
        const extension = uri.split('.').pop()?.toLowerCase() as FileType;
        if (!extension || !SUPPORTED_FILE_TYPES.includes(extension)) {
            throw new Error(`Unsupported file type: ${extension}`);
        }
        return extension;
    }

    private async _load(uri: string, type: FileType): Promise<Object3D> {
        switch (type) {
            case 'glb':
            case 'gltf': {
                return this._loadGltf(uri);
            }
            case 'usdz': {
                return this._loadUsdz(uri);
            }
        }
    }

    private async _loadGltf(uri: string): Promise<Object3D> {
        const gltf = await this._gltfLoader.loadAsync(uri);
        return gltf.scene;
    }

    private async _loadUsdz(uri: string): Promise<Object3D> {
        return this._usdzLoader.loadAsync(uri);
    }
}
