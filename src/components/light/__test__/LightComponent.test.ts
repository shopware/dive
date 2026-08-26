import { Color } from 'three/webgpu';
import { AmbientLightComponent } from '../ambient/AmbientLightComponent.ts';
import { DirectionalLightComponent } from '../directional/DirectionalLightComponent.ts';
import { HemisphereLightComponent } from '../hemi/HemisphereLightComponent.ts';
import { PointLightComponent } from '../point/PointLightComponent.ts';
import { DIVELightComponent } from '../LightComponent.ts';
import { DIVENode } from '../../node/Node.ts';
import { PRODUCT_LAYER_MASK } from '../../../constants/VisibilityLayerMask.ts';

/**
 * Every light, so the contract of the abstract base is checked against each one
 * rather than against a stand-in. `factor` is the multiplier the concrete
 * component passes up, which is what keeps a multi-light node in balance.
 */
const lights = [
    { name: 'ambient', make: () => new AmbientLightComponent(), factor: 1 },
    { name: 'point', make: () => new PointLightComponent(), factor: 1 },
    {
        name: 'hemisphere',
        make: () => new HemisphereLightComponent(),
        factor: 2,
    },
    {
        name: 'directional',
        make: () => new DirectionalLightComponent(),
        factor: 3,
    },
];

describe('dive/light/DIVELightComponent', () => {
    lights.forEach(({ name, make, factor }) => {
        describe(name, () => {
            it('should be a light component', () => {
                const component = make();

                expect(component).toBeInstanceOf(DIVELightComponent);
                expect(component.isDIVELightComponent).toBe(true);
                expect(component.isDIVEComponent).toBe(true);
            });

            it('should own its light on the product layer', () => {
                const component = make();

                expect(component.contributions).toContain(component.light);
                expect(component.light.layers.mask).toBe(PRODUCT_LAYER_MASK);
            });

            it('should put its light into the node', () => {
                /**
                 * the light has to be in the graph to illuminate anything, but
                 * the component holding it does not
                 */
                const node = new DIVENode();
                const component = node.addComponent(make());

                expect(node.children).toContain(component.light);
            });

            it('should give a clone its own light', () => {
                const source = make();

                const copy = source.clone();

                /**
                 * toContain, not toEqual: a point light also contributes its
                 * editor handle
                 */
                expect(copy.contributions).toContain(copy.light);
                expect(copy.light).not.toBe(source.light);
            });

            it('should scale intensity by its factor', () => {
                const component = make();

                component.setIntensity(2);

                expect(component.light.intensity).toBe(2 * factor);
            });

            it('should start out at the intensity its factor implies', () => {
                /**
                 * the constructor hands three a value directly, so a factor that
                 * disagreed with it would make the first setIntensity jump
                 */
                expect(make().light.intensity).toBe(factor);
            });

            it('should set the colour', () => {
                const component = make();
                const color = new Color(0xff0000);

                component.setColor(color);

                expect(component.light.color).toBe(color);
            });

            it('should toggle the light', () => {
                const component = make();

                component.setEnabled(false);
                expect(component.light.visible).toBe(false);

                component.setEnabled(true);
                expect(component.light.visible).toBe(true);
            });

            it('should release its light on dispose', () => {
                const component = make();
                const dispose = vi.spyOn(component.light, 'dispose');

                component.dispose();

                expect(dispose).toHaveBeenCalled();
            });

            it('should be findable through the abstract base', () => {
                /**
                 * what lets the state layer apply colour or intensity without
                 * knowing which kind of light a node carries
                 */
                const node = new DIVENode();
                const component = node.addComponent(make());

                expect(node.getComponent(DIVELightComponent)).toBe(component);
            });

            it('should be constructible with no arguments', () => {
                // Object3D.clone() calls new this.constructor()
                expect(() => make().clone()).not.toThrow();
            });
        });
    });
});
