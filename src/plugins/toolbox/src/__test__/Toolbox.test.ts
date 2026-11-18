import {
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
    Object3D,
    PerspectiveCamera,
    Scene,
} from 'three/webgpu';
import { Toolbox } from '../Toolbox.ts';
import { type Tool } from '../Tool.ts';
import { type PointerContext } from '../PointerContext.ts';
import {
    BoxColliderComponent,
    DEFAULT_LAYER_MASK,
    DIVENode,
    HELPER_LAYER_MASK,
    MeshColliderComponent,
    PrimitiveComponent,
    PRODUCT_LAYER_MASK,
    PROXY_LAYER_MASK,
    UI_LAYER_MASK,
    type DIVEScene,
} from '@shopware-ag/dive';
import { type OrbitController } from '@shopware-ag/dive/orbitcontroller';

/**
 * @vitest-environment jsdom
 */

// Mock PointerEvent for jsdom
class MockPointerEvent extends MouseEvent {
    readonly offsetX: number;
    readonly offsetY: number;

    constructor(
        type: string,
        props?: PointerEventInit & { offsetX?: number; offsetY?: number },
    ) {
        super(type, props);
        this.offsetX = props?.offsetX ?? 0;
        this.offsetY = props?.offsetY ?? 0;
    }
}
globalThis.PointerEvent = MockPointerEvent as unknown as typeof PointerEvent;

vi.mock('../hover/HoverTool.ts', () => ({
    HoverTool: vi.fn().mockImplementation(function () {
        return {
            name: 'hover',
            priority: 20,
            onActivate: vi.fn(),
            onDeactivate: vi.fn(),
            onPointerMove: vi.fn(),
        };
    }),
}));

vi.mock('../select/SelectTool.ts', () => ({
    SelectTool: vi.fn().mockImplementation(function () {
        return {
            name: 'select',
            priority: 30,
            onActivate: vi.fn(),
            onDeactivate: vi.fn(),
            onClick: vi.fn(),
        };
    }),
    isSelectTool: vi.fn(),
}));

/** the root the transform tool's gizmo hangs in the scene, set per test */
const transformGizmo = vi.hoisted(() => ({
    helper: null as unknown,
}));

vi.mock('../transform/TransformTool.ts', () => ({
    TransformTool: vi.fn().mockImplementation(function () {
        return {
            gizmo: { getHelper: () => transformGizmo.helper },
            name: 'transform',
            priority: 5,
            onActivate: vi.fn(),
            onDeactivate: vi.fn(),
            onPointerMove: vi.fn(),
            setGizmoMode: vi.fn(),
            setGizmoVisible: vi.fn(),
            setGizmoScaleLinked: vi.fn(),
        };
    }),
    isTransformTool: vi.fn(),
}));

vi.mock('../drag/DragTool.ts', () => ({
    DragTool: vi.fn().mockImplementation(function () {
        return {
            name: 'drag',
            priority: 10,
            onActivate: vi.fn(),
            onDeactivate: vi.fn(),
            onPointerDown: vi.fn(),
            onPointerMove: vi.fn(),
            onPointerUp: vi.fn(),
        };
    }),
}));

const createMockCanvas = () => ({
    width: 1000,
    height: 1000,
    clientWidth: 1000,
    clientHeight: 1000,
    offsetLeft: 0,
    offsetTop: 0,
    getContext: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
});

const createMockController = () =>
    ({
        object: { camera: new PerspectiveCamera() },
        inputEnabled: true,
    }) as unknown as OrbitController;

const createMockScene = () =>
    ({
        children: [],
        add: vi.fn(),
        remove: vi.fn(),
    }) as unknown as DIVEScene;

