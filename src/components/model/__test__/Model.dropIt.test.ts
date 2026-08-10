import {
    BoxGeometry,
    Mesh,
    MeshStandardMaterial,
    Object3D,
} from 'three/webgpu';
import { DIVEModel } from '../Model.ts';
import { DIVEFloor } from '../../floor/Floor.ts';
import { DIVERoot } from '../../root/Root.ts';
import {
    HELPER_LAYER_MASK,
    PRODUCT_LAYER_MASK,
} from '../../../constants/VisibilityLayerMask.ts';

/**
 * Uses real three throughout. The previous grounding tests drove `Box3` through
 * a queue of `mockImplementationOnce` calls, which meant they asserted the order
 * of the mocks rather than where the model actually ends up.
 */

/** Minimal stand-in for DIVEScene: dropIt only needs `isDIVEScene` and `root`. */
class TestScene extends Object3D {
    readonly isDIVEScene: true = true;
    public root = new DIVERoot();

    constructor() {
        super();
        this.add(this.root);
    }
}

/** A 1x1x1 product-layer cube centred on its own origin. */
const createCube = (): Mesh => {
    const mesh = new Mesh(new BoxGeometry(1, 1, 1), new MeshStandardMaterial());
    mesh.layers.mask = PRODUCT_LAYER_MASK;
    return mesh;
};

const createModel = (): DIVEModel => {
    const model = new DIVEModel();
    model.add(createCube());
    return model;
};

describe('dive/model/DIVEModel dropIt', () => {
    let scene: TestScene;
    let model: DIVEModel;

    beforeEach(() => {
        scene = new TestScene();
        model = createModel();
        scene.root.add(model);
        scene.updateMatrixWorld(true);
    });

    it('should warn and do nothing when the model has no parent', () => {
        const detached = createModel();
        console.warn = vi.fn();

        expect(() => detached.dropIt()).not.toThrow();
        expect(console.warn).toHaveBeenCalledTimes(1);
    });

    it('should do nothing when the model is not in a scene', () => {
        const orphanRoot = new Object3D();
        const orphan = createModel();
        orphanRoot.add(orphan);
        orphan.position.set(0, 5, 0);

        orphan.dropIt();

        expect(orphan.position.y).toBe(5);
    });

    it('should drop a floating model onto the ground plane', () => {
        model.position.set(0, 5, 0);
        scene.updateMatrixWorld(true);

        model.dropIt();

        // cube half-height is 0.5, so the origin rests at 0.5
        expect(model.position.y).toBeCloseTo(0.5);
    });

    it('should lift a model that has sunk below the ground plane', () => {
        model.position.set(0, -3, 0);
        scene.updateMatrixWorld(true);

        model.dropIt();

        expect(model.position.y).toBeCloseTo(0.5);
    });

    it('should rest a model on top of another model', () => {
        const other = createModel();
        // occupies y = 0 .. 1
        other.position.set(0, 0.5, 0);
        scene.root.add(other);

        model.position.set(0, 6, 0);
        scene.updateMatrixWorld(true);

        model.dropIt();

        // top of the other cube is at y = 1, plus this cube's half-height
        expect(model.position.y).toBeCloseTo(1.5);
    });

    it('should not drop below the ground plane onto sunken geometry', () => {
        const sunken = createModel();
        // entirely below the floor: y = -5 .. -4
        sunken.position.set(0, -4.5, 0);
        scene.root.add(sunken);

        model.position.set(0, 5, 0);
        scene.updateMatrixWorld(true);

        model.dropIt();

        expect(model.position.y).toBeCloseTo(0.5);
    });

    it('should still land on the ground plane outside the floor extent', () => {
        // the floor plane spans +-500; this is well beyond it
        model.position.set(5000, 5, 0);
        scene.updateMatrixWorld(true);

        model.dropIt();

        expect(model.position.y).toBeCloseTo(0.5);
    });

    it('should not report a move when the model already rests correctly', () => {
        model.position.set(0, 0.5, 0);
        scene.updateMatrixWorld(true);

        const onMove = vi.spyOn(model, 'onMove');
        model.dropIt();

        expect(onMove).not.toHaveBeenCalled();
    });

    it('should report exactly one transform event when it moves', () => {
        model.position.set(0, 5, 0);
        scene.updateMatrixWorld(true);

        const onTransform = vi.fn();
        model.addEventListener('object-transform', onTransform);

        model.dropIt();

        expect(onTransform).toHaveBeenCalledTimes(1);
        expect(onTransform).toHaveBeenCalledWith(
            expect.objectContaining({
                position: expect.objectContaining({ y: expect.closeTo(0.5) }),
            }),
        );
    });

    it('should ignore helper geometry when measuring itself', () => {
        // a helper hanging far below must not drag the model upwards
        const helper = createCube();
        helper.layers.mask = HELPER_LAYER_MASK;
        helper.position.set(0, -10, 0);
        model.add(helper);

        model.position.set(0, 5, 0);
        scene.updateMatrixWorld(true);

        model.dropIt();

        expect(model.position.y).toBeCloseTo(0.5);
    });

    it('should not be blocked by the floor being a raycast target', () => {
        // the floor is on its own layer, so it is never a hit candidate
        const floor = scene.root.floor;
        expect(floor).toBeInstanceOf(DIVEFloor);
        expect(floor.layers.mask & PRODUCT_LAYER_MASK).toBe(0);
    });

    it('should do nothing when the model holds no product geometry', () => {
        const empty = new DIVEModel();
        scene.root.add(empty);
        empty.position.set(0, 5, 0);
        scene.updateMatrixWorld(true);

        empty.dropIt();

        expect(empty.position.y).toBe(5);
    });
});
