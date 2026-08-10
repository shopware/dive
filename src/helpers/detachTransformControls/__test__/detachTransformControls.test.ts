import { Object3D } from 'three/webgpu';
import { detachTransformControls } from '../detachTransformControls.ts';

describe('helpers/detachTransformControls', () => {
    it('should detach transform controls from object', () => {
        const mockObject = new Object3D();
        const mockTransformControls = Object.assign(new Object3D(), {
            isTransformControls: true,
            detach: vi.fn(),
        });

        const mockScene = Object.assign(new Object3D(), { isDIVEScene: true });
        mockScene.children = [mockTransformControls];
        mockObject.parent = mockScene;

        detachTransformControls(mockObject);
        expect(mockTransformControls.detach).toHaveBeenCalled();
    });

    it('should detach controls from transform control helper roots', () => {
        const mockObject = new Object3D();
        const detach = vi.fn();
        const mockHelperRoot = Object.assign(new Object3D(), {
            isTransformControlsRoot: true,
            controls: {
                detach,
            },
        });

        const mockScene = Object.assign(new Object3D(), { isDIVEScene: true });
        mockScene.children = [mockHelperRoot];
        mockObject.parent = mockScene;

        detachTransformControls(mockObject);
        expect(detach).toHaveBeenCalled();
    });

    it('should handle object without transform controls', () => {
        const mockObject = new Object3D();
        const mockScene = Object.assign(new Object3D(), { isDIVEScene: true });
        mockScene.children = [];
        mockObject.parent = mockScene;

        detachTransformControls(mockObject);
        // No error should be thrown
    });
});
