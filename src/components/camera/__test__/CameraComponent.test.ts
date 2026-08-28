import { Camera, Object3D, Quaternion, Vector3 } from 'three/webgpu';
import { DIVECameraComponent } from '../CameraComponent.ts';
import { DIVENode } from '../../../engine/node/Node.ts';
import { findComponent } from '../../../engine/component/Component.ts';
import {
    COORDINATE_LAYER_MASK,
    DEFAULT_LAYER_MASK,
    FLOOR_LAYER_MASK,
    HELPER_LAYER_MASK,
    PRODUCT_LAYER_MASK,
    PROXY_LAYER_MASK,
    UI_LAYER_MASK,
} from '../../../constants/VisibilityLayerMask.ts';

/**
 * The smallest thing the base class can be tested through.
 *
 * Carries a plain `Camera`, not a perspective one: the base is meant to hold any
 * kind, and a stand-in built from the least specific camera three has is what
 * proves it. Zero-argument constructor, so `clone()` works.
 */
class TestCameraComponent extends DIVECameraComponent {
    constructor() {
        super(new Camera());
    }

    public onResize(): void {}
}

const attached = (): TestCameraComponent =>
    new DIVENode().addComponent(new TestCameraComponent());

/** The direction the camera looks in world space -- a camera looks down its -Z. */
const worldViewDirection = (component: DIVECameraComponent): Vector3 => {
    component.owner.updateMatrixWorld(true);

    return new Vector3(0, 0, -1)
        .applyQuaternion(component.camera.getWorldQuaternion(new Quaternion()))
        .normalize();
};

