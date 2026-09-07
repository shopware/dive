import { EngineGateway } from '../EngineGateway.ts';
import {
    DIVENode,
    DIVERoot,
    MultiLineComponent,
    type DIVE,
} from '@shopware-ag/dive';
import { type State } from '../State.ts';
import { type GroupSchema, type ModelSchema } from '../../types/index.ts';

/**
 * Group links are a state-level concept: the engine only knows that some node
 * carries a `MultiLineComponent`. The knowledge that a member gets a line from
 * its parent's origin lives in the gateway, so it is tested here rather than in
 * a component test.
 */

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

const makeGateway = (): EngineGateway =>
    new EngineGateway(
        { scene: { root: new DIVERoot() } } as unknown as DIVE,
        { performAction: vi.fn() } as unknown as State,
    );

const groupSchema = (id: string): GroupSchema =>
    ({
        id,
        entityType: 'group',
        name: id,
        visible: true,
    }) as GroupSchema;

const modelSchema = (id: string, parentId: string | null): ModelSchema =>
    ({
        id,
        entityType: 'model',
        name: id,
        visible: true,
        uri: 'a.glb',
        position: { x: 1, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        loaded: false,
        parentId,
    }) as ModelSchema;

describe('plugins/state/EngineGateway group links', () => {
    let gateway: EngineGateway;

    beforeEach(() => {
        vi.clearAllMocks();
        gateway = makeGateway();
    });

    const linesOf = (id: string): MultiLineComponent =>
        (
            gateway.findEntity({ id, entityType: 'group' }) as DIVENode
        ).requireComponent(MultiLineComponent);

    it('should give a group nothing but a line component', () => {
        return gateway.addEntity(groupSchema('g')).then(() => {
            const group = gateway.findEntity({
                id: 'g',
                entityType: 'group',
            }) as DIVENode;

            // no group-aware component exists in the engine at all
            expect(group.components).toHaveLength(1);
            expect(group.components[0]).toBeInstanceOf(MultiLineComponent);
        });
    });

    it('should draw no line while the group is empty', async () => {
        await gateway.addEntity(groupSchema('g'));

        expect(linesOf('g').lineCount).toBe(0);
    });

    it('should add a line when a member is parented in', async () => {
        await gateway.addEntity(groupSchema('g'));
        await gateway.addEntity(modelSchema('m', 'g'));

        expect(linesOf('g').lineCount).toBe(1);
    });

    it('should not add a line for a member of a plain node', async () => {
        // a model has no line component, so nothing is drawn towards its children
        await gateway.addEntity(modelSchema('parent', null));
        await gateway.addEntity(modelSchema('child', 'parent'));

        expect(() =>
            (
                gateway.findEntity({
                    id: 'parent',
                    entityType: 'model',
                }) as DIVENode
            ).requireComponent(MultiLineComponent),
        ).toThrow();
    });

    it('should drop the line when a member is moved to the root', async () => {
        await gateway.addEntity(groupSchema('g'));
        await gateway.addEntity(modelSchema('m', 'g'));

        await gateway.updateEntity({
            id: 'm',
            entityType: 'model',
            parentId: null,
        });

        expect(linesOf('g').lineCount).toBe(0);
    });

    it('should move the line when a member changes group', async () => {
        await gateway.addEntity(groupSchema('a'));
        await gateway.addEntity(groupSchema('b'));
        await gateway.addEntity(modelSchema('m', 'a'));

        await gateway.updateEntity({
            id: 'm',
            entityType: 'model',
            parentId: 'b',
        });

        expect(linesOf('a').lineCount).toBe(0);
        expect(linesOf('b').lineCount).toBe(1);
    });

    it('should drop the line when a member is deleted', async () => {
        await gateway.addEntity(groupSchema('g'));
        await gateway.addEntity(modelSchema('m', 'g'));

        gateway.removeEntity({ id: 'm', entityType: 'model' });

        expect(linesOf('g').lineCount).toBe(0);
    });

    it('should follow a member that is repositioned by a patch', async () => {
        await gateway.addEntity(groupSchema('g'));
        await gateway.addEntity(modelSchema('m', 'g'));
        const setLine = vi.spyOn(linesOf('g'), 'setLine');

        await gateway.updateEntity({
            id: 'm',
            entityType: 'model',
            position: { x: 5, y: 0, z: 0 },
        });

        expect(setLine).toHaveBeenCalled();
    });

    it('should follow a member that reports a transform itself', async () => {
        await gateway.addEntity(groupSchema('g'));
        await gateway.addEntity(modelSchema('m', 'g'));
        const member = gateway.findEntity({
            id: 'm',
            entityType: 'model',
        }) as DIVENode;
        const setLine = vi.spyOn(linesOf('g'), 'setLine');

        // this is the gizmo path: the object reports its own move
        member.position.set(4, 0, 0);
        member.onMove();

        expect(setLine).toHaveBeenCalled();
    });

    it('should toggle link visibility through the group schema', async () => {
        await gateway.addEntity(groupSchema('g'));
        await gateway.addEntity(modelSchema('m', 'g'));

        await gateway.updateEntity({
            id: 'g',
            entityType: 'group',
            bbVisible: false,
        });

        expect(linesOf('g').lines.visible).toBe(false);
    });

    it('should forget its bookkeeping on dispose', async () => {
        await gateway.addEntity(groupSchema('g'));
        await gateway.addEntity(modelSchema('m', 'g'));

        gateway.dispose();

        expect(
            (gateway as unknown as { _lineHandles: Map<unknown, unknown> })
                ._lineHandles.size,
        ).toBe(0);
    });
});
