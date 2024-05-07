import floorExp from '../floorExp';

describe('dive/math/floor/floorExp', () => {
    it('should floorExp', () => {
        expect(floorExp(-0.5)).toBe(-1);
        expect(floorExp(0.5)).toBe(0);
        expect(floorExp(0.55)).toBe(0);
        expect(floorExp(0.49)).toBe(0);
        expect(floorExp(1.49)).toBe(1);
        expect(floorExp(0.49, 2)).toBe(0.49);
        expect(floorExp(1.49, 2)).toBe(1.49);
        expect(floorExp(-1.49, 2)).toBe(-1.49);
    });
});