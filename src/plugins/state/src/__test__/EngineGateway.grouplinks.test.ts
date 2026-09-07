import { EngineGateway } from '../EngineGateway.ts';
import { Registry } from '../Registry.ts';
import { watchEntity } from '../helpers/watchEntity/watchEntity.ts';
import {
    DIVENode,
    DIVERoot,
    MultiLineComponent,
    type DIVE,
    type DIVESceneObject,
} from '@shopware-ag/dive';
import {
    type EntitySchema,
    type GroupSchema,
    type ModelSchema,
} from '../../types/index.ts';

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
    new EngineGateway({ scene: { root: new DIVERoot() } } as unknown as DIVE);

/** Creates an entity and applies its data, as `ADD_OBJECT` does. */
const addEntity = async (
    gateway: EngineGateway,
    entity: EntitySchema,
): Promise<DIVESceneObject | undefined> => {
    const node = gateway.createEntity(entity);
    if (node) await gateway.applyEntity(node, entity);

    return node;
};

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
        return addEntity(gateway, groupSchema('g')).then(() => {
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
        await addEntity(gateway, groupSchema('g'));

        expect(linesOf('g').lineCount).toBe(0);
    });

    it('should add a line when a member is parented in', async () => {
        await addEntity(gateway, groupSchema('g'));
        await addEntity(gateway, modelSchema('m', 'g'));

        expect(linesOf('g').lineCount).toBe(1);
    });

    it('should not add a line for a member of a plain node', async () => {
        // a model has no line component, so nothing is drawn towards its children
        await addEntity(gateway, modelSchema('parent', null));
        await addEntity(gateway, modelSchema('child', 'parent'));

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
        await addEntity(gateway, groupSchema('g'));
        await addEntity(gateway, modelSchema('m', 'g'));

        await gateway.updateEntity({
            id: 'm',
            entityType: 'model',
            parentId: null,
        });

        expect(linesOf('g').lineCount).toBe(0);
    });

    it('should move the line when a member changes group', async () => {
        await addEntity(gateway, groupSchema('a'));
        await addEntity(gateway, groupSchema('b'));
        await addEntity(gateway, modelSchema('m', 'a'));

        await gateway.updateEntity({
            id: 'm',
            entityType: 'model',
            parentId: 'b',
        });

        expect(linesOf('a').lineCount).toBe(0);
        expect(linesOf('b').lineCount).toBe(1);
    });

    it('should drop the line when a member is deleted', async () => {
        await addEntity(gateway, groupSchema('g'));
        await addEntity(gateway, modelSchema('m', 'g'));

        gateway.removeEntity({ id: 'm', entityType: 'model' });

        expect(linesOf('g').lineCount).toBe(0);
    });

    it('should follow a member that is repositioned by a patch', async () => {
        // the full chain: a patch moves the node, the node reports it, and the
        // report redraws the line. The gateway no longer has to remember to.
        await addEntity(gateway, groupSchema('g'));
        const schema = modelSchema('m', 'g');
        const member = (await addEntity(gateway, schema))!;

        const registry = new Registry();
        registry.register(
            schema,
            member,
            watchEntity(member, schema, { registry, dispatch: vi.fn() }),
        );

        const setLine = vi.spyOn(linesOf('g'), 'setLineFor');

        await gateway.updateEntity({
            id: 'm',
            entityType: 'model',
            position: { x: 5, y: 0, z: 0 },
        });

        expect(setLine).toHaveBeenCalled();
    });

    it('should toggle link visibility through the group schema', async () => {
        await addEntity(gateway, groupSchema('g'));
        await addEntity(gateway, modelSchema('m', 'g'));

        await gateway.updateEntity({
            id: 'g',
            entityType: 'group',
            bbVisible: false,
        });

        expect(linesOf('g').lines.visible).toBe(false);
    });

    it('should forget every scene object on dispose', async () => {
        // there is no line bookkeeping left to forget here — the line component
        // owns which member each line belongs to
        const group = groupSchema('g');
        await addEntity(gateway, group);

        gateway.dispose();

        expect(gateway.findEntity(group)).toBeUndefined();
    });
});
