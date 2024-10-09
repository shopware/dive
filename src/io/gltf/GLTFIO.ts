import { GLTFLoader, type GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import { Object3D } from "three";

export class DIVEGLTFIO {

    private _importer: GLTFLoader;

    private _exporter: GLTFExporter;

    constructor() {

        this._importer = new GLTFLoader();

        this._exporter = new GLTFExporter();

    }

    public Import(url: string, onProgress?: (progress: number) => void): Promise<GLTF> {

        return this._importer.loadAsync(url, (progress) => {

            if (!onProgress) return;

            onProgress(progress.loaded / progress.total);

        });

    }

    public Export(object: Object3D, binary: true, onlyVisible: boolean): Promise<ArrayBuffer>;

    public Export(object: Object3D, binary: false, onlyVisible: boolean): Promise<{ [key: string]: unknown }>;

    public Export(object: Object3D, binary: boolean, onlyVisible: boolean): Promise<ArrayBuffer | { [key: string]: unknown }> {

        if (binary) {

            // export as binary ArrayBuffer

            return this._exporter.parseAsync(object, { binary, onlyVisible }) as unknown as Promise<ArrayBuffer>;

        } else {

            // export as JSON object

            return this._exporter.parseAsync(object, { binary, onlyVisible }) as unknown as Promise<{ [key: string]: unknown; }>;

        }

    };

}