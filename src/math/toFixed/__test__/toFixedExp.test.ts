import toFixedExp from '../toFixedExp';

describe('dive/math/toFixed/toFixedExp', () => {
    it('should toFixedExp', () => {
        expect(toFixedExp(-0.5)).toBe("0");
        expect(toFixedExp(0.5)).toBe("1");
        expect(toFixedExp(0.55)).toBe("1");
        expect(toFixedExp(0.49)).toBe("0");
        expect(toFixedExp(1.49)).toBe("1");
        expect(toFixedExp(0.49, 2)).toBe("0.49");
        expect(toFixedExp(1.49, 2)).toBe("1.49");
        expect(toFixedExp(-1.49, 2)).toBe("-1.49");
    });
});