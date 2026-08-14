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

    it('should look past a scene child that is neither', () => {
        // the empty scene above never runs the search at all; this is the case
        // where it runs and finds nothing
        const mockObject = new Object3D();
        const mockScene = Object.assign(new Object3D(), { isDIVEScene: true });
        mockScene.children = [new Object3D(), new Object3D()];
        mockObject.parent = mockScene;

        expect(() => detachTransformControls(mockObject)).not.toThrow();
    });

    it('should keep looking after a child that does not match', () => {
        // whatever else is in the scene must not stop the search
        const mockObject = new Object3D();
        const mockTransformControls = Object.assign(new Object3D(), {
            isTransformControls: true,
            detach: vi.fn(),
        });

        const mockScene = Object.assign(new Object3D(), { isDIVEScene: true });
        mockScene.children = [new Object3D(), mockTransformControls];
        mockObject.parent = mockScene;

        detachTransformControls(mockObject);

        expect(mockTransformControls.detach).toHaveBeenCalled();
    });

    it('should ignore a helper root that holds no controls', () => {
        // both brands are checked with their payload, because a root without
        // controls is a root that has nothing to release
        const mockObject = new Object3D();
        const mockHelperRoot = Object.assign(new Object3D(), {
            isTransformControlsRoot: true,
        });

        const mockScene = Object.assign(new Object3D(), { isDIVEScene: true });
        mockScene.children = [mockHelperRoot];
        mockObject.parent = mockScene;

        expect(() => detachTransformControls(mockObject)).not.toThrow();
    });

    it('should ignore controls that cannot detach', () => {
        const mockObject = new Object3D();
        const mockControls = Object.assign(new Object3D(), {
            isTransformControls: true,
        });

        const mockScene = Object.assign(new Object3D(), { isDIVEScene: true });
        mockScene.children = [mockControls];
        mockObject.parent = mockScene;

        expect(() => detachTransformControls(mockObject)).not.toThrow();
    });

    it('should do nothing for an object that is in no scene', () => {
        const orphan = new Object3D();

        expect(() => detachTransformControls(orphan)).not.toThrow();
    });
});
