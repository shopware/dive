import { BoxGeometry, Mesh, MeshBasicMaterial, Vector3 } from 'three/webgpu';
import { DIVENode, PRODUCT_LAYER_MASK } from '@shopware-ag/dive';
import { type EngineGateway } from '../../../EngineGateway.ts';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { ComputeEncompassingViewAction } from '../computeencompassingview.ts';

describe('modules/state/actions/camera/computeEncompassingView', () => {
    /** A root with one 2 x 2 x 2 product mesh in it. */
    const makeRoot = (): DIVENode => {
        const mesh = new Mesh(
            new BoxGeometry(2, 2, 2),
            new MeshBasicMaterial(),
        );
        mesh.layers.mask = PRODUCT_LAYER_MASK;

        const root = new DIVENode();
        root.add(mesh);

        return root;
    };

    const makeController = () =>
        ({
            computeEncompassingView: vi.fn().mockReturnValue({
                position: new Vector3(5, 5, 5),
                target: new Vector3(5, 5, 0),
            }),
        }) as unknown as OrbitController;

    it('should compute encompassing view for a scene', async () => {
        const controller = makeController();
        const action = new ComputeEncompassingViewAction(undefined, {
            gateway: { root: makeRoot() } as unknown as EngineGateway,
            controller,
        });

        const result = await action.execute();

        expect(controller.computeEncompassingView).toHaveBeenCalled();
        expect(result).toEqual(
            expect.objectContaining({
                position: expect.objectContaining({ x: 5, y: 5, z: 5 }),
                target: expect.objectContaining({ x: 5, y: 5, z: 0 }),
            }),
        );
    });

    it('should hand over the sphere around the whole scene', async () => {
        /**
         * a sphere, not a bounds component: framing needs a centre and a radius,
         * and a component measures the node it is attached to
         */
        const controller = makeController();
        const action = new ComputeEncompassingViewAction(undefined, {
            gateway: { root: makeRoot() } as unknown as EngineGateway,
            controller,
        });

        await action.execute();

        const sphere = vi.mocked(controller.computeEncompassingView).mock
            .calls[0][0];
        expect(sphere.center.length()).toBeCloseTo(0);
        expect(sphere.radius).toBeCloseTo(Math.sqrt(3));
    });
});