describe('dive/camera/DIVECameraComponent', () => {
    it('should brand itself', () => {
        expect(new TestCameraComponent().isDIVECameraComponent).toBe(true);
    });

    it('should hand out the camera it was given', () => {
        const camera = new Camera();

        class Given extends DIVECameraComponent {
            constructor() {
                super(camera);
            }
            public onResize(): void {}
        }

        expect(new Given().camera).toBe(camera);
    });

    it('should contribute its camera to the node', () => {
        /**
         * a component holds a camera and puts it on the node, because three
         * only updates a camera's world matrix itself while it has no parent
         */
        const node = new DIVENode();
        const component = node.addComponent(new TestCameraComponent());

        expect(component.contributions).toEqual([component.camera]);
        expect(component.camera.parent).toBe(node);
    });

    it('should give a clone its own camera', () => {
        const source = new TestCameraComponent();

        const copy = source.clone();

        expect(copy.contributions).toEqual([copy.camera]);
        expect(copy.camera).not.toBe(source.camera);
    });

    it('should be findable from the camera it owns', () => {
        /**
         * whoever only holds a camera -- an OrbitController hands out
         * `controller.object` -- has to be able to get back to the component
         */
        const component = new TestCameraComponent();

        expect(findComponent(component.camera, DIVECameraComponent)).toBe(
            component,
        );
    });

    it('should report nothing for a camera nobody wrapped', () => {
        expect(
            findComponent(new Camera(), DIVECameraComponent),
        ).toBeUndefined();
    });

    describe('camera layers', () => {
        it('should start out showing the editor view', () => {
            expect(new TestCameraComponent().camera.layers.mask).toBe(
                DIVECameraComponent.EDITOR_VIEW_LAYER_MASK,
            );
        });

        it('should switch to the live view and report it', () => {
            const component = new TestCameraComponent();
            const onSetCameraLayer = vi.fn();
            component.onSetCameraLayer = onSetCameraLayer;

            component.setCameraLayer('LIVE');

            expect(component.camera.layers.mask).toBe(
                DIVECameraComponent.LIVE_VIEW_LAYER_MASK,
            );
            expect(onSetCameraLayer).toHaveBeenCalledWith(
                DIVECameraComponent.LIVE_VIEW_LAYER_MASK,
            );
        });

        it('should switch back to the editor view and report it', () => {
            const component = new TestCameraComponent();
            const onSetCameraLayer = vi.fn();
            component.onSetCameraLayer = onSetCameraLayer;

            component.setCameraLayer('LIVE');
            component.setCameraLayer('EDITOR');

            expect(component.camera.layers.mask).toBe(
                DIVECameraComponent.EDITOR_VIEW_LAYER_MASK,
            );
            expect(onSetCameraLayer).toHaveBeenLastCalledWith(
                DIVECameraComponent.EDITOR_VIEW_LAYER_MASK,
            );
        });

        it('should have a report nobody has to subscribe to', () => {
            expect(() =>
                new TestCameraComponent().setCameraLayer('LIVE'),
            ).not.toThrow();
        });

        it('should compose the editor mask from every layer but the display', () => {
            expect(DIVECameraComponent.EDITOR_VIEW_LAYER_MASK).toBe(
                DEFAULT_LAYER_MASK |
                    UI_LAYER_MASK |
                    HELPER_LAYER_MASK |
                    PRODUCT_LAYER_MASK |
                    PROXY_LAYER_MASK |
                    FLOOR_LAYER_MASK,
            );
        });

        it('should keep the live mask to content and ground', () => {
            expect(DIVECameraComponent.LIVE_VIEW_LAYER_MASK).toBe(
                PRODUCT_LAYER_MASK | FLOOR_LAYER_MASK,
            );
        });

        it('should show the default layer in the editor but not live', () => {
            /**
             * three puts an object on layer 0 unless someone says otherwise, the
             * gizmo among them, so the editor shows it and the live view does not
             */
            expect(
                DIVECameraComponent.EDITOR_VIEW_LAYER_MASK & DEFAULT_LAYER_MASK,
            ).not.toBe(0);
            expect(
                DIVECameraComponent.LIVE_VIEW_LAYER_MASK & DEFAULT_LAYER_MASK,
            ).toBe(0);
        });

        it('should keep what only helps while editing out of the live view', () => {
            const live = DIVECameraComponent.LIVE_VIEW_LAYER_MASK;

            expect(live & UI_LAYER_MASK).toBe(0);
            expect(live & HELPER_LAYER_MASK).toBe(0);
            expect(live & PROXY_LAYER_MASK).toBe(0);
        });

        it('should leave the orientation display to its own camera', () => {
            /**
             * the axes live in the same scene; having this bit would draw them a
             * second time in the middle of the viewport
             */
            expect(
                DIVECameraComponent.EDITOR_VIEW_LAYER_MASK &
                    COORDINATE_LAYER_MASK,
            ).toBe(0);
            expect(
                DIVECameraComponent.LIVE_VIEW_LAYER_MASK &
                    COORDINATE_LAYER_MASK,
            ).toBe(0);
        });

        it('should make the editor view a superset of the live view', () => {
            const live = DIVECameraComponent.LIVE_VIEW_LAYER_MASK;

            expect(DIVECameraComponent.EDITOR_VIEW_LAYER_MASK & live).toBe(
                live,
            );
        });

        it('should render the floor in both views', () => {
            /**
             * the floor sits on its own layer so it can be excluded from bounds
             * and exports, but it still has to be visible in every view
             */
            expect(
                DIVECameraComponent.EDITOR_VIEW_LAYER_MASK & FLOOR_LAYER_MASK,
            ).not.toBe(0);
            expect(
                DIVECameraComponent.LIVE_VIEW_LAYER_MASK & FLOOR_LAYER_MASK,
            ).not.toBe(0);
        });
    });

    describe('aimAt', () => {
        it('should aim the node at a target rather than away from it', () => {
            /**
             * three's Object3D.lookAt points +Z at the target unless the object
             * reports isCamera, which left the camera looking backwards once a
             * node carried it
             */
            const component = attached();
            component.owner.position.set(0, 0, 5);

            component.aimAt(new Vector3(0, 0, 0));

            expect(worldViewDirection(component).z).toBeCloseTo(-1, 5);
        });

        it('should aim along any axis', () => {
            const component = attached();
            component.owner.position.set(4, 0, 0);

            component.aimAt(new Vector3(0, 0, 0));

            expect(worldViewDirection(component).x).toBeCloseTo(-1, 5);
        });

        it('should aim downwards from above', () => {
            const component = attached();
            component.owner.position.set(0, 3, 0);

            component.aimAt(new Vector3(0, 0, 0));

            expect(worldViewDirection(component).y).toBeCloseTo(-1, 5);
        });

        it('should compensate for a rotated parent when aiming', () => {
            /**
             * the quaternion written is local, so a turned parent would otherwise
             * rotate the camera off the target on top of it
             */
            const parent = new Object3D();
            parent.rotation.y = Math.PI / 2;

            const component = attached();
            parent.add(component.owner);
            component.owner.position.set(0, 0, 5);
            parent.updateMatrixWorld(true);

            component.aimAt(new Vector3(0, 0, 0));

            /**
             * the parent's turn puts the node at world (5, 0, 0), so facing the
             * origin means looking along -X
             */
            expect(worldViewDirection(component).x).toBeCloseTo(-1, 5);
        });

        it('should refuse to aim while it has no node', () => {
            // it turns its owner, and there is nothing else it could turn
            expect(() =>
                new TestCameraComponent().aimAt(new Vector3()),
            ).toThrow();
        });
    });
});
