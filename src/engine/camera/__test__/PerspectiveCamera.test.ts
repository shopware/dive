import { DIVEPerspectiveCamera } from '../PerspectiveCamera.ts';
import { DIVEPerspectiveCameraDefaultSettings } from '../PerspectiveCamera.ts';
import {
    DEFAULT_LAYER_MASK,
    HELPER_LAYER_MASK,
    PRODUCT_LAYER_MASK,
    UI_LAYER_MASK,
} from '../../../constants/VisibilityLayerMask.ts';

describe('dive/engine/camera/DIVEPerspectiveCamera', () => {
    it('should instantiate with default settings', () => {
        const camera = new DIVEPerspectiveCamera();
        expect(camera).toBeDefined();
        expect(camera.fov).toBe(DIVEPerspectiveCameraDefaultSettings.fov);
        expect(camera.near).toBe(DIVEPerspectiveCameraDefaultSettings.near);
        expect(camera.far).toBe(DIVEPerspectiveCameraDefaultSettings.far);
    });

    it('should instantiate with custom settings', () => {
        const settings = {
            fov: 60,
            near: 0.1,
            far: 2000,
        };
        const camera = new DIVEPerspectiveCamera(settings);
        expect(camera.fov).toBe(settings.fov);
        expect(camera.near).toBe(settings.near);
        expect(camera.far).toBe(settings.far);
    });

    it('should instantiate with partial settings', () => {
        const settings = {
            fov: 60,
        };
        const camera = new DIVEPerspectiveCamera(settings);
        expect(camera.fov).toBe(settings.fov);
        expect(camera.near).toBe(DIVEPerspectiveCameraDefaultSettings.near);
        expect(camera.far).toBe(DIVEPerspectiveCameraDefaultSettings.far);
    });

    it('should instantiate with empty settings', () => {
        const settings = {};
        const camera = new DIVEPerspectiveCamera(settings);
        expect(camera.fov).toBe(DIVEPerspectiveCameraDefaultSettings.fov);
        expect(camera.near).toBe(DIVEPerspectiveCameraDefaultSettings.near);
        expect(camera.far).toBe(DIVEPerspectiveCameraDefaultSettings.far);
    });

    it('should handle resize', () => {
        const camera = new DIVEPerspectiveCamera();
        const width = 800;
        const height = 600;
        camera.onResize(width, height);
        expect(camera.aspect).toBe(width / height);
    });

    it('should set camera layer to LIVE', () => {
        const camera = new DIVEPerspectiveCamera();
        const onSetCameraLayer = vi.fn();
        camera.onSetCameraLayer = onSetCameraLayer;
        camera.setCameraLayer('LIVE');
        expect(camera.layers.mask).toBe(
            DIVEPerspectiveCamera.LIVE_VIEW_LAYER_MASK,
        );
        expect(onSetCameraLayer).toHaveBeenCalledWith(
            DIVEPerspectiveCamera.LIVE_VIEW_LAYER_MASK,
        );
    });

    it('should set camera layer to EDITOR', () => {
        const camera = new DIVEPerspectiveCamera();
        const onSetCameraLayer = vi.fn();
        camera.onSetCameraLayer = onSetCameraLayer;
        camera.setCameraLayer('EDITOR');
        expect(camera.layers.mask).toBe(
            DIVEPerspectiveCamera.EDITOR_VIEW_LAYER_MASK,
        );
        expect(onSetCameraLayer).toHaveBeenCalledWith(
            DIVEPerspectiveCamera.EDITOR_VIEW_LAYER_MASK,
        );
    });

    it('should have default onSetCameraLayer function', () => {
        const camera = new DIVEPerspectiveCamera();
        expect(() => camera.onSetCameraLayer(0)).not.toThrow();
    });

    it('should initialize with EDITOR_VIEW_LAYER_MASK', () => {
        const camera = new DIVEPerspectiveCamera();
        expect(camera.layers.mask).toBe(
            DIVEPerspectiveCamera.EDITOR_VIEW_LAYER_MASK,
        );
    });

    it('should initialize with aspect ratio of 1', () => {
        const camera = new DIVEPerspectiveCamera();
        expect(camera.aspect).toBe(1);
    });

    it('should update projection matrix when resizing', () => {
        const camera = new DIVEPerspectiveCamera();
        const updateProjectionMatrixSpy = vi.spyOn(
            camera,
            'updateProjectionMatrix',
        );
        camera.onResize(800, 600);
        expect(updateProjectionMatrixSpy).toHaveBeenCalled();
    });

    it('should correctly compose EDITOR_VIEW_LAYER_MASK', () => {
        expect(DIVEPerspectiveCamera.EDITOR_VIEW_LAYER_MASK).toBe(
            DEFAULT_LAYER_MASK |
                UI_LAYER_MASK |
                HELPER_LAYER_MASK |
                PRODUCT_LAYER_MASK,
        );
    });

    it('should correctly define LIVE_VIEW_LAYER_MASK', () => {
        expect(DIVEPerspectiveCamera.LIVE_VIEW_LAYER_MASK).toBe(
            PRODUCT_LAYER_MASK,
        );
    });
});
