import roundExp from '../roundExp';

describe('dive/math/round/roundExp', () => {
    it('should roundExp', () => {
        expect(roundExp(-0.5)).toBe(-1);
        expect(roundExp(0.5)).toBe(1);
        expect(roundExp(0.55)).toBe(1);
        expect(roundExp(0.49)).toBe(0);
        expect(roundExp(1.49)).toBe(1);
        expect(roundExp(0.49, 2)).toBe(0.49);
        expect(roundExp(1.49, 2)).toBe(1.49);
        expect(roundExp(-1.49, 2)).toBe(-1.49);
    });
});