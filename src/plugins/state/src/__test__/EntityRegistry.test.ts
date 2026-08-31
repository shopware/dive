import { Vector3 } from 'three/webgpu';
import { type DIVESceneObject } from '@shopware-ag/dive';
import { EntityRegistry } from '../EntityRegistry.ts';
import { type EntitySchema, type PartialSchema } from '../../types/index.ts';

const schema = (id: string, overrides: object = {}): EntitySchema =>
    ({
        id,
        entityType: 'model',
        name: id,
        visible: true,
        parentId: null,
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        ...overrides,
    }) as unknown as EntitySchema;

const node = (): DIVESceneObject => ({ name: 'node' }) as DIVESceneObject;

/** A patch as an action builds it: id and entityType, plus what changed. */
const patch = (id: string, changed: object): PartialSchema =>
    ({ id, entityType: 'model', ...changed }) as unknown as PartialSchema;

describe('EntityRegistry', () => {
    let registry: EntityRegistry;

    beforeEach(() => {
        registry = new EntityRegistry();
    });

    describe('read', () => {
        it('should return one entry by id', () => {
            const model = schema('a');
            const sceneObject = node();
            registry.register(model, sceneObject);

            expect(registry.read('a')).toEqual({
                schema: model,
                node: sceneObject,
                unwatch: undefined,
            });
        });

        it('should return undefined for an unknown id', () => {
            expect(registry.read('nope')).toBeUndefined();
        });

        it('should return every entry without an id', () => {
            registry.register(schema('a'));
            registry.register(schema('b'));

            expect(registry.read().map((entry) => entry.schema.id)).toEqual([
                'a',
                'b',
            ]);
        });

        it('should return an empty list while nothing is registered', () => {
            expect(registry.read()).toEqual([]);
        });
    });

    describe('write', () => {
        it('should patch only the given fields', () => {
            registry.register(schema('a', { name: 'before' }));

            registry.write('a', patch('a', { name: 'after' }));

            expect(registry.read('a')?.schema.name).toBe('after');
            expect(registry.read('a')?.schema.visible).toBe(true);
        });

        it('should copy vectors instead of storing the reference', () => {
            registry.register(schema('a'));
            // what the engine hands out: a vector it reuses next frame
            const live = new Vector3(1, 2, 3);

            registry.write('a', patch('a', { position: live }));

            const stored = registry.read('a')?.schema.position;
            expect(stored).toEqual({ x: 1, y: 2, z: 3 });

            live.set(9, 9, 9);
            expect(stored).toEqual({ x: 1, y: 2, z: 3 });
        });

        it('should ignore a write to an unknown id', () => {
            expect(() =>
                registry.write('nope', patch('nope', { name: 'x' })),
            ).not.toThrow();
            expect(registry.size).toBe(0);
        });
    });

    describe('register', () => {
        it('should take an entity without a scene object', () => {
            registry.register(schema('camera'));

            expect(registry.read('camera')?.node).toBeUndefined();
        });

        it('should replace an entry registered under the same id', () => {
            registry.register(schema('a', { name: 'first' }));
            registry.register(schema('a', { name: 'second' }));

            expect(registry.size).toBe(1);
            expect(registry.read('a')?.schema.name).toBe('second');
        });
    });

    describe('unregister', () => {
        it('should drop the entry and report it', () => {
            registry.register(schema('a'));

            expect(registry.unregister('a')).toBe(true);
            expect(registry.read('a')).toBeUndefined();
        });

        it('should run the teardown for the listeners on the node', () => {
            const unwatch = vi.fn();
            registry.register(schema('a'), node(), unwatch);

            registry.unregister('a');

            expect(unwatch).toHaveBeenCalledOnce();
        });

        it('should report an unknown id without throwing', () => {
            expect(registry.unregister('nope')).toBe(false);
        });

        it('should cope with an entry that has no teardown', () => {
            registry.register(schema('a'), node());

            expect(() => registry.unregister('a')).not.toThrow();
        });
    });

    describe('clear', () => {
        it('should drop everything and tear down every listener', () => {
            const first = vi.fn();
            const second = vi.fn();
            registry.register(schema('a'), node(), first);
            registry.register(schema('b'), node(), second);

            registry.clear();

            expect(registry.size).toBe(0);
            expect(first).toHaveBeenCalledOnce();
            expect(second).toHaveBeenCalledOnce();
        });
    });

    describe('size', () => {
        it('should count the registered entities', () => {
            expect(registry.size).toBe(0);

            registry.register(schema('a'));
            expect(registry.size).toBe(1);

            registry.unregister('a');
            expect(registry.size).toBe(0);
        });
    });
});
