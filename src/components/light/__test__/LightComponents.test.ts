import {
    AmbientLight,
    Color,
    DirectionalLight,
    HemisphereLight,
    PointLight,
} from 'three/webgpu';
import { AmbientLightComponent } from '../AmbientLightComponent.ts';
import { DirectionalLightComponent } from '../DirectionalLightComponent.ts';
import { HemisphereLightComponent } from '../HemisphereLightComponent.ts';
import { PointLightComponent } from '../PointLightComponent.ts';
import { DIVELightComponent } from '../LightComponent.ts';
import { DIVENode } from '../../node/Node.ts';
import {
    PRODUCT_LAYER_MASK,
    PROXY_LAYER_MASK,
    UI_LAYER_MASK,
} from '../../../constants/VisibilityLayerMask.ts';

describe('dive/light components', () => {
    describe('shared behaviour', () => {
        const cases = [
            {
                name: 'ambient',
                make: () => new AmbientLightComponent(),
                factor: 1,
            },
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

        cases.forEach(({ name, make, factor }) => {
            describe(name, () => {
                it('should be a light component', () => {
                    const component = make();

                    expect(component).toBeInstanceOf(DIVELightComponent);
                    expect(component.isDIVELightComponent).toBe(true);
                    expect(component.isDIVEComponent).toBe(true);
                });

                it('should own its light on the product layer', () => {
                    const component = make();

                    expect(component.children).toContain(component.light);
                    expect(component.light.layers.mask).toBe(
                        PRODUCT_LAYER_MASK,
                    );
                });

                it('should scale intensity by its factor', () => {
                    const component = make();

                    component.setIntensity(2);

                    expect(component.light.intensity).toBe(2 * factor);
                });

                it('should set the colour', () => {
                    const component = make();

                    component.setColor(new Color(0xff0000));

                    expect(
                        (component.light.color as Color).getHexString(),
                    ).toBe('ff0000');
                });

                it('should toggle the light', () => {
                    const component = make();

                    component.setEnabled(false);
                    expect(component.light.visible).toBe(false);

                    component.setEnabled(true);
                    expect(component.light.visible).toBe(true);
                });

                it('should dispose without throwing', () => {
                    expect(() => make().dispose()).not.toThrow();
                });

                it('should be findable through the abstract base', () => {
                    const node = new DIVENode();
                    const component = node.addComponent(make());

                    expect(node.getComponent(DIVELightComponent)).toBe(
                        component,
                    );
                });

                it('should be constructible with no arguments', () => {
                    expect(() => make().clone()).not.toThrow();
                });
            });
        });
    });

    describe('AmbientLightComponent', () => {
        it('should own an AmbientLight', () => {
            expect(new AmbientLightComponent().light).toBeInstanceOf(
                AmbientLight,
            );
        });
    });

    describe('HemisphereLightComponent', () => {
        it('should own a HemisphereLight', () => {
            expect(new HemisphereLightComponent().light).toBeInstanceOf(
                HemisphereLight,
            );
        });

        it('should default to a non-zero sky axis', () => {
            // three derives the sky direction from the normalised world
            // position, so the origin would leave it undefined
            const component = new HemisphereLightComponent();

            expect(component.light.position.length()).toBeGreaterThan(0);
        });

        it('should set the direction', () => {
            const component = new HemisphereLightComponent();

            component.setDirection({ x: 0, y: 1, z: 0 });

            expect(component.light.position.y).toBe(1);
        });

        it('should refuse a zero direction', () => {
            const component = new HemisphereLightComponent();
            console.warn = vi.fn();

            component.setDirection({ x: 0, y: 0, z: 0 });

            expect(console.warn).toHaveBeenCalled();
            expect(component.light.position.length()).toBeGreaterThan(0);
        });
    });

    describe('DirectionalLightComponent', () => {
        it('should own a shadow-casting DirectionalLight', () => {
            const component = new DirectionalLightComponent();

            expect(component.light).toBeInstanceOf(DirectionalLight);
            expect(component.light.castShadow).toBe(true);
        });

        it('should default to a non-zero direction', () => {
            expect(
                new DirectionalLightComponent().light.position.length(),
            ).toBeGreaterThan(0);
        });

        it('should set the direction', () => {
            const component = new DirectionalLightComponent();

            component.setDirection({ x: 1, y: 2, z: 3 });

            expect(component.light.position.z).toBe(3);
        });

        it('should refuse a zero direction', () => {
            const component = new DirectionalLightComponent();
            console.warn = vi.fn();

            component.setDirection({ x: 0, y: 0, z: 0 });

            expect(console.warn).toHaveBeenCalled();
            expect(component.light.position.length()).toBeGreaterThan(0);
        });
    });

    describe('PointLightComponent', () => {
        it('should own a shadow-casting PointLight', () => {
            const component = new PointLightComponent();

            expect(component.light).toBeInstanceOf(PointLight);
            expect(component.light.castShadow).toBe(true);
        });

        it('should own an editor handle on the proxy layer', () => {
            // a proxy, not UI: the light has no geometry of its own, so this
            // sphere is what a click has to be able to reach. UI is the gizmo,
            // which must not be selectable as an object.
            const component = new PointLightComponent();

            expect(component.children).toContain(component.handle);
            expect(component.handle.layers.mask).toBe(PROXY_LAYER_MASK);
        });

        it('should mirror the colour on its handle', () => {
            const component = new PointLightComponent();
            const color = new Color(0x00ff00);

            component.setColor(color);

            expect(component.handle.material).toHaveProperty('color', color);
        });

        it('should fade the handle with the intensity', () => {
            const component = new PointLightComponent();

            component.setIntensity(0.5);

            expect(
                (component.handle.material as { opacity: number }).opacity,
            ).toBeCloseTo(0.4);
        });

        it('should cap the handle opacity', () => {
            const component = new PointLightComponent();

            component.setIntensity(10);

            expect(
                (component.handle.material as { opacity: number }).opacity,
            ).toBe(0.8);
        });

        it('should dispose the handle resources', () => {
            const component = new PointLightComponent();
            const geometry = vi.spyOn(component.handle.geometry, 'dispose');

            component.dispose();

            expect(geometry).toHaveBeenCalled();
        });
    });
});
