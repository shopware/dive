import { DIVECommunication } from '../Communication';
import '../types';
import { type DIVEScene } from '../../../engine/scene/Scene';
import { type DIVEToolbox } from '../../toolbox/Toolbox';
import { type DIVEOrbitController } from '../../controller/orbit/OrbitController';
import { type DIVERenderPipeline } from '../../../engine/renderer/Renderer';
import { DIVEEngine } from '../../../engine/Engine';

jest.mock('../..', () => {
    return {
        ModuleImporter: jest.fn(function () {
            this.import = jest.fn().mockResolvedValue(
                class {
                    constructor() {
                        return {};
                    }
                },
            );
            this.instantiate = jest.fn().mockResolvedValue({});
            return this;
        }),
    };
});

jest.mock('../../mediacreator/MediaCreator', () => {
    return {
        DIVEMediaCreator: jest.fn().mockImplementation(() => {
            return {
                GenerateMedia: jest.fn(),
            };
        }),
    };
});

jest.mock('../../ar/ARSystem', () => {
    return {
        ARSystem: jest.fn().mockImplementation(() => {
            return {
                Launch: jest.fn(),
            };
        }),
    };
});

jest.mock('../../toolbox/select/SelectTool', () => {
    return {
        isSelectTool: jest.fn().mockReturnValue(true),
        DIVESelectTool: jest.fn().mockImplementation(() => {
            return {
                AttachGizmo: jest.fn(),
                DetachGizmo: jest.fn(),
            };
        }),
    };
});

const mockScene = {
    SetBackground: jest.fn(),
    AddSceneObject: jest.fn(),
    UpdateSceneObject: jest.fn(),
    DeleteSceneObject: jest.fn(),
    PlaceOnFloor: jest.fn(),
    GetSceneObject: jest.fn().mockReturnValue({
        attach: jest.fn(),
        DropIt: jest.fn(),
    }),
    background: {
        getHexString: jest.fn().mockReturnValue('ffffff'),
    },
    Root: {
        attach: jest.fn(),
        floor: {
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
    },
    Grid: {
        SetVisibility: jest.fn(),
    },
    ComputeSceneBB: jest.fn(),
} as unknown as DIVEScene;

const mockRenderer = {
    render: jest.fn(),
    OnResize: jest.fn(),
    StartRenderer: jest.fn(),
} as unknown as DIVERenderPipeline;

const mockEngine = {
    scene: mockScene,
    renderer: mockRenderer,
    camera: {},
    start: jest.fn(),
} as unknown as DIVEEngine;

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
        setCameraLayer: jest.fn(),
        onResize: jest.fn(),
        layers: {
            mask: 1,
        },
    },
    MoveTo: jest.fn(),
    RevertLast: jest.fn(),
    ComputeEncompassingView: jest.fn().mockReturnValue({
        position: { x: 1, y: 2, z: 3 },
        target: { x: 4, y: 5, z: 6 },
    }),
} as unknown as DIVEOrbitController;

const mockToolBox = {
    UseTool: jest.fn(),
    GetActiveTool: jest.fn().mockReturnValue({
        AttachGizmo: jest.fn(),
        DetachGizmo: jest.fn(),
    }),
    SetGizmoMode: jest.fn(),
    SetGizmoVisibility: jest.fn(),
    SetGizmoScaleLinked: jest.fn(),
} as unknown as DIVEToolbox;

describe('DIVECommunication', () => {
    let testCom: DIVECommunication;

    beforeEach(() => {
        testCom = new DIVECommunication(
            mockEngine,
            mockController,
            mockToolBox,
        );
    });

    afterEach(() => {
        testCom.DestroyInstance();
        jest.clearAllMocks();
    });

    it('should instantiate', () => {
        expect(testCom).toBeDefined();
        expect(DIVECommunication['__instances']).toHaveLength(1);
    });
});
