import { Object3D, Vector3 } from 'three/webgpu';
import {
    DIVENode,
    MultiLineComponent,
    type DIVESceneObject,
} from '@shopware-ag/dive';
import { watchEntity } from '../watchEntity.ts';
import { EntityRegistry } from '../../../EntityRegistry.ts';
import {
    type EntitySchema,
    type ModelSchema,
} from '../../../../types/index.ts';

/** Fresh per test, because the listeners write into it. */
const modelData = (): ModelSchema => ({
    id: 'model-1',
    entityType: 'model',
    name: 'M',
    visible: true,
    uri: 'a.glb',
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    loaded: false,
    parentId: null,
});

describe('plugins/state/watchEntity', () => {
    let node: Object3D;
    let registry: EntityRegistry;
    let dispatch: ReturnType<typeof vi.fn>;
    let unwatch: () => void;

    /**
     * Dispatches the event for real rather than replaying captured
     * `addEventListener` calls, so this exercises the actual path from the
     * engine to the state.
     */
    const fire = (type: string, payload: object = {}): void => {
        node.dispatchEvent({ type, ...payload } as never);
    };

    /** Watches and registers in the order `ADD_OBJECT` does. */
    const watch = (entity: EntitySchema = modelData()): void => {
        const sceneObject = node as unknown as DIVESceneObject;
        unwatch = watchEntity(sceneObject, entity, { registry, dispatch });
        registry.register(entity, sceneObject, unwatch);
    };

    beforeEach(() => {
        node = new Object3D();
        registry = new EntityRegistry();
        dispatch = vi.fn();
    });

    describe('a reported transform', () => {
        const transform = {
            position: { x: 1, y: 2, z: 3 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
        };

        it('should announce exactly one UPDATE_OBJECT', () => {
            watch();

            fire('object-transform', transform);

            const updates = dispatch.mock.calls.filter(
                (call) => call[0] === 'UPDATE_OBJECT',
            );
            expect(updates).toHaveLength(1);
            expect(updates[0][1]).toEqual({
                id: 'model-1',
                entityType: 'model',
                ...transform,
            });
        });

        it('should write the transform into the schema', () => {
            watch();

            fire('object-transform', transform);

            expect(registry.read('model-1')?.schema).toMatchObject(transform);
        });

        it('should never command the object that reported', () => {
            // this is the whole point of dispatching instead of performing: the
            // position used to travel back onto the node it came from, once per
            // frame of a gizmo drag
            watch();

            fire('object-transform', transform);

            expect(node.position).toEqual(new Vector3(0, 0, 0));
        });

        it('should copy the reported vectors', () => {
            // the object hands out a scratch buffer it overwrites next frame
            watch();
            const live = new Vector3(1, 2, 3);

            fire('object-transform', {
                position: live,
                rotation: live,
                scale: live,
            });

            const sent = dispatch.mock.calls.find(
                (call) => call[0] === 'UPDATE_OBJECT',
            )![1];
            expect(sent.position).not.toBe(live);

            live.set(999, 999, 999);
            expect(sent.position).toEqual({ x: 1, y: 2, z: 3 });
            expect(registry.read('model-1')?.schema.position).toEqual({
                x: 1,
                y: 2,
                z: 3,
            });
        });

        it('should redraw the link to the group it belongs to', () => {
            const group = new DIVENode();
            const lines = group.addComponent(new MultiLineComponent());
            group.add(node);
            watch();

            fire('object-transform', transform);

            expect(lines.hasLineFor(node)).toBe(true);
        });

        it('should leave a parent that draws no lines alone', () => {
            new DIVENode().add(node);
            watch();

            expect(() => fire('object-transform', transform)).not.toThrow();
        });
    });

    describe('a reported selection', () => {
        it('should announce the selection', () => {
            watch();

            fire('object-select');

            expect(dispatch).toHaveBeenCalledWith('SELECT_OBJECT', {
                id: 'model-1',
                entityType: 'model',
            });
        });

        it('should announce the deselection', () => {
            watch();

            fire('object-deselect');

            expect(dispatch).toHaveBeenCalledWith('DESELECT_OBJECT', {
                id: 'model-1',
                entityType: 'model',
            });
        });

        it('should announce every report, without deduplicating', () => {
            // The old code needed a guard here, because SELECT_OBJECT ran
            // selectionState.select(), which called straight back into this
            // listener. Announcing never reaches the toolbox, so two reports
            // mean two selections actually happened.
            watch();

            fire('object-select');
            fire('object-select');

            expect(
                dispatch.mock.calls.filter(
                    (call) => call[0] === 'SELECT_OBJECT',
                ),
            ).toHaveLength(2);
        });
    });

    describe('a reported load', () => {
        it('should announce the load', () => {
            watch();

            fire('object-load');

            expect(dispatch).toHaveBeenCalledWith('MODEL_LOADED', {
                id: 'model-1',
            });
        });

        it('should mark the model loaded', () => {
            watch();

            fire('object-load');

            expect(
                (registry.read('model-1')?.schema as ModelSchema).loaded,
            ).toBe(true);
        });
    });

    describe('the teardown', () => {
        it('should stop every report', () => {
            watch();

            unwatch();

            fire('object-transform', {
                position: { x: 9, y: 9, z: 9 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            });
            fire('object-select');
            fire('object-deselect');
            fire('object-load');

            expect(dispatch).not.toHaveBeenCalled();
        });

        it('should run when the entity is unregistered', () => {
            // how a deleted object stops reporting: the registry holds the
            // teardown and calls it
            watch();

            registry.unregister('model-1');
            fire('object-select');

            expect(dispatch).not.toHaveBeenCalled();
        });
    });
});
