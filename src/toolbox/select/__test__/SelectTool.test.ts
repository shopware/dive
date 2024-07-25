import { DIVESelectTool, isSelectTool } from '../SelectTool';
import DIVEScene from '../../../scene/Scene';
import DIVEOrbitControls from '../../../controls/OrbitControls';
import { DIVERenderer, DIVERendererDefaultSettings } from '../../../renderer/Renderer';
import { DIVESelectable } from '../../../interface/Selectable';
import type DIVEPerspectiveCamera from '../../../camera/PerspectiveCamera';
import { type Object3D } from 'three';
import { type DIVEBaseTool } from '../../BaseTool';
import { DIVEAnimationSystem } from '../../../animation/AnimationSystem';
import { Tween } from '@tweenjs/tween.js';

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

jest.mock('../../../scene/Scene', () => {
    return jest.fn(function () {
        this.add = jest.fn();
        this.children = [];
        this.Root = {
            children: [],
        }
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
                callback({ value: false });
                this.object = {};
                callback({ value: false });
                this.object = {
                    onMove: 'hello',
                };
                callback({ value: false });
                this.object = {
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
} as unknown as DIVERenderer;
const mockScene: DIVEScene = new DIVEScene();
const mockAnimSystem = new DIVEAnimationSystem(mockRenderer);
const mockController: DIVEOrbitControls = new DIVEOrbitControls(mockCamera, mockRenderer, mockAnimSystem);

describe('dive/toolbox/select/DIVESelectTool', () => {
    it('should test if it is SelectTool', () => {
        const selectTool = { isSelectTool: true } as unknown as DIVEBaseTool;
        expect(isSelectTool(selectTool)).toBeDefined();
    });

    it('should instantiate', () => {
        const selectTool = new DIVESelectTool(mockScene, mockController);
        expect(selectTool).toBeDefined();
    });

    it('should activate', () => {
        const selectTool = new DIVESelectTool(mockScene, mockController);
        expect(() => selectTool.Activate()).not.toThrow();
    });

    it('should execute onClick without hit', () => {
        const selectTool = new DIVESelectTool(mockScene, mockController);
        selectTool['_gizmo'].object = {} as unknown as Object3D & DIVESelectable;
        expect(() => selectTool.onClick({ offsetX: 0, offsetY: 0 } as PointerEvent)).not.toThrow();
    });

    it('should execute onClick with hit', () => {
        mock_intersectObjects.mockReturnValueOnce(
            [{
                object: {
                    uuid: 'test',
                    visible: true,
                    parent: { name: 'this is the test scene root!!!', parent: null }
                }
            }]
        );
        const selectTool = new DIVESelectTool(mockScene, mockController);
        expect(() => selectTool.onClick({ offsetX: 0, offsetY: 0 } as PointerEvent)).not.toThrow();
    });

    it('should execute onClick with same ISelectable hit', () => {
        const mock_onSelect = jest.fn();

        mock_intersectObjects.mockReturnValueOnce([{
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
        }]);
        const selectTool = new DIVESelectTool(mockScene, mockController);
        selectTool['_gizmo'].object = {
            visible: true,
            isSelectable: true,
            uuid: 'test0',
        } as unknown as Object3D & DIVESelectable;
        expect(() => selectTool.onClick({ offsetX: 0, offsetY: 0 } as PointerEvent)).not.toThrow();
    });

    it('should execute onClick with ISelectable hit', () => {
        const mock_onSelect = jest.fn();

        mock_intersectObjects.mockReturnValueOnce([{
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
        }]);
        const selectTool = new DIVESelectTool(mockScene, mockController);
        selectTool['_gizmo'].object = {
            isSelectable: true,
            uuid: 'test1',
        } as unknown as Object3D & DIVESelectable;
        expect(() => selectTool.onClick({ offsetX: 0, offsetY: 0 } as PointerEvent)).not.toThrow();
    });

    it('should execute onClick with IMovable hit', () => {
        const mock_onSelect = jest.fn();

        mock_intersectObjects.mockReturnValueOnce([{
            object: {
                isSelectable: true,
                isMoveable: true,
                onSelect: mock_onSelect,
                parent: {
                    name: 'this is the test scene root!!!',
                    parent: null,
                },
            },
        }]);
        const selectTool = new DIVESelectTool(mockScene, mockController);
        expect(() => selectTool.onClick({ offsetX: 0, offsetY: 0 } as PointerEvent)).not.toThrow();
    });

    it('should Select', () => {
        const selectTool = new DIVESelectTool(mockScene, mockController);
        const mock_onSelect = jest.fn();
        expect(() => selectTool.Select({ isSelectable: true })).not.toThrow();
        expect(() => selectTool.Select({ isMoveable: true, onSelect: mock_onSelect } as unknown as DIVESelectable)).not.toThrow();
        expect(mock_onSelect).toHaveBeenCalledTimes(1);
    });

    it('should Deselect', () => {
        const selectTool = new DIVESelectTool(mockScene, mockController);
        const mock_onDeselect = jest.fn();
        expect(() => selectTool.Deselect({ isSelectable: true })).not.toThrow();
        expect(() => selectTool.Deselect({ isMoveable: true, onDeselect: mock_onDeselect } as unknown as DIVESelectable)).not.toThrow();
        expect(mock_onDeselect).toHaveBeenCalledTimes(1);
    });

    it('should set gizmo mode', () => {
        const selectTool = new DIVESelectTool(mockScene, mockController);
        expect(() => selectTool.SetGizmoMode('translate')).not.toThrow();
    });
});