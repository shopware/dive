import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { DRACOWorker } from './worker/DracoWorker.js';

const DRACO_LOADER_REGISTRY = {
    LOAD_DRACO_JS_DECODER: async () =>
        (
            await import(
                '../../../../node_modules/three/examples/jsm/libs/draco/draco_decoder.js?raw'
            )
        ).default,
    LOAD_DRACO_WASM_WRAPPER: async () =>
        (
            await import(
                '../../../../node_modules/three/examples/jsm/libs/draco/draco_wasm_wrapper.js?raw'
            )
        ).default,
    LOAD_DRACO_WASM_DECODER: async () => {
        const wasmURL = (
            await import(
                '../../../../node_modules/three/examples/jsm/libs/draco/draco_decoder.wasm?url'
            )
        ).default;
        const response = await fetch(wasmURL);
        return await response.arrayBuffer();
    },
};

export class DracoLoader extends DRACOLoader {
    protected decoderPending: Promise<void> | null = null;
    protected decoderConfig: {
        type: 'js' | 'wasm';
        wasmBinary: ArrayBuffer | null;
    } = {
        type: 'js',
        wasmBinary: null,
    };
    protected workerSourceURL: string = '';

    protected async _initDecoder(): Promise<void> {
        if (this.decoderPending) return this.decoderPending;

        const useJS =
            typeof WebAssembly !== 'object' || this.decoderConfig.type === 'js';

        const librariesPending: Promise<string | ArrayBuffer>[] = [];

        if (useJS) {
            librariesPending.push(
                DRACO_LOADER_REGISTRY.LOAD_DRACO_JS_DECODER(),
            );
        } else {
            librariesPending.push(
                DRACO_LOADER_REGISTRY.LOAD_DRACO_WASM_WRAPPER(),
            );
            librariesPending.push(
                DRACO_LOADER_REGISTRY.LOAD_DRACO_WASM_DECODER(),
            );
        }

        this.decoderPending = Promise.all(librariesPending).then(
            (libraries) => {
                const jsContent = libraries[0];

                if (!useJS) {
                    this.decoderConfig.wasmBinary = libraries[1] as ArrayBuffer;
                }

                const fn = DRACOWorker.toString();

                const body = [
                    '/* draco decoder */',
                    jsContent,
                    '',
                    '/* worker */',
                    fn.substring(fn.indexOf('{') + 1, fn.lastIndexOf('}')),
                ].join('\n');

                this.workerSourceURL = URL.createObjectURL(new Blob([body]));
            },
        );

        return this.decoderPending;
    }
}
