import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DIVETranslateGizmo } from '../TranslateGizmo.ts';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { DIVEAxisHandle } from '../../handles/AxisHandle.ts';
import { DIVEGizmo } from '../../Gizmo.ts';
import { type DraggableEvent } from '../../../drag/DraggableEvent.ts';
import { Vector3 } from 'three/webgpu';

// Mock the OrbitController
vi.mock('@shopware-ag/dive/orbitcontroller', () => ({
    OrbitController: vi.fn().mockImplementation(() => ({
        addEventListener: vi.fn(),
        getDistance: vi.fn(() => 10),
    })),
}));

// Mock the AxisHandle
vi.mock('../../handles/AxisHandle', async () => {
    const { Object3D } = await vi.importActual<typeof import('three')>('three');

    return {
        DIVEAxisHandle: vi
            .fn()
            .mockImplementation((axis, length, direction, color) =>
                Object.assign(new Object3D(), {
                    axis,
                    length,
                    direction,
                    color,
                    highlight: false,
                    forwardVector: new Vector3(
                        direction.x,
                        direction.y,
                        direction.z,
                    ),
                    reset: vi.fn(),
                }),
            ),
    };
});

// Mock the main Gizmo
vi.mock('../../Gizmo', () => ({
    DIVEGizmo: vi.fn(),
}));

