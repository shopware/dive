import DIVEToolbox, { type ToolType } from '../Toolbox';
import type DIVEOrbitControls from '../../controls/OrbitControls';
import { type DIVEScene } from '../../engine/scene/Scene';

/**
 * @jest-environment jsdom
 */

jest.mock('../select/SelectTool.ts', () => {
    return {
        DIVESelectTool: jest.fn(function () {
            this.Activate = jest.fn();
            this.Deactivate = jest.fn();
            this.onPointerDown = jest.fn();
            this.onPointerMove = jest.fn();
            this.onPointerUp = jest.fn();
            this.onWheel = jest.fn();
            this.SetGizmoMode = jest.fn();
            this.SetGizmoVisibility = jest.fn();
            this.SetGizmoScaleLinked = jest.fn();
            return this;
        }),
    };
});

const mockController = {
    domElement: {
        width: 0,
        height: 0,
        addEventListener: jest.fn((type, callback) => {
            callback();
        }),
        getContext: jest.fn(),
        removeEventListener: jest.fn((type, callback) => {
            callback();
        }),
        clientWidth: 0,
        clientHeight: 0,
        offsetLeft: 0,
        offsetTop: 0,
    },
    object: {},
} as unknown as DIVEOrbitControls;

describe('dive/toolbox/DIVEToolBox', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should instantiate', () => {
        const toolBox = new DIVEToolbox({} as DIVEScene, mockController);
        expect(toolBox).toBeDefined();
    });

    it('should dispose', () => {
        const toolBox = new DIVEToolbox({} as DIVEScene, mockController);
        toolBox.Dispose();
    });

    it('should throw with incorrect tool', () => {
        const spy = jest.spyOn(console, 'warn').mockImplementation();
        const toolBox = new DIVEToolbox({} as DIVEScene, mockController);
        expect(() =>
            toolBox.UseTool('not a real tool' as unknown as ToolType),
        ).not.toThrow();
        expect(spy).toHaveBeenCalled();
    });

    it('should use no tool', () => {
        const toolBox = new DIVEToolbox({} as DIVEScene, mockController);
        expect(() => toolBox.UseTool('select')).not.toThrow();
        expect(() => toolBox.UseTool('none')).not.toThrow();
    });

    it('should use select tool', () => {
        const toolBox = new DIVEToolbox({} as DIVEScene, mockController);
        expect(() => toolBox.UseTool(DIVEToolbox.DefaultTool)).not.toThrow();
    });

    it('should execute pointer down event on tool', () => {
        const toolBox = new DIVEToolbox({} as DIVEScene, mockController);
        expect(() =>
            toolBox.onPointerDown({ type: 'pointerdown' } as PointerEvent),
        ).not.toThrow();
        expect(() => toolBox.UseTool('select')).not.toThrow();
        expect(() =>
            toolBox.onPointerDown({ type: 'pointerdown' } as PointerEvent),
        ).not.toThrow();
    });

    it('should execute pointer move event on tool', () => {
        const toolBox = new DIVEToolbox({} as DIVEScene, mockController);
        expect(() =>
            toolBox.onPointerMove({ type: 'pointermove' } as PointerEvent),
        ).not.toThrow();
        expect(() => toolBox.UseTool('select')).not.toThrow();
        expect(() =>
            toolBox.onPointerMove({ type: 'pointermove' } as PointerEvent),
        ).not.toThrow();
    });

    it('should execute pointer up event on tool', () => {
        const toolBox = new DIVEToolbox({} as DIVEScene, mockController);
        expect(() =>
            toolBox.onPointerUp({ type: 'pointerup' } as PointerEvent),
        ).not.toThrow();
        expect(() => toolBox.UseTool('select')).not.toThrow();
        expect(() =>
            toolBox.onPointerUp({ type: 'pointerup' } as PointerEvent),
        ).not.toThrow();
    });

    it('should execute wheel event on tool', () => {
        const toolBox = new DIVEToolbox({} as DIVEScene, mockController);
        expect(() =>
            toolBox.onWheel({ type: 'wheel' } as WheelEvent),
        ).not.toThrow();
        expect(() => toolBox.UseTool('select')).not.toThrow();
        expect(() =>
            toolBox.onWheel({ type: 'wheel' } as WheelEvent),
        ).not.toThrow();
    });

    it('should get active tool', () => {
        const toolBox = new DIVEToolbox({} as DIVEScene, mockController);
        expect(toolBox.GetActiveTool()).toBeDefined();
    });

    it('should set gizmo mode', () => {
        const toolBox = new DIVEToolbox({} as DIVEScene, mockController);
        expect(() => toolBox.SetGizmoMode('translate')).not.toThrow();
    });

    it('should set gizmo active', () => {
        const toolBox = new DIVEToolbox({} as DIVEScene, mockController);
        expect(() => toolBox.SetGizmoVisibility(true)).not.toThrow();
    });

    it('should set gizmo unified scale', () => {
        const toolBox = new DIVEToolbox({} as DIVEScene, mockController);
        expect(() => toolBox.SetGizmoScaleLinked(true)).not.toThrow();
    });
});
