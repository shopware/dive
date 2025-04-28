import { DIVETransformTool, isTransformTool } from '../TransformTool';
import { DIVEScene } from '../../../../engine/scene/Scene';
import { DIVEOrbitController } from '../../../controller/orbit/OrbitController';
import { DIVEPerspectiveCamera } from '../../../../engine/camera/PerspectiveCamera';
import { DIVERenderPipeline } from '../../../../engine/renderer/Renderer';
import { type DIVEBaseTool } from '../../BaseTool';
import { Tween } from '@tweenjs/tween.js';
import { DIVEAnimationSystem } from '../../../animation/AnimationSystem';

jest.mock('../../../../engine/renderer/Renderer', () => {
    return {
        DIVERenderPipeline: jest.fn(function () {
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

jest.mock('../../../../engine/camera/PerspectiveCamera', () => {
    return {
        DIVEPerspectiveCamera: jest.fn(function () {
            this.isPerspectiveCamera = true;
            this.layers = {
                mask: 0,
            };
            return this;
        }),
    };
});

jest.mock('../../../controller/orbit/OrbitController', () => {
    return {
        DIVEOrbitController: jest.fn(function () {
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

jest.mock('../../../../engine/scene/Scene', () => {
    return {
        DIVEScene: jest.fn(function () {
            this.add = jest.fn();
            this.remove = jest.fn();
            this.Root = {
                children: [],
            };
            this.children = [];
            return this;
        }),
    };
});

jest.mock('../../../animation/AnimationSystem', () => {
    return {
        DIVEAnimationSystem: jest.fn(function () {
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
const mockAnimSystem = new DIVEAnimationSystem();
const mockController: DIVEOrbitController = new DIVEOrbitController(
    mockCamera,
    mockRenderer.webglrenderer.domElement,
    mockAnimSystem,
);

let transformTool: DIVETransformTool;
let intersectObjectsSpy: jest.SpyInstance;

describe('dive/toolbox/select/DIVETransformTool', () => {
    beforeEach(() => {
        transformTool = new DIVETransformTool(mockScene, mockController);
        intersectObjectsSpy = jest
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
        jest.spyOn(mockScene.children, 'includes').mockReturnValueOnce(true);

        expect(() => transformTool.SetGizmoVisibility(false)).not.toThrow();
    });

    it('should set gizmo unified scaling', () => {
        expect(() => transformTool.SetGizmoScaleLinked(true)).not.toThrow();

        // mock that gizmo is in scene
        jest.spyOn(mockScene.children, 'includes').mockReturnValueOnce(true);

        expect(() => transformTool.SetGizmoVisibility(false)).not.toThrow();
    });

    it('should scale unified if linked', () => {
        transformTool.SetGizmoScaleLinked(true);
        transformTool['initGizmo']();
    });
});
