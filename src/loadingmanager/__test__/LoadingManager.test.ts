import { DIVELoadingManager } from '../LoadingManager';

const mock_setDRACOLoader = jest.fn();
const mock_setDecoderPath = jest.fn();

jest.mock('three/examples/jsm/Addons.js', () => {
    return {
        GLTFLoader: jest.fn(function () {

            this.loadAsync = (uri: string, progEvent: (p: ProgressEvent<EventTarget>) => void) => new Promise<void>((resolve) => {
                progEvent({ loaded: 0, total: 1 } as ProgressEvent<EventTarget>);
                resolve();
            });
            this.setDRACOLoader = mock_setDRACOLoader;
            return this;
        }),
        DRACOLoader: jest.fn(() => {
            return {
                setDecoderPath: mock_setDecoderPath,
            }
        }),
    }
});

describe('dive/loadingmanager/DIVELoadingManager', () => {
    it('should instantiate', () => {
        const testLight = new DIVELoadingManager();
        expect(testLight).toBeDefined();
        expect(mock_setDecoderPath).toHaveBeenCalledTimes(1);
        expect(mock_setDRACOLoader).toHaveBeenCalledTimes(1);
    });

    it('should return GLTF promise', () => {
        const testLight = new DIVELoadingManager();
        const promise = testLight.LoadGLTF('test.gltf');
        expect(promise).toBeDefined();
    });

    it('should return progress', () => {
        const testLight = new DIVELoadingManager();
        testLight.LoadGLTF('test.gltf');
        const progress = testLight.PollProgress();
        expect(progress).toBe(0);
    });

    it('should return done progress without load', () => {
        const testLight = new DIVELoadingManager();
        const progress = testLight.PollProgress();
        expect(progress).toBe(1);
    });

});