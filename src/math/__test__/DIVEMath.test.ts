import { DIVEMath } from '../index';

describe('dive/math', () => {
    it('should be defined', () => {
        expect(DIVEMath).toBeDefined();
        expect(DIVEMath.ceilExp).toBeDefined();
        expect(DIVEMath.floorExp).toBeDefined();
        expect(DIVEMath.roundExp).toBeDefined();
        expect(DIVEMath.toFixedExp).toBeDefined();
        expect(DIVEMath.truncateExp).toBeDefined();
    });
});