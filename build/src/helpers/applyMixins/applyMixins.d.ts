type Constructor<T = {}> = new (...args: any[]) => T;
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
type MixedInstance<T extends Constructor, K extends readonly Constructor[]> = InstanceType<T> & UnionToIntersection<InstanceType<K[number]>>;
type FlattenConstructorParams<T extends readonly Constructor[]> = T extends readonly [infer First, ...infer Rest] ? First extends Constructor ? Rest extends readonly Constructor[] ? [
    ...ConstructorParameters<First>,
    ...FlattenConstructorParams<Rest>
] : ConstructorParameters<First> : [] : [];
type MixedConstructor<T extends Constructor, K extends readonly Constructor[]> = new (...args: [...ConstructorParameters<T>, ...FlattenConstructorParams<K>]) => MixedInstance<T, K>;
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
export declare function applyMixins<T extends Constructor, K extends readonly Constructor[]>(derivedCtor: T, constructors: K): MixedConstructor<T, K>;
export {};
