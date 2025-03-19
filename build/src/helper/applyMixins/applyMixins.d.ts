/**
 * Merges two class prototypes to a new one.
 */
export declare const applyMixins: (derivedCtor: {
    prototype: object;
}, constructors: {
    prototype: object;
}[]) => void;
