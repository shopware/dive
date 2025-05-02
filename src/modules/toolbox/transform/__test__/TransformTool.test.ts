import { DIVETransformTool, isTransformTool } from '../TransformTool.ts';
import { DIVEScene } from '../../../../engine/scene/Scene.ts';
import { OrbitController } from '../../../controller/orbit/OrbitController.ts';
import { DIVERenderPipeline } from '../../../../engine/renderer/Renderer.ts';
import { type DIVEBaseTool } from '../../BaseTool.ts';
import { Tween } from '@tweenjs/tween.js';
import { AnimationSystem } from '../../../animation/AnimationSystem.ts';
import { DIVEPerspectiveCamera } from '../../../../engine/camera/PerspectiveCamera.ts';

vi.mock('../../../../engine/renderer/Renderer', () => {
    return {
        DIVERenderPipeline: vi.fn(function (this: any) {
            this.webglrenderer = {
                domElement: {
                    clientWidth: 0,
                    clientHeight: 0,
                },
            };
            return this;
        }),
    };
});

vi.mock('../../../../engine/camera/PerspectiveCamera', () => {
    return {
        DIVEPerspectiveCamera: vi.fn(function (this: any) {
            this.isPerspectiveCamera = true;
            this.layers = {
                mask: 0,
            };
            return this;
        }),
    };
});

vi.mock('../../../controller/orbit/OrbitController', () => {
    return {
        OrbitController: vi.fn(function (this: any) {
            this.enabled = true;
            this.domElement = {
                clientWIdth: 0,
                clientHeight: 0,
            };
            this.object = {
                layers: {
                    mask: 0,
                },
            };
            return this;
        }),
    };
});

vi.mock('../../../../engine/scene/Scene', () => {
    return {
        DIVEScene: vi.fn(function (this: any) {
            this.add = vi.fn();
            this.remove = vi.fn();
            this.Root = {
                children: [],
            };
            this.children = [];
            return this;
        }),
    };
});

vi.mock('../../../animation/AnimationSystem', () => {
    return {
        DIVEAnimationSystem: vi.fn(function (this: any) {
            this.domElement = {
                style: {},
            };
            this.Animate = <T extends object>(obj: T) => {
                return new Tween<T>(obj);
            };

            return this;
        }),
    };
});

const mockScene: DIVEScene = new DIVEScene();
const mockCamera = new DIVEPerspectiveCamera();
const mockRenderer = new DIVERenderPipeline(mockScene, mockCamera);
const mockController: OrbitController = new OrbitController(
    mockCamera,
    mockRenderer.webglrenderer.domElement,
);

let transformTool: DIVETransformTool;
let intersectObjectsSpy;

describe('dive/toolbox/select/DIVETransformTool', () => {
    beforeEach(() => {
        transformTool = new DIVETransformTool(mockScene, mockController);
        intersectObjectsSpy = vi
            .spyOn(transformTool['_raycaster'], 'intersectObjects')
            .mockReturnValue([]);
    });

    it('should test if it is SelectTool', () => {
        const transformTool = {
            isTransformTool: true,
        } as unknown as DIVEBaseTool;
        expect(isTransformTool(transformTool)).toBeDefined();
    });

    it('should instantiate', () => {
        expect(transformTool).toBeDefined();
    });

    it('should activate', () => {
        expect(() => transformTool.Activate()).not.toThrow();
    });

    it('should set gizmo mode', () => {
        expect(() => transformTool.SetGizmoMode('translate')).not.toThrow();
    });

    it('should set gizmo active', () => {
        expect(() => transformTool.SetGizmoVisibility(true)).not.toThrow();

        // mock that gizmo is in scene
        vi.spyOn(mockScene.children, 'includes').mockReturnValueOnce(true);

        expect(() => transformTool.SetGizmoVisibility(false)).not.toThrow();
    });

    it('should set gizmo unified scaling', () => {
        expect(() => transformTool.SetGizmoScaleLinked(true)).not.toThrow();

        // mock that gizmo is in scene
        vi.spyOn(mockScene.children, 'includes').mockReturnValueOnce(true);

        expect(() => transformTool.SetGizmoVisibility(false)).not.toThrow();
    });

    it('should scale unified if linked', () => {
        transformTool.SetGizmoScaleLinked(true);
        transformTool['initGizmo']();
    });
});
