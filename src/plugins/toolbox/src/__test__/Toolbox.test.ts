import { Toolbox } from '../Toolbox.ts';
import { type Tool } from '../Tool.ts';
import { type DIVEScene } from '@shopware-ag/dive';
import { type OrbitController } from '@shopware-ag/dive/orbitcontroller';

/**
 * @vitest-environment jsdom
 */

vi.mock('three', async () => {
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

    describe('convenience methods', () => {
        it('should set gizmo mode', () => {
            const transformTool = toolbox.getTool('transform') as any;
            toolbox.setGizmoMode('rotate');
            expect(transformTool.setGizmoMode).toHaveBeenCalledWith('rotate');
        });

        it('should set gizmo visible', () => {
            const transformTool = toolbox.getTool('transform') as any;
            toolbox.setGizmoVisible(false);
            expect(transformTool.setGizmoVisible).toHaveBeenCalledWith(false);
        });

        it('should set gizmo scale linked', () => {
            const transformTool = toolbox.getTool('transform') as any;
            toolbox.setGizmoScaleLinked(true);
            expect(transformTool.setGizmoScaleLinked).toHaveBeenCalledWith(
                true,
            );
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
});
