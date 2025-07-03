import { Toolbox, type ToolType } from '../Toolbox.ts';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { DIVEScene } from '@shopware-ag/dive';

/**
 * @jest-environment jsdom
 */

vi.mock('../select/SelectTool.ts', () => {
    return {
        DIVESelectTool: vi.fn(function (this: any) {
            this.activate = vi.fn();
            this.deactivate = vi.fn();
            this.onPointerDown = vi.fn();
            this.onPointerMove = vi.fn();
            this.onPointerUp = vi.fn();
            this.onWheel = vi.fn();
            this.setGizmoMode = vi.fn();
            this.setGizmoVisible = vi.fn();
            this.setGizmoScaleLinked = vi.fn();
            return this;
        }),
    };
});

const mockController = {
    domElement: {
        width: 0,
        height: 0,
        addEventListener: vi.fn((type, callback) => {
            callback();
        }),
        getContext: vi.fn(),
        removeEventListener: vi.fn((type, callback) => {
            callback();
        }),
        clientWidth: 0,
        clientHeight: 0,
        offsetLeft: 0,
        offsetTop: 0,
    },
    object: {},
} as unknown as OrbitController;

describe('dive/toolbox/DIVEToolBox', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should instantiate', () => {
        const toolBox = new Toolbox({} as DIVEScene, mockController);
        expect(toolBox).toBeDefined();
    });

    it('should dispose', () => {
        const toolBox = new Toolbox({} as DIVEScene, mockController);
        toolBox.dispose();
    });

    it('should throw with incorrect tool', () => {
        const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        const toolBox = new Toolbox({} as DIVEScene, mockController);
        expect(() =>
            toolBox.useTool('not a real tool' as unknown as ToolType),
        ).not.toThrow();
        expect(spy).toHaveBeenCalled();
    });

    it('should use no tool', () => {
        const toolBox = new Toolbox({} as DIVEScene, mockController);
        expect(() => toolBox.useTool('select')).not.toThrow();
        expect(() => toolBox.useTool('none')).not.toThrow();
    });

    it('should use select tool', () => {
        const toolBox = new Toolbox({} as DIVEScene, mockController);
        expect(() => toolBox.useTool(Toolbox.DefaultTool)).not.toThrow();
    });

    it('should execute pointer down event on tool', () => {
        const toolBox = new Toolbox({} as DIVEScene, mockController);
        expect(() =>
            toolBox.onPointerDown({ type: 'pointerdown' } as PointerEvent),
        ).not.toThrow();
        expect(() => toolBox.useTool('select')).not.toThrow();
        expect(() =>
            toolBox.onPointerDown({ type: 'pointerdown' } as PointerEvent),
        ).not.toThrow();
    });

    it('should execute pointer move event on tool', () => {
        const toolBox = new Toolbox({} as DIVEScene, mockController);
        expect(() =>
            toolBox.onPointerMove({ type: 'pointermove' } as PointerEvent),
        ).not.toThrow();
        expect(() => toolBox.useTool('select')).not.toThrow();
        expect(() =>
            toolBox.onPointerMove({ type: 'pointermove' } as PointerEvent),
        ).not.toThrow();
    });

    it('should execute pointer up event on tool', () => {
        const toolBox = new Toolbox({} as DIVEScene, mockController);
        expect(() =>
            toolBox.onPointerUp({ type: 'pointerup' } as PointerEvent),
        ).not.toThrow();
        expect(() => toolBox.useTool('select')).not.toThrow();
        expect(() =>
            toolBox.onPointerUp({ type: 'pointerup' } as PointerEvent),
        ).not.toThrow();
    });

    it('should execute wheel event on tool', () => {
        const toolBox = new Toolbox({} as DIVEScene, mockController);
        expect(() =>
            toolBox.onWheel({ type: 'wheel' } as WheelEvent),
        ).not.toThrow();
        expect(() => toolBox.useTool('select')).not.toThrow();
        expect(() =>
            toolBox.onWheel({ type: 'wheel' } as WheelEvent),
        ).not.toThrow();
    });

    it('should get active tool', () => {
        const toolBox = new Toolbox({} as DIVEScene, mockController);
        expect(toolBox.getActiveTool()).toBeDefined();
    });

    it('should set gizmo mode', () => {
        const toolBox = new Toolbox({} as DIVEScene, mockController);
        expect(() => toolBox.setGizmoMode('translate')).not.toThrow();
    });

    it('should set gizmo active', () => {
        const toolBox = new Toolbox({} as DIVEScene, mockController);
        expect(() => toolBox.setGizmoVisible(true)).not.toThrow();
    });

    it('should set gizmo unified scale', () => {
        const toolBox = new Toolbox({} as DIVEScene, mockController);
        expect(() => toolBox.setGizmoScaleLinked(true)).not.toThrow();
    });
});
