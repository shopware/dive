import DIVETransformTool, { isTransformTool } from '../TransformTool';
import DIVEScene from '../../../scene/Scene';
import DIVEOrbitControls from '../../../controls/OrbitControls';
import DIVEPerspectiveCamera from '../../../camera/PerspectiveCamera';
import { DIVERenderer } from '../../../renderer/Renderer';
import { type DIVEBaseTool } from '../../BaseTool';
import { Tween } from '@tweenjs/tween.js';
import { DIVEAnimationSystem } from '../../../animation/AnimationSystem';

jest.mock('@tweenjs/tween.js', () => {
    return {
        Tween: jest.fn(() => { }),
        update: jest.fn(),
    }
});

jest.mock('../../../renderer/Renderer', () => {
    return jest.fn(function () {
        return this;
    });
});

jest.mock('../../../camera/PerspectiveCamera', () => {
    return jest.fn(function () {
        this.isPerspectiveCamera = true;
        this.layers = {
            mask: 0,
        };
        return this;
    });
});

jest.mock('../../../controls/OrbitControls', () => {
    return jest.fn(function () {
        this.enabled = true;
        this.domElement = {
            clientWIdth: 0,
            clientHeight: 0,
        };
        this.object = {
            layers: {
                mask: 0,
            }
        };
        return this;
    });
});

jest.mock('../../../scene/Scene', () => {
    return jest.fn(function () {
        this.add = jest.fn();
        this.remove = jest.fn();
        this.Root = {
            children: [],
        }
        this.children = [];
        return this;
    });
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
    }
});

const mock_intersectObjects = jest.fn().mockReturnValue([]);

jest.mock('three', () => {
    return {
        Vector2: jest.fn(function () {
            return this;
        }),
        Vector3: jest.fn(function () {
            return this;
        }),
        Raycaster: jest.fn(function () {
            this.setFromCamera = jest.fn();
            this.intersectObjects = mock_intersectObjects;
            this.layers = {
                mask: 0,
            };
            return this;
        }),
    };
});

const mock_attach = jest.fn();
const mock_detach = jest.fn();

jest.mock('three/examples/jsm/Addons.js', () => {
    return {
        TransformControls: jest.fn(function () {
            this.addEventListener = (type: string, callback: (e: object) => void) => {
                this.object = null;
                callback({ value: false });
                this.object = {};
                callback({ value: false });
                this.object = {
                    isMoveable: true
                };
                callback({ value: false });
                this.object = {
                    isMoveable: true,
                    onMove: jest.fn(),
                };
                callback({ value: false });
            },
                this.attach = mock_attach,
                this.detach = mock_detach,
                this.traverse = function (callback: (obj: object) => void) {
                    callback(this);
                };
            this.setMode = jest.fn();
            this.getRaycaster = jest.fn().mockReturnValue({
                layers: {
                    mask: 0,
                },
            });
            this.layers = {
                mask: 0,
            };
            return this;
        }),
    };
});

const mockCamera: DIVEPerspectiveCamera = {} as DIVEPerspectiveCamera;
const mockRenderer = {
    render: jest.fn(),
    OnResize: jest.fn(),
    getViewport: jest.fn(),
    setViewport: jest.fn(),
    AddPreRenderCallback: jest.fn((callback) => {
        callback();
    }),
    AddPostRenderCallback: jest.fn((callback) => {
        callback();
    }),
    RemovePreRenderCallback: jest.fn(),
    RemovePostRenderCallback: jest.fn(),
} as unknown as DIVERenderer;
const mockScene: DIVEScene = new DIVEScene();
const mockAnimSystem = new DIVEAnimationSystem(mockRenderer);
const mockController: DIVEOrbitControls = new DIVEOrbitControls(mockCamera, mockRenderer, mockAnimSystem);

describe('dive/toolbox/select/DIVETransformTool', () => {
    it('should test if it is SelectTool', () => {
        const selectTool = { isTransformTool: true } as unknown as DIVEBaseTool;
        expect(isTransformTool(selectTool)).toBeDefined();
    });

    it('should instantiate', () => {
        const transformTool = new DIVETransformTool(mockScene, mockController);
        expect(transformTool).toBeDefined();
    });

    it('should activate', () => {
        const transformTool = new DIVETransformTool(mockScene, mockController);
        expect(() => transformTool.Activate()).not.toThrow();
    });

    it('should set gizmo mode', () => {
        const transformTool = new DIVETransformTool(mockScene, mockController);
        expect(() => transformTool.SetGizmoMode('translate')).not.toThrow();
    });

    it('should set gizmo active', () => {
        const transformTool = new DIVETransformTool(mockScene, mockController);
        expect(() => transformTool.SetGizmoVisibility(true)).not.toThrow();

        expect(mockScene.add).toBeCalled();

        mockScene.children.includes = jest.fn().mockReturnValue(true);
        expect(() => transformTool.SetGizmoVisibility(false)).not.toThrow();
    });
});