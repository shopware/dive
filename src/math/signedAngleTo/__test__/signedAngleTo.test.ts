import { Vector3 } from 'three';
import signedAngleTo from '../signedAngleTo';

describe('dive/math/signedAngleTo', () => {
    it('should signedAngleTo', () => {
        const planeNormal = new Vector3(0, 0, 1);
        const a = new Vector3(1, 0, 0);
        expect(signedAngleTo(a, new Vector3(1, 0, 0), planeNormal)).toBe(0);
        expect(signedAngleTo(a, new Vector3(0, 1, 0), planeNormal)).toBe(Math.PI / 2);
        expect(signedAngleTo(a, new Vector3(-1, 0, 0), planeNormal)).toBe(Math.PI);
        expect(signedAngleTo(a, new Vector3(0, -1, 0), planeNormal)).toBe(-Math.PI / 2);
        expect(signedAngleTo(a, planeNormal, planeNormal)).toBe(0);
    });
});