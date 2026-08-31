import { makeActionDeps } from '../../../__test__/actionDeps.ts';
import { type EngineGateway } from '../../../EngineGateway.ts';
import {
    DIVENode,
    ModelComponent,
    type DIVESceneObject,
} from '@shopware-ag/dive';
import { AddObjectAction } from '../addobject.ts';
import { type EntitySchema } from '../../../../types/index.ts';

const testObject: EntitySchema = {
    id: 'test-object',
    entityType: 'model',
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    name: 'Test Object',
    visible: true,
} as unknown as EntitySchema;

describe('AddObjectAction', () => {
    let deps: ReturnType<typeof makeActionDeps>;
    let node: DIVESceneObject;
    let gateway: EngineGateway;

    beforeEach(() => {
        vi.clearAllMocks();
        deps = makeActionDeps();
        /**
         * real, and composed the way the gateway composes a model, so the listeners
         * watchEntity attaches to the ModelComponent actually attach
         */
        const entity = new DIVENode();
        entity.addComponent(new ModelComponent());
        node = entity as unknown as DIVESceneObject;
        gateway = {
            createEntity: vi.fn(() => node),
            applyEntity: vi.fn(),
            removeEntity: vi.fn(),
            refreshParentLink: vi.fn(),
        } as unknown as EngineGateway;
    });

    const run = (payload: EntitySchema = testObject) =>
        new AddObjectAction(payload, { gateway, ...deps }).execute();

    it('should add an object to the scene', async () => {
        const result = await run();

        expect(gateway.createEntity).toHaveBeenCalledWith(testObject);
        expect(gateway.applyEntity).toHaveBeenCalledWith(node, testObject);
        expect(result).toBe(node);
    });

    it('should register the object together with its scene object', async () => {
        await run();

        expect(deps.registry.read('test-object')).toMatchObject({
            schema: testObject,
            node,
        });
    });

    it('should default a missing parentId to null', async () => {
        const orphan = { ...testObject } as Record<string, unknown>;
        delete orphan.parentId;

        await run(orphan as EntitySchema);

        expect(deps.registry.read('test-object')?.schema.parentId).toBeNull();
    });

    it('should register and listen before the data is applied', async () => {
        /**
         * applying a model awaits the asset load, and `object-load` fires inside
         * it — so both have to be in place before applyEntity is called
         */
        let seenDuringApply:
            { registered: boolean; watched: boolean } | undefined;
        vi.mocked(gateway.applyEntity).mockImplementation(async () => {
            const entry = deps.registry.read('test-object');
            seenDuringApply = {
                registered: entry !== undefined,
                // the teardown only exists once listeners are attached
                watched: typeof entry?.unwatch === 'function',
            };
        });

        await run();

        expect(seenDuringApply).toEqual({ registered: true, watched: true });
    });

    it('should not add an object if it already exists', async () => {
        deps.registry.register(testObject, node);

        const result = await run();

        expect(gateway.createEntity).not.toHaveBeenCalled();
        expect(result).toBe(node);
    });

    it('should register a state-only entity without a scene object', async () => {
        // a camera: createEntity has nothing to put in the scene
        vi.mocked(gateway.createEntity).mockReturnValue(undefined);

        const result = await run();

        expect(result).toBeUndefined();
        expect(deps.registry.read('test-object')?.node).toBeUndefined();
        expect(gateway.applyEntity).not.toHaveBeenCalled();
    });

    it('should leave nothing behind when applying fails', async () => {
        /**
         * a failed asset load used to leave a registered schema whose object was
         * never finished
         */
        const failure = new Error('asset load failed');
        vi.mocked(gateway.applyEntity).mockRejectedValue(failure);

        await expect(run()).rejects.toThrow(failure);

        expect(deps.registry.read('test-object')).toBeUndefined();
        expect(gateway.removeEntity).toHaveBeenCalledWith(testObject);
    });
});
