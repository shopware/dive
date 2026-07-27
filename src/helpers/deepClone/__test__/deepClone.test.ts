import { describe, it, expect, vi } from 'vitest';
import { deepClone } from '../deepClone.ts';
import { Object3D } from 'three/webgpu';

describe('deepClone', () => {
    describe('primitive types', () => {
        it('should return null for null', () => {
            expect(deepClone(null)).toBe(null);
        });

        it('should return undefined for undefined', () => {
            expect(deepClone(undefined)).toBe(undefined);
        });

        it('should return the same string', () => {
            const str = 'hello world';
            expect(deepClone(str)).toBe(str);
        });

        it('should return the same number', () => {
            const num = 42;
            expect(deepClone(num)).toBe(num);
        });

        it('should return the same boolean', () => {
            const bool = true;
            expect(deepClone(bool)).toBe(bool);
        });

        it('should return the same symbol', () => {
            const sym = Symbol('test');
            expect(deepClone(sym)).toBe(sym);
        });
    });

    describe('simple objects', () => {
        it('should clone a simple object', () => {
            const obj = { a: 1, b: 'hello', c: true };
            const cloned = deepClone(obj);

            expect(cloned).toEqual(obj);
            expect(cloned).not.toBe(obj);
        });

        it('should clone nested objects', () => {
            const obj = {
                a: 1,
                b: {
                    c: 2,
                    d: {
                        e: 'deep',
                    },
                },
            };
            const cloned = deepClone(obj);

            expect(cloned).toEqual(obj);
            expect(cloned).not.toBe(obj);
            expect(cloned.b).not.toBe(obj.b);
            expect(cloned.b.d).not.toBe(obj.b.d);
        });
    });

    describe('arrays', () => {
        it('should clone a simple array', () => {
            const arr = [1, 2, 3, 'hello'];
            const cloned = deepClone(arr);

            expect(cloned).toEqual(arr);
            expect(cloned).not.toBe(arr);
        });

        it('should clone nested arrays', () => {
            const arr: (number | (number | number[])[])[] = [
                1,
                [2, 3],
                [4, [5, 6]],
            ];
            const cloned = deepClone(arr);

            expect(cloned).toEqual(arr);
            expect(cloned).not.toBe(arr);
            expect(cloned[1]).not.toBe(arr[1]);
            expect(cloned[2]).not.toBe(arr[2]);
            expect((cloned[2] as number[])[1]).not.toBe(
                (arr[2] as number[])[1],
            );
        });

        it('should clone arrays with objects', () => {
            const arr = [{ a: 1 }, { b: 2 }];
            const cloned = deepClone(arr);

            expect(cloned).toEqual(arr);
            expect(cloned).not.toBe(arr);
            expect(cloned[0]).not.toBe(arr[0]);
            expect(cloned[1]).not.toBe(arr[1]);
        });
    });

    describe('Date objects', () => {
        it('should clone Date objects', () => {
            const date = new Date('2023-01-01');
            const cloned = deepClone(date);

            expect(cloned).toEqual(date);
            expect(cloned).not.toBe(date);
            expect(cloned.getTime()).toBe(date.getTime());
        });
    });

    describe('RegExp objects', () => {
        it('should clone RegExp objects', () => {
            const regex = /test/gi;
            const cloned = deepClone(regex);

            expect(cloned).toEqual(regex);
            expect(cloned).not.toBe(regex);
            expect(cloned.source).toBe(regex.source);
            expect(cloned.flags).toBe(regex.flags);
        });
    });

    describe('Map objects', () => {
        it('should clone Map objects', () => {
            const map = new Map<string, string | { nested: string }>([
                ['key1', 'value1'],
                ['key2', { nested: 'value' }],
            ]);
            const cloned = deepClone(map);

            expect(cloned).not.toBe(map);
            expect(cloned.size).toBe(map.size);
            expect(cloned.get('key1')).toBe('value1');
            expect(cloned.get('key2')).toEqual({ nested: 'value' });
            expect(cloned.get('key2')).not.toBe(map.get('key2'));
        });
    });

    describe('Set objects', () => {
        it('should clone Set objects', () => {
            const set = new Set([1, 'hello', { nested: 'value' }]);
            const cloned = deepClone(set);

            expect(cloned).not.toBe(set);
            expect(cloned.size).toBe(set.size);
            expect(cloned.has(1)).toBe(true);
            expect(cloned.has('hello')).toBe(true);

            // Check that nested objects are cloned
            const originalObj = Array.from(set).find(
                (item) => typeof item === 'object',
            ) as any;
            const clonedObj = Array.from(cloned).find(
                (item) => typeof item === 'object',
            ) as any;
            expect(clonedObj).toEqual(originalObj);
            expect(clonedObj).not.toBe(originalObj);
        });
    });

    describe('objects with clone method', () => {
        it('should use native clone method when available', () => {
            const mockClone = vi.fn().mockReturnValue({ cloned: true });
            const objWithClone = {
                value: 'test',
                clone: mockClone,
            };

            const cloned = deepClone(objWithClone);

            expect(mockClone).toHaveBeenCalledOnce();
            expect(cloned).toEqual({ cloned: true });
        });
    });

    describe('class instances', () => {
        class TestClass {
            constructor(
                public value: number,
                public name: string,
            ) {}

            getValue(): number {
                return this.value;
            }

            getName(): string {
                return this.name;
            }

            getFullInfo(): string {
                return `${this.name}: ${this.value}`;
            }
        }

        it('should clone class instances with methods', () => {
            const original = new TestClass(42, 'test');
            const cloned = deepClone(original);

            expect(cloned).not.toBe(original);
            expect(cloned.value).toBe(42);
            expect(cloned.name).toBe('test');
            expect(cloned.getValue()).toBe(42);
            expect(cloned.getName()).toBe('test');
            expect(cloned.getFullInfo()).toBe('test: 42');
            expect(cloned instanceof TestClass).toBe(true);
        });

        it('should clone nested class instances', () => {
            class NestedClass {
                constructor(public inner: TestClass) {}
                getInnerValue() {
                    return this.inner.getValue();
                }
            }

            const inner = new TestClass(100, 'inner');
            const nested = new NestedClass(inner);
            const cloned = deepClone(nested);

            expect(cloned).not.toBe(nested);
            expect(cloned.inner).not.toBe(nested.inner);
            expect(cloned.inner instanceof TestClass).toBe(true);
            expect(cloned.getInnerValue()).toBe(100);
            expect(cloned.inner.getName()).toBe('inner');
        });

        it('should clone Object3D (three)', () => {
            const object3D = new Object3D();
            const cloned = deepClone(object3D);

            expect(cloned).not.toBe(object3D);
            expect(cloned.position.equals(object3D.position)).toBe(true);
            expect(cloned.rotation.equals(object3D.rotation)).toBe(true);
            expect(cloned.scale.equals(object3D.scale)).toBe(true);
        });
    });

    describe('circular references', () => {
        it('should handle circular references without infinite recursion', () => {
            const obj: any = { name: 'test' };
            obj.self = obj;
            obj.nested = { parent: obj };

            const cloned = deepClone(obj);

            expect(cloned).not.toBe(obj);
            expect(cloned.name).toBe('test');
            expect(cloned.self).toBe(cloned);
            expect(cloned.nested.parent).toBe(cloned);
        });

        it('should handle circular references in arrays', () => {
            const arr: any[] = [1, 2];
            arr.push(arr);

            const cloned = deepClone(arr);

            expect(cloned).not.toBe(arr);
            expect(cloned[0]).toBe(1);
            expect(cloned[1]).toBe(2);
            expect(cloned[2]).toBe(cloned);
        });
    });

    describe('property descriptors', () => {
        it('should preserve property descriptors', () => {
            const obj = {};
            Object.defineProperty(obj, 'nonEnumerable', {
                value: 'hidden',
                writable: true,
                enumerable: false,
                configurable: true,
            });

            const cloned = deepClone(obj);
            const descriptor = Object.getOwnPropertyDescriptor(
                cloned,
                'nonEnumerable',
            );

            expect(descriptor).toBeDefined();
            expect(descriptor!.value).toBe('hidden');
            expect(descriptor!.enumerable).toBe(false);
            expect(descriptor!.writable).toBe(true);
            expect(descriptor!.configurable).toBe(true);
        });

        it('should handle getters and setters', () => {
            const obj = {
                _value: 0,
                get value() {
                    return this._value;
                },
                set value(val: number) {
                    this._value = val;
                },
            };

            obj.value = 42;
            const cloned = deepClone(obj);

            expect(cloned.value).toBe(42);
            cloned.value = 100;
            expect(cloned.value).toBe(100);
            expect(obj.value).toBe(42); // Original unchanged
        });
    });

    describe('symbol properties', () => {
        it('should clone symbol properties', () => {
            const sym = Symbol('test');
            const obj = {
                regular: 'value',
                [sym]: 'symbol value',
            };

            const cloned = deepClone(obj);

            expect(cloned).not.toBe(obj);
            expect(cloned.regular).toBe('value');
            expect(cloned[sym]).toBe('symbol value');
            expect(Object.getOwnPropertySymbols(cloned)).toContain(sym);
        });

        it('should clone symbol properties with getters and setters', () => {
            const sym = Symbol('accessor');
            const obj = {
                _symbolValue: 'initial',
            };

            // Define a symbol property with getter and setter
            Object.defineProperty(obj, sym, {
                get() {
                    return this._symbolValue;
                },
                set(value: string) {
                    this._symbolValue = value;
                },
                enumerable: true,
                configurable: true,
            });

            // Test the original
            (obj as any)[sym] = 'changed';
            expect((obj as any)[sym]).toBe('changed');

            const cloned = deepClone(obj);

            expect(cloned).not.toBe(obj);
            expect(Object.getOwnPropertySymbols(cloned)).toContain(sym);

            // Test that getter/setter works on clone
            expect((cloned as any)[sym]).toBe('changed');
            (cloned as any)[sym] = 'cloned value';
            expect((cloned as any)[sym]).toBe('cloned value');

            // Verify original is unchanged
            expect((obj as any)[sym]).toBe('changed');

            // Verify the property descriptor is preserved
            const descriptor = Object.getOwnPropertyDescriptor(cloned, sym);
            expect(descriptor).toBeDefined();
            expect(typeof descriptor!.get).toBe('function');
            expect(typeof descriptor!.set).toBe('function');
            expect(descriptor!.enumerable).toBe(true);
            expect(descriptor!.configurable).toBe(true);
        });
    });

    describe('complex nested structures', () => {
        it('should clone complex nested structures', () => {
            class ComplexClass {
                constructor(public data: any) {}
                process() {
                    return this.data.values.map((v: number) => v * 2);
                }
            }

            const complex = {
                string: 'hello',
                number: 42,
                boolean: true,
                date: new Date('2023-01-01'),
                regex: /test/gi,
                array: [1, 2, { nested: true }],
                map: new Map([['key', 'value']]),
                set: new Set([1, 2, 3]),
                instance: new ComplexClass({
                    values: [1, 2, 3],
                }),
                nested: {
                    deep: {
                        deeper: {
                            value: 'very deep',
                        },
                    },
                },
            };

            const cloned = deepClone(complex);

            // Verify structure
            expect(cloned).toEqual(complex);
            expect(cloned).not.toBe(complex);

            // Verify all nested objects are different instances
            expect(cloned.date).not.toBe(complex.date);
            expect(cloned.array).not.toBe(complex.array);
            expect(cloned.map).not.toBe(complex.map);
            expect(cloned.set).not.toBe(complex.set);
            expect(cloned.instance).not.toBe(complex.instance);
            expect(cloned.nested).not.toBe(complex.nested);

            // Verify functionality is preserved
            expect(cloned.instance.process()).toEqual([2, 4, 6]);
            expect(cloned.instance instanceof ComplexClass).toBe(true);
        });
    });
});
