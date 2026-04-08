vi.mock('@shopware-ag/dive/shader', () => ({
    DIVEShaderLib: {
        grid: { uniforms: {}, vertexShader: '', fragmentShader: '' },
    },
    DIVEShaderMaterial: vi.fn(),
}));

import { Vector2 } from 'three/webgpu';
import { HoverTool } from '../HoverTool.ts';
import { type PointerContext } from '../../PointerContext.ts';
import { type DIVEHoverable } from '@shopware-ag/dive';

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
    event: new PointerEvent('pointermove'),
    pointer: new Vector2(0, 0),
    intersects: [],
    modelIntersects,
    uiIntersects: [],
    pointerPrimaryDown: false,
    pointerMiddleDown: false,
    pointerSecondaryDown: false,
    lastPointerDown: new Vector2(0, 0),
});

describe('HoverTool', () => {
    let hoverTool: HoverTool;

    beforeEach(() => {
        hoverTool = new HoverTool();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('properties', () => {
        it('should have correct name', () => {
            expect(hoverTool.name).toBe('hover');
        });

        it('should have correct priority', () => {
            expect(hoverTool.priority).toBe(20);
        });

        it('should have null hovered initially', () => {
            expect(hoverTool.hovered).toBeNull();
        });
    });

    describe('activation', () => {
        it('should clear hovered on activate', () => {
            hoverTool.onActivate();
            expect(hoverTool.hovered).toBeNull();
        });

        it('should call onPointerLeave on deactivate if hovered', () => {
            const mockHoverable = {
                uuid: 'test',
                isHoverable: true,
                onPointerLeave: vi.fn(),
            } as unknown as DIVEHoverable;

            // Set hovered state
            (hoverTool as any)._hovered = mockHoverable;

            hoverTool.onDeactivate();

            expect(mockHoverable.onPointerLeave).toHaveBeenCalled();
            expect(hoverTool.hovered).toBeNull();
        });
    });

    describe('hover behavior', () => {
        it('should call onPointerEnter when hovering new object', () => {
            const mockHoverable = {
                uuid: 'test',
                isHoverable: true,
                onPointerEnter: vi.fn(),
            };

            const ctx = createMockContext([
                { object: mockHoverable, point: { x: 0, y: 0, z: 0 } },
            ]);

            hoverTool.onPointerMove(ctx);

            expect(mockHoverable.onPointerEnter).toHaveBeenCalled();
            expect(hoverTool.hovered).toBe(mockHoverable);
        });

        it('should call onPointerOver when continuing to hover same object', () => {
            const mockHoverable = {
                uuid: 'test',
                isHoverable: true,
                onPointerEnter: vi.fn(),
                onPointerOver: vi.fn(),
            };

            const ctx = createMockContext([
                { object: mockHoverable, point: { x: 0, y: 0, z: 0 } },
            ]);

            // First hover
            hoverTool.onPointerMove(ctx);
            expect(mockHoverable.onPointerEnter).toHaveBeenCalledTimes(1);

            // Continue hovering
            hoverTool.onPointerMove(ctx);
            expect(mockHoverable.onPointerOver).toHaveBeenCalled();
            expect(mockHoverable.onPointerEnter).toHaveBeenCalledTimes(1);
        });

        it('should call onPointerLeave when leaving object', () => {
            const mockHoverable = {
                uuid: 'test',
                isHoverable: true,
                onPointerEnter: vi.fn(),
                onPointerLeave: vi.fn(),
            };

            // First hover
            const ctx1 = createMockContext([
                { object: mockHoverable, point: { x: 0, y: 0, z: 0 } },
            ]);
            hoverTool.onPointerMove(ctx1);

            // Leave
            const ctx2 = createMockContext([]);
            hoverTool.onPointerMove(ctx2);

            expect(mockHoverable.onPointerLeave).toHaveBeenCalled();
            expect(hoverTool.hovered).toBeNull();
        });

        it('should switch hover between objects', () => {
            const mockHoverable1 = {
                uuid: 'test1',
                isHoverable: true,
                onPointerEnter: vi.fn(),
                onPointerLeave: vi.fn(),
            };
            const mockHoverable2 = {
                uuid: 'test2',
                isHoverable: true,
                onPointerEnter: vi.fn(),
            };

            // Hover first
            const ctx1 = createMockContext([
                { object: mockHoverable1, point: { x: 0, y: 0, z: 0 } },
            ]);
            hoverTool.onPointerMove(ctx1);

            // Hover second
            const ctx2 = createMockContext([
                { object: mockHoverable2, point: { x: 0, y: 0, z: 0 } },
            ]);
            hoverTool.onPointerMove(ctx2);

            expect(mockHoverable1.onPointerLeave).toHaveBeenCalled();
            expect(mockHoverable2.onPointerEnter).toHaveBeenCalled();
            expect(hoverTool.hovered).toBe(mockHoverable2);
        });

        it('should ignore non-hoverable objects', () => {
            const nonHoverable = {
                uuid: 'test',
                // No isHoverable property
            };

            const ctx = createMockContext([
                { object: nonHoverable, point: { x: 0, y: 0, z: 0 } },
            ]);

            hoverTool.onPointerMove(ctx);

            expect(hoverTool.hovered).toBeNull();
        });
    });
});
