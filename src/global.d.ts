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
