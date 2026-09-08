import { Object3D } from 'three/webgpu';
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

    it('should not find the interface when the brand is explicitly false', () => {
        const obj = { isInterface: false } as unknown as Object3D;
        expect(implementsInterface(obj, 'isInterface')).toBe(false);
    });

    it('should not find the interface for truthy non-true brands', () => {
        expect(
            implementsInterface(
                { isInterface: 'yes' } as unknown as Object3D,
                'isInterface',
            ),
        ).toBe(false);
        expect(
            implementsInterface(
                { isInterface: undefined } as unknown as Object3D,
                'isInterface',
            ),
        ).toBe(false);
    });
});
