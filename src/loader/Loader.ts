import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { USDZLoader } from 'three/examples/jsm/loaders/USDZLoader';
import { Object3D } from 'three';
import { FileType, SUPPORTED_FILE_TYPES } from '../types/file/FileTypes';

export class Loader {
    private _gltfLoader: GLTFLoader;
    private _usdzLoader: USDZLoader;

    constructor() {
        this._gltfLoader = new GLTFLoader();
        this._usdzLoader = new USDZLoader();
    }

    public async load(uri: string): Promise<Object3D> {
        const extension = uri.split('.').pop()?.toLowerCase();
        if (!extension) {
            throw new Error('No file extension found in URI');
        }

        if (!SUPPORTED_FILE_TYPES.includes(extension as FileType)) {
            throw new Error(
                `Unsupported file type: ${extension}. Supported types: ${SUPPORTED_FILE_TYPES.join(', ')}`,
            );
        }

        switch (extension as FileType) {
            case 'glb':
            case 'gltf':
                const gltf = await this._gltfLoader.loadAsync(uri);
                return gltf.scene;
            case 'usdz':
                return await this._usdzLoader.loadAsync(uri);
            default:
                throw new Error(`Unsupported file type: ${extension}`);
        }
    }
}
