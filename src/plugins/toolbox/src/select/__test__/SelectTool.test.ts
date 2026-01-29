import { Vector2, type Object3D } from 'three';
import { SelectTool } from '../SelectTool.ts';
import { SelectionState } from '../../SelectionState.ts';
import { type PointerContext } from '../../PointerContext.ts';
import { type DIVESelectable } from '@shopware-ag/dive';

/**
 * @vitest-environment jsdom
 */

// Mock PointerEvent for jsdom
class MockPointerEvent extends MouseEvent {
    constructor(type: string, props?: PointerEventInit) {
        super(type, props);
    }
}
globalThis.PointerEvent = MockPointerEvent as unknown as typeof PointerEvent;

const createMockContext = (modelIntersects: any[] = []): PointerContext => ({
    event: new PointerEvent('click'),
    pointer: new Vector2(0, 0),
    intersects: [],
    modelIntersects,
    uiIntersects: [],
    pointerPrimaryDown: false,
    pointerMiddleDown: false,
    pointerSecondaryDown: false,
    lastPointerDown: new Vector2(0, 0),
});

describe('SelectTool', () => {
    let selectTool: SelectTool;
    let selectionState: SelectionState;

    beforeEach(() => {
        selectionState = new SelectionState();
        selectTool = new SelectTool(selectionState);
    });

    afterEach(() => {
        selectionState.dispose();
        vi.clearAllMocks();
    });

    describe('properties', () => {
        it('should have correct name', () => {
            expect(selectTool.name).toBe('select');
        });

        it('should have correct priority', () => {
            expect(selectTool.priority).toBe(30);
        });

        it('should have null selected initially', () => {
            expect(selectTool.selected).toBeNull();
        });
    });

    describe('click behavior', () => {
        it('should select object on click', () => {
            const mockSelectable = {
                uuid: 'test',
                isSelectable: true,
                onSelect: vi.fn(),
            } as unknown as Object3D & DIVESelectable;

            const ctx = createMockContext([
                { object: mockSelectable, point: { x: 0, y: 0, z: 0 } },
            ]);

            selectTool.onClick(ctx);

            expect(mockSelectable.onSelect).toHaveBeenCalled();
            expect(selectTool.selected).toBe(mockSelectable);
        });

        it('should deselect when clicking nothing', () => {
            const mockSelectable = {
                uuid: 'test',
                isSelectable: true,
                onSelect: vi.fn(),
                onDeselect: vi.fn(),
            } as unknown as Object3D & DIVESelectable;

            // First select
            const ctx1 = createMockContext([
                { object: mockSelectable, point: { x: 0, y: 0, z: 0 } },
            ]);
            selectTool.onClick(ctx1);

            // Then click nothing
            const ctx2 = createMockContext([]);
            selectTool.onClick(ctx2);

            expect(mockSelectable.onDeselect).toHaveBeenCalled();
            expect(selectTool.selected).toBeNull();
        });

        it('should not reselect same object', () => {
            const mockSelectable = {
                uuid: 'test',
                isSelectable: true,
                onSelect: vi.fn(),
            } as unknown as Object3D & DIVESelectable;

            const ctx = createMockContext([
                { object: mockSelectable, point: { x: 0, y: 0, z: 0 } },
            ]);

            selectTool.onClick(ctx);
            selectTool.onClick(ctx);

            expect(mockSelectable.onSelect).toHaveBeenCalledTimes(1);
        });

        it('should switch selection between objects', () => {
            const mockSelectable1 = {
                uuid: 'test1',
                isSelectable: true,
                onSelect: vi.fn(),
                onDeselect: vi.fn(),
            } as unknown as Object3D & DIVESelectable;

            const mockSelectable2 = {
                uuid: 'test2',
                isSelectable: true,
                onSelect: vi.fn(),
            } as unknown as Object3D & DIVESelectable;

            // Select first
            const ctx1 = createMockContext([
                { object: mockSelectable1, point: { x: 0, y: 0, z: 0 } },
            ]);
            selectTool.onClick(ctx1);

            // Select second
            const ctx2 = createMockContext([
                { object: mockSelectable2, point: { x: 0, y: 0, z: 0 } },
            ]);
            selectTool.onClick(ctx2);

            expect(mockSelectable1.onDeselect).toHaveBeenCalled();
            expect(mockSelectable2.onSelect).toHaveBeenCalled();
            expect(selectTool.selected).toBe(mockSelectable2);
        });

        it('should ignore non-selectable objects', () => {
            const nonSelectable = {
                uuid: 'test',
                // No isSelectable property
            };

            const ctx = createMockContext([
                { object: nonSelectable, point: { x: 0, y: 0, z: 0 } },
            ]);

            selectTool.onClick(ctx);

            expect(selectTool.selected).toBeNull();
        });
    });

    describe('programmatic selection', () => {
        it('should select programmatically', () => {
            const mockSelectable = {
                uuid: 'test',
                isSelectable: true,
                onSelect: vi.fn(),
            } as unknown as Object3D & DIVESelectable;

            selectTool.select(mockSelectable);

            expect(mockSelectable.onSelect).toHaveBeenCalled();
            expect(selectTool.selected).toBe(mockSelectable);
        });

        it('should deselect programmatically', () => {
            const mockSelectable = {
                uuid: 'test',
                isSelectable: true,
                onSelect: vi.fn(),
                onDeselect: vi.fn(),
            } as unknown as Object3D & DIVESelectable;

            selectTool.select(mockSelectable);
            selectTool.deselect();

            expect(mockSelectable.onDeselect).toHaveBeenCalled();
            expect(selectTool.selected).toBeNull();
        });
    });
});
