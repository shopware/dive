import DIVEPerspectiveCamera from '../PerspectiveCamera';

const cam = new DIVEPerspectiveCamera(80, 1);

describe('dive/camera/DIVEPerspectiveCamera', () => {
    it('should instantiate', () => {
        expect(cam).toBeDefined();
    });

    it('should set camera layer', () => {
        expect(() => cam.SetCameraLayer('LIVE')).not.toThrow();
        expect(() => cam.SetCameraLayer('EDITOR')).not.toThrow();
    });
});