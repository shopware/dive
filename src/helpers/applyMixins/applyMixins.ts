/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
// A generic constructor type.
type Constructor<T = {}> = new (...args: any[]) => T;

// Converts a union of types to an intersection of types.
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
    k: infer I,
) => void
    ? I
    : never;

// Merges the instance types of the base class and all mixin classes.
type MixedInstance<
    T extends Constructor,
    K extends readonly Constructor[],
> = InstanceType<T> & UnionToIntersection<InstanceType<K[number]>>;

// Recursively flatten the constructor parameter lists for a tuple of constructors.
type FlattenConstructorParams<T extends readonly Constructor[]> =
    T extends readonly [infer First, ...infer Rest]
        ? First extends Constructor
            ? Rest extends readonly Constructor[]
                ? [
                      ...ConstructorParameters<First>,
                      ...FlattenConstructorParams<Rest>,
                  ]
                : ConstructorParameters<First>
            : []
        : [];

// Constructs the mixed constructor type.
// It accepts the parameters of T followed by all the parameters of K and
// produces an instance that is the intersection of the instance types.
type MixedConstructor<
    T extends Constructor,
    K extends readonly Constructor[],
> = new (
    ...args: [...ConstructorParameters<T>, ...FlattenConstructorParams<K>]
) => MixedInstance<T, K>;

/**
 * Applies mixins to a base class.
 *
 * @param derivedCtor Base class constructor
 * @param constructors Additional constructors that get mixed into the base class
 * @returns A mixed constructor with the instance type of the base class and all mixin classes
 * @example
 * ```
 * const SelectableMovableObject3D = applyMixins(Object3D, [DIVESelectable, DIVEMovable]);
 * const instance = new SelectableMovableObject3D();
 * instance.onMove();
 * instance.onSelect();
 * ```
 */
export function applyMixins<
    T extends Constructor,
    K extends readonly Constructor[],
>(derivedCtor: T, constructors: K): MixedConstructor<T, K> {
    constructors.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            if (name === 'constructor') {
                return;
            }
            const descriptor = Object.getOwnPropertyDescriptor(
                baseCtor.prototype,
                name,
            )!;
            Object.defineProperty(derivedCtor.prototype, name, descriptor);
        });
        // Copy default instance properties from mixin to derived class prototype
        const dummyInstance = new (baseCtor as any)();
        Object.getOwnPropertyNames(dummyInstance).forEach((prop) => {
            const descriptor = Object.getOwnPropertyDescriptor(
                dummyInstance,
                prop,
            )!;
            Object.defineProperty(derivedCtor.prototype, prop, descriptor);
        });
    });
    return derivedCtor as unknown as MixedConstructor<T, K>;
}
