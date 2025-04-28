import { DIVESelectTool, isSelectTool } from '../SelectTool';
import { DIVEScene } from '../../../../engine/scene/Scene';
import { DIVEOrbitController } from '../../../controller/orbit/OrbitController';
import { DIVESelectable } from '../../../../interfaces/Selectable';
import { type DIVEPerspectiveCamera } from '../../../../engine/camera/PerspectiveCamera';
import { type Object3D } from 'three';
import { type DIVEBaseTool } from '../../BaseTool';
import { DIVEAnimationSystem } from '../../../animation/AnimationSystem';
import { Tween } from '@tweenjs/tween.js';
import { type DIVEMovable } from '../../../../interfaces/Movable';
import { DIVERenderer } from '../../../../engine/renderer/Renderer';

jest.mock('../../../../engine/renderer/Renderer', () => {
    return {
        DIVERenderer: jest.fn(function () {
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

jest.mock('../../../../engine/scene/Scene', () => {
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
const mockScene: DIVEScene = new DIVEScene();
const mockRenderer = new DIVERenderer(mockScene, mockCamera);
const mockAnimSystem = new DIVEAnimationSystem();
const mockController: DIVEOrbitController = new DIVEOrbitController(
    mockCamera,
    mockRenderer.webglrenderer.domElement,
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

    it('should identify as SelectTool', () => {
        const selectTool = new DIVESelectTool(mockScene, mockController);
        expect(isSelectTool(selectTool)).toBe(true);
    });

    it('should not identify non-SelectTool as SelectTool', () => {
        const nonSelectTool = {} as DIVEBaseTool;
        expect(isSelectTool(nonSelectTool)).toBe(false);
    });

    it('should select object with onSelect callback', () => {
        const selectTool = new DIVESelectTool(mockScene, mockController);
        const mockSelectable = {
            onSelect: jest.fn(),
        } as unknown as DIVESelectable;

        selectTool.Select(mockSelectable);
        expect(mockSelectable.onSelect).toHaveBeenCalled();
    });

    it('should select object without onSelect callback', () => {
        const selectTool = new DIVESelectTool(mockScene, mockController);
        const mockSelectable = {} as unknown as DIVESelectable;

        expect(() => selectTool.Select(mockSelectable)).not.toThrow();
    });

    it('should deselect object with onDeselect callback', () => {
        const selectTool = new DIVESelectTool(mockScene, mockController);
        const mockSelectable = {
            onDeselect: jest.fn(),
        } as unknown as DIVESelectable;

        selectTool.Deselect(mockSelectable);
        expect(mockSelectable.onDeselect).toHaveBeenCalled();
    });

    it('should deselect object without onDeselect callback', () => {
        const selectTool = new DIVESelectTool(mockScene, mockController);
        const mockSelectable = {} as unknown as DIVESelectable;

        expect(() => selectTool.Deselect(mockSelectable)).not.toThrow();
    });

    it('should attach gizmo to movable object', () => {
        const selectTool = new DIVESelectTool(mockScene, mockController);
        const mockMovable = {
            isMovable: true,
            visible: true,
        } as unknown as Object3D & DIVESelectable & DIVEMovable;

        selectTool['_gizmo'] = {
            attach: jest.fn(),
        } as any;

        selectTool.AttachGizmo(mockMovable);
        expect(selectTool['_gizmo'].attach).toHaveBeenCalledWith(mockMovable);
    });

    it('should detach gizmo', () => {
        const selectTool = new DIVESelectTool(mockScene, mockController);
        selectTool['_gizmo'] = {
            detach: jest.fn(),
        } as any;

        selectTool.DetachGizmo();
        expect(selectTool['_gizmo'].detach).toHaveBeenCalled();
    });

    it('should handle click with no intersections', () => {
        const selectTool = new DIVESelectTool(mockScene, mockController);
        const mockSelectable = {
            uuid: 'test',
            onDeselect: jest.fn(),
            isSelectable: true,
        } as unknown as Object3D & DIVESelectable;

        selectTool['_gizmo'] = {
            object: mockSelectable,
            detach: jest.fn(),
        } as any;

        jest.spyOn(
            selectTool['_raycaster'],
            'intersectObjects',
        ).mockReturnValue([]);

        selectTool.onClick({} as PointerEvent);
        expect(mockSelectable.onDeselect).toHaveBeenCalled();
    });

    it('should handle click on same object', () => {
        const selectTool = new DIVESelectTool(mockScene, mockController);
        const mockSelectable = {
            uuid: 'test',
            isSelectable: true,
            visible: true,
        } as unknown as Object3D & DIVESelectable;

        selectTool['_gizmo'] = {
            object: mockSelectable,
        } as any;

        jest.spyOn(
            selectTool['_raycaster'],
            'intersectObjects',
        ).mockReturnValue([
            {
                object: mockSelectable,
            } as any,
        ]);

        selectTool.onClick({} as PointerEvent);
        // No deselect should happen
        expect(selectTool['_gizmo'].object).toBe(mockSelectable);
    });

    it('should handle click on different object', () => {
        const selectTool = new DIVESelectTool(mockScene, mockController);
        const oldSelectable = {
            uuid: 'old',
            isSelectable: true,
            visible: true,
            onDeselect: jest.fn(),
        } as unknown as Object3D & DIVESelectable;

        const newSelectable = {
            uuid: 'new',
            isSelectable: true,
            visible: true,
            onSelect: jest.fn(),
        } as unknown as Object3D & DIVESelectable;

        selectTool['_gizmo'] = {
            object: oldSelectable,
            detach: jest.fn(),
        } as any;

        jest.spyOn(
            selectTool['_raycaster'],
            'intersectObjects',
        ).mockReturnValue([
            {
                object: newSelectable,
            } as any,
        ]);

        selectTool.onClick({} as PointerEvent);
        expect(oldSelectable.onDeselect).toHaveBeenCalled();
        expect(newSelectable.onSelect).toHaveBeenCalled();
    });
});
