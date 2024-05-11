/**
 * Merges two class prototypes to a new one.
 */

export const applyMixins = (derivedCtor: { prototype: object }, constructors: { prototype: object }[]): void => {
    constructors.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            Object.defineProperty(
                derivedCtor.prototype,
                name,
                Object.getOwnPropertyDescriptor(baseCtor.prototype, name)!
            );
        });
    });
}