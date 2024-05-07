import truncateExp from '../truncateExp';

describe('dive/math/truncate/truncateExp', () => {
    it('should truncateExp', () => {
        expect(truncateExp(-0.5)).toBe(0);
        expect(truncateExp(0.5)).toBe(0);
        expect(truncateExp(0.55)).toBe(0);
        expect(truncateExp(0.49)).toBe(0);
        expect(truncateExp(1.49)).toBe(1);
        expect(truncateExp(0.49, 2)).toBe(0.49);
        expect(truncateExp(1.49, 2)).toBe(1.49);
        expect(truncateExp(-1.49, 2)).toBe(-1.49);
    });
});