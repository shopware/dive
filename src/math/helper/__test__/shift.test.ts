import shift from '../shift';

describe('dive/math/helper/shift', () => {
    it('should shift', () => {
        expect(shift(0.5, 2)).toBe(50);
        expect(shift(0.55, 2)).toBe(55);
        expect(shift(0.49, 2)).toBe(49);
        expect(shift(1.49, 2)).toBe(149);
        expect(shift(0.49, 2)).toBe(49);
        expect(shift(1.49, 2)).toBe(149);
    });
});