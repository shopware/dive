import {
    BoxGeometry,
    Mesh,
    MeshStandardMaterial,
    Object3D,
    Vector3,
} from 'three/webgpu';
import { DIVENode } from '../Node.ts';
import { DIVEComponent } from '../../../components/component/Component.ts';
import { FloorComponent } from '../../../components/mesh/floor/FloorComponent.ts';
import { MeshComponent } from '../../../components/mesh/MeshComponent.ts';
import { ModelComponent } from '../../../components/mesh/model/ModelComponent.ts';
import { DIVEScene } from '../../scene/Scene.ts';
import {
    HELPER_LAYER_MASK,
    PRODUCT_LAYER_MASK,
} from '../../../constants/VisibilityLayerMask.ts';
/**
 * Uses real three throughout. The previous grounding tests drove `Box3` through
 * a queue of `mockImplementationOnce` calls, which meant they asserted the order
 * of the mocks rather than where the model actually ends up.
 */

/**
 * Uses the real DIVEScene rather than a stand-in: `isDIVEScene` is a contract
 * that includes the component tick registry, and a fake carrying the brand
 * without the methods breaks node attachment.
 */
/** A 1x1x1 product-layer cube centred on its own origin. */
const createCube = (): Mesh => {
    const mesh = new Mesh(new BoxGeometry(1, 1, 1), new MeshStandardMaterial());
    mesh.layers.mask = PRODUCT_LAYER_MASK;
    return mesh;
};

const createModel = (): DIVENode => {
    const model = new DIVENode();
    /**
     * a mesh component and the geometry it contributes, exactly as the gateway
     * composes it: the component owns the mesh, the node holds it
     */
    model.addComponent(new ModelComponent());
    model.add(createCube());
    return model;
};
class AlphaComponent extends DIVEComponent {}
class BetaComponent extends DIVEComponent {}
class SpecialAlphaComponent extends AlphaComponent {}

abstract class AbstractBase extends DIVEComponent {}
class ConcreteFromAbstract extends AbstractBase {}

let node: DIVENode;

