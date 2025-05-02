import { DIVEMovable } from '../Movable';

describe('DIVEMovable', () => {
    it('should have isMovable property set to true', () => {
        const movable = new DIVEMovable();
        expect(movable.isMovable).toBe(true);
    });

    it('should have optional move event handlers', () => {
        const movable = new DIVEMovable();
        expect(movable.onMoveStart).toBeUndefined();
        expect(movable.onMove).toBeUndefined();
        expect(movable.onMoveEnd).toBeUndefined();
    });

    it('should allow setting move event handlers', () => {
        const movable = new DIVEMovable();
        const onMoveStart = vi.fn();
        const onMove = vi.fn();
        const onMoveEnd = vi.fn();

        movable.onMoveStart = onMoveStart;
        movable.onMove = onMove;
        movable.onMoveEnd = onMoveEnd;

        expect(movable.onMoveStart).toBe(onMoveStart);
        expect(movable.onMove).toBe(onMove);
        expect(movable.onMoveEnd).toBe(onMoveEnd);
    });
});
