import { DIVEPointLight } from '../PointLight.ts';
import { Object3D, type Color, type PointLight } from 'three/webgpu';

describe('dive/light/DIVEPointLight', () => {
    it('should instantiate', () => {
        const testLight = new DIVEPointLight();
        testLight.userData.id = 'something';
        expect(testLight).toBeDefined();
        expect(testLight.userData.id).toBe('something');
        expect(testLight.children).toHaveLength(2);
    });

    it('should set intensity', () => {
        const testLight = new DIVEPointLight();
        testLight.setIntensity(1.0);
        expect((testLight.children[0] as PointLight).intensity).toBe(1.0);
        testLight.setIntensity(0.6);
        expect((testLight.children[0] as PointLight).intensity).toBe(0.6);
    });

    it('should set color', () => {
        const testLight = new DIVEPointLight();
        testLight.setColor({ test: true } as unknown as Color);
        expect((testLight.children[0] as PointLight).color).toEqual({
            test: true,
        });
    });

    it('should set enabled', () => {
        const testLight = new DIVEPointLight();
        testLight.setEnabled(false);
        expect(testLight.children[0].visible).toBe(false);
    });

    it('should onMove', () => {
        const testLight = new DIVEPointLight();
        testLight.userData.id = 'something';
        expect(() => testLight.onMove()).not.toThrow();

        expect(() => testLight.onMove()).not.toThrow();
    });

    it('should onSelect', () => {
        const testLight = new DIVEPointLight();
        testLight.userData.id = 'something';
        expect(() => testLight.onSelect()).not.toThrow();

        expect(() => testLight.onSelect()).not.toThrow();
    });

    it('should onDeselect', () => {
        const testLight = new DIVEPointLight();
        testLight.userData.id = 'something';
        expect(() => testLight.onDeselect()).not.toThrow();

        expect(() => testLight.onDeselect()).not.toThrow();
    });

    describe('reporting about itself', () => {
        it('should report a transform on move', () => {
            const testLight = new DIVEPointLight();
            const onTransform = vi.fn();
            testLight.addEventListener('object-transform', onTransform);
            testLight.position.set(1, 2, 3);

            testLight.onMove();

            expect(onTransform).toHaveBeenCalledTimes(1);
            expect(onTransform).toHaveBeenCalledWith(
                expect.objectContaining({
                    position: expect.objectContaining({ x: 1, y: 2, z: 3 }),
                }),
            );
        });

        it('should report the world position when nested in a group', () => {
            // used to report the local position, which is only the same thing
            // while the light hangs directly off the root
            const parent = new Object3D();
            parent.position.set(10, 0, 0);
            const testLight = new DIVEPointLight();
            parent.add(testLight);
            testLight.position.set(1, 0, 0);

            const onTransform = vi.fn();
            testLight.addEventListener('object-transform', onTransform);

            testLight.onMove();

            expect(onTransform).toHaveBeenCalledWith(
                expect.objectContaining({
                    position: expect.objectContaining({ x: 11 }),
                }),
            );
        });

        it('should report selection and deselection', () => {
            const testLight = new DIVEPointLight();
            const onSelect = vi.fn();
            const onDeselect = vi.fn();
            testLight.addEventListener('object-select', onSelect);
            testLight.addEventListener('object-deselect', onDeselect);

            testLight.onSelect();
            testLight.onDeselect();

            expect(onSelect).toHaveBeenCalledTimes(1);
            expect(onDeselect).toHaveBeenCalledTimes(1);
        });
    });
});
