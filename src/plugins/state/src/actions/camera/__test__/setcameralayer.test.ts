import {
    type DIVECameraComponent,
    PerspectiveCameraComponent,
} from '@shopware-ag/dive';
import { type OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { SetCameraLayerAction } from '../setcameralayer.ts';

/** A controller driving a camera component, as the engine builds it. */
const controllerFor = (component: DIVECameraComponent): OrbitController =>
    ({ object: component }) as unknown as OrbitController;

describe('SetCameraLayerAction', () => {
    it('should set the layer on the component that owns the camera', () => {
        // the controller only ever holds a camera; the layer lives on the
        // component, which the action has to walk up to
        const component = new PerspectiveCameraComponent();
        const setCameraLayer = vi.spyOn(component, 'setCameraLayer');

        new SetCameraLayerAction(
            { layer: 'LIVE' },
            { controller: controllerFor(component) },
        ).execute();

        expect(setCameraLayer).toHaveBeenCalledWith('LIVE');
    });

    it('should switch what the camera sees', () => {
        const component = new PerspectiveCameraComponent();

        new SetCameraLayerAction(
            { layer: 'LIVE' },
            { controller: controllerFor(component) },
        ).execute();

        expect(component.camera.layers.mask).toBe(
            PerspectiveCameraComponent.LIVE_VIEW_LAYER_MASK,
        );
    });

    it('should reach the component without searching for it', () => {
        // `controller.object` is the component: the action used to duck-type its
        // way to `setCameraLayer` because the controller handed out a bare camera
        const component = new PerspectiveCameraComponent();

        new SetCameraLayerAction(
            { layer: 'EDITOR' },
            { controller: controllerFor(component) },
        ).execute();

        expect(component.camera.layers.mask).toBe(
            PerspectiveCameraComponent.EDITOR_VIEW_LAYER_MASK,
        );
    });
});