describe('DIVETranslateGizmo', () => {
    let translateGizmo: DIVETranslateGizmo;
    let mockController: OrbitController;
    let mockGizmo: DIVEGizmo;
    let mockHandle: DIVEAxisHandle;

    beforeEach(() => {
        vi.clearAllMocks();

        mockController = new OrbitController(null as any, null as any);
        translateGizmo = new DIVETranslateGizmo(mockController);

        mockGizmo = {
            object: {
                position: { clone: vi.fn(() => new Vector3(0, 0, 0)) },
            },
            onHover: vi.fn(),
        } as unknown as DIVEGizmo;

        mockHandle = {
            axis: 'x',
            highlight: false,
            forwardVector: new Vector3(1, 0, 0),
        } as unknown as DIVEAxisHandle;

        // Set up parent hierarchy
        translateGizmo.parent = {} as any;
        (translateGizmo.parent as any).parent = mockGizmo;
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('constructor', () => {
        it('should instantiate with correct properties', () => {
            expect(translateGizmo).toBeDefined();
            expect(translateGizmo.name).toBe('DIVETranslateGizmo');
            expect(translateGizmo.children).toHaveLength(3);
        });

        it('should create axis handles for x, y, z axes', () => {
            expect(DIVEAxisHandle).toHaveBeenCalledTimes(3);

            const calls = (DIVEAxisHandle as any).mock.calls;
            expect(calls[0][0]).toBe('x');
            expect(calls[1][0]).toBe('y');
            expect(calls[2][0]).toBe('z');
        });
    });

    describe('debug property', () => {
        it('should set debug on all children', () => {
            const children = translateGizmo.children as DIVEAxisHandle[];
            children.forEach((child) => {
                child.debug = false;
            });

            translateGizmo.debug = true;

            children.forEach((child) => {
                expect(child.debug).toBe(true);
            });
        });
    });

    describe('reset', () => {
        it('should reset all children', () => {
            const children = translateGizmo.children as DIVEAxisHandle[];

            translateGizmo.reset();

            children.forEach((child) => {
                expect(child.reset).toHaveBeenCalled();
            });
        });
    });

    describe('handleHighlight', () => {
        it('should highlight correct handle when not dragging', () => {
            const children = translateGizmo.children as DIVEAxisHandle[];

            (translateGizmo as any).handleHighlight('x', true, false);

            expect(children[0].highlight).toBe(true);
            expect(children[1].highlight).toBe(false);
            expect(children[2].highlight).toBe(false);
        });

        it('should highlight correct handle when dragging', () => {
            const children = translateGizmo.children as DIVEAxisHandle[];

            (translateGizmo as any).handleHighlight('y', false, true);

            expect(children[0].highlight).toBe(false);
            expect(children[1].highlight).toBe(true);
            expect(children[2].highlight).toBe(false);
        });

        it('should not highlight any handle when value is false and not dragging', () => {
            const children = translateGizmo.children as DIVEAxisHandle[];

            (translateGizmo as any).handleHighlight('x', false, false);

            children.forEach((child) => {
                expect(child.highlight).toBe(false);
            });
        });
    });

    describe('onHandleHover', () => {
        it('should call parent gizmo onHover and handle highlight when not dragging', () => {
            const handleHighlightSpy = vi.spyOn(
                translateGizmo as any,
                'handleHighlight',
            );

            translateGizmo.onHandleHover(mockHandle, true);

            expect(mockGizmo.onHover).toHaveBeenCalledWith(
                'translate',
                'x',
                true,
            );
            expect(handleHighlightSpy).toHaveBeenCalledWith('x', true, false);
        });

        it('should not change hover state when dragging', () => {
            (translateGizmo as any)._startPos = new Vector3(1, 2, 3);
            const handleHighlightSpy = vi.spyOn(
                translateGizmo as any,
                'handleHighlight',
            );

            translateGizmo.onHandleHover(mockHandle, true);

            expect(mockGizmo.onHover).not.toHaveBeenCalled();
            expect(handleHighlightSpy).not.toHaveBeenCalled();
        });

        it('should not call parent methods when parent is missing', () => {
            translateGizmo.parent = null;

            expect(() => {
                translateGizmo.onHandleHover(mockHandle, true);
            }).not.toThrow();
        });
    });

    describe('onHandleDragStart', () => {
        it('should set start position and highlight handle', () => {
            const handleHighlightSpy = vi.spyOn(
                translateGizmo as any,
                'handleHighlight',
            );

            translateGizmo.onHandleDragStart(mockHandle);

            expect((translateGizmo as any)._startPos).not.toBeNull();
            expect(handleHighlightSpy).toHaveBeenCalledWith('x', true, true);
        });

        it('should not set start position when parent is missing', () => {
            translateGizmo.parent = null;

            translateGizmo.onHandleDragStart(mockHandle);

            expect((translateGizmo as any)._startPos).toBeNull();
        });

        it('should not set start position when object is missing', () => {
            (mockGizmo as any).object = null;

            translateGizmo.onHandleDragStart(mockHandle);

            expect((translateGizmo as any)._startPos).toBeNull();
        });
    });

    describe('onHandleDrag', () => {
        beforeEach(() => {
            (translateGizmo as any)._startPos = new Vector3(1, 2, 3);
            // Ensure mockGizmo.onChange is properly mocked
            if (!mockGizmo.onChange) {
                mockGizmo.onChange = vi.fn();
            }
        });

        it('should update position based on drag delta', () => {
            const dragEvent: DraggableEvent = {
                dragDelta: new Vector3(0.5, 0, 0),
                dragStart: new Vector3(0, 0, 0),
                dragCurrent: new Vector3(0.5, 0, 0),
                dragEnd: new Vector3(0.5, 0, 0),
            };

            translateGizmo.onHandleDrag(mockHandle, dragEvent);

            expect(mockGizmo.onChange).toHaveBeenCalled();
        });

        it('should not update when start position is null', () => {
            (translateGizmo as any)._startPos = null;

            const dragEvent: DraggableEvent = {
                dragDelta: new Vector3(0.5, 0, 0),
                dragStart: new Vector3(0, 0, 0),
                dragCurrent: new Vector3(0.5, 0, 0),
                dragEnd: new Vector3(0.5, 0, 0),
            };

            translateGizmo.onHandleDrag(mockHandle, dragEvent);

            expect(mockGizmo.onChange).not.toHaveBeenCalled();
        });

        it('should not update when parent is missing', () => {
            translateGizmo.parent = null;

            const dragEvent: DraggableEvent = {
                dragDelta: new Vector3(0.5, 0, 0),
                dragStart: new Vector3(0, 0, 0),
                dragCurrent: new Vector3(0.5, 0, 0),
                dragEnd: new Vector3(0.5, 0, 0),
            };

            translateGizmo.onHandleDrag(mockHandle, dragEvent);

            expect(mockGizmo.onChange).not.toHaveBeenCalled();
        });

        it('should not update when parent parent is missing', () => {
            (translateGizmo.parent as any).parent = null;

            const dragEvent: DraggableEvent = {
                dragDelta: new Vector3(0.5, 0, 0),
                dragStart: new Vector3(0, 0, 0),
                dragCurrent: new Vector3(0.5, 0, 0),
                dragEnd: new Vector3(0.5, 0, 0),
            };

            translateGizmo.onHandleDrag(mockHandle, dragEvent);

            expect(mockGizmo.onChange).not.toHaveBeenCalled();
        });
    });

    describe('onHandleDragEnd', () => {
        it('should clear start position and reset highlight', () => {
            (translateGizmo as any)._startPos = new Vector3(1, 2, 3);
            const handleHighlightSpy = vi.spyOn(
                translateGizmo as any,
                'handleHighlight',
            );

            translateGizmo.onHandleDragEnd(mockHandle);

            expect((translateGizmo as any)._startPos).toBeNull();
            expect(handleHighlightSpy).toHaveBeenCalledWith('x', false, false);
        });
    });
});
