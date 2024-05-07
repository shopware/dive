import ceilExp from '../ceilExp';

describe('dive/math/ceil/ceilExp', () => {
    it('should ceilExp', () => {
        expect(ceilExp(-0.5)).toBe(0);
        expect(ceilExp(0.5)).toBe(1);
        expect(ceilExp(0.55)).toBe(1);
        expect(ceilExp(0.49)).toBe(1);
        expect(ceilExp(0.49, 2)).toBe(0.49);
        expect(ceilExp(-1.49, 2)).toBe(-1.49);
    });
});