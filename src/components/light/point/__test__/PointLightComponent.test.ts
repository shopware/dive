import { Color, MeshBasicMaterial, PointLight } from 'three/webgpu';
import { PointLightComponent } from '../PointLightComponent.ts';
import { PROXY_LAYER_MASK } from '../../../../constants/VisibilityLayerMask.ts';

const materialOf = (component: PointLightComponent): MeshBasicMaterial =>
    component.handle.material as MeshBasicMaterial;

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
        // a point light renders six faces, so the same resolution as the
        // directional light would cost six times the memory
        const shadow = (new PointLightComponent().light as PointLight).shadow;

        expect(shadow.mapSize.width).toBe(512);
        expect(shadow.mapSize.height).toBe(512);
    });

    it('should own an editor handle on the proxy layer', () => {
        // a proxy, not UI: the light has no geometry of its own, so this sphere is
        // what a click has to be able to reach. UI is the gizmo, which must not be
        // selectable as an object.
        const component = new PointLightComponent();

        expect(component.children).toContain(component.handle);
        expect(component.handle.layers.mask).toBe(PROXY_LAYER_MASK);
    });

    it('should give the handle a size a pointer can hit', () => {
        const component = new PointLightComponent();
        component.handle.geometry.computeBoundingSphere();

        expect(component.handle.geometry.boundingSphere!.radius).toBeCloseTo(
            0.1,
            5,
        );
    });

    it('should mirror the colour on its handle', () => {
        const component = new PointLightComponent();
        const color = new Color(0x00ff00);

        component.setColor(color);

        expect(component.light.color).toBe(color);
        expect(materialOf(component).color).toBe(color);
    });

    it('should fade the handle with the intensity', () => {
        const component = new PointLightComponent();

        component.setIntensity(0.5);

        expect(materialOf(component).opacity).toBeCloseTo(0.4);
    });

    it('should cap the handle opacity', () => {
        // the handle stands in for the light, but a bright light must not make it
        // more than the 0.8 it starts at
        const component = new PointLightComponent();

        component.setIntensity(10);

        expect(materialOf(component).opacity).toBe(0.8);
    });

    it('should still apply the intensity to the light itself when capped', () => {
        const component = new PointLightComponent();

        component.setIntensity(10);

        expect(component.light.intensity).toBe(10);
    });

    it('should keep the handle transparent, or the opacity would do nothing', () => {
        expect(materialOf(new PointLightComponent()).transparent).toBe(true);
    });

    it('should dispose the handle resources as well as the light', () => {
        const component = new PointLightComponent();
        const geometry = vi.spyOn(component.handle.geometry, 'dispose');
        const material = vi.spyOn(materialOf(component), 'dispose');
        const light = vi.spyOn(component.light, 'dispose');

        component.dispose();

        expect(geometry).toHaveBeenCalled();
        expect(material).toHaveBeenCalled();
        expect(light).toHaveBeenCalled();
    });
});
