import DIVEOrbitControls from '../../controls/OrbitControls';
import DIVEScene from '../../scene/Scene';
import DIVEToolbox from '../Toolbox';

/**
 * @jest-environment jsdom
 */

const mock_addEventListener = jest.fn();
const mock_removeEventListener = jest.fn();

const mock_Canvas = {
    width: 0,
    height: 0,
    addEventListener: mock_addEventListener,
    getContext: jest.fn(),
    removeEventListener: mock_removeEventListener,
    clientWidth: 0,
    clientHeight: 0,
    offsetLeft: 0,
    offsetTop: 0,
};

const mock_Activate = jest.fn();
const mock_Deactivate = jest.fn();
const mock_onPointerDown = jest.fn();
const mock_onPointerMove = jest.fn();
const mock_onPointerUp = jest.fn();
const mock_onWheel = jest.fn();
const mock_SetGizmoMode = jest.fn();
const mock_SetGizmoVisible = jest.fn();

jest.mock('../select/SelectTool.ts', () => {
    return jest.fn(function () {
        this.Activate = mock_Activate;
        this.Deactivate = mock_Deactivate;
        this.onPointerDown = mock_onPointerDown;
        this.onPointerMove = mock_onPointerMove;
        this.onPointerUp = mock_onPointerUp;
        this.onWheel = mock_onWheel;
        this.SetGizmoMode = mock_SetGizmoMode;
        this.SetGizmoVisible = mock_SetGizmoVisible;
        return this;
    });
});

const mockController = {
    domElement: mock_Canvas,
    object: {}
} as unknown as DIVEOrbitControls;


describe('dive/toolbox/DIVEToolBox', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should instantiate', () => {
        const toolBox = new DIVEToolbox({} as DIVEScene, mockController);
        expect(toolBox).toBeDefined();
        expect(mock_Activate).toHaveBeenCalledTimes(1);
        expect(mock_addEventListener).toHaveBeenCalled();
    });

    it('should dispose', () => {
        const toolBox = new DIVEToolbox({} as DIVEScene, mockController);
        toolBox.dispose();
        expect(mock_removeEventListener).toHaveBeenCalled();
    });

    it('should throw with incorrect tool', () => {
        const toolBox = new DIVEToolbox({} as DIVEScene, mockController);
        expect(() => toolBox.UseTool('not a real tool')).toThrow();
        expect(mock_Deactivate).toHaveBeenCalledTimes(1);
    });

    it('should use select tool', () => {
        const toolBox = new DIVEToolbox({} as DIVEScene, mockController);
        expect(mock_Activate).toHaveBeenCalledTimes(1);
        toolBox.UseTool(DIVEToolbox.DefaultTool);
        expect(mock_Deactivate).toHaveBeenCalledTimes(1);
        expect(mock_Activate).toHaveBeenCalledTimes(2);
    });

    it('should execute pointer down event on tool', () => {
        const toolBox = new DIVEToolbox({} as DIVEScene, mockController);
        toolBox.onPointerDown({ type: 'pointerdown' } as PointerEvent);
        expect(mock_onPointerDown).toHaveBeenCalledTimes(1);
    });

    it('should execute pointer move event on tool', () => {
        const toolBox = new DIVEToolbox({} as DIVEScene, mockController);
        toolBox.onPointerMove({ type: 'pointermove' } as PointerEvent);
        expect(mock_onPointerMove).toHaveBeenCalledTimes(1);
    });

    it('should execute pointer up event on tool', () => {
        const toolBox = new DIVEToolbox({} as DIVEScene, mockController);
        toolBox.onPointerUp({ type: 'pointerup' } as PointerEvent);
        expect(mock_onPointerUp).toHaveBeenCalledTimes(1);
    });

    it('should execute wheel event on tool', () => {
        const toolBox = new DIVEToolbox({} as DIVEScene, mockController);
        toolBox.onWheel({ type: 'wheel' } as WheelEvent);
        expect(mock_onWheel).toHaveBeenCalledTimes(1);
    });

    it('should get active tool', () => {
        const toolBox = new DIVEToolbox({} as DIVEScene, mockController);
        expect(toolBox.GetActiveTool()).toBeDefined();
    });

    it('should set gizmo mode', () => {
        const toolBox = new DIVEToolbox({} as DIVEScene, mockController);
        toolBox.SetGizmoMode('translate');
        expect(mock_SetGizmoMode).toHaveBeenCalledTimes(1);
    });

    it('should set gizmo active', () => {
        const toolBox = new DIVEToolbox({} as DIVEScene, mockController);
        toolBox.SetGizmoVisible(true);
        expect(mock_SetGizmoVisible).toHaveBeenCalledTimes(1);
    });
});