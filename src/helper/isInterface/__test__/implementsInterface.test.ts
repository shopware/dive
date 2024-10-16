import { Object3D } from 'three';
import { implementsInterface } from '../implementsInterface.ts';

describe('dive/helper/implementsInterface', () => {
    it('should not find interface', () => {
        expect(implementsInterface(undefined, 'isInterface')).toBe(false);

        expect(implementsInterface(null, 'isInterface')).toBe(false);

        const obj = {} as unknown as Object3D;

        expect(implementsInterface(obj, 'isInterface')).toBe(false);
    });

    it('should find interface', () => {
        const obj = { isInterface: true } as unknown as Object3D;
        expect(implementsInterface(obj, 'isInterface')).toBe(true);
    });
});