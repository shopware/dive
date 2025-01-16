import { DIVESelectTool, isSelectTool } from '../SelectTool';
import { DIVEScene } from '../../../scene/Scene';
import DIVEOrbitControls from '../../../controls/OrbitControls';
import { DIVERenderer } from '../../../renderer/Renderer';
import { DIVESelectable } from '../../../interface/Selectable';
import type DIVEPerspectiveCamera from '../../../camera/PerspectiveCamera';
import { type Object3D } from 'three';
import { type DIVEBaseTool } from '../../BaseTool';
import { DIVEAnimationSystem } from '../../../animation/AnimationSystem';
import { Tween } from '@tweenjs/tween.js';

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
            },
        };
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
    };
});

jest.mock('../../../scene/Scene', () => {
    return {
        DIVEScene: jest.fn(function () {
            this.add = jest.fn();
            this.children = [];
            this.Root = {
                children: [],
            };
            return this;
        }),
    };
});

const mockCamera: DIVEPerspectiveCamera = {} as DIVEPerspectiveCamera;
const mockRenderer = {
    render: jest.fn(),
    OnResize: jest.fn(),
} as unknown as DIVERenderer;
const mockScene: DIVEScene = new DIVEScene();
const mockAnimSystem = new DIVEAnimationSystem(mockRenderer);
const mockController: DIVEOrbitControls = new DIVEOrbitControls(
    mockCamera,
    mockRenderer,
    mockAnimSystem,
);

let selectTool: DIVESelectTool;
let intersectObjectsSpy: jest.SpyInstance;

describe('dive/toolbox/select/DIVESelectTool', () => {
    beforeEach(() => {
        selectTool = new DIVESelectTool(mockScene, mockController);
        intersectObjectsSpy = jest
            .spyOn(selectTool['_raycaster'], 'intersectObjects')
            .mockReturnValue([]);
    });

    it('should test if it is SelectTool', () => {
        const selectTool = { isSelectTool: true } as unknown as DIVEBaseTool;
        expect(isSelectTool(selectTool)).toBeDefined();
    });

    it('should instantiate', () => {
        expect(selectTool).toBeDefined();
    });

    it('should activate', () => {
        expect(() => selectTool.Activate()).not.toThrow();
    });

    it('should execute onClick without hit', () => {
        selectTool.AttachGizmo({} as unknown as DIVESelectable);
        expect(() =>
            selectTool.onClick({ offsetX: 0, offsetY: 0 } as PointerEvent),
        ).not.toThrow();
    });

    it('should execute onClick with hit', () => {
        intersectObjectsSpy.mockReturnValueOnce([
            {
                object: {
                    uuid: 'test',
                    visible: true,
                    parent: {
                        name: 'this is the test scene root!!!',
                        parent: null,
                    },
                },
            },
        ]);

        expect(() =>
            selectTool.onClick({ offsetX: 0, offsetY: 0 } as PointerEvent),
        ).not.toThrow();
    });

    it('should execute onClick with same ISelectable hit', () => {
        const mock_onSelect = jest.fn();

        intersectObjectsSpy.mockReturnValueOnce([
            {
                object: {
                    isSelectable: true,
                    onSelect: mock_onSelect,
                    visible: true,
                    parent: {
                        name: 'this is the test scene root!!!',
                        parent: null,
                    },
                    uuid: 'test0',
                },
            },
        ]);
        selectTool.AttachGizmo({
            visible: true,
            isSelectable: true,
            uuid: 'test0',
        } as unknown as Object3D & DIVESelectable);
        expect(() =>
            selectTool.onClick({ offsetX: 0, offsetY: 0 } as PointerEvent),
        ).not.toThrow();
    });

    it('should execute onClick with ISelectable hit', () => {
        const mock_onSelect = jest.fn();

        intersectObjectsSpy.mockReturnValueOnce([
            {
                object: {
                    isSelectable: true,
                    onSelect: mock_onSelect,
                    visible: true,
                    parent: {
                        name: 'this is the test scene root!!!',
                        parent: null,
                    },
                    uuid: 'test0',
                },
            },
        ]);
        selectTool.AttachGizmo({
            isSelectable: true,
            uuid: 'test1',
        } as unknown as Object3D & DIVESelectable);
        expect(() =>
            selectTool.onClick({ offsetX: 0, offsetY: 0 } as PointerEvent),
        ).not.toThrow();
    });

    it('should execute onClick with IMovable hit', () => {
        const mock_onSelect = jest.fn();

        intersectObjectsSpy.mockReturnValueOnce([
            {
                object: {
                    isSelectable: true,
                    isMovable: true,
                    onSelect: mock_onSelect,
                    parent: {
                        name: 'this is the test scene root!!!',
                        parent: null,
                    },
                },
            },
        ]);

        expect(() =>
            selectTool.onClick({ offsetX: 0, offsetY: 0 } as PointerEvent),
        ).not.toThrow();
    });

    it('should Select', () => {
        const mock_onSelect = jest.fn();
        expect(() => selectTool.Select({ isSelectable: true })).not.toThrow();
        expect(() =>
            selectTool.Select({
                isMovable: true,
                onSelect: mock_onSelect,
            } as unknown as DIVESelectable),
        ).not.toThrow();
        expect(mock_onSelect).toHaveBeenCalledTimes(1);
    });

    it('should Deselect', () => {
        const mock_onDeselect = jest.fn();
        expect(() => selectTool.Deselect({ isSelectable: true })).not.toThrow();
        expect(() =>
            selectTool.Deselect({
                isMovable: true,
                onDeselect: mock_onDeselect,
            } as unknown as DIVESelectable),
        ).not.toThrow();
        expect(mock_onDeselect).toHaveBeenCalledTimes(1);
    });

    it('should set gizmo mode', () => {
        expect(() => selectTool.SetGizmoMode('translate')).not.toThrow();
    });
});
