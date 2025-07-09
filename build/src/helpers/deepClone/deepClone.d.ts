/**
 * Comprehensive deep clone function that handles class instances, methods, and circular references
 *
 * @example
 * ```typescript
 * // Cloning a simple object
 * const obj = { a: 1, b: { c: 2 } };
 * const cloned = deepClone(obj);
 *
 * // Cloning a class instance
 * class MyClass {
 *   constructor(public value: number) {}
 *   getValue() { return this.value; }
 * }
 * const instance = new MyClass(42);
 * const clonedInstance = deepClone(instance);
 * console.log(clonedInstance.getValue()); // 42
 *
 * // Cloning Three.js Object3D (uses native .clone() method)
 * const object3D = new Object3D();
 * const clonedObject3D = deepClone(object3D);
 *
 * // Handles circular references
 * const circular: any = { name: 'test' };
 * circular.self = circular;
 * const clonedCircular = deepClone(circular); // Won't cause infinite recursion
 * ```
 *
 * @param obj - The object to clone
 * @param visited - Internal WeakMap for tracking circular references
 * @returns A deep clone of the input object
 */
declare function deepClone<T>(obj: T, visited?: WeakMap<WeakKey, any>): T;
export { deepClone };
