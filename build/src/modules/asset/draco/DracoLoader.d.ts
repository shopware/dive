import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
export declare class DracoLoader extends DRACOLoader {
    protected decoderPending: Promise<void> | null;
    protected decoderConfig: {
        type: 'js' | 'wasm';
        wasmBinary: ArrayBuffer | null;
    };
    protected workerSourceURL: string;
    protected _initDecoder(): Promise<void>;
}
