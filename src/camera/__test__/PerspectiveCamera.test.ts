import DIVEPerspectiveCamera, { DIVEPerspectiveCameraDefaultSettings } from '../PerspectiveCamera';

let cam: DIVEPerspectiveCamera;

describe('dive/camera/DIVEPerspectiveCamera', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        cam = new DIVEPerspectiveCamera(DIVEPerspectiveCameraDefaultSettings);
    });

    it('should instantiate', () => {
        cam = new DIVEPerspectiveCamera();
        expect(cam).toBeDefined();
    });

    it('should resize', () => {
        const spy = jest.spyOn(cam, 'updateProjectionMatrix');
        expect(() => cam.OnResize(800, 600)).not.toThrow();
        expect(cam.aspect).toBe(800 / 600);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should set camera layer', () => {
        expect(() => cam.SetCameraLayer('LIVE')).not.toThrow();
        expect(() => cam.SetCameraLayer('EDITOR')).not.toThrow();
    });
});