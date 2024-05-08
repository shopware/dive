import DIVESelectTool from '../SelectTool';
import DIVEScene from '../../../scene/Scene';
import DIVEOrbitControls from '../../../controls/OrbitControls';
import DIVEPerspectiveCamera from '../../../camera/PerspectiveCamera';
import DIVERenderer, { DIVERendererDefaultSettings } from '../../../renderer/Renderer';
import { DIVESelectable } from '../../../interface/Selectable';

jest.mock('../../../renderer/Renderer', () => {
    return jest.fn(function () {
        return this;
    });
});

jest.mock('../../../toolbox/BaseTool', () => {
    return jest.fn(function (cam) {
        this.cam = cam;
        this.add = jest.fn();
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
const mockRenderer: DIVERenderer = new DIVERenderer(DIVERendererDefaultSettings);
const mockScene: DIVEScene = new DIVEScene();
const mockController: DIVEOrbitControls = new DIVEOrbitControls(mockCamera, mockRenderer);

describe('dive/toolbox/select/DIVESelectTool', () => {
    it('should instantiate', () => {
        const selectTool = new DIVESelectTool(mockScene, mockController);
        expect(selectTool).toBeDefined();
        expect(mockController.object.onSetCameraLayer).toBeDefined();
        expect(() => mockController.object.onSetCameraLayer(0)).not.toThrow();
    });

    it('should activate', () => {
        const selectTool = new DIVESelectTool(mockScene, mockController);
        expect(() => selectTool.Activate()).not.toThrow();
    });

    it('should execute onPointerUp without hit', () => {
        const selectTool = new DIVESelectTool(mockScene, mockController);
        expect(() => selectTool.onPointerUp({ offsetX: 0, offsetY: 0 } as PointerEvent)).not.toThrow();
    });

    it('should execute onPointerUp with hit', () => {
        mock_intersectObjects.mockReturnValueOnce([{ object: { parent: { name: 'this is the test scene root!!!', parent: null } } }]);
        const selectTool = new DIVESelectTool(mockScene, mockController);
        expect(() => selectTool.onPointerUp({ offsetX: 0, offsetY: 0 } as PointerEvent)).not.toThrow();
    });

    it('should execute onPointerUp with ISelectable hit', () => {
        const mock_onSelect = jest.fn();

        mock_intersectObjects.mockReturnValueOnce([{
            object: {
                isSelectable: true,
                onSelect: mock_onSelect,
                parent: {
                    name: 'this is the test scene root!!!',
                    parent: null,
                },
            },
        }]);
        const selectTool = new DIVESelectTool(mockScene, mockController);
        expect(() => selectTool.onPointerUp({ offsetX: 0, offsetY: 0 } as PointerEvent)).not.toThrow();
        expect(mock_onSelect).toHaveBeenCalledTimes(1);
    });

    it('should execute onPointerUp with IMovable hit', () => {
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
        expect(() => selectTool.onPointerUp({ offsetX: 0, offsetY: 0 } as PointerEvent)).not.toThrow();
        expect(mock_attach).toHaveBeenCalledTimes(1);
    });

    it('should deselect', () => {
        const selectTool = new DIVESelectTool(mockScene, mockController);
        expect(() => selectTool.Deselect({ isSelectable: true })).not.toThrow();
        expect(() => selectTool.Deselect({ isMoveable: true, onDeselect: jest.fn() } as unknown as DIVESelectable)).not.toThrow();
    })

    it('should set gizmo mode', () => {
        const selectTool = new DIVESelectTool(mockScene, mockController);
        expect(() => selectTool.SetGizmoMode('translate')).not.toThrow();
    });
});