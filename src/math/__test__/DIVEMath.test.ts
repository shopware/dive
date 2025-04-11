import { DiveMath } from '../index';

describe('dive/math', () => {
    it('should be defined', () => {
        expect(DiveMath).toBeDefined();
        expect(DiveMath.ceilExp).toBeDefined();
        expect(DiveMath.floorExp).toBeDefined();
        expect(DiveMath.roundExp).toBeDefined();
        expect(DiveMath.toFixedExp).toBeDefined();
        expect(DiveMath.truncateExp).toBeDefined();
    });
});
