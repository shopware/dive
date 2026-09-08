import { PerspectiveCamera } from 'three/webgpu';
import {
    DIVEPerspectiveCameraDefaultSettings,
    PerspectiveCameraComponent,
} from '../PerspectiveCameraComponent.ts';
import { DIVENode } from '../../../../engine/node/Node.ts';

/**
 * Only what a perspective camera adds. Everything the base class does -- owning
 * and contributing a camera, the layer masks, `aimAt` -- is covered in
 * `camera/__test__/CameraComponent.test.ts`.
 */
describe('dive/camera/PerspectiveCameraComponent', () => {
    it('should brand and name itself', () => {
        const component = new PerspectiveCameraComponent();

        expect(component.isPerspectiveCameraComponent).toBe(true);
        expect(component.name).toBe('PerspectiveCameraComponent');
    });

    it('should own a perspective camera set up with the defaults', () => {
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

    it('should start at an aspect ratio of 1', () => {
        // a square until someone reports a viewport, so nothing is skewed before
        expect(new PerspectiveCameraComponent().camera.aspect).toBe(1);
    });

    it('should take no constructor arguments', () => {
        /**
         * clone() calls new this.constructor(), so a required parameter would
         * make cloning a node throw
         */
        const node = new DIVENode();
        node.addComponent(new PerspectiveCameraComponent());

        expect(() => node.clone()).not.toThrow();
    });

    describe('applySettings', () => {
        it('should apply everything the settings carry', () => {
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

        it('should rebuild the projection matrix', () => {
            const component = new PerspectiveCameraComponent();
            const updated = vi.spyOn(
                component.camera,
                'updateProjectionMatrix',
            );

            component.applySettings({ fov: 60 });

            expect(updated).toHaveBeenCalled();
        });
    });

    describe('onResize', () => {
        it('should take the aspect from the viewport', () => {
            // what a viewport means for a perspective camera: its aspect, where
            // an orthographic one would change its extents
            const component = new PerspectiveCameraComponent();

            component.onResize(800, 600);

            expect(component.camera.aspect).toBe(800 / 600);
        });

        it('should rebuild the projection matrix', () => {
            const component = new PerspectiveCameraComponent();
            const updated = vi.spyOn(
                component.camera,
                'updateProjectionMatrix',
            );

            component.onResize(800, 600);

            expect(updated).toHaveBeenCalled();
        });
    });

    describe('copy', () => {
        it('should carry its settings along to a clone', () => {
            const source = new PerspectiveCameraComponent();
            source.applySettings({ fov: 35, near: 0.5, far: 250 });

            const copy = source.clone();

            expect(copy.camera.fov).toBe(35);
            expect(copy.camera.near).toBe(0.5);
            expect(copy.camera.far).toBe(250);
        });

        it('should leave the aspect of a clone to the viewport', () => {
            // aspect comes from onResize, not from whoever configured the camera
            const source = new PerspectiveCameraComponent();
            source.onResize(800, 600);

            expect(source.clone().camera.aspect).toBe(1);
        });
    });
});
