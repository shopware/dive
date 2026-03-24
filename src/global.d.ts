declare module '*.js';
declare module '*.js?raw' {
    export default raw as string;
}
declare module '*.wasm' {
    export default wasm as string;
}
declare module '*.wasm?url' {
    const url: string;
    export default url;
}
declare module '*.hdr';
declare module '*.hdr?url' {
    const url: string;
    export default url;
}

declare module '*.glsl?raw' {
    export default glsl as string;
}

declare module 'occt-import-js' {
    const occtImportJs: () => Promise<{
        ReadStepFile: (content: Uint8Array, params: null) => unknown;
        ReadIgesFile: (content: Uint8Array, params: null) => unknown;
        ReadBrepFile: (content: Uint8Array, params: null) => unknown;
    }>;
    export default occtImportJs;
}
