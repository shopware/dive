import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DIVEGizmoPlane } from '../GizmoPlane.ts';
import { DIVEGizmoMode, DIVEGizmoAxis } from '../../Gizmo.ts';

describe('DIVEGizmoPlane', () => {
    let gizmoPlane: DIVEGizmoPlane;

    beforeEach(() => {
        gizmoPlane = new DIVEGizmoPlane();
    });

    it('should instantiate and have plane properties', () => {
        expect(gizmoPlane.name).toBe('DIVEGizmoPlane');
        expect(gizmoPlane.XPlane).toBeDefined();
        expect(gizmoPlane.YPlane).toBeDefined();
        expect(gizmoPlane.ZPlane).toBeDefined();
    });

    it('should call add/clear on assemble for translate mode', () => {
        const addSpy = vi.spyOn(gizmoPlane, 'add');
        const clearSpy = vi.spyOn(gizmoPlane, 'clear');
        gizmoPlane.assemble('translate', 'x');
        expect(clearSpy).toHaveBeenCalled();
        expect(addSpy).toHaveBeenCalled();
    });

    it('should call add/clear on assemble for scale mode', () => {
        const addSpy = vi.spyOn(gizmoPlane, 'add');
        const clearSpy = vi.spyOn(gizmoPlane, 'clear');
        gizmoPlane.assemble('scale', 'y');
        expect(clearSpy).toHaveBeenCalled();
        expect(addSpy).toHaveBeenCalled();
    });

    it('should call add/clear on assemble for rotate mode', () => {
        const addSpy = vi.spyOn(gizmoPlane, 'add');
        const clearSpy = vi.spyOn(gizmoPlane, 'clear');
        gizmoPlane.assemble('rotate', 'z');
        expect(clearSpy).toHaveBeenCalled();
        expect(addSpy).toHaveBeenCalled();
    });

    it('should not throw for any mode/axis combination', () => {
        const modes: DIVEGizmoMode[] = ['translate', 'rotate', 'scale'];
        const axes: DIVEGizmoAxis[] = ['x', 'y', 'z'];
        for (const mode of modes) {
            for (const axis of axes) {
                expect(() => gizmoPlane.assemble(mode, axis)).not.toThrow();
            }
        }
    });
});
