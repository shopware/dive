
import { type Object3D, type Vector3 } from 'three';
import DIVEOrbitControls from '../../controls/OrbitControls';
import DIVEScene from '../../scene/Scene';
import DIVEBaseTool from '../BaseTool';
import DIVEToolbox from '../Toolbox';
import { type DIVEHoverable } from '../../interface/Hoverable';
import { DIVEDraggable } from '../../interface/Draggable';

/**
 * @jest-environment jsdom
 */


const mock_Canvas = {
    width: 0,
    height: 0,
    getContext: jest.fn(),
    clientWidth: 1000,
    clientHeight: 1000,
    offsetLeft: 0,
    offsetTop: 0,
};

const mockController = {
    domElement: mock_Canvas,
    object: {
        isPerspectiveCamera: true,
        type: 'cameraP'
    }
} as unknown as DIVEOrbitControls;

const mockScene = {
    children: [],
} as unknown as DIVEScene;

const abstractWrapper = class Wrapper extends DIVEBaseTool {
    constructor(scene: DIVEScene, controller: DIVEOrbitControls) {
        super(scene, controller);
        this.name = "DIVEBaseTool";
    }
};

describe('dive/toolbox/DIVEBaseTool', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should instantiate', () => {
        const toolBox = new abstractWrapper(mockScene, mockController);
        expect(toolBox).toBeDefined();
    });

    it('should raycast', () => {
        const toolBox = new abstractWrapper(mockScene, mockController);
        expect(() => toolBox['raycast']()).not.toThrow();
        expect(() => toolBox['raycast']([])).not.toThrow();
    });

    it('should return correct pointerAnyDown', () => {
        const toolBox = new abstractWrapper(mockScene, mockController);
        expect(toolBox).toBeDefined();
        expect(toolBox['_pointerAnyDown']).toBeDefined();
        expect(toolBox['_pointerAnyDown']).toBe(false);

        toolBox['_pointerPrimaryDown'] = true;
        expect(toolBox['_pointerAnyDown']).toBe(true);
    });

    it('should execute onPointerDown correctly', () => {
        const toolBox = new abstractWrapper(mockScene, mockController);
        expect(() => toolBox.onPointerDown({ button: 0 } as PointerEvent)).not.toThrow();
        expect(() => toolBox.onPointerDown({ button: 1 } as PointerEvent)).not.toThrow();
        expect(() => toolBox.onPointerDown({ button: 2 } as PointerEvent)).not.toThrow();

        toolBox['_intersects'] = [
            {
                distance: 1,
                point: {
                    clone() {
                        return {
                            x: 1,
                            y: 1,
                            z: 1
                        } as unknown as Vector3;
                    },
                    x: 1,
                    y: 1,
                    z: 1
                } as unknown as Vector3,
                object: {
                    uuid: 'uuid2',
                    isHoverable: true,
                    onPointerEnter() {
                        return;
                    },
                } as unknown as Object3D & DIVEHoverable
            }
        ];

        expect(() => toolBox.onPointerDown({ button: 0 } as PointerEvent)).not.toThrow();
        expect(() => toolBox.onPointerDown({ button: 1 } as PointerEvent)).not.toThrow();
        expect(() => toolBox.onPointerDown({ button: 2 } as PointerEvent)).not.toThrow();
    });

    it('should execute onPointerMove correctly', () => {
        const toolBox = new abstractWrapper(mockScene, mockController);
        jest.spyOn(toolBox['_raycaster'], 'setFromCamera').mockImplementation();

        // test with no hit with hovered object before
        jest.spyOn(toolBox['_raycaster'], 'intersectObjects').mockReturnValueOnce([]);

        toolBox['_hovered'] = {
            uuid: 'uuid',
            onPointerLeave() {
                return;
            },
        } as Object3D & DIVEHoverable;

        expect(() => toolBox.onPointerMove({ button: 0, offsetX: 100, offsetY: 100 } as PointerEvent)).not.toThrow();
        expect(() => toolBox.onPointerMove({ button: 1, offsetX: 100, offsetY: 100 } as PointerEvent)).not.toThrow();
        expect(() => toolBox.onPointerMove({ button: 2, offsetX: 100, offsetY: 100 } as PointerEvent)).not.toThrow();

        // test with no hovered object
        jest.spyOn(toolBox['_raycaster'], 'intersectObjects').mockReturnValueOnce(
            [
                {
                    distance: 1,
                    point: {
                        x: 1,
                        y: 1,
                        z: 1
                    } as unknown as Vector3,
                    object: {
                        uuid: 'uuid',
                        isHoverable: true,
                    } as Object3D & DIVEHoverable
                }
            ]
        );

        toolBox['_hovered'] = null;

        expect(() => toolBox.onPointerMove({ button: 0, offsetX: 100, offsetY: 100 } as PointerEvent)).not.toThrow();
        expect(() => toolBox.onPointerMove({ button: 1, offsetX: 100, offsetY: 100 } as PointerEvent)).not.toThrow();
        expect(() => toolBox.onPointerMove({ button: 2, offsetX: 100, offsetY: 100 } as PointerEvent)).not.toThrow();

        // test with no hovered object with onPointerEnter
        jest.spyOn(toolBox['_raycaster'], 'intersectObjects').mockReturnValueOnce(
            [
                {
                    distance: 1,
                    point: {
                        x: 1,
                        y: 1,
                        z: 1
                    } as unknown as Vector3,
                    object: {
                        uuid: 'uuid',
                        isHoverable: true,
                        onPointerEnter() {
                            return;
                        },
                    } as unknown as Object3D & DIVEHoverable
                }
            ]
        );

        expect(() => toolBox.onPointerMove({ button: 0, offsetX: 100, offsetY: 100 } as PointerEvent)).not.toThrow();
        expect(() => toolBox.onPointerMove({ button: 1, offsetX: 100, offsetY: 100 } as PointerEvent)).not.toThrow();
        expect(() => toolBox.onPointerMove({ button: 2, offsetX: 100, offsetY: 100 } as PointerEvent)).not.toThrow();

        // test with same hovered object
        jest.spyOn(toolBox['_raycaster'], 'intersectObjects').mockReturnValueOnce(
            [
                {
                    distance: 1,
                    point: {
                        x: 1,
                        y: 1,
                        z: 1
                    } as unknown as Vector3,
                    object: {
                        uuid: 'uuid',
                        isHoverable: true,
                        onPointerOver() {
                            return;
                        }
                    } as unknown as Object3D & DIVEHoverable
                }
            ]
        );

        toolBox['_hovered'] = {
            uuid: 'uuid',
            onPointerLeave() {
                return;
            },
        } as Object3D & DIVEHoverable;

        expect(() => toolBox.onPointerMove({ button: 0, offsetX: 100, offsetY: 100 } as PointerEvent)).not.toThrow();
        expect(() => toolBox.onPointerMove({ button: 1, offsetX: 100, offsetY: 100 } as PointerEvent)).not.toThrow();
        expect(() => toolBox.onPointerMove({ button: 2, offsetX: 100, offsetY: 100 } as PointerEvent)).not.toThrow();

        // test with different hovered object
        jest.spyOn(toolBox['_raycaster'], 'intersectObjects').mockReturnValueOnce(
            [
                {
                    distance: 1,
                    point: {
                        x: 1,
                        y: 1,
                        z: 1
                    } as unknown as Vector3,
                    object: {
                        uuid: 'uuid2',
                        isHoverable: true,
                        onPointerEnter() {
                            return;
                        },
                    } as unknown as Object3D & DIVEHoverable
                }
            ]
        );

        toolBox['_hovered'] = {
            uuid: 'uuid',
            onPointerLeave() {
                return;
            },
        } as Object3D & DIVEHoverable;

        expect(() => toolBox.onPointerMove({ button: 0, offsetX: 100, offsetY: 100 } as PointerEvent)).not.toThrow();
        expect(() => toolBox.onPointerMove({ button: 1, offsetX: 100, offsetY: 100 } as PointerEvent)).not.toThrow();
        expect(() => toolBox.onPointerMove({ button: 2, offsetX: 100, offsetY: 100 } as PointerEvent)).not.toThrow();

        // test with pointer down
        toolBox['_pointerPrimaryDown'] = true;
        expect(() => toolBox.onPointerMove({ button: 0, offsetX: 100, offsetY: 100 } as PointerEvent)).not.toThrow();
        expect(() => toolBox.onPointerMove({ button: 1, offsetX: 100, offsetY: 100 } as PointerEvent)).not.toThrow();
        expect(() => toolBox.onPointerMove({ button: 2, offsetX: 100, offsetY: 100 } as PointerEvent)).not.toThrow();

        // test with pointer down while already dragging
        toolBox['_pointerPrimaryDown'] = true;
        toolBox['_dragging'] = true;
        expect(() => toolBox.onPointerMove({ button: 0, offsetX: 100, offsetY: 100 } as PointerEvent)).not.toThrow();
        expect(() => toolBox.onPointerMove({ button: 1, offsetX: 100, offsetY: 100 } as PointerEvent)).not.toThrow();
        expect(() => toolBox.onPointerMove({ button: 2, offsetX: 100, offsetY: 100 } as PointerEvent)).not.toThrow();
    });

    it('should execute onPointerUp correctly', () => {
        const toolBox = new abstractWrapper(mockScene, mockController);
        expect(() => toolBox.onPointerUp({ button: 0 } as PointerEvent)).not.toThrow();
        expect(() => toolBox.onPointerUp({ button: 1 } as PointerEvent)).not.toThrow();
        expect(() => toolBox.onPointerUp({ button: 2 } as PointerEvent)).not.toThrow();

        toolBox['pointerWasDragged'] = () => { return true; };
        toolBox['_dragging'] = true;
        toolBox['_intersects'] = [
            {
                distance: 1,
                point: {
                    clone() {
                        return {
                            x: 1,
                            y: 1,
                            z: 1
                        } as unknown as Vector3;
                    },
                    x: 1,
                    y: 1,
                    z: 1
                } as unknown as Vector3,
                object: {
                    uuid: 'uuid2',
                    isHoverable: true,
                    onPointerEnter() {
                        return;
                    },
                } as unknown as Object3D & DIVEHoverable
            }
        ];
        toolBox['_draggable'] = {
            onDragEnd() {
                return;
            },
        } as unknown as Object3D & DIVEDraggable;
        expect(() => toolBox.onPointerUp({ button: 0 } as PointerEvent)).not.toThrow();
        expect(() => toolBox.onPointerUp({ button: 1 } as PointerEvent)).not.toThrow();
        expect(() => toolBox.onPointerUp({ button: 2 } as PointerEvent)).not.toThrow();
    });

    it('should execute onDragStart correctly', () => {
        const toolBox = new abstractWrapper(mockScene, mockController);
        expect(() => toolBox.onDragStart({} as PointerEvent)).not.toThrow();

        toolBox['_draggable'] = {
            onDragStart() {
                return;
            },
        } as unknown as Object3D & DIVEDraggable;
        expect(() => toolBox.onDragStart({} as PointerEvent)).not.toThrow();

        toolBox['_dragRaycastOnObjects'] = [];
        expect(() => toolBox.onDragStart({} as PointerEvent)).not.toThrow();

        jest.spyOn(toolBox['_raycaster'], 'intersectObjects').mockReturnValueOnce([]);
        expect(() => toolBox.onDragStart({} as PointerEvent)).not.toThrow();

        jest.spyOn(toolBox['_raycaster'], 'intersectObjects').mockReturnValueOnce([
            {
                distance: 1,
                point: {
                    clone() {
                        return {
                            x: 1,
                            y: 1,
                            z: 1
                        } as unknown as Vector3;
                    },
                    x: 1,
                    y: 1,
                    z: 1
                } as unknown as Vector3,
                object: {
                    uuid: 'uuid2',
                    isHoverable: true,
                    onPointerEnter() {
                        return;
                    },
                } as unknown as Object3D & DIVEHoverable
            }
        ]);
        expect(() => toolBox.onDragStart({} as PointerEvent)).not.toThrow();

        toolBox['_draggable'] = {
            onDragStart() {
                return;
            },
        } as unknown as Object3D & DIVEDraggable;
        expect(() => toolBox.onDragStart({} as PointerEvent)).not.toThrow();
    });

    it('should execute onDrag correctly', () => {
        const toolBox = new abstractWrapper(mockScene, mockController);
        expect(() => toolBox.onDrag({} as PointerEvent)).not.toThrow();

        toolBox['_dragRaycastOnObjects'] = [];
        expect(() => toolBox.onDrag({} as PointerEvent)).not.toThrow();

        toolBox['_draggable'] = {
            onDrag() {
                return;
            },
        } as unknown as Object3D & DIVEDraggable;
        jest.spyOn(toolBox['_raycaster'], 'intersectObjects').mockReturnValueOnce(
            [
                {
                    distance: 1,
                    point: {
                        clone() {
                            return {
                                x: 1,
                                y: 1,
                                z: 1
                            } as unknown as Vector3;
                        },
                        x: 1,
                        y: 1,
                        z: 1
                    } as unknown as Vector3,
                    object: {
                        uuid: 'uuid2',
                        isHoverable: true,
                        onPointerEnter() {
                            return;
                        },
                    } as unknown as Object3D & DIVEHoverable
                }
            ]
        );
        expect(() => toolBox.onDrag({} as PointerEvent)).not.toThrow();
    });

    it('should execute onDragEnd correctly', () => {
        const toolBox = new abstractWrapper(mockScene, mockController);
        expect(() => toolBox.onDragEnd({} as PointerEvent)).not.toThrow();
    });
});