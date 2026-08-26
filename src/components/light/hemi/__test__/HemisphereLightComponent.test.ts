import { HemisphereLight } from 'three/webgpu';
import { HemisphereLightComponent } from '../HemisphereLightComponent.ts';

describe('dive/light/HemisphereLightComponent', () => {
    it('should own a HemisphereLight', () => {
        expect(new HemisphereLightComponent().light).toBeInstanceOf(
            HemisphereLight,
        );
    });

    it('should brand and name itself', () => {
        const component = new HemisphereLightComponent();

        expect(component.isHemisphereLightComponent).toBe(true);
        expect(component.name).toBe('HemisphereLightComponent');
    });

    it('should light the ground as well as the sky', () => {
        // both colours are set, otherwise everything facing down goes black
        const light = new HemisphereLightComponent().light as HemisphereLight;

        expect(light.color.getHexString()).toBe('ffffff');
        expect(light.groundColor.getHexString()).toBe('ffffff');
    });

    it('should default to a non-zero sky axis', () => {
        /**
         * three derives the sky direction from the normalised world position, so
         * the origin would leave it undefined
         */
        expect(
            new HemisphereLightComponent().light.position.length(),
        ).toBeGreaterThan(0);
    });

    it('should point straight up by default', () => {
        const position = new HemisphereLightComponent().light.position;

        expect(position.x).toBe(0);
        expect(position.y).toBeGreaterThan(0);
        expect(position.z).toBe(0);
    });

    it('should set every axis of the direction', () => {
        const component = new HemisphereLightComponent();

        component.setDirection({ x: 1, y: 2, z: 3 });

        expect(component.light.position.toArray()).toEqual([1, 2, 3]);
    });

    it('should refuse a zero direction and keep the one it had', () => {
        const component = new HemisphereLightComponent();
        component.setDirection({ x: 0, y: 4, z: 0 });
        console.warn = vi.fn();

        component.setDirection({ x: 0, y: 0, z: 0 });

        expect(console.warn).toHaveBeenCalledWith(
            expect.stringContaining('sky axis'),
        );
        expect(component.light.position.toArray()).toEqual([0, 4, 0]);
    });

    it('should cast no shadow', () => {
        // a sky light has no direction to project from
        expect(new HemisphereLightComponent().light.castShadow).toBe(false);
    });
});