describe('Toolbox', () => {
    let toolbox: Toolbox;
    let mockScene: DIVEScene;
    let mockController: OrbitController;
    let mockCanvas: ReturnType<typeof createMockCanvas>;

    beforeEach(() => {
        mockScene = createMockScene();
        mockController = createMockController();
        mockCanvas = createMockCanvas();
        toolbox = new Toolbox(
            mockScene,
            mockController,
            mockCanvas as unknown as HTMLElement,
        );
    });

    afterEach(() => {
        toolbox.dispose();
        vi.clearAllMocks();
    });

    describe('instantiation', () => {
        it('should instantiate', () => {
            expect(toolbox).toBeDefined();
        });

        it('should have a selection state', () => {
            expect(toolbox.selectionState).toBeDefined();
        });

        it('should have all tools registered', () => {
            expect(toolbox.getTool('hover')).toBeDefined();
            expect(toolbox.getTool('select')).toBeDefined();
            expect(toolbox.getTool('transform')).toBeDefined();
            expect(toolbox.getTool('drag')).toBeDefined();
        });
    });

    describe('tool activation', () => {
        it('should enable a tool', () => {
            toolbox.enableTool('hover');
            expect(toolbox.isToolEnabled('hover')).toBe(true);
        });

        it('should call onActivate when enabling a tool', () => {
            const tool = toolbox.getTool('hover');
            toolbox.enableTool('hover');
            expect(tool.onActivate).toHaveBeenCalled();
        });

        it('should disable an active tool', () => {
            toolbox.enableTool('hover');
            toolbox.disableTool('hover');
            expect(toolbox.isToolEnabled('hover')).toBe(false);
        });

        it('should call onDeactivate when disabling a tool', () => {
            const tool = toolbox.getTool('hover');
            toolbox.enableTool('hover');
            toolbox.disableTool('hover');
            expect(tool.onDeactivate).toHaveBeenCalled();
        });

        it('should not enable same tool twice', () => {
            const tool = toolbox.getTool('hover');
            toolbox.enableTool('hover');
            toolbox.enableTool('hover');
            expect(tool.onActivate).toHaveBeenCalledTimes(1);
        });
    });

    describe('multiple tools', () => {
        it('should enable multiple tools', () => {
            toolbox.enableTool('hover');
            toolbox.enableTool('select');

            expect(toolbox.isToolEnabled('hover')).toBe(true);
            expect(toolbox.isToolEnabled('select')).toBe(true);
            expect(toolbox.getActiveTools()).toHaveLength(2);
        });

        it('should process tools in priority order', () => {
            toolbox.enableTool('hover'); // priority 20
            toolbox.enableTool('transform'); // priority 5

            const activeTools = toolbox.getActiveTools();

            // transform (priority 5) should come before hover (priority 20)
            expect(activeTools[0].name).toBe('transform');
            expect(activeTools[1].name).toBe('hover');
        });
    });

    describe('dispose', () => {
        it('should deactivate all tools on dispose', () => {
            const hoverTool = toolbox.getTool('hover');
            const selectTool = toolbox.getTool('select');

            toolbox.enableTool('hover');
            toolbox.enableTool('select');

            toolbox.dispose();

            expect(hoverTool.onDeactivate).toHaveBeenCalled();
            expect(selectTool.onDeactivate).toHaveBeenCalled();
            expect(toolbox.getActiveTools()).toHaveLength(0);
        });
    });

    describe('event handlers', () => {
        let addEventListenerCalls: Map<string, Function>;

        beforeEach(() => {
            addEventListenerCalls = new Map();
            (mockCanvas.addEventListener as any).mockImplementation(
                (type: string, handler: Function) => {
                    addEventListenerCalls.set(type, handler);
                },
            );

            // Recreate toolbox to capture event listeners
            toolbox.dispose();
            toolbox = new Toolbox(
                mockScene,
                mockController,
                mockCanvas as unknown as HTMLElement,
            );
        });

        it('should register event listeners on construction', () => {
            expect(mockCanvas.addEventListener).toHaveBeenCalledWith(
                'pointermove',
                expect.any(Function),
            );
            expect(mockCanvas.addEventListener).toHaveBeenCalledWith(
                'pointerdown',
                expect.any(Function),
            );
            expect(mockCanvas.addEventListener).toHaveBeenCalledWith(
                'pointerup',
                expect.any(Function),
            );
            expect(mockCanvas.addEventListener).toHaveBeenCalledWith(
                'wheel',
                expect.any(Function),
            );
        });

        it('should dispatch pointer move to active tools', () => {
            const hoverTool = toolbox.getTool('hover');
            toolbox.enableTool('hover');

            const event = new PointerEvent('pointermove', {
                offsetX: 100,
                offsetY: 100,
            } as any);
            const handler = addEventListenerCalls.get('pointermove');
            handler?.(event);

            expect(hoverTool.onPointerMove).toHaveBeenCalled();
        });

        it('should dispatch pointer down to active tools', () => {
            const dragTool = toolbox.getTool('drag');
            toolbox.enableTool('drag');

            const event = new PointerEvent('pointerdown', {
                offsetX: 100,
                offsetY: 100,
                button: 0,
            } as any);
            const handler = addEventListenerCalls.get('pointerdown');
            handler?.(event);

            expect(dragTool.onPointerDown).toHaveBeenCalled();
        });

        it('should dispatch pointer up to active tools', () => {
            const dragTool = toolbox.getTool('drag');
            toolbox.enableTool('drag');

            const event = new PointerEvent('pointerup', {
                offsetX: 100,
                offsetY: 100,
                button: 0,
            } as any);
            const handler = addEventListenerCalls.get('pointerup');
            handler?.(event);

            expect(dragTool.onPointerUp).toHaveBeenCalled();
        });

        it('should dispatch click when pointer was not dragged', () => {
            const selectTool = toolbox.getTool('select');
            toolbox.enableTool('select');

            // First pointer down
            const downHandler = addEventListenerCalls.get('pointerdown');
            downHandler?.(
                new PointerEvent('pointerdown', {
                    offsetX: 100,
                    offsetY: 100,
                    button: 0,
                } as any),
            );

            // Then pointer up at same position (click)
            const upHandler = addEventListenerCalls.get('pointerup');
            upHandler?.(
                new PointerEvent('pointerup', {
                    offsetX: 100,
                    offsetY: 100,
                    button: 0,
                } as any),
            );

            expect(selectTool.onClick).toHaveBeenCalled();
        });

        it('should stop event propagation when tool returns true', () => {
            const hoverTool = toolbox.getTool('hover');
            const transformTool = toolbox.getTool('transform');

            // Make transform tool block events
            (transformTool.onPointerMove as any).mockReturnValue(true);

            toolbox.enableTool('transform');
            toolbox.enableTool('hover');

            const event = new PointerEvent('pointermove', {
                offsetX: 100,
                offsetY: 100,
            } as any);
            const handler = addEventListenerCalls.get('pointermove');
            handler?.(event);

            // Transform has higher priority (5 vs 20) and blocks, so hover should not be called
            expect(transformTool.onPointerMove).toHaveBeenCalled();
            expect(hoverTool.onPointerMove).not.toHaveBeenCalled();
        });

        it('should handle middle mouse button', () => {
            const dragTool = toolbox.getTool('drag');
            toolbox.enableTool('drag');

            const downHandler = addEventListenerCalls.get('pointerdown');
            downHandler?.(
                new PointerEvent('pointerdown', {
                    offsetX: 100,
                    offsetY: 100,
                    button: 1, // Middle button
                } as any),
            );

            expect(dragTool.onPointerDown).toHaveBeenCalled();
        });

        it('should handle right mouse button', () => {
            const dragTool = toolbox.getTool('drag');
            toolbox.enableTool('drag');

            const downHandler = addEventListenerCalls.get('pointerdown');
            downHandler?.(
                new PointerEvent('pointerdown', {
                    offsetX: 100,
                    offsetY: 100,
                    button: 2, // Right button
                } as any),
            );

            expect(dragTool.onPointerDown).toHaveBeenCalled();
        });

        it('should dispatch wheel events to active tools', () => {
            // Add onWheel handler to the mock
            const hoverTool = toolbox.getTool('hover') as any;
            hoverTool.onWheel = vi.fn();

            toolbox.enableTool('hover');

            const wheelEvent = new WheelEvent('wheel', {
                deltaX: 10,
                deltaY: 20,
            });
            // Add offset properties
            Object.defineProperty(wheelEvent, 'offsetX', { value: 100 });
            Object.defineProperty(wheelEvent, 'offsetY', { value: 100 });

            const handler = addEventListenerCalls.get('wheel');
            handler?.(wheelEvent);

            expect(hoverTool.onWheel).toHaveBeenCalled();
        });

        it('should stop wheel event propagation when tool returns true', () => {
            const transformTool = toolbox.getTool('transform') as any;
            const hoverTool = toolbox.getTool('hover') as any;

            transformTool.onWheel = vi.fn().mockReturnValue(true);
            hoverTool.onWheel = vi.fn();

            toolbox.enableTool('transform');
            toolbox.enableTool('hover');

            const wheelEvent = new WheelEvent('wheel', {
                deltaX: 10,
                deltaY: 20,
            });
            Object.defineProperty(wheelEvent, 'offsetX', { value: 100 });
            Object.defineProperty(wheelEvent, 'offsetY', { value: 100 });

            const handler = addEventListenerCalls.get('wheel');
            handler?.(wheelEvent);

            expect(transformTool.onWheel).toHaveBeenCalled();
            expect(hoverTool.onWheel).not.toHaveBeenCalled();
        });
    });

    describe('raycasting only when a tool looks', () => {
        /**
         * the intersect lists are computed on first read and then kept, so a
         * pointer move nobody looks at costs no raycast
         */
        let move: (event: PointerEvent) => void;
        let raycasts: { colliders: number; gizmo: number };

        beforeEach(() => {
            const listeners = new Map<string, (event: PointerEvent) => void>();
            (mockCanvas.addEventListener as any).mockImplementation(
                (type: string, handler: (event: PointerEvent) => void) => {
                    listeners.set(type, handler);
                },
            );
            toolbox.dispose();
            toolbox = new Toolbox(
                mockScene,
                mockController,
                mockCanvas as unknown as HTMLElement,
            );
            move = listeners.get('pointermove')!;

            raycasts = { colliders: 0, gizmo: 0 };
            const raycasters = toolbox as unknown as Record<
                '_colliderRaycaster' | '_raycaster',
                {
                    intersectObject: () => unknown[];
                    intersectObjects: () => unknown[];
                }
            >;
            raycasters._colliderRaycaster.intersectObject = () => {
                raycasts.colliders++;
                return [];
            };
            raycasters._raycaster.intersectObjects = () => {
                raycasts.gizmo++;
                return [];
            };
        });

        it('should not raycast when no tool reads the intersects', () => {
            move(new PointerEvent('pointermove'));

            expect(raycasts).toEqual({ colliders: 0, gizmo: 0 });
        });

        it('should raycast once however many lists are read', () => {
            const greedy = {
                name: 'greedy',
                priority: 1,
                onPointerMove: (ctx: PointerContext) => {
                    void ctx.intersects;
                    void ctx.modelIntersects;
                    void ctx.entityIntersects;
                    void ctx.uiIntersects;
                    void ctx.intersects;
                },
            } as unknown as Tool;
            (toolbox as unknown as { _tools: Map<string, Tool> })._tools.set(
                'greedy',
                greedy,
            );
            toolbox.enableTool('greedy' as never);

            move(new PointerEvent('pointermove'));

            // still one of each per event, shared by every list and every reader
            expect(raycasts).toEqual({ colliders: 1, gizmo: 1 });
        });
    });

    describe('getTool', () => {
        it('should return correctly typed tool', () => {
            const transformTool = toolbox.getTool('transform');

            expect(transformTool).toBeDefined();
            expect(transformTool.name).toBe('transform');
        });

        it('should return hover tool', () => {
            const hoverTool = toolbox.getTool('hover');

            expect(hoverTool).toBeDefined();
            expect(hoverTool.name).toBe('hover');
        });
    });

    describe('edge cases', () => {
        it('should not fail when disabling non-active tool', () => {
            expect(() => toolbox.disableTool('hover')).not.toThrow();
        });

        it('should not fail when enabling non-existent tool', () => {
            expect(() =>
                toolbox.enableTool('nonexistent' as any),
            ).not.toThrow();
        });
    });

    describe('raycast', () => {
        /**
         * A real scene, real colliders and real raycasters: what a tool reads
         * from the pointer context when the pointer is over the canvas centre.
         */
        let scene: Scene;
        let root: DIVENode;
        let canvas: HTMLElement;
        let ctx: PointerContext;
        let transformControls: Object3D;

        /** a 1 m cube centred on the origin, as a box collider */
        const boxEntity = (layers = PRODUCT_LAYER_MASK): DIVENode => {
            const node = new DIVENode();
            const collider = node.addComponent(new BoxColliderComponent());
            collider.setFromCenterAndSize(
                { x: 0, y: 0, z: 0 },
                { x: 1, y: 1, z: 1 },
            );
            collider.layers.mask = layers;
            root.add(node);
            return node;
        };

        /** a 1 m cube primitive with a mesh collider, its centre on the ray */
        const meshEntity = (): DIVENode => {
            const node = new DIVENode();
            node.addComponent(new PrimitiveComponent()).setGeometry({
                name: 'box',
                width: 1,
                height: 1,
                depth: 1,
            });
            node.addComponent(new MeshColliderComponent());
            node.position.y = -0.5;
            root.add(node);
            return node;
        };

        /**
         * a gizmo handle, a plain three mesh on the given layer
         * off-centre, or the ray runs along the diagonal both triangles of the
         * front face share and is reported twice
         */
        const handle = (
            layers: number,
            z: number,
            parent: Object3D = scene,
        ): Mesh => {
            const mesh = new Mesh(
                new BoxGeometry(0.2, 0.2, 0.2),
                new MeshBasicMaterial(),
            );
            mesh.layers.mask = layers;
            mesh.position.set(0.03, -0.04, z);
            parent.add(mesh);
            return mesh;
        };

        /** moves the pointer to the canvas centre and returns what a tool saw */
        const pointAtCentre = (): PointerContext => {
            scene.updateMatrixWorld(true);
            canvas.dispatchEvent(
                new PointerEvent('pointermove', {
                    offsetX: 500,
                    offsetY: 500,
                } as PointerEventInit),
            );
            return ctx;
        };

        beforeEach(() => {
            toolbox.dispose();

            scene = new Scene();
            root = new DIVENode();
            scene.add(root);
            transformControls = new Object3D();
            scene.add(transformControls);
            transformGizmo.helper = transformControls;

            const camera = new PerspectiveCamera(75, 1, 0.1, 1000);
            camera.position.set(0, 0, 5);
            camera.lookAt(0, 0, 0);
            camera.updateMatrixWorld(true);

            canvas = document.createElement('div');
            Object.defineProperty(canvas, 'clientWidth', { value: 1000 });
            Object.defineProperty(canvas, 'clientHeight', { value: 1000 });

            toolbox = new Toolbox(
                scene as unknown as DIVEScene,
                { object: { camera } } as unknown as OrbitController,
                canvas,
            );
            const spy = {
                name: 'spy',
                priority: 0,
                onPointerMove: (context: PointerContext) => {
                    ctx = context;
                },
            } as unknown as Tool;
            (toolbox as unknown as { _tools: Map<string, Tool> })._tools.set(
                'spy',
                spy,
            );
            toolbox.enableTool('spy' as never);
        });

        it('should pick an entity through its box collider', () => {
            const entity = boxEntity();

            const { entityIntersects, modelIntersects } = pointAtCentre();

            expect(entityIntersects.map((i) => i.object)).toEqual([entity]);
            expect(modelIntersects.map((i) => i.object)).toEqual([entity]);
        });

        it('should report one hit per entity, not one per triangle', () => {
            const entity = meshEntity();

            const { entityIntersects } = pointAtCentre();

            expect(entityIntersects).toHaveLength(1);
            expect(entityIntersects[0].object).toBe(entity);
            expect(entityIntersects[0].distance).toBeCloseTo(4.5);
        });

        it('should not pick a product mesh without a collider', () => {
            const mesh = new Mesh(
                new BoxGeometry(1, 1, 1),
                new MeshBasicMaterial(),
            );
            mesh.layers.mask = PRODUCT_LAYER_MASK;
            root.add(mesh);

            const { intersects, entityIntersects } = pointAtCentre();

            expect(intersects).toHaveLength(0);
            expect(entityIntersects).toHaveLength(0);
        });

        it('should count a proxy collider as an entity but not as a model', () => {
            const camera = boxEntity(PROXY_LAYER_MASK);

            const { entityIntersects, modelIntersects } = pointAtCentre();

            expect(entityIntersects.map((i) => i.object)).toEqual([camera]);
            expect(modelIntersects).toHaveLength(0);
        });

        it('should not pick colliders on other layers', () => {
            boxEntity(HELPER_LAYER_MASK);

            expect(pointAtCentre().intersects).toHaveLength(0);
        });

        it('should not pick an entity under a hidden node', () => {
            boxEntity();
            root.visible = false;

            expect(pointAtCentre().intersects).toHaveLength(0);
        });

        it('should hit the gizmo on the ui layer', () => {
            const gizmo = handle(UI_LAYER_MASK, 2);

            const { uiIntersects, entityIntersects } = pointAtCentre();

            expect(uiIntersects.map((i) => i.object)).toEqual([gizmo]);
            expect(entityIntersects).toHaveLength(0);
        });

        it('should not hit a hidden gizmo', () => {
            handle(UI_LAYER_MASK, 2).visible = false;

            expect(pointAtCentre().intersects).toHaveLength(0);
        });

        it('should merge gizmo and entity hits, nearest first', () => {
            const behind = handle(UI_LAYER_MASK, -2);
            const entity = boxEntity();
            const front = handle(DEFAULT_LAYER_MASK, 2, transformControls);

            const { intersects, uiIntersects } = pointAtCentre();

            // the transform controls' default-layer gizmo counts, but not as ui
            expect(intersects.map((i) => i.object)).toEqual([
                front,
                entity,
                behind,
            ]);
            expect(uiIntersects.map((i) => i.object)).toEqual([behind]);
        });

        it('should not hit a default-layer mesh outside the transform gizmo', () => {
            handle(DEFAULT_LAYER_MASK, 2);

            expect(pointAtCentre().intersects).toHaveLength(0);
        });

        it('should not hit the transform gizmo while it is out of the scene', () => {
            handle(DEFAULT_LAYER_MASK, 2, transformControls);
            scene.remove(transformControls);

            expect(pointAtCentre().intersects).toHaveLength(0);
        });

        it('should return empty lists when the ray misses everything', () => {
            boxEntity().position.x = 1000;
            handle(UI_LAYER_MASK, 2).position.x = 1000;

            const context = pointAtCentre();

            expect(context.intersects).toHaveLength(0);
            expect(context.entityIntersects).toHaveLength(0);
            expect(context.uiIntersects).toHaveLength(0);
        });
    });
});