describe('dive/engine/DIVENode', () => {
    beforeEach(() => {
        node = new DIVENode();
        vi.spyOn(node, 'getWorldPosition').mockImplementation(
            (target?: Vector3) => {
                if (target) return target.copy(node.position);
                return node.position.clone();
            },
        );
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should instantiate', () => {
        expect(node).toBeDefined();
    });

    it('should have mixin properties and methods', () => {
        expect(node.isObject3D).toBe(true);
        expect(node.isMovable).toBe(true);
        expect(node.isSelectable).toBe(true);
    });

    it('should set position', () => {
        const spySet = vi.spyOn(node.position, 'set');
        const spyCopy = vi.spyOn(node.position, 'copy');

        // without a parent, the node should only set it's local position
        node.parent = null;
        expect(() => node.setPosition({ x: 1, y: 2, z: 3 })).not.toThrow();
        expect(spySet).toHaveBeenCalledWith(1, 2, 3);
        expect(spyCopy).not.toHaveBeenCalled();

        // with a parent, the node should set it's position relative to the parent
        spySet.mockClear();
        spyCopy.mockClear();
        node.parent = {
            worldToLocal: vi.fn(() => new Vector3(4, 5, 6)),
            isDIVEGroup: true,
            updateLineTo: vi.fn(),
        } as unknown as DIVENode;
        expect(() => node.setPosition({ x: 4, y: 5, z: 6 })).not.toThrow();
        expect(spySet).not.toHaveBeenCalled();
        expect(spyCopy).toHaveBeenCalledWith(
            expect.objectContaining({ x: 4, y: 5, z: 6 }),
        );
    });

    it('should set rotation', () => {
        expect(() => node.setRotation({ x: 0, y: 0, z: 0 })).not.toThrow();
    });

    it('should set scale', () => {
        expect(() => node.setScale({ x: 1, y: 1, z: 1 })).not.toThrow();
    });

    it('should set visibility', () => {
        expect(() => node.setVisibility(true)).not.toThrow();
    });

    it('should set to world origin', () => {
        node.userData.id = 'something';

        expect(() => node.setToWorldOrigin()).not.toThrow();
        expect(node.position.x).toBe(0);
        expect(node.position.y).toBe(0);
        expect(node.position.z).toBe(0);

        expect(() => node.setToWorldOrigin()).not.toThrow();
    });

    it('should onMove', () => {
        node.userData.id = 'something';
        node.parent = {
            isDIVEGroup: true,
            updateLineTo: vi.fn(),
        } as unknown as DIVENode;

        expect(() => node.onMove()).not.toThrow();

        expect(() => node.onMove()).not.toThrow();
    });

    it('should onSelect', () => {
        node.userData.id = 'something';

        expect(() => node.onSelect()).not.toThrow();

        expect(() => node.onSelect()).not.toThrow();
    });

    it('should onDeselect', () => {
        node.userData.id = 'something';

        expect(() => node.onDeselect()).not.toThrow();

        expect(() => node.onDeselect()).not.toThrow();
    });

    describe('reporting about itself', () => {
        // The engine only states facts; turning them into actions is the state
        // plugin's job, and it subscribes per object.

        it('should report a transform on move', () => {
            const onTransform = vi.fn();
            node.addEventListener('object-transform', onTransform);
            node.position.set(1, 2, 3);

            node.onMove();

            expect(onTransform).toHaveBeenCalledTimes(1);
            expect(onTransform).toHaveBeenCalledWith(
                expect.objectContaining({
                    position: expect.objectContaining({ x: 1, y: 2, z: 3 }),
                    rotation: node.rotation,
                    scale: node.scale,
                }),
            );
        });

        it('should report the world position, not the local one', () => {
            const parent = new DIVENode();
            parent.position.set(10, 0, 0);
            parent.add(node);
            node.position.set(1, 0, 0);
            vi.mocked(node.getWorldPosition).mockRestore();

            const onTransform = vi.fn();
            node.addEventListener('object-transform', onTransform);

            node.onMove();

            expect(onTransform).toHaveBeenCalledWith(
                expect.objectContaining({
                    position: expect.objectContaining({ x: 11 }),
                }),
            );
        });

        it('should report exactly once when moved to the world origin', () => {
            const onTransform = vi.fn();
            node.addEventListener('object-transform', onTransform);

            node.setToWorldOrigin();

            expect(node.position.x).toBe(0);
            expect(onTransform).toHaveBeenCalledTimes(1);
        });

        it('should report selection and deselection', () => {
            const onSelect = vi.fn();
            const onDeselect = vi.fn();
            node.addEventListener('object-select', onSelect);
            node.addEventListener('object-deselect', onDeselect);

            node.onSelect();
            node.onDeselect();

            expect(onSelect).toHaveBeenCalledTimes(1);
            expect(onDeselect).toHaveBeenCalledTimes(1);
        });

        it('should stay silent after the listener is removed', () => {
            const onTransform = vi.fn();
            node.addEventListener('object-transform', onTransform);
            node.removeEventListener('object-transform', onTransform);

            node.onMove();

            expect(onTransform).not.toHaveBeenCalled();
        });
    });

    describe('applyTransform', () => {
        /**
         * The silent write: for a caller that announces the change itself, so it
         * does not get a second report on top of its own.
         */
        let parent: DIVENode;
        let onTransform: ReturnType<typeof vi.fn>;

        beforeEach(() => {
            parent = new DIVENode();
            parent.add(node);
            onTransform = vi.fn();
            node.addEventListener('object-transform', onTransform);
        });

        it('should not report for itself', () => {
            node.applyTransform({
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 0, y: 1, z: 0 },
                scale: { x: 2, y: 2, z: 2 },
            });

            expect(onTransform).not.toHaveBeenCalled();
        });

        it('should write everything the patch carries', () => {
            node.applyTransform({
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 0, y: 1, z: 0 },
                scale: { x: 2, y: 2, z: 2 },
            });

            expect(node.position.toArray()).toEqual([1, 2, 3]);
            expect(node.rotation.y).toBe(1);
            expect(node.scale.toArray()).toEqual([2, 2, 2]);
        });

        it('should leave out what the patch does not carry', () => {
            node.applyTransform({ position: { x: 1, y: 0, z: 0 } });

            expect(node.scale.toArray()).toEqual([1, 1, 1]);
        });

        it('should treat null like absent', () => {
            // a schema may carry null for a field it does not set
            node.applyTransform({
                position: null,
                rotation: null,
                scale: null,
            });

            expect(node.position.toArray()).toEqual([0, 0, 0]);
        });

        it('should convert the position out of world space', () => {
            parent.position.set(10, 0, 0);

            node.applyTransform({ position: { x: 11, y: 0, z: 0 } });

            // the schema speaks world, the node stores local
            expect(node.position.x).toBeCloseTo(1);
        });

        describe('members', () => {
            let member: DIVENode;
            let onMemberTransform: ReturnType<typeof vi.fn>;

            beforeEach(() => {
                member = new DIVENode();
                node.add(member);
                onMemberTransform = vi.fn();
                member.addEventListener('object-transform', onMemberTransform);
            });

            it('should still wake them, because nothing else does', () => {
                node.applyTransform({ position: { x: 10, y: 0, z: 0 } });

                expect(onMemberTransform).toHaveBeenCalledTimes(1);
            });

            it('should wake them once for a patch that changes all three', () => {
                node.applyTransform({
                    position: { x: 10, y: 0, z: 0 },
                    rotation: { x: 0, y: 1, z: 0 },
                    scale: { x: 2, y: 2, z: 2 },
                });

                expect(onMemberTransform).toHaveBeenCalledTimes(1);
            });

            it('should leave them alone when nothing changed', () => {
                node.applyTransform({
                    position: { x: 0, y: 0, z: 0 },
                    scale: { x: 1, y: 1, z: 1 },
                });

                expect(onMemberTransform).not.toHaveBeenCalled();
            });
        });
    });

    describe('reporting a transform it was told to make', () => {
        /**
         * One event for every kind of move: a listener cannot tell a gizmo drag
         * from a setPosition, and does not need to.
         */
        let parent: DIVENode;
        let onTransform: ReturnType<typeof vi.fn>;

        beforeEach(() => {
            parent = new DIVENode();
            parent.add(node);
            onTransform = vi.fn();
            node.addEventListener('object-transform', onTransform);
        });

        it('should report a position it was given', () => {
            node.setPosition({ x: 1, y: 2, z: 3 });

            expect(onTransform).toHaveBeenCalledTimes(1);
        });

        it('should report a rotation it was given', () => {
            node.setRotation({ x: 0, y: 1, z: 0 });

            expect(onTransform).toHaveBeenCalledTimes(1);
        });

        it('should report a scale it was given', () => {
            node.setScale({ x: 2, y: 2, z: 2 });

            expect(onTransform).toHaveBeenCalledTimes(1);
        });

        it('should stay silent when the position does not change', () => {
            /**
             * a patch carrying all three transform fields must not report three
             * moves for one changed value
             */
            node.setPosition({ x: 1, y: 2, z: 3 });
            onTransform.mockClear();

            node.setPosition({ x: 1, y: 2, z: 3 });

            expect(onTransform).not.toHaveBeenCalled();
        });

        it('should stay silent when the rotation does not change', () => {
            node.setRotation({ x: 0, y: 1, z: 0 });
            onTransform.mockClear();

            node.setRotation({ x: 0, y: 1, z: 0 });

            expect(onTransform).not.toHaveBeenCalled();
        });

        it('should stay silent when the scale does not change', () => {
            node.setScale({ x: 2, y: 2, z: 2 });
            onTransform.mockClear();

            node.setScale({ x: 2, y: 2, z: 2 });

            expect(onTransform).not.toHaveBeenCalled();
        });

        it('should stay silent while it has no parent', () => {
            // there is no world position to report yet
            parent.remove(node);

            node.setPosition({ x: 5, y: 5, z: 5 });

            expect(onTransform).not.toHaveBeenCalled();
        });

        describe('members', () => {
            let member: DIVENode;
            let grandMember: DIVENode;
            let onMemberTransform: ReturnType<typeof vi.fn>;
            let onGrandMemberTransform: ReturnType<typeof vi.fn>;

            beforeEach(() => {
                member = new DIVENode();
                grandMember = new DIVENode();
                member.add(grandMember);
                node.add(member);

                onMemberTransform = vi.fn();
                onGrandMemberTransform = vi.fn();
                member.addEventListener('object-transform', onMemberTransform);
                grandMember.addEventListener(
                    'object-transform',
                    onGrandMemberTransform,
                );
            });

            it('should report their new world position when the group moves', () => {
                node.setPosition({ x: 10, y: 0, z: 0 });

                expect(onMemberTransform).toHaveBeenCalledTimes(1);
            });

            it('should report when the group rotates', () => {
                /**
                 * used to fire for setPosition only, so a rotated group left its
                 * members' reported positions stale
                 */
                node.setRotation({ x: 0, y: 1, z: 0 });

                expect(onMemberTransform).toHaveBeenCalledTimes(1);
            });

            it('should report when the group is scaled', () => {
                node.setScale({ x: 2, y: 2, z: 2 });

                expect(onMemberTransform).toHaveBeenCalledTimes(1);
            });

            it('should reach a nested group, not just the first level', () => {
                node.setPosition({ x: 10, y: 0, z: 0 });

                expect(onGrandMemberTransform).toHaveBeenCalledTimes(1);
            });
        });
    });
});
describe('dive/node/DIVENode components', () => {
    let node: DIVENode;

    beforeEach(() => {
        node = new DIVENode();
    });

    describe('addComponent', () => {
        it('should attach the component and return it', () => {
            const component = new AlphaComponent();

            const returned = node.addComponent(component);

            expect(returned).toBe(component);
            expect(node.components).toContain(component);
            // and not into the graph: a component is not an Object3D
            expect(node.children).toHaveLength(0);
        });

        it('should ignore a component it already holds', () => {
            const component = node.addComponent(new AlphaComponent());

            node.addComponent(component);

            expect(node.getComponents(AlphaComponent)).toEqual([component]);
        });

        it('should accept multiple components of the same type', () => {
            const first = node.addComponent(new AlphaComponent());
            const second = node.addComponent(new AlphaComponent());

            expect(node.getComponents(AlphaComponent)).toEqual([first, second]);
        });
    });

    describe('removeComponent', () => {
        it('should detach the component', () => {
            const component = node.addComponent(new AlphaComponent());

            node.removeComponent(component);

            expect(node.components).not.toContain(component);
        });

        it('should ignore a component it does not hold', () => {
            const foreign = new DIVENode().addComponent(new AlphaComponent());

            expect(() => node.removeComponent(foreign)).not.toThrow();
            expect(foreign.owner).not.toBe(node);
        });

        it('should be chainable', () => {
            const component = node.addComponent(new AlphaComponent());

            expect(node.removeComponent(component)).toBe(node);
        });
    });

    describe('registry maintenance', () => {
        it('should hand a component over when another node takes it', () => {
            /**
             * three's `add` used to do the stealing for us by calling
             * `removeFromParent`; addComponent has to do it itself now
             */
            const other = new DIVENode();
            const component = node.addComponent(new AlphaComponent());

            other.addComponent(component);

            expect(node.components).not.toContain(component);
            expect(other.components).toContain(component);
            expect(component.owner).toBe(other);
        });

        it('should not track plain children as components', () => {
            node.add(new Object3D());

            expect(node.components).toHaveLength(0);
        });

        it('should leave no owner behind after removal', () => {
            const component = node.addComponent(new AlphaComponent());

            node.removeComponent(component);

            expect(component.isAttached).toBe(false);
        });
    });

    describe('getComponent', () => {
        it('should find a component by its exact type', () => {
            const component = node.addComponent(new AlphaComponent());
            node.addComponent(new BetaComponent());

            expect(node.getComponent(AlphaComponent)).toBe(component);
        });

        it('should return undefined when absent', () => {
            expect(node.getComponent(AlphaComponent)).toBeUndefined();
        });

        it('should find a subclass through its base class', () => {
            /**
             * this is what lets one code path serve both MeshComponent and
             * PrimitiveComponent
             */
            const component = node.addComponent(new SpecialAlphaComponent());

            expect(node.getComponent(AlphaComponent)).toBe(component);
        });

        it('should find a concrete component through an abstract base', () => {
            const component = node.addComponent(new ConcreteFromAbstract());

            expect(node.getComponent(AbstractBase)).toBe(component);
        });
    });

    describe('getComponents', () => {
        it('should return every match', () => {
            const first = node.addComponent(new AlphaComponent());
            const second = node.addComponent(new SpecialAlphaComponent());
            node.addComponent(new BetaComponent());

            expect(node.getComponents(AlphaComponent)).toEqual([first, second]);
        });

        it('should return an empty array when none match', () => {
            expect(node.getComponents(AlphaComponent)).toEqual([]);
        });
    });

    describe('requireComponent', () => {
        it('should return the component when present', () => {
            const component = node.addComponent(new AlphaComponent());

            expect(node.requireComponent(AlphaComponent)).toBe(component);
        });

        it('should throw a named error when absent', () => {
            node.name = 'MyNode';

            expect(() => node.requireComponent(AlphaComponent)).toThrow(
                /has no AlphaComponent attached/,
            );
            expect(() => node.requireComponent(AlphaComponent)).toThrow(
                /MyNode/,
            );
        });
    });

    describe('nodes', () => {
        it('should report child nodes only', () => {
            const child = new DIVENode();
            node.add(child);
            node.addComponent(new AlphaComponent());
            node.add(new Object3D());

            expect(node.nodes).toEqual([child]);
        });

        it('should be empty for a leaf node', () => {
            node.addComponent(new AlphaComponent());

            expect(node.nodes).toEqual([]);
        });

        it('should stay correct after direct children assignment', () => {
            /**
             * gizmo code and several tests assign `children` directly, which
             * bypasses three's events -- an uncached getter cannot go stale
             */
            const child = new DIVENode();
            node.children = [child, new Object3D()];

            expect(node.nodes).toEqual([child]);
        });
    });

    describe('clear', () => {
        it('should remove child nodes but keep components', () => {
            const component = node.addComponent(new AlphaComponent());
            const child = new DIVENode();
            node.add(child, new Object3D());

            node.clear();

            expect(node.components).toContain(component);
            expect(node.children).not.toContain(child);
        });

        it('should be chainable', () => {
            expect(node.clear()).toBe(node);
        });

        it('should keep what a component contributed', () => {
            // clear() means "drop the child nodes", not "strip the geometry"
            const model = new DIVENode();
            const component = model.addComponent(new ModelComponent());
            const gltf = new Object3D();
            gltf.add(createCube());
            component.setFromGLTF(gltf);
            const contributed = component.contributions[0];

            model.clear();

            expect(model.children).toContain(contributed);
        });
    });

    describe('copy', () => {
        it('should not duplicate components', () => {
            const source = new DIVENode();
            source.addComponent(new AlphaComponent());

            const target = new DIVENode();
            target.addComponent(new AlphaComponent());
            target.copy(source);

            expect(target.getComponents(AlphaComponent)).toHaveLength(1);
        });

        it('should copy child nodes', () => {
            const source = new DIVENode();
            source.add(new DIVENode());

            const target = new DIVENode();
            target.copy(source);

            expect(target.nodes).toHaveLength(1);
        });

        it('should skip children when not recursive', () => {
            const source = new DIVENode();
            source.add(new DIVENode());

            const target = new DIVENode();
            target.copy(source, false);

            expect(target.children).toHaveLength(0);
        });

        it('should not throw when cloning a node with components', () => {
            node.addComponent(new AlphaComponent());

            expect(() => node.clone()).not.toThrow();
        });
    });
});
describe('dive/node/DIVENode dropIt', () => {
    let scene: DIVEScene;
    let model: DIVENode;

    beforeEach(() => {
        scene = new DIVEScene();
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
        expect(floor).toBeInstanceOf(FloorComponent);
        expect(floor.mesh!.layers.mask & PRODUCT_LAYER_MASK).toBe(0);
    });

    it('should do nothing when the model holds no product geometry', () => {
        const empty = new DIVENode();
        scene.root.add(empty);
        empty.position.set(0, 5, 0);
        scene.updateMatrixWorld(true);

        empty.dropIt();

        expect(empty.position.y).toBe(5);
    });
});
