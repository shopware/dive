import { Object3D } from 'three/webgpu';
import {
    DIVENode,
    DIVERoot,
    type DIVE,
    type DIVESceneObject,
} from '@shopware-ag/dive';
import { type OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { State } from '../State.ts';
import { type ModelSchema } from '../../types/index.ts';

// every action registers itself on import
import '../actions/index.ts';

const loadAsset = vi.fn(async () => {
    const { Object3D } =
        await vi.importActual<typeof import('three/webgpu')>('three/webgpu');
    return new Object3D();
});

vi.mock('@shopware-ag/dive/assetloader', () => ({
    AssetLoader: vi.fn(function (this: Record<string, unknown>) {
        this.load = loadAsset;
        return this;
    }),
}));

/**
 * What a subscriber outside DIVE sees when an object reports about itself.
 *
 * The path this covers is the one a consumer depends on and no unit test spans:
 * a scene object dispatches an event, `watchEntity` turns it into a `dispatch`,
 * and `State.subscribe` hands it to the application. Every piece of it is
 * covered on its own; this asserts they are actually connected, and that the
 * payload is the one consumers already read.
 *
 * Reports go engine -> state, so nothing here runs an action. That is the point:
 * a report used to perform `UPDATE_OBJECT`, which commanded the object that had
 * just moved.
 */

/** Compares a three vector/euler by component, sidestepping -0 vs 0. */
const expectVec = (
    actual: { x: number; y: number; z: number },
    expected: { x: number; y: number; z: number },
): void => {
    expect(actual.x).toBeCloseTo(expected.x);
    expect(actual.y).toBeCloseTo(expected.y);
    expect(actual.z).toBeCloseTo(expected.z);
};

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

describe('plugins/state/State reporting to subscribers', () => {
    let state: State;
    let root: DIVERoot;
    let node: DIVENode;

    /** Adds a model through the real action and returns its scene object. */
    const addModel = async (): Promise<DIVENode> => {
        const added = (await state.performAction(
            'ADD_OBJECT',
            modelData(),
        )) as DIVESceneObject;

        return added as unknown as DIVENode;
    };

    beforeEach(async () => {
        State['__instances'] = [];

        root = new DIVERoot();
        // enough of a scene and a controller for the toolbox to build on, which
        // the selection actions need
        state = new State(
            {
                scene: Object.assign(new Object3D(), { root }),
            } as unknown as DIVE,
            {
                domElement: document.createElement('canvas'),
                object: new Object3D(),
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
            } as unknown as OrbitController,
        );

        node = await addModel();
    });

    it('should put the object in the scene', () => {
        expect(node).toBeInstanceOf(DIVENode);
    });

    describe('a gizmo drag', () => {
        it('should reach an UPDATE_OBJECT subscriber', () => {
            const onUpdate = vi.fn();
            state.subscribe('UPDATE_OBJECT', onUpdate);

            // what dragging the gizmo does: the object reports its own move
            node.position.set(1, 2, 3);
            node.onMove();

            expect(onUpdate).toHaveBeenCalledTimes(1);

            // the payload a consumer already reads: these five keys and no others
            const report = onUpdate.mock.calls[0][0];
            expect(Object.keys(report).sort()).toEqual([
                'entityType',
                'id',
                'position',
                'rotation',
                'scale',
            ]);
            expect(report.id).toBe('model-1');
            expect(report.entityType).toBe('model');
            expect(report.position).toEqual({ x: 1, y: 2, z: 3 });
            // by component: a euler off a matrix carries -0, which deep equality
            // tells apart from 0 and nothing else does
            expectVec(report.rotation, { x: 0, y: 0, z: 0 });
            expectVec(report.scale, { x: 1, y: 1, z: 1 });
        });

        it('should report the world position, not the local one', () => {
            const group = new DIVENode();
            group.position.set(10, 0, 0);
            root.add(group);
            group.attach(node);

            const onUpdate = vi.fn();
            state.subscribe('UPDATE_OBJECT', onUpdate);

            node.position.set(1, 0, 0);
            node.onMove();

            expect(onUpdate).toHaveBeenCalledWith(
                expect.objectContaining({
                    position: expect.objectContaining({ x: 11 }),
                }),
            );
        });

        it('should leave the object where the gizmo put it', () => {
            // a report that ran UPDATE_OBJECT used to write the position back
            // through worldToLocal onto this very node, once per frame
            state.subscribe('UPDATE_OBJECT', vi.fn());

            node.position.set(1, 2, 3);
            node.onMove();

            expect(node.position.toArray()).toEqual([1, 2, 3]);
        });

        it('should keep what GET_STATE reports in step with it', () => {
            node.position.set(4, 5, 6);
            node.onMove();

            const objects = state.performAction('GET_ALL_OBJECTS');

            expect(objects.get('model-1')).toMatchObject({
                position: { x: 4, y: 5, z: 6 },
            });
        });

        it('should stop reporting once the object is deleted', () => {
            const onUpdate = vi.fn();
            state.subscribe('UPDATE_OBJECT', onUpdate);
            state.performAction('DELETE_OBJECT', { id: 'model-1' });
            onUpdate.mockClear();

            node.onMove();

            expect(onUpdate).not.toHaveBeenCalled();
        });
    });

    describe('a selection in the scene', () => {
        it('should reach a SELECT_OBJECT subscriber exactly once', () => {
            const onSelect = vi.fn();
            state.subscribe('SELECT_OBJECT', onSelect);

            node.onSelect();

            expect(onSelect).toHaveBeenCalledTimes(1);
            expect(onSelect).toHaveBeenCalledWith({
                id: 'model-1',
                entityType: 'model',
            });
        });

        it('should reach a DESELECT_OBJECT subscriber exactly once', () => {
            const onDeselect = vi.fn();
            state.subscribe('DESELECT_OBJECT', onDeselect);

            node.onDeselect();

            expect(onDeselect).toHaveBeenCalledTimes(1);
            expect(onDeselect).toHaveBeenCalledWith({
                id: 'model-1',
                entityType: 'model',
            });
        });
    });

    describe('a finished asset load', () => {
        it('should reach a MODEL_LOADED subscriber', () => {
            const onLoaded = vi.fn();
            state.subscribe('MODEL_LOADED', onLoaded);

            node.dispatchEvent({ type: 'object-load' } as never);

            expect(onLoaded).toHaveBeenCalledWith({ id: 'model-1' });
        });

        it('should mark the model loaded in the state', () => {
            node.dispatchEvent({ type: 'object-load' } as never);

            const objects = state.performAction('GET_ALL_OBJECTS');

            expect(objects.get('model-1')).toMatchObject({ loaded: true });
        });
    });

    describe('how many notifications one action produces', () => {
        // One per object that actually changed, and no more. The write path used
        // to go through setPosition, setRotation and setScale, each reporting for
        // itself, on top of the one performAction sends at the end -- so a patch
        // carrying all three transform fields announced itself four times, and a
        // group with two members nineteen.
        const fullPatch = {
            id: 'model-1',
            entityType: 'model' as const,
            position: { x: 7, y: 0, z: 0 },
            rotation: { x: 0, y: 1, z: 0 },
            scale: { x: 2, y: 2, z: 2 },
        };

        /** Adds a group and puts the model in it. */
        const group = async (): Promise<void> => {
            await state.performAction('ADD_OBJECT', {
                id: 'g',
                entityType: 'group',
                name: 'G',
                visible: true,
                parentId: null,
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            } as never);
            await state.performAction('SET_PARENT', {
                object: { id: 'model-1' },
                parent: { id: 'g' },
            });
        };

        it('should send one for a patch carrying position, rotation and scale', async () => {
            const onUpdate = vi.fn();
            state.subscribe('UPDATE_OBJECT', onUpdate);

            await state.performAction('UPDATE_OBJECT', fullPatch);

            expect(onUpdate).toHaveBeenCalledTimes(1);
        });

        it('should send one for a patch carrying nothing but a name', async () => {
            // no transform changes, so nothing reports -- the one performAction
            // sends is what keeps this from going unannounced
            const onUpdate = vi.fn();
            state.subscribe('UPDATE_OBJECT', onUpdate);

            await state.performAction('UPDATE_OBJECT', {
                id: 'model-1',
                entityType: 'model',
                name: 'renamed',
            });

            expect(onUpdate).toHaveBeenCalledTimes(1);
        });

        it('should send one per object when a group moves', async () => {
            await group();
            const reported: string[] = [];
            state.subscribe('UPDATE_OBJECT', (payload) =>
                reported.push((payload as { id: string }).id),
            );

            await state.performAction('UPDATE_OBJECT', {
                id: 'g',
                entityType: 'group',
                position: { x: 5, y: 0, z: 0 },
                rotation: { x: 0, y: 1, z: 0 },
                scale: { x: 2, y: 2, z: 2 },
            } as never);

            // the member moved in world space and is its own entity to a consumer
            expect(reported.sort()).toEqual(['g', 'model-1']);
        });

        it('should send one per object when a group is dragged', async () => {
            await group();
            const reported: string[] = [];
            state.subscribe('UPDATE_OBJECT', (payload) =>
                reported.push((payload as { id: string }).id),
            );

            // what the gizmo does per frame, on the group
            const groupNode = node.parent as DIVENode;
            groupNode.position.set(9, 0, 0);
            groupNode.onMove();

            // the member used to be left out here, so its reported position went
            // stale as soon as anyone dragged the group
            expect(reported.sort()).toEqual(['g', 'model-1']);
        });

        it('should send one when the object is moved directly', async () => {
            const onUpdate = vi.fn();
            state.subscribe('UPDATE_OBJECT', onUpdate);

            node.setPosition({ x: 3, y: 0, z: 0 });

            expect(onUpdate).toHaveBeenCalledTimes(1);
        });
    });

    describe('how many notifications a selection produces', () => {
        // One per object whose selection actually changed. An action used to
        // announce itself twice: `performAction` reports it when it returns, and
        // the object reported it as well, because the action drove the selection
        // through the same call a click does.
        const otherModel = async (): Promise<DIVENode> => {
            const added = (await state.performAction('ADD_OBJECT', {
                ...modelData(),
                id: 'model-2',
            })) as DIVESceneObject;

            return added as unknown as DIVENode;
        };

        let selects: unknown[];
        let deselects: unknown[];

        beforeEach(() => {
            selects = [];
            deselects = [];
            state.subscribe('SELECT_OBJECT', (payload) =>
                selects.push(payload),
            );
            state.subscribe('DESELECT_OBJECT', (payload) =>
                deselects.push(payload),
            );
        });

        it('should send one for a selection through the action', async () => {
            await state.performAction('SELECT_OBJECT', { id: 'model-1' });

            expect(selects).toHaveLength(1);
        });

        it('should send one for a click', async () => {
            const toolbox = await state['getToolbox']();

            toolbox.selectionState.select(node as never);

            expect(selects).toHaveLength(1);
        });

        it('should announce the object a selection displaced', async () => {
            // the only source for that news: nobody asked for it, so the object
            // reports it even on the silent path
            await otherModel();
            await state.performAction('SELECT_OBJECT', { id: 'model-1' });
            selects.length = 0;

            await state.performAction('SELECT_OBJECT', { id: 'model-2' });

            expect(selects).toHaveLength(1);
            expect(deselects).toEqual([{ id: 'model-1', entityType: 'model' }]);
        });

        it('should still send one when the same object is selected again', async () => {
            // SelectionState stops early, so nothing reports -- the one
            // performAction sends is what keeps this from going unanswered
            await state.performAction('SELECT_OBJECT', { id: 'model-1' });
            selects.length = 0;

            await state.performAction('SELECT_OBJECT', { id: 'model-1' });

            expect(selects).toHaveLength(1);
        });

        it('should send one for a deselection through the action', async () => {
            await state.performAction('SELECT_OBJECT', { id: 'model-1' });

            await state.performAction('DESELECT_OBJECT', { id: 'model-1' });

            expect(deselects).toHaveLength(1);
        });

        it('should send one for a click that deselects', async () => {
            const toolbox = await state['getToolbox']();
            toolbox.selectionState.select(node as never);
            deselects.length = 0;

            toolbox.selectionState.deselect();

            expect(deselects).toHaveLength(1);
        });

        it('should still let the gizmo attach on a programmatic selection', async () => {
            // TransformTool listens through onChange, which the silent path fires
            const toolbox = await state['getToolbox']();
            const changes: unknown[] = [];
            toolbox.selectionState.onChange((selected) =>
                changes.push(selected),
            );

            await state.performAction('SELECT_OBJECT', { id: 'model-1' });

            expect(changes).toEqual([node]);
            expect(toolbox.selectionState.selected).toBe(node);
        });
    });

    it('should keep two instances apart', () => {
        // a page may hold more than one DIVE; a report must reach its own state
        const other = new State(
            { scene: { root: new DIVERoot() } } as unknown as DIVE,
            {} as unknown as OrbitController,
        );

        const onOwn = vi.fn();
        const onOther = vi.fn();
        state.subscribe('UPDATE_OBJECT', onOwn);
        other.subscribe('UPDATE_OBJECT', onOther);

        node.onMove();

        expect(onOwn).toHaveBeenCalled();
        expect(onOther).not.toHaveBeenCalled();
    });
});
