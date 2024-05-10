import { DRACOLoader, GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";

/**
 * A basic loading manager.
 *
 * @module
 */

export default class DIVELoadingManager {
    private gltfloader: GLTFLoader;
    private dracoloader: DRACOLoader;
    // ... maybe extend with other loaders later

    constructor() {
        this.gltfloader = new GLTFLoader();
        this.dracoloader = new DRACOLoader();
        this.dracoloader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
        this.gltfloader.setDRACOLoader(this.dracoloader);
    }

    private progress: Map<string, number> = new Map<string, number>();

    public async LoadGLTF(uri: string): Promise<GLTF> {
        const progEvent = (p: ProgressEvent<EventTarget>) => {
            this.progress.set(uri, p.loaded / p.total);
        }

        this.progress.set(uri, 0);

        return new Promise<GLTF>((resolve, reject) => {
            this.gltfloader.loadAsync(uri, progEvent).then(resolve).catch(reject);
        })
    }

    public PollProgress(): number {
        let total = 0;
        this.progress.forEach((progress: number) => {
            total += progress;
        });

        if (this.progress.size === 0) return 1;
        return total / this.progress.size;
    }
}