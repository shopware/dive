import { DIVEBaseTool } from '../BaseTool';
import { DIVEOrbitController } from '../../controller/orbit/OrbitController';
import { DIVEScene } from '../../../engine/scene/Scene';
import { Vector3, type Intersection, type Object3D } from 'three';
import { type DIVEHoverable } from '../../../interfaces/Hoverable';
import { type DIVEDraggable } from '../../../interfaces/Draggable';
import { RaycasterIntersectObjectMock } from '../../../../__mocks__/three';

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
        type: 'cameraP',
    },
} as unknown as DIVEOrbitController;

const mockScene = {
    children: [],
} as unknown as DIVEScene;

const abstractWrapper = class Wrapper extends DIVEBaseTool {
    constructor(scene: DIVEScene, controller: DIVEOrbitController) {
        super(scene, controller);
        this.name = 'DIVEBaseTool';
    }
};

describe('dive/toolbox/DIVEBaseTool', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should instantiate', () => {
        const baseTool = new abstractWrapper(mockScene, mockController);
        expect(baseTool).toBeDefined();
    });

    it('should Activate', () => {
        const baseTool = new abstractWrapper(mockScene, mockController);
        expect(() => baseTool.Activate()).not.toThrow();
    });

    it('should Deactivate', () => {
        const baseTool = new abstractWrapper(mockScene, mockController);
        expect(() => baseTool.Deactivate()).not.toThrow();
    });

    it('should raycast', () => {
        const toolBox = new abstractWrapper(mockScene, mockController);
        RaycasterIntersectObjectMock.mockImplementationOnce(() => {
            return [
                {
                    object: {
                        visible: true,
                    },
                } as unknown as Intersection,
            ];
        });
        expect(() => toolBox['raycast']()).not.toThrow();
        expect(RaycasterIntersectObjectMock).toHaveBeenCalled();
    });

    it('should raycast with selection of objects', () => {
        const toolBox = new abstractWrapper(mockScene, mockController);
        const spy = jest
            .spyOn(toolBox['_raycaster'], 'intersectObjects')
            .mockImplementationOnce(() => {
                return [
                    {
                        object: {
                            visible: true,
                        },
                    } as unknown as Intersection,
                ];
            });
        expect(() => toolBox['raycast']([])).not.toThrow();
        expect(spy).toHaveBeenCalled();
    });

    it('should return correct pointerAnyDown', () => {
        const toolBox = new abstractWrapper(mockScene, mockController);
        expect(toolBox).toBeDefined();
        expect(toolBox['_pointerAnyDown']).toBeDefined();
        expect(toolBox['_pointerAnyDown']).toBe(false);

        toolBox['_pointerPrimaryDown'] = false;
        toolBox['_pointerMiddleDown'] = false;
        toolBox['_pointerSecondaryDown'] = false;
        expect(toolBox['_pointerAnyDown']).toBe(false);

        toolBox['_pointerPrimaryDown'] = true;
        toolBox['_pointerMiddleDown'] = false;
        toolBox['_pointerSecondaryDown'] = false;
        expect(toolBox['_pointerAnyDown']).toBe(true);

        toolBox['_pointerPrimaryDown'] = false;
        toolBox['_pointerMiddleDown'] = true;
        toolBox['_pointerSecondaryDown'] = false;
        expect(toolBox['_pointerAnyDown']).toBe(true);

        toolBox['_pointerPrimaryDown'] = false;
        toolBox['_pointerMiddleDown'] = false;
        toolBox['_pointerSecondaryDown'] = true;
        expect(toolBox['_pointerAnyDown']).toBe(true);
    });

    it('should execute onPointerDown correctly', () => {
        const toolBox = new abstractWrapper(mockScene, mockController);
        expect(() =>
            toolBox.onPointerDown({ button: 0 } as PointerEvent),
        ).not.toThrow();

        expect(() =>
            toolBox.onPointerDown({ button: 1 } as PointerEvent),
        ).not.toThrow();

        expect(() =>
            toolBox.onPointerDown({ button: 2 } as PointerEvent),
        ).not.toThrow();

        const spy = jest.spyOn(console, 'warn').mockImplementation();
        expect(() =>
            toolBox.onPointerDown({ button: 666 } as PointerEvent),
        ).not.toThrow();
        expect(spy).toHaveBeenCalled();

        toolBox['_intersects'] = [
            {
                distance: 1,
                point: {
                    clone() {
                        return {
                            x: 1,
                            y: 1,
                            z: 1,
                        } as unknown as Vector3;
                    },
                    x: 1,
                    y: 1,
                    z: 1,
                } as unknown as Vector3,
                object: {
                    uuid: 'uuid2',
                    isHoverable: true,
                    onPointerEnter() {
                        return;
                    },
                } as unknown as Object3D & DIVEHoverable,
            },
        ];

        expect(() =>
            toolBox.onPointerDown({ button: 0 } as PointerEvent),
        ).not.toThrow();
        expect(() =>
            toolBox.onPointerDown({ button: 1 } as PointerEvent),
        ).not.toThrow();
        expect(() =>
            toolBox.onPointerDown({ button: 2 } as PointerEvent),
        ).not.toThrow();
    });

    it('should execute onPointerMove correctly', () => {
        const toolBox = new abstractWrapper(mockScene, mockController);
        jest.spyOn(toolBox['_raycaster'], 'setFromCamera').mockImplementation();

        const spy = jest.spyOn(toolBox['_raycaster'], 'intersectObjects');

        // test with no hit with hovered object before
        spy.mockReturnValue([]);

        toolBox['_hovered'] = {
            uuid: 'uuid',
            onPointerLeave() {
                return;
            },
        } as Object3D & DIVEHoverable;

        expect(() =>
            toolBox.onPointerMove({
                button: 0,
                offsetX: 100,
                offsetY: 100,
            } as PointerEvent),
        ).not.toThrow();
        expect(() =>
            toolBox.onPointerMove({
                button: 1,
                offsetX: 100,
                offsetY: 100,
            } as PointerEvent),
        ).not.toThrow();
        expect(() =>
            toolBox.onPointerMove({
                button: 2,
                offsetX: 100,
                offsetY: 100,
            } as PointerEvent),
        ).not.toThrow();

        // test with no hovered object
        spy.mockReturnValue([
            {
                distance: 1,
                point: {
                    x: 1,
                    y: 1,
                    z: 1,
                } as unknown as Vector3,
                object: {
                    uuid: 'uuid',
                    isHoverable: true,
                    visible: true,
                } as Object3D & DIVEHoverable,
            },
        ]);

        toolBox['_hovered'] = null;

        expect(() =>
            toolBox.onPointerMove({
                button: 0,
                offsetX: 100,
                offsetY: 100,
            } as PointerEvent),
        ).not.toThrow();
        expect(() =>
            toolBox.onPointerMove({
                button: 1,
                offsetX: 100,
                offsetY: 100,
            } as PointerEvent),
        ).not.toThrow();
        expect(() =>
            toolBox.onPointerMove({
                button: 2,
                offsetX: 100,
                offsetY: 100,
            } as PointerEvent),
        ).not.toThrow();

        // test with no hovered object with onPointerEnter
        spy.mockReturnValue([
            {
                distance: 1,
                point: {
                    x: 1,
                    y: 1,
                    z: 1,
                } as unknown as Vector3,
                object: {
                    uuid: 'uuid',
                    isHoverable: true,
                    visible: true,
                    onPointerEnter() {
                        return;
                    },
                } as unknown as Object3D & DIVEHoverable,
            },
        ]);

        expect(() =>
            toolBox.onPointerMove({
                button: 0,
                offsetX: 100,
                offsetY: 100,
            } as PointerEvent),
        ).not.toThrow();
        expect(() =>
            toolBox.onPointerMove({
                button: 1,
                offsetX: 100,
                offsetY: 100,
            } as PointerEvent),
        ).not.toThrow();
        expect(() =>
            toolBox.onPointerMove({
                button: 2,
                offsetX: 100,
                offsetY: 100,
            } as PointerEvent),
        ).not.toThrow();

        // test with same hovered object
        spy.mockReturnValue([
            {
                distance: 1,
                point: {
                    x: 1,
                    y: 1,
                    z: 1,
                } as unknown as Vector3,
                object: {
                    uuid: 'uuid',
                    isHoverable: true,
                    visible: true,
                    onPointerOver() {
                        return;
                    },
                } as unknown as Object3D & DIVEHoverable,
            },
        ]);

        toolBox['_hovered'] = {
            uuid: 'uuid',
            visible: true,
            onPointerLeave() {
                return;
            },
        } as Object3D & DIVEHoverable;

        expect(() =>
            toolBox.onPointerMove({
                button: 0,
                offsetX: 100,
                offsetY: 100,
            } as PointerEvent),
        ).not.toThrow();
        expect(() =>
            toolBox.onPointerMove({
                button: 1,
                offsetX: 100,
                offsetY: 100,
            } as PointerEvent),
        ).not.toThrow();
        expect(() =>
            toolBox.onPointerMove({
                button: 2,
                offsetX: 100,
                offsetY: 100,
            } as PointerEvent),
        ).not.toThrow();

        // test with different hovered object
        spy.mockReturnValue([
            {
                distance: 1,
                point: new Vector3(1, 1, 1),
                object: {
                    uuid: 'uuid2',
                    isHoverable: true,
                    visible: true,
                    onPointerEnter() {
                        return;
                    },
                } as unknown as Object3D & DIVEHoverable,
            },
        ]);

        toolBox['_hovered'] = {
            uuid: 'uuid',
            visible: true,
            onPointerLeave() {
                return;
            },
        } as Object3D & DIVEHoverable;

        expect(() =>
            toolBox.onPointerMove({
                button: 0,
                offsetX: 100,
                offsetY: 100,
            } as PointerEvent),
        ).not.toThrow();
        expect(() =>
            toolBox.onPointerMove({
                button: 1,
                offsetX: 100,
                offsetY: 100,
            } as PointerEvent),
        ).not.toThrow();
        expect(() =>
            toolBox.onPointerMove({
                button: 2,
                offsetX: 100,
                offsetY: 100,
            } as PointerEvent),
        ).not.toThrow();

        // test with pointer down
        toolBox['_pointerPrimaryDown'] = true;
        expect(() =>
            toolBox.onPointerMove({
                button: 0,
                offsetX: 100,
                offsetY: 100,
            } as PointerEvent),
        ).not.toThrow();
        expect(() =>
            toolBox.onPointerMove({
                button: 1,
                offsetX: 100,
                offsetY: 100,
            } as PointerEvent),
        ).not.toThrow();
        expect(() =>
            toolBox.onPointerMove({
                button: 2,
                offsetX: 100,
                offsetY: 100,
            } as PointerEvent),
        ).not.toThrow();

        // test with pointer down while already dragging
        toolBox['_pointerPrimaryDown'] = true;
        toolBox['_dragging'] = true;
        expect(() =>
            toolBox.onPointerMove({
                button: 0,
                offsetX: 100,
                offsetY: 100,
            } as PointerEvent),
        ).not.toThrow();
        expect(() =>
            toolBox.onPointerMove({
                button: 1,
                offsetX: 100,
                offsetY: 100,
            } as PointerEvent),
        ).not.toThrow();
        expect(() =>
            toolBox.onPointerMove({
                button: 2,
                offsetX: 100,
                offsetY: 100,
            } as PointerEvent),
        ).not.toThrow();

        spy.mockRestore();
    });

    it('should execute onPointerUp correctly', () => {
        const toolBox = new abstractWrapper(mockScene, mockController);
        expect(() =>
            toolBox.onPointerUp({ button: 0 } as PointerEvent),
        ).not.toThrow();
        expect(() =>
            toolBox.onPointerUp({ button: 1 } as PointerEvent),
        ).not.toThrow();
        expect(() =>
            toolBox.onPointerUp({ button: 2 } as PointerEvent),
        ).not.toThrow();

        toolBox['pointerWasDragged'] = () => {
            return true;
        };
        toolBox['_dragging'] = true;
        toolBox['_intersects'] = [
            {
                distance: 1,
                point: {
                    clone() {
                        return {
                            x: 1,
                            y: 1,
                            z: 1,
                        } as unknown as Vector3;
                    },
                    x: 1,
                    y: 1,
                    z: 1,
                } as unknown as Vector3,
                object: {
                    uuid: 'uuid2',
                    isHoverable: true,
                    onPointerEnter() {
                        return;
                    },
                } as unknown as Object3D & DIVEHoverable,
            },
        ];
        toolBox['_draggable'] = {
            onDragEnd() {
                return;
            },
        } as unknown as Object3D & DIVEDraggable;
        expect(() =>
            toolBox.onPointerUp({ button: 0 } as PointerEvent),
        ).not.toThrow();
        expect(() =>
            toolBox.onPointerUp({ button: 1 } as PointerEvent),
        ).not.toThrow();
        expect(() =>
            toolBox.onPointerUp({ button: 2 } as PointerEvent),
        ).not.toThrow();
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
        jest.spyOn(
            toolBox['_raycaster'],
            'intersectObjects',
        ).mockReturnValueOnce([]);
        expect(() => toolBox.onDragStart({} as PointerEvent)).not.toThrow();

        jest.spyOn(
            toolBox['_raycaster'],
            'intersectObjects',
        ).mockReturnValueOnce([]);
        expect(() => toolBox.onDragStart({} as PointerEvent)).not.toThrow();

        jest.spyOn(
            toolBox['_raycaster'],
            'intersectObjects',
        ).mockReturnValueOnce([
            {
                distance: 1,
                point: {
                    clone() {
                        return {
                            x: 1,
                            y: 1,
                            z: 1,
                        } as unknown as Vector3;
                    },
                    x: 1,
                    y: 1,
                    z: 1,
                } as unknown as Vector3,
                object: {
                    uuid: 'uuid2',
                    isHoverable: true,
                    onPointerEnter() {
                        return;
                    },
                } as unknown as Object3D & DIVEHoverable,
            },
        ]);
        expect(() => toolBox.onDragStart({} as PointerEvent)).not.toThrow();

        toolBox['_draggable'] = {
            onDragStart() {
                return;
            },
        } as unknown as Object3D & DIVEDraggable;
        jest.spyOn(
            toolBox['_raycaster'],
            'intersectObjects',
        ).mockReturnValueOnce([]);
        expect(() => toolBox.onDragStart({} as PointerEvent)).not.toThrow();
    });

    it('should execute onDrag correctly', () => {
        const toolBox = new abstractWrapper(mockScene, mockController);
        expect(() => toolBox.onDrag({} as PointerEvent)).not.toThrow();

        toolBox['_dragRaycastOnObjects'] = [];
        jest.spyOn(
            toolBox['_raycaster'],
            'intersectObjects',
        ).mockReturnValueOnce([]);
        expect(() => toolBox.onDrag({} as PointerEvent)).not.toThrow();

        toolBox['_draggable'] = {
            onDrag() {
                return;
            },
        } as unknown as Object3D & DIVEDraggable;
        jest.spyOn(
            toolBox['_raycaster'],
            'intersectObjects',
        ).mockReturnValueOnce([
            {
                distance: 1,
                point: {
                    clone() {
                        return {
                            x: 1,
                            y: 1,
                            z: 1,
                        } as unknown as Vector3;
                    },
                    x: 1,
                    y: 1,
                    z: 1,
                } as unknown as Vector3,
                object: {
                    uuid: 'uuid2',
                    isHoverable: true,
                    onPointerEnter() {
                        return;
                    },
                } as unknown as Object3D & DIVEHoverable,
            },
        ]);
        expect(() => toolBox.onDrag({} as PointerEvent)).not.toThrow();
    });

    it('should execute onCLick correctly', () => {
        const toolBox = new abstractWrapper(mockScene, mockController);
        expect(() => toolBox.onClick({} as PointerEvent)).not.toThrow();
    });

    it('should execute onDragEnd correctly', () => {
        const toolBox = new abstractWrapper(mockScene, mockController);
        expect(() => toolBox.onDragEnd({} as PointerEvent)).not.toThrow();
    });

    it('should execute onWheel correctly', () => {
        const toolBox = new abstractWrapper(mockScene, mockController);
        expect(() => toolBox.onWheel({} as WheelEvent)).not.toThrow();
    });

    it('should handle onPointerMove with no intersects', () => {
        const toolBox = new abstractWrapper(mockScene, mockController);
        jest.spyOn(toolBox['_raycaster'], 'setFromCamera').mockImplementation();
        jest.spyOn(toolBox['_raycaster'], 'intersectObjects').mockReturnValue(
            [],
        );

        expect(() =>
            toolBox.onPointerMove({
                button: 0,
                offsetX: 100,
                offsetY: 100,
            } as PointerEvent),
        ).not.toThrow();
    });

    it('should handle onPointerMove with non-hoverable object', () => {
        const toolBox = new abstractWrapper(mockScene, mockController);
        jest.spyOn(toolBox['_raycaster'], 'setFromCamera').mockImplementation();
        jest.spyOn(toolBox['_raycaster'], 'intersectObjects').mockReturnValue([
            {
                distance: 1,
                point: {
                    x: 1,
                    y: 1,
                    z: 1,
                } as unknown as Vector3,
                object: {
                    uuid: 'uuid',
                    visible: true,
                } as Object3D,
            },
        ]);

        expect(() =>
            toolBox.onPointerMove({
                button: 0,
                offsetX: 100,
                offsetY: 100,
            } as PointerEvent),
        ).not.toThrow();
    });

    it('should handle onDrag with no intersects', () => {
        const toolBox = new abstractWrapper(mockScene, mockController);
        toolBox['_draggable'] = {
            onDrag() {
                return;
            },
        } as unknown as Object3D & DIVEDraggable;
        jest.spyOn(toolBox['_raycaster'], 'intersectObjects').mockReturnValue(
            [],
        );

        expect(() => toolBox.onDrag({} as PointerEvent)).not.toThrow();
    });

    it('should handle onDragEnd with no intersects', () => {
        const toolBox = new abstractWrapper(mockScene, mockController);
        toolBox['_draggable'] = {
            onDragEnd() {
                return;
            },
        } as unknown as Object3D & DIVEDraggable;
        jest.spyOn(toolBox['_raycaster'], 'intersectObjects').mockReturnValue(
            [],
        );

        expect(() => toolBox.onDragEnd({} as PointerEvent)).not.toThrow();
    });

    it('should handle onPointerUp with no drag', () => {
        const toolBox = new abstractWrapper(mockScene, mockController);
        toolBox['pointerWasDragged'] = () => false;
        toolBox['_dragging'] = false;

        expect(() =>
            toolBox.onPointerUp({ button: 0 } as PointerEvent),
        ).not.toThrow();
    });

    it('should handle onPointerUp with drag but no draggable', () => {
        const toolBox = new abstractWrapper(mockScene, mockController);
        toolBox['pointerWasDragged'] = () => true;
        toolBox['_dragging'] = true;
        toolBox['_draggable'] = null;

        expect(() =>
            toolBox.onPointerUp({ button: 0 } as PointerEvent),
        ).not.toThrow();
    });

    it('should handle onDragStart with no draggable', () => {
        const toolBox = new abstractWrapper(mockScene, mockController);
        toolBox['_draggable'] = null;

        expect(() => toolBox.onDragStart({} as PointerEvent)).not.toThrow();
    });

    it('should handle onDragStart with draggable but no intersects', () => {
        const toolBox = new abstractWrapper(mockScene, mockController);
        toolBox['_draggable'] = {
            onDragStart() {
                return;
            },
        } as unknown as Object3D & DIVEDraggable;
        toolBox['_dragRaycastOnObjects'] = [];
        jest.spyOn(toolBox['_raycaster'], 'intersectObjects').mockReturnValue(
            [],
        );

        expect(() => toolBox.onDragStart({} as PointerEvent)).not.toThrow();
    });

    it('should handle onPointerMove with hoverable object and onPointerEnter', () => {
        const toolBox = new abstractWrapper(mockScene, mockController);
        jest.spyOn(toolBox['_raycaster'], 'setFromCamera').mockImplementation();

        const mockHoverable = {
            uuid: 'uuid',
            isHoverable: true,
            visible: true,
            onPointerEnter: jest.fn(),
        } as unknown as Object3D & DIVEHoverable;

        jest.spyOn(toolBox['_raycaster'], 'intersectObjects').mockReturnValue([
            {
                distance: 1,
                point: {
                    x: 1,
                    y: 1,
                    z: 1,
                } as unknown as Vector3,
                object: mockHoverable,
            },
        ]);

        expect(() =>
            toolBox.onPointerMove({
                button: 0,
                offsetX: 100,
                offsetY: 100,
            } as PointerEvent),
        ).not.toThrow();

        expect(mockHoverable.onPointerEnter).toHaveBeenCalled();
    });
});
