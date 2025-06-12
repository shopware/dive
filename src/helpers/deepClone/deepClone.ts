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
function deepClone<T>(obj: T, visited = new WeakMap()): T {
    // Handle primitive types and null/undefined
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // Handle circular references
    if (visited.has(obj as object)) {
        return visited.get(obj as object) as T;
    }

    // Handle Date objects
    if (obj instanceof Date) {
        return new Date(obj.getTime()) as T;
    }

    // Handle RegExp objects
    if (obj instanceof RegExp) {
        return new RegExp(obj.source, obj.flags) as T;
    }

    // Handle Arrays
    if (Array.isArray(obj)) {
        const clonedArray: unknown[] = [];
        visited.set(obj as object, clonedArray as T);

        for (let i = 0; i < obj.length; i++) {
            clonedArray[i] = deepClone(obj[i], visited);
        }
        return clonedArray as T;
    }

    // Handle Maps
    if (obj instanceof Map) {
        const clonedMap = new Map();
        visited.set(obj as object, clonedMap as T);

        for (const [
            key,
            value,
        ] of obj) {
            clonedMap.set(deepClone(key, visited), deepClone(value, visited));
        }
        return clonedMap as T;
    }

    // Handle Sets
    if (obj instanceof Set) {
        const clonedSet = new Set();
        visited.set(obj as object, clonedSet as T);

        for (const value of obj) {
            clonedSet.add(deepClone(value, visited));
        }
        return clonedSet as T;
    }

    // Handle objects with a clone method (like Three.js objects)
    const objWithClone = obj as Record<string, unknown>;
    if (typeof objWithClone.clone === 'function') {
        const cloned = (objWithClone.clone as () => T)();
        visited.set(obj as object, cloned);
        return cloned;
    }

    // Handle class instances and plain objects
    // Create a new instance with the same prototype (preserves class methods)
    const cloned = Object.create(Object.getPrototypeOf(obj)) as T;
    visited.set(obj as object, cloned);

    // Copy all enumerable and non-enumerable properties
    const propertyNames = Object.getOwnPropertyNames(obj);
    for (const key of propertyNames) {
        const descriptor = Object.getOwnPropertyDescriptor(obj, key);

        if (descriptor) {
            if (descriptor.value !== undefined) {
                // Clone the property value
                const clonedValue = deepClone(descriptor.value, visited);
                Object.defineProperty(cloned, key, {
                    ...descriptor,
                    value: clonedValue,
                });
            } else {
                // Handle getters and setters
                Object.defineProperty(cloned, key, descriptor);
            }
        }
    }

    // Copy symbol properties
    const symbolKeys = Object.getOwnPropertySymbols(obj);
    for (const symbol of symbolKeys) {
        const descriptor = Object.getOwnPropertyDescriptor(obj, symbol);
        if (descriptor) {
            if (descriptor.value !== undefined) {
                const clonedValue = deepClone(descriptor.value, visited);
                Object.defineProperty(cloned, symbol, {
                    ...descriptor,
                    value: clonedValue,
                });
            } else {
                Object.defineProperty(cloned, symbol, descriptor);
            }
        }
    }

    return cloned;
}

export { deepClone };
