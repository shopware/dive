import DIVETransformTool from '../TransformTool';
import DIVEScene from '../../../scene/Scene';
import DIVEOrbitControls from '../../../controls/OrbitControls';
import DIVEPerspectiveCamera from '../../../camera/PerspectiveCamera';
import DIVERenderer, { DIVERendererDefaultSettings } from '../../../renderer/Renderer';
import { type Object3D } from 'three';
import { type DIVEMoveable } from '../../../interface/Moveable';

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
const mockRenderer: DIVERenderer = new DIVERenderer(DIVERendererDefaultSettings);
const mockScene: DIVEScene = new DIVEScene();
const mockController: DIVEOrbitControls = new DIVEOrbitControls(mockCamera, mockRenderer);

describe('dive/toolbox/select/DIVETransformTool', () => {
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