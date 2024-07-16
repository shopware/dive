import { AxesHelper, Matrix4, OrthographicCamera, Vector4 } from 'three';
import DIVEAxisCamera from '../AxisCamera';
import DIVERenderer from '../../renderer/Renderer';
import DIVEScene from '../../scene/Scene';
import DIVEOrbitControls from '../../controls/OrbitControls';

jest.mock('three', () => {
    return {
        Vector4: jest.fn(),
        Color: jest.fn(function () {
            this.getHexString = jest.fn().mockReturnValue('ffffff');
            return this;
        }),
        Matrix4: jest.fn(function () {
            this.extractRotation = jest.fn(() => { return this; });
            this.invert = jest.fn(() => { return this; });
            this.elements = [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1,
            ];
            return this;
        }),
        OrthographicCamera: jest.fn(function () {

            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = jest.fn();
            this.layers = {
                mask: 0,
            };
            this.position = {
                set: jest.fn(),
            };
            this.add = jest.fn();
            return this;
        }),
        AxesHelper: jest.fn(function () {
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = jest.fn();
            this.layers = {
                mask: 0,
            };
            this.position = {
                set: jest.fn(),
            };
            this.add = jest.fn();
            this.material = {
                depthTest: false,
            };
            this.setColors = jest.fn();
            this.rotation = {
                setFromRotationMatrix: jest.fn(),
            }
            return this;
        }),
    }
});

jest.mock('three-spritetext', () => {
    return jest.fn(() => {
        return {
            isObject3D: true,
            parent: null,
            dispatchEvent: jest.fn(),
            layers: {
                mask: 0,
            },
            position: {
                set: jest.fn(),
            },
            removeFromParent: jest.fn(),
        }
    },
    )
});

const mockRenderer = {
    render: jest.fn(),
    OnResize: jest.fn(),
    getViewport: jest.fn(),
    setViewport: jest.fn(),
    AddPostRenderCallback: jest.fn((callback) => {
        callback();
    }),
    RemovePostRenderCallback: jest.fn(),
} as unknown as DIVERenderer;

const mockScene = {
    add: jest.fn(),
    remove: jest.fn(),
    SetBackground: jest.fn(),
    AddSceneObject: jest.fn(),
    UpdateSceneObject: jest.fn(),
    DeleteSceneObject: jest.fn(),
    PlaceOnFloor: jest.fn(),
    GetSceneObject: jest.fn(),
    background: {
        getHexString: jest.fn().mockReturnValue('ffffff'),
    },
    Root: {
        Floor: {
            isFloor: true,
            visible: true,
            material: {
                color: {
                    getHexString: jest.fn().mockReturnValue('ffffff'),
                },
            },
            SetVisibility: jest.fn(),
            SetColor: jest.fn(),
        },
        Grid: {
            SetVisibility: jest.fn(),
        },
    },
} as unknown as DIVEScene;

const mockController = {
    enableDamping: true,
    dampingFactor: 0.25,
    enableZoom: true,
    enablePan: true,
    minPolarAngle: 0,
    maxPolarAngle: Math.PI,
    minDistance: 0,
    maxDistance: Infinity,
    rotateSpeed: 0.5,
    panSpeed: 0.5,
    zoomSpeed: 0.5,
    keyPanSpeed: 0.5,
    screenSpacePanning: true,
    autoRotate: false,
    autoRotateSpeed: 2.0,
    enableKeys: true,
    keys: {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        BOTTOM: 40,
    },
    mouseButtons: {
        LEFT: 0,
        MIDDLE: 1,
        RIGHT: 2,
    },
    target: {
        x: 4,
        y: 5,
        z: 6,
        set: jest.fn(),
        clone: jest.fn().mockReturnValue({ x: 4, y: 5, z: 6 }),
        copy: jest.fn(),
    },
    update: jest.fn(),
    dispose: jest.fn(),
    ZoomIn: jest.fn(),
    ZoomOut: jest.fn(),
    object: {
        position: {
            x: 1,
            y: 2,
            z: 3,
            clone: jest.fn().mockReturnValue({ x: 1, y: 2, z: 3 }),
            copy: jest.fn(),
        },
        quaternion: {
            x: 1,
            y: 2,
            z: 3,
            w: 4,
            clone: jest.fn().mockReturnValue({ x: 1, y: 2, z: 3, w: 4 }),
            copy: jest.fn(),
        },
        SetCameraLayer: jest.fn(),
        OnResize: jest.fn(),
        layers: {
            mask: 1,
        },
    },
    MoveTo: jest.fn(),
    RevertLast: jest.fn(),
} as unknown as DIVEOrbitControls;

let textAxisCamera: DIVEAxisCamera;

describe('dive/axiscamera/DIVEAxisCamera', () => {
    beforeEach(() => {
        textAxisCamera = new DIVEAxisCamera(mockRenderer, mockScene, mockController);
    });

    it('should instantiate', () => {
        expect(textAxisCamera).toBeDefined();
    });

    it('should set rotation from Matrix4', () => {
        expect.assertions(0);
        const matrix = {
            elements: [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1,
            ],
        } as Matrix4;
        textAxisCamera.SetFromCameraMatrix(matrix);
    });

    it('should dispose', () => {
        textAxisCamera.Dispose();
    });
});