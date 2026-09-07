import { Object3D, PerspectiveCamera, Quaternion, Vector3 } from 'three/webgpu';
import { DIVECameraComponent } from '../CameraComponent.ts';
import {
    DIVEPerspectiveCameraDefaultSettings,
    PerspectiveCameraComponent,
} from '../PerspectiveCameraComponent.ts';
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

const attached = (): PerspectiveCameraComponent =>
    new DIVENode().addComponent(new PerspectiveCameraComponent());

/** The direction the camera looks in world space -- a camera looks down its -Z. */
const worldViewDirection = (component: PerspectiveCameraComponent): Vector3 => {
    component.owner.updateMatrixWorld(true);
    return new Vector3(0, 0, -1)
        .applyQuaternion(component.camera.getWorldQuaternion(new Quaternion()))
        .normalize();
};

describe('dive/camera/PerspectiveCameraComponent', () => {
    it('should own a camera set up with the defaults', () => {
        const component = new PerspectiveCameraComponent();

        expect(component.camera).toBeInstanceOf(PerspectiveCamera);
        expect(component.camera.fov).toBe(
            DIVEPerspectiveCameraDefaultSettings.fov,
        );
        expect(component.camera.near).toBe(
            DIVEPerspectiveCameraDefaultSettings.near,
        );
        expect(component.camera.far).toBe(
            DIVEPerspectiveCameraDefaultSettings.far,
        );
    });

    it('should contribute its camera to the node', () => {
        /**
         * a component holds a camera and puts it on the node, because three
         * only updates a camera's world matrix itself while it has no parent
         */
        const node = new DIVENode();
        const component = node.addComponent(new PerspectiveCameraComponent());

        expect(component.contributions).toEqual([component.camera]);
        expect(component.camera.parent).toBe(node);
    });

    it('should give a clone its own camera', () => {
        const source = new PerspectiveCameraComponent();

        const copy = source.clone();

        expect(copy.contributions).toEqual([copy.camera]);
        expect(copy.camera).not.toBe(source.camera);
    });

    it('should take no constructor arguments', () => {
        /**
         * Object3D.clone() calls new this.constructor(), so a required parameter
         * would make cloning a node throw
         */
        const node = new DIVENode();
        node.addComponent(new PerspectiveCameraComponent());

        expect(() => node.clone()).not.toThrow();
    });

    it('should apply settings that are given', () => {
        const component = new PerspectiveCameraComponent();

        component.applySettings({ fov: 60, near: 0.1, far: 2000 });

        expect(component.camera.fov).toBe(60);
        expect(component.camera.near).toBe(0.1);
        expect(component.camera.far).toBe(2000);
    });

    it('should leave out what the settings do not carry', () => {
        const component = new PerspectiveCameraComponent();

        component.applySettings({ fov: 60 });

        expect(component.camera.fov).toBe(60);
        expect(component.camera.near).toBe(
            DIVEPerspectiveCameraDefaultSettings.near,
        );
        expect(component.camera.far).toBe(
            DIVEPerspectiveCameraDefaultSettings.far,
        );
    });

    it('should cope with empty settings', () => {
        const component = new PerspectiveCameraComponent();

        component.applySettings({});

        expect(component.camera.fov).toBe(
            DIVEPerspectiveCameraDefaultSettings.fov,
        );
    });

    it('should be findable from the camera it owns', () => {
        /**
         * whoever only holds a camera -- an OrbitController hands out
         * `controller.object` -- has to be able to get back to the component
         */
        const component = new PerspectiveCameraComponent();

        expect(findComponent(component.camera, DIVECameraComponent)).toBe(
            component,
        );
    });

    it('should report nothing for a camera nobody wrapped', () => {
        expect(
            findComponent(new PerspectiveCamera(), DIVECameraComponent),
        ).toBeUndefined();
    });

    it('should handle resize', () => {
        const component = new PerspectiveCameraComponent();
        const camera = component.camera;
        const width = 800;
        const height = 600;
        component.onResize(width, height);
        expect(camera.aspect).toBe(width / height);
    });

    it('should set camera layer to LIVE', () => {
        const component = new PerspectiveCameraComponent();
        const camera = component.camera;
        const onSetCameraLayer = vi.fn();
        component.onSetCameraLayer = onSetCameraLayer;
        component.setCameraLayer('LIVE');
        expect(camera.layers.mask).toBe(
            DIVECameraComponent.LIVE_VIEW_LAYER_MASK,
        );
        expect(onSetCameraLayer).toHaveBeenCalledWith(
            DIVECameraComponent.LIVE_VIEW_LAYER_MASK,
        );
    });

    it('should set camera layer to EDITOR', () => {
        const component = new PerspectiveCameraComponent();
        const camera = component.camera;
        const onSetCameraLayer = vi.fn();
        component.onSetCameraLayer = onSetCameraLayer;
        component.setCameraLayer('EDITOR');
        expect(camera.layers.mask).toBe(
            DIVECameraComponent.EDITOR_VIEW_LAYER_MASK,
        );
        expect(onSetCameraLayer).toHaveBeenCalledWith(
            DIVECameraComponent.EDITOR_VIEW_LAYER_MASK,
        );
    });

    it('should have default onSetCameraLayer function', () => {
        const component = new PerspectiveCameraComponent();
        const camera = component.camera;
        expect(() => component.onSetCameraLayer(0)).not.toThrow();
    });

    it('should initialize with EDITOR_VIEW_LAYER_MASK', () => {
        const component = new PerspectiveCameraComponent();
        const camera = component.camera;
        expect(camera.layers.mask).toBe(
            DIVECameraComponent.EDITOR_VIEW_LAYER_MASK,
        );
    });

    it('should initialize with aspect ratio of 1', () => {
        const component = new PerspectiveCameraComponent();
        const camera = component.camera;
        expect(camera.aspect).toBe(1);
    });

    it('should update projection matrix when resizing', () => {
        const component = new PerspectiveCameraComponent();
        const camera = component.camera;
        const updateProjectionMatrixSpy = vi.spyOn(
            camera,
            'updateProjectionMatrix',
        );
        component.onResize(800, 600);
        expect(updateProjectionMatrixSpy).toHaveBeenCalled();
    });

    it('should correctly compose EDITOR_VIEW_LAYER_MASK', () => {
        expect(DIVECameraComponent.EDITOR_VIEW_LAYER_MASK).toBe(
            DEFAULT_LAYER_MASK |
                UI_LAYER_MASK |
                HELPER_LAYER_MASK |
                PRODUCT_LAYER_MASK |
                PROXY_LAYER_MASK |
                FLOOR_LAYER_MASK,
        );
    });

    it('should correctly define LIVE_VIEW_LAYER_MASK', () => {
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
            DIVECameraComponent.EDITOR_VIEW_LAYER_MASK & COORDINATE_LAYER_MASK,
        ).toBe(0);
        expect(
            DIVECameraComponent.LIVE_VIEW_LAYER_MASK & COORDINATE_LAYER_MASK,
        ).toBe(0);
    });

    it('should make the editor view a superset of the live view', () => {
        const live = DIVECameraComponent.LIVE_VIEW_LAYER_MASK;

        expect(DIVECameraComponent.EDITOR_VIEW_LAYER_MASK & live).toBe(live);
    });

    it('should render the floor in both views', () => {
        /**
         * the floor sits on its own layer so it can be excluded from bounds and
         * exports, but it still has to be visible in every view
         */
        expect(
            DIVECameraComponent.EDITOR_VIEW_LAYER_MASK & FLOOR_LAYER_MASK,
        ).not.toBe(0);
        expect(
            DIVECameraComponent.LIVE_VIEW_LAYER_MASK & FLOOR_LAYER_MASK,
        ).not.toBe(0);
    });

    it('should aim the node at a target rather than away from it', () => {
        /**
         * three's Object3D.lookAt points +Z at the target unless the object reports
         * isCamera, which left the camera looking backwards once a node carried it
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
         * the parent's turn puts the node at world (5, 0, 0), so facing the origin
         * means looking along -X
         */
        expect(worldViewDirection(component).x).toBeCloseTo(-1, 5);
    });
});
