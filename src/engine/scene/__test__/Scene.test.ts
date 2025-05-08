import { Color } from 'three';
import { DIVEScene } from '../Scene.ts';

const mock_GetSceneObject = vi.fn();
const mock_ComputeSceneBB = vi.fn();

vi.mock('../../../components/root/Root', () => {
    return {
        DIVERoot: vi.fn(function (this: any) {
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = vi.fn();
            this.getSceneObject = mock_GetSceneObject;
            this.computeSceneBB = mock_ComputeSceneBB;
            this.removeFromParent = vi.fn();
            return this;
        }),
    };
});

vi.mock('../../renderer/Renderer', () => {
    return {
        DIVERenderPipeline: vi.fn(function (this: any) {}),
    };
});

vi.mock('../../../components/grid/Grid', () => {
    return {
        DIVEGrid: vi.fn(function (this: any) {
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = vi.fn();
            return this;
        }),
    };
});

let scene: DIVEScene;

describe('DIVEScene', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        scene = new DIVEScene();
    });

    it('should instantiate with correct properties', () => {
        expect(scene).toBeDefined();
        expect(scene.root).toBeDefined();
        expect(scene.grid).toBeDefined();
        expect(scene.background).toBeInstanceOf(Color);
    });

    it('should add root and grid to scene', () => {
        expect(scene.children).toContain(scene.root);
        expect(scene.children).toContain(scene.grid);
    });

    it('should set background color', () => {
        const color = new Color(0x000000);
        scene.setBackground(0x000000);
        expect((scene.background as Color).getHex()).toBe(color.getHex());
    });

    it('should delegate computeSceneBB to root', () => {
        scene.computeSceneBB();
        expect(mock_ComputeSceneBB).toHaveBeenCalledTimes(1);
    });
});
