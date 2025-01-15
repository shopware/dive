import { DIVELoadingManager } from '../LoadingManager';

const mock_setDecoderPath = jest.fn();

jest.mock('three/examples/jsm/loaders/DRACOLoader', () => {
    return {
        DRACOLoader: jest.fn(() => {
            return {
                setDecoderPath: mock_setDecoderPath,
            };
        }),
    };
});

describe('dive/loadingmanager/DIVELoadingManager', () => {
    it('should instantiate', () => {
        const testLight = new DIVELoadingManager();
        expect(testLight).toBeDefined();
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
