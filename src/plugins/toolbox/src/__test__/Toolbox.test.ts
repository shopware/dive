import { Toolbox } from '../Toolbox.ts';
import { type Tool } from '../Tool.ts';
import { type DIVEScene } from '@shopware-ag/dive';
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

vi.mock('@shopware-ag/dive/shader', () => ({
    GridNode: vi.fn(function (this: any, uniforms) {
        this.uniforms = uniforms;
        return this;
    }),
    DIVEShaderLib: {
        grid: { uniforms: {}, vertexShader: '', fragmentShader: '' },
    },
    DIVEShaderMaterial: vi.fn(),
}));

vi.mock('three/webgpu', async () => {
    const actual = await vi.importActual<typeof import('three')>('three');
    return {
        ...actual,
        Layers: vi.fn().mockImplementation(() => ({
            mask: 0,
            set: vi.fn(),
        })),
        Raycaster: vi.fn().mockImplementation(() => ({
            layers: { mask: 0 },
            setFromCamera: vi.fn(),
            intersectObjects: vi.fn(() => []),
        })),
    };
});

vi.mock('../hover/HoverTool.ts', () => ({
    HoverTool: vi.fn().mockImplementation(() => ({
        name: 'hover',
        priority: 20,
        onActivate: vi.fn(),
        onDeactivate: vi.fn(),
        onPointerMove: vi.fn(),
    })),
}));

vi.mock('../select/SelectTool.ts', () => ({
    SelectTool: vi.fn().mockImplementation(() => ({
        name: 'select',
        priority: 30,
        onActivate: vi.fn(),
        onDeactivate: vi.fn(),
        onClick: vi.fn(),
    })),
    isSelectTool: vi.fn(),
}));

vi.mock('../transform/TransformTool.ts', () => ({
    TransformTool: vi.fn().mockImplementation(() => ({
        name: 'transform',
        priority: 5,
        onActivate: vi.fn(),
        onDeactivate: vi.fn(),
        onPointerMove: vi.fn(),
        setGizmoMode: vi.fn(),
        setGizmoVisible: vi.fn(),
        setGizmoScaleLinked: vi.fn(),
    })),
    isTransformTool: vi.fn(),
}));

vi.mock('../drag/DragTool.ts', () => ({
    DragTool: vi.fn().mockImplementation(() => ({
        name: 'drag',
        priority: 10,
        onActivate: vi.fn(),
        onDeactivate: vi.fn(),
        onPointerDown: vi.fn(),
        onPointerMove: vi.fn(),
        onPointerUp: vi.fn(),
    })),
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
        domElement: createMockCanvas(),
        object: {
            isPerspectiveCamera: true,
            layers: { mask: 0 },
        },
        enabled: true,
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

    beforeEach(() => {
        mockScene = createMockScene();
        mockController = createMockController();
        toolbox = new Toolbox(mockScene, mockController);
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
            (
                mockController.domElement.addEventListener as any
            ).mockImplementation((type: string, handler: Function) => {
                addEventListenerCalls.set(type, handler);
            });

            // Recreate toolbox to capture event listeners
            toolbox.dispose();
            toolbox = new Toolbox(mockScene, mockController);
        });

        it('should register event listeners on construction', () => {
            expect(
                mockController.domElement.addEventListener,
            ).toHaveBeenCalledWith('pointermove', expect.any(Function));
            expect(
                mockController.domElement.addEventListener,
            ).toHaveBeenCalledWith('pointerdown', expect.any(Function));
            expect(
                mockController.domElement.addEventListener,
            ).toHaveBeenCalledWith('pointerup', expect.any(Function));
            expect(
                mockController.domElement.addEventListener,
            ).toHaveBeenCalledWith('wheel', expect.any(Function));
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

    describe('legacy API', () => {
        it('should enable tools via useTool', () => {
            toolbox.useTool('hover');

            expect(toolbox.isToolEnabled('hover')).toBe(true);
        });

        it('should enable all tools when useTool is called with select', () => {
            toolbox.useTool('select');

            expect(toolbox.isToolEnabled('hover')).toBe(true);
            expect(toolbox.isToolEnabled('select')).toBe(true);
            expect(toolbox.isToolEnabled('transform')).toBe(true);
            expect(toolbox.isToolEnabled('drag')).toBe(true);
        });

        it('should return first active tool via getActiveTool', () => {
            toolbox.enableTool('hover');
            toolbox.enableTool('transform');

            const activeTool = toolbox.getActiveTool();

            // transform has higher priority (5 vs 20)
            expect(activeTool?.name).toBe('transform');
        });

        it('should return null from getActiveTool when no tools active', () => {
            const activeTool = toolbox.getActiveTool();

            expect(activeTool).toBeNull();
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
});
