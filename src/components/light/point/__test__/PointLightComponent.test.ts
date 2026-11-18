import { Color, PointLight } from 'three/webgpu';
import { PointLightComponent } from '../PointLightComponent.ts';

describe('dive/light/PointLightComponent', () => {
    it('should own a PointLight', () => {
        expect(new PointLightComponent().light).toBeInstanceOf(PointLight);
    });

    it('should brand and name itself', () => {
        const component = new PointLightComponent();

        expect(component.isPointLightComponent).toBe(true);
        expect(component.name).toBe('PointLightComponent');
    });

    it('should cast shadows', () => {
        expect(new PointLightComponent().light.castShadow).toBe(true);
    });

    it('should keep its shadow map small', () => {
        /**
         * a point light renders six faces, so the same resolution as the
         * directional light would cost six times the memory
         */
        const shadow = (new PointLightComponent().light as PointLight).shadow;

        expect(shadow.mapSize.width).toBe(512);
        expect(shadow.mapSize.height).toBe(512);
    });

    it('should contribute its light and nothing else', () => {
        // the editor's stand-in is the caller's to compose, see the state plugin
        const component = new PointLightComponent();

        expect(component.contributions).toEqual([component.light]);
    });

    it('should take on the colour and the intensity', () => {
        const component = new PointLightComponent();

        component.setColor(new Color(0x00ff00));
        component.setIntensity(10);

        expect((component.light.color as Color).getHex()).toBe(0x00ff00);
        expect(component.light.intensity).toBe(10);
    });

    it('should give a clone its own light with the same intensity', () => {
        const source = new PointLightComponent();
        source.setIntensity(0.5);

        const copy = source.clone();

        expect(copy.light).not.toBe(source.light);
        expect(copy.light.intensity).toBeCloseTo(0.5);
        expect(copy.contributions).toEqual([copy.light]);
    });

    it('should dispose the light', () => {
        const component = new PointLightComponent();
        const light = vi.spyOn(component.light, 'dispose');

        component.dispose();

        expect(light).toHaveBeenCalled();
    });
});
